const http = require("http");

const server = http.createServer(function(request,response){
if(request.method == "POST"){
    if(request.url == "/blog"){
     response.setHeader("Content-Type","text/plain");
     response.write("/blog");
     response.statusCode = 200;
     response.end();
    }else if(request.url == "/single-blog"){
        response.setHeader("Content-Type","text/plain");
        var rawData = [];
        request.on("data",(ch)=>{
            rawData.push(ch);
        });
        request.on("end",()=>{
            const data = Buffer.concat(rawData).toString();
            response.write(data);
            response.statusCode = 200;
            response.end();
        });
       
    }else if(request.url == "/add-blog"){
        response.setHeader("Content-Type","text/plain");
        response.write("/add-blog");
        response.statusCode = 200;
        response.end();
    }else{

    }
}else if(request.method == "GET"){

}
});

server.listen(80,"127.0.0.1",()=>{
    console.log("server started!");
});