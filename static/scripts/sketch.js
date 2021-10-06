let s = function ( p ) {
    let w = 400;
    let h = 400;

    let x = w/2;
    let y = h/2;
    let direction = 0;

    let grid = [];

    let speed = 500;

    p.setup = function() {
        p.createCanvas(w, h);
        p.background(70);
        for (let i = 0; i < h; i++) {
            grid[i] = [];
            for (let j = 0; j < w; j++) {
                grid[i][j] = 0;
            }
        }
        p.noStroke();
    }

    p.draw = function() {
        for (let loop = 0; loop < speed; loop++){
            if (grid[x][y]%2 == 0) {
                direction = (direction + 1)%4;  
                color = 255;
            } else {
                direction = ((direction - 1)%4 + 4)%4;
                color = 0;
            }
            
            p.fill(color);
            grid[x][y] += 1;
            p.rect(x, y, 1, 1);
            

            if (direction == 0) {
                x = (x + 1)%w;
            } else if (direction == 1) {
                y = ((y - 1)%h + h)%h;
            } else if (direction == 2) {
                x = ((x - 1)%w + w)%w;
            } else {
                y = (y + 1)%h;
            }
        }
    }
}

let myp5 = new p5(s, "canvas");
