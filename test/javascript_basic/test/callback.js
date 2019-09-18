var fs=require('fs');

function callbackFunc(callback){
    fs.readFile('example/test.txt','utf8',function(err,result){
        if(err){
            console.error(err);
            throw err;
        }
        else{
            console.error("두번째 기능인데 읽어오는데 오래걸림");
            callback(result);
        }
    });
    }

    console.log("A");
    callbackFunc(function(data){
        console.log(data);
        console.log("c");
    })
