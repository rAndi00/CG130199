// import * as THREE from 'three';
// import GUI from 'lil-gui';

// // Create the scene
// const scene = new THREE.Scene();

// // Create the geometry and material for the mesh (box)
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
// const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);

// // Create the GUI
// const gui = new GUI();

// // GUI controls for position
// gui.add(mesh.position, 'x', -3, 3, 0.1).name('Position of cube X'); // Adjust x position
// gui.add(mesh.position, 'y', -3, 3, 0.1).name('Position of cube Y'); // Adjust y position
// gui.add(mesh.position, 'z', -3, 3, 0.1).name('Position of cube Z'); // Adjust z position

// // GUI controls for rotation
// gui.add(mesh.rotation, 'x', 0, Math.PI * 2, 0.01).name('Rotation X'); // Adjust rotation around x
// gui.add(mesh.rotation, 'y', 0, Math.PI * 2, 0.01).name('Rotation Y'); // Adjust rotation around y
// gui.add(mesh.rotation, 'z', 0, Math.PI * 2, 0.01).name('Rotation Z'); // Adjust rotation around z

// // Color and wireframe controls
// gui.addColor(material, 'color').name('Cube Color'); // Change cube color
// gui.add(material, 'wireframe').name('Wireframe Toggle'); // Toggle wireframe mode

// // Rotation controls
// let rotateSpeed = 0; // Initialize rotation speed

// // Function to toggle rotation speed
// const toggleRotation = () => {
//     if (rotateSpeed != 0)
//         rotateSpeed = 0;
//     else 
//         rotateSpeed = 0.1 // Toggle between 0 and 0.1
// };

// // Add button to toggle rotation
// gui.add({ toggleRotation }, 'toggleRotation').name('Toggle Rotation'); // Button to toggle rotation

// // Set up the sizes for the canvas
// const sizes = {
//     width: 800,
//     height: 600
// };

// // Camera setup
// const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
// camera.position.z = 3; // Pull camera back to see the scene
// camera.position.x = 1; // Slightly move camera to the right
// scene.add(camera);

// // Renderer setup
// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(sizes.width, sizes.height);
// document.getElementById("scene").appendChild(renderer.domElement);

// // Animation loop to continuously render the scene
// const animate = () => {
//     // Rotate the mesh if rotateSpeed is not zero
//     if (rotateSpeed > 0) {
//         mesh.rotation.x += rotateSpeed; // Rotate around x axis
//         mesh.rotation.y += rotateSpeed; // Rotate around y axis
//         mesh.rotation.z += rotateSpeed; // Rotate around z axis
//     }

//     renderer.render(scene, camera); // Render the scene
//     requestAnimationFrame(animate); // Keep calling animate
// };

// // Start the animation loop after everything is set up
// animate();

import * as THREE from 'three';
import GUI from 'lil-gui';

// Create the scene
const scene = new THREE.Scene();

// Create the plane (floor)
const planeGeometry = new THREE.PlaneGeometry(10, 10); // Width and height of the plane
const planeMaterial = new THREE.MeshBasicMaterial({ color: 0xaaaaaa, side: THREE.DoubleSide });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2; // Rotate the plane to lay flat
scene.add(plane);

// Create geometries for the shapes
const coneGeometry = new THREE.ConeGeometry(0.5, 1, 32);
const cylinderGeometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);
const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);

// Create materials for the shapes
const coneMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const cylinderMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });

// Create the shapes
const cone = new THREE.Mesh(coneGeometry, coneMaterial);
const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

// Position the shapes
cone.position.set(-2, 0.5, 0); // Position cone
cylinder.position.set(0, 0.5, 0); // Position cylinder
sphere.position.set(2, 0.5, 0); // Position sphere

// Add shapes to the scene
scene.add(cone);
scene.add(cylinder);
scene.add(sphere);

// Create the GUI
const gui = new GUI();

const floorFolder = gui.addFolder('Floor Controls');
floorFolder.addColor(planeMaterial, 'color').name('Floor Color'); // Control to change floor color
floorFolder.open();

// Create folders for the cone
const coneFolder = gui.addFolder('Cone Controls');
coneFolder.add(cone.position, 'x', -5, 4, 0.1).name('Position X');
coneFolder.add(cone.position, 'y', 0.35, 5, 0.1).name('Position Y');
coneFolder.add(cone.position, 'z', -4, 4, 0.1).name('Position Z');
coneFolder.add(cone.rotation, 'x', 0, Math.PI * 2, 0.01).name('Rotation X');
coneFolder.add(cone.rotation, 'y', 0, Math.PI * 2, 0.01).name('Rotation Y');
coneFolder.add(cone.rotation, 'z', 0, Math.PI * 2, 0.01).name('Rotation Z');
coneFolder.addColor(coneMaterial, 'color').name('Color');
coneFolder.open(); // Open the cone folder by default

// Create folders for the cylinder
const cylinderFolder = gui.addFolder('Cylinder Controls');
cylinderFolder.add(cylinder.position, 'x', -5, 4, 0.1).name('Position X');
cylinderFolder.add(cylinder.position, 'y', 0.35, 5, 0.1).name('Position Y');
cylinderFolder.add(cylinder.position, 'z', -4, 4, 0.1).name('Position Z');
cylinderFolder.add(cylinder.rotation, 'x', 0, Math.PI * 2, 0.01).name('Rotation X');
cylinderFolder.add(cylinder.rotation, 'y', 0, Math.PI * 2, 0.01).name('Rotation Y');
cylinderFolder.add(cylinder.rotation, 'z', 0, Math.PI * 2, 0.01).name('Rotation Z');
cylinderFolder.addColor(cylinderMaterial, 'color').name('Color');
cylinderFolder.open(); // Open the cylinder folder by default

// Create folders for the sphere
const sphereFolder = gui.addFolder('Sphere Controls');
sphereFolder.add(sphere.position, 'x', -5, 4, 0.1).name('Position X');
sphereFolder.add(sphere.position, 'y', 0.35, 5, 0.1).name('Position Y');
sphereFolder.add(sphere.position, 'z', -4, 4, 0.1).name('Position Z');
sphereFolder.add(sphere.rotation, 'x', 0, Math.PI * 2, 0.01).name('Rotation X');
sphereFolder.add(sphere.rotation, 'y', 0, Math.PI * 2, 0.01).name('Rotation Y');
sphereFolder.add(sphere.rotation, 'z', 0, Math.PI * 2, 0.01).name('Rotation Z');
sphereFolder.addColor(sphereMaterial, 'color').name('Color');
sphereFolder.open(); // Open the sphere folder by default

// Set up the sizes for the canvas
const sizes = {
    width: 800,
    height: 600
};

// Camera setup
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.set(0, 3, 10); // Position the camera to see all objects
scene.add(camera);

// Renderer setup
const renderer = new THREE.WebGLRenderer();
renderer.setSize(sizes.width, sizes.height);
document.getElementById("scene").appendChild(renderer.domElement);

// Animation loop to continuously render the scene
const animate = () => {
    // Rotate the shapes
    cone.rotation.y += 0.01;
    cylinder.rotation.y += 0.01;
    sphere.rotation.y += 0.01;

    renderer.render(scene, camera); // Render the scene
    requestAnimationFrame(animate); // Keep calling animate
};

// Start the animation loop after everything is set up
animate();
