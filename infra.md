# CommuteMate 인프라 구성

## 서버 구조

```
┌─────────────────────────────────────────────────────────────┐
│                        단일 서버                              │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              Nginx (프론트엔드)                       │   │
│  │                   Port: 80                          │   │
│  │  ┌─────────────────────────────────────────────┐   │   │
│  │  │  React 빌드 결과물 서빙 (/usr/share/nginx/html) │   │   │
│  │  └─────────────────────────────────────────────┘   │   │
│  │                      │                              │   │
│  │          ┌───────────┴───────────┐                  │   │
│  │          ▼                       ▼                  │   │
│  │    /api/* 프록시            /ws/* 프록시             │   │
│  │          │                       │                  │   │
│  └──────────┼───────────────────────┼──────────────────┘   │
│             │                       │                       │
│             ▼                       ▼                       │
│  ┌─────────────────────────────────────────────────────┐   │
│  │           Spring Boot (백엔드)                       │   │
│  │                   Port: 8080                        │   │
│  └─────────────────────────────────────────────────────┘   │
│             │                                               │
│             ▼                                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              PostgreSQL (데이터베이스)                 │   │
│  │                   Port: 5432                        │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 컨테이너 구성

| 컨테이너 | 이미지 | 포트 | 역할 |
|----------|--------|------|------|
| `commutemate-frontend` | Nginx + React 빌드 | 80 | 프론트엔드 서빙, API/WS 프록시 |
| `commutemate-backend` | Spring Boot | 8080 | REST API, WebSocket 서버 |
| `commutemate-postgres` | PostgreSQL 18 | 5432 | 데이터베이스 |

## 네트워크 모드

모든 컨테이너가 `network_mode: "host"`를 사용합니다.

```yaml
network_mode: "host"
```

### 왜 host 모드인가?

- 컨테이너가 호스트 네트워크를 직접 사용
- `localhost:8080`으로 같은 서버의 백엔드에 접근 가능
- 포트 매핑 없이 직접 포트 바인딩
- 컨테이너 간 통신이 단순해짐

## Nginx 역할

### 1. 정적 파일 서버
```nginx
root /usr/share/nginx/html;
index index.html;
```
- React 빌드 결과물 서빙
- JS, CSS, 이미지 등 정적 리소스 제공

### 2. SPA 라우팅 처리
```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```
- 모든 경로에서 `index.html` 반환
- React Router가 클라이언트에서 라우팅 처리

### 3. API 리버스 프록시
```nginx
location /api {
    proxy_pass http://localhost:8080;
}
```
- `/api/*` 요청을 백엔드로 전달
- CORS 문제 해결 (같은 origin으로 인식)

### 4. WebSocket 프록시
```nginx
location /ws {
    proxy_pass http://localhost:8080;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
}
```
- STOMP/SockJS WebSocket 연결 지원
- 실시간 스케줄 업데이트에 사용

## 요청 흐름

```
사용자 브라우저
       │
       ▼
   :80 (Nginx)
       │
       ├── /                    → React 앱 (index.html)
       ├── /schedule            → React 앱 (SPA 라우팅)
       ├── /api/schedules       → :8080 백엔드 프록시
       ├── /api/auth/login      → :8080 백엔드 프록시
       └── /ws/schedule         → :8080 WebSocket 프록시
```

## 배포 경로

| 서비스 | 배포 경로 | Docker Compose 파일 |
|--------|-----------|---------------------|
| 프론트엔드 | `$DEPLOY_PATH_FRONTEND` | `docker-compose.yaml` |
| 백엔드 | `$DEPLOY_PATH` | `docker-compose.yaml` (백엔드 저장소) |

## GitHub Secrets 설정

### 공통
| Secret | 설명 |
|--------|------|
| `SSH_HOST` | 배포 서버 IP 또는 호스트 |
| `SSH_USER` | SSH 사용자명 |
| `SSH_PASSWORD` | SSH 비밀번호 |

### 프론트엔드
| Secret | 설명 |
|--------|------|
| `DEPLOY_PATH_FRONTEND` | 프론트엔드 배포 경로 |

### 백엔드
| Secret | 설명 |
|--------|------|
| `DEPLOY_PATH` | 백엔드 배포 경로 |
| `DB_NAME` | PostgreSQL 데이터베이스명 |
| `DB_USERNAME` | PostgreSQL 사용자명 |
| `DB_PASSWORD` | PostgreSQL 비밀번호 |
| `JWT_SECRET` | JWT 서명 키 |
| `MAIL_USERNAME` | 메일 발송 계정 |
| `MAIL_PASSWORD` | 메일 발송 비밀번호 |

## 헬스체크

| 서비스 | 엔드포인트 | 체크 주기 |
|--------|------------|-----------|
| 프론트엔드 | `http://localhost:80/health` | 30초 |
| 백엔드 | `http://localhost:8080/actuator/health` | 30초 |
| PostgreSQL | `pg_isready` 명령어 | 10초 |

## 배포 명령어 (수동)

```bash
# 프론트엔드 배포
cd $DEPLOY_PATH_FRONTEND
docker-compose pull frontend
docker-compose up -d --remove-orphans

# 백엔드 배포
cd $DEPLOY_PATH
docker-compose pull app
docker-compose up -d --remove-orphans

# 로그 확인
docker-compose logs -f frontend
docker-compose logs -f app

# 상태 확인
docker-compose ps
```
