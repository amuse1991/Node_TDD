
# 역할에 따른 파일 분리

## root index 파일
1. express 설정
- 미들웨어 use
- 라우팅 미들웨어 use
- 등등..
2. express 서버 실행

## api/user 폴더
1. index.js
- 라우팅 설정 로직(express.Router 클래스 사용)
2. user.ctrl.js
- api 로직
3. user.spec.js
- 테스트 코드

## bin/www.js
- 서버 실행 코드(app.listen)
- 테스트 환경에서는 package.json에 test 스크립트에  NODE_ENV=test를 주고 테스트한다.
- 서버 실행 코드를 index.js에서 분리함으로써 테스트 시 서버가 여러번 실행되는 것을 방지할 수 있다.
(index.js에 실행 코드를 두면 require()에서 한 번, index.js 내부의 app.listen()에서 한 번 총 두 번 서버가 실행됨) 