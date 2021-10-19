let running = false;
let grid = [];
let w = 400;
let h = 400;
let x = w/2;
let y = h/2;
let direction = 0;
let speed = 1024;
let rules = [];
let colors = [];
let rules_map = {};

const color_button = document.getElementById("langtonsant-color-button");
const current_rules = document.getElementById("current-rules");

let start = function () {
    running = true;
}


let stop = function() {
    running = false;
}

let add_rule = function( direction_delta ) {
    if (rules.length < 20) {
        rules.push(direction_delta)
        colors.push(color_button.style.backgroundColor);
        current_rules.textContent = current_rules.textContent.concat(rules_map[direction_delta])
    }
}

let delete_rule = function() {
    if (rules.length > 0) {
        let rule = rules.pop();
        colors.pop();
        current_rules.textContent = current_rules.textContent.substring(0, current_rules.textContent.length - 1)
    }
}

let make_color = function() {
    let color = new String("#").concat(Math.floor(Math.random() * 256).toString(16), Math.floor(Math.random() * 256).toString(16), Math.floor(Math.random() * 256).toString(16));
    while (color.length < 7) {
        color = color.concat("0");
    }
    color_button.style.backgroundColor = color;
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
        
        document.getElementById("langtonsant-color-button").style.backgroundColor = make_color();
        
        rules = [1, -1];
        colors = ["#ffffff", "#000000"];
        
        rules_map = {
            1: "R",
            "-1": "L",
            0: "F",
            2: "B"
        }

        for (let rule = 0; rule < rules.length; rule++) {
            current_rules.textContent = current_rules.textContent.concat(rules_map[rules[rule]]);
        }

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


let reset_all = function() {
    rules = [1, -1];
    colors = [255, 0];
    current_rules.textContent = "RL";
    reset();
}
