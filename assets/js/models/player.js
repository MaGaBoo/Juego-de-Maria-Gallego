class Player {
    constructor(ctx) {
        this.ctx = ctx;

        this.x = 125;
        this.maxY = 965;
        this.y = this.maxY;

        this.prevY = this.y;
    
        this.vx = 0;
        this.vy = 1;
        this.ay = 1;

        this.speedX = 10;

        this.width = 200;
        this.height = 230;

        this.img = new Image();
        this.img.src = "./assets/images/playerSpriteBoth.png";
        this.img.isReady = false;

        this.img.onload = () => {
            this.img.isReady = true;
        }

        this.horizontalFrames = 4;
        this.verticalFrames = 2;

        this.xFrame = 0;
        this.yFrame = 0;

        this.running = false;
        this.jumping = false;

        this.tick = 0;
    }

    draw() {
        if (this.img.isReady) {
            this.ctx.drawImage(
                this.img,
                (this.img.width * this.xFrame) / this.horizontalFrames,
                (this.img.height * this.yFrame) / this.verticalFrames,
                this.img.width / this.horizontalFrames,
                this.img.height / this.verticalFrames,
                this.x,
                this.y,
                this.width,
                this.height
            )
            this.tick++;
        }

    }

    move() {

        this.x += this.vx;
        this.vy += this.ay;
        this.prevY = this.y;
        this.y += this.vy;

        if (this.x <= 0) {
            this.x = 0;
        }

        if (this.x + this.width >= this.ctx.canvas.width) {
        this.x = this.ctx.canvas.width - this.width;
}

        if (this.y <= 0) {
            this.y = 0;
        }

        if (this.y >= this.maxY) {
            this.y = this.maxY;
            this.jumping = 0;

        }
        
        if (this.tick % 7 === 0) {
            this.xFrame++;
        }

        if (this.xFrame > (this.horizontalFrames - 1)) {
            this.xFrame = 0;
        }
     
    }

        collidesWithIsland(island) {
        const xPadding = 10;
        const yPadding = 20;

        if(this.vy >= 0 &&
        this.x + this.width / 2 + xPadding < island.x + island.width &&

        this.x + this.width - this.width / 2 > island.x &&
        
        this.y + this.height >= island.y + yPadding &&

        this.prevY + this.height <= island.y + yPadding ||
        this.maxY === island.y - this.height + yPadding &&

        this.x + this.width / 2 + xPadding < island.x + island.width &&

        this.x + this.width - this.width / 2 > island.x) {

        return true;
            
        }

        return false;
    }

     collidesWithPet(pet) {

        const xPetPadding = 10;

        return this.x + this.width / 2 - xPetPadding < pet.x + pet.width &&
        this.x + this.width / 2 - xPetPadding > pet.x &&
        this.y + this.height >= pet.y &&
        this.y <= pet.y + pet.height
    }

    collidesWithCat(cat) {

        const xCatPadding = 5;

        return this.x + this.width / 2 - xCatPadding < cat.x + cat.width &&
        this.x + this.width / 2 - xCatPadding > cat.x &&
        this.y + this.height >= cat.y &&
        this.y <= cat.y + cat.height
    }

    collidesWithStar(star) {

        const xStarPadding = 3;

        return this.x + this.width / 2 - xStarPadding < star.x + star.width &&
        this.x + this.width / 2 - xStarPadding > star.x &&
        this.y + this.height >= star.y &&
        this.y <= star.y + star.height
    }

    
    getOnIsland(islandY) {

        this.maxY = islandY - this.height;
   
        
    }

    getOnFloor() {
        if (this.maxY !== 850) {
            this.vy = 0;
            this.maxY = 850;
        }
        
    }

    collidesWithNut(nut) {
        
        return this.x < nut.x + nut.width &&
        this.x + this.width > nut.x &&
        this.y < nut.y + nut.height &&
        this.y + this.height > nut.y
     
    }

    collidesWithRollingCoconut(rollingCoconut) {

        const xCoconutPadding = 5;
       

        return this.x + this.width / 2 - xCoconutPadding < rollingCoconut.x + rollingCoconut.width &&
        this.x + this.width / 2 - xCoconutPadding > rollingCoconut.x &&
        this.y + this.height >= rollingCoconut.y &&
        this.y <= rollingCoconut.y + rollingCoconut.height;

    }


    oneKeyDown(keyCode) {

        if (keyCode === TOP_KEY) {
            if(this.jumping <= 1) {
                this.vy = -20;
                this.jumping++
            }
        }

        if (keyCode === RIGHT_KEY) {
            this.vx = this.speedX;
            this.running = true;
            this.yFrame = 0;
        
        }

        if (keyCode === LEFT_KEY) {
            this.vx = -this.speedX;
            this.running = true;
            this.yFrame = 1;
        }
        
    }

    oneKeyUp(keyCode) {
        if (keyCode === RIGHT_KEY || keyCode === LEFT_KEY) {
          this.vx = 0
          this.running = false
        }
      }


}

