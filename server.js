const http = require("http");
const mysql = require("mysql");
var randomId = require('random-id');
const con = mysql.createConnection({
  "host":"localhost",
  "user":"root" ,
  "password":"",
  "database":"blog" 
});
con.connect((er)=>{
    if(er){
        console.log(er);
    }else{
        console.log("we are connected")
    }
});
const server = http.createServer(function(request,response){
if(request.method == "POST"){
    if(request.url == "/blog"){
     response.setHeader("Content-Type","text/plain");
     response.write("/blog");
     response.statusCode = 200;
     response.end();
    }else if(request.url == "/single-blog"){
        response.setHeader("Content-type","text/plain");
        response.setHeader("Access-Control-Allow-Origin","*")
        response.statusCode = 200
         
        var rawData = [];
        request.on("data",(d)=>{
            rawData.push(d);
        });
        request.on("end",()=>{
            var realData = Buffer.concat(rawData).toString()
           response.write(realData);
           response.statusCode = 200;
            response.end()
        })
       
    }else if(request.url == "/add-blog"){
        response.setHeader("Content-Type","text/plain");
        response.setHeader("Access-Control-Allow-Origin","*")
       // var reqtype = request.headers["content-type"];
        var rawData = [];
        request.on("data",(i)=>{
            rawData.push(i);
        });
        request.on("end",()=>{
           var data = Buffer.concat(rawData).toString();
           //response.write(reqtype)
           var error = [];
           var jsonData = JSON.parse(data);
           var id = randomId(20, '0Aa');
           con.query('INSERT INTO `blog`(`blog_id`, `title`, `body`) VALUES (?,?,?)',[id,jsonData.title,jsonData.content],(err)=>{
            if(err){
                error.push(err)
                console.log(er);
            }
            response.write(`{
                "status":1,
                "error":${error}
                }`);
            response.statusCode = 200;
            response.end();
           });
         
           
        });
      
    }else{

    }
}else if(request.method == "GET"){
    response.setHeader("Content-type","text/json");
    response.setHeader("Access-Control-Allow-Origin","*");
    if(request.url == "/blogs"){
        var error = [];
        con.query("SELECT * FROM `blog`",(er,rows)=>{
            if(er){
                error.push(er)
            }
            
            response.statusCode = 200
            response.write(JSON.stringify(rows))
            response.end()
        })
        
    }
}
});

server.listen(80,"127.0.0.1",()=>{
    console.log("server started!");
});



