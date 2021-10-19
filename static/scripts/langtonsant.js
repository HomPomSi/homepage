let running = false;
let grid = [];
let w = 400;
let h = 400;
let x = w/2;
let y = h/2;
let direction = 0;
let speed = 1024;

let start = function () {
    running = true;
}

let stop = function() {
    running = false;
}



let s = function ( p ) {
    
    let resize = function () {
        if (document.documentElement.clientWidth <= w + 300) {
            document.getElementById("langtonsant-full-wrapper").style.flexDirection = "column";
        } else {
            document.getElementById("langtonsant-full-wrapper").style.flexDirection = "";
        }

    }

    let move = function() {
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
        resize();
        if (running) {
            for (let loop = 0; loop < speed; loop++){
                move();
            }
        }
    }
}

let myp5 = new p5(s, "canvas");


let reset = function () {
    x = w/2;
    y = h/2;
    direction = 0;
    running = false;
    for (let i = 0; i < h; i++) {
        grid[i] = [];
        for (let j = 0; j < w; j++) {
            grid[i][j] = 0;
        }
    }
    const canvas = document.getElementById("canvas").childNodes[1];
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#464646";
    ctx.fillRect(0, 0, w, h);
}
