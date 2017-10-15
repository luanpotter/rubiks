const THREE = require('three');
const OrbitControls = require('three-orbit-controls')(THREE);

// Set the scene size.
const WIDTH = 800;
const HEIGHT = 600;

// Set some camera attributes.
const VIEW_ANGLE = 45;
const ASPECT = WIDTH / HEIGHT;
const NEAR = 0.1;
const FAR = 10000;

// Create a WebGL renderer, camera and a scene
const renderer = new THREE.WebGLRenderer();
renderer.setSize(WIDTH, HEIGHT);

const camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
camera.position.z = 300;

const controls = new OrbitControls(camera);

const scene = new THREE.Scene();
scene.add(camera);

const pointLight = new THREE.PointLight(0xFFFFFF);
pointLight.position.x = 100;
pointLight.position.y = 100;
pointLight.position.z = 300;
scene.add(pointLight);

const pointLight2 = new THREE.PointLight(0xFFFFFF);
pointLight2.position.x = -200;
pointLight2.position.y = -200;
pointLight2.position.z = -200;
scene.add(pointLight2);

const updateFn = require('./objects').draw(scene);

const container = document.querySelector('#container');
container.appendChild(renderer.domElement);

const timestamp = () => window.performance && window.performance.now ? window.performance.now() : new Date().getTime();

let last = timestamp();
const update = () => {
    const now = timestamp();
    const dt = now - last;
    last = now;

    updateFn(dt);
    renderer.render(scene, camera);
    requestAnimationFrame(update);
}
requestAnimationFrame(update);