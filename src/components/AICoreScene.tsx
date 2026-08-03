"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const systemLabels = [
  { label: "Platforms", position: "left-[3%] top-[14%] sm:left-[2%] sm:top-[16%]" },
  { label: "Agents", position: "right-[2%] top-[18%] sm:top-[20%]" },
  { label: "Knowledge", position: "right-[2%] top-[44%] sm:top-[48%]" },
  { label: "Intelligence", position: "right-[3%] bottom-[12%] sm:bottom-[10%]" },
  { label: "Governance", position: "left-[3%] bottom-[14%] sm:bottom-[12%]" },
];

export function AICoreScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0, 8.5);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    mount.appendChild(renderer.domElement);

    const root = new THREE.Group();
    root.rotation.x = -0.12;
    scene.add(root);

    const ambient = new THREE.AmbientLight(0xffffff, 0.8);
    const signalLight = new THREE.PointLight(0xb026ff, 16, 18, 1.7);
    signalLight.position.set(2.2, 1.4, 3.5);
    const coolLight = new THREE.PointLight(0xa9c8ff, 8, 16, 1.8);
    coolLight.position.set(-3.5, -1.5, 2.5);
    scene.add(ambient, signalLight, coolLight);

    const coreGeometry = new THREE.IcosahedronGeometry(1.28, 5);
    const coreMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x222326,
      emissive: 0x391006,
      emissiveIntensity: 0.8,
      metalness: 0.25,
      roughness: 0.12,
      transmission: 0.5,
      thickness: 1.8,
      transparent: true,
      opacity: 0.92,
      clearcoat: 1,
      clearcoatRoughness: 0.08,
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    root.add(core);

    const innerGeometry = new THREE.IcosahedronGeometry(0.66, 2);
    const innerMaterial = new THREE.MeshStandardMaterial({
      color: 0xb026ff,
      emissive: 0xff3d00,
      emissiveIntensity: 2.2,
      roughness: 0.3,
    });
    const innerCore = new THREE.Mesh(innerGeometry, innerMaterial);
    root.add(innerCore);

    const wireGeometry = new THREE.IcosahedronGeometry(1.58, 2);
    const wireMaterial = new THREE.MeshBasicMaterial({
      color: 0xf1f0eb,
      wireframe: true,
      transparent: true,
      opacity: 0.13,
      blending: THREE.AdditiveBlending,
    });
    const wire = new THREE.Mesh(wireGeometry, wireMaterial);
    root.add(wire);

    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0xb026ff,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending,
    });
    const rings = [
      { radius: 2.1, tube: 0.008, x: 1.2, y: 0.15 },
      { radius: 2.72, tube: 0.006, x: -0.35, y: 0.9 },
      { radius: 3.28, tube: 0.004, x: 0.75, y: -0.4 },
    ].map((config) => {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(config.radius, config.tube, 8, 220),
        ringMaterial.clone(),
      );
      ring.rotation.x = config.x;
      ring.rotation.y = config.y;
      root.add(ring);
      return ring;
    });

    const nodePositions = [
      new THREE.Vector3(-2.25, 1.5, 0.4),
      new THREE.Vector3(2.45, 1.25, -0.2),
      new THREE.Vector3(2.75, -0.3, 0.5),
      new THREE.Vector3(1.35, -2.15, -0.1),
      new THREE.Vector3(-2.2, -1.65, 0.35),
    ];
    const nodeGeometry = new THREE.SphereGeometry(0.105, 24, 24);
    const nodeMaterial = new THREE.MeshStandardMaterial({
      color: 0xf1f0eb,
      emissive: 0xb026ff,
      emissiveIntensity: 1.4,
      roughness: 0.18,
      metalness: 0.2,
    });
    const haloGeometry = new THREE.SphereGeometry(0.2, 20, 20);
    const haloMaterial = new THREE.MeshBasicMaterial({
      color: 0xb026ff,
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending,
    });

    const nodes = nodePositions.map((position) => {
      const group = new THREE.Group();
      group.position.copy(position);
      group.add(
        new THREE.Mesh(nodeGeometry, nodeMaterial),
        new THREE.Mesh(haloGeometry, haloMaterial),
      );
      root.add(group);
      return group;
    });

    const linePositions = new Float32Array(nodePositions.length * 6);
    nodePositions.forEach((position, index) => {
      const offset = index * 6;
      linePositions[offset] = 0;
      linePositions[offset + 1] = 0;
      linePositions[offset + 2] = 0;
      linePositions[offset + 3] = position.x;
      linePositions[offset + 4] = position.y;
      linePositions[offset + 5] = position.z;
    });
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(linePositions, 3),
    );
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xff7a4d,
      transparent: true,
      opacity: 0.2,
      blending: THREE.AdditiveBlending,
    });
    const connections = new THREE.LineSegments(lineGeometry, lineMaterial);
    root.add(connections);

    const particleCount = 360;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let index = 0; index < particleCount; index += 1) {
      const radius = 2.2 + Math.random() * 3.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      particlePositions[index * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[index * 3 + 1] =
        radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[index * 3 + 2] = radius * Math.cos(phi) * 0.55;
    }
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3),
    );
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xe9e7df,
      size: 0.022,
      transparent: true,
      opacity: 0.45,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    root.add(particles);

    const pointer = new THREE.Vector2();
    const targetRotation = new THREE.Vector2();
    const onPointerMove = (event: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      targetRotation.set(pointer.y * 0.22, pointer.x * 0.32);
    };
    mount.addEventListener("pointermove", onPointerMove);

    const resize = () => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);
    resize();

    const clock = new THREE.Clock();
    let frame = 0;
    let visible = true;
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0.02 },
    );
    intersectionObserver.observe(mount);

    const render = () => {
      if (visible) {
        const elapsed = clock.getElapsedTime();
        root.rotation.x += (targetRotation.x - root.rotation.x) * 0.035;
        root.rotation.y +=
          (targetRotation.y + elapsed * 0.035 - root.rotation.y) * 0.028;
        core.rotation.x = elapsed * 0.12;
        core.rotation.y = elapsed * 0.16;
        innerCore.rotation.x = -elapsed * 0.18;
        innerCore.rotation.z = elapsed * 0.2;
        wire.rotation.x = -elapsed * 0.06;
        wire.rotation.y = elapsed * 0.08;
        particles.rotation.y = elapsed * 0.018;
        rings.forEach((ring, index) => {
          ring.rotation.z = elapsed * (0.025 + index * 0.012);
        });
        nodes.forEach((node, index) => {
          const pulse = 1 + Math.sin(elapsed * 1.7 + index) * 0.12;
          node.scale.setScalar(pulse);
        });
        renderer.render(scene, camera);
      }
      if (!reducedMotion) frame = requestAnimationFrame(render);
    };

    renderer.render(scene, camera);
    if (!reducedMotion) frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      mount.removeEventListener("pointermove", onPointerMove);
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Points) {
          object.geometry.dispose();
          const material = object.material;
          if (Array.isArray(material)) {
            material.forEach((item) => item.dispose());
          } else {
            material.dispose();
          }
        }
      });
      lineGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div className="flex h-full min-h-[22rem] flex-col sm:min-h-[28rem] lg:min-h-[31rem]">
      <div className="relative min-h-0 flex-1 overflow-hidden">
        <div ref={mountRef} className="absolute inset-0 [&_canvas]:h-full [&_canvas]:w-full" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,transparent_0%,rgba(8,8,8,0.08)_43%,rgba(8,8,8,0.7)_88%)]" />

        {systemLabels.map((system) => (
          <div
            key={system.label}
          className={`pointer-events-none absolute ${system.position} rounded-full border border-white/10 bg-black/25 px-2 py-1.5 backdrop-blur-xl sm:px-3 sm:py-2`}
        >
          <span className="flex items-center gap-1.5 font-mono text-[0.48rem] uppercase tracking-[0.1em] text-white/55 sm:gap-2 sm:text-[0.54rem] sm:tracking-[0.12em]">
              <span className="h-1.5 w-1.5 rounded-full bg-signal shadow-[0_0_12px_#b026ff]" />
              {system.label}
            </span>
          </div>
        ))}
      </div>

      <div className="pointer-events-none shrink-0 px-4 pb-4 pt-3">
        <div className="rounded-2xl border border-white/10 bg-black/35 px-4 py-3 backdrop-blur-2xl">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-mono text-[0.52rem] uppercase tracking-[0.13em] text-white/35">
                Enterprise capability graph
              </p>
              <p className="mt-1 text-xs font-semibold text-white/75">
                Custom systems. One operating context.
              </p>
            </div>
            <span className="flex shrink-0 items-center gap-2 font-mono text-[0.52rem] uppercase tracking-[0.1em] text-success">
              <span className="signal-pulse h-1.5 w-1.5 rounded-full bg-success" />
              Live
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
