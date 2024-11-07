import * as THREE from 'three';

        // Create a Three.js scene
        const scene = new THREE.Scene();
        
        // Create a plane geometry for the floor
        const floorGeometry = new THREE.PlaneGeometry(5, 5, 1);
        const floorMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
        const floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.rotation.x = -Math.PI / 2; // Lie flat like a floor
        floor.position.y = -1;
        scene.add(floor);
        
        // Create a cube
        const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
        const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // Green
        const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        cube.position.set(-1.5, 0, 0); // Move to the left
        scene.add(cube);
        
        // Create a sphere
        const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
        const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Red
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        sphere.position.set(1.5, 0, 0); // Move to the right and slightly up
        scene.add(sphere);
        
        // Create a torus (donut shape)
        const torusGeometry = new THREE.TorusGeometry(0.5, 0.2, 16, 100);
        const torusMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 }); // Yellow
        const torus = new THREE.Mesh(torusGeometry, torusMaterial);
        torus.position.set(0, 0.3, 1.5); // Move forward along the Z axis
        scene.add(torus);
        
        // Create a cone
        const coneGeometry = new THREE.ConeGeometry(0.5, 1, 32);
        const coneMaterial = new THREE.MeshBasicMaterial({ color: 0x00ffff }); // Cyan
        const cone = new THREE.Mesh(coneGeometry, coneMaterial);
        cone.position.set(-1.5, 0, 2); // Move left and forward
        scene.add(cone);
        
        // Create a cylinder
        const cylinderGeometry = new THREE.CylinderGeometry(0.3, 0.3, 1, 32);
        const cylinderMaterial = new THREE.MeshBasicMaterial({ color: 0xff00ff }); // Magenta
        const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
        cylinder.position.set(1.5, 0, 2); // Move backward along the Z axis
        scene.add(cylinder);
        
        // Set up sizes
        const sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        };
        
        // Create a camera and position it to look at the entire scene
        const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
        camera.position.z = 5; // Pull the camera back to view everything
        camera.position.y = 2; // Raise the camera to see the floor
        camera.rotation.x = -Math.PI / 6; // Slight tilt downward to view objects
        scene.add(camera);
        
        // Create a renderer and attach it to the DOM
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(sizes.width, sizes.height);
        document.getElementById('scene').appendChild(renderer.domElement);
        
        // Render the scene (no animation, static)
        renderer.render(scene, camera);