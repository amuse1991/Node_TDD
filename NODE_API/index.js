const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan"); //서버 로그를 출력하는 미들웨어
const user = require("./api/user/index")

// 테스트 환경일 경우 로그가 찍히지 않도록 설정
//(테스트 상황에서는 morgan 모듈 사용하지 않음)
if(process.env.NODE_ENV !== 'test'){
    app.use(morgan('dev'));
}


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//user 라우팅 모듈 추가
app.use("/users",user);


module.exports = app;

