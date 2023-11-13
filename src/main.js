import * as THREE from 'three';

const canvas = document.querySelector('#c');
const renderer = new THREE.WebGLRenderer({canvas});
const scene = new THREE.Scene();

const loader = new THREE.TextureLoader();
loader.load('assets/minecraft_grass.jpg',
    function(texture) {
         scene.background = texture;
    });

function render(){
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

function main(){
    requestAnimationFrame(render);
}


main();