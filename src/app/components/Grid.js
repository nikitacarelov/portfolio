import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { createNoise2D } from 'simplex-noise';
import './Grid.css';

const Grid = ({ triggerTransition }) => {
  const mountRef = useRef(null);
  const animationFrameIdRef = useRef(null); // Ref to store the animation frame ID
  let mouseAlphaMapMesh;
  let clickMesh;
  let lastInteractionTime = 0;
  const orbitingAlphaMapMeshes = [];
  const alphaMapMeshes = [];
  const squares = [];
  const simplex = createNoise2D();
  let transitionPhase = 0; // 0: Idle, 1: Orbiting circles shrinking, 2: Squares scaling up, 3: Grid disappearing
  let transitionStartTime = null;

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-width / 2, width / 2, height / 2, -height / 2, 1, 1000);
    camera.position.set(0, 0, 500);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);
    const raycaster = new THREE.Raycaster();
    raycaster.layers.set(1);

    const textureLoader = new THREE.TextureLoader();
    let alphaMapCanvas, alphaMapContext, alphaMapImageData;
    let circleCanvas, circleContext, circleImageData;

    const onMouseMove = (event) => {
      if (!mouseAlphaMapMesh) return;
      const rect = renderer.domElement.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      const vector = new THREE.Vector3(x, y, 0);
      vector.unproject(camera);
      const dir = vector.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      const pos = camera.position.clone().add(dir.multiplyScalar(distance));
      mouseAlphaMapMesh.position.set(pos.x, pos.y, 0);
      mouseAlphaMapMesh.geometry.computeBoundingBox();
      mouseAlphaMapMesh.boundingBox = mouseAlphaMapMesh.geometry.boundingBox.clone().applyMatrix4(mouseAlphaMapMesh.matrixWorld);
      mouseAlphaMapMesh.visible = true;
    };

    const onClick = (event) => {
      if (!clickMesh) return;
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
        scale: 0.5,
        opacity: 0.6
      };
      clickMesh.visible = true;
      clickMesh.geometry.computeBoundingBox();
      clickMesh.boundingBox = clickMesh.geometry.boundingBox.clone().applyMatrix4(clickMesh.matrixWorld);
    };

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

    textureLoader.load('/alphamap.png', (radialGradient) => {
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

      for (let i = 0; i < 10; i++) {
        const orbitingMesh = new THREE.Mesh(geometry, radialGradientMaterial.clone());
        orbitingMesh.geometry.computeBoundingBox();
        orbitingMesh.layers.set(1);
        orbitingMesh.boundingBox = orbitingMesh.geometry.boundingBox.clone().applyMatrix4(orbitingMesh.matrixWorld);
        orbitingMesh.orbitRadius = 300;
        orbitingMesh.orbitSpeed = 0.01 * (i + 1);
        orbitingMesh.orbitAngle = Math.random() * Math.PI * 2;
        orbitingAlphaMapMeshes.push(orbitingMesh);
        alphaMapMeshes.push(orbitingMesh);
        scene.add(orbitingMesh);
      }

      mouseAlphaMapMesh = new THREE.Mesh(geometry, radialGradientMaterial.clone());
      mouseAlphaMapMesh.layers.set(1);
      mouseAlphaMapMesh.geometry.computeBoundingBox();
      mouseAlphaMapMesh.boundingBox = mouseAlphaMapMesh.geometry.boundingBox.clone().applyMatrix4(mouseAlphaMapMesh.matrixWorld);
      scene.add(mouseAlphaMapMesh);
      alphaMapMeshes.push(mouseAlphaMapMesh);
    });

    textureLoader.load('/BlurredCircle.png', (circleTexture) => {
      const geometry = new THREE.PlaneGeometry(100, 100);
      const circleMaterial = new THREE.MeshBasicMaterial({
        transparent: true,
        map: circleTexture,
        opacity: 0.7
      });

      circleCanvas = document.createElement('canvas');
      circleCanvas.width = circleTexture.image.width;
      circleCanvas.height = circleTexture.image.height;
      circleContext = circleCanvas.getContext('2d');
      circleContext.drawImage(circleTexture.image, 0, 0);
      circleImageData = circleContext.getImageData(0, 0, circleCanvas.width, circleCanvas.height);

      clickMesh = new THREE.Mesh(geometry, circleMaterial);
      clickMesh.visible = false;
      clickMesh.layers.set(1);
      clickMesh.geometry.computeBoundingBox();
      clickMesh.boundingBox = clickMesh.geometry.boundingBox.clone().applyMatrix4(clickMesh.matrixWorld);
      alphaMapMeshes.push(clickMesh);
      scene.add(clickMesh);
    });

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('click', onClick);
    window.addEventListener('resize', onWindowResize);

    const gridWidth = 150;
    const gridHeight = 150;
    const baseSquareSize = 10;
    const gap = 2;
    const startX = -(gridWidth * (baseSquareSize + gap)) / 2;
    const startY = -(gridHeight * (baseSquareSize + gap)) / 2;

    for (let i = 0; i < gridWidth; i++) {
      for (let j = 0; j < gridHeight; j++) {
        const geometry = new THREE.PlaneGeometry(baseSquareSize, baseSquareSize);
        const material = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 });
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

    const addNoise = (value, amount) => {
      return value * (1 + (Math.random() - 0.5) * amount);
    };

    const animate = (time) => {
      animationFrameIdRef.current = requestAnimationFrame(animate);

      const now = Date.now();
      const raycastInterval = 10;
      let lastRaycast = 0;

      if (now - lastRaycast > raycastInterval) {
        squares.forEach(square => {
          square.userData.targetOpacity = 0;
          square.userData.targetScale = 1;
          let intersectsBoundingBox = alphaMapMeshes.some(mesh => {
            return mesh?.boundingBox?.intersectsBox(square.boundingBox) && mesh.visible;
          });

          if (clickMesh?.boundingBox?.intersectsBox(square.boundingBox) && clickMesh.visible) {
            intersectsBoundingBox = true;
          }

          if (intersectsBoundingBox) {
            const rayOrigin = new THREE.Vector3(square.position.x, square.position.y, 100);
            const rayDirection = new THREE.Vector3(0, 0, -1);
            raycaster.set(rayOrigin, rayDirection.normalize());
            const validMeshes = alphaMapMeshes.filter(mesh => mesh && mesh.boundingBox && mesh.visible);
            const intersects = raycaster.intersectObjects([...validMeshes, clickMesh], true);

            let totalAlpha = 0;
            intersects.forEach(intersect => {
              const uv = intersect.uv;
              const x = Math.floor(uv.x * (intersect.object === clickMesh ? circleCanvas.width : alphaMapCanvas.width));
              const y = Math.floor(uv.y * (intersect.object === clickMesh ? circleCanvas.height : alphaMapCanvas.height));
              const index = (y * (intersect.object === clickMesh ? circleCanvas.width : alphaMapCanvas.width) + x) * 4;
              let alphaValue = 0;
              if (intersect.object.material.visible) {
                alphaValue = (intersect.object === clickMesh ? -circleImageData.data[index + 3] : intersect.object === mouseAlphaMapMesh ? -alphaMapImageData.data[index + 3] : alphaMapImageData.data[index + 3]);
              }

              const meshOpacity = intersect.object.material.opacity;
              totalAlpha += Math.sign(alphaValue) * Math.max(0.01, Math.abs((alphaValue / 255) * meshOpacity));
            });

            totalAlpha = Math.min(totalAlpha, 1);
            square.userData.targetOpacity = totalAlpha;
            square.userData.targetScale = totalAlpha + 0.5;
            if (totalAlpha > 0) {
              square.userData.noiseOpacity = addNoise(totalAlpha, 0.1);
              square.userData.noiseScale = addNoise(totalAlpha + 0.5, 0.1);
            } else {
              square.userData.targetOpacity = 0;
              square.userData.targetScale = 0;
              square.userData.noiseOpacity = 1;
              square.userData.noiseScale = 1;
            }
          } else {
            square.userData.targetOpacity = 0;
            square.userData.targetScale = 0;
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
          const opacityDelta = (square.userData.targetOpacity - square.userData.currentOpacity) * 0.2;
          square.userData.currentOpacity += opacityDelta;
        }

        if (square.userData.currentScale !== square.userData.targetScale) {
          const scaleDelta = (square.userData.targetScale - square.userData.currentScale) * 0.2;
          square.userData.currentScale += scaleDelta;
        }

        if (square.userData.currentOpacity > 0) {
          square.material.opacity = addNoise(square.userData.currentOpacity, 0.1);
          const noisyScale = addNoise(square.userData.currentScale, 0.1);
          square.scale.set(noisyScale, noisyScale, noisyScale);
          square.visible = true;
        } else {
          square.material.opacity = 0;
          square.scale.set(1, 1, 1);
          square.visible = false;
        }
        square.material.needsUpdate = true;
      });

      orbitingAlphaMapMeshes.forEach((mesh, index) => {
        if (transitionPhase === 1) {
          mesh.orbitRadius = Math.max(0.1, mesh.orbitRadius * 0.8);
        }

        if (mesh.orbitRadius !== undefined) {
          mesh.orbitAngle += mesh.orbitSpeed;
          const noiseValue = simplex(index, now * 0.0001) * 50;
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

      if (clickMesh && clickMesh.visible) {
        clickMesh.userData.scale += 0.2;
        clickMesh.userData.opacity -= 0.015;
        if (clickMesh.userData.opacity <= 0) {
          clickMesh.visible = false;
          clickMesh.userData.opacity = 0;
        } else {
          clickMesh.scale.set(clickMesh.userData.scale, clickMesh.userData.scale, clickMesh.userData.scale);
          clickMesh.material.opacity = clickMesh.userData.opacity;
          clickMesh.material.needsUpdate = true;
          clickMesh.geometry.computeBoundingBox();
          clickMesh.boundingBox = clickMesh.geometry.boundingBox.clone().applyMatrix4(clickMesh.matrixWorld);
        }
      }

      // Transition logic
      if (triggerTransition) {
        if (transitionPhase === 0) {
          transitionPhase = 1;
          transitionStartTime = time;
        }

        const transitionDuration = 2000;
        const elapsedTime = time - transitionStartTime;

        if (transitionPhase === 1 && elapsedTime > transitionDuration) {
          transitionPhase = 3;
          transitionStartTime = time;
        }

        if (transitionPhase === 2) {
          if (progress >= 1) {
            transitionPhase = 3;
            transitionStartTime = time;
          }
        }

        if (transitionPhase === 3) {
          
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
      cancelAnimationFrame(animationFrameIdRef.current);
      scene.traverse(object => {
        if (!object.isMesh) return;
        object.geometry.dispose();
        if (object.material.isMaterial) {
          cleanMaterial(object.material);
        } else {
          for (const material of object.material) cleanMaterial(material);
        }
      });
      renderer.dispose();
    };

    function cleanMaterial(material) {
      material.dispose();
      for (const key in material) {
        if (material[key] && typeof material[key].dispose === 'function') {
          material[key].dispose();
        }
      }
    }
  }, [triggerTransition]);

  return <div ref={mountRef} className="grid-container" />;
};

export default Grid;
