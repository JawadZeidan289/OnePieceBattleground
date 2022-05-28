// canvas properties
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

// global variables
const gravity = 0.5;
const jumpVel = 15;
let timer = 60;
let timerId;
let gameFinished = false;

const keys = {
    a: {
        pressed: false,
    },
    d: {
        pressed: false,
    },
    ArrowLeft: {
        pressed: false,
    },
    ArrowRight: {
        pressed: false,
    },
}

const background = new Sprite({
    position: {
        x: 0,
        y: 0,
    },
    width: 1024,
    height: 576,
    imageSrc: './assets/buggy-background.png'
})

// character related operations

const player = new Character({
    position: {
        x: 0,
        y: 0,
    },
    velocity: {
        x: 0,
        y: 0,
    },
    weaponOffset: {
        x: 0,
        y: 0,
    },
    speed: 5,
    height: 150,
    width: 50,
    weaponReach: 100,
    weaponHeight: 50,
    isFacingLeft: false,
})

const enemy = new Character({
    position: {
        x: 400,
        y: 0,
    },
    velocity: {
        x: 0,
        y: 0,
    },
    speed: 3,
    height: 200,
    width: 50,
    weaponReach: 100,
    weaponHeight: 50,
    isFacingLeft: true,
})

decreaseTimer();

function animate() {
    window.requestAnimationFrame(animate);

    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);
    background.update();
    player.update();
    enemy.update();

    player.velocity.x = 0;
    enemy.velocity.x = 0;

    console.log(enemy.position.y);

    if (!gameFinished) {
        // player movement
        if (keys.a.pressed && player.lastKeyPressed === 'a') {
            if (checkIfOutOfBounds(player, 'leftSide')) {
                player.velocity.x = 0;
            } else {
                player.velocity.x = -player.speed;
            }
        } else if (keys.d.pressed && player.lastKeyPressed === 'd') {
            if (checkIfOutOfBounds(player, 'rightSide')) {
                player.velocity.x = 0;
            } else {
                player.velocity.x = player.speed;
            }
        }

        // enemy movement
        if (keys.ArrowLeft.pressed && enemy.lastKeyPressed === 'ArrowLeft') {
            if (checkIfOutOfBounds(enemy, 'leftSide')) {
                enemy.velocity.x = 0;
            } else {
                enemy.velocity.x = -enemy.speed;
            }

        } else if (keys.ArrowRight.pressed && enemy.lastKeyPressed === 'ArrowRight') {
            if (checkIfOutOfBounds(enemy, 'rightSide')) {
                enemy.velocity.x = 0;
            } else {
                enemy.velocity.x = enemy.speed;
            }
        }

        // collision detection
        if (
            rectangularCollision({
                rectangle1: player,
                rectangle2: enemy,
            }) &&
            player.isAttacking
        ) {
            enemy.health -= 20;
            document.querySelector('#enemyHealth').style.width = enemy.health + '%';
            player.isAttacking = false;
        }

        if (
            rectangularCollision({
                rectangle1: enemy,
                rectangle2: player,
            }) &&
            enemy.isAttacking
        ) {
            player.health -= 20;
            document.querySelector('#playerHealth').style.width = player.health + '%';
            enemy.isAttacking = false;
        }

        // end game by knockout
        if (enemy.health <= 0 || player.health == 0) {
            determineOutcome({player, enemy});
        }
    }
}

animate();

window.addEventListener('keydown', (event) => {
    if (!gameFinished) {
        switch(event.key) {
            // player buttons
            case 'a':
                keys.a.pressed = true;
                player.lastKeyPressed = 'a';
                break;
            case 'd':
                keys.d.pressed = true;
                player.lastKeyPressed = 'd';
                break;
            case 'w':
                if (player.position.y === (canvas.height - player.height - 50)) {
                    player.velocity.y -= jumpVel;
                }
                break;
            case ' ':
                player.attack();
                break;
            
            // enemy buttons
            case 'ArrowLeft':
                keys.ArrowLeft.pressed = true;
                enemy.lastKeyPressed = 'ArrowLeft';
                break;
            case 'ArrowRight':
                keys.ArrowRight.pressed = true;
                enemy.lastKeyPressed = 'ArrowRight';
                break;
            case 'ArrowUp':
                if (enemy.position.y === (canvas.height - enemy.height - 50)) {
                    enemy.velocity.y -= jumpVel;
                }
                break;
            case 'ArrowDown':
                enemy.attack();
                break;
        }
    }
});

window.addEventListener('keyup', (event) => {
    if (!gameFinished) {
        switch(event.key) {
            // player buttons
            case 'a':
                keys.a.pressed = false;
                break;
            case 'd':
                keys.d.pressed = false;
                break;
            case 'w':
                break;

            // enemy buttons
            case 'ArrowLeft':
                keys.ArrowLeft.pressed = false;
                break;
            case 'ArrowRight':
                keys.ArrowRight.pressed = false;
                break;
        }
    }
})