var http=require("http");

http.createServer(function(reg,res){
    var body="hello Server";
    res.end("안녕하세요");
    res.setHeader('Content-Type','text/plain;charset=utf-8');
    console.log("request!")
}).listen(3000);
//포트 하나당 프로세스 하나만 점유 가능. 충돌을 조심할 것