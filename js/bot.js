"use strict";
var Bot = function(){
	this.timeoutID;
	this.mind = window.mind;
	this.extraMind = this.load() || [];

	this.autotalk = false;
	this.prevmsg = -1;

	this.excl = [
		'что',

	];

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
		text = text.replace(/\,/g,"");
		text = text.replace(/\./g,"");
		text = text.replace(/\?/g,"");
		text = text.replace(/\)/g,"");

		var split = text.split(' ');
		var vars = [];
		var id;
		var chunk;

		split.size = split.length;

		console.log('USR-SPLIT:', split);

		for (var a = 0, l = this.mind.length; a < l; a++){
			for (var b = 0; b < split.size; b++){
				if (split[b].length < 3){
					continue;
				}

				chunk = split[b].charAt(0).toUpperCase() + split[b].slice(1);
				
				if (this.mind[a].match(/chunk/i)){
					console.log('BOT-FOUND', this.mind[a]);
					vars.push(a);
				}

			}
		}

		if (vars.length && Math.random() > 0.10){
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

		return this.mind[id].split(' // ')[0];
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