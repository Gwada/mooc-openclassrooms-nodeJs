/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   app.js                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dlavaury <dlavaury@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/02/04 22:04:10 by dlavaury          #+#    #+#             */
/*   Updated: 2019/02/05 23:19:27 by dlavaury         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
/* Permet de bloquer les caractères HTML
(sécurité équivalente à htmlentities en PHP) */
const ent = require('ent');

// Chargement de la page index.html
app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));

io.sockets.on('connection', (socket, pseudo) => {
    /* Dès qu'on nous donne un pseudo,
    on le stocke en variable de session
    et on informe les autres personnes */
    socket.on('nouveau_client', pseudo => {
        pseudo = ent.encode(pseudo);

        socket.pseudo = pseudo;
        socket.broadcast.emit('nouveau_client', pseudo);
    });

    /* Dès qu'on reçoit un message,
    on récupère le pseudo de son auteur
    et on le transmet aux autres personnes */
    socket.on('message', message => {
        message = ent.encode(message);

        socket.broadcast.emit('message', {pseudo: socket.pseudo, message: message});
    });

    socket.on('disconnect', () => {
        const login = socket.pseudo !== undefined ? socket.pseudo : 'Un utilisateur';

        socket.broadcast.emit('message', {pseudo: socket.pseudo, message: 'a quitté le chat'});
    });
});


server.listen(8080);