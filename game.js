// НАШ 3D МИР

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB);

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// ОСВЕЩЕНИЕ

const light = new THREE.DirectionalLight(0xffffff, 2);
light.position.set(5, 10, 5);
scene.add(light);

scene.add(new THREE.AmbientLight(0xffffff, 0.7));

// ЗЕМЛЯ

const groundGeometry = new THREE.PlaneGeometry(100, 100);
const groundMaterial = new THREE.MeshStandardMaterial({
    color: 0x55aa55
});

const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// ДОМ

const house = new THREE.Mesh(
    new THREE.BoxGeometry(5, 4, 5),
    new THREE.MeshStandardMaterial({ color: 0xffcc99 })
);

house.position.set(0, 2, -8);
scene.add(house);

// КРЫША

const roof = new THREE.Mesh(
    new THREE.ConeGeometry(4, 3, 4),
    new THREE.MeshStandardMaterial({ color: 0xaa3333 })
);

roof.position.set(0, 5.5, -8);
roof.rotation.y = Math.PI / 4;
scene.add(roof);

// ПЕРСОНАЖ

const character = new THREE.Group();

const body = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1.5, 0.6),
    new THREE.MeshStandardMaterial({ color: 0x3366ff })
);

body.position.y = 1.3;
character.add(body);

const head = new THREE.Mesh(
    new THREE.SphereGeometry(0.45, 32, 32),
    new THREE.MeshStandardMaterial({ color: 0xffcc99 })
);

head.position.y = 2.4;
character.add(head);

scene.add(character);

// КАМЕРА

camera.position.set(0, 5, 10);
camera.lookAt(0, 0, 0);

// УПРАВЛЕНИЕ ПЕРСОНАЖЕМ

const keys = {};

window.addEventListener("keydown", (e) => {
    keys[e.key.toLowerCase()] = true;
});

window.addEventListener("keyup", (e) => {
    keys[e.key.toLowerCase()] = false;
});

function animate() {
    requestAnimationFrame(animate);

    if (keys["w"] || keys["arrowup"]) character.position.z -= 0.1;
    if (keys["s"] || keys["arrowdown"]) character.position.z += 0.1;
    if (keys["a"] || keys["arrowleft"]) character.position.x -= 0.1;
    if (keys["d"] || keys["arrowright"]) character.position.x += 0.1;

    camera.position.x = character.position.x;
    camera.position.z = character.position.z + 10;
    camera.lookAt(character.position.x, 1, character.position.z);

    renderer.render(scene, camera);
}

animate();

// ИЗМЕНЕНИЕ РАЗМЕРА ЭКРАНА

window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
