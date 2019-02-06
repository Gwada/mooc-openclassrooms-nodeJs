/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   app.js                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dlavaury <dlavaury@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/02/05 23:46:13 by dlavaury          #+#    #+#             */
/*   Updated: 2019/02/06 16:43:11 by dlavaury         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const express	= require('express');
const ent		= require('ent');
const app		= express();
const server	= require('http').createServer(app);
const io		= require('socket.io').listen(server);
const todolist	= ['test', 'test1'];
let id			= 0;

app.get('/', (req, res) => res.sendFile(`${__dirname}/html/index.html`))
.get('/css/style.css', (req, res) => res.sendFile(`${__dirname}/css/style.css`))
.get('/js/script.js', (req, res) => res.sendFile(`${__dirname}/js/script.js`))
.use((req, res, next) => res.redirect('/'));

io.sockets.on('connection', socket => {
	socket.name	= ++id;

	console.log(`new client :  ${socket.name}`);

	socket.emit('current', JSON.stringify(todolist));
	socket.on('del', key => {
		index	= todolist.indexOf(key);
		if (index !== -1)
		{
			console.log(`client ${socket.name} remove : ${key}`);

			todolist.splice(index, 1);
			socket.broadcast.emit('current', JSON.stringify(todolist));
		}
	})
	.on('add', element => {
		element	= ent.encode(element);

		console.log(`client ${socket.name} add ${element}`);

		todolist.push(element);
		socket.broadcast.emit('add', element);
	});
});
server.listen(8080);