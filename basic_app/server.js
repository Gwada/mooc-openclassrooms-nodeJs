/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   server.js                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dlavaury <dlavaury@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/02/04 17:32:35 by dlavaury          #+#    #+#             */
/*   Updated: 2019/02/04 18:22:43 by dlavaury         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const http = require('http');
const url = require('url');
const querystring = require('querystring');
const EventEmitter = require('events').EventEmitter;
const monModule = require('./monmodule');
const isTest = new EventEmitter();
const server = http.createServer((req, res) => {

    // get params
    const page = url.parse(req.url).pathname;
    const params = querystring.parse(url.parse(req.url).query);

    // emit events
    'test' in params && params.test === 'test' ? isTest.emit('isTest') : 0;

    // call modules function
    monModule.direBonjour();

    res.writeHead(200, {"Content-Type": "text/html"});
    res.write('<p>Hello <strong>WORLD</strong> !</p>');
    res.end();

    console.log(`page : ${page}`);
    console.log('params :', params);
});

isTest.on('isTest', () => console.log('isTest\n'));
server.listen(8080);

// var markdown = require('markdown').markdown;

console.log(markdown.toHTML('Un paragraphe en **markdown** !'));