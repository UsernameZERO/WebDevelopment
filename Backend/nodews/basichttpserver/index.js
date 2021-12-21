
const http = require('http');
const port = 4444;
const fs = require('fs');// here fs is file system



function requesthandler(req,res){
    console.log(req.url);
    res.writeHead(200,{'content-type':'text/html'});
    let filePath;
    switch(req.url){
        case '/':
            filePath = './index.html'
            break;
        case '/profile':
            filePath = './profile.html'
            break;
        default :
            filePath = './404.html'
                
    }
    fs.readFile(filePath,(err,data)=>{
        if (err) {
            console.log('Error',err);
            return res.end('<h1>Error!</h1>');
        } else {
            return res.end(data);
        }
    })
}

const server = http.createServer(requesthandler);

server.listen(port,(err)=>{
    if (err) {
        console.log(err);
        return;
    }
    console.log("Server is running on port: ",port);
});