const http = require('http');
const server = http.createServer(
    (req, res) => {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.write(
            '<!DOCTYPE html>' +
            '<html>' +
            '    <head>' +
            '        <meta charset="utf-8" />' +
            '        <title>Ma page Node.js !</title>' +
            '    </head>' +
            '    <body>' +
            '     	<p>Hello <strong>WORLD</strong> !</p>' +
            '    </body>' +
            '</html>'
        );
        res.end();
    }
);

server.listen(8080);