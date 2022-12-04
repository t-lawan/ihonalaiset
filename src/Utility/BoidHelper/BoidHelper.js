import * as THREE from "three";

export class Box {
  constructor(width = 100, height = 100, depth = 100, color = 0xffffff) {
    const geometry = new THREE.BoxGeometry(width, height, depth, 1, 1, 1);

    this.mesh = new THREE.Group();
    var lineMaterial = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.05,
    });
    const meshMaterial = new THREE.MeshLambertMaterial({
      color,
      transparent: true,
      opacity: 0.9,
      wireframe: false,
      depthWrite: false,
      blending: THREE.NormalBlending,
    });
    this.mesh.add(new THREE.Mesh(geometry, meshMaterial));
    this.mesh.add(
      new THREE.LineSegments(
        new THREE.WireframeGeometry(geometry),
        lineMaterial
      )
    );
  }
}

let sphereCastDirections = [];

// from https://www.youtube.com/watch?v=bqtqltqcQhw
function initSphereCast() {
  const numViewDirections = 300;
  const goldenRatio = (1 + Math.sqrt(5)) / 2;
  const angleIncrement = Math.PI * 2 * goldenRatio;

  for (let i = 0; i < numViewDirections; i++) {
    const t = i / numViewDirections;
    const inclination = Math.acos(1 - 2 * t);
    const azimuth = angleIncrement * i;

    const x = Math.sin(inclination) * Math.cos(azimuth);
    const y = Math.sin(inclination) * Math.sin(azimuth);
    const z = Math.cos(inclination);
    sphereCastDirections.push(new THREE.Vector3(x, y, z));
  }
}

initSphereCast();

/**
 * Adds a simple box obstacle to the scene.
 *
 * @param {*} obstacles the array to push the obstacle to
 * @param {*} scene the scene to add the obstacle to
 * @param {*} w width of obstacle
 * @param {*} h height of obstacle
 * @param {*} d depth of obstacle
 * @param {*} c color of obstacle
 * @param {*} x coordinate of obstacle
 * @param {*} y coordinate of obstacle
 * @param {*} z coordinate of obstacle
 */
function addObstacle(obstacles, scene, w, h, d, c, x, y, z) {
  var obs1 = new Box(w, h, d, c);
  obs1.mesh.position.set(x, y, z);
//   scene.add(obs1.mesh);
  obstacles.push(obs1);
}

export const BoidHelper = {
  sphereCastDirections,
  addObstacle,
};
