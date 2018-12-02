// title:  minotaur mania
// author: cyberhunk studios
// desc:   sacrifices must be made
// script: js

const gameState = {
	title: true,
	story: false,
	storyTimer: 1200,
	gameStart: false,
	gameStartTimer: 120,
	play: true,
	difficulty: 1,
	waveCleared: false,
	gameOver: false
};

const spawnLocation = [
	{ x: 100, y: 100, used: false },
	{ x: 50, y: 50, used: false },
	{ x: 75, y: 75, used: false }
];

const sacrifices = [];

function sacrifice() {
	this.x = 0;
	this.y = 0;
	this.dx = 0;
	this.dy = 0;
	this.spr = 257;
	this.health = 100;
	this.speed = 1;

	this.spawn = function() {
		var index = Math.floor(Math.random() * spawnLocation.length);
		var notAllUsed = false;

		if (spawnLocation[index].used === true) {
			//already been used
			//check if any remain unused. If so, recurse. Else, don't spawn.

			for (var i = 0, len = spawnLocation.length; i < len; i++) {
				if (spawnLocation[i].used === false) {
					notAllUsed = true;
				}
			}

			if (notAllUsed) {
				this.spawn(); //if some locations are not used, then try to spawn again
			}
		} else {
			this.x = spawnLocation[index].x;
			this.y = spawnLocation[index].y;
			spawnLocation[index].used = true;
		}
	};

	function getDirectionMapping(direction) {
		switch (direction) {
			case 0: {
				return 'l';
			}
			case 1: {
				return 'r';
			}
			case 2: {
				return 'u';
			}
			case 3: {
				return 'd';
			}
		}
	}

	this.move = function() {
		if (!this.halted) {
			if (this.canMoveDir('u')) {
				if (btn(0)) {
					this.dy -= 0.5;
					this.facing = 'u';
				}
			}
			if (this.canMoveDir('d')) {
				if (btn(1)) {
					this.dy += 0.5;
					this.facing = 'd';
				}
			}
			if (this.canMoveDir('l')) {
				if (btn(2)) {
					this.dx -= 0.5;
					this.facing = 'l';
				}
			}
			if (this.canMoveDir('r')) {
				if (btn(3)) {
					this.dx += 0.5;
					this.facing = 'r';
				}
			}

			this.x += this.dx;
			this.y += this.dy;
		}
	};

	this.stop = function() {
		this.dx = 0;
		this.dy = 0;
	};

	(this.canMoveDir = function(direction) {
		if (direction == 'l') {
			if (pix(this.x - 1, this.y) == 0 && pix(this.x - 1, this.y + 3) == 0)
				return true;
		}
		if (direction == 'r') {
			if (pix(this.x + 4, this.y) == 0 && pix(this.x + 4, this.y + 3) == 0)
				return true;
		}
		if (direction == 'u') {
			if (pix(this.x, this.y - 1) == 0 && pix(this.x + 3, this.y - 1) == 0)
				return true;
		}
		if (direction == 'd') {
			if (pix(this.x, this.y + 4) == 0 && pix(this.x + 3, this.y + 4) == 0)
				return true;
		}
	}),
		this.spawn();
}

function populateSacrifices() {
	var person = void 0;

	for (var i = 0; i < 2; i++) {
		person = new sacrifice();
		sacrifices.push(person);
	}
}

const waveTimer = {
	remaining: 3600, //60sec at 60fps
	tick: function(rate) {
		this.remaining = this.remaining - rate;
	}
};

function canMove(direction) {
	//make sure you bind ;)

	if (direction == 'l') {
		if (pix(this.x - 1, this.y) == 0 && pix(this.x - 1, this.y + 5) == 0)
			return true;
	}
	if (direction == 'r') {
		if (pix(this.x + 6, this.y) == 0 && pix(this.x + 6, this.y + 5) == 0)
			return true;
	}
	if (direction == 'u') {
		if (pix(this.x, this.y - 1) == 0 && pix(this.x + 5, this.y - 1) == 0)
			return true;
	}
	if (direction == 'd') {
		if (pix(this.x, this.y + 6) == 0 && pix(this.x + 5, this.y + 6) == 0)
			return true;
	}
}

const player = {
	x: 8,
	y: 16,
	dx: 0,
	dy: 0,
	facing: 'r',
	spr: 256,
	health: 100,
	attacking: false,
	speed: 1,
	halted: false,
	reset: function() {
		this.x = 8;
		this.y = 16;
		this.dx = 0;
		this.dy = 0;
		this.health = 100;
		this.attacking = false;
		this.halted = false;
	},
	move: function() {
		if (!this.halted) {
			if (this.canMoveDir('u')) {
				if (btn(0)) {
					this.dy -= 0.5;
					this.facing = 'u';
				}
			}
			if (this.canMoveDir('d')) {
				if (btn(1)) {
					this.dy += 0.5;
					this.facing = 'd';
				}
			}
			if (this.canMoveDir('l')) {
				if (btn(2)) {
					this.dx -= 0.5;
					this.facing = 'l';
				}
			}
			if (this.canMoveDir('r')) {
				if (btn(3)) {
					this.dx += 0.5;
					this.facing = 'r';
				}
			}

			this.x += this.dx;
			this.y += this.dy;
		}
	},
	stop: function() {
		this.dx = 0;
		this.dy = 0;
	},
	canMoveDir(direction) {
		if (direction == 'l') {
			if (pix(this.x - 1, this.y) == 0 && pix(this.x - 1, this.y + 5) == 0)
				return true;
		}
		if (direction == 'r') {
			if (pix(this.x + 6, this.y) == 0 && pix(this.x + 6, this.y + 5) == 0)
				return true;
		}
		if (direction == 'u') {
			if (pix(this.x, this.y - 1) == 0 && pix(this.x + 5, this.y - 1) == 0)
				return true;
		}
		if (direction == 'd') {
			if (pix(this.x, this.y + 6) == 0 && pix(this.x + 5, this.y + 6) == 0)
				return true;
		}
	},
	attack() {
		if (player.facing == 'r') {
			axe.x = player.x + 4;
			axe.y = player.y - 1;
			axe.flip = 0;
			axe.rotation = [0, 1];
		}

		if (player.facing == 'l') {
			axe.x = player.x - 6;
			axe.y = player.y - 1;
			axe.flip = 1;
			axe.rotation = [0, 1];
		}

		if (player.facing == 'u') {
			axe.x = player.x - 1;
			axe.y = player.y - 6;
			axe.flip = 3;
			axe.rotation = [1, 2];
		}

		if (player.facing == 'd') {
			axe.x = player.x - 1;
			axe.y = player.y + 4;
			axe.flip = 4;
			axe.rotation = [1, 2];
		}

		if (btn(4) && axe.cooldown <= 0) {
			axe.cooldown = 30;
			spr(axe.spr, axe.x, axe.y, 0, 1, axe.flip, axe.rotation[0]);
		} else if (axe.cooldown > 15) {
			axe.cooldown--;
			spr(axe.spr, axe.x, axe.y, 0, 1, axe.flip, axe.rotation[0]);
		} else if (axe.cooldown > 0) {
			axe.cooldown--;
			spr(axe.spr, axe.x, axe.y, 0, 1, axe.flip, axe.rotation[1]);
		}
	}
};

const axe = {
	x: 0,
	y: 0,
	spr: [272],
	rotation: [0, 0],
	flip: 0,
	hitEnemy: function() {
		//do stuff
	},
	cooldown: 0
};

function drawTitleScreen() {
	cls(0);

	if (btn(4)) {
		gameState.story = true;
		gameState.gameStart = false;
		player.reset();
	}
	if (btn(5)) {
		gameState.story = false;
		gameState.gameStart = true;
	}

	map(210, 120, 60, 60, 60, 10, 7, 2, null);

	var button1 = 'Z';
	if (!gameState.story) {
		button1 = 'Z';
	} else if (gameState.gameStartTimer > 90) {
		button1 = '3';
		gameState.gameStartTimer--;
	} else if (gameState.gameStartTimer > 60) {
		button1 = '2';
		gameState.gameStartTimer--;
	} else if (gameState.gameStartTimer > 30) {
		button1 = '1';
		gameState.gameStartTimer--;
	} else {
		gameState.title = false;
	}

	var button2 = 'X';
	if (!gameState.gameStart) {
		button2 = 'X';
	} else if (gameState.gameStartTimer > 90) {
		button2 = '3';
		gameState.gameStartTimer--;
	} else if (gameState.gameStartTimer > 60) {
		button2 = '2';
		gameState.gameStartTimer--;
	} else if (gameState.gameStartTimer > 30) {
		button2 = '1';
		gameState.gameStartTimer--;
	} else {
		gameState.title = false;
	}

	print('press [' + button1 + '] to start', 76, 114);
	print('press [' + button2 + '] to skip intro', 66, 124);
}

function drawGameOverScreen() {
	cls();

	if (btn(4)) {
		gameState.gameStart = true;
		player.reset();
	}

	if (btn(5)) {
		gameState.gameOver = false;
		gameState.title = true;
		player.reset();
	}

	var button = 'A';
	if (!gameState.gameStart) {
		button = 'A';
		gameState.gameStartTimer = 120;
	} else if (gameState.gameStartTimer > 90) {
		button = '3';
		gameState.gameStartTimer--;
	} else if (gameState.gameStartTimer > 60) {
		button = '2';
		gameState.gameStartTimer--;
	} else if (gameState.gameStartTimer > 30) {
		button = '1';
		gameState.gameStartTimer--;
	} else {
		gameState.gameOver = false;
	}

	print('YOU FAILED TO CLAIM THE THRONE', 42, 45);
	print('press [' + button + '] to try again', 68, 65);
	print('press [X] to give up', 75, 85);
}

function drawStory() {
	cls();

	if (gameState.storyTimer > 600) {
		print('Bastard of man and bull, you have been', 16, 10);
		print('exiled to a remote labyrinth in Crete.', 20, 20);
		print('A freak, a menace, an outcast.', 40, 40);
		print('But while your appearance may seem bestial,', 4, 60);
		print('your heart...', 86, 70);
		print('is human...', 176, 120);
		gameState.storyTimer--;
	} else {
		print('But the Gods have shown mercy, giving you', 12, 10);
		print('the chance to reclaim your humanity', 27, 20);
		print('by consuming the sacrifices and heroes', 18, 30);
		print('tossed before you.', 68, 40);
		print('Even more, as your power grows, you', 28, 60);
		print('may one day come to rule over those', 27, 70);
		print('who made you an outcast...', 56, 80);

		if (btn(4)) {
			gameState.gameStart = true;
			player.reset();
		}

		var button = 'A';
		if (!gameState.gameStart) {
			button = 'A';
			gameState.gameStartTimer = 120;
		} else if (gameState.gameStartTimer > 90) {
			button = '3';
			gameState.gameStartTimer--;
		} else if (gameState.gameStartTimer > 60) {
			button = '2';
			gameState.gameStartTimer--;
		} else if (gameState.gameStartTimer > 30) {
			button = '1';
			gameState.gameStartTimer--;
		} else {
			gameState.story = false;
			gameState.storyTimer = 1200;
		}

		print('press [' + button + '] to start', 76, 114);
	}
}

const isFirstRun = true;

function TIC() {
	init();

	if (gameState.title) {
		drawTitleScreen();
		return;
	}
	if (gameState.story) {
		drawStory();
		return;
	}
	if (gameState.gameOver) {
		drawGameOverScreen();
		return;
	}
	cls();
	//drawTestmap();
	//most params are default, just manually entered them cuz not sure what they all did tbh
	map(0, 0, 30, 17, 0, 0, -1, 1, null);
	updateSacs();
	updateTimer();
	drawUI();
	updatePlayer();
	drawPlayer();
}

function init() {
	if (isFirstRun) {
		populateSacrifices();
		isFirstRun = false;
	}
}

function updatePlayer() {
	player.stop();
	player.move();
	player.attack();
}

function updateSacs() {
	var person = void 0;

	for (var i = 0, len = sacrifices.length; i < len; i++) {
		person = sacrifices[i];
		person.stop();
		person.move();

		spr(person.spr, person.x, person.y, 0);
	}
}

function drawPlayer() {
	spr(player.spr, player.x, player.y, 0);
}

function updateTimer() {
	waveTimer.tick(gameState.difficulty);
	if (waveTimer.remaining <= 0) {
		gameState.gameOver = true;
		gameState.gameStart = false;
		waveTimer.remaining = 3600;
	}
}

function drawUI() {
	print('WAVE:', 164, 0, 1);
	for (i = 0; i < waveTimer.remaining / 75; i++) {
		rect(192 + i, 0, 1, 5, 1);
	}
}

// <TILES>
// 000:3773777777773773337737737733377373373733377333733373773337337733
// 001:9999999999999999999999999999999900000000000000000000000000000000
// 003:0000000000000000000000000000000099999999999999999999999999999999
// 005:0000999900009999000099990000999900009999000099990000999900009999
// 007:9999000099990000999900009999000099990000999900009999000099990000
// 009:9999999999999999999999999999999999990000999900009999000099990000
// 011:9999999999999999999999999999999900009999000099990000999900009999
// 013:0000999900009999000099990000999999999999999999999999999999999999
// 015:9999000099990000999900009999000099999999999999999999999999999999
// 200:7777777777777777777777777777777777777777777777777777777777777777
// 201:7777777777777777777777777777777777777777777777777777777777777777
// 202:7777770077777000777700067770006677700fff77700fff700000ff00000000
// 203:0007777760077777600777770007777700000777ff000000ffff0000ffffffff
// 204:77777777777777777777777777777777777777770000007700000000f4444000
// 205:7777777777777777777777777777777777777777777777770077777000007000
// 206:777777777777777770007777000007770060077700600777006007770ff00777
// 207:7777777777777777777777777777777777777777777777777777777777777777
// 216:7777777777777700777777047777770477777001777700117700011100011111
// 217:7777777000077770440007004444000014444000111444401111444411111144
// 218:0044400004444440044444444444444044444440044444400004444044004444
// 219:00ffffff000ffff4000444440044444404444444000000040000000044444400
// 220:44444444444444444444444444444444444444444eeee44444eeee4444444444
// 221:40000000444000ff44444fff444444ff4444440044444000444ee0004444e004
// 222:fff00777ff000777f00077770000077700000077000000074000400044004400
// 223:7777777777777777777777777777777777777777777777777777777707777777
// 226:0660006606660066066660660666666606606666066006660660006606600066
// 229:0006660000666660066606660660006606666666066666660660006606600066
// 231:0006600000066000000660000006600000066000000000000006600000066000
// 232:01111111111111111111111111111111ff1111110ff1111100fff1117000fff1
// 233:1111111411111111111111111111111111111111111111111111111111111111
// 234:4440004414444004114444001114444411104444110000441104400410044400
// 235:4004440000044440000444440044444440004400444000004444000404444400
// 236:0444444400444444004444440044444400440004004440000004444440004444
// 237:4444000044440000444400404444004444440044440000444440004444460444
// 238:4400444004004440000044400000444444444444444444444000444444000444
// 239:0777777707777777007777770007777740007777440007774440007744440007
// 240:6600006666600666666666666666666666066066660660666600006666000066
// 241:0666666006666660000660000006600000066000000660000666666006666660
// 242:6600066066600660666606606666666066066660660066606600066066000660
// 243:0066660006666660666006666600006666000066666006660666666000666600
// 244:6666666666666666000660000006600000066000000660000006600000066000
// 245:0066600006666600666066606600066066666660666666606600066066000660
// 246:6600066066000660660006606600066066000660660006606666666006666600
// 247:6666660066666660660006606600066066666660666666006600666066000666
// 248:777000ff77777000777777707777777077777777777777777777777777777777
// 249:f1111111ffff1111000ffff00000000000004444700000447770000077777000
// 250:0044000004444000044444444444444444444444444444440000000000000000
// 251:0044444000004400444000044444444444444400444400000000000400000444
// 252:4400644444006666400066660004666600444664004446004004444444000444
// 253:4466644466666444666644006664000064600004040004440000444444004444
// 254:4440004444440004004440040004000440000044440004444440004444440004
// 255:4444400044444400444444004444440044444400444440004444000744000077
// </TILES>

// <SPRITES>
// 000:ffffff0000440000444444000444400004444000040040000000000000000000
// 001:000000000cc00cc08888eeee08800ee0000000000cc00cc06666999906600990
// 002:000000000cc00cc02222dddd02200dd0000000000cc00cc0bbbb55550bb00550
// 003:00000000044004408888eeee08800ee000000000044004406666999906600990
// 004:00000000044004402222dddd02200dd00000000004400440bbbb55550bb00550
// 005:0cc00440a9eaa9ea0e900e900aa00aa00cc00440a6faa6fa0f600f600aa00aa0
// 006:0cc00440af2aaf2a02f002f00aa00aa00cc00440ab5aab5a05b005b00aa00aa0
// 007:000000000000000000000000000ee000000ee000000000000000000000000000
// 016:0000000000411100004111000040110000400000004000000040000000000000
// 096:4444000044440000444400004444000000000000000000000000000000000000
// </SPRITES>

// <MAP>
// 000: 404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
// 001:9010101010101010101010101010101010101010101010101010101010b09010101010101010109010901010101010101010101010101010101010b09010101010101010101010101010101010101010101010101010101010b09010101010101010101010101010101010101010101010101010101010b0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
// 002:704040404040404040404040404040404040404040404040404040404050704040404040404040704070404040114040404040404040404040404050704040404040404040404040404040404040404040404040404040404050704040404040404040404040404040404040404040404040404040404050000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
// 003:70329010101010101010101010b0a6a64090101010101010101010b0405090101010101010b0407040101010101010b0405040101010101010b0405070409010101010101010101010b0404090101010101010101010101040507040904040b0404040404040404040404040404040404040904040b04050000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
// 004:704070404040404040404040405040504070404040404040404040504050704040404040405040704040404040404050405040404040404040504050704070404040404040404040405040407040404040404040404040404050704040404040404040404040405040407040404040404040404040404050000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
// 005:704070b390101010101010b0b3504050407040901010101010b0405040507040901010b0405040704090101010b0405040504090101010b04050405070407040303030303030303030d040407040101010101010101010b04050704040404040404040404040405040407040404040404040404040404050000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
// 006:7040702070404040404040504050405040704070404040404050405040507040704040504050407040704040405040504050407040404050405040507040704040404040404040404040404070404040404040404040405040507040f04040d0404040404040405040407040404040404040f04040d04050000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
// 007:7040704070c3901010b040504050405040704070409010b04050405040507040704030d04050407040704090405040504050407040904050405040507040f030303030303030303030304040f030303030303030303030d0405070404040404040404040303030d04040f030303040404040404040404050000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
// 008:7040704070c3704040504050405040504070407040704050405040504050704070404040404040404070407040504050405040704070405040504050704040404040404040404040404040404040404040404040404040404050704040404040404040404040404040404040404040404040404040404050000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
// 009:7040704070c370404040405040504050407040704040405040504050405070407040405010b04070407040f030d04050405040704070405040504050704040404040404040404040404040404040404040404040404040404050704040404040404040404040404040404040404040404040404040404050000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
// 010:704070407040f030303030d040504050407040f0303030d04050405040507040f03030d040504070407040404040405040504070407040504050405070409010101010101010101010b040401010101010101010101010b0405070404040404040404040101010b040409010101040404040404040404050000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
// 011:7040707570404040404040404040405040704040404040404050405040507040404040404050407040f03030303030d04050407040704050405040507040704040404040404040404050404040404040404040404040405040507040904040b0404040404040405040407040404040404040904040b04050000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
// 012:70407075f030303030303030303030d040f030303030303030d04050405070403030303030d0407040404040404040404050407040f030d0405040507040f0303030303030303030405040409010101010101010101040504050704040404040404040404040405040407040404040404040404040404050000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
// 013:704070c3c34040404040404040404040404040404040404040404050405070407040404040404070409010b040404040405040704040404040504050704040404040404040404040405040407040404040404040404040504050704040404040404040404040405040407040404040404040404040404050000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
// 014:7040f0303030303030303030303030308330303030303030303030d040507040f030303030303070407040503030303030d040f03030303040d0405070403030303030303030303030d04040f030303030303030303030d040507040f04040d0404040404040404040404040404040404040f04040d04050000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
// 015:704040404040404040404040404040404040404040404040404040404050704040404040404040404070404040404040404040404040404040704050704040404040404040404040404040404040404040404040404040404050704040404040404040404040404040404040404040404040404040404050000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
// 016:f030303030303030303030303030303030303030303030303030303030d0f030303030303030303030f0303030303030303030303030303030f030d0f030303030303030303030303030303030303030303030303030303030d0f030303030303030303030303030303030303030303030303030303030d0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
// 120:0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000400f1f2f3f4f5f6f7f40404040404040404040404000000000000000000000
// 121:0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000408c9cacbcccdcecfc40404040404040404040404000000000000000000000
// 122:0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000408d9dadbdcdddedfd40404040404040404040404000000000000000000000
// 123:0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000408e9eaebecedeeefe40404040404040404040404000000000000000000000
// 124:0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000408f9fafbfcfdfefff40404040404040404040404000000000000000000000
// 125:000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000040400f5e2e1f5e7e4040404040404040404040404000000000000000000000
// 126:000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000040404040404040404040404040404040404040404000000000000000000000
// 127:000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000040404040404040404040404040404040404040404000000000000000000000
// 128:000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000040404040404040404040404040404040404040404000000000000000000000
// 129:000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000040404040404040404040404040404040404040404000000000000000000000
// 130:000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000040404040404040404040404040404040404040404000000000000000000000
// </MAP>

// <WAVES>
// 000:00000000ffffffff00000000ffffffff
// 001:0123456789abcdeffedcba9876543210
// 002:0123456789abcdef0123456789abcdef
// </WAVES>

// <SFX>
// 000:000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000304000000000
// </SFX>

// <PALETTE>
// 000:140c1cb2bab230346d847e6f854c30346524d04648757161597dced27d2c8595a16daa2cd2aa996dc2cadad45edeeed6
// </PALETTE>
