let w = 40;
let h = 40;

let x = w/2;
let y = h/2;
let direction = 0;

let grid = [];


function setup() {
    let reader = new FileReader();
    

    createCanvas(400, 400);
    background(70);
    frameRate(10000); 
    for (let i = 0; i < h; i++) {
        grid[i] = [];
        for (let j = 0; j < w; j++) {
            grid[i][j] = 0;
        }
    }
    noStroke();
}

function draw() {
    if (grid[x][y]%2 == 0) {
        direction = (direction + 1)%4;  
        color = 255;
    } else {
        direction = ((direction - 1)%4 + 4)%4;
        color = 0;
    }
    
    fill(color);
    grid[x][y] += 1;
    rect(x*10, y*10, 10, 10);
    

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
