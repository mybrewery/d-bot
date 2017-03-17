"use strict";
/*constats*/
var HISTORY_NODE = document.getElementById("history-content");
var USER_INPUT = document.getElementById("user-input");


/*--------------------------------------------------------------------*/
/*message*/
var Message = function(type, text, parent){
	this.node = document.createElement("div");

	this.node.classList.add("message");
	this.node.classList.add(type);

	this.content = document.createElement("div");
	this.text = document.createElement("p");

	this.text.innerHTML = text;
	this.content.appendChild(this.text);
	this.node.appendChild(this.content);

	parent.appendChild(this.node);

	this.node.style.height = (this.content.clientHeight + 16) + "px";
};

/*--------------------------------------------------------------------*/
USER_INPUT.addEventListener('keypress', function(ev){
	if (ev.key == 'Enter' || ev.charCode == 13){
		ev.preventDefault();
		makeUserMessage(ev.target.value);
		ev.target.value = '';
	}
});

USER_INPUT.focus();


/*begin*/
var bot = new window.Bot();

/*--------------------------------------------------------------------*/
function makeMessage(type, text, autotalk){
	return new Message(type, text, HISTORY_NODE);
}

function makeUserMessage(text){
	makeMessage('user', text);
	bot.answer(text);
}


var menu = document.getElementById('menu');

menu.button = document.getElementById('button');

menu.button.addEventListener('click', function(){
	if (menu.classList.contains('hidden')){
		menu.classList.remove('hidden');
	} else {
		menu.classList.add('hidden');
	}
}, false);

