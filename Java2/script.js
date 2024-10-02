import * as THREE from 'three';

// Scene setup
const scene = new THREE.Scene();

const bodyGeometry = new THREE.SphereGeometry(1.0, 32, 32); 
const midGeometry = new THREE.SphereGeometry(0.75, 32, 32);  
const headGeometry = new THREE.SphereGeometry(0.5, 32, 32);  

const material = new THREE.MeshBasicMaterial({ color: 0xffffff }); 


const bodyMesh = new THREE.Mesh(bodyGeometry, material);
const midMesh = new THREE.Mesh(midGeometry, material);
const headMesh = new THREE.Mesh(headGeometry, material);

bodyMesh.position.set(0, -1.5, 0);   
midMesh.position.set(0, 0, 0);       
headMesh.position.set(0, 1.25, 0);   


scene.add(bodyMesh);
scene.add(midMesh);
scene.add(headMesh);


const hatGeometry = new THREE.BoxGeometry(0.75, 0.25, 0.75); 
const hatMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 }); 
const hatMesh = new THREE.Mesh(hatGeometry, hatMaterial);


hatMesh.position.set(0, 1.75, 0); 


scene.add(hatMesh);

const eyeGeometry = new THREE.SphereGeometry(0.05, 16, 16);  
const eyeMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 }); 

const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);


leftEye.position.set(-0.15, 1.35, 0.45);  
rightEye.position.set(0.15, 1.35, 0.45);  


scene.add(leftEye);
scene.add(rightEye);

const carrotGeometry = new THREE.ConeGeometry(0.05, 0.3, 16);  
const carrotMaterial = new THREE.MeshBasicMaterial({ color: 0xffa500 }); 
const carrotMesh = new THREE.Mesh(carrotGeometry, carrotMaterial);


carrotMesh.position.set(0, 1.25, 0.55);  
carrotMesh.rotation.x = Math.PI / 2;     


scene.add(carrotMesh);


const sizes = {
    width: 800,
    height: 600
}

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 5;
camera.position.y = 0;
camera.position.x = 0;
scene.add(camera);


const renderer = new THREE.WebGLRenderer();
renderer.setSize(sizes.width, sizes.height);
document.getElementById("scene").appendChild(renderer.domElement);


renderer.render(scene, camera);
