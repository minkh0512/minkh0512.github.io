const express = require('express');
const handlebars = require('express-handlebars');
const fortunes = [
    "기쁘다",
    "화난다",
    "슬프다",
    "즐겁다"
]

const app = express();

app
    .use(express.static(__dirname + '/public'))
    .engine('handlebars', handlebars() ) // 핸들바 뷰 엔진 설정
    .set('view engine','handlebars') // 핸들바 뷰 엔진 설정
    .set('port',process.env.PORT || 3000);

app
    .get('/', function(req, res){
        res.render('home');
    })
    .get('/about', function(req, res){
        const randomFortune = fortunes[Math.floor(Math.random()*fortunes.length)];
        res.render('about',{fortune : randomFortune});
    })
    .use(function(req, res, next){ // 404 폴백 핸들러 (미들웨어)
        res.status(404);
        res.render('404');
    })
    .use(function(err, req, res, next){ // 500 에러 핸들러 (미들웨어)
        console.error(err.stack);
        res.status(500);
        res.render('500');
    });

app.listen(app.get('port'), function(){
    console.log(`Express started on http://localhost: ${app.get('port')}; press Ctrl-C to terminate.`);
});

