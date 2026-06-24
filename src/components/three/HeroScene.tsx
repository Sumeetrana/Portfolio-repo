"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// Soft radial glow sprite
function makeSprite(): THREE.Texture {
  const s = 64;
  const c = document.createElement("canvas");
  c.width = s; c.height = s;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(s/2,s/2,0, s/2,s/2,s/2);
  g.addColorStop(0,    "rgba(255,255,255,1)");
  g.addColorStop(0.2,  "rgba(200,170,255,0.9)");
  g.addColorStop(0.5,  "rgba(120,90,255,0.5)");
  g.addColorStop(1,    "rgba(60,40,200,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, s, s);
  return new THREE.CanvasTexture(c);
}

// Sample lit pixels from text rendered on a canvas
function sampleText(
  lines: { text: string; y: number; size: number; color: [number,number,number] }[],
  cw: number, ch: number, step: number, xScale: number, yScale: number
): { x: number; y: number; r: number; g: number; b: number }[] {
  const canvas = document.createElement("canvas");
  canvas.width = cw; canvas.height = ch;
  const ctx = canvas.getContext("2d")!;
  ctx.clearRect(0, 0, cw, ch);

  lines.forEach(({ text, y, size }) => {
    ctx.fillStyle = "#ffffff";
    ctx.font = `900 ${size}px 'Arial Black', 'Arial', sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, cw / 2, y);
  });

  const data = ctx.getImageData(0, 0, cw, ch).data;
  const pts: { x: number; y: number; r: number; g: number; b: number }[] = [];

  for (let row = 0; row < ch; row += step) {
    for (let col = 0; col < cw; col += step) {
      if (data[(row * cw + col) * 4 + 3] > 100) {
        const nx = col / cw; // 0..1
        const ny = row / ch; // 0..1
        // Which line does this pixel belong to?
        const lineIdx = lines.findIndex(l => Math.abs(row - l.y) < l.size * 0.6);
        const col3 = lines[Math.max(0, lineIdx)]?.color ?? [0.7, 0.4, 1.0];
        // x-gradient on color
        const cx = nx;
        pts.push({
          x: (nx - 0.5) * xScale,
          y: -(ny - 0.5) * yScale,
          r: col3[0] * (0.7 + cx * 0.6),
          g: col3[1] * (0.5 + cx * 0.5),
          b: col3[2],
        });
      }
    }
  }
  return pts;
}

const add = { blending: THREE.AdditiveBlending, depthWrite: false, transparent: true } as const;

export default function HeroScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const W = mount.clientWidth, H = mount.clientHeight;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 500);
    camera.position.set(0, 0, 32);

    const sprite = makeSprite();

    // ── 1. Starfield ────────────────────────────────────────────
    {
      const n = 3500;
      const pos = new Float32Array(n * 3);
      for (let i = 0; i < n; i++) {
        pos[i*3]   = (Math.random()-0.5)*300;
        pos[i*3+1] = (Math.random()-0.5)*300;
        pos[i*3+2] = (Math.random()-0.5)*300;
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      scene.add(new THREE.Points(geo,
        new THREE.PointsMaterial({ size: 0.12, color: 0x8888ff, map: sprite, ...add, opacity: 0.35 })
      ));
    }

    // ── 2. Sample text particles ─────────────────────────────────
    const CW = 1100, CH = 280;
    const textPts = sampleText(
      [
        { text: "SUMEET RANA",        y: 110, size: 148, color: [0.55, 0.2,  1.0] },
        { text: "SOFTWARE ENGINEER",  y: 225, size:  56, color: [0.65, 0.3,  0.9] },
      ],
      CW, CH, 3, 34, 34 * (CH / CW)
    );

    const COUNT = textPts.length;

    // Particle buffers
    const curPos  = new Float32Array(COUNT * 3);
    const vel     = new Float32Array(COUNT * 3);
    const target  = new Float32Array(COUNT * 3);
    const colors  = new Float32Array(COUNT * 3);

    textPts.forEach((p, i) => {
      // Target = text position + tiny z-wave
      target[i*3]   = p.x;
      target[i*3+1] = p.y;
      target[i*3+2] = Math.sin((p.x + p.y) * 0.4) * 0.8;

      // Scatter initial pos from a large sphere
      const r0  = 45 + Math.random() * 35;
      const phi = Math.acos(2 * Math.random() - 1);
      const th  = Math.random() * Math.PI * 2;
      curPos[i*3]   = r0 * Math.sin(phi) * Math.cos(th);
      curPos[i*3+1] = r0 * Math.sin(phi) * Math.sin(th);
      curPos[i*3+2] = r0 * Math.cos(phi) * 0.5;

      // Colors
      colors[i*3]   = Math.min(1, p.r + 0.1);
      colors[i*3+1] = Math.min(1, p.g);
      colors[i*3+2] = Math.min(1, p.b);
    });

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(curPos.slice(), 3));
    geo.setAttribute("color",    new THREE.BufferAttribute(colors, 3));
    const mat = new THREE.PointsMaterial({
      size: 0.18, vertexColors: true, map: sprite, ...add, opacity: 0.95,
    });
    const particles = new THREE.Points(geo, mat);
    scene.add(particles);

    // ── 3. Glow halos (layered coronas) ─────────────────────────
    [16, 22, 30].forEach((r, i) => {
      const m = new THREE.Mesh(
        new THREE.SphereGeometry(r, 24, 24),
        new THREE.MeshBasicMaterial({ color: 0x4f46e5, side: THREE.BackSide, ...add, opacity: 0.018 - i * 0.004 })
      );
      scene.add(m);
    });

    // ── 4. Orbital rings ─────────────────────────────────────────
    const rings: THREE.Mesh[] = [];
    [
      { r:18, t:0.05, rx: Math.PI/3.2,  ry: 0.5, col: 0x6366f1, op: 0.28 },
      { r:24, t:0.04, rx:-Math.PI/4.5,  ry: 1.2, col: 0x8b5cf6, op: 0.18 },
      { r:13, t:0.04, rx: Math.PI/1.9,  ry:-0.3, col: 0xa78bfa, op: 0.22 },
    ].forEach(({ r, t, rx, ry, col, op }) => {
      const m = new THREE.Mesh(
        new THREE.TorusGeometry(r, t, 3, 128),
        new THREE.MeshBasicMaterial({ color: col, ...add, opacity: op })
      );
      m.rotation.x = rx; m.rotation.y = ry;
      rings.push(m); scene.add(m);
    });

    // ── 5. Floating micro-shapes ─────────────────────────────────
    type Sat = { m: THREE.Mesh; spd: number; off: number; orb: number; oy: number };
    const sats: Sat[] = [];
    [
      { g: new THREE.OctahedronGeometry(0.7),      col: 0x7c3aed, r:19, y: 5,  s: 0.35  },
      { g: new THREE.IcosahedronGeometry(0.5,0),   col: 0x4f46e5, r:15, y:-4,  s:-0.28  },
      { g: new THREE.TetrahedronGeometry(0.6),      col: 0x8b5cf6, r:21, y: 7,  s: 0.2   },
      { g: new THREE.OctahedronGeometry(0.45),      col: 0xa78bfa, r:14, y:-6,  s:-0.42  },
      { g: new THREE.TorusGeometry(0.55,0.15,8,16),col: 0x6d28d9, r:23, y: 3,  s: 0.18  },
      { g: new THREE.TetrahedronGeometry(0.5),      col: 0x4338ca, r:17, y:-3,  s:-0.24  },
    ].forEach(({ g, col, r, y, s }, i) => {
      const m = new THREE.Mesh(g, new THREE.MeshBasicMaterial({ color: col, wireframe:true, ...add, opacity:0.55 }));
      sats.push({ m, spd: s, off: (i/6)*Math.PI*2, orb: r, oy: y });
      scene.add(m);
    });

    // ── Mouse ─────────────────────────────────────────────────────
    // Mouse position mapped to approximate 3D coordinates at z=0
    let mx = 0, my = 0;
    const onMouse = (e: MouseEvent) => {
      mx = (e.clientX / window.innerWidth  - 0.5) * 36;
      my = -(e.clientY / window.innerHeight - 0.5) * 22;
    };
    window.addEventListener("mousemove", onMouse);

    // ── Resize ────────────────────────────────────────────────────
    const onResize = () => {
      const w = mount.clientWidth, h = mount.clientHeight;
      camera.aspect = w / h; camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    // ── Animation ─────────────────────────────────────────────────
    const SPRING   = 0.042;
    const DAMPING  = 0.84;
    const REP_R    = 5.2;
    const REP_F    = 1.4;

    let t = 0, rafId = 0;
    const posAttr = geo.attributes.position as THREE.BufferAttribute;

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      t += 0.005;

      for (let i = 0; i < COUNT; i++) {
        const i3 = i * 3;
        let px = posAttr.getX(i), py = posAttr.getY(i), pz = posAttr.getZ(i);

        // Mouse repulsion in XY
        const dx = px - mx, dy = py - my;
        const d2 = dx*dx + dy*dy;
        if (d2 < REP_R * REP_R) {
          const d = Math.sqrt(d2) + 0.001;
          const f = (1 - d / REP_R) * REP_F;
          vel[i3]   += (dx / d) * f;
          vel[i3+1] += (dy / d) * f;
          vel[i3+2] += (Math.random()-0.5) * f * 0.8; // z burst for depth
        }

        // Target with idle float
        const tx = target[i3]   + Math.sin(t * 1.3 + i * 0.011) * 0.13;
        const ty = target[i3+1] + Math.cos(t * 1.1 + i * 0.014) * 0.10;
        const tz = target[i3+2] + Math.sin(t * 0.9 + i * 0.009) * 0.18;

        // Spring toward target
        vel[i3]   += (tx - px) * SPRING;
        vel[i3+1] += (ty - py) * SPRING;
        vel[i3+2] += (tz - pz) * SPRING * 0.6;

        // Damping
        vel[i3]   *= DAMPING;
        vel[i3+1] *= DAMPING;
        vel[i3+2] *= DAMPING;

        posAttr.setXYZ(i, px + vel[i3], py + vel[i3+1], pz + vel[i3+2]);
      }
      posAttr.needsUpdate = true;

      // Rings drift
      rings[0].rotation.z += 0.0025;
      rings[1].rotation.z -= 0.0018;
      rings[2].rotation.y += 0.002;

      // Satellites orbit
      sats.forEach(({ m, spd, off, orb, oy }, i) => {
        const a = t * spd + off;
        m.position.set(Math.cos(a)*orb, oy + Math.sin(t*0.8+i)*1.4, Math.sin(a)*orb);
        m.rotation.x += 0.009; m.rotation.y += 0.007;
      });

      // Camera soft parallax on mouse
      camera.position.x += (mx * 0.12 - camera.position.x) * 0.04;
      camera.position.y += (my * 0.08 - camera.position.y) * 0.04;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", onResize);
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      renderer.dispose(); sprite.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 w-full h-full" />;
}
