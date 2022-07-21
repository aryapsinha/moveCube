//global variables
let currentState; 
var myEvent;

//key functions
function pressL(e){
    if(e instanceof KeyboardEvent){
        return e.key == "ArrowLeft";
    }
}
function pressR(e){
    if(e instanceof KeyboardEvent){
        return e.key == "ArrowRight";
    }
}
function pressUp(e){
    if(e instanceof KeyboardEvent){
        return e.key == "ArrowUp";
    }
}
function pressDown(e){
    if(e instanceof KeyboardEvent){
        return e.key == "ArrowDown";
    }
}
function pressSpace(e){
    if(e instanceof KeyboardEvent){
        return e.key == " ";
    }
}

//rotate functions 
function rotateY(c, n){
    c.rotation.y += n;
    return c; 
}

//constant functions
function pointOne(){
    return 0.1
}
function negpointOne(){
    return -0.1;
}

//error-catching functions
document.onkeydown = function (e) {
    myEvent =  e || window.event; 
};


