var express=require("express");
app=express();

var jwt = require("jsonwebtoken");
var request = require('request');
var auth=require('./auth');


var token='abcdefg123456';

var mysql=require('mysql');
var connection=mysql.createConnection({

    host:'localhost',
    user:'root',
    password:'1234',
    port     :'3308',
    database:'fintech'
});

connection.connect();



//ejs를 사용할 때
app.set('views', __dirname+'/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(express.json());
app.use(express.urlencoded({extended : false}));

var port=process.env.PORT||8080;


app.use(express.static(__dirname+'/public'));

app.get("/",function(request,response){
    response.render('main');

});
app.get('/sendUserData',function(req,res){
    var userId=req.query.userId;
    var userPwd=req.query.password;
    console.log(userId, userPwd);
    res.json(1);
})



app.get('/design',function(request,response){
response.render('design');
})

app.get('/authResults',function(req,res){
    //url쿼리에서 코드를 가져와서 authCode 변수에 삽
    var authCode=req.query.code;
    console.log(authCode);
    option ={
        url:"https://testapi.open-platform.or.kr/oauth/2.0/token",
        method : "POST",
        headers : {

        },
        form : {
            code : authCode,
            client_id : "l7xx54a06f74484046dfb62ca4a32ee48849",
            client_secret : "e23790614d5d44f085c06b0efe4a0f13",
            redirect_uri : "http://localhost:8080/authResults",
            grant_type : "authorization_code",
        }
    }
    request(option, function (error, response, body) {
    //서버 내부에서 client secret 처리
    console.log(body);
        if(error){
            console.log(error)
            throw error;
        }else{
            var accessTokenObj=JSON.parse(body);
            console.log(accessTokenObj);
            res.render('resultChild',{data:accessTokenObj});
        }
});
})

app.get("/sayHello",function(request,response){
    var user_name=request.query.user_name;
    response.end("Hello"+user_name+"!");

});

app.get('/main',function(req,res){
    res.render('main');

})

app.get('/signup',function(request,response){
    response.render('signup');
})
//프론트에서 데이터 받아서 db에 저장, sql문 통해서 값 전달
//회원가입 처리
app.post('/signup',function(req,res){
    var userEmail=req.body.userEmail;
    var userPassword=req.body.userPassword;
    var accessToken=req.body.accessToken;
    var refreshToken=req.body.refreshToken;
    var userseqnum=req.body.useseqnum;
    console.log(userEmail,userPassword,accessToken,refreshToken,userseqnum);

    var sql="INSERT INTO `fintech`.`user`"+
    "(`user_id`,`user_password`,`phone`,`accessToken`,`refreshToken`, `userseqnum`)"+" VALUES (?,?,?,?,?,?)";
    connection.query(sql,[userEmail,userPassword,"010",accessToken,refreshToken,userseqnum],function(err,result){
        if(err){
            console.error(err);
            throw err;
        }else{
            res.json(1);
        }
    })
})

app.get('/login',function(req,res){
    res.render('login');
})

app.post('/login', function(req, res){
    var userEmail = req.body.userEmail;
    var userPassword = req.body.userPassword;
    var accessToken = req.body.accessToken;
    var refreshToken = req.body.refreshToken;
    var useseqnum = req.body.useseqnum;
    console.log(userEmail, userPassword, accessToken, refreshToken, useseqnum);
    var sql = "INSERT INTO `fintech`.`user` " +
    "(`user_id`, `user_password`, `phone`, `accessToken`, `refreshToken`, `userseqnum`)"+
    " VALUES (?,?,?,?,?,?)";
    connection.query(sql,[userEmail,
        userPassword,
        "010",
        accessToken ,
        refreshToken,
        useseqnum ],function(err, result){
        if(err){
            console.error(err);
            throw err;
        }
        else {
            res.json(1);
        }
    })
})

app.listen(port);
console.log("Listening on port",port);

//app.use는 응용 프로그램에 middleware를 바인딩하기 위한 것. 미들웨어가 요청한 경로에만
//적용되도록 제한한다.
//__dirname 은 node 에서 제공하는 node 파일의 경로를 담고 있는 변수.
//__dirname+'/public' 을 조합해서 서버에 static folder 를 세팅
//app.use에 관한 좋은 사이트 https://codeday.me/ko/qa/20190308/20097.html