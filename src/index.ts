import "modern-normalize";
import * as THREE from "three";
import Terrain, { TerrainTypes } from "./Terrain";
import TEST_CHUNK from "./TestChunk";

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
const ASPECT = WIDTH / HEIGHT;
const FOV = 10;
const DISTANCE = 10;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);
const camera = new THREE.OrthographicCamera(
  -FOV * ASPECT,
  FOV * ASPECT,
  -FOV,
  FOV,
  1,
  100
);

function positionCamera(x: number, y: number, z: number) {
  camera.position.set(x - DISTANCE, y + DISTANCE, z - DISTANCE);
}

const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(WIDTH, HEIGHT);
document.body.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(1, -1, -1);
scene.add(directionalLight);

camera.position.set(-DISTANCE, DISTANCE, -DISTANCE);
camera.lookAt(scene.position);
camera.rotateZ(Math.PI);
positionCamera(128, 128, 128);

const chunk = TEST_CHUNK;
const blocks: Terrain[] = [];

chunk.forEach((level, y) => {
  level.forEach((row, x) => {
    row.forEach((block, z) => {
      if (block !== TerrainTypes.none) {
        blocks.push(new Terrain(block, new THREE.Vector3(x, y, z)));
      }
    });
  });
});

blocks.forEach((block) => block.addToScene(scene));

function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
}

animate();
