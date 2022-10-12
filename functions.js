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

function sawFun(saw) {
    if (saw <= 1.0055 && saw >= 1){
        saw = 0;
    }
    else{
        saw += .01;
    }
    return saw;
}

function sinFun(sin, rev) {
    if (sin >= 1 && sin <= 1.00555){
        rev = true;
    }
    else if (sin <= -1 && sin >= -1.00555){
        rev = false;
    }

    if (rev === true){
        sin -= .01;
    }
    else if (rev === false){
        sin += .01;
    }
    return [sin, rev];
}

//rotate functions 
function rotateY(c, n){
    c.rotation.y += n;
    return c; 
}
function rotateX(c, n){
    c.rotation.x += n;
    return c; 
}
function rotateZ(c, n){
    c.rotation.z += n;
    return c; 
}

//scale/translate functions with limits?
function scaleY(c, n){
    c.scale.y += n;
    return c
}
function scaleX(c, n){
    c.scale.x += n;
    return c
}
function scaleZ(c, n){
    c.scale.z += n;
    return c
}

function translateX(c, n){
    c.position.x += n;
    return c;
}

function translateY(c, n){
    c.position.y += n;
    return c;
}

function translateZ(c, n){
    c.position.z += n;
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


