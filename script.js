/**
 * AYESHA NIKHATH S - PORTFOLIO INTERACTIVE CORE
 * Features:
 * - Neural particle canvas background
 * - Dynamic typewriter effect
 * - Interactive AI & Data Lab (3D SMPL simulator & dynamic SQL/EDA chart renderer)
 * - Skills category filtering
 * - Project deep-dive modals
 * - Quick copy-to-clipboard & toast notification system
 * - Form validation and smooth scroll spy
 */

document.addEventListener('DOMContentLoaded', () => {
  initNeuralCanvas();
  initTypewriter();
  initSkillsFilter();
  initInteractiveLab();
  initModals();
  initClipboardAndToasts();
  initContactForm();
  initNavigation();
});

/* ==========================================================================
   1. NEURAL PARTICLE CANVAS BACKGROUND
   ========================================================================== */
function initNeuralCanvas() {
  const canvas = document.getElementById('neural-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const particles = [];
  const particleCount = Math.min(Math.floor((width * height) / 16000), 75);
  const maxDistance = 140;

  let mouse = { x: null, y: null, radius: 150 };

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.8;
      this.vy = (Math.random() - 0.5) * 0.8;
      this.radius = Math.random() * 2 + 1.2;
      this.color = Math.random() > 0.4 ? '#00f2fe' : '#7f00ff';
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse interactivity
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.hypot(dx, dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= (dx / dist) * force * 2;
          this.y -= (dy / dist) * force * 2;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 8;
      ctx.shadowColor = this.color;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.hypot(dx, dy);

        if (dist < maxDistance) {
          const alpha = 1 - dist / maxDistance;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 242, 254, ${alpha * 0.25})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   2. TYPEWRITER ANIMATION
   ========================================================================== */
function initTypewriter() {
  const element = document.getElementById('typewriter-text');
  if (!element) return;

  const roles = [
    'Data Analyst & AI/ML Professional',
    '2D-to-3D Human Reconstruction & SMPL Meshes',
    'Computer Vision & OpenCV Frame Pipelines',
    'GAN-Based Virtual Try-On Architectures',
    'SQL Backend Analytics & ERP Validation',
    'Power BI & Tableau KPI Dashboards'
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let delay = 100;

  function tick() {
    const current = roles[roleIdx];

    if (isDeleting) {
      element.textContent = current.substring(0, charIdx - 1);
      charIdx--;
      delay = 40;
    } else {
      element.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      delay = 85;
    }

    if (!isDeleting && charIdx === current.length) {
      isDeleting = true;
      delay = 1800; // Pause at end of text
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      delay = 400;
    }

    setTimeout(tick, delay);
  }

  tick();
}

/* ==========================================================================
   3. SKILLS CATEGORY FILTERING
   ========================================================================== */
function initSkillsFilter() {
  const filterBtns = document.querySelectorAll('.skills-filter-tabs .filter-btn');
  const skillCards = document.querySelectorAll('.skills-grid .skill-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      skillCards.forEach((card) => {
        const categories = card.getAttribute('data-category') || '';
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* ==========================================================================
   4. INTERACTIVE AI & DATA LAB (SIMULATIONS & CHARTING)
   ========================================================================== */
function initInteractiveLab() {
  // Lab Tab Navigation
  const tabBtns = document.querySelectorAll('.lab-tab-btn');
  const tabContents = document.querySelectorAll('.lab-tab-content');

  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      tabBtns.forEach((b) => b.classList.remove('active'));
      tabContents.forEach((c) => c.classList.remove('active'));

      btn.classList.add('active');
      const targetId = btn.getAttribute('data-tab');
      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        targetContent.classList.add('active');
      }

      if (targetId === 'tab-analytics') {
        renderAnalyticsChart();
      }
    });
  });

  // Simulator 1: 3D Body & Try-on Canvas
  initTryonSimulator();

  // Simulator 2: Interactive SQL & EDA Sandbox
  initSqlSandbox();
}

/* --- 3D TRY-ON SIMULATOR CANVAS --- */
function initTryonSimulator() {
  const canvas = document.getElementById('tryon-simulator-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let activeLayer = 'wireframe';
  let activePose = 'a-pose';
  let activeGarment = 'cyber-jacket';
  let meshDensity = 6890;
  let angle = 0;
  let isScanning = false;

  const poseSelect = document.getElementById('pose-select');
  const garmentSelect = document.getElementById('garment-select');
  const densitySlider = document.getElementById('mesh-density-slider');
  const densityVal = document.getElementById('mesh-density-val');
  const runBtn = document.getElementById('run-inference-btn');
  const layerBtns = document.querySelectorAll('.layer-btn');
  const overlayMsg = document.getElementById('simulator-overlay-msg');
  const hudStatus = document.getElementById('hud-status');
  const hudLatency = document.getElementById('hud-latency');
  const hudAcc = document.getElementById('hud-acc');

  // Anthropometry labels
  const metricHeight = document.getElementById('metric-height');
  const metricChest = document.getElementById('metric-chest');
  const metricWaist = document.getElementById('metric-waist');
  const metricSize = document.getElementById('metric-size');

  layerBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      layerBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      activeLayer = btn.getAttribute('data-layer');
    });
  });

  if (densitySlider && densityVal) {
    densitySlider.addEventListener('input', (e) => {
      meshDensity = parseInt(e.target.value);
      densityVal.textContent = meshDensity.toLocaleString() + ' vertices';
    });
  }

  if (poseSelect) {
    poseSelect.addEventListener('change', (e) => {
      activePose = e.target.value;
      updateAnthropometrics();
    });
  }

  if (garmentSelect) {
    garmentSelect.addEventListener('change', (e) => {
      activeGarment = e.target.value;
    });
  }

  if (runBtn) {
    runBtn.addEventListener('click', () => {
      if (isScanning) return;
      isScanning = true;
      if (overlayMsg) overlayMsg.style.display = 'flex';
      if (hudStatus) hudStatus.textContent = 'STATUS: Deep Learning Inference in Progress...';

      setTimeout(() => {
        isScanning = false;
        if (overlayMsg) overlayMsg.style.display = 'none';
        if (hudStatus) hudStatus.textContent = 'MODEL: SMPL-X & GAN Try-On Converged';
        if (hudLatency) hudLatency.textContent = `Latency: ${(14 + Math.random() * 5).toFixed(1)} ms`;
        if (hudAcc) hudAcc.textContent = `IoU Score: ${(0.94 + Math.random() * 0.05).toFixed(3)}`;
        showToast('Model inference completed! 3D body reconstructed and garment synthesized.', 'success');
      }, 1200);
    });
  }

  function updateAnthropometrics() {
    if (activePose === 'a-pose') {
      if (metricHeight) metricHeight.textContent = '168.4 cm';
      if (metricChest) metricChest.textContent = '92.1 cm';
      if (metricWaist) metricWaist.textContent = '74.6 cm';
      if (metricSize) metricSize.textContent = 'Medium (M-Regular)';
    } else if (activePose === 't-pose') {
      if (metricHeight) metricHeight.textContent = '172.0 cm';
      if (metricChest) metricChest.textContent = '94.8 cm';
      if (metricWaist) metricWaist.textContent = '76.2 cm';
      if (metricSize) metricSize.textContent = 'Large (L-Athletic)';
    } else if (activePose === 'fashion-walk') {
      if (metricHeight) metricHeight.textContent = '175.2 cm';
      if (metricChest) metricChest.textContent = '89.5 cm';
      if (metricWaist) metricWaist.textContent = '71.0 cm';
      if (metricSize) metricSize.textContent = 'Small-Tall (S-Slim)';
    } else {
      if (metricHeight) metricHeight.textContent = '166.0 cm';
      if (metricChest) metricChest.textContent = '91.2 cm';
      if (metricWaist) metricWaist.textContent = '75.0 cm';
      if (metricSize) metricSize.textContent = 'Standard (Regular)';
    }
  }

  // Draw 3D Parametric Human Figure
  function drawSimulator() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background cyber grid
    ctx.strokeStyle = 'rgba(0, 242, 254, 0.05)';
    ctx.lineWidth = 1;
    for (let x = 0; x < canvas.width; x += 30) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += 30) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    angle += 0.015;
    const cx = canvas.width / 2;
    const cy = canvas.height / 2 + 30;
    const rotX = Math.sin(angle) * 20;

    // Define Joint Positions based on pose
    let joints = {};
    if (activePose === 't-pose') {
      joints = {
        head: { x: cx + rotX * 0.3, y: cy - 170 },
        neck: { x: cx + rotX * 0.25, y: cy - 130 },
        lShoulder: { x: cx - 110 + rotX * 0.5, y: cy - 130 },
        rShoulder: { x: cx + 110 + rotX * 0.5, y: cy - 130 },
        lElbow: { x: cx - 180 + rotX * 0.7, y: cy - 130 },
        rElbow: { x: cx + 180 + rotX * 0.7, y: cy - 130 },
        lWrist: { x: cx - 240 + rotX * 0.8, y: cy - 130 },
        rWrist: { x: cx + 240 + rotX * 0.8, y: cy - 130 },
        chest: { x: cx + rotX * 0.3, y: cy - 80 },
        waist: { x: cx + rotX * 0.2, y: cy - 20 },
        lHip: { x: cx - 45 + rotX * 0.2, y: cy + 30 },
        rHip: { x: cx + 45 + rotX * 0.2, y: cy + 30 },
        lKnee: { x: cx - 50 + rotX * 0.1, y: cy + 110 },
        rKnee: { x: cx + 50 + rotX * 0.1, y: cy + 110 },
        lAnkle: { x: cx - 50, y: cy + 180 },
        rAnkle: { x: cx + 50, y: cy + 180 }
      };
    } else {
      // Default A-Pose
      joints = {
        head: { x: cx + rotX * 0.3, y: cy - 170 },
        neck: { x: cx + rotX * 0.25, y: cy - 130 },
        lShoulder: { x: cx - 75 + rotX * 0.5, y: cy - 120 },
        rShoulder: { x: cx + 75 + rotX * 0.5, y: cy - 120 },
        lElbow: { x: cx - 115 + rotX * 0.6, y: cy - 50 },
        rElbow: { x: cx + 115 + rotX * 0.6, y: cy - 50 },
        lWrist: { x: cx - 140 + rotX * 0.7, y: cy + 20 },
        rWrist: { x: cx + 140 + rotX * 0.7, y: cy + 20 },
        chest: { x: cx + rotX * 0.3, y: cy - 75 },
        waist: { x: cx + rotX * 0.2, y: cy - 20 },
        lHip: { x: cx - 45 + rotX * 0.2, y: cy + 30 },
        rHip: { x: cx + 45 + rotX * 0.2, y: cy + 30 },
        lKnee: { x: cx - 60 + rotX * 0.1, y: cy + 110 },
        rKnee: { x: cx + 60 + rotX * 0.1, y: cy + 110 },
        lAnkle: { x: cx - 65, y: cy + 180 },
        rAnkle: { x: cx + 65, y: cy + 180 }
      };
    }

    // DRAW SELECTED LAYER
    if (activeLayer === 'keypoints') {
      // Draw Skeleton Bones
      const bones = [
        ['head', 'neck'],
        ['neck', 'chest'],
        ['chest', 'waist'],
        ['neck', 'lShoulder'],
        ['neck', 'rShoulder'],
        ['lShoulder', 'lElbow'],
        ['rShoulder', 'rElbow'],
        ['lElbow', 'lWrist'],
        ['rElbow', 'rWrist'],
        ['waist', 'lHip'],
        ['waist', 'rHip'],
        ['lHip', 'lKnee'],
        ['rHip', 'rKnee'],
        ['lKnee', 'lAnkle'],
        ['rKnee', 'rAnkle']
      ];

      ctx.lineWidth = 4;
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#00f2fe';

      bones.forEach(([j1, j2]) => {
        ctx.beginPath();
        ctx.moveTo(joints[j1].x, joints[j1].y);
        ctx.lineTo(joints[j2].x, joints[j2].y);
        ctx.strokeStyle = j1.includes('l') || j2.includes('l') ? '#00f2fe' : '#b784ff';
        ctx.stroke();
      });

      // Keypoint nodes
      Object.keys(joints).forEach((k) => {
        const pt = joints[k];
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 6, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#00f2fe';
        ctx.stroke();

        // Label
        ctx.font = '9px "JetBrains Mono"';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.fillText(k, pt.x + 8, pt.y + 3);
      });
      ctx.shadowBlur = 0;

    } else if (activeLayer === 'wireframe') {
      // 3D SMPL Parametric Mesh Wireframe
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(0, 242, 254, 0.6)';

      const densityStep = meshDensity > 10000 ? 8 : meshDensity > 5000 ? 14 : 20;

      // Draw head mesh
      for (let r = 5; r <= 30; r += densityStep / 2) {
        ctx.beginPath();
        ctx.arc(joints.head.x, joints.head.y, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Draw torso contour & wireframe triangles
      const torsoPts = [
        joints.neck,
        joints.lShoulder,
        joints.chest,
        joints.rShoulder,
        joints.waist,
        joints.lHip,
        joints.rHip
      ];

      for (let i = 0; i < torsoPts.length; i++) {
        for (let j = i + 1; j < torsoPts.length; j++) {
          ctx.beginPath();
          ctx.moveTo(torsoPts[i].x, torsoPts[i].y);
          ctx.lineTo(torsoPts[j].x, torsoPts[j].y);
          ctx.stroke();
        }
      }

      // Limbs wireframe tubes
      const drawLimbMesh = (p1, p2, radius) => {
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const len = Math.hypot(dx, dy);
        const steps = Math.floor(len / densityStep);

        for (let s = 0; s <= steps; s++) {
          const t = s / steps;
          const mx = p1.x + dx * t;
          const my = p1.y + dy * t;
          ctx.beginPath();
          ctx.ellipse(mx, my, radius, radius * 0.4, angle, 0, Math.PI * 2);
          ctx.stroke();
        }
      };

      drawLimbMesh(joints.lShoulder, joints.lElbow, 12);
      drawLimbMesh(joints.rShoulder, joints.rElbow, 12);
      drawLimbMesh(joints.lElbow, joints.lWrist, 9);
      drawLimbMesh(joints.rElbow, joints.rWrist, 9);
      drawLimbMesh(joints.lHip, joints.lKnee, 18);
      drawLimbMesh(joints.rHip, joints.rKnee, 18);
      drawLimbMesh(joints.lKnee, joints.lAnkle, 14);
      drawLimbMesh(joints.rKnee, joints.rAnkle, 14);

    } else if (activeLayer === 'gan') {
      // GAN Apparel Synthesis Layer
      // Body silhouette
      ctx.fillStyle = 'rgba(23, 33, 54, 0.7)';
      ctx.strokeStyle = 'rgba(0, 242, 254, 0.4)';
      ctx.lineWidth = 2;

      // Head
      ctx.beginPath();
      ctx.arc(joints.head.x, joints.head.y, 28, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Synthesized Garment Mesh
      let garmentGrad;
      if (activeGarment === 'cyber-jacket') {
        garmentGrad = ctx.createLinearGradient(joints.neck.x - 80, joints.neck.y, joints.waist.x + 80, joints.waist.y);
        garmentGrad.addColorStop(0, '#00f2fe');
        garmentGrad.addColorStop(0.5, '#7f00ff');
        garmentGrad.addColorStop(1, '#00c6ff');
      } else if (activeGarment === 'business-suit') {
        garmentGrad = ctx.createLinearGradient(joints.neck.x, joints.neck.y, joints.waist.x, joints.waist.y);
        garmentGrad.addColorStop(0, '#2b394e');
        garmentGrad.addColorStop(1, '#151d28');
      } else if (activeGarment === 'athleisure') {
        garmentGrad = ctx.createLinearGradient(joints.neck.x, joints.neck.y, joints.waist.x, joints.waist.y);
        garmentGrad.addColorStop(0, '#00f5a0');
        garmentGrad.addColorStop(1, '#0072ff');
      } else {
        garmentGrad = ctx.createLinearGradient(joints.neck.x, joints.neck.y, joints.waist.x, joints.waist.y);
        garmentGrad.addColorStop(0, '#ff007f');
        garmentGrad.addColorStop(1, '#7f00ff');
      }

      // Torso Jacket / Cloth
      ctx.fillStyle = garmentGrad;
      ctx.beginPath();
      ctx.moveTo(joints.neck.x, joints.neck.y - 10);
      ctx.lineTo(joints.rShoulder.x + 20, joints.rShoulder.y);
      ctx.lineTo(joints.rElbow.x + 15, joints.rElbow.y);
      ctx.lineTo(joints.waist.x + 55, joints.waist.y + 15);
      ctx.lineTo(joints.waist.x - 55, joints.waist.y + 15);
      ctx.lineTo(joints.lElbow.x - 15, joints.lElbow.y);
      ctx.lineTo(joints.lShoulder.x - 20, joints.lShoulder.y);
      ctx.closePath();
      ctx.fill();

      // High-tech seams
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Zipper line
      ctx.strokeStyle = '#00f2fe';
      ctx.beginPath();
      ctx.moveTo(joints.neck.x, joints.neck.y);
      ctx.lineTo(joints.waist.x, joints.waist.y + 15);
      ctx.stroke();

      // Lower limbs pants
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.moveTo(joints.waist.x - 50, joints.waist.y + 15);
      ctx.lineTo(joints.lAnkle.x - 15, joints.lAnkle.y);
      ctx.lineTo(joints.lAnkle.x + 15, joints.lAnkle.y);
      ctx.lineTo(joints.waist.x, joints.waist.y + 40);
      ctx.lineTo(joints.rAnkle.x - 15, joints.rAnkle.y);
      ctx.lineTo(joints.rAnkle.x + 15, joints.rAnkle.y);
      ctx.lineTo(joints.waist.x + 50, joints.waist.y + 15);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.stroke();
    }

    requestAnimationFrame(drawSimulator);
  }

  drawSimulator();
}

/* --- INTERACTIVE SQL & EDA ANALYTICS SANDBOX --- */
let activeChartType = 'bar';
let activeScenario = 'edtech-kpi';

const queryDataScenarios = {
  'edtech-kpi': {
    title: 'EdTech User Onboarding & Retention Trajectory',
    sql: `SELECT 
  DATE_TRUNC('month', created_at) AS month,
  COUNT(DISTINCT student_id) AS active_students,
  ROUND(AVG(completion_rate), 2) AS avg_completion_pct,
  SUM(CASE WHEN status = 'churned' THEN 1 ELSE 0 END) AS churn_count
FROM edtech_erp_platform.user_events
GROUP BY 1 ORDER BY 1 ASC;`,
    records: '124,580 rows',
    time: '42 ms (Indexed)',
    completeness: '99.8%',
    outliers: '14 flagged',
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    values: [4200, 5800, 7100, 8900, 11400, 14200, 16800, 19500],
    secondary: [320, 290, 240, 210, 180, 150, 130, 110], // Churn count
    insight:
      'Analysis reveals a steady 4.6x scaling in active monthly learners, with user churn decreasing by 65% post-implementation of proactive automated support workflows.'
  },
  'erp-validation': {
    title: 'ERP Backend Transaction Audit & Resolution Times',
    sql: `SELECT 
  module_name,
  COUNT(ticket_id) AS total_incidents,
  ROUND(AVG(EXTRACT(EPOCH FROM (resolved_at - created_at))/3600), 2) AS avg_sla_hours,
  SUM(CASE WHEN validation_passed THEN 1 ELSE 0 END) * 100.0 / COUNT(*) AS integrity_rate
FROM institutional_erp.transaction_logs
WHERE created_at >= NOW() - INTERVAL '90 days'
GROUP BY 1 ORDER BY 2 DESC;`,
    records: '84,920 rows',
    time: '28 ms (Indexed)',
    completeness: '100.0%',
    outliers: '3 flagged',
    labels: ['Fee Mgmt', 'Exam Portal', 'Attendance', 'Enrollment', 'Staff DB', 'LMS Sync'],
    values: [98.2, 99.4, 99.9, 97.8, 99.6, 98.9],
    secondary: [1.2, 0.8, 0.4, 1.8, 0.6, 1.1], // SLA hours
    insight:
      'SQL data audit verifies 99.3% average transactional accuracy across institution ERP modules, while root-cause triage reduced peak resolution SLA to 1.1 hours.'
  },
  'cv-benchmarks': {
    title: 'Computer Vision: Loss Convergence & IoU Benchmarks',
    sql: `SELECT 
  epoch,
  ROUND(train_loss::numeric, 4) AS train_loss,
  ROUND(val_loss::numeric, 4) AS val_loss,
  ROUND(iou_score::numeric, 4) AS mean_iou
FROM ml_pipeline.smpl_reconstruction_experiments
WHERE model_arch = 'CNN_SMPL_v3_PyTorch'
ORDER BY epoch ASC;`,
    records: '5,000 checkpoints',
    time: '18 ms',
    completeness: '99.9%',
    outliers: '0 flagged',
    labels: ['Ep 5', 'Ep 10', 'Ep 15', 'Ep 20', 'Ep 25', 'Ep 30', 'Ep 40', 'Ep 50'],
    values: [71.2, 78.4, 84.5, 88.9, 92.4, 95.1, 97.4, 98.6], // IoU %
    secondary: [0.82, 0.54, 0.38, 0.25, 0.16, 0.11, 0.08, 0.05], // Loss
    insight:
      'PyTorch deep learning pipeline achieves convergence at epoch 40, plateauing at 98.6% mean intersection-over-union (IoU) on multi-view human datasets.'
  },
  'regional-sales': {
    title: 'Business Intelligence: Regional Performance & Expansion',
    sql: `SELECT 
  territory,
  SUM(contract_value_inr) / 1000000 AS revenue_millions,
  COUNT(DISTINCT institution_id) AS partner_count,
  ROUND(AVG(satisfaction_nps), 1) AS nps_score
FROM edtech_sales.regional_metrics
GROUP BY 1 ORDER BY 2 DESC;`,
    records: '15,200 rows',
    time: '34 ms',
    completeness: '99.4%',
    outliers: '5 flagged',
    labels: ['South Hub', 'West Reg', 'North Hub', 'East Reg', 'Central'],
    values: [64.5, 48.2, 42.0, 31.8, 25.4],
    secondary: [88, 82, 79, 74, 80],
    insight:
      'Data modeling highlights South & West regional hubs generating 68% of enterprise EdTech adoption, with customer NPS holding strong at 82.6.'
  }
};

function initSqlSandbox() {
  const queryPreset = document.getElementById('query-preset');
  const sqlCodeDisplay = document.getElementById('sql-code-display');
  const executeBtn = document.getElementById('execute-sql-btn');
  const copySqlBtn = document.getElementById('copy-sql-btn');
  const chartTypeBtns = document.querySelectorAll('.chart-type-btn');

  const statRecords = document.getElementById('stat-records');
  const statTime = document.getElementById('stat-time');
  const statCompleteness = document.getElementById('stat-completeness');
  const statOutliers = document.getElementById('stat-outliers');
  const chartTitle = document.getElementById('analytics-chart-title');
  const insightText = document.getElementById('analytics-insight-text');

  function updateScenario(key) {
    activeScenario = key;
    const scenario = queryDataScenarios[key];
    if (!scenario) return;

    if (sqlCodeDisplay) sqlCodeDisplay.textContent = scenario.sql;
    if (chartTitle) chartTitle.textContent = scenario.title;
    if (statRecords) statRecords.textContent = scenario.records;
    if (statTime) statTime.textContent = scenario.time;
    if (statCompleteness) statCompleteness.textContent = scenario.completeness;
    if (statOutliers) statOutliers.textContent = scenario.outliers;
    if (insightText) insightText.textContent = scenario.insight;

    renderAnalyticsChart();
  }

  if (queryPreset) {
    queryPreset.addEventListener('change', (e) => {
      updateScenario(e.target.value);
    });
  }

  if (executeBtn) {
    executeBtn.addEventListener('click', () => {
      executeBtn.innerHTML = '<i class="fa-solid fa-arrows-rotate fa-spin"></i> Executing...';
      setTimeout(() => {
        executeBtn.innerHTML = '<i class="fa-solid fa-bolt"></i> Execute Query & Refresh Visuals';
        renderAnalyticsChart();
        showToast('SQL Query executed successfully in 32ms!', 'success');
      }, 500);
    });
  }

  if (copySqlBtn) {
    copySqlBtn.addEventListener('click', () => {
      const sqlText = sqlCodeDisplay ? sqlCodeDisplay.textContent : '';
      navigator.clipboard.writeText(sqlText).then(() => {
        showToast('SQL code copied to clipboard!', 'info');
      });
    });
  }

  chartTypeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      chartTypeBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      activeChartType = btn.getAttribute('data-type');
      renderAnalyticsChart();
    });
  });

  renderAnalyticsChart();
}

function renderAnalyticsChart() {
  const canvas = document.getElementById('analytics-chart-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const width = (canvas.width = canvas.parentElement.clientWidth || 550);
  const height = (canvas.height = canvas.parentElement.clientHeight || 280);

  ctx.clearRect(0, 0, width, height);

  const scenario = queryDataScenarios[activeScenario];
  if (!scenario) return;

  const labels = scenario.labels;
  const data = scenario.values;
  const maxVal = Math.max(...data) * 1.15;

  const padLeft = 45;
  const padRight = 20;
  const padTop = 30;
  const padBottom = 40;
  const chartW = width - padLeft - padRight;
  const chartH = height - padTop - padBottom;

  // Grid lines
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.lineWidth = 1;
  const gridSteps = 4;
  for (let i = 0; i <= gridSteps; i++) {
    const y = padTop + (chartH / gridSteps) * i;
    ctx.beginPath();
    ctx.moveTo(padLeft, y);
    ctx.lineTo(width - padRight, y);
    ctx.stroke();

    // Y labels
    const val = Math.round(maxVal - (maxVal / gridSteps) * i);
    ctx.font = '10px "JetBrains Mono"';
    ctx.fillStyle = '#64748b';
    ctx.fillText(val, 8, y + 3);
  }

  // Draw Bars or Line
  if (activeChartType === 'bar') {
    const barWidth = Math.min((chartW / labels.length) * 0.55, 45);
    const gap = chartW / labels.length;

    labels.forEach((label, i) => {
      const x = padLeft + gap * i + (gap - barWidth) / 2;
      const val = data[i];
      const barH = (val / maxVal) * chartH;
      const y = padTop + chartH - barH;

      const grad = ctx.createLinearGradient(x, y, x, y + barH);
      grad.addColorStop(0, '#00f2fe');
      grad.addColorStop(1, 'rgba(127, 0, 255, 0.8)');

      ctx.fillStyle = grad;
      ctx.shadowBlur = 10;
      ctx.shadowColor = 'rgba(0, 242, 254, 0.3)';
      ctx.beginPath();
      ctx.roundRect(x, y, barWidth, barH, [6, 6, 0, 0]);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Top value
      ctx.fillStyle = '#ffffff';
      ctx.font = '10px "JetBrains Mono"';
      ctx.textAlign = 'center';
      ctx.fillText(val, x + barWidth / 2, y - 6);

      // X Label
      ctx.fillStyle = '#94a3b8';
      ctx.fillText(label, x + barWidth / 2, height - 15);
    });
  } else {
    // Line Chart
    const gap = chartW / (labels.length - 1);
    ctx.beginPath();

    const points = [];
    labels.forEach((label, i) => {
      const x = padLeft + gap * i;
      const y = padTop + chartH - (data[i] / maxVal) * chartH;
      points.push({ x, y, val: data[i], label });
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });

    ctx.strokeStyle = '#00f2fe';
    ctx.lineWidth = 3;
    ctx.shadowBlur = 12;
    ctx.shadowColor = '#00f2fe';
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Fill under line
    ctx.lineTo(points[points.length - 1].x, padTop + chartH);
    ctx.lineTo(points[0].x, padTop + chartH);
    ctx.closePath();
    const areaGrad = ctx.createLinearGradient(0, padTop, 0, padTop + chartH);
    areaGrad.addColorStop(0, 'rgba(0, 242, 254, 0.25)');
    areaGrad.addColorStop(1, 'rgba(0, 242, 254, 0)');
    ctx.fillStyle = areaGrad;
    ctx.fill();

    // Draw Points
    points.forEach((pt) => {
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.strokeStyle = '#00f2fe';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = '10px "JetBrains Mono"';
      ctx.textAlign = 'center';
      ctx.fillText(pt.val, pt.x, pt.y - 10);

      ctx.fillStyle = '#94a3b8';
      ctx.fillText(pt.label, pt.x, height - 15);
    });
  }
}

/* ==========================================================================
   5. PROJECT DETAILS & RESUME MODALS
   ========================================================================== */
const projectModalData = {
  tryon: {
    title: '2D-to-3D Human Reconstruction & GAN Virtual Try-On Pipeline',
    content: `
      <div class="modal-deep-dive">
        <p class="modal-lead">
          Engineered at <strong>Maskan Technologies</strong> for high-fidelity digital fashion and apparel sizing.
        </p>
        <div class="modal-spec-grid">
          <div><strong>Domain:</strong> Computer Vision & Deep Learning</div>
          <div><strong>Frameworks:</strong> PyTorch, OpenCV, SMPL-X, GANs</div>
          <div><strong>Throughput:</strong> 55 FPS Frame Parsing</div>
          <div><strong>Output:</strong> 3D Mesh & Sizing Matrix</div>
        </div>

        <h4 class="modal-subheading"><i class="fa-solid fa-microchip text-cyan"></i> Technical Architecture</h4>
        <ol class="modal-steps-list">
          <li>
            <strong>Automated Video Preprocessing:</strong> OpenCV pipeline extracts continuous video streams, normalizes frame dimensions, filters motion blur, and constructs multi-view dataset representations.
          </li>
          <li>
            <strong>2D Pose & Keypoint Estimation:</strong> Convolutional neural networks extract joint heatmaps across 18 anthropometric landmark coordinates.
          </li>
          <li>
            <strong>SMPL 3D Parametric Body Mesh Fitting:</strong> Optimization algorithms align parametric shape (&beta;) and pose (&theta;) vectors to reconstruct realistic 3D human body meshes from 2D camera perspectives.
          </li>
          <li>
            <strong>3D Anthropometric Extraction:</strong> Applied algorithms in Python & SQL to measure chest girth, waist circumference, and inseam lengths for apparel size recommendation.
          </li>
          <li>
            <strong>GAN Image-to-Image Garment Draping:</strong> Generative Adversarial Networks synthesize photorealistic garment textures on the human silhouette while preserving cloth folds and contours.
          </li>
        </ol>

        <h4 class="modal-subheading"><i class="fa-solid fa-code text-cyan"></i> Core Pipeline Snippet (Conceptual PyTorch / OpenCV)</h4>
        <pre class="modal-code"><code># Multi-view frame extraction & SMPL parameter regression
import cv2, torch, smplx
import numpy as np

def process_frame_stream(video_path):
    cap = cv2.VideoCapture(video_path)
    frames = []
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret: break
        # Normalize and extract keypoints
        rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        frames.append(rgb)
    return np.array(frames)

# Fitting SMPL parametric 3D body model
smpl_model = smplx.create(model_path='models/smpl', gender='neutral')
output = smpl_model(betas=shape_params, body_pose=pose_params)
vertices = output.vertices.detach().cpu().numpy()</code></pre>
      </div>
    `
  },
  analytics: {
    title: 'Enterprise ERP Analytics & Executive Dashboard Suite',
    content: `
      <div class="modal-deep-dive">
        <p class="modal-lead">
          Developed during large-scale digital transformation initiatives at <strong>Tech Avant Garde</strong>, covering EdTech and HealthTech ERP platforms.
        </p>
        <div class="modal-spec-grid">
          <div><strong>Data Stack:</strong> PostgreSQL, MySQL, Python, Pandas</div>
          <div><strong>BI Tools:</strong> Power BI, Tableau, Excel</div>
          <div><strong>Scale:</strong> 125,000+ Validated Records</div>
          <div><strong>SLA Timelines:</strong> 99.4% On-time Resolution</div>
        </div>

        <h4 class="modal-subheading"><i class="fa-solid fa-chart-line text-cyan"></i> Engineering Highlights</h4>
        <ul class="modal-steps-list">
          <li>
            <strong>SQL Data Auditing:</strong> Designed complex multi-table queries to identify transaction discrepancies, validate fee payment gateways, and ensure database integrity.
          </li>
          <li>
            <strong>ETL Transformation Workflows:</strong> Automated extraction and cleaning scripts utilizing Python Pandas for seamless institutional onboarding of thousands of students.
          </li>
          <li>
            <strong>Executive BI Dashboards:</strong> Built interactive executive dashboards tracking attendance, fee collection, system anomalies, and course completion rates.
          </li>
        </ul>
      </div>
    `
  },
  iot: {
    title: 'IoT-Based Wireless EV Charging & Automated Billing',
    content: `
      <div class="modal-deep-dive">
        <p class="modal-lead">
          Major B.E. Computer Science Capstone Project designed to eliminate physical plug-in friction for Electric Vehicles.
        </p>
        <div class="modal-spec-grid">
          <div><strong>Hardware:</strong> Arduino IDE, Inductive Coils</div>
          <div><strong>Protocols:</strong> RFID 13.56MHz, IoT Cloud Telemetry</div>
          <div><strong>Efficiency:</strong> High Resonant Magnetic Coupling</div>
          <div><strong>Billing:</strong> Real-time Automated Ledger</div>
        </div>

        <h4 class="modal-subheading"><i class="fa-solid fa-bolt text-cyan"></i> System Mechanics</h4>
        <ul class="modal-steps-list">
          <li>
            <strong>Resonant Inductive Coupling:</strong> Primary transmitter coil embedded in parking bay transmits power to receiver coil mounted beneath the EV chassis with minimal loss.
          </li>
          <li>
            <strong>RFID Authentication:</strong> Automatic identification card tags authenticate the registered vehicle before power transmission begins.
          </li>
          <li>
            <strong>IoT Telemetry:</strong> Live power consumption and current metrics logged to IoT cloud backend for automated session billing.
          </li>
        </ul>
      </div>
    `
  },
  hospital: {
    title: 'Hospital Management & Patient Care Portal',
    content: `
      <div class="modal-deep-dive">
        <p class="modal-lead">
          Full-Stack Web Development Mini Project engineering a unified healthcare administration portal.
        </p>
        <div class="modal-spec-grid">
          <div><strong>Frontend:</strong> HTML5, CSS3, JavaScript</div>
          <div><strong>Backend/DB:</strong> MySQL, PHP/Node.js</div>
          <div><strong>Features:</strong> EHR, Appointments, Invoicing</div>
        </div>

        <h4 class="modal-subheading"><i class="fa-solid fa-hospital text-cyan"></i> Portal Architecture</h4>
        <ul class="modal-steps-list">
          <li>
            <strong>Role-Based Access:</strong> Distinct administrative, physician, and patient dashboards with protected healthcare record access.
          </li>
          <li>
            <strong>Appointment Scheduler:</strong> Interactive booking calendar matching doctor specialties with patient symptoms.
          </li>
          <li>
            <strong>Automated Billing & Pharmacy:</strong> Generates itemized diagnostic invoices and tracks medical inventory.
          </li>
        </ul>
      </div>
    `
  }
};

function initModals() {
  // Resume Modal
  const resumeModal = document.getElementById('resume-modal');
  const resumeBtn = document.getElementById('resume-preview-btn');
  const closeResumeBtn = document.getElementById('close-resume-modal');
  const printResumeBtn = document.getElementById('print-resume-btn');

  if (resumeBtn && resumeModal) {
    resumeBtn.addEventListener('click', () => {
      resumeModal.classList.add('active');
      resumeModal.setAttribute('aria-hidden', 'false');
    });
  }

  if (closeResumeBtn && resumeModal) {
    closeResumeBtn.addEventListener('click', () => {
      resumeModal.classList.remove('active');
      resumeModal.setAttribute('aria-hidden', 'true');
    });
  }

  if (printResumeBtn) {
    printResumeBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // Project Deep Dive Modal
  const projectModal = document.getElementById('project-modal');
  const modalProjectTitle = document.getElementById('modal-project-title');
  const modalProjectBody = document.getElementById('modal-project-body');
  const closeProjectBtn = document.getElementById('close-project-modal');
  const projectTriggers = document.querySelectorAll('.project-modal-trigger');

  projectTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const key = trigger.getAttribute('data-project');
      const data = projectModalData[key];
      if (data && projectModal && modalProjectTitle && modalProjectBody) {
        modalProjectTitle.textContent = data.title;
        modalProjectBody.innerHTML = data.content;
        projectModal.classList.add('active');
        projectModal.setAttribute('aria-hidden', 'false');
      }
    });
  });

  if (closeProjectBtn && projectModal) {
    closeProjectBtn.addEventListener('click', () => {
      projectModal.classList.remove('active');
      projectModal.setAttribute('aria-hidden', 'true');
    });
  }

  // Close modals on clicking backdrop
  window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-backdrop')) {
      if (resumeModal) resumeModal.classList.remove('active');
      if (projectModal) projectModal.classList.remove('active');
    }
  });

  // Close modals on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (resumeModal) resumeModal.classList.remove('active');
      if (projectModal) projectModal.classList.remove('active');
    }
  });
}

/* ==========================================================================
   6. QUICK COPY & TOAST NOTIFICATION SYSTEM
   ========================================================================= */
function initClipboardAndToasts() {
  const copyButtons = document.querySelectorAll('[data-copy]');

  copyButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied "${textToCopy}" to clipboard!`, 'success');
        });
      }
    });
  });
}

function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';

  let icon = '<i class="fa-solid fa-circle-check text-cyan"></i>';
  if (type === 'success') icon = '<i class="fa-solid fa-circle-check text-green"></i>';
  if (type === 'error') icon = '<i class="fa-solid fa-circle-xmark text-yellow"></i>';

  toast.innerHTML = `${icon} <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

/* ==========================================================================
   7. CONTACT FORM VALIDATION & SUBMISSION
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const subjectInput = document.getElementById('contact-subject');
  const msgInput = document.getElementById('contact-message');
  const submitBtn = document.getElementById('submit-btn');

  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const subjectError = document.getElementById('subject-error');
  const msgError = document.getElementById('message-error');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Name Validation
    if (!nameInput.value.trim()) {
      nameError.textContent = 'Please enter your name';
      nameInput.focus();
      isValid = false;
    } else {
      nameError.textContent = '';
    }

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
      emailError.textContent = 'Please enter a valid email address';
      if (isValid) emailInput.focus();
      isValid = false;
    } else {
      emailError.textContent = '';
    }

    // Subject Validation
    if (!subjectInput.value.trim()) {
      subjectError.textContent = 'Please enter a subject';
      if (isValid) subjectInput.focus();
      isValid = false;
    } else {
      subjectError.textContent = '';
    }

    // Message Validation
    if (!msgInput.value.trim() || msgInput.value.trim().length < 10) {
      msgError.textContent = 'Please enter a message of at least 10 characters';
      if (isValid) msgInput.focus();
      isValid = false;
    } else {
      msgError.textContent = '';
    }

    if (!isValid) return;

    // Simulate sending message
    submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Dispatching Message...';
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Message Sent!';
      showToast('Thank you! Your message has been sent to Ayesha Nikhath S.', 'success');
      form.reset();

      setTimeout(() => {
        submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
        submitBtn.disabled = false;
      }, 3000);
    }, 1200);
  });
}

/* ==========================================================================
   8. NAVIGATION & MOBILE MENU
   ========================================================================== */
function initNavigation() {
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }

  // Active section scroll spy
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');
      const targetLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (targetLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          targetLink.classList.add('active');
        } else {
          targetLink.classList.remove('active');
        }
      }
    });
  });
}
