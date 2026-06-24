"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const TECHS = [
  { name: "Next.js",     color: "#e2e8f0", category: "Frontend" },
  { name: "React",       color: "#93c5fd", category: "Frontend" },
  { name: "TypeScript",  color: "#60a5fa", category: "Language" },
  { name: "React Native",color: "#86efac", category: "Mobile"   },
  { name: "Node.js",     color: "#4ade80", category: "Backend"  },
  { name: "NestJS",      color: "#f87171", category: "Backend"  },
  { name: "Python",      color: "#fde68a", category: "Backend"  },
  { name: "PostgreSQL",  color: "#67e8f9", category: "Database" },
  { name: "MongoDB",     color: "#86efac", category: "Database" },
  { name: "Redis",       color: "#fca5a5", category: "Cache"    },
  { name: "AWS",         color: "#fde68a", category: "Cloud"    },
  { name: "Docker",      color: "#93c5fd", category: "DevOps"   },
  { name: "Tailwind",    color: "#5eead4", category: "Styling"  },
  { name: "OpenAI",      color: "#a5f3fc", category: "AI"       },
  { name: "LangChain",   color: "#c4b5fd", category: "AI"       },
  { name: "GraphQL",     color: "#f0abfc", category: "API"      },
];

function makeLabel(text: string, colorHex: string): THREE.Sprite {
  const canvas = document.createElement("canvas");
  canvas.width = 320; canvas.height = 80;
  const ctx = canvas.getContext("2d")!;
  // Glow backdrop
  ctx.shadowColor = colorHex;
  ctx.shadowBlur  = 18;
  ctx.font = "bold 30px 'Courier New', monospace";
  ctx.fillStyle = colorHex;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, 160, 40);
  const tex = new THREE.CanvasTexture(canvas);
  const mat = new THREE.SpriteMaterial({
    map: tex, transparent: true, depthWrite: false,
    blending: THREE.AdditiveBlending, opacity: 0.9,
  });
  const sprite = new THREE.Sprite(mat);
  sprite.scale.set(4.5, 1.12, 1);
  return sprite;
}

const add = { blending: THREE.AdditiveBlending, depthWrite: false, transparent: true } as const;

export default function TechOrbsScene() {
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
    const camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 300);
    camera.position.set(0, 0, 26);

    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // ── Sphere of tech labels (Fibonacci distribution) ────────────
    const R = 9;
    const golden = Math.PI * (3 - Math.sqrt(5));
    const N = TECHS.length;

    TECHS.forEach(({ name, color }, i) => {
      const y     = 1 - (i / (N - 1)) * 2;
      const r     = Math.sqrt(1 - y * y);
      const theta = golden * i;
      const sprite = makeLabel(name, color);
      sprite.position.set(Math.cos(theta) * r * R, y * R, Math.sin(theta) * r * R);
      // Store original position for later use
      (sprite as THREE.Sprite & { basePos: THREE.Vector3 }).basePos = sprite.position.clone();
      mainGroup.add(sprite);
    });

    // ── Central glowing core ──────────────────────────────────────
    const coreGeo = new THREE.IcosahedronGeometry(1.8, 2);
    const coreMat = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 } },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vWorldPos;
        void main() {
          vNormal   = normalize(normalMatrix * normal);
          vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        varying vec3 vNormal;
        varying vec3 vWorldPos;
        void main() {
          vec3 view  = normalize(cameraPosition - vWorldPos);
          float rim  = pow(1.0 - abs(dot(normalize(vNormal), view)), 1.8);
          float scan = sin(vWorldPos.y * 8.0 + uTime * 3.0) * 0.5 + 0.5;
          vec3 col   = mix(vec3(0.3, 0.1, 1.0), vec3(0.0, 0.7, 1.0), rim);
          col       += scan * 0.2 * vec3(0.5, 0.3, 1.0);
          gl_FragColor = vec4(col, rim * 0.9 + 0.05);
        }
      `,
      transparent: true, side: THREE.DoubleSide,
      depthWrite: false, blending: THREE.AdditiveBlending,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    mainGroup.add(core);

    // Wireframe shell
    mainGroup.add(new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.8, 2),
      new THREE.MeshBasicMaterial({ color: 0x818cf8, wireframe: true, ...add, opacity: 0.2 })
    ));

    // ── Connection sphere lines ────────────────────────────────────
    mainGroup.add(new THREE.Mesh(
      new THREE.IcosahedronGeometry(R, 1),
      new THREE.MeshBasicMaterial({ color: 0x4f46e5, wireframe: true, ...add, opacity: 0.05 })
    ));

    // ── Orbital rings ─────────────────────────────────────────────
    const rings: THREE.Mesh[] = [];
    [
      { r: R+1.5, t: 0.04, col: 0x6366f1, rx: Math.PI/2, ry: 0, op: 0.3 },
      { r: R+2.5, t: 0.03, col: 0x8b5cf6, rx: 0.5,       ry: 1, op: 0.2 },
    ].forEach(({ r, t, col, rx, ry, op }) => {
      const m = new THREE.Mesh(
        new THREE.TorusGeometry(r, t, 3, 128),
        new THREE.MeshBasicMaterial({ color: col, ...add, opacity: op })
      );
      m.rotation.x = rx; m.rotation.y = ry;
      rings.push(m); scene.add(m);
    });

    // ── Background particle field ─────────────────────────────────
    {
      const n = 1200;
      const pos = new Float32Array(n * 3);
      for (let i = 0; i < n; i++) {
        pos[i*3]   = (Math.random()-0.5)*80;
        pos[i*3+1] = (Math.random()-0.5)*80;
        pos[i*3+2] = (Math.random()-0.5)*80;
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      scene.add(new THREE.Points(geo,
        new THREE.PointsMaterial({ size: 0.1, color: 0x6366f1, ...add, opacity: 0.3 })
      ));
    }

    // ── Mouse interaction ──────────────────────────────────────────
    let mx = 0, my = 0;
    const onMouse = (e: MouseEvent) => {
      mx = (e.clientX / window.innerWidth  - 0.5) * 2;
      my = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouse);

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
      t += 0.004;

      coreMat.uniforms.uTime.value = t;

      // Sphere rotates slowly + tilts with mouse
      mainGroup.rotation.y = t * 0.18 + mx * 0.3;
      mainGroup.rotation.x = Math.sin(t * 0.1) * 0.15 + my * 0.15;

      // Core pulse
      const pulse = 1 + Math.sin(t * 2) * 0.08;
      core.scale.setScalar(pulse);

      // Fade labels based on Z depth (facing camera = bright)
      mainGroup.children.forEach(child => {
        if (child instanceof THREE.Sprite) {
          const worldPos = new THREE.Vector3();
          child.getWorldPosition(worldPos);
          const camDir = camera.position.clone().sub(worldPos).normalize();
          const dot = camDir.dot(new THREE.Vector3(0, 0, 1).applyQuaternion(mainGroup.quaternion));
          const facing = (worldPos.clone().applyQuaternion(mainGroup.quaternion.clone().invert()).z) / R;
          (child.material as THREE.SpriteMaterial).opacity = 0.25 + Math.max(0, facing) * 0.8;
        }
      });

      rings[0].rotation.z += 0.003;
      rings[1].rotation.y += 0.002;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", onResize);
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" />;
}
