const express = require("express");
const router = express.Router();
const ctrl = require("./user.ctrl")


// 사용자 조회
router.get('/',ctrl.index);

router.get('/:id',ctrl.show);

// 사용자 삭제
router.delete("/:id",ctrl.destroy);


//사용자 추가
router.post("/",ctrl.create);

//사용자 수정
router.put("/:id",ctrl.update);

module.exports = router;