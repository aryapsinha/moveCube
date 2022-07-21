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

//experimentation
let check = true; 
let test;
test = !check;
function sceneBuild() { //function called when "Animate" is pressed
        
        check = !check;       
        console.log(check);
        //create the renderer
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth/4, window.innerHeight/4 );
        document.getElementById("render").appendChild( renderer.domElement )

        currentState = 0; 
        function animate(){
            requestAnimationFrame(animate);
            updateState(myEvent);
            myEvent = "";
            renderer.clear();
            renderer.render( scene, camera );
        } 
    if(test == check){
        animate();
    }else{
        cancelAnimationFrame(this.id)
    }
    
    //checker = !checker;
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