// supertest 코드
const request = require("supertest");
const should = require("should");
const app = require("../../index");

// 사용자 조회
describe('GET /users는',()=>{
    //성공 케이스
    describe('성공시',()=>{
        it('유저 객체를 담은 배열로 응답한다',(done)=>{
            request(app) // supertest에 express 객체 전달
                .get('/users') // 요청 보냄
                .end((err,res)=>{ // 결과 수신
                    //res.body가 배열인지 확인
                    res.body.should.be.instanceOf(Array)
                    done(); // 비동기적으로 실행이 끝나면 done이 실행된다.
                });
        });

        it("최대 limit 갯수만큼 응답한다",(done)=>{
            request(app)
                .get('/users?limit=2') 
                .end((err,res)=>{ 
                    //limit 갯수(2)만큼만 응답하는지 확인
                    res.body.should.have.lengthOf(2);
                    done(); 
                });
        })
    })
    // 실패 케이스
    describe("실패시",()=>{
        it("limit이 숫자형이 아니면 400을 응답한다",(done)=>{
            request(app)
                .get("/users?limit=two")
                .expect(400) // 400 응답 검증
                .end((err,res)=>{
                    done();
                })
        })
    })
    
})

describe('GET /users/1는',()=>{
    describe("성공시",()=>{
        it("id가 1인 유저 객체를 반환한다",(done)=>{
            request(app)
                .get("/users/1")
                .end((err,res)=>{
                    res.body.should.have.property('id',1);
                    done();
                })
        })
    })
    describe("실패시",()=>{
        it("id가 숫자가 아닐 경우 400으로 응답한다",(done)=>{
            request(app)
                .get("/users/one")
                .expect(400)
                .end(done);
        });

        it("id로 유저를 찾을 수 없을 경우 404으로 응답한다",(done)=>{
            request(app)
                .get("/users/999")
                .expect(404)
                .end(done);
        });
    })
})

// 사용자 삭제
describe('DELETE /users/1', ()=>{
    describe("성공시",()=>{
        it("204를 응답한다",(done)=>{
            request(app)
                .delete("/users/1")
                .expect(204)
                .end(done);
        })
    })
    describe("실패시",()=>{
        it("id가 숫자가 아닐 경우 400으로 응답한다", done=>{
            request(app)
                .delete("/users/one")
                .expect(400)
                .end(done);
        })
    })
})

// 사용자 추가
describe('POST /users',()=>{
    describe("성공시", ()=>{
        // 테스트 케이스 동작 전 실행되는 함수
        var name = "daniel",
            body;
        before(done=>{
            request(app)
                .post("/users")
                .send({name}) //post body 데이터 추가
                .expect(201)
                .end((err,res)=>{
                    body = res.body;
                    done();
                })
        })

        it("생성된 유저 객체를 반환한다.",()=>{
            body.should.have.property('id')
        })
        
        it("입력한 name을 반환한다.",()=>{
            body.should.have.property('name',name)
        })
    })
    describe("실패시",()=>{
        it('name 파라미터 누락시 400을 반환한다', (done)=>{
            request(app)
                .post('/users')
                .send({})
                .expect(400)
                .end(done)
        })
        it('name이 중복일 경우 409를  반환한다', (done)=>{
            request(app)
                .post('/users')
                .send({name:"bek"})
                .expect(409)
                .end(done)
        })
    })
})

// 사용자 수정
describe("PUT /users/:id",()=>{
    describe("성공시",()=>{
        it("변경된 name을 응답한다",(done)=>{
            const name = "den;"
            request(app)
                .put("/users/2")
                .send({name})
                .end((err,res)=>{
                    res.body.should.have.property('name',name);
                    done();
                })
        })
    })
    describe("실패시",()=>{
        it("정수가 아닌 id일 경우 400을 응답한다",done=>{
            request(app)
                .put("/users/one")
                .expect(400)
                .end(done);
        })
        it("name이 없는 경우 400을 응답한다",done=>{
            request(app)
                .put("/users/1")
                .send({})
                .expect(400)
                .end(done);
        })
        it("없는 유저일 경우 404를 응답한다",done=>{
            request(app)
                .put("/users/999")
                .send({name:"foo"})
                .expect(404)
                .end(done);
        })
        it("이름이 중복일 경우 409를 응답한다",done=>{
            request(app)
                .put("/users/3")
                .send({name: 'chris'})
                .expect(409)
                .end(done);
        })
    })
})