var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/kiem-tra-dangki-fb', function (req, res, next) {
 res.render('checkfb');
});

router.get('/lay-danh-sach-mail-ngau-nhien', function (req, res, next) {
 res.render('getmail');
});
router.get("/kiem-tra-dang-ki-mails", function (req, res, next) {
 res.render('checkmail');
})




module.exports = router;
