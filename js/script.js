/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   script.js                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dlavaury <dlavaury@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/02/06 00:09:33 by dlavaury          #+#    #+#             */
/*   Updated: 2019/02/06 16:42:14 by dlavaury         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const todo			= document.getElementById('todo');
const form			= document.getElementById('new-todo');
const socket		= io.connect('http://127.0.0.1:8080');
const id			= [];

function 			newTodo(text) {
	const li		= document.createElement('li');
	const a			= document.createElement('a');
	const p			= document.createElement('p');
	a.textContent 	= '❌';
	a.type 			= 'remove';

	p.classList.add('todolist-des');
	p.textContent = text;
	li.appendChild(a);
	li.appendChild(p);
	return (li);
}

form.addEventListener('submit', e => {
	e.preventDefault();
	socket.emit('add', form.todo.value);
	todo.appendChild(newTodo(form.todo.value));
	form.reset();
});

todo.addEventListener('click', e => {
	if (e.target.type === 'remove') {
		socket.emit('del', e.target.parentNode.children[1].textContent);
		todo.removeChild(e.target.parentNode);
	}
	e.stopPropagation();
});

socket.on('current', todolist => {
	todolist		= JSON.parse(todolist);
	let i			= -1;

	while (todo.firstChild) {
		todo.removeChild(todo.firstChild);
	}
	while (++i < todolist.length) {
		todo.appendChild(newTodo(todolist[i]));
	}
}).on('add', element => todo.appendChild(newTodo(element)));