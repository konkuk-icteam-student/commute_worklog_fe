# 📌협업 컨벤션 (필독)

## 🪾깃 브랜치 전략 (Git Flow 사용)

1. **feat** 브랜치에서 기능개발
2. **develop** (default 브랜치, 이 브랜치가 원격의 origin)으로 코드 merge
3. **main** 에 배포

---

## 🌐push, pull, merge 및 배포 도메인으로 배포 방법

1.작업할 땐 항상 local의 **develop 브랜치**에서

```

git pull origin develop

```

으로 최신사항 반영해주시고, feat 브랜치를 파서 작업 진행해주세요.

---

2.작업 후

```
git push origin [feat브랜치명]
```

을 통해 원격의 develop 브랜치로 push 해주세요.

---

3.merge 되었다면 **CI 테스트**가 돌아갈 것입니다.

---

4.이후 배포 서버에 올리고 싶다면, 로컬 환경에서 develop 브랜치로 돌아온 다음,

```
git pull origin develop
```

으로 최신사항 받아와주세요.

---

5.main 브랜치로 branch switch 해주신 다음,

```
git merge develop
```

으로 로컬의 develop 브랜치 내용과 싱크를 맞춰주세요.

---

6.5번의 작업으로 main에 merge 커밋이 생기게 됩니다. 이 상태로

```
git push origin main
```

해주시고, 레포 들어가주시면 CI, CD, Prettier까지 3개의 테스트가 돌아가는 것을 확인하실 수 있으며테스트가 성공적으로 통과되었다면 배포 도메인에 (약간의 시간차 발생 가능) 정상적으로 적용되는 것을 확인할 수 있습니다.
