const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan"); //서버 로그를 출력하는 미들웨어

var users = [
    {id:1, name:"alice"},
    {id:2, name:"bek"},
    {id:3, name:"chris"},
];

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// 사용자 조회
app.get('/users',(req,res)=>{
    req.query.limit = req.query.limit || 10; // limit의 디폴드값 10으로 설정
    const limit = parseInt(req.query.limit,10); //10진 정수로 변환
    if(Number.isNaN(limit)){
        return res.status(400).end();
    }
    res.json(users.slice(0,limit));
})

app.get('/users/:id',function(req,res){
    let id = parseInt(req.params.id,10);
    if(Number.isNaN(id)) return res.status(400).end();
    const user = users.filter((user)=> user.id === id)[0];
    if(!user) return res.status(404).end();
    res.json(user);
})

// 사용자 삭제
app.delete("/users/:id",(req,res)=>{
    let id = parseInt(req.params.id,10);
    if(Number.isNaN(id)) return res.status(400).end();
    //삭제하지 않을 객체만 필터링(삭제하는 것과 같은 효과)
    users = users.filter(user=>user.id !== id);
    res.status(204).end();

})


//사용자 추가
app.post("/users",(req,res)=>{
    const name = req.body.name;
    //이름 값 있는지 확인
    if(!name) return res.status(400).end();
    
    //중복확인
    const isConfilic = users.filter(user=>user.name === name).length;
    if(isConfilic) return res.status(409).end();

    const id = Date.now();
    const user = {id,name};
    users.push(user);
    res.status(201).json(user);
})

//사용자 수정
app.put("/users/:id",(req,res)=>{
    const id = parseInt(req.params.id,10);
    if(Number.isNaN(id)) return res.status(400).end();
    
    const name = req.body.name;
    if(!name) return res.status(400).end();
    const isConflict = users.filter(user=> user.name === name).length
    if(isConflict) return res.status(409).end();

    const user = users.filter(user=>user.id===id)[0];
    if(!user) return res.status(404).end();

    user.name = name;

    res.json(user);
})

app.listen(3000,()=>{
    console.log("Example app listening on port 3000")
});

module.exports = app;

