# API 연동 문서

이 문서는 학생용 출퇴근 관리 시스템의 API 연동 현황을 기록합니다.

## 목차

- [Chapter 2: Work Schedule API](#chapter-2-work-schedule-api)
- [Chapter 3: Attendance API](#chapter-3-attendance-api)
- [Chapter 4: User API](#chapter-4-user-api)
- [Chapter 5: Home API](#chapter-5-home-api)
- [Chapter 6: Task API](#chapter-6-task-api)

---

## 파일 구조

```
src/commute/
├── shared/
│   ├── apis/
│   │   ├── schedule.api.ts      # 근무 일정 API
│   │   ├── attendance.api.ts    # 출퇴근 API
│   │   ├── user.api.ts          # 사용자 API
│   │   ├── home.api.ts          # 홈 API
│   │   └── task.api.ts          # 업무 API
│   └── types/
│       ├── schedule.types.ts    # 근무 일정 타입
│       ├── attendance.types.ts  # 출퇴근 타입
│       ├── user.types.ts        # 사용자 타입
│       ├── home.types.ts        # 홈 타입
│       └── task.types.ts        # 업무 타입
```

---

## Chapter 2: Work Schedule API

> **상태**: ✅ 완료

### 파일 위치

- Types: `src/commute/shared/types/schedule.types.ts`
- API: `src/commute/shared/apis/schedule.api.ts`

### 구현된 함수

| 함수명                  | HTTP 메서드 | 엔드포인트                            | 설명                         |
| ----------------------- | ----------- | ------------------------------------- | ---------------------------- |
| `applyWorkSchedule`     | POST        | `/api/v1/work-schedules/apply`        | 근무 일정 일괄 신청          |
| `modifyWorkSchedule`    | PATCH       | `/api/v1/work-schedules/modify`       | 근무 일정 수정               |
| `getMySchedules`        | GET         | `/api/v1/work-schedules`              | 나의 근무 일정 조회          |
| `getMyHistory`          | GET         | `/api/v1/work-schedules/history`      | 나의 지난 근무 이력 조회     |
| `getWorkScheduleDetail` | GET         | `/api/v1/work-schedules/{scheduleId}` | 특정 근무 일정 상세 조회     |
| `deleteWorkSchedule`    | DELETE      | `/api/v1/work-schedules/{scheduleId}` | 근무 일정 취소/삭제          |
| `getAllScheduleHistory` | GET         | `/api/v1/admin/schedule/history/all`  | 전체 근무 이력 조회 (관리자) |

### 사용 예시

```typescript
import { getMySchedules, applyWorkSchedule } from '@/commute/shared/apis/schedule.api';

// 근무 일정 조회
const response = await getMySchedules(2026, 1);
if (response.isSuccess) {
  console.log(response.details.schedules);
}

// 근무 일정 신청
const applyResponse = await applyWorkSchedule({
  slots: [{ start: '2026-01-11T09:00:00', end: '2026-01-11T12:00:00' }],
});
```

---

## Chapter 3: Attendance API

> **상태**: ✅ 완료

### 파일 위치

- Types: `src/commute/shared/types/attendance.types.ts`
- API: `src/commute/shared/apis/attendance.api.ts`

### 구현된 함수

| 함수명            | HTTP 메서드 | 엔드포인트                     | 설명                     |
| ----------------- | ----------- | ------------------------------ | ------------------------ |
| `checkIn`         | POST        | `/api/v1/attendance/check-in`  | QR 코드를 통한 출근 체크 |
| `checkOut`        | POST        | `/api/v1/attendance/check-out` | QR 코드를 통한 퇴근 체크 |
| `getTodayHistory` | GET         | `/api/v1/attendance/today`     | 오늘의 출퇴근 기록 조회  |

### 타입 정의

```typescript
// 체크 타입 코드
type CheckTypeCode = 'CT01' | 'CT02'; // CT01: 출근, CT02: 퇴근

// 오늘의 출퇴근 기록 단건
interface TodayAttendanceHistory {
  attendanceId: number;
  checkTime: string; // ISO 8601: "2026-01-11T08:55:00"
  checkType: CheckTypeCode;
}
```

### 사용 예시

```typescript
import { checkIn, checkOut, getTodayHistory } from '@/commute/shared/apis/attendance.api';

// 출근 체크 (QR 스캔 후)
const checkInResponse = await checkIn({ qrToken: 'scanned_qr_token' });
if (checkInResponse.isSuccess) {
  alert(checkInResponse.message); // "출근 처리가 완료되었습니다."
}

// 퇴근 체크 (QR 스캔 후)
const checkOutResponse = await checkOut({ qrToken: 'scanned_qr_token' });
if (checkOutResponse.isSuccess) {
  alert(checkOutResponse.message); // "퇴근 처리가 완료되었습니다."
}

// 오늘의 출퇴근 기록 조회
const historyResponse = await getTodayHistory();
if (historyResponse.isSuccess) {
  historyResponse.details.histories.forEach((record) => {
    console.log(`${record.checkType === 'CT01' ? '출근' : '퇴근'}: ${record.checkTime}`);
  });
}
```

---

## Chapter 4: User API

> **상태**: ✅ 완료

### 파일 위치

- Types: `src/commute/shared/types/user.types.ts`
- API: `src/commute/shared/apis/user.api.ts`

### 구현된 함수

| 함수명               | HTTP 메서드 | 엔드포인트                           | 설명                |
| -------------------- | ----------- | ------------------------------------ | ------------------- |
| `getMyInfo`          | GET         | `/api/v1/users/me`                   | 내 정보 조회        |
| `getWeeklyWorkTime`  | GET         | `/api/v1/users/me/work-time/weekly`  | 주간 근무 시간 조회 |
| `getMonthlyWorkTime` | GET         | `/api/v1/users/me/work-time/monthly` | 월간 근무 시간 조회 |

### 타입 정의

```typescript
// 역할 코드
type RoleCode = 'RL01' | 'RL02'; // RL01: 학생, RL02: 관리자

// 내 정보 상세
interface MyInfoDetails {
  userId: number;
  email: string;
  name: string;
  roleCode: RoleCode;
  organizationName: string;
}

// 근무 시간 조회 응답 상세
interface WorkTimeDetails {
  totalMinutes: number;
  periodType: 'WEEKLY' | 'MONTHLY';
}
```

### 사용 예시

```typescript
import { getMyInfo, getWeeklyWorkTime, getMonthlyWorkTime } from '@/commute/shared/apis/user.api';

// 내 정보 조회
const myInfoResponse = await getMyInfo();
if (myInfoResponse.isSuccess) {
  const { name, email, organizationName } = myInfoResponse.details;
  console.log(`${name} (${email}) - ${organizationName}`);
}

// 주간 근무 시간 조회
const weeklyResponse = await getWeeklyWorkTime();
if (weeklyResponse.isSuccess) {
  const hours = Math.floor(weeklyResponse.details.totalMinutes / 60);
  const minutes = weeklyResponse.details.totalMinutes % 60;
  console.log(`이번 주 근무 시간: ${hours}시간 ${minutes}분`);
}

// 월간 근무 시간 조회
const monthlyResponse = await getMonthlyWorkTime();
if (monthlyResponse.isSuccess) {
  const hours = Math.floor(monthlyResponse.details.totalMinutes / 60);
  const minutes = monthlyResponse.details.totalMinutes % 60;
  console.log(`이번 달 근무 시간: ${hours}시간 ${minutes}분`);
}
```

---

## Chapter 5: Home API

> **상태**: ✅ 완료

### 파일 위치

- Types: `src/commute/shared/types/home.types.ts`
- API: `src/commute/shared/apis/home.api.ts`

### 구현된 함수

| 함수명                | HTTP 메서드 | 엔드포인트                       | 설명                                    |
| --------------------- | ----------- | -------------------------------- | --------------------------------------- |
| `getTodayWorkTime`    | GET         | `/api/v1/home/work-time`         | 오늘의 근무 시간 및 예정 스케줄 수 조회 |
| `getAttendanceStatus` | GET         | `/api/v1/home/attendance-status` | 현재 출퇴근 버튼 상태 조회              |

### 타입 정의

```typescript
// 출퇴근 버튼 상태
type AttendanceStatusType =
  | 'CHECK_IN_AVAILABLE' // 출근 가능
  | 'CHECK_OUT_AVAILABLE' // 퇴근 가능
  | 'COMPLETED'; // 금일 출퇴근 완료

// 오늘의 근무 시간 및 스케줄 수
interface TodayWorkTimeDetails {
  totalMinutes: number;
  scheduleCount: number;
}

// 출퇴근 상태 상세
interface AttendanceStatusDetails {
  status: AttendanceStatusType;
  lastCheckTime: string | null; // ISO 8601 또는 null
}
```

### 사용 예시

```typescript
import { getTodayWorkTime, getAttendanceStatus } from '@/commute/shared/apis/home.api';

// 오늘의 근무 시간 조회
const workTimeResponse = await getTodayWorkTime();
if (workTimeResponse.isSuccess) {
  const { totalMinutes, scheduleCount } = workTimeResponse.details;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  console.log(`오늘 근무 시간: ${hours}시간 ${minutes}분`);
  console.log(`예정된 스케줄: ${scheduleCount}건`);
}

// 출퇴근 상태 조회 (버튼 상태 결정)
const statusResponse = await getAttendanceStatus();
if (statusResponse.isSuccess) {
  const { status, lastCheckTime } = statusResponse.details;

  switch (status) {
    case 'CHECK_IN_AVAILABLE':
      // 출근 버튼 표시
      console.log('출근 버튼 활성화');
      break;
    case 'CHECK_OUT_AVAILABLE':
      // 퇴근 버튼 표시
      console.log('퇴근 버튼 활성화');
      break;
    case 'COMPLETED':
      // 출퇴근 완료 상태 표시
      console.log('금일 출퇴근 완료');
      break;
  }
}
```

---

## Chapter 6: Task API

> **상태**: ✅ 완료

### 파일 위치

- Types: `src/commute/shared/types/task.types.ts`
- API: `src/commute/shared/apis/task.api.ts`

### 구현된 함수

| 함수명           | HTTP 메서드 | 엔드포인트                  | 설명                       |
| ---------------- | ----------- | --------------------------- | -------------------------- |
| `getTasksByDate` | GET         | `/api/v1/tasks?date={date}` | 특정 날짜의 업무 목록 조회 |
| `getTaskDetail`  | GET         | `/api/v1/tasks/{taskId}`    | 특정 업무의 상세 정보 조회 |

### 타입 정의

```typescript
// 업무 유형 코드
type TaskTypeCode = 'TT01' | 'TT02'; // TT01: 정규 업무, TT02: 비정규 업무

// 업무 단건 (목록 조회용)
interface Task {
  taskId: number;
  title: string;
  taskTime: string; // "14:00:00"
  isCompleted: boolean;
}

// 업무 상세 (상세 조회용)
interface TaskDetail {
  taskId: number;
  title: string;
  assigneeId: number;
  taskDate: string; // "2025-10-24"
  taskTime: string; // "14:00:00"
  taskType: TaskTypeCode;
  isCompleted: boolean;
}

// 특정 날짜의 업무 목록 상세
interface TasksByDateDetails {
  date: string;
  regularTasks: Task[];
  irregularTasks: Task[];
}
```

### 사용 예시

```typescript
import { getTasksByDate, getTaskDetail } from '@/commute/shared/apis/task.api';

// 특정 날짜의 업무 목록 조회
const tasksResponse = await getTasksByDate('2025-10-24');
if (tasksResponse.isSuccess) {
  const { regularTasks, irregularTasks } = tasksResponse.details;

  console.log('=== 정규 업무 ===');
  regularTasks.forEach((task) => {
    const status = task.isCompleted ? '완료' : '미완료';
    console.log(`[${status}] ${task.title} - ${task.taskTime}`);
  });

  console.log('=== 비정규 업무 ===');
  irregularTasks.forEach((task) => {
    const status = task.isCompleted ? '완료' : '미완료';
    console.log(`[${status}] ${task.title} - ${task.taskTime}`);
  });
}

// 특정 업무 상세 조회
const detailResponse = await getTaskDetail(50);
if (detailResponse.isSuccess) {
  const { title, taskType, taskDate, taskTime, isCompleted } = detailResponse.details;
  const typeLabel = taskType === 'TT01' ? '정규 업무' : '비정규 업무';
  console.log(`${title} (${typeLabel})`);
  console.log(`일시: ${taskDate} ${taskTime}`);
  console.log(`상태: ${isCompleted ? '완료' : '미완료'}`);
}
```

---

## UI 연동 가이드

### API 호출 패턴

모든 API 함수는 다음 패턴을 따릅니다:

```typescript
// 1. API 함수 import
import { functionName } from '@/commute/shared/apis/[module].api';

// 2. API 호출 (async/await 사용)
try {
  const response = await functionName(params);

  // 3. 응답 처리
  if (response.isSuccess) {
    // 성공 처리
    console.log(response.details);
  } else {
    // 실패 처리
    console.error(response.message);
  }
} catch (error) {
  // 네트워크 에러 등 예외 처리
  console.error('API 호출 실패:', error);
}
```

### 공통 응답 타입

```typescript
interface ApiResponse<T = null> {
  isSuccess: boolean; // 성공 여부
  message: string; // 응답 메시지
  details: T; // 상세 데이터
}
```

---

## 변경 이력

| 날짜       | 작업 내용                            | 작업자   |
| ---------- | ------------------------------------ | -------- |
| 2026-01-14 | Chapter 2 (Work Schedule API) 문서화 | API 연동 |
| 2026-01-14 | Chapter 3 (Attendance API) 구현 완료 | API 연동 |
| 2026-01-14 | Chapter 4 (User API) 구현 완료       | API 연동 |
| 2026-01-14 | Chapter 5 (Home API) 구현 완료       | API 연동 |
| 2026-01-14 | Chapter 6 (Task API) 구현 완료       | API 연동 |
