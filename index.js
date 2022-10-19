//create the scene and position the camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 5 );
camera.position.z = 2;
camera.position.set(0, 1, 2); //this makes the cube look at an angle
camera.lookAt(0, 0, 0);


//creating the cube
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const loader = new THREE.TextureLoader();
const materials = [" ", " ", " ", " ", " ", " "];
materials.fill(new THREE.MeshBasicMaterial({map: loader.load('tacoheritage.png')}));
let cube = new THREE.Mesh( geometry, materials);

/*
//creating a dodecahedron
const geometry1 = new THREE.DodecahedronGeometry(0.8, 0);
const loader1 = new THREE.TextureLoader();
const material = [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "];
material.fill(new THREE.MeshBasicMaterial({map: loader1.load('tacoheritage.png'), side: THREE.DoubleSide}));
let polygon = new THREE.Mesh(geometry1, material);
*/

//creating a sphere
const geometry1 = new THREE.SphereGeometry( 0.7 );
const material = new THREE.MeshBasicMaterial({map: loader.load('tacoheritage.png')});
let sphere = new THREE.Mesh( geometry1, material );

//create the renderer
let renderer, t;

//boolean stuff for sceneBuild and animate
let check = true; 
let test;
test = !check;
let firstClick = true; 
let codeChange = false;

function sceneBuild() { //function called when "Animate" is pressed
        if(firstClick == true){
            firstClick = !firstClick
            renderer = new THREE.WebGLRenderer();
        }
        check = !check;       
        console.log(check);

        renderer.setSize( window.innerWidth/4, window.innerHeight/4 );
        document.getElementById("render").appendChild( renderer.domElement )
        currentState = 0;
        function animate(){
            if(test == check){
                requestAnimationFrame(animate);
                t += .1;
                updateState(myEvent);
                myEvent = "";
                renderer.clear();
                renderer.render( scene, camera );
            }
            else{
                renderer.clear();
            }
        } 
        animate();
}
function callSynth() {
    let prevSynthesized = document.getElementById("synth_script");
    if(prevSynthesized) {
        prevSynthesized.remove();
    }
    tslSpec = document.getElementById("specBox").value;
    tslSpec = encodeURIComponent(tslSpec.replace(/\n/g, " "));
    targetLang = document.getElementById("targetLang").value;

    // get the object that we are dealing with
    scene.clear();
    if (tslSpec.includes("cube") && tslSpec.includes("sphere")){
        scene.add(cube);
        cube.position.set(-0.8, 0, 0);
        resetDouble(cube);
        scene.add(sphere);
        sphere.position.set(0.8, 0, 0);
        resetDouble(sphere);
    }
    else if (tslSpec.includes("cube")){
        scene.add(cube);
        reset(cube);
    }
    else if (tslSpec.includes("sphere")){
        scene.add(sphere);
        reset(sphere);
    }

    fetch("https://graphviz-web-vvxsiayuzq-ue.a.run.app/tslsynth?tsl="+tslSpec+"&target="+targetLang)
      .then(response => {
        response.text().then(function(text) {
          document.getElementById("codeBox").value = text;

            let script = document.createElement("script");
            script.text = "function updateState(e){\n" + text + "}";
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

function zoom(obj){
    if(obj.innerHTML=="Zoom out the animation") {
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    else{
        renderer.setSize(window.innerWidth/4, window.innerHeight/4);
    }
}

function changeVal(obj){
    if(obj.innerHTML=="Zoom out the animation"){
        obj.innerHTML="Zoom in the animation";
    }else if(obj.innerHTML=="Zoom in the animation"){
        obj.innerHTML="Zoom out the animation";
    }
}

function reset(c){
    c.scale.set(1, 1, 1);
    c.position.set(0, 0, 0);
    t = 0;
}

function resetDouble(c){
    c.scale.set(1, 1, 1);
    t = 0;
    if (c == cube){
        c.position.set(-1, 0, 0);
    }
    else if (c == sphere){
        c.position.set(1, 0, 0);
    }
}