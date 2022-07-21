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

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 5 );



camera.position.z = 2;
camera.position.set(0, 1, 2); //this makes the cube look at an angle
camera.lookAt(0, 0, 0);


//creating the cube 
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const loader = new THREE.TextureLoader();
//const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const materials = [
    new THREE.MeshBasicMaterial({map: loader.load('tacoheritage.png')}),
    new THREE.MeshBasicMaterial({map: loader.load('tacoheritage.png')}),
    new THREE.MeshBasicMaterial({map: loader.load('tacoheritage.png')}),
    new THREE.MeshBasicMaterial({map: loader.load('tacoheritage.png')}),
    new THREE.MeshBasicMaterial({map: loader.load('tacoheritage.png')}),
    new THREE.MeshBasicMaterial({map: loader.load('tacoheritage.png')}),
    
    ];
let cube = new THREE.Mesh( geometry, materials );

//let box = new THREE.BoxHelper( cube, 0xff0000 );
scene.add( cube );
//scene2.add(box);






function callSynth() {
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

function sceneBuild() { //so this is where the thing will animate
    /*function makeScene(elem) {
        const scene = new THREE.Scene();
       
        const fov = 45;
        const aspect = 2;  // the canvas default
        const near = 0.1;
        const far = 5;
        const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        camera.position.z = 2;
        camera.position.set(0, 1, 2);
        camera.lookAt(0, 0, 0);
       
        {
          const color = 0xFFFFFF;
          const intensity = 1;
          const light = new THREE.DirectionalLight(color, intensity);
          light.position.set(-1, 2, 4);
          scene.add(light);
        }
       
        return {scene, camera, elem};
        //const {scene, camera, elem} = sceneInfo;
 
  // get the viewport relative position opf this element
        /*const {left, right, top, bottom, width, height} =
            elem.getBoundingClientRect();
        
        
      
      }*/
        console.log("animate"); 
        //create the scene and position the camera
        
        //create the renderer
        const renderer = new THREE.WebGLRenderer();
        // document.body.appendChild( renderer.domElement );
        
        renderer.setSize( window.innerWidth/4, window.innerHeight/4 );
        document.getElementById("render").appendChild( renderer.domElement );
        //renderer.setSize( document.getElementById('synthBox').style.width, document.getElementById('synthBox').style.height ); //this changes the size of the renderer
        //*I believe renderer.setviewPort can change the positioning of the animation 
        //renderer.setViewport(0, 0, window.innerWidth/4, window.innerHeight/4);
        //console.log(document.getElementById("synthBox"))
       // document.body.insertBefore(renderer.domElement, document.getElementById("synthBox"));
       
        
       
        
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
