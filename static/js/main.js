var c = document.getElementById("idCanva");
var ctx = c.getContext("2d");

var c2 = document.getElementById("idCanva2");
var ctx2 = c2.getContext("2d");

var red = "#ff0000"
var blue = "#0095DD"
var green = "#03fc30"

let start = new Point({x:75,y:75}, true, 3000);
let mid = new Point({x:225, y:75}, false, 3000);
let end = new Point({x:400, y:75}, false, 3000);

start.setNextPoint(mid);
mid.setNextPoint(end);

end.setPreviousPoint(mid);
mid.setPreviousPoint(start);

function seeArray(){

    for(node in nodes){
        console.log(node.position)
    }

}

function drawBall(x, y, color, ctx) {

    if(color == red){
        ctx.clearRect(0, 0, c.width, c.height);
    }

    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI*2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}

function drawLines(x, y, ctx, current){
    next = current.nextPoint();

    if(!next){
        next = current
    }
    console.log("punto siguiente: ",next);
    xn = next.position.x;
    yn = next.position.y;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(xn, yn);
    ctx.closePath();
    ctx.stroke();  
}

function drawMap() {
    
    let current = start;

    while(true) {
        if(!current){
            break;
        }
        let x = current.position.x;
        let y = current.position.y;
        drawLines(x, y, ctx, current)
        drawBall(x, y, blue, ctx); 
        current = current.nextPoint();
    } 
}

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function forward(firsPoint){
    let current = firsPoint;
    
    let x = current.position.x;
    let y = current.position.y;

    drawBall(x,y,red,ctx2)

    while(true){
        if(!current){
            break;
        }
        // codigo que necsito hacer
        let time = current.timeNext;

        await timeout(time)
        
        current = current.nextPoint();

        if(!current){
            break;
        }
        x = current.position.x;
        y = current.position.y;

        drawBall(x,y,red,ctx2)
    }
}

async function backward(lastPoint){
    let current = lastPoint;
    
    let x = current.position.x;
    let y = current.position.y;

    drawBall(x,y,red,ctx2)

    while(true){
        if(!current){
            break;
        }
        console.log(current);
        // codigo que necsito hacer
        let time = current.timeNext;

        await timeout(time)
        
        current = current.previousPoint();

        if(!current){
            break;
        }

        x = current.position.x;
        y = current.position.y;

        drawBall(x,y,red,ctx2)
    }
}

async function main(){
    drawMap();
    await forward(start);
    await backward(end);
}

main()
.then(()=>{
    console.log("FIN");
})

