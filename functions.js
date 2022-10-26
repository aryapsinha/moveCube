//global variables
let currentState; 
var myEvent;

//tsl-mt functions
function add(e1, e2){
    return e1 + e2;
}

function sub(e1, e2){
    return e1 - e2;
}

function mult(e1, e2){
    return e1 * e2;
}

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

function saw(saw) {
    saw%=6.28319
    return saw;
}

function sin(s) {
    return Math.sin(s);
}

//error-catching functions
document.onkeydown = function (e) {
    myEvent =  e || window.event; 
};


