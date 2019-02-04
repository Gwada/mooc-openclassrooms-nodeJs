const http = require('http');
const visitedAction = (req, res) => {
    res.writeHead(200);
    res.end('Hello world !');
};
const server = http.createServer(visitedAction);

server.listen(8080);