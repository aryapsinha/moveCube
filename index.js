//function declarations
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
function rotateY(c, n){
    c.rotation.y += n; 
    //edges.needsUpdate = true;
    return c; 
}
var myEvent;
document.onkeydown = function (e) {
    myEvent =  e || window.event; 
};

function pointOne(){
    return 0.1
}
function negpointOne(){
    return -0.1;
}
let currentState; 


//create the scene and position the camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 5 );
camera.position.z = 2;
camera.position.set(0, 1, 2); //this makes the cube look at an angle
camera.lookAt(0, 0, 0);

//creating the cube 
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const loader = new THREE.TextureLoader();
const materials = [
    new THREE.MeshBasicMaterial({map: loader.load('tacoheritage.png')}),
    new THREE.MeshBasicMaterial({map: loader.load('tacoheritage.png')}),
    new THREE.MeshBasicMaterial({map: loader.load('tacoheritage.png')}),
    new THREE.MeshBasicMaterial({map: loader.load('tacoheritage.png')}),
    new THREE.MeshBasicMaterial({map: loader.load('tacoheritage.png')}),
    new THREE.MeshBasicMaterial({map: loader.load('tacoheritage.png')}),
    ];
let cube = new THREE.Mesh( geometry, materials );
scene.add( cube );


function sceneBuild() { //function called when "Animate" is pressed
        console.log("animate"); 

        
        //create the renderer
        const renderer = new THREE.WebGLRenderer();
       
        
        renderer.setSize( window.innerWidth/4, window.innerHeight/4 );
        document.getElementById("render").appendChild( renderer.domElement );
       
        
        //reactive machine part

        
        currentState = 0; 

        
        function animate(){
            //renderer.setViewport(left, top, width, height);
            
            requestAnimationFrame(animate);
            
            updateState(myEvent);
            myEvent = "";
            renderer.clear();
            renderer.render( scene, camera );
        

        }

        //the update state parts
        

    
    animate();


}
function callSynth() {//function called when "get code" is pressed
    tslSpec = document.getElementById("specBox").value;
    tslSpec = encodeURIComponent(tslSpec.replace(/\n/g, " "));
    targetLang = document.getElementById("targetLang").value;
    fetch("https://graphviz-web-vvxsiayuzq-ue.a.run.app/tslsynth?tsl="+tslSpec+"&target="+targetLang)
      .then(response => {
        response.text().then(function(text) {
          document.getElementById("codeBox").value = text;
          
            let script = document.createElement("script");
            let temp = "function updateState(e){\n" + text + "}"
            //gotta change this at some point!
            script.text = temp;
            script.setAttribute("id", "synth_script");
            document.body.appendChild(script);
          
        });
      })
      .catch(error => console.error(error));
}