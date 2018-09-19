var express = require('express');
var router = express.Router();
var { show, showOne, add, remove } = require('../controllers/articleController')
var { isLogin } = require('../middlewares/isLogin')

router.get('/', show)
router.get('/:id', showOne )
router.post('/', isLogin, add)
router.delete('/', remove)

module.exports = router;