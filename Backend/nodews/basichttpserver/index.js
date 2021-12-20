
const http = require('http');

const port = 4444;

function requesthandler(req,res){
    console.log(req.url);
    res.writeHead(200,{'content-type':'text/html'});
    res.end('<h1>Gotcha!!</h1>');
}

const server = http.createServer(requesthandler);

server.listen(port,(err)=>{
    if (err) {
        console.log(err);
        return;
    }
    console.log("Server is up and running on port: ",port);
});