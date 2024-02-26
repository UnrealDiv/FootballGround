import * as THREE from 'three';

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// Create a scene
const scene = new THREE.Scene();
const loadingManager = new THREE.LoadingManager();
const loader = new GLTFLoader(loadingManager);


const progressBar = document.getElementById("progress-bar")
console.log(progressBar);


loadingManager.onProgress = function(url,loaded,total){
    console.log("Started");
    progressBar.value = (loaded/total)*100;
}


const progressBarContainer = document.querySelector(".progress-bar-container");

loadingManager.onLoad = function(){
    console.log("loaded");
    progressBarContainer.style.display = 'none';
}


let mixer;
loader.load(
    './footballground2.glb', // or .gltf
    function (gltf) {
        scene.add(gltf.scene);
    },
    undefined,
    function (error) {
        console.error('Error loading GLTF/GLB file:', error);
    }
);




const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z=-40;
camera.position.y=40;
camera.lookAt(0,50,50)




const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();




const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); 
scene.add(ambientLight);



const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);


        controls.update();

    renderer.render(scene, camera);
}
animate();