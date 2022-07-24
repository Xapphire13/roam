import "modern-normalize";
import * as THREE from "three";

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
const ASPECT = WIDTH / HEIGHT;
const FOV = 10;

const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(
  -FOV * ASPECT,
  FOV * ASPECT,
  -FOV,
  FOV,
  1,
  100
);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(WIDTH, HEIGHT);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

const CUBE_POSITIONS = [
  [0, 0, 0],
  [0, 1, 0],
  [2, 0, 0],
  [0, 0, 3],
];

CUBE_POSITIONS.forEach(([x, y, z]) => {
  const cube = new THREE.Mesh(geometry, material);
  cube.position.set(x, y, z);
  scene.add(cube);

  const edges = new THREE.EdgesGeometry(geometry);
  const line = new THREE.LineSegments(
    edges,
    new THREE.LineBasicMaterial({ color: 0x000000 })
  );
  line.position.set(x, y, z);
  scene.add(line);
});

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

camera.position.set(-5, 5, -5);
camera.lookAt(scene.position);
camera.rotateZ(Math.PI);

function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
}

animate();
