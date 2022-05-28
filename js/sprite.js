class Sprite {
    
    constructor({position, height, width, imageSrc}) {
        this.position = position;
        this.height = height;
        this.width = width;
        this.image = new Image();
        this.image.src = imageSrc;
    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y);
    }

    update() {
        this.draw();
    }
}