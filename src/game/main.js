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
                this.addParallax('03_city.png', 150, -200);
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

                this.addTimer(1500, this.spawnRandomObject.bind(this), true);
                this.spawnRandomObject();
            },

            spawnRandomObject: function () {
                var rand = Math.random();
                if (rand < 0.1) {
                    var coin = new game.Coin(game.system.width, 400 + Math.random() * 400);
                }
                else if (rand < 0.2) {
                    var oneway = new game.Oneway(game.system.width, 700);
                }
                else {
                    var tires = new game.Tires(game.system.width, 850);
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
                var bg = spriteEndScreen.addTo(this.stage);

                this.objectContainer = new game.Container().addTo(this.stage);
                this.playerContainer = new game.Container().addTo(this.stage);


            },

            addParallax: function (texture, pos, speed) {
                var sprite = new game.TilingSprite(texture, game.system.width);
                sprite.speed.x = speed;
                sprite.position.y = game.system.height - sprite.height - pos;
                this.addObject(sprite);
                this.stage.addChild(sprite);
            },

            keydown: function (key) {
                if (key === 'SPACE')  game.system.setScene('Main');
            }
        });

    });
