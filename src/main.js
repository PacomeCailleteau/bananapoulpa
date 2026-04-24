import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

const SCENE_JSON_PATH = '/assets/banapoulpa/scene.json';
const BANANAPOULPA_GLB_PATH = '/assets/banapoulpa/bananapoulpa.glb';
const BANANAPOULPA_NODE_NAME = 'bananapoulpa.glb';
const LOCKED_CAMERA_VIEW = {
  position: new THREE.Vector3(-3.635, 14.111, 27.972),
  target: new THREE.Vector3(3.479, 15.941, -8.65),
  fov: 55,
  near: 0.1,
  far: 518.036,
};

const hud = document.getElementById('hud');
const captureButton = document.getElementById('capture-camera');
const copyButton = document.getElementById('copy-camera');
const audioButton = document.getElementById('toggle-audio');
const cameraOutput = document.getElementById('camera-output');

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202020);
const fallbackBackground = scene.background;

const fallbackCamera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
fallbackCamera.position.set(0, 1.2, 4);
let activeCamera = fallbackCamera;
let controls = null;
let composer = null;
let renderPass = null;
let bloomPass = null;
let moodLight = null;
let rimLight = null;
const neonLights = [];
const neonTubes = [];
const mixers = [];
const robotAnimations = [];
const smokeSystems = [];
const chemicalLights = [];
const clock = new THREE.Clock();
let smokeTexture = null;
const audioState = {
  context: null,
  master: null,
  humGains: [],
  bubbleGain: null,
  ventGain: null,
  sources: [],
  isEnabled: false,
};

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

// Lumiere de secours pour les JSON qui ne contiennent pas de lights.
scene.add(new THREE.AmbientLight(0xffffff, 0.8));

function setHud(text) {
  if (hud) {
    hud.textContent = text;
  }
}

function setCameraOutput(text) {
  if (cameraOutput) {
    cameraOutput.textContent = text;
  }
}

function setAudioButtonLabel(text) {
  if (audioButton) {
    audioButton.textContent = text;
  }
}

function formatNumber(value) {
  return Number(value.toFixed(3));
}

function getCameraSnapshot() {
  const target = controls?.target ?? new THREE.Vector3();

  return {
    position: {
      x: formatNumber(activeCamera.position.x),
      y: formatNumber(activeCamera.position.y),
      z: formatNumber(activeCamera.position.z),
    },
    target: {
      x: formatNumber(target.x),
      y: formatNumber(target.y),
      z: formatNumber(target.z),
    },
    rotation: {
      x: formatNumber(activeCamera.rotation.x),
      y: formatNumber(activeCamera.rotation.y),
      z: formatNumber(activeCamera.rotation.z),
    },
    fov: formatNumber(activeCamera.fov),
    near: formatNumber(activeCamera.near),
    far: formatNumber(activeCamera.far),
  };
}

function captureCamera() {
  const snapshot = getCameraSnapshot();
  setCameraOutput(JSON.stringify(snapshot, null, 2));
  setHud('Camera capturee. Colle-moi le JSON affiche a droite.');
}

function toObjectLoaderPayload(raw) {
  if (raw?.scene?.object) {
    return raw.scene;
  }

  if (raw?.object) {
    return raw;
  }

  throw new TypeError(
    'JSON incompatible avec ObjectLoader : il faut `object` a la racine, ou un export Editor avec `scene.object`.'
  );
}

function toCameraPayload(raw) {
  if (raw?.camera?.object) {
    return raw.camera;
  }

  return null;
}

function getEditorTarget(raw) {
  const center = raw?.controls?.center;

  if (!Array.isArray(center) || center.length !== 3) {
    return null;
  }

  return new THREE.Vector3(center[0], center[1], center[2]);
}

function applyLockedCameraView(camera) {
  camera.position.copy(LOCKED_CAMERA_VIEW.position);
  camera.fov = LOCKED_CAMERA_VIEW.fov;
  camera.near = LOCKED_CAMERA_VIEW.near;
  camera.far = LOCKED_CAMERA_VIEW.far;
  camera.lookAt(LOCKED_CAMERA_VIEW.target);
  camera.updateProjectionMatrix();
}

function getSceneView(root, editorTarget) {
  const box = new THREE.Box3().setFromObject(root);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());
  const target = (editorTarget ?? center).clone();

  target.x -= size.x * 0.1;
  target.y -= size.y * 0.08;

  return { box, size, center, target };
}

function configureControls(camera, target) {
  controls?.dispose();

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.enablePan = true;
  controls.enableZoom = true;
  controls.target.copy(target);
  controls.screenSpacePanning = true;
  controls.minDistance = 2;
  controls.maxDistance = camera.far * 0.9;
  controls.minPolarAngle = THREE.MathUtils.degToRad(15);
  controls.maxPolarAngle = THREE.MathUtils.degToRad(160);
  controls.update();
}

function setupPostProcessing() {
  composer = new EffectComposer(renderer);
  composer.setSize(window.innerWidth, window.innerHeight);
  composer.setPixelRatio(window.devicePixelRatio);

  renderPass = new RenderPass(scene, activeCamera);
  composer.addPass(renderPass);

  bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    0.48,
    0.26,
    0.74
  );
  composer.addPass(bloomPass);
}

function findAnimatedObjects(root) {
  const animatedObjects = [];

  if (root?.animations?.length) {
    animatedObjects.push(root);
  }

  root?.traverse?.((child) => {
    if (child.animations?.length) {
      animatedObjects.push(child);
    }
  });

  return animatedObjects;
}

function playAnimations(root, raw) {
  const clips = raw?.scene?.animations?.map((clip) => THREE.AnimationClip.parse(clip)) ?? [];

  if (clips.length > 0) {
    const sceneMixer = new THREE.AnimationMixer(root);

    for (const clip of clips) {
      sceneMixer.clipAction(clip).play();
    }

    mixers.push(sceneMixer);
  }

  const animatedObjects = findAnimatedObjects(root);

  for (const object of animatedObjects) {
    const mixer = new THREE.AnimationMixer(object);

    for (const clip of object.animations) {
      mixer.clipAction(clip).play();
    }

    mixers.push(mixer);
  }

  return mixers.length > 0;
}

function setupRobotAnimations(root) {
  robotAnimations.length = 0;

  const robotsGroup = root.getObjectByName('Collada_visual_scene_group');

  if (robotsGroup) {
    robotAnimations.push({
      object: robotsGroup,
      basePosition: robotsGroup.position.clone(),
      baseQuaternion: robotsGroup.quaternion.clone(),
      phase: 0,
      bobAmplitude: 0.06,
      swayAmplitude: THREE.MathUtils.degToRad(4.2),
      rollAmplitude: THREE.MathUtils.degToRad(1.4),
      strideAmplitude: 0.16,
      speed: 1.8,
    });
  }
}

function updateRobotAnimations(elapsedTime) {
  for (const robot of robotAnimations) {
    const t = elapsedTime * robot.speed + robot.phase;
    const bob = Math.sin(t) * robot.bobAmplitude;
    const stride = Math.sin(t) * robot.strideAmplitude;
    const yaw = Math.sin(t * 0.5) * robot.swayAmplitude;
    const roll = Math.cos(t) * robot.rollAmplitude;
    const offsetQuaternion = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(0, yaw, roll)
    );

    robot.object.position.copy(robot.basePosition);
    robot.object.position.y += bob;
    robot.object.position.x += stride;
    robot.object.quaternion.copy(robot.baseQuaternion).multiply(offsetQuaternion);
  }
}

function getSmokeTexture() {
  if (smokeTexture) {
    return smokeTexture;
  }

  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const context = canvas.getContext('2d');
  const gradient = context.createRadialGradient(64, 64, 8, 64, 64, 56);

  gradient.addColorStop(0, 'rgba(255,255,255,0.75)');
  gradient.addColorStop(0.28, 'rgba(210,255,220,0.32)');
  gradient.addColorStop(0.6, 'rgba(140,255,170,0.12)');
  gradient.addColorStop(1, 'rgba(140,255,170,0)');

  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);

  smokeTexture = new THREE.CanvasTexture(canvas);
  return smokeTexture;
}

function setupChemicalAtmosphere(root) {
  for (const light of chemicalLights) {
    scene.remove(light.light);
  }
  chemicalLights.length = 0;

  scene.fog = new THREE.FogExp2(0x7adf8c, 0.0085);

  const configs = [
    { name: 'Liquid', color: 0x63ff8a, intensity: 2.4, distance: 18, yOffset: 2.4, phase: 0 },
    { name: 'Flask1', color: 0x7cff95, intensity: 0.85, distance: 7, yOffset: 1.1, phase: 1.1 },
    { name: 'Flask2', color: 0x7cff95, intensity: 0.8, distance: 7, yOffset: 1.1, phase: 2.4 },
    { name: 'Flask3', color: 0x7cff95, intensity: 0.75, distance: 7, yOffset: 1.1, phase: 3.2 },
  ];

  for (const config of configs) {
    const anchor = root.getObjectByName(config.name);

    if (!anchor) {
      continue;
    }

    const light = new THREE.PointLight(
      config.color,
      config.intensity,
      config.distance,
      2
    );
    scene.add(light);

    chemicalLights.push({
      anchor,
      light,
      baseIntensity: config.intensity,
      yOffset: config.yOffset,
      phase: config.phase,
    });

    anchor.traverse?.((child) => {
      if (!child.isMesh) {
        return;
      }

      const materials = Array.isArray(child.material)
        ? child.material
        : [child.material];

      for (const material of materials) {
        if (!material || !('emissive' in material)) {
          continue;
        }

        material.emissive = new THREE.Color(config.color);
        material.emissiveIntensity = Math.max(
          material.emissiveIntensity ?? 0,
          config.name === 'Liquid' ? 0.34 : 0.08
        );
      }
    });
  }
}

function setupGeneralLighting(root) {
  if (!moodLight) {
    moodLight = new THREE.DirectionalLight(0xdde7ff, 1.15);
    moodLight.castShadow = true;
    moodLight.shadow.mapSize.set(2048, 2048);
    moodLight.shadow.bias = -0.00025;
    moodLight.shadow.normalBias = 0.02;
    moodLight.shadow.camera.near = 1;
    moodLight.shadow.camera.far = 90;
    moodLight.shadow.camera.left = -28;
    moodLight.shadow.camera.right = 28;
    moodLight.shadow.camera.top = 28;
    moodLight.shadow.camera.bottom = -28;
    scene.add(moodLight);
  }

  if (!rimLight) {
    rimLight = new THREE.PointLight(0x8fb8ff, 0.45, 45, 2);
    scene.add(rimLight);
  }

  if (neonLights.length === 0) {
    const neonConfigs = [
      {
        color: 0xe6f7ff,
        intensity: 2.3,
        distance: 44,
        position: new THREE.Vector3(-8.2, 19.1, 4),
        size: new THREE.Vector3(8.5, 0.22, 0.22),
        phase: 0,
        speed: 8.4,
      },
      {
        color: 0xe6f7ff,
        intensity: 2.1,
        distance: 42,
        position: new THREE.Vector3(11.8, 18.7, -10),
        size: new THREE.Vector3(7.5, 0.22, 0.22),
        phase: 1.8,
        speed: 7.6,
      },
    ];

    for (const config of neonConfigs) {
      const light = new THREE.PointLight(
        config.color,
        config.intensity,
        config.distance,
        2
      );
      light.position.copy(config.position);
      scene.add(light);

      const geometry = new THREE.BoxGeometry(
        config.size.x,
        config.size.y,
        config.size.z
      );
      const material = new THREE.MeshStandardMaterial({
        color: 0xd7ecff,
        emissive: new THREE.Color(config.color),
        emissiveIntensity: 4.4,
        roughness: 0.14,
        metalness: 0.08,
      });
      const tube = new THREE.Mesh(geometry, material);
      tube.position.copy(config.position);
      tube.castShadow = false;
      tube.receiveShadow = false;
      scene.add(tube);
      neonTubes.push(tube);

      neonLights.push({
        light,
        material,
        baseIntensity: config.intensity,
        baseEmissiveIntensity: 4.4,
        phase: config.phase,
        speed: config.speed,
      });
    }
  }

  moodLight.position.set(14, 24, 10);
  moodLight.target.position.set(2, 6, -6);
  scene.add(moodLight.target);
  rimLight.position.set(-10, 10, 18);

  root.traverse?.((child) => {
    if (!child.isMesh) {
      return;
    }

    child.castShadow = true;
    child.receiveShadow = true;

    const materials = Array.isArray(child.material)
      ? child.material
      : [child.material];

    for (const material of materials) {
      if (!material) {
        continue;
      }

      if ('roughness' in material) {
        material.roughness = THREE.MathUtils.clamp(material.roughness * 0.92, 0.12, 1);
      }

      if ('metalness' in material) {
        material.metalness = THREE.MathUtils.clamp(material.metalness * 1.08, 0, 1);
      }

      if ('envMapIntensity' in material) {
        material.envMapIntensity = Math.max(material.envMapIntensity ?? 1, 1.15);
      }

      if (/Glass|glass/i.test(child.name) && 'roughness' in material) {
        material.transparent = true;
        material.opacity = Math.min(material.opacity ?? 1, 0.3);
        material.roughness = 0.03;
        if ('metalness' in material) {
          material.metalness = 0.02;
        }
        if ('transmission' in material) {
          material.transmission = Math.max(material.transmission ?? 0, 0.92);
        }
        if ('thickness' in material) {
          material.thickness = Math.max(material.thickness ?? 0, 0.8);
        }
        if ('ior' in material) {
          material.ior = 1.42;
        }
        if ('attenuationDistance' in material) {
          material.attenuationDistance = 1.8;
        }
        if ('attenuationColor' in material) {
          material.attenuationColor = new THREE.Color(0xdff8ff);
        }
      }

      if (/Liquid|Flask|Beaker/i.test(child.name) && 'roughness' in material) {
        material.roughness = Math.min(material.roughness, 0.18);
      }

      if (/Beaker/i.test(child.name) && 'emissiveIntensity' in material) {
        material.emissiveIntensity = Math.min(material.emissiveIntensity ?? 0, 0.025);
      }
    }
  });
}

function createSmokeSystem(anchor, {
  count = 18,
  radius = 0.5,
  height = 2.8,
  drift = 0.35,
  color = 0x6dff8f,
  size = 0.26,
  speed = 0.6,
} = {}) {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const phases = new Float32Array(count);
  const offsets = [];

  for (let i = 0; i < count; i += 1) {
    offsets.push(
      new THREE.Vector3(
        (Math.random() - 0.5) * radius,
        Math.random() * height,
        (Math.random() - 0.5) * radius
      )
    );
    phases[i] = Math.random() * Math.PI * 2;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    color,
    size,
    transparent: true,
    opacity: 0.42,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    map: getSmokeTexture(),
    alphaMap: getSmokeTexture(),
  });

  const points = new THREE.Points(geometry, material);
  points.frustumCulled = false;
  scene.add(points);

  smokeSystems.push({
    anchor,
    points,
    positions,
    offsets,
    phases,
    height,
    drift,
    speed,
    bounds: new THREE.Box3(),
    origin: new THREE.Vector3(),
  });
}

function setupSmoke(root) {
  for (const system of smokeSystems) {
    scene.remove(system.points);
    system.geometry?.dispose?.();
    system.points.geometry.dispose();
    system.points.material.dispose();
  }
  smokeSystems.length = 0;

  const configs = [
    { name: 'Liquid', count: 180, radius: 1.35, height: 5.8, drift: 0.46, size: 0.7, speed: 0.42 },
    { name: 'Flask1', count: 36, radius: 0.28, height: 2.4, drift: 0.16, size: 0.38, speed: 0.54 },
    { name: 'Flask2', count: 36, radius: 0.28, height: 2.4, drift: 0.16, size: 0.38, speed: 0.58 },
    { name: 'Flask3', count: 36, radius: 0.28, height: 2.4, drift: 0.16, size: 0.38, speed: 0.62 },
    { name: 'Beaker1', count: 14, radius: 0.18, height: 1.35, drift: 0.09, size: 0.18, speed: 0.52 },
    { name: 'Beaker2', count: 14, radius: 0.18, height: 1.35, drift: 0.09, size: 0.18, speed: 0.56 },
    { name: 'Beaker3', count: 14, radius: 0.18, height: 1.35, drift: 0.09, size: 0.18, speed: 0.6 },
  ];

  for (const config of configs) {
    const anchor = root.getObjectByName(config.name);

    if (anchor) {
      createSmokeSystem(anchor, config);
    }
  }
}

function updateSmoke(elapsedTime) {
  for (const system of smokeSystems) {
    system.bounds.setFromObject(system.anchor);
    system.bounds.getCenter(system.origin);
    system.origin.y = system.bounds.max.y;

    for (let i = 0; i < system.offsets.length; i += 1) {
      const baseIndex = i * 3;
      const phase = elapsedTime * system.speed + system.phases[i];
      const rise = (elapsedTime * system.speed * 0.32 + i / system.offsets.length) % 1;
      const offset = system.offsets[i];
      const easedRise = Math.pow(rise, 0.82);

      system.positions[baseIndex] =
        system.origin.x +
        offset.x +
        Math.sin(phase) * system.drift * easedRise;
      system.positions[baseIndex + 1] =
        system.origin.y +
        0.18 +
        offset.y * 0.12 +
        easedRise * system.height;
      system.positions[baseIndex + 2] =
        system.origin.z +
        offset.z +
        Math.cos(phase * 0.9) * system.drift * easedRise;
    }

    system.points.geometry.attributes.position.needsUpdate = true;
  }
}

function updateChemicalAtmosphere(elapsedTime) {
  for (const chemicalLight of chemicalLights) {
    const origin = new THREE.Vector3();
    chemicalLight.anchor.getWorldPosition(origin);
    chemicalLight.light.position.set(
      origin.x,
      origin.y + chemicalLight.yOffset,
      origin.z
    );
    chemicalLight.light.intensity =
      chemicalLight.baseIntensity *
      (0.82 + 0.18 * Math.sin(elapsedTime * 1.6 + chemicalLight.phase));
  }
}

function updateNeonLights(elapsedTime) {
  for (const neon of neonLights) {
    const slowPulse = 0.82 + 0.18 * Math.sin(elapsedTime * 0.9 + neon.phase);
    const fastPulse =
      0.84 + 0.16 * Math.sin(elapsedTime * neon.speed + neon.phase * 1.7);
    const glitchSample = Math.sin(elapsedTime * 1.1 + neon.phase);
    let glitch = 1.05;

    if (glitchSample > 0.99) {
      glitch = 0.08;
    } else if (glitchSample > 0.96) {
      glitch = 0.38;
    }

    const intensity = neon.baseIntensity * slowPulse * fastPulse * glitch;
    neon.light.intensity = intensity;

    if (neon.material) {
      neon.material.emissiveIntensity =
        neon.baseEmissiveIntensity * slowPulse * fastPulse * (0.45 + glitch * 0.75);
    }
  }
}

function createLoopingNoiseSource(context) {
  const duration = 2;
  const sampleRate = context.sampleRate;
  const buffer = context.createBuffer(1, duration * sampleRate, sampleRate);
  const channel = buffer.getChannelData(0);

  for (let i = 0; i < channel.length; i += 1) {
    channel[i] = Math.random() * 2 - 1;
  }

  const source = context.createBufferSource();
  source.buffer = buffer;
  source.loop = true;
  return source;
}

function ensureAudioGraph() {
  if (audioState.context) {
    return;
  }

  const AudioContextClass = window.AudioContext || window.webkitAudioContext;

  if (!AudioContextClass) {
    setHud('Audio Web indisponible dans ce navigateur.');
    return;
  }

  const context = new AudioContextClass();
  const master = context.createGain();
  master.gain.value = 0.75;
  master.connect(context.destination);

  const humFrequencies = [98, 196];
  const humGains = [];

  for (const frequency of humFrequencies) {
    const oscillator = context.createOscillator();
    const filter = context.createBiquadFilter();
    const gain = context.createGain();

    oscillator.type = frequency === 98 ? 'sawtooth' : 'triangle';
    oscillator.frequency.value = frequency;
    filter.type = 'lowpass';
    filter.frequency.value = frequency === 98 ? 260 : 420;
    filter.Q.value = 1.2;
    gain.gain.value = frequency === 98 ? 0.12 : 0.06;

    oscillator.connect(filter);
    filter.connect(gain);
    gain.connect(master);
    oscillator.start();
    audioState.sources.push(oscillator);
    humGains.push(gain);
  }

  const ventNoise = createLoopingNoiseSource(context);
  const ventFilter = context.createBiquadFilter();
  const ventGain = context.createGain();
  ventFilter.type = 'bandpass';
  ventFilter.frequency.value = 900;
  ventFilter.Q.value = 0.55;
  ventGain.gain.value = 0.08;
  ventNoise.connect(ventFilter);
  ventFilter.connect(ventGain);
  ventGain.connect(master);
  ventNoise.start();
  audioState.sources.push(ventNoise);

  const bubbleNoise = createLoopingNoiseSource(context);
  const bubbleFilter = context.createBiquadFilter();
  const bubbleGain = context.createGain();
  bubbleFilter.type = 'bandpass';
  bubbleFilter.frequency.value = 1400;
  bubbleFilter.Q.value = 2.8;
  bubbleGain.gain.value = 0.0;
  bubbleNoise.connect(bubbleFilter);
  bubbleFilter.connect(bubbleGain);
  bubbleGain.connect(master);
  bubbleNoise.start();
  audioState.sources.push(bubbleNoise);

  audioState.context = context;
  audioState.master = master;
  audioState.humGains = humGains;
  audioState.ventGain = ventGain;
  audioState.bubbleGain = bubbleGain;
}

async function toggleAudio() {
  ensureAudioGraph();

  if (!audioState.context) {
    return;
  }

  if (audioState.isEnabled) {
    await audioState.context.suspend();
    audioState.isEnabled = false;
    setAudioButtonLabel('Activer audio');
    setHud('Audio coupe. Tu peux le reactiver quand tu veux.');
    return;
  }

  await audioState.context.resume();
  audioState.isEnabled = true;
  setAudioButtonLabel('Couper audio');
  setHud('Ambiance audio du labo activee. Clique aussi dans la scene si le navigateur retarde le son.');
}

function updateAudio(elapsedTime) {
  if (!audioState.isEnabled || !audioState.context) {
    return;
  }

  const [lowHum, highHum] = audioState.humGains;

  if (lowHum) {
    lowHum.gain.value = 0.11 + 0.04 * (0.5 + 0.5 * Math.sin(elapsedTime * 0.34));
  }

  if (highHum) {
    highHum.gain.value = 0.05 + 0.022 * (0.5 + 0.5 * Math.sin(elapsedTime * 0.61 + 1.7));
  }

  if (audioState.ventGain) {
    audioState.ventGain.gain.value =
      0.06 + 0.025 * (0.5 + 0.5 * Math.sin(elapsedTime * 0.22 + 0.8));
  }

  if (audioState.bubbleGain) {
    const bubblePulse =
      Math.max(0, Math.sin(elapsedTime * 2.2)) * 0.045 +
      Math.max(0, Math.sin(elapsedTime * 3.6 + 1.4)) * 0.03;
    audioState.bubbleGain.gain.value = 0.018 + bubblePulse;
  }
}

async function replaceWithAnimatedGlb(root) {
  const placeholder = root.getObjectByName(BANANAPOULPA_NODE_NAME);

  if (!placeholder?.parent) {
    return false;
  }

  const loader = new GLTFLoader();
  const gltf = await loader.loadAsync(BANANAPOULPA_GLB_PATH);
  const animatedRoot = gltf.scene;

  animatedRoot.name = BANANAPOULPA_NODE_NAME;
  animatedRoot.matrixAutoUpdate = false;

  const baseMatrix = placeholder.matrix.clone();
  const rotationOffset = new THREE.Matrix4().makeRotationY(
    THREE.MathUtils.degToRad(40)
  );
  const pitchOffset = new THREE.Matrix4().makeRotationX(
    THREE.MathUtils.degToRad(-7)
  );
  const tiltOffset = new THREE.Matrix4().makeRotationZ(
    THREE.MathUtils.degToRad(-3)
  );
  animatedRoot.matrix.copy(
    baseMatrix.multiply(rotationOffset).multiply(pitchOffset).multiply(tiltOffset)
  );
  animatedRoot.matrixWorldNeedsUpdate = true;

  animatedRoot.traverse((child) => {
    if (!child.isMesh) {
      return;
    }

    const materials = Array.isArray(child.material)
      ? child.material
      : [child.material];
    const childName = child.name.toLowerCase();

    for (const material of materials) {
      if (!material) {
        continue;
      }

      const materialName = material.name?.toLowerCase?.() ?? '';
      const childWorldY = child.getWorldPosition(new THREE.Vector3()).y;
      const isBodyLike =
        /body|head|torso|core|banana/.test(childName) ||
        /body|head|torso|core|banana/.test(materialName);
      const isTentacleLike =
        /tentacle|arm|limb|sucker|appendage/.test(childName) ||
        /tentacle|arm|limb|sucker|appendage/.test(materialName) ||
        (!isBodyLike && childWorldY < 2.2);

      if ('roughness' in material) {
        material.roughness = isTentacleLike
          ? Math.max(material.roughness ?? 0, 0.94)
          : Math.max(material.roughness ?? 0, 0.62);
      }

      if ('metalness' in material) {
        material.metalness = isTentacleLike
          ? Math.min(material.metalness ?? 0, 0.0)
          : Math.min(material.metalness ?? 0, 0.03);
      }

      if ('envMapIntensity' in material) {
        material.envMapIntensity = isTentacleLike
          ? Math.min(material.envMapIntensity ?? 1, 0.04)
          : Math.min(material.envMapIntensity ?? 1, 0.18);
      }

      if ('clearcoat' in material) {
        material.clearcoat = isTentacleLike ? 0 : Math.min(material.clearcoat ?? 0, 0.08);
      }

      if ('clearcoatRoughness' in material) {
        material.clearcoatRoughness = isTentacleLike ? 1 : Math.max(material.clearcoatRoughness ?? 0, 0.6);
      }
    }
  });

  const parent = placeholder.parent;
  const insertIndex = parent.children.indexOf(placeholder);
  parent.remove(placeholder);
  parent.add(animatedRoot);

  if (insertIndex >= 0) {
    parent.children.splice(parent.children.indexOf(animatedRoot), 1);
    parent.children.splice(insertIndex, 0, animatedRoot);
  }

  if (gltf.animations.length > 0) {
    const mixer = new THREE.AnimationMixer(animatedRoot);

    for (const clip of gltf.animations) {
      const action = mixer.clipAction(clip);
      action.setLoop(THREE.LoopRepeat, Infinity);
      action.play();
    }

    mixers.push(mixer);
  }

  return true;
}

function mergeLoadedRootIntoScene(target, loaded) {
  if (loaded instanceof THREE.Scene) {
    target.background = loaded.background ?? fallbackBackground;

    if (loaded.environment !== null && loaded.environment !== undefined) {
      target.environment = loaded.environment;
    }

    if (loaded.fog !== null && loaded.fog !== undefined) {
      target.fog = loaded.fog;
    }

    while (loaded.children.length > 0) {
      target.add(loaded.children[0]);
    }

    return;
  }

  target.add(loaded);
}

async function loadEditorJson() {
  const loader = new THREE.ObjectLoader();
  const response = await fetch(SCENE_JSON_PATH);

  if (!response.ok) {
    throw new Error(
      `Impossible de charger ${SCENE_JSON_PATH} (${response.status}).`
    );
  }

  const raw = await response.json();
  mixers.length = 0;
  const cameraPayload = toCameraPayload(raw);
  const editorTarget = getEditorTarget(raw);
  const payload = toObjectLoaderPayload(raw);
  const root =
    typeof loader.parseAsync === 'function'
      ? await loader.parseAsync(payload)
      : loader.parse(payload);

  await replaceWithAnimatedGlb(root);
  setupGeneralLighting(root);
  setupRobotAnimations(root);
  setupSmoke(root);
  setupChemicalAtmosphere(root);
  mergeLoadedRootIntoScene(scene, root);

  if (cameraPayload) {
    const loadedCamera =
      typeof loader.parseAsync === 'function'
        ? await loader.parseAsync(cameraPayload)
        : loader.parse(cameraPayload);

    if (loadedCamera?.isCamera) {
      loadedCamera.aspect = window.innerWidth / window.innerHeight;
      loadedCamera.updateProjectionMatrix();
      activeCamera = loadedCamera;
    }
  }

  const { size } = getSceneView(scene, editorTarget);
  activeCamera.far = Math.max(LOCKED_CAMERA_VIEW.far, size.length() * 6);
  applyLockedCameraView(activeCamera);

  const controlsTarget = LOCKED_CAMERA_VIEW.target.clone();
  configureControls(activeCamera, controlsTarget);
  renderPass.camera = activeCamera;

  const hasAnimations = playAnimations(root, raw);
  setHud(
    hasAnimations
      ? 'banapoulpa pret: JSON charge, animations actives, camera verticale OK.'
      : 'banapoulpa pret: JSON charge, animations introuvables, camera verticale OK.'
  );
}

loadEditorJson().catch((error) => {
  console.error(error);
  setHud('Erreur de chargement JSON. Verifie le chemin et le format du fichier.');
});

setupPostProcessing();

captureButton?.addEventListener('click', captureCamera);

copyButton?.addEventListener('click', async () => {
  const text = cameraOutput?.textContent ?? '';

  if (!text || text === 'Aucune capture pour le moment.') {
    captureCamera();
  }

  try {
    await navigator.clipboard.writeText(cameraOutput?.textContent ?? '');
    setHud('Capture copiee dans le presse-papiers.');
  } catch (error) {
    console.error(error);
    setHud('Copie impossible automatiquement. Colle-moi le JSON a droite.');
  }
});

audioButton?.addEventListener('click', () => {
  toggleAudio().catch((error) => {
    console.error(error);
    setHud('Activation audio impossible.');
  });
});

renderer.domElement.addEventListener('pointerdown', () => {
  if (!audioState.isEnabled) {
    toggleAudio().catch((error) => {
      console.error(error);
    });
  }
}, { once: true });

window.addEventListener('resize', () => {
  activeCamera.aspect = window.innerWidth / window.innerHeight;
  activeCamera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  composer?.setSize(window.innerWidth, window.innerHeight);
  bloomPass?.setSize(window.innerWidth, window.innerHeight);
  controls?.update();
});

function animate() {
  requestAnimationFrame(animate);
  const delta = clock.getDelta();
  const elapsedTime = clock.elapsedTime;

  for (const mixer of mixers) {
    mixer.update(delta);
  }

  updateRobotAnimations(elapsedTime);
  updateSmoke(elapsedTime);
  updateChemicalAtmosphere(elapsedTime);
  updateNeonLights(elapsedTime);
  updateAudio(elapsedTime);
  controls?.update();
  composer?.render();
}

animate();
