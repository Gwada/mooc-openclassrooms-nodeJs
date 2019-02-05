/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   script.js                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dlavaury <dlavaury@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/02/06 00:09:33 by dlavaury          #+#    #+#             */
/*   Updated: 2019/02/06 00:26:41 by dlavaury         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const todo			= document.getElementById('todo');
const form			= document.getElementById('new-todo');
const socket		= io.connect('http://127.0.0.1:8080');
const id			= [];

// function that create a new 'list element'
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
	// prevent the form to reload the page
	e.preventDefault();
	// send the new todo to server
	socket.emit('add', form.todo.value);
	todo.appendChild(newTodo(form.todo.value));
	// reset the field
	form.reset();
});

todo.addEventListener('click', e => {
	// get the click trough propagation
	if (e.target.type === 'remove') { // only the element 'a' of type 'remove'
		// send info to the server
		socket.emit('del', e.target.parentNode.children[1].textContent);
		// remove the list
		todo.removeChild(e.target.parentNode);
	}
	e.stopPropagation();
});

// when the server send a new todolist
socket.on('current', todolist => {
	todolist = JSON.parse(todolist);
	// remove all child of to
	while (todo.firstChild) {
		todo.removeChild(todo.firstChild);
	}
	// for each element in todolist create a new element to add to 'ul'
	for (let i = 0; i < todolist.length; i++) {
		todo.appendChild(newTodo(todolist[i]));
	}
}).on('add', element => todo.appendChild(newTodo(element)));