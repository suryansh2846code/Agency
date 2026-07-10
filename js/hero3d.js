// ============================================================
//  BRANDNAME — Hero 3D scene (Three.js)
//  A mouse-reactive, slowly rotating crystal + particle field,
//  themed to the brand gradient. Loaded as an ES module.
//  Respects prefers-reduced-motion and pauses when tab hidden.
// ============================================================
import * as THREE from 'three';

const mount = document.getElementById('hero3d');
if (mount) initHero3D(mount);

function initHero3D(mount) {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // --- Brand colors (kept in sync with css :root) ---
  const BRAND   = new THREE.Color('#6c5ce7');
  const BRAND_2 = new THREE.Color('#00d4b8');
  const ACCENT  = new THREE.Color('#ff7a59');

  // --- Renderer ---
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(mount.clientWidth, mount.clientHeight);
  mount.appendChild(renderer.domElement);

  // --- Scene & camera ---
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    45, mount.clientWidth / mount.clientHeight, 0.1, 100
  );
  camera.position.set(0, 0, 6);

  // --- Central crystal: solid core + wireframe shell ---
  const group = new THREE.Group();
  scene.add(group);

  const geo = new THREE.IcosahedronGeometry(1.6, 1);

  const core = new THREE.Mesh(
    geo,
    new THREE.MeshStandardMaterial({
      color: BRAND,
      roughness: 0.25,
      metalness: 0.6,
      flatShading: true,
    })
  );
  group.add(core);

  const shell = new THREE.LineSegments(
    new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(1.95, 1)),
    new THREE.LineBasicMaterial({ color: BRAND_2, transparent: true, opacity: 0.35 })
  );
  group.add(shell);

  // --- Particle field ---
  const COUNT = 700;
  const positions = new Float32Array(COUNT * 3);
  const colors = new Float32Array(COUNT * 3);
  for (let i = 0; i < COUNT; i++) {
    const r = 4 + Math.random() * 7;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
    const c = Math.random() < 0.5 ? BRAND_2 : (Math.random() < 0.5 ? BRAND : ACCENT);
    colors[i * 3] = c.r; colors[i * 3 + 1] = c.g; colors[i * 3 + 2] = c.b;
  }
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  pGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  const particles = new THREE.Points(
    pGeo,
    new THREE.PointsMaterial({ size: 0.05, vertexColors: true, transparent: true, opacity: 0.85 })
  );
  scene.add(particles);

  // --- Lights ---
  scene.add(new THREE.AmbientLight(0xffffff, 0.5));
  const key = new THREE.PointLight(0xffffff, 60, 100);
  key.position.set(5, 6, 8);
  scene.add(key);
  const rim = new THREE.PointLight(BRAND_2, 40, 100);
  rim.position.set(-6, -3, 4);
  scene.add(rim);

  // --- Mouse parallax ---
  const target = { x: 0, y: 0 };
  window.addEventListener('pointermove', (e) => {
    target.x = (e.clientX / window.innerWidth - 0.5) * 2;
    target.y = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  // --- Resize ---
  function resize() {
    const w = mount.clientWidth, h = mount.clientHeight;
    if (!w || !h) return;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }
  window.addEventListener('resize', resize);

  // --- Pause when tab hidden ---
  let running = true;
  document.addEventListener('visibilitychange', () => {
    running = !document.hidden;
    if (running) loop();
  });

  // --- Animation loop ---
  const clock = new THREE.Clock();
  function loop() {
    if (!running) return;
    requestAnimationFrame(loop);
    const t = clock.getElapsedTime();

    if (!reduceMotion) {
      group.rotation.y = t * 0.25;
      group.rotation.x = Math.sin(t * 0.3) * 0.2;
      particles.rotation.y = t * 0.04;
    }
    // Ease camera toward mouse for subtle parallax
    camera.position.x += (target.x * 0.8 - camera.position.x) * 0.05;
    camera.position.y += (-target.y * 0.6 - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
  }
  loop();
}
