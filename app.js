/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   app.js                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dlavaury <dlavaury@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/02/05 23:46:13 by dlavaury          #+#    #+#             */
/*   Updated: 2019/02/06 00:25:27 by dlavaury         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const express	= require('express');
const ent		= require('ent');
const app		= express();
const server	= require('http').createServer(app);
const io		= require('socket.io').listen(server);
const todolist	= ['test', 'test1'];
let id			= 0;

app.get('/', (req, res) => res.sendFile(__dirname + '/html/index.html'))
.get('/css/style.css', (req, res) => res.sendFile(__dirname + '/css/style.css'))
.get('/js/script.js', (req, res) => res.sendFile(__dirname + '/js/script.js'))
.use((req, res, next) => res.redirect('/'));

// quand un client ce connecte
io.sockets.on('connection', socket => {
	socket.name	= ++id;

	console.log(`new client :  ${socket.name}`);

	// send the current todolist to the client
	socket.emit('current', JSON.stringify(todolist));
	// when a client want to remove a todo element
	socket.on('del', key => {
		// chaque element est identifie par une key : son contenue
		index	= todolist.indexOf(key);
		if (index !== -1)
		{
			console.log(`client ${socket.name} remove : ${key}`);
			// remove the element
			todolist.splice(index, 1);
			// send new list to all other client
			socket.broadcast.emit('current', JSON.stringify(todolist));
		}
	})
	// when a client want to add a element
	.on('add', element => {
		element	= ent.encode(element); // protect form script injection

		console.log(`client ${socket.name} add ${element}`);

		// add the new element
		todolist.push(element);
		// send notif to all other client
		socket.broadcast.emit('add', element);
	});
});
server.listen(8080);