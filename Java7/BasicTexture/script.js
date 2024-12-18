import * as THREE from 'three';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 4; // Adjusted camera position to fit both cube and planet

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


const textureLoader = new THREE.TextureLoader();
const woodTexture = textureLoader.load('textures/Stylized_Wood_Floor_001_basecolor.png');
const planetTexture = textureLoader.load('textures/planet.jpeg'); // Replace with your planet texture path


const cubeMaterial = new THREE.MeshBasicMaterial({ map: woodTexture });
const cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), cubeMaterial);
cube.position.x = -1.5; 
scene.add(cube);


const planetMaterial = new THREE.MeshStandardMaterial({ map: planetTexture });
const planet = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 32), planetMaterial);
planet.position.x = 1.5; 
scene.add(planet);


const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);


function animate() {
    requestAnimationFrame(animate);
    
    cube.rotation.y += 0.01;
    planet.rotation.y += 0.05;
    
    renderer.render(scene, camera);
}
animate();






 