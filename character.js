class Character {
    
    constructor({position, velocity, speed, height, width}) {
        this.position = position;
        this.velocity = velocity;
        this.speed = speed;
        this.height = height;
        this.width = width;
        this.lastKeyPressed;
    }

    draw() {
        c.fillStyle = 'red';
        c.fillRect(this.position.x, this.position.y, 50, this.height);
    }

    update() {
        this.draw();

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
}