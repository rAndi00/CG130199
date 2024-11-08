import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Position the camera
camera.position.set(0, 15, 15);
camera.lookAt(0, 0, 0);

// Materials
const grassMaterial = new THREE.MeshBasicMaterial({ color: 0x3f9b0b });
const roadMaterial = new THREE.MeshBasicMaterial({ color: 0x525257 });
const buildingMaterial = new THREE.MeshBasicMaterial({ color: 0xD3D3D3 });
const buildingMaterial1 = new THREE.MeshBasicMaterial({ color: 0x10cfc7 });
const buildingMaterial2 = new THREE.MeshBasicMaterial({ color: 0x5045f7});
// Grass Plane
const grassPlane = new THREE.Mesh(new THREE.PlaneGeometry(30, 30), grassMaterial);
grassPlane.rotation.x = -Math.PI / 2;
scene.add(grassPlane);

// Central Circular Area
const centralCircle = new THREE.Mesh(new THREE.CircleGeometry(2, 32), roadMaterial);
centralCircle.rotation.x = -Math.PI / 2;
centralCircle.position.set(0, 0.01, 0);
scene.add(centralCircle);

// Roads extending from the circle
const road1Geometry = new THREE.PlaneGeometry(0.8, 5);  // Narrow and long
const road2Geometry = new THREE.PlaneGeometry(0.8, 10); // Wider and shorter
const road3Geometry = new THREE.PlaneGeometry(0.8, 6); // Narrowest but longest
const road4Geometry = new THREE.PlaneGeometry(0.8, 10); // Moderate width and length

const road1 = new THREE.Mesh(road1Geometry, roadMaterial);
const road2 = new THREE.Mesh(road2Geometry, roadMaterial);
const road3 = new THREE.Mesh(road3Geometry, roadMaterial);
const road4 = new THREE.Mesh(road4Geometry, roadMaterial);

road1.position.set(1.5, 0.01, 3.5); // Position roads slightly above ground to prevent z-fighting
road2.position.set(-1.5, 0.01, -3.5);
road3.position.set(3.5, 0.01, 0);
road4.position.set(-6, 0.01, 1);

road1.rotation.z = THREE.MathUtils.degToRad(30);
road2.rotation.z = THREE.MathUtils.degToRad(30);


road1.rotation.x = -Math.PI / 2;
road2.rotation.x = -Math.PI / 2;
road3.rotation.x = -Math.PI / 2;
road4.rotation.x = -Math.PI / 2;
road4.rotation.z = -Math.PI / 2;
road3.rotation.z = -Math.PI / 2;

scene.add(road1, road2, road3, road4);

// Buildings around the central circle
const building1Geometry = new THREE.BoxGeometry(2, 3, 10); // Taller building
const building2Geometry = new THREE.BoxGeometry(2, 3, 5); // Wider and shorter building
const building3Geometry = new THREE.BoxGeometry(2, 3, 3.5); // Narrow and tall
const building4Geometry = new THREE.BoxGeometry(4, 3, 4); // Wider base, shorter height

const building1 = new THREE.Mesh(building1Geometry, buildingMaterial);
const building2 = new THREE.Mesh(building2Geometry, buildingMaterial);
const building3 = new THREE.Mesh(building3Geometry, buildingMaterial2);
const building4 = new THREE.Mesh(building4Geometry, buildingMaterial1);

building1.position.set(-5.5, 1, 3.5);
building2.position.set(4.5, 1, -2.5);
building3.position.set(3.5, 1, 3);
building4.position.set(-6, 1, -2);

building1.rotation.y = Math.PI / 2;
building2.rotation.y = Math.PI / 2;

building3.rotation.y = THREE.MathUtils.degToRad(30);

scene.add(building1, building2, building3, building4);

// Orbit Controls for camera
const controls = new OrbitControls(camera, renderer.domElement);

// Moving sphere
const sphereGeometry = new THREE.SphereGeometry(0.3, 32, 32);
const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.y = 0.3; // Slightly above ground
scene.add(sphere);

// Define waypoints for each segment of the path
const waypoints = [
  { x: 1.5, z: 3.5 },      // Start of Road 1
  { x: 2.5, z: 5.5 },      // End of Road 1 (angled correctly)
  { x: 0, z: 0 },          // Central circle
  { x: -2.5, z: -5.5 },    // Start of Road 2
  { x: -1.5, z: -3.5 },    // End of Road 2 (back towards circle)
  { x: 0, z: 0 },          // Central circle
  { x: 3.5, z: 0 },        // Start of Road 3
  { x: 5.5, z: 0 },        // End of Road 3
  { x: 0, z: 0 },          // Central circle
  { x: -6, z: 1 },         // Start of Road 4
  { x: -8, z: 1 },         // End of Road 4
  { x: 0, z: 0 }           // Back to central circle
];

let currentWaypoint = 0;
let speed = 0.02;

// Helper function to move the sphere to the next waypoint
function moveToWaypoint() {
  const target = waypoints[currentWaypoint];
  const dx = target.x - sphere.position.x;
  const dz = target.z - sphere.position.z;
  const distance = Math.sqrt(dx * dx + dz * dz);

  // Check if we reached the current waypoint
  if (distance < 0.1) {
    currentWaypoint = (currentWaypoint + 1) % waypoints.length; // Move to next waypoint
  } else {
    // Move sphere toward the target
    sphere.position.x += (dx / distance) * speed;
    sphere.position.z += (dz / distance) * speed;
  }
}

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  
  // Move sphere along the path
  moveToWaypoint();

  controls.update();
  renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

// Start animation loop
animate();
