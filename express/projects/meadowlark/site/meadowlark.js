const express = require('express');
const handlebars = require('express-handlebars');
const fortunes = [
    "기쁘다",
    "화난다",
    "슬프다",
    "즐겁다"
]

const app = express();

app.use(function(req, res, next){
    res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
    next();
});

// 라우트 정의 코드
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
        res.render('about', {
            fortunes: fortunes.getFortune(),
            pageTestScript: '/qa/tests-about.js'
        });
        // const randomFortune = fortunes[Math.floor(Math.random()*fortunes.length)];
        // res.render('about',{fortune : randomFortune});
    })
    .get('/tours/hood-river', function(req, res){
        res.render('tours/hood-river');
    })
    .get('/tours/request-group-rate', function(req, res){
        res.render('tours/request-group-rate');
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

