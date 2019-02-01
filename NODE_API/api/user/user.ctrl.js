const models = require("../../../models");

const index = (req,res)=>{
    req.query.limit = req.query.limit || 10; // limit의 디폴드값 10으로 설정
    const limit = parseInt(req.query.limit,10); //10진 정수로 변환
    if(Number.isNaN(limit)){
        return res.status(400).end();
    }
    models.User
        .findAll({
            limit: limit
        })
        .then(users => {
            res.json(users);
        })
    //res.json(users.slice(0,limit));
};

const show = (req,res)=>{
    let id = parseInt(req.params.id,10);
    if(Number.isNaN(id)) return res.status(400).end();
    //const user = users.filter((user)=> user.id === id)[0];
    models.User.findOne({
        where:{id}
    }).then(user=>{
        if(!user) return res.status(404).end();
        res.json(user);
    })
    //if(!user) return res.status(404).end();
    //res.json(user);
}

const destroy = (req,res)=>{
    let id = parseInt(req.params.id,10);
    if(Number.isNaN(id)) return res.status(400).end();
    //삭제하지 않을 객체만 필터링(삭제하는 것과 같은 효과)
    
    models.User.destroy({
        where:{id:id}
    }).then(()=>res.status(204).end());
    //users = users.filter(user=>user.id !== id);
    //res.status(204).end();
}

const create = (req,res)=>{
    const name = req.body.name;
    //이름 값 있는지 확인
    if(!name) return res.status(400).end();
    
    //중복확인
    //const isConfilic = users.filter(user=>user.name === name).length;
    //if(isConfilic) return res.status(409).end();

    //const id = Date.now();
    //const user = {id,name};
    //users.push(user);

    models.User.create({name})
        .then(user=>{
            res.status(201).json(user);        
        })
        .catch(err=>{
            if(err.name === 'SequelizeUniqueConstraintError'){
                res.status(409).end();
            }
            res.status(500).end();
        })
}

const update = (req,res)=>{
    const id = parseInt(req.params.id,10);
    if(Number.isNaN(id)) return res.status(400).end();
    
    const name = req.body.name;
    if(!name) return res.status(400).end();
    
    //const isConflict = users.filter(user=> user.name === name).length
    //if(isConflict) return res.status(409).end();

    //const user = users.filter(user=>user.id===id)[0];
    //if(!user) return res.status(404).end();

    //user.name = name;

    models.User.findOne({where:{id}})
        .then(user=>{
            if(!user) return res.status(404).end();

            user.name = name;
            user.save()
                .then(_=>{
                    res.json(user);
                })
                .catch(err=>{
                    console.log(err)
                    if(err.name === 'SequelizeUniqueConstraintError'){
                        res.status(409).end();
                    }
                    res.status(500).end();
                })
        })

    //res.json(user);
}

module.exports = {
    index, show, destroy, create, update
}