"use strict";
var Bot = function(){
	this.timeoutID;
	this.mind = window.mind;
	this.extraMind = this.load() || [];

	this.autotalk = false;
	this.prevmsg = -1;

	this.say('Привет');
};

Bot.prototype = {
	save : function(){
		if (localStorage){
			localStorage.setItem('dummy-bot-extramind', JSON.stringify(this.extraMind));
		}
	},
	load : function(){
		var data;

		if (localStorage){
			data = localStorage.getItem('dummy-bot-extramind');
		}

		if (data){
			data = JSON.parse(data);
			this.mind = this.mind.concat(data);
		}

		return data;
	},
	remember : function(text){
		this.mind.push(text);
		this.extraMind.push(text);
		this.save();
	},
	think : function(secs){
		return (Math.random() * secs + secs) * 1000;
	},
	generate : function(text){
		var split = text.split(' ');
		var vars = [];
		var id;
		var lowString;
		var capString;

		split.size = split.length;

		for (var a = 0, l = this.mind.length; a < l; a++){
			for (var b = 0; b < split.size; b++){
				if (split[b].length < 4){
					continue;
				}

				lowString = split[b].substring(0, 4);
				capString = lowString.charAt(0).toUpperCase() + lowString.slice(1);

				if (this.mind[a].indexOf(lowString) > -1 || this.mind[a].indexOf(capString) > -1){
					vars.push(a);
				}

			}
		}

		if (vars.length && Math.random() > 0.25){
			id = vars[Math.floor(Math.random() * (vars.length - 1))];
		} else {
			id = Math.floor(Math.random() * (this.mind.length - 1));
		}

		if (split.length > 1 && !(/(.)\1\1/.test(text)) && this.mind.indexOf(text) < 0){
			this.remember(text);
		}

		if (this.prevmsg == id || this.mind[id] == this.prevusermsg){
			return this.generate(text);
		}

		this.prevmsg = id;

		return this.mind[id];
	},
	say : function(text){
		makeMessage('bot', text, this.autotalk);
		if (this.autotalk){
			this.answer(text);
		}
	},
	answer : function(text){
		clearTimeout(this.timeoutID);

		this.prevusermsg = text;

		this.timeoutID = setTimeout(function(){
			var replic = this.generate(text);
			this.say(replic);

			if (Math.random() > 0.75){
				this.timeoutID = setTimeout(function(){
					this.say(this.generate(''));
				}.bind(this), this.think(8));
			}

		}.bind(this), this.think(1.5));
	}
};

window.bot;