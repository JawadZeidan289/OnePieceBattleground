class Character {
    
    constructor({position, velocity, speed, height, width,
        weaponReach, weaponHeight, attackAnimationTime = 100, isFacingLeft}) {
        this.position = position;
        this.velocity = velocity;
        this.speed = speed;
        this.height = height;
        this.width = width;
        this.isFacingLeft = isFacingLeft,
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y,
            },
            width: weaponReach,
            height: weaponHeight,
            attackTime: attackAnimationTime,
        }

        this.lastKeyPressed;
        this.isAttacking;
    }

    draw() {
        c.fillStyle = 'red';
        c.fillRect(this.position.x, this.position.y, this.width, this.height);

        // attack box
        if (this.isAttacking) {
            c.fillStyle = 'green';
            c.fillRect(
                this.attackBox.position.x,
                this.attackBox.position.y,
                this.attackBox.width,
                this.attackBox.height,
            );
        }
    }

    update() {
        this.draw();

        if (this.isFacingLeft) {
            this.attackBox.position.x = this.position.x - this.width;
        } else {
            this.attackBox.position.x = this.position.x;
        }

        this.attackBox.position.y = this.position.y;

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0;
        } else {
            this.velocity.y += gravity;
        }

        if (this.position.x + this.width + this.velocity.x >= canvas.width) {
            this.velocity.x = 0;
        } else {

        }
    }

    attack() {
        this.isAttacking = true;
        setTimeout(() => {
            this.isAttacking = false;
        }, this.attackBox.attackTime);
    }
}