import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { createNoise2D } from 'simplex-noise';
import './Grid.css';

const Grid = () => {
  const mountRef = useRef(null);
  let mouseAlphaMapMesh;
  let lastInteractionTime = 0;
  const orbitingAlphaMapMeshes = []; // Array to hold only orbiting alphaMapMeshes
  const simplex = createNoise2D(); // Create a SimplexNoise instance

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-width / 2, width / 2, height / 2, -height / 2, 1, 1000);
    camera.position.set(0, 0, 500);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0); // Clear color and alpha for transparency
    mountRef.current.appendChild(renderer.domElement);

    const textureLoader = new THREE.TextureLoader();
    let textureCanvas, textureContext, imageData;

    // Define onMouseMove here so it's available in the cleanup function
    const onMouseMove = (event) => {
      lastInteractionTime = Date.now();
      if (!mouseAlphaMapMesh) return; // Guard clause if mesh isn't defined yet
      const rect = renderer.domElement.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      const vector = new THREE.Vector3(x, y, 0);
      vector.unproject(camera);
      const dir = vector.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      const pos = camera.position.clone().add(dir.multiplyScalar(distance));
      mouseAlphaMapMesh.position.set(pos.x, pos.y, 0);

      // Update the bounding box
      mouseAlphaMapMesh.geometry.computeBoundingBox();
      mouseAlphaMapMesh.boundingBox = mouseAlphaMapMesh.geometry.boundingBox.clone().applyMatrix4(mouseAlphaMapMesh.matrixWorld);
    };

    textureLoader.load('/alphamap.png', (texture) => {
      // Create an offscreen canvas to read pixel data
      textureCanvas = document.createElement('canvas');
      textureCanvas.width = texture.image.width;
      textureCanvas.height = texture.image.height;
      textureContext = textureCanvas.getContext('2d');
      textureContext.drawImage(texture.image, 0, 0);
      imageData = textureContext.getImageData(0, 0, textureCanvas.width, textureCanvas.height);

      const geometry = new THREE.PlaneGeometry(100, 100);
      const material = new THREE.MeshBasicMaterial({
        transparent: true,
        map: texture,
        opacity: 1
      });

      // Create instances of alphaMapMesh that orbit around the center
      for (let i = 0; i < 10; i++) {
        const orbitingMesh = new THREE.Mesh(geometry, material.clone());
        orbitingMesh.geometry.computeBoundingBox();
        orbitingMesh.layers.set(1);
        orbitingMesh.boundingBox = orbitingMesh.geometry.boundingBox.clone().applyMatrix4(orbitingMesh.matrixWorld);
        orbitingMesh.orbitRadius = 300;
        orbitingMesh.orbitSpeed = 0.01 * (i + 1);
        orbitingMesh.orbitAngle = Math.random() * Math.PI * 2;
        orbitingAlphaMapMeshes.push(orbitingMesh); // Add to array
        scene.add(orbitingMesh);
      }

      // Create the mouse follower mesh
      mouseAlphaMapMesh = new THREE.Mesh(geometry, material.clone());
      mouseAlphaMapMesh.layers.set(1);
      scene.add(mouseAlphaMapMesh);
      mouseAlphaMapMesh.geometry.computeBoundingBox();
      mouseAlphaMapMesh.boundingBox = mouseAlphaMapMesh.geometry.boundingBox.clone().applyMatrix4(mouseAlphaMapMesh.matrixWorld);
    });

    window.addEventListener('mousemove', onMouseMove);

    const raycaster = new THREE.Raycaster();
    raycaster.layers.set(1); // raycaster interacts only with layer 1 objects

    const gridWidth = 150;
    const gridHeight = 150;
    const baseSquareSize = 10;
    const gap = 2;
    const squares = [];
    const startX = -(gridWidth * (baseSquareSize + gap)) / 2;
    const startY = -(gridHeight * (baseSquareSize + gap)) / 2;

    const onWindowResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      renderer.setSize(newWidth, newHeight);
      camera.left = -newWidth / 2;
      camera.right = newWidth / 2;
      camera.top = newHeight / 2;
      camera.bottom = -newHeight / 2;
      camera.updateProjectionMatrix();
    };

    for (let i = 0; i < gridWidth; i++) {
      for (let j = 0; j < gridHeight; j++) {
        const geometry = new THREE.PlaneGeometry(baseSquareSize, baseSquareSize);
        const material = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 }); // Start fully transparent
        const square = new THREE.Mesh(geometry, material);
        square.position.set(startX + i * (baseSquareSize + gap), startY + j * (baseSquareSize + gap), 0);
        square.userData = {
          targetOpacity: 0,
          targetScale: 1,
          noiseOpacity: 0,
          noiseScale: 1,
          currentOpacity: 0,
          currentScale: 1
        };
        scene.add(square);
        squares.push(square);

        // Compute and store the bounding box
        square.geometry.computeBoundingBox();
        square.boundingBox = new THREE.Box3().setFromObject(square);
      }
    }
    window.addEventListener('resize', onWindowResize);

    const addNoise = (value, amount) => {
      return value * (1 + (Math.random() - 0.5) * amount);
    };

    const animate = () => {
      requestAnimationFrame(animate);

      const now = Date.now();
      const raycastInterval = 100;
      let lastRaycast = 0;

      if (now - lastRaycast > raycastInterval) {
        squares.forEach(square => {
          const intersectsBoundingBox = orbitingAlphaMapMeshes.some(mesh => {
            return mesh?.boundingBox?.intersectsBox(square.boundingBox);
          });

          if (intersectsBoundingBox) {
            const rayOrigin = new THREE.Vector3(square.position.x, square.position.y, 100);
            const rayDirection = new THREE.Vector3(0, 0, -1);
            raycaster.set(rayOrigin, rayDirection.normalize());
            const intersects = raycaster.intersectObjects(orbitingAlphaMapMeshes, true);

            if (intersects.length > 0) {
              let totalAlpha = 0;
              intersects.forEach(intersect => {
                const uv = intersect.uv;
                const x = Math.floor(uv.x * textureCanvas.width);
                const y = Math.floor(uv.y * textureCanvas.height);
                const index = (y * textureCanvas.width + x) * 4;
                totalAlpha += imageData.data[index + 3] / 255;
              });

              totalAlpha = Math.min(totalAlpha, 1);
              square.userData.targetOpacity = totalAlpha;
              square.userData.targetScale = totalAlpha + 0.5;
              if (totalAlpha > 0) {
                square.userData.noiseOpacity = addNoise(totalAlpha, 0.1);
                square.userData.noiseScale = addNoise(totalAlpha + 0.5, 0.1);
              } else {
                square.userData.noiseOpacity = 0;
                square.userData.noiseScale = 1;
              }
            } else {
              square.userData.targetOpacity = 0;
              square.userData.targetScale = 1;
              square.userData.noiseOpacity = 1;
              square.userData.noiseScale = 1;
            }
          } else {
            square.userData.targetOpacity = 0;
            square.userData.targetScale = 0;
            square.userData.noiseOpacity = 0;
            square.userData.noiseScale = 0;
          }
        });

        lastRaycast = now;
      }

      squares.forEach(square => {
        if (now - lastInteractionTime > raycastInterval) {
          square.userData.targetOpacity *= 0.95;
          square.userData.targetScale = 1 + (square.userData.targetScale - 1) * 0.95;
        }

        if (square.userData.currentOpacity !== square.userData.targetOpacity) {
          const opacityDelta = (square.userData.targetOpacity - square.userData.currentOpacity) * 0.1;
          square.userData.currentOpacity += opacityDelta;
        }

        if (square.userData.currentScale !== square.userData.targetScale) {
          const scaleDelta = (square.userData.targetScale - square.userData.currentScale) * 0.1;
          square.userData.currentScale += scaleDelta;
        }

        // Apply noisy values for actual rendering
        if (square.userData.currentOpacity > 0) {
          square.material.opacity = addNoise(square.userData.currentOpacity, 0.1);
          const noisyScale = addNoise(square.userData.currentScale, 0.1);
          square.scale.set(noisyScale, noisyScale, noisyScale);
          square.visible = true;  // Make square visible
        } else {
          square.material.opacity = 0;
          square.scale.set(1, 1, 1);
          square.visible = false;  // Make square invisible
        }
        square.material.needsUpdate = true;
      });

      // Update positions for orbiting meshes with smooth noise
      orbitingAlphaMapMeshes.forEach((mesh, index) => {
        if (mesh.orbitRadius !== undefined) {
          mesh.orbitAngle += mesh.orbitSpeed;
          const noiseValue = simplex(index, now * 0.0001) * 50; // Generate smooth noise
          const smoothOrbitRadius = mesh.orbitRadius + noiseValue;
          mesh.position.set(
            smoothOrbitRadius * Math.cos(mesh.orbitAngle),
            smoothOrbitRadius * Math.sin(mesh.orbitAngle),
            0
          );
          mesh.geometry.computeBoundingBox();
          mesh.boundingBox = mesh.geometry.boundingBox.clone().applyMatrix4(mesh.matrixWorld);
        }
      });

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener('resize', onWindowResize);
      window.removeEventListener('mousemove', onMouseMove);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="grid-container" />;
};

export default Grid;
