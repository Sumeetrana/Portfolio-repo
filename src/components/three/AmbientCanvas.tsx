"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// A subtle, always-on particle network that runs behind the entire page scroll area
export default function AmbientCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const W = mount.clientWidth, H = mount.clientHeight;
    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(1); // keep at 1x for perf since this is a background
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 300);
    camera.position.z = 28;

    const add = { blending: THREE.AdditiveBlending, depthWrite: false, transparent: true } as const;

    // ── Floating node particles ───────────────────────────────────
    const N = 180;
    const nodePos = new Float32Array(N * 3);
    const nodeVel = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      nodePos[i*3]   = (Math.random()-0.5)*50;
      nodePos[i*3+1] = (Math.random()-0.5)*50;
      nodePos[i*3+2] = (Math.random()-0.5)*20;
      nodeVel[i*3]   = (Math.random()-0.5)*0.012;
      nodeVel[i*3+1] = (Math.random()-0.5)*0.012;
      nodeVel[i*3+2] = (Math.random()-0.5)*0.004;
    }
    const nodeGeo = new THREE.BufferGeometry();
    nodeGeo.setAttribute("position", new THREE.BufferAttribute(nodePos, 3));
    const nodeMat = new THREE.PointsMaterial({ size: 0.35, color: 0x6366f1, ...add, opacity: 0.7 });
    const nodes = new THREE.Points(nodeGeo, nodeMat);
    scene.add(nodes);

    // ── Connection lines between nearby nodes ─────────────────────
    const MAX_LINES = 300;
    const linePos = new Float32Array(MAX_LINES * 2 * 3);
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute("position", new THREE.BufferAttribute(linePos, 3));
    lineGeo.setDrawRange(0, 0);
    const lineMat = new THREE.LineSegments(
      lineGeo,
      new THREE.LineBasicMaterial({ color: 0x4f46e5, ...add, opacity: 0.18 })
    );
    scene.add(lineMat);

    // ── Resize ────────────────────────────────────────────────────
    const onResize = () => {
      const w = mount.clientWidth, h = mount.clientHeight;
      camera.aspect = w / h; camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    // ── Animate ───────────────────────────────────────────────────
    const CONN_DIST = 8;
    let rafId = 0;

    const animate = () => {
      rafId = requestAnimationFrame(animate);

      const pos = nodeGeo.attributes.position as THREE.BufferAttribute;

      // Move nodes
      for (let i = 0; i < N; i++) {
        let x = pos.getX(i) + nodeVel[i*3];
        let y = pos.getY(i) + nodeVel[i*3+1];
        let z = pos.getZ(i) + nodeVel[i*3+2];
        // Bounce at boundaries
        if (Math.abs(x) > 25) { nodeVel[i*3]   *= -1; x = Math.sign(x)*25; }
        if (Math.abs(y) > 25) { nodeVel[i*3+1] *= -1; y = Math.sign(y)*25; }
        if (Math.abs(z) > 10) { nodeVel[i*3+2] *= -1; z = Math.sign(z)*10; }
        pos.setXYZ(i, x, y, z);
      }
      pos.needsUpdate = true;

      // Draw lines between close nodes
      let lineCount = 0;
      const lp = lineGeo.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < N && lineCount < MAX_LINES; i++) {
        for (let j = i + 1; j < N && lineCount < MAX_LINES; j++) {
          const dx = pos.getX(i)-pos.getX(j);
          const dy = pos.getY(i)-pos.getY(j);
          const dz = pos.getZ(i)-pos.getZ(j);
          if (dx*dx+dy*dy+dz*dz < CONN_DIST*CONN_DIST) {
            lp.setXYZ(lineCount*2,   pos.getX(i), pos.getY(i), pos.getZ(i));
            lp.setXYZ(lineCount*2+1, pos.getX(j), pos.getY(j), pos.getZ(j));
            lineCount++;
          }
        }
      }
      lp.needsUpdate = true;
      lineGeo.setDrawRange(0, lineCount * 2);

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 w-full h-full" />;
}
