var fs=require('fs');
console.log('첫번째 기능입니다.');
fs.readFile('example/test.txt','utf8',function(err,result){
    if(err){
        console.error(err);
        throw err;
    }
    else{
        console.error("두번째 기능인데 파일을 읽어오느라 시간이...좀 거릴네요");
        console.log(result);
    }
});
console.log('마지막 기능입니다');