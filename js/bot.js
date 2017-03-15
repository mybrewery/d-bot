"use strict";
var Bot = function(){
	this.timeoutID;
	this.mind = window.mind;
	this.mind.size = this.mind.length;

	this.say('Привет');
};

Bot.prototype = {
	think : function(){
		return (Math.random() * 2000 + 2000);
	},
	generate : function(text){
		var split = text.split(' ');
		var vars = [];
		var id;
		var lowString;
		var capString;

		split.size = split.length;


		for (var a = 0; a < this.mind.size; a++){
			for (var b = 0; b < split.size; b++){
				if (split[b].length < 3){
					continue;
				}

				lowString = split[b].substring(0, 3);
				capString = lowString.charAt(0).toUpperCase() + lowString.slice(1);

				if (this.mind[a].indexOf(lowString) > -1 || this.mind[a].indexOf(capString) > -1){
					vars.push(a);
				}

			}
		}

		if (vars.length && Math.random() > 0.25){
			id = vars[Math.floor( Math.random() * (vars.length - 1))];
		} else {
			id = Math.floor(Math.random() * (this.mind.size - 1));
		}

		return this.mind[id];
	},
	say : function(text){
		makeMessage('bot', text);
	},
	answer : function(text){
		clearTimeout(this.timeoutID);

		this.timeoutID = setTimeout(function(){
			this.say(this.generate(text));
		}.bind(this), this.think());
	}
};

window.bot;