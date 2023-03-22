//create the scene and position the camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 5 );
camera.position.z = 2;
camera.position.set(2, 3, 2); //this makes the cube look at an angle
camera.lookAt(2, 2, 0);

//creating the cube
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
let cube = new THREE.Mesh(geometry, material);

//creating a dodecahedron
const geometry1 = new THREE.DodecahedronGeometry(0.8, 0);
const material1 = new THREE.MeshStandardMaterial({ color: 0xffffff });
let polygon = new THREE.Mesh(geometry1, material1);

//creating a sphere
const sphereGeometry = new THREE.SphereGeometry(0.7);
const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
let sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

//create the renderer
let renderer, cubeColor, polyColor, sphereColor, rand, t;
let count = 0;

//boolean stuff for sceneBuild and animate
let check = true; 
let test;
test = !check;
let firstClick = true; 
let codeChange = false;

function call(){
    if(firstClick==true){
        callSynth();
        sceneBuild();
        regex();
    }
    else{
        callSynth();
        regex();
    }
}

function sceneBuild() { //function called when "Animate" is pressed
    firstClick = !firstClick
    renderer = new THREE.WebGLRenderer();
    check = !check;
    console.log(check);

    renderer.setSize( window.innerWidth/4, window.innerHeight/4 );
    document.getElementById("render").appendChild( renderer.domElement )
    currentState = 0;
    function animate(){
        if(test == check){
            requestAnimationFrame(animate);
            t += 1;
            rand = Math.random();
            updateState(myEvent);
            cube.material.color.set(cubeColor);
            polygon.material.color.set(polyColor);
            sphere.material.color.set(sphereColor);
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
    reset(sphere);

    tslSpec = document.getElementById("specBox").value;
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
    if (tslSpec.includes("sphere")){
        reset(sphere);
        scene.add(sphere);
    }

    const pointLight = new THREE.PointLight(0xfffffff);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    $.post("https://graphviz-web-vvxsiayuzq-ue.a.run.app/tslsynth", {tsl: tslSpec, target: targetLang}, function(data){
        document.getElementById("codeBox").value = data;
        let script = document.createElement("script");
        script.text = "function updateState(e){\n" + data + "}";
        script.setAttribute("id", "synth_script");
        document.body.appendChild(script);
        if(renderer != null && firstClick == false){
            renderer.clear();
            codeChange = true;
        }
    })
    .fail(function(response) {
        document.getElementById("codeBox").value = response.responseText;
    });
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
    sphereColor = 0xffffff;
}

function regex(){
    var userInput = document.getElementById("specBox").value;
    var string = userInput.toString();
    //var assumptionRE = userInput.match("/^always assume{(.*)}$/");
    var assumptionRE = string.match(/\[.+?\]/g);
    var sinInput = string.match(/sin\s\((.*?)\)/);
    var sawInput = string.match(/saw\s\((.*?)\)\]/);
    // const text = "foo bar <- baz -> qux";
    // const cellRegex = /\[.+?\b\w+\b(?=\s*<-)|(?<=->\s*)\b\w+\b.+?\]/g;
    var cell = string.match(/(?<=\[\w+\s*<-)\s*\w+\s*(?=[^[\]]*\])/g);
    var input = string.match(/(?<=[{;])([^{;]*?)(?=->)(?=[^}]*?[};])/g);
    var output = string.match(/(?<=\[)(.*?)(?=<-)/g); 

    console.log(string);
    console.log("Regular Expression Functions");
    console.log("-------------------------------:");
    console.log("Cell");
    for(const Cmatch of cell){
        console.log(Cmatch);
    }
    console.log("-------------------------------:");
    console.log("Inputs:");
    console.log(input);
    for(const Cmatch of input){
        console.log(Cmatch);
    }
    console.log("-------------------------------:");
    console.log("Output:");
    console.log(output);
    for(const Cmatch of output){
        console.log(Cmatch);
    }




}
//Three lists
//input (e), output (cube rotation y, x, etc.), cell (count) 