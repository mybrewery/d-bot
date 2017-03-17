"use strict";
/*constats*/
var HISTORY_NODE = document.getElementById("history-content");
var USER_INPUT = document.getElementById("user-input");
var CURRENT_THEME = 0;
var SCROLLSPEED = 40;

/*--------------------------------------------------------------------*/
/*message*/
var Message = function(type, text, parent){
	this.node = document.createElement("div");

	this.node.classList.add("message");
	this.node.classList.add(type);

	this.content = document.createElement("div");
	this.content.classList.add("theme-sensitive");
	this.content.setAttribute('data-theme', 't' + CURRENT_THEME);
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

setTheme(CURRENT_THEME);

/*--------------------------------------------------------------------*/
function makeMessage(type, text, autotalk){
	return new Message(type, text, HISTORY_NODE);
}

function makeUserMessage(text){
	makeMessage('user', text);
	bot.answer(text);
}


var menu = document.getElementById('menu');
var themesTable = document.getElementById('themes');

menu.addEventListener('click', function(){
	if (menu.classList.contains('hidden')){
		menu.classList.remove('hidden');
	} else {
		menu.classList.add('hidden');
	}
}, false);

// menu.addEventListener('mousewheel', function(evt){ 
// 	if (evt.wheelDelta > 0) {
// 		menu.scrollTop -= SCROLLSPEED;
// 	} else {
// 		menu.scrollTop += SCROLLSPEED;
// 	}
// });

menu.addEventListener('mouseover', function(){ menu.hovered = true; });
menu.addEventListener('mouseout', function(){ menu.hovered = false; });


window.addEventListener('click', function(evt){
	if (!menu.hovered){
		menu.classList.add('hidden');
	}
});


//themes
var themes = document.getElementsByClassName('theme');

for (var a = 0; a < themes.length; a++){
	themes[a].addEventListener('click', handleThemeBtn.bind(themes[a]), false);
}

function handleThemeBtn(evt){
	evt.stopPropagation();
	var themeID = this.getAttribute('data-theme');
	setTheme(Number(themeID));
}

function setTheme(id){
	CURRENT_THEME = id;

	var themedElements = document.getElementsByClassName('theme-sensitive');
	var className = 't' + id;

	for (var a = 0; a < themedElements.length; a++){
		themedElements[a].setAttribute('data-theme', className);
	}

	var themeBGs = document.getElementsByClassName('theme-bg');

	for (a = 0; a < themeBGs.length; a++){
		if (themeBGs[a].classList.contains(className)){
			themeBGs[a].style.display = 'block';
		} else {
			themeBGs[a].style.display = 'none';
		}
	}

}