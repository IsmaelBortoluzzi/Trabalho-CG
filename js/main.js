import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


var scene, camera, fieldOfView, aspectRatio, nearPlane, farPlane, renderer, container;
var HEIGHT, WIDTH;
var earthLight, moonLight, earth, rocket, moon;

function createScene() {
    HEIGHT = window.innerHeight;
    WIDTH = window.innerWidth;

    scene = new THREE.Scene();
    aspectRatio = WIDTH / HEIGHT;
    fieldOfView = 60;
    nearPlane = 1;
    farPlane = 10000;
    camera = new THREE.PerspectiveCamera(
        fieldOfView,
        aspectRatio,
        nearPlane,
        farPlane
    );

    camera.position.x = 0;
    camera.position.z = 3000;
    camera.position.y = 100;

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(WIDTH, HEIGHT);
    renderer.shadowMap.enabled = true;
    container = document.getElementById('ThreeJS');
    container.appendChild(renderer.domElement);

    renderer.setSize(WIDTH, HEIGHT);
    camera.aspect = WIDTH / HEIGHT;
    camera.updateProjectionMatrix();
}

class Earth {
    constructor() {
        var geom = new THREE.SphereGeometry(600, 600, 800);
        var texture = new THREE.TextureLoader().load('images/8k_earth.jpg');
        var mat = new THREE.MeshPhongMaterial({map: texture});
        this.mesh = new THREE.Mesh(geom, mat);
    }
}

class Rocket {
    constructor() {
        this.mesh = new THREE.Object3D();
        this.rocket;
        var loader = new GLTFLoader();
        var rocket;
        loader.load("models/rocket.gltf",
            (gltf) => {
                rocket = gltf.scene;
                rocket.rotation.z =  Math.PI/-2;
                rocket.scale.set(0.3, 0.3, 0.3);
                rocket.receiveShadow = true
                this.rocket = rocket;
                this.mesh.add(rocket);
            }
        );
    }
}

function createLight() {
    earthLight = new THREE.DirectionalLight();
    earthLight.position.set(150, 600, 0);
    earthLight.target = earth.mesh;
    scene.add(earthLight);
}

function createEarth() {
    earth = new Earth();
    earth.mesh.position.y = -600;
    scene.add(earth.mesh);
}

function createRocket() {
    rocket = new Rocket();
    rocket.mesh.position.y = 100;
    scene.add(rocket.mesh);
}

function create() {
    createScene();
    createEarth();
    createRocket();
    createLight();
}

function loop() {
    renderer.render(scene, camera);
    requestAnimationFrame(loop);
}

function init() {
    create();
    loop();
}

window.addEventListener('load', init, false);
