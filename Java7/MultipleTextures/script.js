import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 3); // Adjust camera position

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const textureLoader = new THREE.TextureLoader();
const colorTexture = textureLoader.load('/textures//Stylized_Metal_Pattern_001_basecolor.png');
colorTexture.colorSpace = THREE.SRGBColorSpace;

const normalTexture = textureLoader.load('/textures/Stylized_Metal_Pattern_001_normal.png');
const roughnessTexture = textureLoader.load('/textures//Stylized_Metal_Pattern_001_roughness.png');
const aoTexture = textureLoader.load('/textures/Stylized_Metal_Pattern_001_ambientOcclusion.png');
const metallicTexture = textureLoader.load('/textures/Stylized_Metal_Pattern_001_metallic.png');
const heightTexture = textureLoader.load('/textures/Stylized_Metal_Pattern_001_height.png');

// Apply the textures to the material
const material = new THREE.MeshStandardMaterial({
    map: colorTexture,
    normalMap: normalTexture,
    roughnessMap: roughnessTexture,
    aoMap: aoTexture,
    metalnessMap: metallicTexture,
    // displacementMap: heightTexture, // Adds depth from height map
    // displacementScale: 0.1, // Adjust as needed for effect strength
});

// Geometry and sphere setup
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
sphereGeometry.attributes.uv2 = sphereGeometry.attributes.uv; // Enable ambient occlusion
const sphere = new THREE.Mesh(sphereGeometry, material);
scene.add(sphere);

// Add a light source
const light = new THREE.PointLight(0xffffff, 100);
light.position.set(2, 2, 2);
scene.add(light);

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    sphere.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();
