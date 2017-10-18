const THREE = require('three');
const SIZE = 20;

const CUBES = [];

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

    CUBES.push(cube);
    return cube;
};

const rgb = (r, g, b) => b + 256*g + 256*256*r;

const drawCube = scene => {
    const cubeDescStr = 'a,a,a,a,a,a,a,a,a;b,b,b,b,b,b,b,b,b;c,c,c,c,c,c,c,c,c;d,d,d,d,d,d,d,d,d;e,e,e,e,e,e,e,e,e;f,f,f,f,f,f,f,f,f';
    const cubeDesc = cubeDescStr.split(';').map(s => s.split(','));
    const colors = {
        a: rgb(238, 111, 18),
        b: rgb(2, 166, 93),
        c: rgb(25, 59, 254),
        d: rgb(255, 255, 255),
        e: rgb(184, 0, 0),
        f: rgb(254, 232, 51)
    };
    const color = (face, pos) => colors[cubeDesc[face - 1][pos - 1]];
    const d = SIZE + 4;

    scene.add(createCube({ x: -d, y: d, z: d }, { 4: color(1, 1), 1: color(3, 3), 2: color(2, 7) }));
    scene.add(createCube({ x: 0, y: d, z: d }, { 4: color(1, 2), 2: color(2, 8) }));
    scene.add(createCube({ x: d, y: d, z: d }, { 4: color(1, 3), 0: color(4, 1), 2: color(2, 9) }));

    scene.add(createCube({ x: -d, y: 0, z: d }, { 4: color(1, 4), 1: color(3, 6) }));
    scene.add(createCube({ x: 0, y: 0, z: d }, { 4: color(1, 5) }));
    scene.add(createCube({ x: +d, y: 0, z: d }, { 4: color(1, 6), 0: color(4, 4) }));

    scene.add(createCube({ x: -d, y: -d, z: d }, { 4: color(1, 7), 1: color(3, 9), 3: color(5, 1) }));
    scene.add(createCube({ x: 0, y: -d, z: d }, { 4: color(1, 8), 3: color(5, 2) }));
    scene.add(createCube({ x: d, y: -d, z: d }, { 4: color(1, 9), 0: color(4, 7), 3: color(5, 3) }));



    scene.add(createCube({ x: -d, y: d, z: 0 }, { 1: color(3, 2), 2: color(2, 4) }));
    scene.add(createCube({ x: 0, y: d, z: 0 }, { 2: color(2, 5) }));
    scene.add(createCube({ x: d, y: d, z: 0 }, { 0: color(4, 2), 2: color(2, 6) }));

    scene.add(createCube({ x: -d, y: 0, z: 0 }, { 1: color(3, 5) }));
    scene.add(createCube({ x: 0, y: 0, z: 0 }, {}));
    scene.add(createCube({ x: +d, y: 0, z: 0 }, { 0: color(4, 5) }));

    scene.add(createCube({ x: -d, y: -d, z: 0 }, { 1: color(3, 8), 3: color(5, 4) }));
    scene.add(createCube({ x: 0, y: -d, z: 0 }, { 3: color(5, 5) }));
    scene.add(createCube({ x: d, y: -d, z: 0 }, { 0: color(4, 8), 3: color(5, 6) }));



    scene.add(createCube({ x: -d, y: d, z: -d }, { 5: color(6, 1), 1: color(3, 1), 2: color(2, 1) }));
    scene.add(createCube({ x: 0, y: d, z: -d }, { 5: color(6, 2), 2: color(2, 2) }));
    scene.add(createCube({ x: d, y: d, z: -d }, { 5: color(6, 3), 0: color(4, 3), 2: color(2, 3) }));

    scene.add(createCube({ x: -d, y: 0, z: -d }, { 5: color(6, 4), 1: color(3, 4) }));
    scene.add(createCube({ x: 0, y: 0, z: -d }, { 5: color(6, 5) }));
    scene.add(createCube({ x: +d, y: 0, z: -d }, { 5: color(6, 6), 0: color(4, 6) }));

    scene.add(createCube({ x: -d, y: -d, z: -d }, { 5: color(6, 7), 1: color(3, 7), 3: color(5, 7) }));
    scene.add(createCube({ x: 0, y: -d, z: -d }, { 5: color(6, 8), 3: color(5, 8) }));
    scene.add(createCube({ x: d, y: -d, z: -d }, { 5: color(6, 9), 0: color(4, 9), 3: color(5, 9) }));
};

const rotations = [ 'F', 'L' ];
let rotation = 0, currentRotation;
let pivot;

// [ [from, to], ... ]
const swap = (changes) => {
    const froms = {};
    changes.map(v => v[1]).forEach(from => froms[from] = CUBES[from]);
    changes.forEach(pair => CUBES[pair[0]] = froms[pair[1]]);
};

const MAP = {
    'F': {
        rotations: [[0, 6], [1, 3], [2, 0], [3, 7], [4, 4], [5, 1], [6, 8], [7, 5], [8, 2]],
        axis: 'z',
        sign: -1
    },
    'L': {
        rotations: [[0, 6], [9, 3], [18, 0], [3, 15], [12, 12], [21, 9], [6, 24], [15, 21], [24, 18]],
        axis: 'x',
        sign: +1
    }
}

const draw = scene => {
    drawCube(scene);
    return dt => {
        if (!currentRotation) {
            if (rotations.length === 0) {
                return;
            }
            currentRotation = rotations.shift();
            pivot = new THREE.Group();
            MAP[currentRotation].rotations.map(v => v[1]).forEach(i => pivot.add(CUBES[i]));
            scene.add(pivot);
        }
        rotation += 0.001 * dt * MAP[currentRotation].sign;
        pivot.rotation[MAP[currentRotation].axis] = rotation;
        if (Math.abs(rotation) >= Math.PI / 2) {
            pivot.children.slice().forEach(child => THREE.SceneUtils.detach(child, pivot, scene));
            scene.remove(pivot);
            swap(MAP[currentRotation].rotations);
            rotation = 0;
            currentRotation = null;
        }
    };
};

module.exports = { draw };