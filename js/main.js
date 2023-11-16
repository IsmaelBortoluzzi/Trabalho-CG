import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


var scene, camera, fieldOfView, aspectRatio, nearPlane, farPlane, renderer, container;
var HEIGHT, WIDTH;
var clouds, light, light2, earth, rocket, moon, earthCenter;

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
    camera.position.z = 0;
    camera.position.y = 0;

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(WIDTH, HEIGHT);
    renderer.shadowMap.enabled = true;
    container = document.getElementById('ThreeJS');
    container.appendChild(renderer.domElement);

    renderer.setSize(WIDTH, HEIGHT);
    camera.aspect = WIDTH / HEIGHT;
    camera.updateProjectionMatrix();
}

function create() {}

function loop() {}

function init() {
    create();
    loop();
}

window.addEventListener('load', init, false);
