const express = require('express');

// express application 생성
const app = express();

// logger 미들웨어 생성
function logger(req, res, next){
    console.log("i'm logger")
    next();
    // 미들웨어 작업이 끝난 후 next()를 호출해야 다음 작업을 수행한다.
    // ★★ next를 호출하지 않으면 다음 미들웨어가 실행되지 않으니 주의한다.
}

function logger2(req,res,next){
    console.log("i'm logger2")
    next();
}

// 일반 미들웨어
function common(req, res, next){
    console.log('common middle ware')
    next(new Error('error ouccered'));
}

// 에러 미들웨어
function errormw(err, req, res, next){
    console.log(err.message);
    next(); // 에러 직접 처리
    //next(err); // 에러를 다른 미들웨어로 다시 전달
}

// logger 미들웨어 추가
app.use(logger);
app.use(logger2);

app.use(common);
app.use(errormw);

// 요청 대기
app.listen(3000, ()=>{
    console.log("Server is running")
})