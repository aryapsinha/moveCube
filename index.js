//create the scene and position the camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 5 );
camera.position.z = 2;
camera.position.set(2, 3, 2); //this makes the cube look at an angle
camera.lookAt(2, 2, 0);

//creating the cube
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const loader = new THREE.TextureLoader();
const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
let cube = new THREE.Mesh(geometry, material);

//creating a dodecahedron
const geometry1 = new THREE.DodecahedronGeometry(0.8, 0);
//const loader1 = new THREE.TextureLoader();
const material1 = new THREE.MeshStandardMaterial({ color: 0xffffff });
//material.fill(new THREE.MeshBasicMaterial({map: loader1.load('tacoheritage.png'), side: THREE.DoubleSide}));
let polygon = new THREE.Mesh(geometry1, material1);


//creating a sphere
/*const sphereGeometry = new THREE.SphereGeometry( 0.7 );
const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
let sphere = new THREE.Mesh( sphereGeometry, sphereMaterial);*/

//create the renderer
let renderer, cubeColor, polyColor, random, t;
let count = 0;

//boolean stuff for sceneBuild and animate
let check = true; 
let test;
test = !check;
let firstClick = true; 
let codeChange = false;

//var t = 1;
//var interval = setInterval( increment, 1000);
//function increment(){
    //t = t % 360 + 1;
//}

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
                random = Math.random() * 0xffffff;
                updateState(myEvent);
                cube.material.color.set(cubeColor);
                polygon.material.color.set(polyColor);
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
    reset(cube);
    reset(polygon);

    tslSpec = document.getElementById("specBox").value;
    tslSpec = encodeURIComponent(tslSpec.replace(/\n/g, " "));
    targetLang = "js";

    // get the object that we are dealing with
    scene.clear();

    if (tslSpec.includes("cube")){
        reset(cube);
        scene.add(cube);
    }
    if (tslSpec.includes("polygon")){
        reset(polygon);
        scene.add(polygon);
    }

    const pointLight = new THREE.PointLight(0xfffffff);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

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
    if(obj.innerHTML=="Zoom out animation") {
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    else{
        renderer.setSize(window.innerWidth/4, window.innerHeight/4);
    }
}

function changeVal(obj){
    if(obj.innerHTML=="Zoom out animation"){
        obj.innerHTML="Zoom in animation";
    }else if(obj.innerHTML=="Zoom in animation"){
        obj.innerHTML="Zoom out animation";
    }
}

function reset(c){
    c.scale.set(1, 1, 1);
    c.position.set(2, 2, 0);
    c.rotation.set(0, 0, 0);
    t = 2;
    count = 2;
    cubeColor = 0xffffff;
    polyColor = 0xffffff;
}