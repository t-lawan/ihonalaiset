import React, { useState, useEffect, useRef, Component } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FlyControls } from 'three/examples/jsm/controls/FlyControls';

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { PixelShader } from 'three/examples/jsm/shaders/PixelShader';

import styled from 'styled-components';
import { Colours } from '../Components/Global/Global.styles';
import AstronautGLB from '../Assets/Models/Astronaut.glb';
import Overlay from '../Components/Overlay/Overlay';
import { ITEM_LIST } from '../Utility/Data/ItemList';

import DiamondOBJ from '../Assets/Models/Diamond.obj';
import FlowerOBJ from '../Assets/Models/Flower.obj';
import MushroomOBJ from '../Assets/Models/Mushroom.obj';
import SporeOBJ from '../Assets/Models/Spore.obj';
import SwirlOBJ from '../Assets/Models/Swirl.obj';
import { Vector3 } from 'three';
import LoadingPage from '../Components/LoadingPage/LoadingPage';
import Navbar from '../Components/Navbar/Navbar';
import MUSIC from '../Assets/Audio/MUSIC.mp3'

const TestEnvironmentWrapper = styled.div`height: 100vh;`;

/**
 * PortfolioEnvironment.js
 * 
 * This class contains all the logic to generate/render a scene in THREEjs
 *
 */
class PortfolioEnvironment extends Component {
	//Dimensions
	width;
	height;

	scene;
	controls;
	camera;
	renderer;
	animationID;
	mount;
	cube;
	model;
	clock;
	raycaster;
	mouse;
	composer;
	unrealBloomPass;
	clickableObjects = [];
	spheres = [];
	audio = null;
	constructor(props) {
		super(props);
		this.state = {
			hasLoaded: false,
			itemsLoaded: 0,
			itemsTotal: 0,
			showOverlay: false,
			overlayItem: null,
			pause: false, 
			soundIsPlaying: false
		};
	}

	/**
     * This is a React Lifecycle method.
     *
     * @memberof CubeEnvironment
     */
	componentDidMount() {
		this.setupScene();
		this.populateScene();
		this.startAnimationLoop();
		this.addEventListeners();
	}

	/**
     * This is a React Lifecycle method.
     *
     * @memberof CubeEnvironment
     */
	componentWillUnmount() {
		this.removeEventListeners();
		window.cancelAnimationFrame(this.animationID);
		this.controls.dispose();
	}

	/**
     * This function setup the THREE.Scene
	 * and calls other setup function
     *
     * @memberof CubeEnvironment
     */
	setupScene = () => {
		this.scene = new THREE.Scene();
		this.setDimensions();
		this.setupCamera();
		this.setupControls();
		this.setupRenderer();
		this.generateSpheres(1000);
		// this.setupPostProcessing();
		this.setupLoadingManager();
		this.setupRayCaster()
		this.setupMouse()
		this.setupAudio();
		this.mount.appendChild(this.renderer.domElement); // mount using React ref
	};

	setupAudio = () => {
		this.audioListener = new  THREE.AudioListener();
		this.scene.add(this.audioListener);

		this.sound = new THREE.Audio(this.audioListener);
		this.scene.add(this.sound);

		// this.camera.add(this.audio);
		let audioLoader = new THREE.AudioLoader(this.manager);
		audioLoader.load(MUSIC, (buffer) => {
			this.sound.setBuffer( buffer );
			this.sound.setLoop( true );
			this.sound.setVolume( 0.5 );
			this.toggleSound();
		});
	}

	/**
     *
     *
     * @memberof CubeEnvironment
     */
	populateScene = () => {
		// this.addHelpers();

		// Add Cubes
		// this.addCube(new THREE.Vector3(0,0,0), ITEM_LIST.MONA_LISA);
		// this.addCube(new THREE.Vector3(-20,5,-30), ITEM_LIST.PHARCYDE);
		// this.addCube(new THREE.Vector3(20,5,-26), ITEM_LIST.SOY_CUBA);


		this.addLights();
		this.addOBJModel(DiamondOBJ, new THREE.Vector3(0,0,0), ITEM_LIST.MONA_LISA); // 0,0,0 but adjusted due to file
		this.addOBJModel(MushroomOBJ, new THREE.Vector3(25,0,0), ITEM_LIST.SOY_CUBA);
		this.addOBJModel(SporeOBJ, new THREE.Vector3(15,0,-15), ITEM_LIST.LOREM_IPSUM);
		this.addOBJModel(FlowerOBJ, new THREE.Vector3(-5,0,-10), ITEM_LIST.PHARCYDE);
		this.addOBJModel(SwirlOBJ, new THREE.Vector3(0,0,10), ITEM_LIST.TIME);
		// this.setupFog();
	};
	/**
	 * This adds fog to the scene
	 *
	 * @memberof PortfolioEnvironment
	 */
	setupFog = () => {
		this.scene.fog = new THREE.FogExp2(new THREE.Color('white'), 0.1); // Color, Density
	};

	/**
     * This function creates the PerspectiveCamera
	 * and settings
     *
     * @memberof CubeEnvironment
     */
	setupCamera = () => {
		this.camera = new THREE.PerspectiveCamera(
			75, // fov = field of view
			this.width / this.height, // aspect ratio
			0.1, // near plane
			1000 // far plane
		);
		this.camera.position.x = 0; // is used here to set some distance from a cube that is located at z = 0
		this.camera.position.y = 0; // is used here to set some distance from a cube that is located at z = 0
		this.camera.position.z = 40; // is used here to set some distance from a cube that is located at z = 0
	};

	/**
     * Set width and height using Wrapper client dimensions
     *
     * @memberof CubeEnvironment
     */
	setDimensions = () => {
		this.width = this.mount.clientWidth;
		this.height = this.mount.clientHeight;
	};

	/**
     * 
     * @memberof CubeEnvironment
     */
	setupControls = () => {
		this.setupOrbitControls();
		// this.setupFlyControls();
	};

	/**
	 *
	 *
	 * @memberof PortfolioEnvironment
	 */
	setupFlyControls = () => {
		this.controls = new FlyControls(this.camera, this.mount);
		this.controls.dragToLook = true;
		this.controls.movementSpeed = 10;
		this.controls.rollSpeed = 0.1;
		this.controls.update(1);
		this.clock = new THREE.Clock();
	};

	/**
	 * OrbitControls allow a camera to orbit around the object
     * https://threejs.org/docs/#examples/controls/OrbitControls
	 *
	 * @memberof PortfolioEnvironment
	 */
	setupOrbitControls = () => {
		this.controls = new OrbitControls(this.camera, this.mount);
		this.controls.enableKeys = true;
		this.controls.enablePan = true;
		this.clock = new THREE.Clock();
		this.controls.target.set(0,0,0);
		this.controls.minDistance = 1;
		this.controls.maxDistance = 50;
		this.controls.update();
	};

	/**
	 *
     * Instatiate the renderer
	 *
	 * @memberof PortfolioEnvironment
	 */
	setupRayCaster = () => {
		this.raycaster = new THREE.Raycaster();
	};

	/**
     * Instatiate the renderer
     *
     * @memberof CubeEnvironment
     */
	setupRenderer = () => {
		this.renderer = new THREE.WebGLRenderer({
			antialias: true
		});
		this.renderer.setClearColor(new THREE.Color('rgb(0, 0, 0)'));
		this.renderer.setSize(this.width, this.height);
	};

	setupPostProcessing = () => {
		this.composer = new EffectComposer(this.renderer);
		this.composer.addPass(new RenderPass(this.scene, this.camera));

		// const params = {
		// 	exposure: 2.0,
		// 	bloomStrength: 3.0,
		// 	bloomThreshold: 2.0,
		// 	bloomRadius: 0.2
		// };
		// this.unrealBloomPass = new UnrealBloomPass(
		// 	new THREE.Vector2(window.innerWidth, window.innerHeight),
		// 	1.5,
		// 	0.4,
		// 	0.85
		// );
		// this.unrealBloomPass.threshold = params.bloomThreshold;
		// this.unrealBloomPass.strength = params.bloomStrength;
		// this.unrealBloomPass.radius = params.bloomRadius;
		// this.renderer.toneMappingExposure = params.exposure;


		let pixelPass = new ShaderPass( PixelShader );
		 pixelPass.uniforms[ 'resolution' ].value = new THREE.Vector2( window.innerWidth, window.innerHeight );
		 pixelPass.uniforms[ 'resolution' ].value.multiplyScalar( window.devicePixelRatio );
		 pixelPass.uniforms[ 'pixelSize' ].value = 4;
		this.composer.addPass(pixelPass);

	};

	/**
	 * Instatiate the mouse property
	 *
	 * @memberof PortfolioEnvironment
	 */
	setupMouse = () => {
		this.mouse = new THREE.Vector2();
	};

	/**
	 *
	 *
	 * @memberof PortfolioEnvironment
	 */
	setMouse = (event) => {
		this.mouse.x = event.clientX / this.mount.clientWidth * 2 - 1;
		this.mouse.y = -(event.clientY / this.mount.clientHeight) * 2 + 1;
	};

	/**
     *
     *
     * @memberof CubeEnvironment
     */
	addCube = (position, project) => {
		// Create geometry
		const geometry = new THREE.BoxGeometry(2, 2, 2);
		// Create Material
		const material = new THREE.MeshPhongMaterial({
			color: 'rgb(54, 54, 82)',
			emissive: 'rgb(54, 54, 82)',
			side: THREE.DoubleSide,
			flatShading: true
		});
		// Create Cube using geometry and material
		let cube = new THREE.Mesh(geometry, material);

		// Set cube position
		cube.position.set(position.x, position.y, position.z);

		// Add project to cube user data
		cube.userData.project = project;

		// Add clickable objects
		this.clickableObjects.push(cube);

		// Add cube to scene
		this.scene.add(cube);
	};

	/**
     * Creates THREE.PointLight
     *
     * @memberof CubeEnvironment
     */
	addLights = () => {
		const lights = [];
		lights[0] = new THREE.PointLight(0xffffff, 1, 0);
		lights[1] = new THREE.PointLight(0xffffff, 1, 0);
		lights[2] = new THREE.PointLight(0xffffff, 1, 0);

		lights[0].position.set(0, 100, 0);
		lights[1].position.set(100, 100, 100);
		lights[2].position.set(-100, -100, -100);

		this.scene.add(lights[0]);
		this.scene.add(lights[1]);
		this.scene.add(lights[2]);
	};

	addPointLight = (position, colour) => {
		const light = new THREE.PointLight(colour, 0.3, 0);
		light.position.set(position.x, position.y, position.z );
		this.scene.add(light);
	}

	/**
	 * Loads model and adds to the scene
	 * 
	 * Requires Object url, THREE.Vector3 and project name
	 *
	 * @memberof PortfolioEnvironment
	 */
	addModel = (object, position, project) => {
		// Add manager to loader
		const loader = new GLTFLoader(this.manager);
		// Instatiate new Object3D for the model
		let model = new THREE.Object3D();
		// console.log("OBJ", object)

		// Load the model using call back
		loader.load(object, (gltf) => {
			model = gltf.scene;

			// Sets position of Model
			model.position.set(position.x, position.y, position.z);

			// Assign project data
			model.userData.project = project;
			model.traverse((object) => {
				object.userData.project = project;
			});

			this.clickableObjects.push(model);
			this.scene.add(model);
		});
	};

	addOBJModel = (object, position, project) => {
		// Add manager to loader
		const loader = new OBJLoader(this.manager);
		// Instatiate new Object3D for the model
		let model = new THREE.Object3D();
		// console.log("OBJ", object)

		// Load the model using call back
		loader.load(object, (obj) => {
			model = obj;

			// Sets position of Model
			model.position.set(position.x, position.y, position.z);
			model.scale.multiply(new THREE.Vector3(0.05, 0.05, 0.05));
			// model.material.

			// Assign project data
			model.userData.project = project;
			model.traverse((object) => {
				object.position.set(position.x, position.y, position.z);
				object.userData.project = project;
				if(object.material && project.isOn){
					object.material.color = new THREE.Color(Colours.neon_green);
				}
			});

			this.clickableObjects.push(model);


			this.scene.add(model);

			// Setup for point lights
			let val = new THREE.Vector3(0,-1 ,0)
			this.addPointLight(position.sub(val), new THREE.Color(project.isOn ? 'green' : 'white'));

		});
	};

	/**
	 *
	 *
	 * @memberof PortfolioEnvironment
	 */
	addHelpers = () => {
		this.addAxesHelper();
		this.addGridHelper();
	};

	generateSpheres = (numberOfSpheres = 10) => {
		for(let x = 0; x < numberOfSpheres; x++){
			this.generateSphere(this.generateRandomPositions());
		}
	};

	generateRandomPositions = () => {
		const x = Math.floor(Math.random() * 100) - 100/2;
		const y = Math.floor(Math.random() * 100) - 100/2;
		const z = Math.floor(Math.random() * 100) - 100/2;
		return new THREE.Vector3(x,y,z)
	};

	generateSphere = (position) => {
		const geometry = new THREE.SphereGeometry( 0.1, 32, 16 );
		const material = new THREE.MeshPhongMaterial( { color: 0xffffff, transparent: true, opacity: 0.3 } );
		const sphere = new THREE.Mesh( geometry, material );
		sphere.position.add(position);
		
		this.spheres.push(sphere);
		this.scene.add(sphere);
	}

	moveSpheres = () => {
		this.spheres.forEach((sphere) => {
			this.moveSphere(sphere);
		})
	}

	moveSphere = (sphere) => {
		const x = Math.random()/100 - 0.005;
		const y = Math.random()/100 - 0.005;
		const z = Math.random()/100 - 0.005;

		const position = new THREE.Vector3(x,y,z);

		sphere.position.add(position);
	}
	


	/**
	 * 
	 *
	 * @memberof PortfolioEnvironment
	 */
	addAxesHelper = () => {
		const axesHelper = new THREE.AxesHelper(5);
		this.scene.add(axesHelper);
	};

	/**
	 * This is helper function to render a grid
	 *
	 * @memberof PortfolioEnvironment
	 */
	addGridHelper = () => {
		const size = 100;
		const divisions = 100;
		// Create Gridhelper with size and divisions
		const gridHelper = new THREE.GridHelper(size, divisions);
		this.scene.add(gridHelper);
	};

	// Loading Logic

	/**
	 * This is setting up the Loading manager
	 * and assigning onStart, onProgress, onLoad
	 * onError
	 *
	 * @memberof PortfolioEnvironment
	 */
	setupLoadingManager = () => {
		this.manager = new THREE.LoadingManager();
		this.manager.onStart = this.loadStart;
		this.manager.onProgress = this.loadProgressing;
		this.manager.onLoad = this.loadFinished;
		this.manager.onError = this.loadError;
	};

	/**
	 * This function is called once the loading process
	 * has started
	 *
	 * @memberof PortfolioEnvironment
	 */
	loadStart = (url, itemsLoaded, itemsTotal) => {
		this.setState({
			itemsLoaded: itemsLoaded,
			itemsTotal: itemsTotal
		});
	};

	/**
	 * This function is called every time there's an update 
	 * on the loading process
	 *
	 * @memberof PortfolioEnvironment
	 */
	loadProgressing = (url, itemsLoaded, itemsTotal) => {
		this.setState({
			itemsLoaded: itemsLoaded,
			itemsTotal: itemsTotal
		});
	};

	/**
	 * This function is called every time loading is finished
	 *
	 * @memberof PortfolioEnvironment
	 */
	loadFinished = () => {
		console.log('LOADING FINISHED')
		this.setState({
			hasLoaded: true
		});
	};

	/**
     * This is the function that is running the environment.
     * The window.requestAnimationFrame() method tells the browser
	 * that you wish to perform an animation and requests that the 
	 * browser calls a specified function to update an animation 
	 * before the next repaint
     * @memberof CubeEnvironment
     */
	startAnimationLoop = () => {
		// if (this.model) {
		// 	this.model.rotation.x += 0.01;
		// 	this.model.rotation.y += 0.01;
		// }

		this.moveSpheres();

		// This is required the FlyControls to work
		if (this.clock) {
			let delta = this.clock.getDelta();
			this.controls.update(delta);
		}

		if(this.composer){
			this.composer.render();
		} else {
			this.renderer.render(this.scene, this.camera);

		}

		// The window.requestAnimationFrame() method tells the browser that you wish to perform
		// an animation and requests that the browser call a specified function
		// to update an animation before the next repaint
		this.animationID = window.requestAnimationFrame(this.startAnimationLoop);
	};

	/**
	 *
	 *
	 * @memberof PortfolioEnvironment
	 */
	hideOverlay = () => {
		this.setState({
			showOverlay: false
		});
	};

	// Interactions

	/**
     * EventListeners
     *
     * @memberof CubeEnvironment
     */
	addEventListeners = () => {
		document.addEventListener("dblclick", this.onDocumentDoubleClick, false);
		window.addEventListener('resize', this.handleWindowResize, false);
	};

	/**
	 * EventListeners
	 *
	 * @memberof PortfolioEnvironment
	 */
	removeEventListeners = () => {
		document.removeEventListener("dblclick", this.onDocumentDoubleClick);
		window.removeEventListener('resize', this.onWindowResize);
	};

	/**
	 * This is calleed when the resize event is triggered
	 *
	 * @memberof PortfolioEnvironment
	 */
	handleWindowResize = () => {
		const width = this.mount.clientWidth;
		const height = this.mount.clientHeight;

		this.camera.aspect = width / height;

		if (this.composer) {
			this.composer.setSize(width, height);
		} else {
			this.renderer.setSize(width, height);
		}

		// Note that after making changes to most of camera properties you have to call
		// .updateProjectionMatrix for the changes to take effect.
		this.camera.updateProjectionMatrix();
	};

	/**
	 * This is calleed when the dblclick event is triggered
	 *
	 * @memberof PortfolioEnvironment
	 */
	onDocumentDoubleClick = (event) => {
		// Check if environment is not in pause state
		if (!this.state.pause) {
			this.setMouse(event);

			// Update the ray with a new origin and direction.
			this.raycaster.setFromCamera(this.mouse, this.camera);

			//Checks all intersection between the ray and the objects with or without the descendants.
			// Intersections are returned sorted by distance, closest first.
			let intersects = this.raycaster.intersectObjects(this.clickableObjects);
			console.log('clickableObjects', this.clickableObjects);
			if (intersects.length > 0) {
				let mesh = intersects[0];
				console.log(mesh.object);
				// Set the overlay and project
				this.setState({
					showOverlay: true,
					overlayItem: mesh.object.userData.project
				});
			}
		}
	};

	showInfoOverlay = () => {
		this.setState({
			showOverlay: true,
			overlayItem: ITEM_LIST.ABOUT
		});
	}



	toggleSound = () => {
		if(this.sound.isPlaying){

			this.sound.pause();
			this.setState({
				soundIsPlaying: false
			})
		} else {
			this.sound.play();
			this.setState({
				soundIsPlaying: true
			})
		}
	}

	/**
     *
     *
     * @returns
     * @memberof CubeEnvironment
     */
	render() {
		return (
			<React.Fragment>
				<Navbar isPlaying={this.state.soundIsPlaying} toggleMusic={this.toggleSound.bind(this)} openInfoModal={this.showInfoOverlay}/>
				<LoadingPage show={!this.state.hasLoaded} />
				<Overlay item={this.state.overlayItem} show={this.state.showOverlay} hide={this.hideOverlay} />
				<TestEnvironmentWrapper ref={(ref) => (this.mount = ref)} />
			</React.Fragment>
		);
	}
}

export default PortfolioEnvironment;
