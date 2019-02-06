/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   server.js                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dlavaury <dlavaury@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/02/06 15:42:13 by dlavaury          #+#    #+#             */
/*   Updated: 2019/02/06 16:29:42 by dlavaury         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const http = require('http');
const server = http.createServer(
    (req, res) => {
        res.writeHead(200);
        res.end('Hello world !');
    }
);

server.listen(8080);