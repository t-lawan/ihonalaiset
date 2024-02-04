import React, { useState, useEffect, useRef, Component } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import styled from 'styled-components';
import { Colours } from '../Components/Global/Global.styles';
import Overlay from '../Components/Overlay/Overlay';
import { ITEM_LIST, OverlayItemMap, transformItemList } from '../Utility/Data/ItemList';
import DiamondOBJ from '../Assets/Models/Diamond.obj';
import MushroomOBJ from '../Assets/Models/Mushroom.obj';
import SphereOBJ from '../Assets/Models/Sphere.obj';
import SporeOBJ from '../Assets/Models/Spore.obj';
import SwirlOBJ from '../Assets/Models/Swirl.obj';
import LoadingPage from '../Components/LoadingPage/LoadingPage';
import Navbar from '../Components/Navbar/Navbar';
import MUSIC from '../Assets/Audio/MUSIC.mp3'
import BoidManager from '../Utility/BoidManager/BoidManager';
import { BoidHelper, Box } from '../Utility/BoidHelper/BoidHelper';
import Device from '../Utility/Device';
import Instruction from '../Components/Instructions/Instructions';
import Builder from '../Utility/Builder/Builder';
import { connect } from 'react-redux';
import { hasLoaded, setItemList } from '../Store/action';


const EnvironmentWrapper = styled.div`height: 100vh;`;

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

	isMobile = false;

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
	boidManager;
	obstacles = []

	constructor(props) {
		super(props);
		this.state = {
			hasLoaded: false,
			itemsLoaded: 0,
			itemsTotal: 0,
			showOverlay: false,
			overlayItem: null,
			pause: false, 
			soundIsPlaying: false,
			showInstructions: false
		};

		// device detection
		if (Device.isMobile()) {
			this.isMobile = true;
		}
	}

	/**
     * This is a React Lifecycle method.
     *
     * @memberof CubeEnvironment
     */
	componentDidMount() {
		// this.loadStore();
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

	// loadStore = () => {
	// 	let itemList = transformItemList(ITEM_LIST);
	// 	this.props.setItemList(itemList)
	// }

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
		// this.generateSpheres(1000);
		// this.setupPostProcessing();
		this.setupLoadingManager();
		this.setupRayCaster()
		this.setupMouse()
		// this.setupAudio();
		this.setupBoidManager()

		this.mount.appendChild(this.renderer.domElement); // mount using React ref
	};

	setupBoidManager = () => {
		
		const geometry = new THREE.SphereGeometry( 1, 1, 1 );
		const material = new THREE.MeshBasicMaterial( { color: 0x000000 } );
		const sphere = new THREE.Mesh( geometry, material );
		sphere.position.set(0, 40, 0);
		this.scene.add( sphere );

		// lure = new THREE.PointLight(0xffffff, 3, 500);
  		// lure.position.set(0, 50, 0);
		this.boidManager = new BoidManager(this.scene, Device.isMobile() ? 250 : 500, this.obstacles, sphere)
		
		this.boidManager.boids.forEach(boid => {
			this.scene.add(boid.mesh);
		})
	}

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

		this.addSceneLights();
		this.addLights();
		// this.addOBJModel(DiamondOBJ, new THREE.Vector3(0,0,0), ITEM_LIST.MONA_LISA); // 0,0,0 but adjusted due to file
		// this.addOBJModel(MushroomOBJ, new THREE.Vector3(25,0,0), ITEM_LIST.SOY_CUBA);
		// this.addOBJModel(SporeOBJ, new THREE.Vector3(15,0,-15), ITEM_LIST.LOREM_IPSUM);
		// this.addOBJModel(FlowerOBJ, new THREE.Vector3(-5,0,-10), ITEM_LIST.PHARCYDE);
		// this.addOBJModel(SwirlOBJ, new THREE.Vector3(0,0,10), ITEM_LIST.TIME);
		// this.setupFog();

		this.addOBJModel(SporeOBJ, new THREE.Vector3(-42,0,2.5), this.props.item_list.find(item => item.title === OverlayItemMap.SPORE.title)); // 0,0,0 but adjusted due to file
		this.addOBJModel(DiamondOBJ, new THREE.Vector3(-5,0,0), this.props.item_list.find(item => item.title === OverlayItemMap.DIAMOND.title)); // 0,0,0 but adjusted due to file
		this.addOBJModel(MushroomOBJ, new THREE.Vector3(-4,0,0), this.props.item_list.find(item => item.title === OverlayItemMap.MUSHROOM.title));
		this.addOBJModel(SwirlOBJ, new THREE.Vector3(15,0,0), this.props.item_list.find(item => item.title === OverlayItemMap.SWIRL.title));
		this.addOBJModel(SphereOBJ, new THREE.Vector3(35,0,0), this.props.item_list.find(item => item.title === OverlayItemMap.SPHERE.title));

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
		this.camera = Builder.createCamera(this.width, this.height)
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
		this.controls = Builder.setupFlyControls(this.camera, this.mount);
		this.clock = Builder.setupClock();
	};

	/**
	 * OrbitControls allow a camera to orbit around the object
     * https://threejs.org/docs/#examples/controls/OrbitControls
	 *
	 * @memberof PortfolioEnvironment
	 */
	setupOrbitControls = () => {
		this.controls = Builder.setupOrbitControls(this.camera, this.mount);
		this.clock = Builder.setupClock();
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
		this.renderer = Builder.createRenderer(this.width, this.height);
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

		let unrealBloomPass = new UnrealBloomPass(
			new THREE.Vector2(window.innerWidth, window.innerHeight),
			1.5,
			0.4,
			0.85
		);

		const params = {
			exposure: 0.1,
			bloomStrength: 0.5,
			bloomThreshold: 0,
			bloomRadius: 0
		};

		unrealBloomPass.threshold = params.bloomThreshold;
		unrealBloomPass.strength = params.bloomStrength;
		unrealBloomPass.radius = params.bloomRadius;
		this.renderer.toneMappingExposure = params.exposure;

		const bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
		bloomPass.threshold = params.bloomThreshold;
		bloomPass.strength = params.bloomStrength;
		bloomPass.radius = params.bloomRadius;
		this.composer.addPass(bloomPass);

		// let pixelPass = new ShaderPass( PixelShader );
		//  pixelPass.uniforms[ 'resolution' ].value = new THREE.Vector2( window.innerWidth, window.innerHeight );
		//  pixelPass.uniforms[ 'resolution' ].value.multiplyScalar( window.devicePixelRatio );
		//  pixelPass.uniforms[ 'pixelSize' ].value = 4;
		// this.composer.addPass(pixelPass);

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
	setMouse = (clientX, clientY) => {
		this.mouse.x = clientX / this.mount.clientWidth * 2 - 1;
		this.mouse.y = -(clientY / this.mount.clientHeight) * 2 + 1;
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

	addSceneLights = () => {
		const lights = [];
		lights[0] = new THREE.RectAreaLight(0xffffff, 200, 1000, 1000);


		lights[0].position.set(0, 0, 0);

		const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 0.4 );
		this.scene.add( light );
		// this.scene.add(lights[0]);
	};

	addPointLight = (position, colour, intensity = 0.3) => {
		const light = new THREE.PointLight(colour, intensity, 0);
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

			const box = new THREE.Box3().setFromObject(model);

			let size = new THREE.Vector3();
			box.getSize(size);

			// BoidHelper.addObstacle(this.obstacles, this.scene, size.x, size.y, size.z, 0x555555 ,model.position.x, model.position.y, model.position.z)
			this.clickableObjects.push(model);


			this.scene.add(model);

			// Setup for point lights
			let val = new THREE.Vector3(0,-1 ,0)
			this.addPointLight(position.sub(val), new THREE.Color(project.isOn ? 'pink' : 'white'), 0.1);
			this.addPointLight(position.add(val), new THREE.Color(project.isOn ? 'green' : 'white'), 0.05);

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
		const speed = 1.5;

		const position = new THREE.Vector3(x * speed,y * speed,z * speed);

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
		Builder.setupGridHelper(this.scene);
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
		this.manager = Builder.setupLoadingManager(this.loadStart, this.loadProgressing, this.loadFinished, this.loadError)
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
		this.props.hasLoaded();
		this.setState({
			hasLoaded: true,
			showInstructions: true
		});
	};

	loadError = () => {
		this.setState({
			hasLoaded: false
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
		
		if(this.boidManager){
			let delta = this.clock.getDelta();
			this.boidManager.update(delta)
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
		document.addEventListener("touchstart", this.onTouchStart, false);
		window.addEventListener('resize', this.handleWindowResize, false);
		window.addEventListener('mousemove', this.onMoveMouse, false);
	};

	/**
	 * EventListeners
	 *
	 * @memberof PortfolioEnvironment
	 */
	removeEventListeners = () => {
		document.removeEventListener("dblclick", this.onDocumentDoubleClick);
		document.removeEventListener("touchstart", this.onTouchStart);
		window.removeEventListener('resize', this.handleWindowResize);
		window.removeEventListener('mousemove', this.onMoveMouse);
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

	onMoveMouse = () => {
		this.hideInstructions()
	}

	hideInstructions = () => {
		if(this.state.showInstructions){
			setTimeout(() => {
				this.setState({
					showInstructions: false
				})
			}, 5000)

		}
	}



	/**
	 * This is calleed when the dblclick event is triggered
	 *
	 * @memberof PortfolioEnvironment
	 */
	onDocumentDoubleClick = (event) => {
		this.handleSelectingObject(event.clientX, event.clientY);

	};

	handleSelectingObject = (clientX, clientY) => {
		if (!this.state.pause) {
			
			this.setMouse(clientX, clientY);

			// Update the ray with a new origin and direction.
			this.raycaster.setFromCamera(this.mouse, this.camera);

			//Checks all intersection between the ray and the objects with or without the descendants.
			// Intersections are returned sorted by distance, closest first.
			let intersects = this.raycaster.intersectObjects(this.clickableObjects);

			if (intersects.length > 0) {
				let mesh = intersects[0];

				if(this.isProjectOn(mesh.object.userData.project)) {
				// Set the overlay and project
				this.setState({
					showOverlay: true,
					overlayItem: mesh.object.userData.project
				});

				// SET PROJECT TO TRUE IN
				this.updateItemList(mesh.object.userData.project);
				this.updateLightForAllModels()
				}

			}
		}
	}

	isProjectOn = (project) => {
		let proj = this.props.item_list.find((item) => {
			return item.title === project.title;
		});

		if(!proj) {
			return false
		}

		return proj.isOn;
	}

	updateItemList = (item) => {
		// if(item.isOn) {
			let itemList = this.props.item_list;
			let updatedItemIndex = itemList.findIndex(itemObj =>  item.title === itemObj.title)
			itemList[updatedItemIndex].hasWatched = true;
			itemList[updatedItemIndex].isOn = false;
	
			let nextItemIndex = updatedItemIndex + 1;
	
			if(nextItemIndex >= itemList.length) {
				nextItemIndex = 0;
			}
	
			itemList[nextItemIndex].isOn = true;
	
			this.props.setItemList(itemList)
		// }
	}

	updateLightForAllModels = () => {
		this.clickableObjects.forEach((obj) => {
			let item = this.props.item_list.find((i) => obj.userData.project.title === i.title)

			if(item.isOn){

				obj.children[0].material.color = new THREE.Color(Colours.neon_green);
			} else {
				obj.children[0].material.color = new THREE.Color("white");

			}
		})
	}

	onTouchStart = (event) => {
		this.handleSelectingObject(event.targetTouches[0].clientX, event.targetTouches[0].clientY);
	}

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
				{this.state.showOverlay ? <Overlay item={this.state.overlayItem} show={this.state.showOverlay} hide={this.hideOverlay} /> : null}
				<Instruction show={this.state.showInstructions}/>
				<EnvironmentWrapper ref={(ref) => (this.mount = ref)} />
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => {
	return {
		item_list: state.item_list
	};
  };
  
  const mapDispatchToProps = dispatch => {
	return {
		setItemList: itemList => dispatch(setItemList(itemList)),
		hasLoaded: () => dispatch(hasLoaded())
	};
  };


  export default connect(
	mapStateToProps,
	mapDispatchToProps
  )(PortfolioEnvironment);
