// Pages
let info;
let headText;
let bodyText;
let downText;
let tg;
let vk;
let git;

const cheatCode = ["Y", "A", "Y", "A", "X", "X", "B", "B"];
let combination = [];

function controlArr() {
	if (combination.length > 8) {
		combination = combination.slice(1, 9);
	}
	console.log(combination);
}

function clickA() {
	combination.push('A');
	controlArr();
}

function clickB() {
	combination.push('B');
	controlArr();
}

function clickX() {
	combination.push('X');
	controlArr();
}

function clickY() {
	combination.push('Y');
	controlArr();
}

// Entities
let player;

// Physics groups
let players;
let stars;
let enemies;
let playerShots;

// Variables
let cursorKeys;
let movingLeft = false;

// Input flags
class InputFlags {
	constructor() {
		this.reset();
	}
	
	read(keys) {
		this.up = keys.up.isDown;
		this.down = keys.down.isDown;
		this.left = keys.left.isDown;
		this.right = keys.right.isDown;
		this.shoot = keys.space.isDown;
		
		// Update movement vector
		this.updateMove();
	}
	
	reset() {
		this.up = false;
		this.down = false;
		this.left = false;
		this.right = false;
		this.shoot = false;
		this.dir = 0;
		
		// Update movement vector
		this.updateMove();
	}
	
	getDir() {
		return this.dir * Phaser.Math.DEG_TO_RAD;
	}
	
	updateMove() {
		let x = 0;
		let y = 0;
		if (this.up) y -= 1;
		if (this.down) y += 1;
		
		// Calculate angle
		let a = 0;
		let shift = 0;
		let offset = 90;
		if (y == 0) offset = 90;
		else if (y < 0) offset = 45;
		else if (y > 0) {
			shift = 180;
			offset = -45;
		}
		a = shift + offset * Math.sign(x);
		
		// Reduce angle, map it on 0-360 range
		a = a % 360;
		this.dir = a;
		
		// Calculate factor
		this.fac = (x !== 0 || y !== 0) ? 1 : 0;
	}
}

// Game scene
class SpaceShooter extends Phaser.Scene {
	preload() {
		// Sprites
		const spriteConfig = { frameWidth: 16, frameHeight: 16 };
		this.load.spritesheet('flighter', 'assets/sprites/space_shuttle.png',
			spriteConfig);
		this.load.spritesheet('shots', 'assets/sprites/shots.png',
			spriteConfig);
		this.load.spritesheet('enemy1', 'assets/sprites/enemy1.png',
			spriteConfig);
		this.load.spritesheet('explosion', 'assets/sprites/explotion.png',
			spriteConfig);
		this.load.spritesheet('stars', 'assets/sprites/stars.png', {
			frameWidth: 8, frameHeight: 8 });
	}

	create() {
		// Physics groups
		players = this.physics.add.group({ collideWorldBounds: true
	    });
		enemies = this.physics.add.group({ collideWorldBounds: false
		});
		playerShots = this.physics.add.group({ collideWorldBounds: true
		});
		
		// Setup collisions
		this.physics.add.collider(playerShots, enemies,
			this.onShotEnemyCollide, null, this
		);
		this.physics.world.on('worldbounds',
			this.onShotWorldBounds, this
		);
		
		// Entities
		player = this.physics.add.sprite(
			this.scale.width * 0.5,
			this.scale.height - 32,
			'flighter'
		);
		player.depth = 2;
		player.setCollideWorldBounds(true);
		player.inputFlags = new InputFlags();
		player.shootTime = 0;
		
		// Pages
		const content = ['student of the Far Eastern',
						'Federal University',
						'in the field of',
						'applied mathematics', 
						'and computer science']
						
		const style = { font: '12px "press-start"', fill: '#00FFFF' };
		const styleOver = { fill: '#FF00FF' };
		
		info = this.add.rectangle(0, 0, 510, 300, 0x000000);
		info.depth = 5;
		headText = this.add.text(10, 10, ['Manuilov', 'Mikhail'], { 
			font : '18px "press-start"' ,
			});
		headText.depth = 6;
		bodyText = this.add.text(10, 50, 'web-developer', { 
			font : '14px "press-start"' ,
			});
		bodyText.depth = 6;
		downText = this.add.text(10, 70, content, { 
			font : '9px "press-start"' ,
			});
		downText.depth = 6;

		function openVK() { window.open('https://vk.com/polosovoykotil', '_blank').focus(); };
		function openTelegram() { window.open('https://t.me/Polosovoykotil', '_blank').focus(); };
		function openGitHub() { window.open('https://github.com/Mishanya-web', '_blank').focus(); };
		
		const list = [
		  { name: "VK", event: openVK },
		  { name: "Telegram", event: openTelegram },
		  { name: "GitHub", event: openGitHub },
		];

		vk = this.add.text(10, 130, list[0].name, style)
			.setOrigin(0)
			   .setInteractive()
			   .on('pointerover', function () {
				this.setStyle(styleOver);
			})
			.on('pointerout', function () {
				this.setStyle(style);
			})
			.on('pointerdown', function () {
				list[0].event();
			}, this);
			vk.depth = 6;

		tg = this.add.text(45, 130, list[1].name, style)
			.setOrigin(0)
			   .setInteractive()
			   .on('pointerover', function () {
				this.setStyle(styleOver);
			})
			.on('pointerout', function () {
				this.setStyle(style);
			})
			.on('pointerdown', function () {
				list[1].event();
			}, this);
			tg.depth = 6;

		git = this.add.text(150, 130, list[2].name, style)
			.setOrigin(0)
			   .setInteractive()
			   .on('pointerover', function () {
				this.setStyle(styleOver);
			})
			.on('pointerout', function () {
				this.setStyle(style);
			})
			.on('pointerdown', function () {
				list[2].event();
			}, this);
			git.depth = 6;
			
		
		// Animations
		game.anims.create({
			key: 'enemy1',
			frames: game.anims.generateFrameNumbers('enemy1',
			{ start: 0, end: 2}
			),
			duration: 400,
			repeat: -1
		});
		game.anims.create({
			key: 'explosion',
			frames: game.anims.generateFrameNumbers('explosion',
			{ start: 0, end: 3 }
			),
			duration:400
		});

		// Create starfield
		this.updateWorldBounds();
		this.createStarField();
		
		// Initialize Input
		cursorKeys = this.input.keyboard.createCursorKeys();
		
		// Start spawning enemies
		this.spawnEnemy();
	}

	update(ts, dt) {
		this.updateWorldBounds();
		
		//Update info page location
		if (cheatCode.toString() === combination.toString()) {
			for (let j = 0; j < 150; j++) {
				info.y -=2;
				headText.y -=2;
				bodyText.y -=2;
				downText.y -=2;
				vk.y -= 2;
				tg.y -= 2;
				git.y -= 2;
			}
		}
		
		// BOT: Move player
		let width = this.scale.width;
		player.inputFlags.read(cursorKeys);
		
		if (player.inputFlags.space) {
			player.inputFlags.shoot = true;
		}
		
		// Move with keys right/left
		player.setFrame(0)
		if (player.inputFlags.left) {
			player.x -= 2;
			player.setFrame(1); 
		}
		
		else if (player.inputFlags.right) {
			player.x += 2;
			player.setFrame(2);
		}
		
		// Move with keys up/down
		//else if (player.inputFlags.up) {
		//	player.y -= 2;
		//}
		
		//else if (player.inputFlags.down) {
		//	player.y += 2;
		//}

		// Shoot?
		if (
			player.inputFlags.shoot &&
			this.game.getTime() - player.shootTime > 150
		) {
		  // Save new delay
		  player.shootTime = this.game.getTime();
		  this.spawnShot(player.x, player.y, 0);
		}
		
		// Move stars to bottom
		const bounds = this.physics.world.bounds;
		stars.forEach((star) => {
			star.y += 20 * star.speedMult * dt / 1000;
			if (star.y > bounds.y + bounds.height) {
				star.x = Phaser.Math.Between(
					bounds.x,
					bounds.y + bounds.width
				);
				star.y = bounds.y;
			}
		});
	}
	
	updateWorldBounds() {
		// Calculate viewport coordinates on scene
		const viewportWidth = this.getViewWidth();
		const viewportHeight = this.getViewHeight();
		const minX = (this.scale.width - viewportWidth) * 0.5;
		const maxX = this.scale.width - minX;
		const minY = (this.scale.height - viewportHeight) * 0.5;
		const maxY = this.scale.height - minY;
		
		// Update world bounds to keep entities within viewport
		this.physics.world.setBounds(
			minX, minY,
			maxX - minX, maxY - minY
		);
	}
	
	getViewWidth() {
		// Get viewport real width in game coordinates
		const sx = this.sys.game.scale.displayScale.x;
		if (sx <= 0) return 0;
		const mw = Math.min(
			this.sys.canvas.parentElement.clientWidth,
			this.sys.canvas.clientWidth
		);
		return mw * sx;
	}
	
	getViewHeight() {
		// Get viewport real height in game coordinates
		const sy = this.sys.game.scale.displayScale.y;
		if (sy <= 0) return 0;
		const mh = Math.min(
			this.sys.canvas.parentElement.clientHeight,
			this.sys.canvas.clientHeight
		);
		return mh * sy;
	}
	
	createStarField() {
		stars = [];
		const bounds = this.physics.world.bounds;
		for (let i = 0; i < 50; i++) {
			const x = Phaser.Math.Between(
				bounds.x,
				bounds.x + bounds.width
			);
			const y = Phaser.Math.Between(
				bounds.y,
				bounds.y + bounds.height
			);
			const star = this.add.sprite(x, y, 'stars');
			star.speedMult = Phaser.Math.Between(1, 3);
			stars.push(star);
			star.setFrame(3 - star.speedMult);
		}
	}
	
	spawnShot(x, y, angle) {
		const shot = this.physics.add.sprite(x, y, 'shots');
		const rad = Phaser.Math.DegToRad(angle);
		playerShots.add(shot);
		shot.setAngle(angle);
		shot.setBodySize(2, 2, true);
		shot.setVelocity(500 * Math.sin(rad), -500 * Math.cos(rad));
		shot.body.onWorldBounds = true;
		
		// Destroy bullet after delay
		this.time.addEvent({
			delay: 10000,
			callback: () => {
				shot.destroy();
			}
		});
	}
	
	spawnExplosion(x, y) {
		// Round coords
		x = Math.floor(x);
		y = Math.floor(y);
		
		// Effect
		const exp = this.add.sprite(x, y, 'explosion');
		exp.depth = 2;
		exp.play('explosion');
		
		// Hide after delay
		this.time.addEvent({
			delay: 400,
			callback: () => exp.destroy()
		});
	}
	
	spawnEnemy() {
		const bounds = this.physics.world.bounds;
		const posX = Phaser.Math.Between(bounds.x, bounds.y + bounds
			.width);
		const enemy = this.physics.add.sprite(posX, bounds.y - 32,
			'enemy1');
		enemy.play('enemy1');
		enemies.add(enemy);
		
		// Move
		enemy.body.velocity.y = 70;
		
		// Tween X
		enemy.body.velocity.x = -50;
		const tween = this.tweens.add({
			targets: enemy.body.velocity,
			x: 50,
			duration: 2000,
			ease: 'Cubic.easeInOut',
			repeat: -1,
			yoyo: true
		});
		enemy.tween = tween;
		
		// Respawn after delay
		this.time.addEvent({
			callback: () => this.spawnEnemy(),
			delay: 1000
		});
	}
	
	onShotEnemyCollide(shot, enemy) {
		this.spawnExplosion(enemy.x, enemy.y);
		shot.destroy();
		enemy.destroy();
	}
	
	onShotWorldBounds(body) {
		body.gameObject.destroy();
	}
}    
  

//Game config
const game = new Phaser.Game ({
	type: Phaser.CANVAS,
	backgroundColor: '#000',
	pixelArt: true,
	scale: {
		width: 255,
		height: 150,
	},
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 },
		}
	},
	scene: [SpaceShooter]
});
