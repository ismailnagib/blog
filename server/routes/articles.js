var express = require('express');
var router = express.Router();
var { show, add, remove } = require('../controllers/articleController')

router.get('/', show)
router.post('/', add)
router.delete('/', remove)

module.exports = router;