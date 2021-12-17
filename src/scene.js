import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const loader = new GLTFLoader();

const scene = new THREE.Scene();

let objects = [];

let camera, renderer;

// Lighting
const light = new THREE.PointLight(0xffffff, 4, 100);
light.position.set(10, 10, 10);
scene.add(light);

const animate = () => {
  requestAnimationFrame(animate);
  light.position.x = camera.position.x;
  light.position.y = camera.position.y;
  light.position.z = camera.position.z;

  renderer.render(scene, camera);
};

const loadObject = (path) => {
  loader.load(
    path,
    function (gltf) {
      objects.push(gltf.scene);
      scene.add(gltf.scene);
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );
};

loadObject("./brain.glb");
loadObject("./spikes.glb");

export const createScene = (element) => {
  renderer = new THREE.WebGLRenderer({ antialias: true, canvas: element });
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 10;
  camera.position.y = 2;

  resize();
  animate();
};

window.onresize = () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
};

window.onwheel = (event) =>
  objects.forEach((object) => {
    object.rotation.y += event.deltaY / 100;
  });
