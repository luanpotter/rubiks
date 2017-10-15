const THREE = require('three');
const SIZE = 20;

const createCube = (position, colors) => {
    const geometry = new THREE.BoxGeometry(SIZE, SIZE, SIZE);
    for (let i  = 0; i < geometry.faces.length; i += 2) {
        const faceColor = colors[i/2] || 0x222222;
        geometry.faces[i].color.setHex(faceColor);
        geometry.faces[i + 1].color.setHex(faceColor);
    }

    const material = new THREE.MeshBasicMaterial({ color: 0xffffff, vertexColors: THREE.FaceColors });

    const cube = new THREE.Mesh(geometry, material);
    cube.position.x = position.x;
    cube.position.y = position.y;
    cube.position.z = position.z;

    return cube;
};

const draw = scene => {
    scene.add(createCube({ x: -SIZE, y: +SIZE, z: +SIZE }, { 1: 0xCC0000 }));
    scene.add(createCube({ x: 0, y: +SIZE, z: +SIZE }, { 0: 0x0000CC, 2: 0x00CC00 }));
    scene.add(createCube({ x: -SIZE, y: 0, z: +SIZE }, 0x0000CC));
};

module.exports = { draw };