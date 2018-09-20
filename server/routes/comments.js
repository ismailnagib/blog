var express = require('express');
var router = express.Router();
var { show, add, edit, remove } = require('../controllers/commentController')
var { isLogin } = require('../middlewares/isLogin')

router.get('/', show)
router.post('/', isLogin, add)
router.delete('/', isLogin, remove)

module.exports = router;