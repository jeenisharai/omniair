import { useEffect, useRef, useState, type FC } from 'react';
import * as THREE from 'three';

export type SceneMode = 'bark' | 'globe' | 'local';

interface ThreeHeroSceneProps {
  mode: SceneMode;
  timeOffset: number;
  onNodeClick?: (cityName: string) => void;
  onBackToSurface?: () => void;
  isPaused?: boolean;
}

export const ThreeHeroScene: FC<ThreeHeroSceneProps> = ({
  mode,
  timeOffset,
  onNodeClick,
  onBackToSurface: _onBackToSurface,
  isPaused = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const animationFrameId = useRef<number>(0);

  // Scene Groups
  const globeGroupRef = useRef<THREE.Group | null>(null);
  const localGroupRef = useRef<THREE.Group | null>(null);
  const barkGroupRef = useRef<THREE.Group | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const fogColumnsRef = useRef<THREE.Group | null>(null);

  // Mouse tracking
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x050a0c, 0.04);

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 7);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting (Forest Green Ambient + Luminous Teal Directional)
    const ambientLight = new THREE.AmbientLight(0x0a1f18, 2.0);
    scene.add(ambientLight);

    const tealDirLight = new THREE.DirectionalLight(0x1fd4a4, 2.4);
    tealDirLight.position.set(5, 8, 5);
    scene.add(tealDirLight);

    const cyanRimLight = new THREE.DirectionalLight(0x8be9ff, 1.6);
    cyanRimLight.position.set(-6, -3, -4);
    scene.add(cyanRimLight);

    // ==========================================
    // 1. BARK & LICHEN COLONY SCENE (Mode: 'bark')
    // ==========================================
    const barkGroup = new THREE.Group();
    barkGroupRef.current = barkGroup;

    // Tree trunk segment
    const barkGeo = new THREE.CylinderGeometry(3.6, 3.9, 11, 48, 48, true);
    const barkMat = new THREE.MeshStandardMaterial({
      color: 0x0f1c16,
      roughness: 0.95,
      metalness: 0.05,
    });
    const barkMesh = new THREE.Mesh(barkGeo, barkMat);
    barkMesh.position.set(0, 0, -2);
    barkGroup.add(barkMesh);

    // Living lichen clusters on bark
    const lichenClusterGeo = new THREE.BufferGeometry();
    const clusterCount = 2200;
    const clusterPositions = new Float32Array(clusterCount * 3);
    const clusterColors = new Float32Array(clusterCount * 3);

    for (let i = 0; i < clusterCount; i++) {
      const theta = (Math.random() - 0.5) * Math.PI * 0.95;
      const y = (Math.random() - 0.5) * 6.5;
      const r = 3.62 + Math.sin(y * 4) * 0.08 + Math.random() * 0.14;

      clusterPositions[i * 3] = r * Math.sin(theta);
      clusterPositions[i * 3 + 1] = y;
      clusterPositions[i * 3 + 2] = -2 + r * Math.cos(theta);

      const isCyan = Math.random() > 0.65;
      clusterColors[i * 3] = isCyan ? 0.54 : 0.12;
      clusterColors[i * 3 + 1] = isCyan ? 0.91 : 0.83;
      clusterColors[i * 3 + 2] = isCyan ? 1.0 : 0.64;
    }

    lichenClusterGeo.setAttribute('position', new THREE.BufferAttribute(clusterPositions, 3));
    lichenClusterGeo.setAttribute('color', new THREE.BufferAttribute(clusterColors, 3));

    const clusterMat = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.88,
      blending: THREE.AdditiveBlending,
    });
    const lichenPoints = new THREE.Points(lichenClusterGeo, clusterMat);
    barkGroup.add(lichenPoints);

    scene.add(barkGroup);

    // ==========================================
    // 2. 3D MOSS PLANETARY GLOBE (Mode: 'globe')
    // ==========================================
    const globeGroup = new THREE.Group();
    globeGroupRef.current = globeGroup;

    // Earth Sphere (Moss continents)
    const earthGeo = new THREE.SphereGeometry(2.3, 64, 64);
    const earthMat = new THREE.MeshStandardMaterial({
      color: 0x091c15,
      roughness: 0.75,
      metalness: 0.15,
    });
    const earthMesh = new THREE.Mesh(earthGeo, earthMat);
    globeGroup.add(earthMesh);

    // Atmospheric Haze Shell
    const hazeGeo = new THREE.SphereGeometry(2.38, 48, 48);
    const hazeMat = new THREE.MeshBasicMaterial({
      color: 0x1fd4a4,
      transparent: true,
      opacity: 0.09,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
    });
    const hazeMesh = new THREE.Mesh(hazeGeo, hazeMat);
    globeGroup.add(hazeMesh);

    // City Bio-Nodes
    const cityNodes = [
      { name: 'Tokyo', lat: 35.6762, lon: 139.6503, aqi: 78 },
      { name: 'London', lat: 51.5074, lon: -0.1278, aqi: 54 },
      { name: 'Delhi', lat: 28.6139, lon: 77.209, aqi: 184 },
      { name: 'New York', lat: 40.7128, lon: -74.006, aqi: 62 },
      { name: 'São Paulo', lat: -23.5505, lon: -46.6333, aqi: 88 },
      { name: 'Nairobi', lat: -1.2921, lon: 36.8219, aqi: 65 },
    ];

    const convertLatLonToVector = (lat: number, lon: number, radius: number) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      return new THREE.Vector3(
        -radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta)
      );
    };

    cityNodes.forEach((city) => {
      const pos = convertLatLonToVector(city.lat, city.lon, 2.32);

      const ringGeo = new THREE.RingGeometry(0.04, 0.09, 24);
      const ringColor = city.aqi > 100 ? 0xff5a3c : 0x1fd4a4;
      const ringMat = new THREE.MeshBasicMaterial({
        color: ringColor,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.95,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.position.copy(pos);
      ringMesh.lookAt(0, 0, 0);
      ringMesh.userData = { cityName: city.name, aqi: city.aqi };
      globeGroup.add(ringMesh);

      const beaconGeo = new THREE.BufferGeometry().setFromPoints([
        pos,
        pos.clone().multiplyScalar(1.18),
      ]);
      const beaconMat = new THREE.LineBasicMaterial({
        color: ringColor,
        transparent: true,
        opacity: 0.75,
      });
      const beaconLine = new THREE.Line(beaconGeo, beaconMat);
      globeGroup.add(beaconLine);
    });

    scene.add(globeGroup);

    // ==========================================
    // 3. HYPER-LOCAL 3D NEIGHBORHOOD SCENE (Mode: 'local')
    // ==========================================
    const localGroup = new THREE.Group();
    localGroupRef.current = localGroup;

    const groundGeo = new THREE.CylinderGeometry(3.6, 3.6, 0.4, 36);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x0c1711,
      roughness: 0.9,
      metalness: 0.1,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.position.y = -1.6;
    localGroup.add(ground);

    const trunkGeo = new THREE.CylinderGeometry(0.8, 1.0, 2.8, 24);
    const trunkMat = new THREE.MeshStandardMaterial({
      color: 0x18241b,
      roughness: 0.85,
    });
    const trunk = new THREE.Mesh(trunkGeo, trunkMat);
    trunk.position.set(-1.2, -0.2, 0);
    localGroup.add(trunk);

    const trunkLichenGeo = new THREE.SphereGeometry(0.85, 24, 16, 0, Math.PI * 0.6, 0.4, 1.5);
    const trunkLichenMat = new THREE.MeshStandardMaterial({
      color: 0x1fd4a4,
      emissive: 0x08382b,
      roughness: 0.6,
    });
    const trunkLichen = new THREE.Mesh(trunkLichenGeo, trunkLichenMat);
    trunkLichen.position.set(-1.2, 0, 0);
    localGroup.add(trunkLichen);

    const fogColumns = new THREE.Group();
    fogColumnsRef.current = fogColumns;

    const columnCoords = [
      { x: 0.6, z: 0.4, stress: 0.85 },
      { x: 1.4, z: -0.6, stress: 0.92 },
      { x: -0.2, z: 1.2, stress: 0.45 },
      { x: 1.8, z: 0.8, stress: 0.78 },
      { x: -0.8, z: -1.2, stress: 0.28 },
    ];

    columnCoords.forEach((col, idx) => {
      const height = 1.8 + col.stress * 2.2;
      const colGeo = new THREE.CylinderGeometry(0.18, 0.35, height, 16);
      const colColor = col.stress > 0.6 ? 0xff5a3c : 0x1fd4a4;
      const colMat = new THREE.MeshBasicMaterial({
        color: colColor,
        transparent: true,
        opacity: 0.24 + col.stress * 0.22,
        blending: THREE.AdditiveBlending,
      });
      const column = new THREE.Mesh(colGeo, colMat);
      column.position.set(col.x, -1.6 + height / 2, col.z);
      column.userData = { baseHeight: height, stress: col.stress, idx };
      fogColumns.add(column);
    });
    localGroup.add(fogColumns);

    const particleGeo = new THREE.BufferGeometry();
    const pCount = 1300;
    const pPositions = new Float32Array(pCount * 3);
    const pColors = new Float32Array(pCount * 3);

    for (let i = 0; i < pCount; i++) {
      pPositions[i * 3] = (Math.random() - 0.5) * 7.5;
      pPositions[i * 3 + 1] = -1.4 + Math.random() * 4.2;
      pPositions[i * 3 + 2] = (Math.random() - 0.5) * 7.5;

      const isHighStress = Math.random() > 0.45;
      pColors[i * 3] = isHighStress ? 1.0 : 0.12;
      pColors[i * 3 + 1] = isHighStress ? 0.35 : 0.83;
      pColors[i * 3 + 2] = isHighStress ? 0.24 : 0.64;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(pColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    particlesRef.current = particles;
    localGroup.add(particles);

    scene.add(localGroup);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouse.current.targetX = x * 0.45;
      mouse.current.targetY = y * 0.45;
      if (!hasInteracted) setHasInteracted(true);
    };

    const handleClick = () => {
      if (mode === 'globe') {
        onNodeClick?.('Tokyo Bay Corridor');
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    container.addEventListener('click', handleClick);

    const handleResize = () => {
      if (!container || !cameraRef.current || !rendererRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId.current = requestAnimationFrame(animate);

      if (isPaused) {
        if (rendererRef.current && sceneRef.current && cameraRef.current) {
          rendererRef.current.render(sceneRef.current, cameraRef.current);
        }
        return;
      }

      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.05;
      mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.05;

      if (globeGroupRef.current) {
        globeGroupRef.current.rotation.y += delta * 0.14;
        globeGroupRef.current.rotation.x = mouse.current.y * 0.5;
        globeGroupRef.current.rotation.z = mouse.current.x * 0.2;
      }

      if (barkGroupRef.current) {
        barkGroupRef.current.rotation.y = mouse.current.x * 0.25;
        barkGroupRef.current.position.x = -mouse.current.x * 0.15;
      }

      if (particlesRef.current) {
        const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < pCount; i++) {
          positions[i * 3] += 0.009 + (timeOffset > 0 ? 0.006 : 0);
          if (positions[i * 3] > 3.8) positions[i * 3] = -3.8;
          positions[i * 3 + 1] += Math.sin(time * 2 + i) * 0.002;
        }
        particlesRef.current.geometry.attributes.position.needsUpdate = true;
      }

      if (fogColumnsRef.current) {
        fogColumnsRef.current.children.forEach((col) => {
          const mesh = col as THREE.Mesh;
          const { baseHeight, stress } = mesh.userData;
          const multiplier = 1 + (timeOffset / 24) * 0.45 * (stress > 0.6 ? 1 : -0.3);
          const currentH = baseHeight * multiplier;
          mesh.scale.y = Math.max(multiplier, 0.35);
          mesh.position.y = -1.6 + currentH / 2;
        });
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId.current);
      window.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
      if (rendererRef.current && container.contains(rendererRef.current.domElement)) {
        container.removeChild(rendererRef.current.domElement);
      }
      renderer.dispose();
    };
  }, [isPaused, onNodeClick, mode, timeOffset, hasInteracted]);

  useEffect(() => {
    if (barkGroupRef.current) barkGroupRef.current.visible = mode === 'bark';
    if (globeGroupRef.current) globeGroupRef.current.visible = mode === 'globe';
    if (localGroupRef.current) localGroupRef.current.visible = mode === 'local';

    if (cameraRef.current) {
      if (mode === 'bark') {
        cameraRef.current.position.set(0, 0, 4.2);
      } else if (mode === 'globe') {
        cameraRef.current.position.set(0, 0, 6.8);
      } else {
        cameraRef.current.position.set(2.8, 1.8, 4.8);
        cameraRef.current.lookAt(0, -0.2, 0);
      }
    }
  }, [mode]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing overflow-hidden pointer-events-auto"
      style={{ zIndex: 1 }}
    />
  );
};
