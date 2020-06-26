const fps = 5; // Frames per Second
const tbf = 1000/fps; // Time Between 2 Frames
const GRAVITY = 0.6;


//Create Table
class Table {
    constructor (id, left,top,width,height,bounce) {
        this.id = id;
        this.className = 'table';
        this.left = left;
        this.top = top;
        this.width = width;
        this.height = height;
        this.bounce = bounce;

        // Create DOM-Element
        this.elem = document.createElement('DIV');
        this.elem.id = this.id;
        this.elem.className = this.className;
        this.elem.style.position = 'absolute';
        this.elem.style.left = this.left+'px';
        this.elem.style.top = this.top+'px';
        this.elem.style.width = this.width+'px';
        this.elem.style.height = this.height+'px';
        this.elem.style.backgroundColor = '#EEEEEE';

        //Append DOM-Element
        document.getElementsByTagName('body')[0].appendChild(this.elem);
    }
    
    detect(b){
        return ((b.x-b.r<0) || (b.x+b.r>this.width) || (b.y-b.r<0) || (b.y+b.r>this.height));
    }
    
    respond(b){
        let xMin = 0;
        let xMax = this.width;
        let yMin = 0;
        let yMax = this.height;
        if (b.x-b.r < xMin) {
            b.x = xMin+b.r;
            if (Math.abs(b.vx)>1){b.y = b.y + ((-b.x+xMin)+b.r)/b.vx*b.vy}
            b.vx = -b.vx*this.bounce;
            b.vy = b.vy*this.bounce;
        } else if (b.x+b.r > xMax) {
            b.x = xMax-b.r; 
            if (Math.abs(b.vx)>1){b.y = b.y - ((b.x-xMax)+b.r)/b.vx*b.vy}
            b.vx = -b.vx*this.bounce;
            b.vy = b.vy*this.bounce;
        } else if (b.y-b.r < yMin) {
            if (Math.abs(b.vy)>1){b.x = b.x + ((-b.y+yMin)+b.r)/b.vy*b.vx}
            b.y = yMin+b.r; 
            b.vx = b.vx*this.bounce;
            b.vy = -b.vy*this.bounce;
        } else if (b.y+b.r > yMax) {
            if (Math.abs(b.vy)>1){b.x = b.x - ((b.y-yMax)+b.r)/b.vy*b.vx}
            b.y = yMax-b.r; 
            b.vx = b.vx*this.bounce;
            b.vy = -b.vy*this.bounce;
        }
    }
}



class Bumper  {
    constructor (id, x, y, r, bounce) {
        this.id = id; 
        this.className = 'bumper'; 
        this.x = x;
        this.y = y;
        this.r = r;
        this.bounce = bounce;

        // Create DOM-Element
        this.elem = document.createElement('DIV');
        this.elem.id = this.id;
        this.elem.className = this.className;
        this.elem.style.position = 'absolute';
        this.elem.style.left = -this.r+'px';
        this.elem.style.top = -this.r+'px';
        this.elem.style.width = 2*this.r+'px';
        this.elem.style.height = 2*this.r+'px';
        this.elem.style.backgroundColor = 'green';
        this.elem.style.borderRadius = '50%';
        this.elem.style.transform = 'translate('+this.x+'px,'+this.y+'px)';
        
        //Append DOM-Element
        table.elem.appendChild(this.elem);
    }
    
    detect(b){
        // Circle-Circle Collision
        // Calculate difference between centres
        let dx = b.x - this.x;
        let dy = b.y - this.y;
        // Get squared distance with Pythagoras
        let distSquared = (dx * dx) + (dy * dy);
        return distSquared <= (this.r + b.r) * (this.r + b.r);
    }
    
    respond(b){
        let a = this;  // Bumper
        let c = {x:0,y:0};  // Collision Point
        let d = {x:0,y:0};  // Closest Point on Line
        let n = {x:0,y:0};
        
        d = closestPointOnLine(b.x, b.y, b.x + b.vx, b.y + b.vy, a.x, a.y); 
        let closestdistsq = Math.pow(a.x - d.x, 2) + Math.pow(a.y - d.y, 2); 
        if (closestdistsq <= Math.pow(b.r + a.r, 2)){ 
            // a collision has occurred
            
            let backdist = Math.sqrt(Math.pow(b.r + a.r, 2) - closestdistsq); 
            let vlen = Math.sqrt(Math.pow(b.vx, 2) + Math.pow(b.vy, 2)); 

            c.x = d.x - backdist * (b.vx / vlen); 
            c.y = d.y - backdist * (b.vy / vlen);

            b.x = c.x;
            b.y = c.y;

  
            let collisiondist = a.r+b.r;
            n.x = (a.x - c.x) / collisiondist; 
            n.y = (a.y - c.y) / collisiondist; 
            
            //Impulse  
            let p =  2*(b.vx * n.x + b.vy * n.y) * this.bounce; 
    
            b.vx = b.vx -  p * n.x; 
            b.vy = b.vy -  p * n.y;
        }
    }
}



class Ball {
    constructor(id, x,y,r,vx,vy){
        this.id = id;
        this.className = 'ball';
        this.x = x;
        this.y = y;
        this.oldx = x;
        this.oldy = y;
        this.r = r;
        this.vx = vx;
        this.vy = vy;
        this.mass  = 1;
        this.maxSpeed = 40;
	    this.keyframes = [];
        
        // Create DOM-Element
        this.elem = document.createElement('DIV');
        this.elem.id = this.id;
        this.elem.className = this.className;
        this.elem.style.position = 'absolute';
        this.elem.style.left = -this.r+'px';
        this.elem.style.top = -this.r+'px';
        this.elem.style.width = (2*this.r)+'px';
        this.elem.style.height = (2*this.r)+'px';
        this.elem.style.backgroundColor = 'gray';
        this.elem.style.borderRadius = '50%';
        this.elem.style.transform = 'translate('+this.x+'px,'+this.y+'px)';
 
        //Append DOM-Element
        table.elem.appendChild(this.elem);
    }
}


//Create Table
const table = new Table ('table',20,20,400,400, 0.95);

//Create Objects On Table
const bumper1 = new Bumper('bumper1', 100, 230, 45, 1.2);

//Create Ball
const ball = new Ball('ball',20,20,20,2,0);

const allCollisionObjects = [table, bumper1];


// Initialize Animation
ball.anim = ball.elem.animate({},{duration: tbf});

// Animation Loop
ball.anim.onfinish = () => {
    let oldx=ball.x; 
    let oldy=ball.y;
    
    ball.vx = Math.min( ball.maxSpeed, ball.vx);
    ball.vy = Math.min( ball.maxSpeed, ball.vy + GRAVITY);
    ball.vx = Math.max(-ball.maxSpeed, ball.vx);
    ball.vy = Math.max(-ball.maxSpeed, ball.vy);

    ball.x+=ball.vx; 
    ball.y+=ball.vy;  
    
    for (let i = 0, len = allCollisionObjects.length; i < len; i++) {
        let obj = allCollisionObjects[i];
        if (obj.detect(ball)) {
            console.log('Kollision', obj.id);
            obj.respond(ball);
        }
    }
    
  
    
	ball.keyframes = [{transform: `translate(${oldx}px, ${oldy}px)`},{transform: `translate(${ball.x}px, ${ball.y}px)`}];
	ball.anim.effect.setKeyframes(ball.keyframes);
	ball.anim.play();
};

const getLength = (x,y) => Math.sqrt(x*x+y*y);

const closestPointOnLine = (lx1, ly1, lx2, ly2, x0, y0) => { 
     let A1 = ly2 - ly1; 
     let B1 = lx1 - lx2; 
     let C1 = (ly2 - ly1)*lx1 + (lx1 - lx2)*ly1; 
     let C2 = -B1*x0 + A1*y0; 
     let det = A1*A1 - (-B1)*B1; 
     let cx = 0; 
     let cy = 0; 
     if(det !== 0){ 
        cx = ((A1*C1 - B1*C2)/det); 
        cy = ((A1*C2 - (-B1)*C1)/det); 
     }else{ 
        cx = x0; 
        cy = y0; 
     } 
     return {x:cx, y:cy}; 
}