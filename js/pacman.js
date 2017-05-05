// Variables globales de utilidad
var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
var w = canvas.width;
var h = canvas.height;
var game_over = document.getElementById("perder");


// GAME FRAMEWORK
var GF = function(){

 // variables para contar frames/s, usadas por measureFPS
    var frameCount = 0;
    var lastTime;
    var fpsContainer;
    var fps;
    var oldTime;

    //  variable global temporalmente para poder testear el ejercicio
    inputStates = {};

    const TILE_WIDTH=24, TILE_HEIGHT=24;
        var numGhosts = 4;
	var ghostcolor = {};
	ghostcolor[0] = "rgba(255, 0, 0, 255)";
	ghostcolor[1] = "rgba(255, 128, 255, 255)";
	ghostcolor[2] = "rgba(128, 255, 255, 255)";
	ghostcolor[3] = "rgba(255, 128, 0,   255)";
	ghostcolor[4] = "rgba(50, 50, 255,   255)"; // blue, vulnerable ghost
	ghostcolor[5] = "rgba(255, 255, 255, 255)"; // white, flashing ghost


	// hold ghost objects
	var ghosts = {};

    var Ghost = function(id, ctx){

		this.x = 0;
		this.y = 0;
		this.velX = 0;
		this.velY = 0;
		this.speed = 1;

		this.nearestRow = 0;
		this.nearestCol = 0;

		this.ctx = ctx;

		this.id = id;
		this.homeX = 0;
		this.homeY = 0;

        this.sprite = [3];
        this.sprite[0] = new Sprite('res/img/sprites.png', [456, 16*this.id + 65],[16,16], 0.005, [0,1]);
        this.sprite[1] = new Sprite('res/img/sprites.png', [585, 65],[16,16], 0.005, [0,1]);
        this.sprite[2] = new Sprite('res/img/sprites.png', [617, 65],[16,16], 0.005, [0,1]);

	   this.draw = function(){
		// Pintar cuerpo de fantasma
		// Tu código aquí
        if (this.state==Ghost.NORMAL || this.state==Ghost.VULNERABLE){
            if (this.state == Ghost.NORMAL){
                /*ctx.beginPath();
                ctx.fillStyle = ghostcolor[this.id];
                ctx.strokeStyle = ghostcolor[this.id];
                ctx.moveTo(this.x+thisGame.TILE_WIDTH/2,this.y);
                ctx.arc(this.x,this.y,thisGame.TILE_WIDTH/2,0,Math.PI,1);
                ctx.lineTo(this.x-thisGame.TILE_WIDTH/2,this.y+thisGame.TILE_HEIGHT/2);
                ctx.lineTo(this.x-thisGame.TILE_HEIGHT/4,this.y+thisGame.TILE_HEIGHT/3);
                ctx.lineTo(this.x+thisGame.TILE_WIDTH/22,this.y+thisGame.TILE_HEIGHT/2);
                ctx.lineTo(this.x+thisGame.TILE_WIDTH/4,this.y+thisGame.TILE_HEIGHT/3);
                ctx.lineTo(this.x+thisGame.TILE_WIDTH/2,this.y+thisGame.TILE_HEIGHT/2);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();*/
                ctx.save();
                ctx.translate(this.x-thisGame.TILE_WIDTH/2, this.y-thisGame.TILE_HEIGHT/2);
                this.sprite[0].render(ctx);
                ctx.restore();
            } else if (this.state = Ghost.VULNERABLE){
                if (thisGame.ghostTimer>100){
                    /*ctx.beginPath();
                    ctx.fillStyle = ghostcolor[4];
                    ctx.strokeStyle = ghostcolor[4];
                    ctx.moveTo(this.x+thisGame.TILE_WIDTH/2,this.y);
                    ctx.arc(this.x,this.y,thisGame.TILE_WIDTH/2,0,Math.PI,1);
                    ctx.lineTo(this.x-thisGame.TILE_WIDTH/2,this.y+thisGame.TILE_HEIGHT/2);
                    ctx.lineTo(this.x-thisGame.TILE_HEIGHT/4,this.y+thisGame.TILE_HEIGHT/3);
                    ctx.lineTo(this.x+thisGame.TILE_WIDTH/22,this.y+thisGame.TILE_HEIGHT/2);
                    ctx.lineTo(this.x+thisGame.TILE_WIDTH/4,this.y+thisGame.TILE_HEIGHT/3);
                    ctx.lineTo(this.x+thisGame.TILE_WIDTH/2,this.y+thisGame.TILE_HEIGHT/2);
                    ctx.closePath();
                    ctx.fill();
                    ctx.stroke();*/
                    ctx.save();
                    ctx.translate(this.x-thisGame.TILE_WIDTH/2, this.y-thisGame.TILE_HEIGHT/2);
                    this.sprite[1].render(ctx);
                    ctx.restore();
                } else{
                    if (thisGame.ghostTimer % 4 == 0){
                        /*ctx.beginPath();
                        ctx.fillStyle = ghostcolor[5];
                        ctx.strokeStyle = ghostcolor[5];
                        ctx.moveTo(this.x+thisGame.TILE_WIDTH/2,this.y);
                        ctx.arc(this.x,this.y,thisGame.TILE_WIDTH/2,0,Math.PI,1);
                        ctx.lineTo(this.x-thisGame.TILE_WIDTH/2,this.y+thisGame.TILE_HEIGHT/2);
                        ctx.lineTo(this.x-thisGame.TILE_HEIGHT/4,this.y+thisGame.TILE_HEIGHT/3);
                        ctx.lineTo(this.x+thisGame.TILE_WIDTH/22,this.y+thisGame.TILE_HEIGHT/2);
                        ctx.lineTo(this.x+thisGame.TILE_WIDTH/4,this.y+thisGame.TILE_HEIGHT/3);
                        ctx.lineTo(this.x+thisGame.TILE_WIDTH/2,this.y+thisGame.TILE_HEIGHT/2);
                        ctx.closePath();
                        ctx.fill();
                        ctx.stroke();*/
                        ctx.save();
                        ctx.translate(this.x-thisGame.TILE_WIDTH/2, this.y-thisGame.TILE_HEIGHT/2);
                        this.sprite[1].render(ctx);
                        ctx.restore();
                    } else{
                        /*ctx.beginPath();
                        ctx.fillStyle = ghostcolor[4];
                        ctx.strokeStyle = ghostcolor[4];
                        ctx.moveTo(this.x+thisGame.TILE_WIDTH/2,this.y);
                        ctx.arc(this.x,this.y,thisGame.TILE_WIDTH/2,0,Math.PI,1);
                        ctx.lineTo(this.x-thisGame.TILE_WIDTH/2,this.y+thisGame.TILE_HEIGHT/2);
                        ctx.lineTo(this.x-thisGame.TILE_HEIGHT/4,this.y+thisGame.TILE_HEIGHT/3);
                        ctx.lineTo(this.x+thisGame.TILE_WIDTH/22,this.y+thisGame.TILE_HEIGHT/2);
                        ctx.lineTo(this.x+thisGame.TILE_WIDTH/4,this.y+thisGame.TILE_HEIGHT/3);
                        ctx.lineTo(this.x+thisGame.TILE_WIDTH/2,this.y+thisGame.TILE_HEIGHT/2);
                        ctx.closePath();
                        ctx.fill();
                        ctx.stroke();*/
                        ctx.save();
                        ctx.translate(this.x-thisGame.TILE_WIDTH/2, this.y-thisGame.TILE_HEIGHT/2);
                        this.sprite[2].render(ctx);
                        ctx.restore();
                    }
                }
            }
            /*
            // Pintar ojos
            // Tu código aquí
            //Ojo derecho
            ctx.beginPath();
            ctx.arc(this.x+thisGame.TILE_WIDTH/4,this.y-thisGame.TILE_HEIGHT/5,TILE_WIDTH/5,0,2*Math.PI,1);
            ctx.fillStyle = "white";
            ctx.strokeStyle = ghostcolor[this.id];
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(this.x+thisGame.TILE_WIDTH/3,this.y-thisGame.TILE_HEIGHT/5,TILE_WIDTH/12,0,2*Math.PI,1);
            ctx.fillStyle = ghostcolor[4];
            ctx.strokeStyle = ghostcolor[4];
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            //Ojo izquierdo
            ctx.beginPath();
            ctx.arc(this.x-thisGame.TILE_WIDTH/6,this.y-thisGame.TILE_HEIGHT/5,TILE_WIDTH/5,0,2*Math.PI,1);
            ctx.fillStyle = "white";
            ctx.strokeStyle = ghostcolor[this.id];
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(this.x-thisGame.TILE_WIDTH/14,this.y-thisGame.TILE_HEIGHT/5,TILE_WIDTH/12,0,2*Math.PI,1);
            ctx.fillStyle = ghostcolor[4];
            ctx.strokeStyle = ghostcolor[4];
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            */
        }
        else {
            // Pintar ojos
            // Tu código aquí
            //Ojo derecho
            ctx.beginPath();
            ctx.arc(this.x+thisGame.TILE_WIDTH/4,this.y-thisGame.TILE_HEIGHT/5,TILE_WIDTH/5,0,2*Math.PI,1);
            ctx.fillStyle = "white";
            ctx.strokeStyle = ghostcolor[this.id];
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(this.x+thisGame.TILE_WIDTH/3,this.y-thisGame.TILE_HEIGHT/5,TILE_WIDTH/12,0,2*Math.PI,1);
            ctx.fillStyle = ghostcolor[4];
            ctx.strokeStyle = ghostcolor[4];
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            //Ojo izquierdo
            ctx.beginPath();
            ctx.arc(this.x-thisGame.TILE_WIDTH/6,this.y-thisGame.TILE_HEIGHT/5,TILE_WIDTH/5,0,2*Math.PI,1);
            ctx.fillStyle = "white";
            ctx.strokeStyle = ghostcolor[this.id];
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(this.x-thisGame.TILE_WIDTH/14,this.y-thisGame.TILE_HEIGHT/5,TILE_WIDTH/12,0,2*Math.PI,1);
            ctx.fillStyle = ghostcolor[4];
            ctx.strokeStyle = ghostcolor[4];
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        }

		// test12 Tu código aquí
		// Asegúrate de pintar el fantasma de un color u otro dependiendo del estado del fantasma y de thisGame.ghostTimer
		// siguiendo el enunciado

		// test13 Tu código aquí
		// El cuerpo del fantasma sólo debe dibujarse cuando el estado del mismo es distinto a Ghost.SPECTACLES


	}; // draw

	    	this.move = function() {
            // Tu código aquí
			var col = Math.floor(this.x/thisGame.TILE_WIDTH);
			var row = Math.floor(this.y/thisGame.TILE_HEIGHT);
			if (this.state == Ghost.NORMAL || this.state == Ghost.VULNERABLE) {
				if((this.x/thisGame.TILE_WIDTH)-col == 0.5 && (this.y/thisGame.TILE_HEIGHT)-row == 0.5){
					var posibleMov = [[0,-1],[1,0],[0,1],[-1,0]];
					var solucion = [];
					for(var i = 0; i<posibleMov.length; i++){
						if(!thisLevel.isWall(col+posibleMov[i][0],row+posibleMov[i][1])
							&& thisLevel.getMapTile(row+posibleMov[i][1],col+posibleMov[i][0]) != 21
							&& thisLevel.getMapTile(row+posibleMov[i][1],col+posibleMov[i][0]) != 20){
							solucion.push(posibleMov[i]);
						}
					}
					if(solucion.length>1){
						if(solucion.length>2 || (solucion[0][0] != solucion[1][0] && solucion[0][1] != solucion[1][1])){
							var direccion = Math.floor((Math.random() * solucion.length));
							direccion = solucion[direccion];
							if(direccion[0] != 0){
								this.velY = 0;
								if(direccion[0] > 0){
									this.velX = this.speed;
								}else{
									this.velX = 0 - this.speed;
								}
							}else{
								this.velX = 0;
								if(direccion[1] > 0){
									this.velY = this.speed;
								}else{
									this.velY = 0 - this.speed;
								}
							}
						}
					}else{
						if(solucion[0][0] != 0){
							this.velY = 0;
							if(solucion[0][0] > 0){
								this.velX = this.speed;
							}else{
								this.velX = 0 - this.speed;
							}
						}else{
							this.velX = 0;
							if(solucion[0][1] > 0){
								this.velY = this.speed;
							}else{
								this.velY = 0 - this.speed;
							}
						}
					}
				}
			}else{ // fantasma comido
				if(this.x == this.homeX && this.y == this.homeY){ // ha llegado a casa
					this.state = Ghost.NORMAL;
					this.speed = 1;
					switch(this.id){
						case 0:
							this.velX = this.speed;
							this.velY = 0;
							break;
						case 1:
							this.velX = this.speed;
							this.velY = 0;
							break;
						case 2:
							this.velX = 0;
							this.velY = 0-this.speed;
							break;
						case 3:
							this.velX = 0-this.speed;
							this.velY = 0;
							break;
					}
				}else if((this.x/thisGame.TILE_WIDTH)-col == 0.5 && (this.y/thisGame.TILE_HEIGHT)-row == 0.5              							&& this.state != Ghost.NORMAL){ // hacia casa
					var posibleMov = [[0,-1],[1,0],[0,1],[-1,0]];
					var solucion = [];
					for(var i = 0; i<posibleMov.length; i++){
						if(!thisLevel.isWall(col+posibleMov[i][0],row+posibleMov[i][1])
							&& thisLevel.getMapTile(row+posibleMov[i][1],col+posibleMov[i][0]) != 21
							&& thisLevel.getMapTile(row+posibleMov[i][1],col+posibleMov[i][0]) != 20){
							solucion.push(posibleMov[i]);
						}
					}
					if(solucion.length>1){
						if(solucion.length>2 || (solucion[0][0] != solucion[1][0] && solucion[0][1] != solucion[1][1])){//bifurcacion
							var distX = thisLevel.lvlWidth;
							direccionX = [];
							var distY = thisLevel.lvlHeight;
							direccionY = [];
							balX = Math.floor(this.homeX/thisGame.TILE_WIDTH);
							balY = Math.floor(this.homeY/thisGame.TILE_HEIGHT);
							distX = Math.abs(col-balX); // distancia de x al inicio
							distY = Math.abs(row-balY); // distancia de y al inicio
							for(var k = solucion.length-1; k>=0; k--){
								if(Math.abs(col+solucion[k][0]-balX)<distX){
									distX = Math.abs(col+solucion[k][0]-balX); //distancia minima
									direccionX = solucion[k]; //direccion con distancia minima
								}else if(Math.abs(row+solucion[k][1]-balY)<distY){
									distY = Math.abs(row+solucion[k][1]-balY); //distancia minima
									direccionY = solucion[k]; //direccion con distancia minima
								}
							}
							if(direccionX != 0 && direccionY == 0){
								direccion = direccionX;
							}else if(direccionX == 0 && direccionY != 0){
								direccion = direccionY;
							}else if(direccionX != 0 && direccionY != 0){// solo funciona en este mapa
								if((col==10 && row==10) || ((col==6 || col==14) && row==8)){
									direccion = posibleMov[2];
								}else if((col == 7 && row == 10) || (col == 4 && row == 8)){
									direccion = posibleMov[1];
								}else if((col == 13 && row == 10) || (col == 16 && row == 8)){
									direccion = posibleMov[3];
								}else if((col==4 || col==7 || col==13 || col==16) && (row==12 || row==14 || row==16)){
									direccion = posibleMov[0];//solo funciona en este mapa
								}else{//funciona en el resto de mapas
									if((col==6 || col==9) && (row==6 || row ==18)){
										direccion = posibleMov[3];
									}else if((col==11 || col==14) && (row==6 || row==18)){
										direccion = posibleMov[1];
									}else{
										var rndm = Math.floor((Math.random() * 2));
										if(rndm == 0){
											direccion = direccionX;
										}else{
											direccion = direccionY;
										}
									}
								}
							}else{
								if(this.y >= this.homeY && !thisLevel.isWall(col,row-1)){
									direccion = solucion[0];
								}else if(this.y < this.homeY && !thisLevel.isWall(col,row+1)){
									direccion = solucion[2];
								}else{
									direccion = solucion[Math.floor((Math.random() * solucion.length))];
								}
							}
							if(direccion[0] != 0){
								this.velY = 0;
								if(direccion[0] > 0){
									this.velX = this.speed;
									this.velY = 0;
								}else{
									this.velX = 0 - this.speed;
									this.velY = 0;
								}
							}else{
								this.velX = 0;
								if(direccion[1] > 0){
									this.velY = this.speed;
									this.velX = 0;
								}else{
									this.velY = 0 - this.speed;
									this.velX = 0;
								}
							}
						}
					}else{ // solo una direccion
						if(solucion[0][0] != 0){
							this.velY = 0;
							if(solucion[0][0] > 0){
								this.velX = this.speed;
							}else{
								this.velX = 0 - this.speed;
							}
						}else{
							this.velX = 0;
							if(solucion[0][1] > 0){
								this.velY = this.speed;
							}else{
								this.velY = 0 - this.speed;
							}
						}
					}
				}
			}
			this.x += this.velX;
			this.y += this.velY;
			// Test13 Tu código aquí
			// Si esl estado del fantasma es Ghost.SPECTACLES
			// Mover el fantasma lo más recto posible hacia la casilla de salida
		};

	}; // fin clase Ghost

	 // static variables
	  Ghost.NORMAL = 1;
	  Ghost.VULNERABLE = 2;
	  Ghost.SPECTACLES = 3;

	var Level = function(ctx) {
		this.ctx = ctx;
		this.lvlWidth = 0;
		this.lvlHeight = 0;

		this.map = [];

		this.pellets = 0;
		this.powerPelletBlinkTimer = 0;

	this.setMapTile = function(row, col, newValue){
		// tu código aquí
        thisLevel.map[(row*thisLevel.lvlWidth)+col] = newValue;

	};

	this.getMapTile = function(row, col){
		// tu código aquí
        return thisLevel.map[(row*thisLevel.lvlWidth)+col];

	};

	this.printMap = function(){
		// tu código aquí
	};

	this.loadLevel = function(){
		// leer res/levels/1.txt y guardarlo en el atributo map
		// haciendo uso de setMapTile
        $.get( "res/levels/1.txt", function( data ) {
			datos = data.split("\n");
			for (var i = 0, len = datos.length; i < len; i++) {
				datos[i] = datos[i].replace(/\s+$/,'');
				datos[i] = datos[i].split(" ");
			}
			thisLevel.lvlWidth = datos[0][2];
			thisLevel.lvlHeight = datos[1][2];

			for (var i = 4, len = datos.length; i < len; i++) {
				for (var j=0; j<datos[i].length; j++) {
					thisLevel.setMapTile(i-4,j,datos[i][j])
				}
			}
		});
	};

         this.drawMap = function(){

	    	var TILE_WIDTH = thisGame.TILE_WIDTH;
	    	var TILE_HEIGHT = thisGame.TILE_HEIGHT;

    		var tileID = {
	    		'door-h' : 20,
			'door-v' : 21,
			'pellet-power' : 3
		};

		 // Tu código aquí
        var pellet = 0;
        var baldosa;
		for(var i = 0; i<thisLevel.lvlWidth; i++){
			for(var j = 0; j<thisLevel.lvlHeight; j++){
				baldosa = thisLevel.getMapTile(j,i);
				if(baldosa == 0 || baldosa == 21 || baldosa == 20){
					null;
				}
                if(baldosa > 99 && baldosa < 200){
					ctx.beginPath();
                    ctx.fillStyle = "blue";
                    ctx.fillRect((i*TILE_WIDTH), (j*TILE_HEIGHT), TILE_WIDTH, TILE_HEIGHT);
                    ctx.closePath();
                    ctx.fill();
				}
				if(baldosa == 2){
					ctx.beginPath();
                    ctx.fillStyle = 'white';
					ctx.arc((i*TILE_WIDTH)+TILE_WIDTH/2,(j*TILE_HEIGHT)+TILE_HEIGHT/2,5,0,Math.PI*2,false);
					ctx.closePath();
                    ctx.fill();
					ctx.strokeStyle = 'white';
					ctx.stroke();
				}
				if(baldosa == 3){
                    if(thisLevel.powerPelletBlinkTimer < 30){
                        ctx.beginPath();
                        ctx.fillStyle = 'red';
                        ctx.arc((i*TILE_WIDTH)+TILE_WIDTH/2,(j*TILE_HEIGHT)+TILE_HEIGHT/2,5,0,Math.PI*2,false);
                        ctx.closePath();
                        ctx.fill();
                        ctx.strokeStyle = 'red';
                        ctx.stroke();
                    }
				}
				if(baldosa == 4){
					player.x = i*TILE_WIDTH+TILE_WIDTH/2;
					player.y = j*TILE_HEIGHT+TILE_HEIGHT/2;
					player.homeX = i*TILE_WIDTH+TILE_WIDTH/2;
					player.homeY = j*TILE_HEIGHT+TILE_HEIGHT/2;
					thisLevel.setMapTile(j,i,0);
				}
                if(baldosa == 10){
					ghosts[0].x = i*TILE_WIDTH+TILE_WIDTH/2;
					ghosts[0].y = j*TILE_HEIGHT+TILE_WIDTH/2;
					ghosts[0].homeX = i*TILE_WIDTH+TILE_WIDTH/2;
					ghosts[0].homeY = j*TILE_HEIGHT+TILE_WIDTH/2;
					thisLevel.setMapTile(j,i,0);
				}
				if(baldosa == 11){
					ghosts[1].x = i*TILE_WIDTH+TILE_WIDTH/2;
					ghosts[1].y = j*TILE_HEIGHT+TILE_HEIGHT/2;
					ghosts[1].homeX =i*TILE_WIDTH+TILE_WIDTH/2;
					ghosts[1].homeY = j*TILE_HEIGHT+TILE_HEIGHT/2;
					thisLevel.setMapTile(j,i,0);
				}
				if(baldosa == 12){
					ghosts[2].x = i*TILE_WIDTH+TILE_WIDTH/2;
					ghosts[2].y = j*TILE_HEIGHT+TILE_HEIGHT/2;
					ghosts[2].homeX = i*TILE_WIDTH+TILE_WIDTH/2;
					ghosts[2].homeY = j*TILE_HEIGHT+TILE_HEIGHT/2;
					thisLevel.setMapTile(j,i,0);
				}
				if(baldosa == 13){
					ghosts[3].x = i*TILE_WIDTH+TILE_WIDTH/2;
					ghosts[3].y = j*TILE_HEIGHT+TILE_HEIGHT/2;
					ghosts[3].homeX = i*TILE_WIDTH+TILE_WIDTH/2;
					ghosts[3].homeY = j*TILE_HEIGHT+TILE_HEIGHT/2;
					thisLevel.setMapTile(j,i,0);
				}
			}
		}
        thisLevel.pellets = pellet;
	};


		this.isWall = function(row, col) {
			// Tu código aquí
            var baldosa = thisLevel.getMapTile(col,row);
			if (baldosa >= 100){
				return true;
			}else{
				return false;
			}
		};


		this.checkIfHitWall = function(possiblePlayerX, possiblePlayerY, row, col){
				// Tu código aquí
				// Determinar si el jugador va a moverse a una fila,columna que tiene pared
				// Hacer uso de isWall
            var x = Math.floor(possiblePlayerX/thisGame.TILE_WIDTH);
			var y = Math.floor(possiblePlayerY/thisGame.TILE_HEIGHT);
			if(possiblePlayerX/thisGame.TILE_WIDTH-x == 0 || possiblePlayerY/thisGame.TILE_HEIGHT-y == 0){
				return this.isWall(x,y);
			}else if(possiblePlayerX/thisGame.TILE_WIDTH-x != 0.5 && possiblePlayerY/thisGame.TILE_HEIGHT-y != 0.5){
				return true;
			}else{
				return this.isWall(x,y);
            }
		};

		this.checkIfHit = function(playerX, playerY, x, y, holgura){

			// Tu código aquí
            if (Math.abs(playerX - x) < holgura && Math.abs(playerY - y) < holgura){
                return true;
            } else{
                return false;
            }
		};


		this.checkIfHitSomething = function(playerX, playerY, row, col){
			var tileID = {
	    			'door-h' : 20,
				'door-v' : 21,
				'pellet-power' : 3,
				'pellet': 2
			};

			// Tu código aquí
			//  Gestiona la recogida de píldoras
            if(row == null && col == null){
				var x = Math.floor(playerX/thisGame.TILE_WIDTH);
				var y = Math.floor(playerY/thisGame.TILE_HEIGHT);
			}else{
				x = col;
				y = row;
			}
			// Tu código aquí
			//  Gestiona la recogida de píldoras
            var baldosa = thisLevel.getMapTile(y,x);
			if(baldosa==tileID["pellet"]){
                eating.play();
				thisLevel.setMapTile(y,x,0);
				thisLevel.pellets--;
                thisGame.addToScore();
				if(thisLevel.pellets==0){
					console.log("Next level!");
				}
			}
			// Tu código aquí (test9)
			//  Gestiona las puertas teletransportadoras
			if(baldosa==tileID["door-h"]){
				for(var i = 0; i<thisLevel.lvlWidth; i++){
					if(thisLevel.getMapTile(y,i)==tileID["door-h"] && x != i){
						if(x>i){
							player.x = i*thisGame.TILE_WIDTH+thisGame.TILE_WIDTH;
						}else{
							player.x = i*thisGame.TILE_WIDTH-thisGame.TILE_WIDTH;
						}
					}
				}
			}
			if(baldosa==tileID["door-v"]){
				for(var j = 0; j<thisLevel.lvlHeight; j++){
					if(thisLevel.getMapTile(j,x) == tileID["door-v"] && y != j){
						if(y>j){
							player.y = j*thisGame.TILE_HEIGHT+thisGame.TILE_HEIGHT;
						}else{
							player.y = j*thisGame.TILE_HEIGHT-thisGame.TILE_HEIGHT;
						}
					}
				}
			}
			// test12 TU CÓDIGO AQUÍ
			// Gestiona la recogida de píldoras de poder
			// (cambia el estado de los fantasmas)
            if (baldosa == tileID['pellet-power']){
                eatpill.play();
                thisGame.ghostTimer = 360;
                for (var i = 0; i < numGhosts; i++){
                    if (ghosts[i].state != Ghost.SPECTACLES){
                       ghosts[i].state = Ghost.VULNERABLE;
                    }
                }
                thisLevel.setMapTile(y,x,0);
            }


		};

	}; // end Level

	var Pacman = function() {
		this.radius = 10;
		this.x = 0;
		this.y = 0;
		this.speed = 3;
		this.angle1 = 0.25;
		this.angle2 = 1.75;
        this.sprite = new Sprite('res/img/sprites.png', [454,0], [16,16], 0.005, [0,1,2]);
	};
	Pacman.prototype.move = function() {

		// Tu código aquí
		if(player.velX>0 && !thisLevel.checkIfHitWall(player.x+player.radius+player.velX,player.y)){
			player.x += player.velX;
		}
		if(player.velX<0 && !thisLevel.checkIfHitWall(player.x-player.radius+player.velX,player.y)){
			player.x += player.velX;
		}
		if(player.velY>0 && player.y < w-player.radius && !thisLevel.checkIfHitWall(player.x,player.y+player.radius+player.velY)){
			player.y += player.velY;
		}
		if(player.velY<0 && player.y-player.radius > 0 && !thisLevel.checkIfHitWall(player.x,player.y-player.radius+player.velY)){
			player.y += player.velY;
		}
		// tras actualizar this.x  y  this.y...
		 // check for collisions with other tiles (pellets, etc)
		// ....
		thisLevel.checkIfHitSomething(this.x, this.y, this.nearestRow, this.nearestCol);
        for (var i = 0; i < numGhosts; i++){
            if(thisLevel.checkIfHit(player.x,player.y,ghosts[i].x,ghosts[i].y,thisGame.TILE_WIDTH/2)){
                ctx.beginPath();
                ctx.fillStyle="red";
                ctx.font="bold 20px arial";
                ctx.fillText("GOLPE",550,18);
				if(ghosts[i].state == Ghost.VULNERABLE){
					ghosts[i].state = Ghost.SPECTACLES;
					ghosts[i].speed = 3;
				} else if (ghosts[i].state == Ghost.NORMAL){
                    thisGame.setMode(thisGame.HIT_GHOST);
                    player.velX = 0;
                    player.velY = 0;
                }
                break;
			}
        }
		// test13 Tu código aquí.  Si chocamos contra un fantasma y su estado es Ghost.VULNERABLE
		// cambiar velocidad del fantasma y pasarlo a modo Ghost.SPECTACLES
		//
		// test14 Tu código aquí.
		// Si chocamos contra un fantasma cuando éste esta en estado Ghost.NORMAL --> cambiar el modo de juego a HIT_GHOST
        this.sprite.update(delta);
	};


     // Función para pintar el Pacman
     Pacman.prototype.draw = function(x, y) {

         // Pac Man

	// tu código aquí
        /*ctx.beginPath();
		ctx.moveTo(player.x,player.y);
		ctx.arc(player.x,player.y,player.radius,player.angle1*Math.PI,player.angle2*Math.PI,false);
		ctx.closePath();
		ctx.fillStyle = 'yellow';
		ctx.fill();
        ctx.strokeStyle= "black";
		ctx.stroke();*/
        ctx.save();
        ctx.translate(player.x-TILE_WIDTH/2,player.y-TILE_HEIGHT/2);
        player.sprite.render(ctx);
        ctx.restore();

    };

	var player = new Pacman();
    var playerLife1 = new Pacman();
    var playerLife2 = new Pacman();
    var playerLife3 = new Pacman();

	for (var i=0; i< numGhosts; i++){
		ghosts[i] = new Ghost(i, canvas.getContext("2d"));
	}


	var thisGame = {
		getLevelNum : function(){
			return 0;
		},
	        setMode : function(mode) {
			this.mode = mode;
			this.modeTimer = 0;
		},
        addToScore : function(){
            this.points = thisGame.points + 2;
        },
		screenTileSize: [24, 21],
		TILE_WIDTH: 24,
		TILE_HEIGHT: 24,
		ghostTimer: 0,
		NORMAL : 1,
		HIT_GHOST : 2,
		GAME_OVER : 3,
		WAIT_TO_START: 4,
		modeTimer: 0,
        lifes: 3,
        points: 0,
        highscore: 0,
        playing: true
	};

	var thisLevel = new Level(canvas.getContext("2d"));
	thisLevel.loadLevel( thisGame.getLevelNum() );
	// thisLevel.printMap();



	var measureFPS = function(newTime){
		// la primera ejecución tiene una condición especial

		if(lastTime === undefined) {
			lastTime = newTime;
			return;
		}

		// calcular el delta entre el frame actual y el anterior
		var diffTime = newTime - lastTime;

		if (diffTime >= 1000) {

			fps = frameCount;
			frameCount = 0;
			lastTime = newTime;
		}

		// mostrar los FPS en una capa del documento
		// que hemos construído en la función start()
		fpsContainer.innerHTML = 'FPS: ' + fps;
		frameCount++;
	};

	// clears the canvas content
	var clearCanvas = function() {
		ctx.clearRect(0, 0, w, h);
	};

	var checkInputs = function(){
		// tu código aquí
		// LEE bien el enunciado, especialmente la nota de ATENCION que
		// se muestra tras el test 7
        if(inputStates.right && !thisLevel.checkIfHitWall(player.x+player.radius+player.speed,player.y)){
			var x = Math.floor((player.x+player.radius+player.speed)/thisGame.TILE_WIDTH)
			var y = Math.floor((player.y)/thisGame.TILE_HEIGHT)
			if(player.x+player.radius+player.speed/thisGame.TILE_WIDTH-x == 0.5 || player.y/thisGame.TILE_HEIGHT-y == 0.5){
				player.velY = 0;
				player.velX = player.speed;
			}
		}
		if(inputStates.down && !thisLevel.checkIfHitWall(player.x,player.y+player.radius+player.speed)){
			var x = Math.floor((player.x)/thisGame.TILE_WIDTH)
			var y = Math.floor((player.y+player.radius+player.speed)/thisGame.TILE_HEIGHT)
			if(player.x/thisGame.TILE_WIDTH-x == 0.5 || player.y+player.radius+player.speed/thisGame.TILE_HEIGHT-y == 0.5){
				player.velX = 0;
				player.velY = player.speed;
			}
		}
		if(inputStates.left && !thisLevel.checkIfHitWall(player.x-player.radius-player.speed,player.y)){
			var x = Math.floor((player.x-player.radius-player.speed)/thisGame.TILE_WIDTH)
			var y = Math.floor((player.y)/thisGame.TILE_HEIGHT)
			if(player.x-player.radius-player.speed/thisGame.TILE_WIDTH-x == 0.5 || player.y/thisGame.TILE_HEIGHT-y == 0.5){
				player.velY = 0;
				player.velX = 0-player.speed;
			}
		}
		if(inputStates.up && !thisLevel.checkIfHitWall(player.x,player.y-player.radius-player.speed)){
			var x = Math.floor((player.x)/thisGame.TILE_WIDTH)
			var y = Math.floor((player.y-player.radius-player.speed)/thisGame.TILE_HEIGHT)
			if(player.x/thisGame.TILE_WIDTH-x == 0.5 || player.y-player.radius-player.speed/thisGame.TILE_HEIGHT-y == 0.5){
				player.velX = 0;
				player.velY = 0-player.speed;
			}
		}else{
			player.velX = player.velX;
			player.velY = player.velY;
		}
	};


    var updateTimers = function(){
	// tu código aquí (test12)
        // Actualizar thisGame.ghostTimer (y el estado de los fantasmas, tal y como se especifica en el enunciado)
	    if (thisGame.ghostTimer == 0){
            for (var i = 0; i< numGhosts; i++){
		          if (ghosts[i].state != Ghost.SPECTACLES){
                      ghosts[i].state = Ghost.NORMAL;
                }
	        }
        }else{
            thisGame.ghostTimer--;
        }
	    // tu código aquí (test14)
	    // actualiza modeTimer...
        if (thisGame.mode == thisGame.HIT_GHOST){
            if (thisGame.modeTimer == 90){
                if (thisGame.lifes == 0){
                    thisGame.setMode(thisGame.GAME_OVER);
                    die.play();
                }
                else{
                    thisGame.lifes--;
                    reset();
                }
            }
        }
        if (thisGame.mode == thisGame.WAIT_TO_START){
            if (thisGame.modeTimer == 30){
                thisGame.setMode(thisGame.NORMAL);
            }
        }
        if (thisGame.mode == thisGame.GAME_OVER){
            drawGameOver();
            if (thisGame.modeTimer == 300){
                thisGame.points = 0;
                thisGame.lifes = 3;
                thisLevel.loadLevel();
                reset();
                game_over.style.display = "none";
            } else {
                thisGame.modeTimer++;
            }
        }

        thisGame.modeTimer++;
    };

    var displayScore = function(){
        ctx.beginPath();
        ctx.fillStyle="red";
        ctx.font="bold 20px arial";
        ctx.fillText("1UP",30,18);
        ctx.fillStyle="white";
        ctx.fillText(thisGame.points,100,18);
        ctx.fillStyle="red";
        ctx.font="bold 20px arial";
        ctx.fillText("HIGH SCORE",300,18);
        ctx.fillStyle="white";
        ctx.fillText(0,470,18);
        ctx.fillStyle="white";
        ctx.font="bold 20px arial";
        ctx.fillText("Lifes:",470,460);
        ctx.fillStyle="white";
        if (thisGame.lifes === 3){
            playerLife1 = new Pacman();
            playerLife2 = new Pacman();
            playerLife3 = new Pacman();
            ctx.save();
            ctx.translate(523,443);
            playerLife1.sprite.render(ctx);
            ctx.restore();
            ctx.save();
            ctx.translate(543,443);
            playerLife2.sprite.render(ctx);
            ctx.restore();
            ctx.save();
            ctx.translate(563,443);
            playerLife3.sprite.render(ctx);
            ctx.restore();
        } if (thisGame.lifes == 2){
            playerLife3 = null;
            ctx.save();
            ctx.translate(523,443);
            playerLife1.sprite.render(ctx);
            ctx.restore();
            ctx.save();
            ctx.translate(543,443);
            playerLife2.sprite.render(ctx);
            ctx.restore();
        } if (thisGame.lifes == 1) {
            playerLife2 = null;
            ctx.save();
            ctx.translate(523,443);
            playerLife1.sprite.render(ctx);
            ctx.restore();
        } if (thisGame.lifes == 0){
            playerLife1 = null;
        }

    };

    var drawGameOver = function(){
        game_over.style.position = "fixed";
        game_over.style.top = 250;
        game_over.style.left = 100;
        game_over.style.color = "red";
        game_over.style.font = "bold 60px arial";
        game_over.style.textShadow = "-2px -2px 1px #000";
        $('#perder').show();
    }

    var timer = function(currentTime) {
        var aux = currentTime - oldTime;
        oldTime = currentTime;
        return aux;
    };

    var mainLoop = function(time){
        //main function, called each frame
        measureFPS(time);

        // number of ms since last frame draw
        delta = timer(time);

	   // test14
	   // tu código aquí
	    // sólo en modo NORMAL
        if (thisGame.playing){
            if (thisGame.mode == thisGame.NORMAL){
            checkInputs();
            // Tu código aquí
            // Mover fantasmas
            for (var i = 0; i< numGhosts; i++){
              ghosts[i].move();
           }
            player.move();
            }
        }


        // Clear the canvas
            clearCanvas();

        thisLevel.drawMap();

        thisLevel.powerPelletBlinkTimer ++;
        if (thisLevel.powerPelletBlinkTimer == 60){thisLevel.powerPelletBlinkTimer = 0;}

        // Tu código aquí
            // Pintar fantasmas
        for (var i = 0; i < numGhosts; i++){
            ghosts[i].draw();
        }

        displayScore();

        player.draw();

        updateTimers();
            // call the animation loop every 1/60th of second
            requestAnimationFrame(mainLoop);
    };

    var addListeners = function(){
	    //add the listener to the main, window object, and update the states
	    // Tu código aquí
        window.addEventListener("keydown", function(e){
		var key = e.which;
		if(key == 37){
			inputStates.right = false;
			inputStates.up = false;
			inputStates.down = false;
			inputStates.left = true;
		}
		if(key == 38){
			inputStates.right = false;
			inputStates.down = false;
			inputStates.left = false;
			inputStates.up = true;
		}
		if(key == 39){
			inputStates.up = false;
			inputStates.down = false;
			inputStates.left = false;
			inputStates.right = true;
		}
		if(key == 40){
			inputStates.right = false;
			inputStates.up = false;
			inputStates.left = false;
			inputStates.down = true;
		}
		if(key == 32){
			console.log("PAUSE");
            thisGame.playing = !thisGame.playing;
		}
	});
    };

    var reset = function(){
	// Tu código aquí
	// Inicialmente Pacman debe empezar a moverse en horizontal hacia la derecha, con una velocidad igual a su atributo speed
	// inicializa la posición inicial de Pacman tal y como indica el enunciado
        player.x = player.homeX;
		player.y = player.homeY;
		player.velX = 0;
		player.velY = 0;
        inputStates.up = false;
		inputStates.down = false;
		inputStates.left = false;
		inputStates.right = true;
	// Tu código aquí (test10)
	// Inicializa los atributos x,y, velX, velY, speed de la clase Ghost de forma conveniente
        for (var i=0; i< numGhosts; i++){
			ghosts[i].x = ghosts[i].homeX;
			ghosts[i].y = ghosts[i].homeY;
		}
		ghosts[0].velX = ghosts[0].speed;
		ghosts[0].velY = 0;
		ghosts[1].velX = ghosts[1].speed;
		ghosts[1].velY = 0;
		ghosts[2].velX = 0;
		ghosts[2].velY = 0 - ghosts[2].speed;
		ghosts[3].velX = 0 - ghosts[3].speed;
		ghosts[3].velY = 0;
	    // test14
	    //thisGame.setMode(thisGame.NORMAL);
        thisGame.setMode( thisGame.WAIT_TO_START);
    };

    var loadAssets = function(){
        eatpill = new Howl({
            src: ['res/sounds/eat-pill.mp3'],
            volume: 1,
            onload: function() {
                eating = new Howl({
                    src: ['res/sounds/eating.mp3'],
                    volume: 1,
                    onload: function() {
                        requestAnimationFrame(mainLoop); // comenzar animación
                   }
                });
            }
        });
        die = new Howl({
            src: ['res/sounds/die.mp3'],
            volume: 1
        });
        waza = new Howl({
            src: ['res/sounds/waza.mp3'],
            volume: 1
        });
    }

    function init(){
        loadAssets();
    }

    var start = function(){
        // adds a div for displaying the fps value
        fpsContainer = document.createElement('div');
        document.body.appendChild(fpsContainer);

	   addListeners();

	   reset();

       resources.load([
          'res/img/sprites.png'
       ]);
        resources.onReady(init);
    };

    //our GameFramework returns a public API visible from outside its scope
    return {
        start: start,
	thisGame: thisGame
    };
};


  var game = new GF();
  game.start();


