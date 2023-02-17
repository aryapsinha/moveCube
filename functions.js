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

function eq(e1, e2){
    return e1 === e2;
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

//primitives
function saw(x) {
    x%=6.28319
    return x + 2;
}

function sin(x) {
    return Math.sin(x) + 2;
}

function color(r, g, b){
    return new THREE.Color('rgb('+ Math.floor(r) + ',' + Math.floor(g) + ',' + Math.floor(b) + ')');
}

//error-catching functions
document.onkeydown = function (e) {
    myEvent =  e || window.event; 
};

<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-W9B5QPV3BH"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-W9B5QPV3BH');
</script>
