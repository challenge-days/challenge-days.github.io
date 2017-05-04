game.module(
    'game.main'
)
    .require(
        'game.assets',
        'game.objects'
    )
    .body(function () {

       game.createScene('Main', {
            init: function () {
                this.world = new game.World(0, 2000);
                var floorBody = new game.Body({
                    position: {
                        x: game.system.width / 2,
                        y: game.system.height - 40
                    },
                    collisionGroup: 1
                });
                var floorShape = new game.Rectangle(game.system.width, 50);
                floorBody.addShape(floorShape);
                this.world.addBody(floorBody);

                var bg = new game.Sprite('01_croquis.png').addTo(this.stage);
                this.addParallax('clouds.png', 150, -200);
                this.addParallax('04_city.png', 100, -300);
                this.addParallax('05_bush.png', 50, -500);
                this.addParallax('platform.png', 0, -600);

                this.objectContainer = new game.Container().addTo(this.stage);
                this.playerContainer = new game.Container().addTo(this.stage);

                var logo = new game.Sprite('06_logo_mobi.png');
                logo.position.x = game.system.width - logo.width - 50;
                logo.position.y = game.system.height - logo.height;
                logo.zIndex = 1000;
                this.stage.addChild(logo);

                this.player = new game.Player(400, game.system.height - 400);
                this.player.sprite.addTo(this.playerContainer);

                var scoreText = new game.BitmapText("Score: 0", { font: '80px wallfont' });
                scoreText.position.x = game.system.width - scoreText.width - 350;;
                scoreText.position.y = 30;
                this.stage.addChild(scoreText);
                this.player.scoreText = scoreText;  // DEGEU.... mais je sais pas faire

                var highscore = game.storage.get('highscore', 0)
                if (highscore > 0) {
                    var highscoreText = new game.BitmapText("Highscore: " + highscore, {font: '80px wallfont'});
                    highscoreText.position.x = game.system.width - scoreText.width - 350;
                    highscoreText.position.y = 130;
                    this.stage.addChild(highscoreText);
                }

                this.addTimer(1500, this.spawnRandomObject.bind(this), true);
                this.spawnRandomObject();
                game.audio.playMusic('backtrack', true);

        },

            spawnRandomObject: function () {
                var rand = Math.random();
                if (rand < 0.1) {
                    var coin = new game.Coin(game.system.width, 350 + Math.random() * 600, 'coin');
                }
                else if (rand < 0.5) {
                    var coin = new game.Coin(game.system.width, 350 + Math.random() * 600, 'cadeau');
                }
                else if (rand < 0.6) {
                    var oneway = new game.Oneway(game.system.width, 400 + Math.random() * 400);
                }
                else if (rand < 0.8) {
                    var trou = new game.Trou(game.system.width, 972);
                }
                else if (rand < 0.9){
                    var rand2 = Math.random();
                    var plane = new game.Plane(game.system.width, 200 + (200 * rand2));
                }
                else {
                    var voleur = new game.Voleur(game.system.width, 850);
                }
            },

            addParallax: function (texture, pos, speed) {
                var sprite = new game.TilingSprite(texture, game.system.width);
                sprite.speed.x = speed;
                sprite.position.y = game.system.height - sprite.height - pos;
                this.addObject(sprite);
                this.stage.addChild(sprite);
            },

            mousedown: function () {
                this.player.jump();
            },

            keydown: function (key) {
                if (key === 'SPACE') this.player.jump();
            }
        });

        game.createScene('End', {
            init: function () {
                this.world = new game.World(0, 2000);


                var spriteEndScreen = new game.Sprite('endscreen_vol_de.png', 0, 0, {
                    width : game.system.width,
                    height: game.system.height
                });

                var besthighscore = this.getBesthighscore(this.stage);

                var bg = spriteEndScreen.addTo(this.stage);
            },

            getBesthighscore: function(stage) {
                var url = 'https://api.mlab.com/api/1/databases/sketchman/collections/scores?apiKey=aCkr2XwFWw9A55VkA8YE10g69NxFXWSg&s={"score": -1}&l=1';
                var xhr = new XMLHttpRequest();
                xhr.open('GET', url);
                xhr.onload = function() {
                    if (xhr.status === 200) {
                        var globalhighscore = JSON.parse(xhr.responseText)[0].highscore;
                        var globalhighscoreText = new game.BitmapText("Best Highscore: " + globalhighscore, {font: '80px wallfont'});
                        globalhighscoreText.position.x = game.system.width - globalhighscoreText.width - 350;
                        globalhighscoreText.position.y = 30;
                        stage.addChild(globalhighscoreText);
                    }
                };
                xhr.send();
            },

            addParallax: function (texture, pos, speed) {
                var sprite = new game.TilingSprite(texture, game.system.width);
                sprite.speed.x = speed;
                sprite.position.y = game.system.height - sprite.height - pos;
                this.addObject(sprite);
                this.stage.addChild(sprite);
            },

            mousedown: function() {
                game.system.setScene('Main');
            },

            keydown: function (key) {
                if (key === 'SPACE')  game.system.setScene('Main');
            }
        });

        game.createScene('EndWin', {
            init: function () {
                this.world = new game.World(0, 2000);


                var spriteEndScreen = new game.Sprite('endscreen_vol.png', 0, 0, {
                    width : game.system.width,
                    height: game.system.height
                });

                var bg = spriteEndScreen.addTo(this.stage);


            },

            addParallax: function (texture, pos, speed) {
                var sprite = new game.TilingSprite(texture, game.system.width);
                sprite.speed.x = speed;
                sprite.position.y = game.system.height - sprite.height - pos;
                this.addObject(sprite);
                this.stage.addChild(sprite);
            },

            mousedown: function() {
                game.system.setScene('Main');
            },

            keydown: function (key) {
                if (key === 'SPACE')  game.system.setScene('Main');
            }
        });



    });





