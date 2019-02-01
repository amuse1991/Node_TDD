
# 역할에 따른 파일 분리

## 모델, 서비스, DAO

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
- 테스트 환경에서는 package.json에 test 스크립트에  NODE_ENV=test를 주고 테스트한다.(윈도우의 경우 set NODE_ENV=test)
- 서버 실행 코드를 index.js에서 분리함으로써 테스트 시 서버가 여러번 실행되는 것을 방지할 수 있다.
(index.js에 실행 코드를 두면 require()에서 한 번, index.js 내부의 app.listen()에서 한 번 총 두 번 서버가 실행됨) 

## DB
1. bin/sync.db.js


## TDD
1. it.only(), describe.only() 로 실행하면 해당 테스트만 실행 가능하다.

2. 모카 옵션으로 -w(watch)를 주면 수정 사항 반영시 자동으로 테스트를 다시 진행한다
   ex) "scripts": {
    <em>"test": "set NODE_ENV=test && mocha NODE_API/api/user/user.spec.js -w"</em>,
    "start": "node NODE_API/bin/www.js"
  },


## Tip
1. ES6 문법
- {name:name} 같이 key와 value가 같은 것은 {name}으로 쓸 수 있다.