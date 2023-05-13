import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export default class ThreeModule {

	constructor(element) {
		this.element = element;
		this.id = element.dataset.id;
		this.file = element.dataset.file;
		this.autoRotate = element.dataset.autoRotate == 1 ? true : false;
		this.width = parseInt(element.dataset.width);
		this.height = parseInt(element.dataset.height);

		this.renderer = new THREE.WebGLRenderer({ alpha: true });
		this.camera = new THREE.PerspectiveCamera( 60, this.width / this.height, 0.1, 1000 );
		this.controls = new OrbitControls( this.camera , this.renderer.domElement );

        this.viewport = document.querySelector("#three-viewport-" + element.dataset.id);
        this.buttonInspect = document.querySelector("#three-button-inspect-" + element.dataset.id);
        this.buttonClose = document.querySelector("#three-button-close-" + element.dataset.id);

		const object = this;
		this.buttonInspect.addEventListener("click", function () {object.inspect()});
		this.buttonClose.addEventListener("click", function () {object.close()});

		this.ratio = this.width / this.height;

      	this.init();

		const threeModule = this;
		threeModule.resize(threeModule);
		function onResize() {
			threeModule.resize(threeModule);
		}
        window.addEventListener('resize', onResize);

    }

	resize(threeModule) {
		//threeModule.camera.aspect = threeModule.element.offsetWidth / threeModule.element.offsetWidth * this.ratio;
		//threeModule.camera.updateProjectionMatrix();
		threeModule.renderer.setSize(threeModule.element.offsetWidth, threeModule.element.offsetWidth * this.ratio);
	}

    inspect() {
		this.element.classList.add("inspect");

        const scrollY = -window.scrollY;
        console.log(scrollY);
        document.body.style.position = 'fixed';
        document.body.style.top = scrollY + 'px';

		this.camera.aspect = this.element.offsetWidth / this.element.offsetHeight;
    	this.camera.updateProjectionMatrix();
		this.renderer.setSize(this.element.offsetWidth, this.element.offsetHeight);

		this.controls.target.set( 0, 0, 0 );
		this.controls.autoRotate = false;
		this.controls.enablePan = true;
		this.controls.enableZoom = true;
		this.controls.enableRotate = true;
		this.controls.minPolarAngle = Math.PI * 0.1;
		this.controls.maxPolarAngle = Math.PI * 0.4;
		this.controls.minAzimuthAngle = -Infinity;
		this.controls.maxAzimuthAngle = Infinity;
		this.controls.update();
	}

	close() {
		this.element.classList.remove("inspect");

        const scrollY = document.body.style.top;
        console.log(scrollY);
        document.body.style.position = '';
        document.body.style.top = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);

		this.camera.aspect = this.width / this.height;
    	this.camera.updateProjectionMatrix();
		this.renderer.setSize(this.width, this.height);

		this.controls.reset();

		this.camera.position.z = 15;
		this.camera.rotation.x = 0;

		this.controls.target.set( 0, 0, 0 );
		this.controls.autoRotate = this.autoRotate;
		this.controls.autoRotateSpeed = 2;
		this.controls.enablePan = false;
		this.controls.enableZoom = false;
		this.controls.enableRotate = true;
		this.controls.minPolarAngle = Math.PI * 0.3333;
		this.controls.maxPolarAngle = Math.PI * 0.3333;
		this.controls.minAzimuthAngle = -Infinity;
		this.controls.maxAzimuthAngle = Infinity;
		this.controls.update();

		this.resize(this);
	}

    init() {
		const scene = new THREE.Scene();
		//scene.background = new THREE.Color( 0x111111);

		this.renderer.setClearColor( 0x000000, 0 )
		this.renderer.setSize( this.width, this.height );
		this.renderer.shadowMap.enabled = true;
		this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

		this.viewport.appendChild( this.renderer.domElement );

		this.camera.position.z = 15;
		this.camera.rotation.x = 0;

		this.controls.target.set( 0, 0, 0 );
		this.controls.autoRotate = this.autoRotate;
		this.controls.autoRotateSpeed = 2;
		this.controls.enablePan = false;
		this.controls.enableZoom = false;
		this.controls.enableRotate = true;
		this.controls.minPolarAngle = Math.PI * 0.3333;
		this.controls.maxPolarAngle = Math.PI * 0.3333;
		this.controls.minAzimuthAngle = -Infinity;
		this.controls.maxAzimuthAngle = Infinity;
		this.controls.update();

		const ambientLight = new THREE.AmbientLight( 0x303030 );
		scene.add( ambientLight );

		const dirLight1 = new THREE.DirectionalLight( 0xd7f2fc , 2 );
		dirLight1.position.set( 0, 200, 100 );
		dirLight1.castShadow = true;
		dirLight1.shadow.camera.top = 8;
		dirLight1.shadow.camera.bottom = - 8;
		dirLight1.shadow.camera.left = - 12;
		dirLight1.shadow.camera.right = 12;
	    dirLight1.shadowCameraVisible = true;
		dirLight1.shadow.mapSize.set( 1028, 1028);
		dirLight1.shadow.bias = -0.0001;
		dirLight1.shadow.normalBias = 0.1;
		dirLight1.shadow.radius = 4;
		dirLight1.shadow.blurSamples = 6;
		scene.add( dirLight1 );

		const dirLight2 = new THREE.DirectionalLight( 0xcff3fa, 0.5 );
		dirLight2.position.set( 0, 200, -100 );
		dirLight2.castShadow = false;
		dirLight2.shadow.camera.top = 8;
		dirLight2.shadow.camera.bottom = - 8;
		dirLight2.shadow.camera.left = 12;
		dirLight2.shadow.camera.right = - 12;
		scene.add( dirLight2 );

		const clock = new THREE.Clock();
		let mixer;

		const renderer = this.renderer;
		const camera = this.camera;
		const controls = this.controls;

		const path = window.origin + "/" + this.file;
		const loader = new GLTFLoader();
		loader.load( path, function ( gltf ) {
			const model = gltf.scene;
			model.position.set( 0, 0, 0 );
			model.traverse( function ( object ) {
			    if ( object.isMesh ) {
			        object.castShadow = true;
			        object.receiveShadow = true;
			    }
			});
			if (gltf.animations.length > 0) {
				mixer = new THREE.AnimationMixer( model );
				mixer.timeScale = 1.2;
				mixer.clipAction( gltf.animations[ 0 ] ).play();
				}
			scene.add( model );
			animate();
		}, undefined, function ( error ) {
			console.error( error );
		});

		function animate() {
			requestAnimationFrame( animate );
			renderer.render( scene, camera );
			if (mixer) {
				mixer.update( clock.getDelta() );
			}
			controls.update();
		}
	}
}
