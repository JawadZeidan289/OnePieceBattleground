// canvas properties
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

// global variables
const gravity = 0.5;
const jumpVel = 15;

const keys = {
    a: {
        pressed: false,
    },
    d: {
        pressed: false,
    },
    w: {
        pressed: false,
    },
    ArrowLeft: {
        pressed: false,
    },
    ArrowRight: {
        pressed: false,
    },
    ArrowUp: {
        pressed: false,
    },
}

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
    speed: 5,
    height: 150,
    width: 50,
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
    height: 150,
    width: 50,
})



function animate() {
    window.requestAnimationFrame(animate);

    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);
    player.update();
    enemy.update();
    console.log('animating..');

    player.velocity.x = 0;
    enemy.velocity.x = 0;

    // player movement
    if (keys.a.pressed && player.lastKeyPressed === 'a') {
        player.velocity.x = -player.speed;
    } else if (keys.d.pressed && player.lastKeyPressed === 'd') {
        player.velocity.x = player.speed;
    }

    // enemy movement
    if (keys.ArrowLeft.pressed && enemy.lastKeyPressed === 'ArrowLeft') {
        enemy.velocity.x = -enemy.speed;
    } else if (keys.ArrowRight.pressed && enemy.lastKeyPressed === 'ArrowRight') {
        enemy.velocity.x = enemy.speed;
    }
}

animate();

window.addEventListener('keydown', (event) => {
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
            keys.w.pressed = true;
            player.velocity.y -= jumpVel;
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
            keys.ArrowUp.pressed = true;
            enemy.velocity.y -= jumpVel;
            break;
    }
});

window.addEventListener('keyup', (event) => {
    switch(event.key) {
        // player buttons
        case 'a':
            keys.a.pressed = false;
            break;
        case 'd':
            keys.d.pressed = false;
            break;
        case 'w':
            keys.w.pressed = false;
            break;

        // enemy buttons
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            break;
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            break;
    }
})