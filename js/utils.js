function rectangularCollision({ rectangle1, rectangle2 }) {
    return (
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x &&
        rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y &&
        rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
    );
}

function determineOutcome({player, enemy}) {
    clearTimeout(timerId);
    if (player.health === enemy.health) {
        // tie
        document.querySelector('#outcomeText').innerHTML = 'TIE';
    } else if (player.health > enemy.health) {
        // player wins
        document.querySelector('#outcomeText').innerHTML = 'PLAYER 1 WINS';
    } else {
        // enemy wins
        document.querySelector('#outcomeText').innerHTML = 'PLAYER 2 WINS';
    }
    document.querySelector('#outcomeText').style.display = 'flex';
    gameFinished = true;
}

function decreaseTimer() {
    if (timer > 0) {
        timerId = setTimeout(decreaseTimer, 1000);
        timer--;
        document.querySelector('#timer').innerHTML = timer;
    } else {
        determineOutcome({player, enemy});
    }
}

function checkIfOutOfBounds(player, side) {
    if (side === 'leftSide' && player.position.x - player.velocity.x < 0) {
        return true;
    } else if (side === 'rightSide' && player.position.x + player.width + player.velocity.x >= canvas.width) {
        return true;
    }
    return false;
}