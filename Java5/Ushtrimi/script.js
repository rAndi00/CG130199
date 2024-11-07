// Perspective view setup
const perspectiveContainer = document.getElementById('perspective-view');
const orthoContainer = document.getElementById('ortho-view');

// Common scene and objects
const scene = new THREE.Scene();
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Perspective camera
const perspectiveCamera = new THREE.PerspectiveCamera(75, perspectiveContainer.clientWidth / perspectiveContainer.clientHeight, 0.1, 1000);
perspectiveCamera.position.z = 5;

// Orthographic camera
const aspectRatio = orthoContainer.clientWidth / orthoContainer.clientHeight;
const orthoCamera = new THREE.OrthographicCamera(-aspectRatio * 5, aspectRatio * 5, 5, -5, 0.1, 1000);
orthoCamera.position.z = 5;

// Renderers
const perspectiveRenderer = new THREE.WebGLRenderer();
perspectiveRenderer.setSize(perspectiveContainer.clientWidth, perspectiveContainer.clientHeight);
perspectiveContainer.appendChild(perspectiveRenderer.domElement);

const orthoRenderer = new THREE.WebGLRenderer();
orthoRenderer.setSize(orthoContainer.clientWidth, orthoContainer.clientHeight);
orthoContainer.appendChild(orthoRenderer.domElement);

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Rotate the cube for better visualization
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    // Render with both cameras
    perspectiveRenderer.render(scene, perspectiveCamera);
    orthoRenderer.render(scene, orthoCamera);
}

animate();
