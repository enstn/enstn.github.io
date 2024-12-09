/*
This is a modified code version originally provided by Francesco Michelini:

    MIT License

    Copyright (c) 2020 Francesco Michelini

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

Modifications were mainly made in mouse ui logic: paneListener, RayCasting for position detection, gameEventStarter
and new animations for mobile integration: touchHandler, radialRippleAnimation
*/

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import{ showBox } from './game/game.js';

const size = 1.1;

const vertexShader = `
uniform vec3 uPointer;
uniform vec3 uColor;
uniform float uRotation;
uniform float uSize;
uniform float uHover;
uniform vec3 uHoverColor;
uniform float uTouchActive;
uniform vec3 uTouchOrigin;
uniform float uTouchTime;
uniform float uRippleRadius;
uniform float uRippleSpeed;

varying vec3 vColor;

#define PI 3.14159265359

mat2 rotate(float angle) {
float s = sin(angle);
float c = cos(angle);
return mat2(c, -s, s, c);
}

void main() {
vec4 mvPosition = vec4(position, 1.0);
mvPosition = instanceMatrix * mvPosition;

float d = distance(uPointer, mvPosition.xyz);
float c = smoothstep(0.45, 0.1, d);

// Calculate ripple effect
float touchDist = distance(uTouchOrigin, mvPosition.xyz);
float rippleWave = 0.0;

if (uTouchActive > 0.0) {
// Create a moving wave band
float wavePosition = uRippleRadius * uTouchTime;
float waveBandwidth = 0.1; // Width of the ripple band

// Calculate distance from the wave front
float distFromWave = abs(touchDist - wavePosition);

// Create a band effect that moves outward
rippleWave = smoothstep(waveBandwidth, 0.0, distFromWave);

// Fade the effect based on how far it's traveled
rippleWave *= (1.0 - uTouchTime);
}

// Apply ripple displacement
vec3 pos = position;
float rippleScale = rippleWave * 30.0; // Increase for more dramatic effect
pos *= uSize + rippleScale;

// Rotate based on ripple
if (rippleWave > 0.0) {
float rippleRotation = rippleWave * PI * 2.0;
pos.xz *= rotate(rippleRotation);
pos.xy *= rotate(rippleRotation * 0.7);
}

// Apply normal hover effects
pos *= 1.0 + c * uHover * 12.0;
pos.xz *= rotate(PI * c * uRotation);
pos.xy *= rotate(PI * c * uRotation * 0.71);

mvPosition = instanceMatrix * vec4(pos, 1.0);
gl_Position = projectionMatrix * modelViewMatrix * mvPosition;

// Color blending
vec3 rippleColor = vec3(1.0, 0.85, 0.0); // Golden yellow
vec3 finalColor = mix(uColor, uHoverColor, c * uHover);
finalColor = mix(finalColor, rippleColor, rippleWave);
vColor = finalColor;
}`;

const fragmentShader = `
varying vec3 vColor;

void main() {
gl_FragColor = vec4(vColor, 1.0);
}
`;

export class BrainVisualization {
  constructor() {
    this.container = document.getElementById('brain-container');
    this.hover = false;
    this.point = new THREE.Vector3();
    this.mouse = new THREE.Vector2();

    this.baseColor = new THREE.Color(0xFFFFFF);
    this.hoverColors = [new THREE.Color(0xFFD700)]; 

    this.isInfoPanelActive = false;
    this.setupInfoPanelListener();

    this.uniforms = {
      uHover: { value: 0 },
      uPointer: { value: new THREE.Vector3() },
      uColor: { value: this.baseColor },
      uHoverColor: { value: new THREE.Color() },
      uRotation: { value: 0 },
      uSize: { value: 1.4 },

      // mobile ripple animation
      uTouchActive: { value: 0 },
      uTouchOrigin: { value: new THREE.Vector3() },
      uTouchTime: { value: 0 },
      uRippleSpeed: { value: 1.5 },
      uRippleRadius: { value: 0}
    };

    this._setupTouchHandling();
    this.init();
  }

  init() {
    this._createScene();
    this._createCamera();
    this._createRenderer();
    this._createRaycaster();
    this._createLoader();
    this._checkMobile();

    this._loadModel()
      .then(() => {
        this._addListeners();
        const loadingElement = document.getElementById('loading-screen');
        if (loadingElement) {
          loadingElement.style.display = 'none';
        }
        this.animate();
      })
      .catch(error => {
        console.error('Error loading model:', error);
      });
  }

  _createScene() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000000);
    this.container.style.cursor = 'pointer';
  }

  _createCamera() {
    this.camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 100);
    this.camera.position.set(0, 0, size);
  }

  _createRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      antialias: window.devicePixelRatio === 1
    });
    this.container.appendChild(this.renderer.domElement);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(1.5, window.devicePixelRatio));
  }

  _createRaycaster() {
    this.raycaster = new THREE.Raycaster();
    this.intersects = [];
  }

  _createLoader() {
    this.gltfLoader = new GLTFLoader();
  }

  _loadModel() {
    return new Promise((resolve, reject) => {
      this.gltfLoader.load(
        './models/brain.glb',
        (gltf) => {
          this.brain = gltf.scene.children[0];
          const geometry = new THREE.IcosahedronGeometry(0.0015, 0);

          const material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            wireframe: true,
            uniforms: this.uniforms
          });

          const positions = this.brain.geometry.attributes.position.array;
          const instanceCount = positions.length / 3;

          this.instancedMesh = new THREE.InstancedMesh(
            geometry,
            material,
            instanceCount
          );

          const dummy = new THREE.Object3D();

          for (let i = 0; i < positions.length; i += 3) {
            dummy.position.set(
              positions[i],
              positions[i + 1],
              positions[i + 2]
            );

            dummy.updateMatrix();
            this.instancedMesh.setMatrixAt(i / 3, dummy.matrix);
          }

          this.instancedMesh.instanceMatrix.needsUpdate = true;

          for (let i = 0; i < instanceCount; i++) {
            const colorIndex = Math.floor(Math.random() * this.hoverColors.length);
            material.uniforms.uHoverColor.value.copy(this.hoverColors[colorIndex]);
            material.uniforms.uRotation.value = THREE.MathUtils.randFloat(-1, 1);
            // material.uniforms.uSize.value = THREE.MathUtils.randFloat(0.3, 3);
          }

          this.scene.add(this.instancedMesh);
          resolve();
        },
        undefined,
        reject
      );
    });
  }

  _addListeners() {
    window.addEventListener('resize', () => this._onResize());
    window.addEventListener('mousemove', (e) => this._onMousemove(e));

    // check mouseclick with raycaster 
    this.container.addEventListener('click', (e) => {
      this.raycaster.setFromCamera(this.mouse, this.camera);
      this.intersects = this.raycaster.intersectObject(this.brain);

      if (this.intersects.length > 0) {
        // run game script if mouse click on brain is detected
        console.log('mouse click detected');
        showBox();
      }
    });
  }

  setupInfoPanelListener() {
    const infoPanel = document.getElementById('info-panel');
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          this.isInfoPanelActive = infoPanel.classList.contains('active');
        }
      });
    });

    observer.observe(infoPanel, { attributes: true });

    // Add mouse position tracking for info panel
    infoPanel.addEventListener('mouseover', () => {
      this.isMouseOverInfoPanel = true;
    });

    infoPanel.addEventListener('mouseout', () => {
      this.isMouseOverInfoPanel = false;
    });
  }

  _onMousemove(e) {
    // Only process hover effects if mouse is not on info panel
    if (this.isInfoPanelActive && this.isMouseOverInfoPanel) {
      if (this.hover) {
        this.hover = false;
        this._animateHoverUniform(0);
      }
      return;
    }

    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = -(e.clientY / window.innerHeight) * 2 + 1;
    this.mouse.set(x, y);

    // Camera movement
    gsap.to(this.camera.position, {
      x: x * 0.15,
      y: y * 0.1,
      duration: 0.5
    });

    this.raycaster.setFromCamera(this.mouse, this.camera);
    this.intersects = this.raycaster.intersectObject(this.brain);

    if (this.intersects.length === 0) {
      if (this.hover) {
        this.hover = false;
        this._animateHoverUniform(0);
      }
    } else {
      if (!this.hover) {
        this.hover = true;
        this._animateHoverUniform(1);
      }

      gsap.to(this.point, {
        x: this.intersects[0]?.point.x || 0,
        y: this.intersects[0]?.point.y || 0,
        z: this.intersects[0]?.point.z || 0,
        overwrite: true,
        duration: 0.3,
        onUpdate: () => {
          this.instancedMesh.material.uniforms.uPointer.value.copy(this.point);
        }
      });
    }
  }

  _setupTouchHandling() {
    let touchAnimation;
    const RIPPLE_DURATION = 2000; // Faster animation
    const MAX_RIPPLE_RADIUS = 2.0; // Adjusted radius for better wave visibility

    const startRipple = (touchPoint) => {
      this.raycaster.setFromCamera(
        new THREE.Vector2(
          (touchPoint.clientX / window.innerWidth) * 2 - 1,
          -(touchPoint.clientY / window.innerHeight) * 2 + 1
        ),
        this.camera
      );

      const intersects = this.raycaster.intersectObject(this.brain);
      if (intersects.length > 0) {
        if (touchAnimation) {
          cancelAnimationFrame(touchAnimation);
        }

        const touchPosition = intersects[0].point;
        this.uniforms.uTouchOrigin.value.copy(touchPosition);
        this.uniforms.uTouchActive.value = 1;
        this.uniforms.uRippleRadius.value = 0;

        const startTime = Date.now();

        const animateRipple = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / RIPPLE_DURATION, 1);

          // Update uniforms for the wave motion
          this.uniforms.uTouchTime.value = progress;
          this.uniforms.uRippleRadius.value = progress * MAX_RIPPLE_RADIUS;

          if (progress < 1) {
            touchAnimation = requestAnimationFrame(animateRipple);
          } else {
            // Reset everything when animation completes
            this.uniforms.uTouchActive.value = 0;
            this.uniforms.uRippleRadius.value = 0;
            this.uniforms.uTouchTime.value = 0;
          }
        };

        touchAnimation = requestAnimationFrame(animateRipple);
      }
    };

    this.container.addEventListener('touchstart', (e) => {
      e.preventDefault();
      startRipple(e.touches[0]);
    });
  }
  _animateHoverUniform(value) {
    gsap.to(this.instancedMesh.material.uniforms.uHover, {
      value: value,
      duration: 0.25
    });
  }

  _checkMobile() {
    this.isMobile = window.innerWidth < 767;
  }

  _onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this._checkMobile();
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    this.camera.lookAt(0, 0, 0);
    this.camera.position.z = this.isMobile ? 2.3 : size;
    this.renderer.render(this.scene, this.camera);
  }
}
