// supertest 코드
const app = require("./index");
const request = require("supertest");

describe('GET /users는',()=>{
    it('...',(done)=>{
        request(app)
            .get('/users') // 요청 보냄
            .end((err,res)=>{ // 결과 수신
                console.log(res.body)
            })
            done(); // 비동기적으로 실행이 끝나면 done이 실행된다.
    })
})