var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('./../config');
router.post('/check-facebook', function (req, res) {
    const email = req.body.email;
    const useAgent = config.userAgents[getRandomInt(0, config.userAgents.length-1)];
    const options = {
        url: 'https://m.facebook.com/login/identify/?ctx=recover&search_attempts=1',
        method: 'POST',
       // proxy: 'https://78.47.42.25:8080',
        form: { email, did_submit: "%D8%A8%D8%AD%D8%AB", lsd: "AVo5CiP2", jazoest: 2617},
        headers: {
            'Accept': 'application/x-www-form-urlencoded',
            "Access-Control-Allow-Origin": '*',
            'User-Agent': useAgent,
            'Content-Length': 16,
            "Origin" : "https://login.yahoo.com",
            "X-Requested-With":"XMLHttpRequest"
        }
    };
    request(options, function (err, response, body) {
       console.log(response);
        if(typeof response ==='undefined'){
            res.status(200).json({ error:"proxy die" })
        }else{
            if (JSON.stringify(response).includes('results=0')) {
                res.status(200).json({ email, status: true })
            } else {

                res.status(200).json({ email, status: false })
            }
        }
    });

});

router.post('/check-mail', function (req, res) {
    const email = req.body.email;

    const options = {
        url: `https://login.microsoftonline.com/common/userrealm/?user=${email}&api-version=2.1&stsRequest=rQIIAbNSzigpKSi20tcvyC8qSczRy09Ly0xO1UvOz9XLL0rPTAGxioS4BMruuVuZ2Fh77Wj-e6KxLMF2FaMaTp36OYl5KZl56XqJxQUVFxgZu5hYDA2MjTcxsfo6-zp5nmCacFbuFpOgf1G6Z0p4sVtqSmpRYklmft4jJt7Q4tQi_7ycypD87NS8Scx8OfnpmXnxxUVp8Wk5-eVAAaDxBYnJJfElmcnZqSW7mFVSU00tTCxTUnRNkpOTdU2Sksx0kwxSzXRTzZMtTC1ME00Mk1MOsGwIucAi8IOFcREr0C-3A6ZLrn182Gt-tWV-vVlpwi5OW-L8Yl-SWJSeWmKrapSWkpqWWJpTAhYGAA2&checkForMicrosoftAccount=true`,
        method: 'GET',
    
    };

    request(options, function (err, respone, body) {
        //console.log(JSON.parse(body).MicrosoftAccount);
        if (JSON.parse(body).MicrosoftAccount===0) {
            res.status(200).json({email, status:"exits"})
        } else {
            res.status(200).json({ email, status: "noExits" })
        }

    });

});


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = router;
