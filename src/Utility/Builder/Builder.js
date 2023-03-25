import * as THREE from 'three';
import { FlyControls } from 'three/examples/jsm/controls/FlyControls';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Device from '../Device';


export default class Builder {
    static createRenderer = (width, height) => {
        let renderer = new THREE.WebGLRenderer({
			antialias: true
		});
		renderer.setClearColor(new THREE.Color('rgb(0, 0, 0)'));
		renderer.setSize(width, height);

        return renderer;
    }

    static createCamera = (width, height) => {
        let camera = new THREE.PerspectiveCamera(
			75, // fov = field of view
			width / height, // aspect ratio
			0.1, // near plane
			1000 // far plane
		);

        camera.position.x = 0; // is used here to set some distance from a cube that is located at z = 0
		camera.position.y = 0; // is used here to set some distance from a cube that is located at z = 0
		camera.position.z = Device.isMobile() ? 140 : 55;
        return camera;
    }

    static setupFlyControls = (camera, mount) => {
        let controls = new FlyControls(camera, mount);
		controls.dragToLook = true;
		controls.movementSpeed = 10;
		controls.rollSpeed = 0.1;
		controls.update(1);
        return controls;
		// this.clock = new THREE.Clock();
    }

    static setupClock = () => {
        return new THREE.Clock()
    }

    static setupOrbitControls = (camera, mount) => {
		let controls = new OrbitControls(camera, mount);
		controls.enableKeys = true;
		controls.enablePan = true;
		controls.target.set(0,0,0);
		controls.minDistance = 1;
		controls.maxDistance = Device.isMobile() ? 200 :  60;
		controls.update();
        return controls;
	};

    static setupGridHelper = (scene, size = 100, divisions = 100) => {
		const gridHelper = new THREE.GridHelper(size, divisions);
		scene.add(gridHelper);
	};

    static setupLoadingManager = (loadStart, loadProgressing, loadFinished, loadError) => {
		let manager = new THREE.LoadingManager();
		manager.onStart = loadStart;
		manager.onProgress = loadProgressing;
		manager.onLoad = loadFinished;
		manager.onError = loadError;
        return manager;
	};

}
  