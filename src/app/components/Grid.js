import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { createNoise2D } from 'simplex-noise';
import './Grid.css';

const Grid = () => {
  const mountRef = useRef(null);
  let mouseAlphaMapMesh;
  let clickMesh;
  let lastInteractionTime = 0;
  const orbitingAlphaMapMeshes = []; // Array to hold only orbiting alphaMapMeshes
  const alphaMapMeshes = []; // Array to hold all alphaMapMeshes
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
    let alphaMapCanvas, alphaMapContext, alphaMapImageData;
    let circleCanvas, circleContext, circleImageData;

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

    const onClick = (event) => {
      if (!clickMesh) return; // Guard clause if mesh isn't defined yet
      const rect = renderer.domElement.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      const vector = new THREE.Vector3(x, y, 0);
      vector.unproject(camera);
      const dir = vector.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      const pos = camera.position.clone().add(dir.multiplyScalar(distance));
      clickMesh.position.set(pos.x, pos.y, 0);
      clickMesh.userData = {
        scale: 1,
        opacity: 1 // Initialize opacity correctly
      };
      clickMesh.visible = true;

      // Update the bounding box
      clickMesh.geometry.computeBoundingBox();
      clickMesh.boundingBox = clickMesh.geometry.boundingBox.clone().applyMatrix4(clickMesh.matrixWorld);
    };

    // Load the alpha map texture first
    textureLoader.load('/alphamap.png', (radialGradient) => {
      // Create an offscreen canvas to read pixel data
      alphaMapCanvas = document.createElement('canvas');
      alphaMapCanvas.width = radialGradient.image.width;
      alphaMapCanvas.height = radialGradient.image.height;
      alphaMapContext = alphaMapCanvas.getContext('2d');
      alphaMapContext.drawImage(radialGradient.image, 0, 0);
      alphaMapImageData = alphaMapContext.getImageData(0, 0, alphaMapCanvas.width, alphaMapCanvas.height);

      const geometry = new THREE.PlaneGeometry(100, 100);
      const radialGradientMaterial = new THREE.MeshBasicMaterial({
        transparent: true,
        map: radialGradient,
        opacity: 1
      });

      // Create instances of alphaMapMesh that orbit around the center
      for (let i = 0; i < 10; i++) {
        const orbitingMesh = new THREE.Mesh(geometry, radialGradientMaterial.clone());
        orbitingMesh.geometry.computeBoundingBox();
        orbitingMesh.layers.set(1);
        orbitingMesh.boundingBox = orbitingMesh.geometry.boundingBox.clone().applyMatrix4(orbitingMesh.matrixWorld);
        orbitingMesh.orbitRadius = 300;
        orbitingMesh.orbitSpeed = 0.01 * (i + 1);
        orbitingMesh.orbitAngle = Math.random() * Math.PI * 2;
        orbitingAlphaMapMeshes.push(orbitingMesh); // Add to array
        alphaMapMeshes.push(orbitingMesh); // Add to array
        scene.add(orbitingMesh);
      }

      // Create the mouse follower mesh
      mouseAlphaMapMesh = new THREE.Mesh(geometry, radialGradientMaterial.clone());
      mouseAlphaMapMesh.layers.set(1);
      mouseAlphaMapMesh.geometry.computeBoundingBox();
      mouseAlphaMapMesh.boundingBox = mouseAlphaMapMesh.geometry.boundingBox.clone().applyMatrix4(mouseAlphaMapMesh.matrixWorld);
      scene.add(mouseAlphaMapMesh);
      alphaMapMeshes.push(mouseAlphaMapMesh); // Add to array
    });

    // Load the blurred circle texture
    textureLoader.load('/BlurredCircle.png', (circleTexture) => {
      const geometry = new THREE.PlaneGeometry(100, 100);
      const circleMaterial = new THREE.MeshBasicMaterial({
        transparent: true,
        map: circleTexture,
        opacity: 1
      });

      circleCanvas = document.createElement('canvas');
      circleCanvas.width = circleTexture.image.width;
      circleCanvas.height = circleTexture.image.height;
      circleContext = circleCanvas.getContext('2d');
      circleContext.drawImage(circleTexture.image, 0, 0);
      circleImageData = circleContext.getImageData(0, 0, circleCanvas.width, circleCanvas.height);

      clickMesh = new THREE.Mesh(geometry, circleMaterial);
      clickMesh.visible = false; // Start invisible
      clickMesh.layers.set(1);
      clickMesh.geometry.computeBoundingBox();
      clickMesh.boundingBox = clickMesh.geometry.boundingBox.clone().applyMatrix4(clickMesh.matrixWorld);
      alphaMapMeshes.push(clickMesh); // Add to array
      scene.add(clickMesh);
    });

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('click', onClick);

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

    // Square Grid generation
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
        square.geometry.computeBoundingBox();
        square.boundingBox = new THREE.Box3().setFromObject(square);
        scene.add(square);
        squares.push(square);
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
          let intersectsBoundingBox = alphaMapMeshes.some(mesh => {
            return mesh?.boundingBox?.intersectsBox(square.boundingBox);
          });

          // Ensure clickMesh is considered even if squares are not visible
          if (clickMesh?.boundingBox?.intersectsBox(square.boundingBox)) {
            intersectsBoundingBox = true;
          }

          if (intersectsBoundingBox) {
            const rayOrigin = new THREE.Vector3(square.position.x, square.position.y, 100);
            const rayDirection = new THREE.Vector3(0, 0, -1);
            raycaster.set(rayOrigin, rayDirection.normalize());
            const validMeshes = alphaMapMeshes.filter(mesh => mesh && mesh.boundingBox);
            const intersects = raycaster.intersectObjects([...validMeshes, clickMesh], true);

            if (intersects.length > 0) {
              let totalAlpha = 0;
              intersects.forEach(intersect => {
                const uv = intersect.uv;
                const x = Math.floor(uv.x * (intersect.object === clickMesh ? circleCanvas.width : alphaMapCanvas.width));
                const y = Math.floor(uv.y * (intersect.object === clickMesh ? circleCanvas.height : alphaMapCanvas.height));
                const index = (y * (intersect.object === clickMesh ? circleCanvas.width : alphaMapCanvas.width) + x) * 4;
                const alphaValue = (intersect.object === clickMesh ? -circleImageData.data[index + 3]: intersect.object === mouseAlphaMapMesh ? - alphaMapImageData.data[index + 3]: alphaMapImageData.data[index + 3]);
                const meshOpacity = intersect.object.material.opacity;
                totalAlpha += (alphaValue / 255) * meshOpacity;
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

      // Update clickMesh
      if (clickMesh && clickMesh.visible) {
        clickMesh.userData.scale += 0.15;  // Scale up over time
        clickMesh.userData.opacity -= 0.05;  // Decrease opacity at a slower rate
        if (clickMesh.userData.opacity <= 0) {
          clickMesh.visible = false;
        } else {
          clickMesh.scale.set(clickMesh.userData.scale, clickMesh.userData.scale, clickMesh.userData.scale);
          clickMesh.material.opacity = clickMesh.userData.opacity;
          clickMesh.material.needsUpdate = true;

          // Update the bounding box
          clickMesh.geometry.computeBoundingBox();
          clickMesh.boundingBox = clickMesh.geometry.boundingBox.clone().applyMatrix4(clickMesh.matrixWorld);
        }
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener('resize', onWindowResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('click', onClick);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="grid-container" />;
};

export default Grid;
