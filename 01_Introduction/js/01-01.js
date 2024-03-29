function init() {
  console.log('This Three.js version is V-' + THREE.REVISION);
  // create a scene, that will hold all our elements such as objects, cameras and lights.
  const scene = new THREE.Scene();
  // create a render and set the size
  renderer = addRenderer();
  const camera = addCamera(scene);
  addAxis(scene);
  addPlane(scene);
  const cube = addCube(scene);
  sphere = addSphere(scene);
  addTree(scene);
  addSpotLight(scene);
  addAmbienLight(scene);
  // add the output of the renderer to the html element
  document.getElementById('webgl-output').appendChild(renderer.domElement);

  // render the scene
  // renderer.render(scene, camera);
  const stats = initStats();
  let step = 0;
  renderScene();
  function renderScene() {
    // rotate the cube around its axes
    cube.rotation.x += 0.02;
    cube.rotation.y += 0.02;
    cube.rotation.z += 0.02;

    // bounce the sphere up and down
    step += 0.04;
    sphere.position.x = 20 + 10 * Math.cos(step);
    sphere.position.y = 2 + 10 * Math.abs(Math.sin(step));

    // render using requestAnimationFrame
    requestAnimationFrame(renderScene);
    renderer.render(scene, camera);
    stats.update();
  }
}
function initStats() {
  const stats = new Stats();
  stats.setMode(0); // 0: fps, 1: ms

  // Align top-left
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left = '0px';
  stats.domElement.style.top = '0px';

  document.getElementById('Stats-output').appendChild(stats.domElement);

  return stats;
}
function addRenderer() {
  const renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0x000000));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  return renderer;
}
function addCamera(scene) {
  // create a camera, which defines where we're looking at.
  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  // position and point the camera to the center of the scene
  camera.position.set(-30, 40, 30);
  camera.lookAt(scene.position);
  return camera;
}
function addAxis(scene) {
  // show axes in the screen
  const axes = new THREE.AxesHelper(20);
  scene.add(axes);
}
function addPlane(scene) {
  // create the ground plane
  const planeGeometry = new THREE.PlaneGeometry(60, 20, 1, 1);
  const planeMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff
  });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  // rotate and position the plane
  plane.rotation.x = -0.5 * Math.PI;
  // plane.position.set(15, 0, 0);
  plane.position.x = 15;
  plane.position.y = 0;
  plane.position.z = 0;
  plane.receiveShadow = true;

  // add the plane to the scene
  scene.add(plane);
}
function addCube(scene) {
  const cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
  const cubeMaterial = new THREE.MeshBasicMaterial({
    color: 0xff0000
    // wireframe: true
  });
  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.castShadow = true;
  // position the cube
  // cube.position.set(-4, 3, 0);
  cube.position.x = -4;
  cube.position.y = 2;
  cube.position.z = 0;
  // add the cube to the scene
  scene.add(cube);
  return cube;
}
function addSphere(scene) {
  const sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
  const sphereMaterial = new THREE.MeshBasicMaterial({
    color: 0x7777ff
    // wireframe: true
  });
  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  // position the sphere
  // sphere.position.set(20, 4, 2);
  sphere.position.x = 20;
  sphere.position.y = 4;
  sphere.position.z = 2;
  sphere.castShadow = true;
  // add the sphere to the scene
  scene.add(sphere);
  return sphere;
}
function addTree(scene) {
  const trunk = new THREE.CubeGeometry(1, 8, 1);
  const leaves = new THREE.SphereGeometry(4);

  // create the mesh
  const trunkMesh = new THREE.Mesh(
    trunk,
    new THREE.MeshLambertMaterial({
      color: 0x8b4513
    })
  );
  const leavesMesh = new THREE.Mesh(
    leaves,
    new THREE.MeshLambertMaterial({
      color: 0x00ff00
    })
  );

  // position the trunk. Set y to half of height of trunk
  trunkMesh.position.set(-10, 4, 0);
  leavesMesh.position.set(-10, 12, 0);

  trunkMesh.castShadow = true;
  trunkMesh.receiveShadow = true;
  leavesMesh.castShadow = true;
  leavesMesh.receiveShadow = true;

  scene.add(trunkMesh);
  scene.add(leavesMesh);
}
function addSpotLight(scene) {
  const spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(-40, 40, -15);
  spotLight.castShadow = true;
  spotLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
  spotLight.shadow.camera.far = 130;
  spotLight.shadow.camera.near = 40;

  // If you want a more detailled shadow you can increase the
  // mapSize used to draw the shadows.
  // spotLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
  scene.add(spotLight);
}
function addAmbienLight(scene) {
  const ambienLight = new THREE.AmbientLight(0x353535);
  scene.add(ambienLight);
}
