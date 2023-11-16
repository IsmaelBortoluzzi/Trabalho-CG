import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


var scene, camera, fieldOfView, aspectRatio, nearPlane, farPlane, renderer, container;
var HEIGHT, WIDTH;
var clouds, light, light2, earth, rocket, moon, earthCenter;

function createScene() {}

function create() {}

function loop() {}

function init() {
    create();
    loop();
}

window.addEventListener('load', init, false);
