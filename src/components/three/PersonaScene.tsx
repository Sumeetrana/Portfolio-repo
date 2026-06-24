"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

function makeLabel(text: string, colorHex: string): THREE.Sprite {
  const canvas = document.createElement("canvas");
  canvas.width = 256; canvas.height = 56;
  const ctx = canvas.getContext("2d")!;
  ctx.font = "bold 26px 'Courier New', monospace";
  ctx.fillStyle = colorHex;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, 128, 28);
  const tex = new THREE.CanvasTexture(canvas);
  const mat = new THREE.SpriteMaterial({
    map: tex, transparent: true, depthWrite: false,
    blending: THREE.AdditiveBlending, opacity: 0.85,
  });
  const sprite = new THREE.Sprite(mat);
  sprite.scale.set(3.8, 0.85, 1);
  return sprite;
}

const add = { blending: THREE.AdditiveBlending, depthWrite: false, transparent: true } as const;

export default function PersonaScene() {
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
    const camera = new THREE.PerspectiveCamera(48, W / H, 0.1, 200);
    camera.position.set(0, 0, 15);

    // ── Holographic head (icosahedron + shader) ───────────────────
    const headGeo = new THREE.IcosahedronGeometry(3, 2);
    // Stretch vertically for head silhouette
    const hPos = headGeo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < hPos.count; i++) hPos.setY(i, hPos.getY(i) * 1.18);
    headGeo.computeVertexNormals();

    const headMat = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 } },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vWorldPos;
        void main() {
          vNormal    = normalize(normalMatrix * normal);
          vWorldPos  = (modelMatrix * vec4(position, 1.0)).xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        varying vec3 vNormal;
        varying vec3 vWorldPos;
        void main() {
          vec3 view   = normalize(cameraPosition - vWorldPos);
          float rim   = 1.0 - abs(dot(normalize(vNormal), view));
          rim         = pow(rim, 1.5);
          float scan  = sin(vWorldPos.y * 9.0 + uTime * 2.2) * 0.5 + 0.5;
          scan        = smoothstep(0.55, 1.0, scan);
          float sweep = mod(uTime * 0.5, 6.0) - 3.0;
          float line  = smoothstep(0.35, 0.0, abs(vWorldPos.y - sweep));
          vec3 base   = mix(vec3(0.18, 0.04, 0.85), vec3(0.04, 0.55, 1.0), rim);
          base       += scan  * vec3(0.15, 0.25, 1.0) * 0.35;
          base       += line  * vec3(0.4,  0.75, 1.0) * 0.9;
          base       += rim   * vec3(0.35, 0.18, 1.0) * 0.7;
          float alpha = rim * 0.88 + scan * 0.12 + line * 0.35 + 0.04;
          gl_FragColor = vec4(base, clamp(alpha, 0.0, 1.0));
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const headGroup = new THREE.Group();
    headGroup.add(new THREE.Mesh(headGeo, headMat));

    // Wireframe overlay
    headGroup.add(new THREE.Mesh(
      headGeo.clone(),
      new THREE.MeshBasicMaterial({ color: 0x818cf8, wireframe: true, ...add, opacity: 0.14 })
    ));

    // ── Eyes ─────────────────────────────────────────────────────
    const eyeGeo = new THREE.SphereGeometry(0.3, 16, 16);
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0x00eeff, ...add, opacity: 0.95 });
    const lEye = new THREE.Mesh(eyeGeo, eyeMat.clone());
    const rEye = new THREE.Mesh(eyeGeo, eyeMat.clone());
    lEye.position.set(-0.88, 0.38, 2.65);
    rEye.position.set( 0.88, 0.38, 2.65);
    headGroup.add(lEye, rEye);

    // Eye halos
    [lEye, rEye].forEach(e => {
      const h = new THREE.Mesh(
        new THREE.RingGeometry(0.32, 0.65, 20),
        new THREE.MeshBasicMaterial({ color: 0x00ccff, side: THREE.DoubleSide, ...add, opacity: 0.45 })
      );
      h.position.copy(e.position);
      headGroup.add(h);
    });

    // SR monogram inside head
    const srSprite = makeLabel("SR", "#c4b5fd");
    srSprite.position.set(0, 0, 2.8);
    srSprite.scale.set(2.2, 0.7, 1);
    (srSprite.material as THREE.SpriteMaterial).opacity = 0.22;
    headGroup.add(srSprite);

    scene.add(headGroup);

    // ── Aura particle cloud (torus distribution) ──────────────────
    const AURA = 900;
    const aPos = new Float32Array(AURA * 3);
    for (let i = 0; i < AURA; i++) {
      const a = Math.random() * Math.PI * 2;
      const p = Math.random() * Math.PI * 2;
      const R = 5.0, r = 1.6 + Math.random() * 2.0;
      aPos[i*3]   = (R + r * Math.cos(p)) * Math.cos(a);
      aPos[i*3+1] = r * Math.sin(p);
      aPos[i*3+2] = (R + r * Math.cos(p)) * Math.sin(a);
    }
    const auraGeo = new THREE.BufferGeometry();
    auraGeo.setAttribute("position", new THREE.BufferAttribute(aPos, 3));
    const aura = new THREE.Points(auraGeo,
      new THREE.PointsMaterial({ size: 0.07, color: 0x818cf8, ...add, opacity: 0.75 })
    );
    scene.add(aura);

    // ── Orbital rings ─────────────────────────────────────────────
    const rings: THREE.Mesh[] = [];
    [
      { r: 5.8, t: 0.045, col: 0x6366f1, rx: Math.PI/2.4,  ry: 0.4,  op: 0.38 },
      { r: 7.0, t: 0.035, col: 0x8b5cf6, rx: 0.6,          ry: Math.PI/3, op: 0.26 },
      { r: 4.8, t: 0.035, col: 0xa78bfa, rx: Math.PI/1.9,  ry:-0.5,  op: 0.32 },
    ].forEach(({ r, t, col, rx, ry, op }) => {
      const m = new THREE.Mesh(
        new THREE.TorusGeometry(r, t, 3, 120),
        new THREE.MeshBasicMaterial({ color: col, ...add, opacity: op })
      );
      m.rotation.x = rx; m.rotation.y = ry;
      rings.push(m); scene.add(m);
    });

    // ── Floating crystals orbiting ────────────────────────────────
    type Crystal = { mesh: THREE.Mesh; spd: number; off: number; orb: number; oy: number };
    const crystals: Crystal[] = [];
    [
      { g: new THREE.OctahedronGeometry(0.55),      col: 0x7c3aed, spd: 0.55, off: 0,           orb: 7.5, oy: 2.5  },
      { g: new THREE.TetrahedronGeometry(0.45),     col: 0x06b6d4, spd:-0.38, off: Math.PI/2,   orb: 7.0, oy:-2.0  },
      { g: new THREE.OctahedronGeometry(0.4),       col: 0x4f46e5, spd: 0.48, off: Math.PI,     orb: 8.0, oy: 0.5  },
      { g: new THREE.IcosahedronGeometry(0.35, 0),  col: 0x8b5cf6, spd:-0.65, off: 3*Math.PI/2, orb: 6.5, oy:-3.0  },
      { g: new THREE.TorusGeometry(0.5,0.12,8,12),  col: 0x06b6d4, spd: 0.3,  off: Math.PI/4,   orb: 9.0, oy: 4.0  },
    ].forEach(({ g, col, spd, off, orb, oy }) => {
      const m = new THREE.Mesh(g,
        new THREE.MeshBasicMaterial({ color: col, wireframe: true, ...add, opacity: 0.75 })
      );
      crystals.push({ mesh: m, spd, off, orb, oy });
      scene.add(m);
    });

    // ── Floating tech label sprites ───────────────────────────────
    type Floater = { sprite: THREE.Sprite; spd: number; off: number; orb: number; oy: number };
    const floaters: Floater[] = [];
    const labels = [
      { text: "> React.js",   col: "#93c5fd", orb: 10, oy: 3,  spd: 0.18, off: 0            },
      { text: "> Node.js",    col: "#86efac", orb: 11, oy:-2,  spd:-0.15, off: Math.PI*0.6   },
      { text: "> Next.js",    col: "#c4b5fd", orb:  9, oy: 0,  spd: 0.22, off: Math.PI       },
      { text: "> AWS Cloud",  col: "#fde68a", orb: 10, oy:-4,  spd:-0.20, off: Math.PI*1.4   },
      { text: "> TypeScript", col: "#93c5fd", orb: 12, oy: 5,  spd: 0.14, off: Math.PI*0.3   },
      { text: "> OpenAI",     col: "#a5f3fc", orb: 11, oy:-6,  spd:-0.24, off: Math.PI*1.7   },
    ];
    labels.forEach(({ text, col, orb, oy, spd, off }) => {
      const s = makeLabel(text, col);
      floaters.push({ sprite: s, spd, off, orb, oy });
      scene.add(s);
    });

    // ── Background coronas ────────────────────────────────────────
    [9, 12, 16].forEach((r, i) => {
      scene.add(new THREE.Mesh(
        new THREE.SphereGeometry(r, 20, 20),
        new THREE.MeshBasicMaterial({ color: 0x3730a3, side: THREE.BackSide, ...add, opacity: 0.014 - i*0.003 })
      ));
    });

    // ── Resize ────────────────────────────────────────────────────
    const onResize = () => {
      const w = mount.clientWidth, h = mount.clientHeight;
      camera.aspect = w / h; camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    // ── Animate ───────────────────────────────────────────────────
    let t = 0, rafId = 0;

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      t += 0.007;

      headMat.uniforms.uTime.value = t;

      // Head: bob + breathe + rotate
      headGroup.rotation.y = t * 0.22;
      headGroup.position.y = Math.sin(t * 0.9) * 0.35;
      const breathe = 1 + Math.sin(t * 1.4) * 0.025;
      headGroup.scale.setScalar(breathe);

      // Eyes pulse
      const ep = 0.65 + Math.sin(t * 2.8) * 0.35;
      (lEye.material as THREE.MeshBasicMaterial).opacity = ep;
      (rEye.material as THREE.MeshBasicMaterial).opacity = ep;

      // Aura orbit
      aura.rotation.y = t * 0.18;
      aura.rotation.z = Math.sin(t * 0.3) * 0.15;

      // Rings
      rings[0].rotation.z += 0.004;
      rings[1].rotation.y += 0.003;
      rings[2].rotation.x += 0.0025;

      // Crystals orbit
      crystals.forEach(({ mesh, spd, off, orb, oy }) => {
        const a = t * spd + off;
        mesh.position.set(Math.cos(a) * orb, oy + Math.sin(t*0.7)*1.2, Math.sin(a) * orb);
        mesh.rotation.x += 0.012; mesh.rotation.y += 0.009;
      });

      // Tech label floaters
      floaters.forEach(({ sprite, spd, off, orb, oy }) => {
        const a = t * spd + off;
        sprite.position.set(Math.cos(a) * orb, oy + Math.sin(t * 0.5) * 1.5, Math.sin(a) * orb);
        // Fade based on z (face camera side = bright, back = dim)
        const zFace = Math.cos(a);
        (sprite.material as THREE.SpriteMaterial).opacity = 0.3 + Math.max(0, zFace) * 0.7;
      });

      // Camera gentle auto-sway
      camera.position.x = Math.sin(t * 0.18) * 2.0;
      camera.position.y = Math.cos(t * 0.14) * 1.2;
      camera.lookAt(0, 0, 0);

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

  return <div ref={mountRef} className="w-full h-full" />;
}
