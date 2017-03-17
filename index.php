<!DOCTYPE html>
<html>
<head>
	<title>dBot</title>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, user-scalable=no" />
	<link rel="stylesheet" type="text/css" href="css/main.css">
</head>
<body>
	<div id="bg" class="theme-sensitive">
		<img class="theme-bg t0", src="./graphics/bg0.png">
		<img class="theme-bg t1", src="./graphics/bg1.png">
		<img class="theme-bg t2", src="./graphics/bg2.png">
		<img class="theme-bg t3", src="./graphics/bg3.png">
		<img class="theme-bg t4", src="./graphics/bg4.png">
		<img class="theme-bg t5", src="./graphics/bg5.png">
	</div>
	<div id="history" class="chat">
		<div id="history-content">
			<!-- content -->
		</div>
	</div>
	<div id="field" class="chat">
		<form><textarea id="user-input"rows="3"></textarea></form>
	</div>
	<div id="menu">
		<table id='themes'>
			<tr>
				<th>THEME</th>
			</tr>
			<tr>
				<td class="theme t0" data-theme="0"><div></div></td>
			</tr>
			<tr>	
				<td class="theme t1" data-theme="1"><div></div></td>
			</tr>
			<tr>	
				<td class="theme t2" data-theme="2"><div></div></td>
			</tr>
			<tr>
				<td class="theme t3" data-theme="3"><div></div></td>
			</tr>
			<tr>	
				<td class="theme t4" data-theme="4"><div></div></td>
			</tr>	
			<tr>	
				<td class="theme t5" data-theme="5"><div></div></td>
			</tr>	
		</table>
	</div>
	<script type="text/javascript" src="./js/mind.js"></script>
	<script type="text/javascript" src="./js/bot.js"></script>
	<script type="text/javascript" src="./js/chat.js"></script>
</body>
</html>