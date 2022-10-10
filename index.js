//create the scene and position the camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 5 );
camera.position.z = 2;
camera.position.set(0, 1, 2); //this makes the cube look at an angle
camera.lookAt(0, 0, 0);

//creating the cube 
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const loader = new THREE.TextureLoader();
const materials = [" ", " ", " ", " ", " ", " "];
materials.fill(new THREE.MeshBasicMaterial({map: loader.load('tacoheritage.png')}));
let cube = new THREE.Mesh( geometry, materials );
scene.add( cube );

//create the renderer
let renderer; //not initialized because it will be initialized the first time "Animate" is called 

//boolean stuff for sceneBuild and animate
let check = true; 
let test;
test = !check;
let firstClick = true; 
let codeChange = false;
let sin, cycle;

function sceneBuild() { //function called when "Animate" is pressed
        if(firstClick == true){
            firstClick = !firstClick
            renderer = new THREE.WebGLRenderer();
        }
        check = !check;       
        console.log(check);
        //create the renderer
        
        renderer.setSize( window.innerWidth/4, window.innerHeight/4 );
        document.getElementById("render").appendChild( renderer.domElement )

        currentState = 0;
        sin = 1;
        cycle = 1;
        function animate(){
            if(test == check){
                requestAnimationFrame(animate);
                let c1 = cycleFun(cycle)
                let s1 = sinFun(sin)
                updateState(myEvent, c1, s1);
                cycle = c1;
                sin = s1;
                console.log(cycleFun(cycle));
                myEvent = "";
                renderer.clear();
                renderer.render( scene, camera );
            }else{
                renderer.clear();
            }
        } 
        animate();
}
function callSynth() {//function called when "get code" is pressed
    let prevSynthesized = document.getElementById("synth_script");
    if(prevSynthesized) {
        prevSynthesized.remove();
    }
    tslSpec = document.getElementById("specBox").value;
    tslSpec = encodeURIComponent(tslSpec.replace(/\n/g, " "));
    targetLang = document.getElementById("targetLang").value;
    fetch("https://graphviz-web-vvxsiayuzq-ue.a.run.app/tslsynth?tsl="+tslSpec+"&target="+targetLang)
      .then(response => {
        response.text().then(function(text) {
          document.getElementById("codeBox").value = text;
          
            let script = document.createElement("script");
            script.text = "function updateState(e, sin, cycle){\n" + text + "}";
            script.setAttribute("id", "synth_script");
            document.body.appendChild(script);
            if(renderer != null && firstClick == false){
                renderer.clear();
                codeChange = true; 
            }
        });
      })
      .catch(error => console.error(error));
}