import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/GLTFLoader.js";


const HEIGHT = window.innerHeight;
const WIDTH = window.innerWidth;
const EARTH_Y_POSITION= -600;
const ROCKET_Y_POSITION= 100;

var scene, camera, fieldOfView, aspectRatio, nearPlane, farPlane, renderer, container;
var clouds, earthLight, moonLight /*sonata*/, earth, rocket, moon, earthCenter;


class Earth {
    constructor() {
        var geom = new THREE.SphereGeometry(600, 600, 800);
        var texture = new THREE.TextureLoader().load('images/earth_8k.jpg');
        var specular = new THREE.TextureLoader().load('images/water_4k.png');
        var mat = new THREE.MeshPhongMaterial({
            specularMap: specular, map: texture
        });
        this.mesh = new THREE.Mesh(geom, mat);
    }
}

class Clouds {
    constructor() {
        var geom = new THREE.SphereGeometry(600.1, 600, 800);  // 600.1 to be just a bit higher than the earth to envelop it
        var texture = new THREE.TextureLoader().load('images/fair_clouds_4k.png');
        var mat = new THREE.MeshPhongMaterial({
            map: texture,
            transparent: true
          });
        this.mesh = new THREE.Mesh(geom, mat);
    }
}

class EarthCenter {
    constructor() {
        this.mesh = new THREE.Object3D();
        this.mesh.name = "earthCenter";
        var geom = new THREE.SphereGeometry(0, 0, 0);
        var mat = new THREE.MeshBasicMaterial();
        var m = new THREE.Mesh(geom, mat);
        this.mesh.position.y = EARTH_Y_POSITION;
        this.mesh.add(m);
    }
}

class Moon {
    constructor() {
        var geom = new THREE.SphereGeometry(600, 600, 800);
        var texture = new THREE.TextureLoader().load('images/moon_8k.jpg');
        var mat = new THREE.MeshPhongMaterial({ map: texture });
        this.mesh = new THREE.Mesh(geom, mat);
        this.mesh.position.y = EARTH_Y_POSITION + 1500;
        this.mesh.scale.set(.03, .03, .03);
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

function createScene() {
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
    camera.position.z = 500;
    camera.position.y = ROCKET_Y_POSITION;

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(WIDTH, HEIGHT);
    renderer.shadowMap.enabled = true;
    container = document.getElementById('ThreeJS');
    container.appendChild(renderer.domElement);

    renderer.setSize(WIDTH, HEIGHT);
    camera.aspect = WIDTH / HEIGHT;
    camera.updateProjectionMatrix();
}

function createLight() {
    earthLight = new THREE.DirectionalLight();
    earthLight.position.set(150, 600, 0);
    earthLight.target = earth.mesh;
    scene.add(earthLight);

    moonLight = new THREE.DirectionalLight();
    moonLight.position.set(0, 500, 800);
    moonLight.target = moon.mesh;
    scene.add(moonLight);
}

function createEarth() {
    earth = new Earth();
    earth.mesh.position.y = EARTH_Y_POSITION;
    scene.add(earth.mesh);
}

function createClouds() {
    clouds = new Clouds();
    clouds.mesh.position.y = EARTH_Y_POSITION
    scene.add(clouds.mesh)
}

function createMoon() {
    earthCenter = new EarthCenter();
    moon = new Moon();
    earthCenter.mesh.add(moon.mesh);
    scene.add(earthCenter.mesh);
}

function createRocket() {
    rocket = new Rocket();
    rocket.mesh.position.y = ROCKET_Y_POSITION;
    scene.add(rocket.mesh);
}

function create() {
    createScene();
    createEarth();
    createClouds();
    createMoon();
    createRocket();
    createLight();
}

let direction = 1;
function updateCameraDistance() {
    camera.position.z += direction;

    if (camera.position.z == 500 || camera.position.z == 2500) {
        direction *= -1;
    }
}

function loop() {
    earth.mesh.rotateY(-0.001);
    clouds.mesh.rotateY(-0.001);
    
    earth.mesh.rotateZ(0.0001);
    clouds.mesh.rotateZ(0.0001);
    earthCenter.mesh.rotateZ(.005);

    rocket.mesh.rotateX(.015);

    updateCameraDistance();

    renderer.render(scene, camera);
    requestAnimationFrame(loop);
}

function init() {
    create();
    loop();
}

window.addEventListener('load', init, false);
