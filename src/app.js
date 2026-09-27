import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

/* ---------- helpers ---------- */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
const TOUCH = matchMedia('(hover: none)').matches;
const MOBILE = matchMedia('(max-width: 768px)').matches;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const lerp = (a, b, t) => a + (b - a) * t;
const wait = ms => new Promise(r => setTimeout(r, ms));
gsap.registerPlugin(ScrollTrigger);
if (TOUCH) document.documentElement.classList.add('touch');
// iOS shows/hides its toolbars while scrolling; do not re-measure every pin on those height changes
ScrollTrigger.config({ ignoreMobileResize: true });

/* ---------- content ---------- */
const PROJECTS = [
  { id: 'bao', t: 'BAO B', img: 'assets/p-bao.jpg', th: 'assets/p-bao-t.jpg', url: 'https://www.instagram.com/1baob1/', st: 'live', cat: 'platform', feat: true, year: '2025', pos: '6% center',
    tags: ['Brand', 'Operations', 'Costing', 'WhatsApp orders', 'Events'],
    role_en: 'Co-founder · Operations and cost management', role_ar: 'شريك مؤسس · التشغيل وإدارة التكاليف',
    s_en: 'Food brand in Jeddah serving customers through direct orders and events.',
    s_ar: 'علامة أطعمة في جدة تخدم عملاءها عبر الطلب المباشر والمشاركة في الفعاليات.',
    l_en: 'A food brand I co-founded in Jeddah, serving customers through direct orders and participation in events and exhibitions. I manage operations, supplier relationships, and order fulfilment, and I built the costing model behind the menu, calculating the cost of every ingredient and product so pricing decisions are made with clear margins.',
    l_ar: 'علامة أطعمة شاركت في تأسيسها في جدة، تخدم عملاءها عبر الطلب المباشر والمشاركة في الفعاليات والمعارض. أتولّى إدارة التشغيل والعلاقة مع الموردين وتنفيذ الطلبات، وبنيت نموذج التكاليف الذي تُسعَّر عليه قائمة المنتجات، بحساب تكلفة كل مادة وكل منتج بحيث تُتخذ قرارات التسعير على هوامش ربح واضحة.' },
  { id: 'thaib', t: 'THAI B', img: 'assets/p-thaib.jpg', th: 'assets/p-thaib-t.jpg', url: 'https://thai-b.com', st: 'live', cat: 'platform', feat: true, year: '2022',
    tags: ['Salla', 'Webhooks', 'Excel', 'AI analysis'],
    role_en: 'Founder · Operations and data', role_ar: 'مؤسس · التشغيل والبيانات',
    s_en: 'E-commerce store run since 2022, with pricing and inventory driven by sales data.',
    s_ar: 'متجر إلكتروني يُدار منذ 2022، تُبنى قرارات التسعير والمخزون فيه على بيانات المبيعات.',
    l_en: 'An e-commerce store I founded in 2022 and continue to run, covering sourcing, pricing, inventory, and marketing. I built a data pipeline that moves orders through a webhook into Excel and an AI analysis layer, turning sales data into clear pricing and restocking decisions. Running a real business for four years has given me a practical understanding of customers and commercial trade-offs.',
    l_ar: 'متجر إلكتروني أسّسته عام 2022 وما زلت أديره، ويشمل التوريد والتسعير والمخزون والتسويق. بنيت خط بيانات ينقل الطلبات عبر webhook إلى Excel ثم إلى طبقة تحليل بالذكاء الاصطناعي، فتتحوّل بيانات المبيعات إلى قرارات واضحة في التسعير وإعادة التخزين. وأكسبتني إدارة نشاط تجاري فعلي لأربع سنوات فهماً عملياً للعملاء وللموازنات التجارية.' },
  { id: 'bosharab', t: 'Boshara B', img: 'assets/p-bosharab.jpg', th: 'assets/p-bosharab-t.jpg', url: 'https://bosharab.com', st: 'live', cat: 'platform', feat: true, year: '2026',
    tags: ['Next.js', 'React', 'Supabase', 'Vercel', 'WhatsApp Cloud API'],
    role_en: 'Founder · Product, design, and full-stack development', role_ar: 'مؤسس · المنتج والتصميم والتطوير الكامل',
    s_en: 'Digital invitations platform with unique guest barcodes and WhatsApp delivery.',
    s_ar: 'منصّة دعوات رقمية بباركود فريد لكل ضيف وإرسال عبر واتساب.',
    l_en: 'A production platform for premium digital invitations. Each guest receives a unique barcode verified at the venue entrance, and invitations are delivered directly over WhatsApp. I built it end to end: a Next.js and React front end, Supabase for data and authentication, Vercel serverless functions and scheduled jobs, and a WhatsApp Cloud API integration. The platform is live and serving real clients and events.',
    l_ar: 'منصّة إنتاجية للدعوات الرقمية الفاخرة، يحصل فيها كل ضيف على باركود فريد يُتحقّق منه عند مدخل المناسبة، وتصل الدعوات مباشرة عبر واتساب. بنيتها بالكامل: واجهة بـ Next.js وReact، وSupabase للبيانات والمصادقة، ودوال Vercel الخادمية ومهام مجدولة، وتكامل مع WhatsApp Cloud API. المنصّة تعمل حالياً وتخدم عملاء ومناسبات فعلية.' },
  { id: 'dara', t: 'DARA B', img: 'assets/p-dara.jpg', th: 'assets/p-dara-t.jpg', url: '', st: 'prelaunch', cat: 'platform', feat: true, year: '2026', pos: '18% center',
    tags: ['Salla', 'Brand identity', 'SEO catalog', 'AI product imagery'],
    role_en: 'Founder · Brand, catalog, and product imagery', role_ar: 'مؤسس · الهوية والكتالوج وصور المنتجات',
    s_en: 'Jewelry brand preparing to launch on Salla, with a complete 126-product catalog.',
    s_ar: 'علامة مجوهرات تستعد للإطلاق على سلة، بكتالوج مكتمل من 126 منتجاً.',
    l_en: 'A jewelry brand I am preparing to launch on Salla. I developed the brand identity, wrote a 126-product catalog with search-optimized titles and descriptions, and produced editorial product photography through an AI pipeline with a strict fidelity check, reviewing every image against the physical piece before approval.',
    l_ar: 'علامة مجوهرات أستعد لإطلاقها على منصة سلة. طوّرت هويتها البصرية، وكتبت كتالوجاً من 126 منتجاً بعناوين وأوصاف مهيّأة لمحركات البحث، وأنتجت صوراً احترافية للمنتجات عبر خط معالجة بالذكاء الاصطناعي مع تدقيق صارم للمطابقة، إذ راجعت كل صورة مقابل القطعة الفعلية قبل اعتمادها.' },
  { id: 'saydah', t: 'Saydah', img: 'assets/p-saydah.jpg', th: 'assets/p-saydah-t.jpg', url: 'https://saydah.vercel.app', st: 'beta', cat: 'platform', feat: false, year: '2026',
    tags: ['Next.js 16', 'Supabase', 'PWA', 'Push notifications'],
    role_en: 'Sole developer · Product, data model, and full stack', role_ar: 'مطوّر منفرد · المنتج ونموذج البيانات والتطوير الكامل',
    s_en: 'Fresh fish marketplace connecting sellers and buyers across 80 Saudi cities.',
    s_ar: 'سوق للأسماك الطازجة يربط البائعين بالمشترين في 80 مدينة سعودية.',
    l_en: 'A consumer-to-consumer marketplace for fresh fish that brings fragmented social-media selling into one structured flow. Sellers publish a listing in under a minute, buyers filter by city and species, and both sides connect directly. Delivered as an installable PWA with push notifications on Next.js and Supabase, and live with real users.',
    l_ar: 'سوق إلكتروني بين الأفراد للأسماك الطازجة، يجمع البيع المتفرّق عبر وسائل التواصل في مسار واحد منظّم. ينشر البائع إعلانه في أقل من دقيقة، ويتصفّح المشتري حسب المدينة والنوع، ويتواصل الطرفان مباشرة. قُدّم كتطبيق ويب قابل للتثبيت (PWA) مع إشعارات فورية، مبني على Next.js وSupabase، ويعمل حالياً مع مستخدمين فعليين.' },
  { id: 's7s', t: 'S7S FIT', img: 'assets/p-s7s.jpg', th: 'assets/p-s7s-t.jpg', url: 'https://s7sfit.com', st: 'beta', cat: 'platform', feat: false, year: '2026',
    tags: ['Next.js 14', 'TypeScript', 'Supabase', 'Sentry', 'Automated tests'],
    role_en: 'Lead developer', role_ar: 'المطوّر الرئيسي',
    s_en: 'Bilingual fitness and nutrition membership platform with programs, tracking, and payments.',
    s_ar: 'منصّة اشتراكات ثنائية اللغة للياقة والتغذية تشمل البرامج والمتابعة والدفع.',
    l_en: 'A bilingual (Arabic and English) membership platform for a fitness coach, covering subscription plans, training and nutrition programs, daily progress tracking with a points system, and a coach dashboard. I also built its automated test suite across access control, payments, time zones, and concurrency. Built with Next.js 14, TypeScript, and Supabase.',
    l_ar: 'منصّة اشتراكات ثنائية اللغة لمدرّب لياقة، تشمل باقات الاشتراك وبرامج التمارين والتغذية والمتابعة اليومية بنظام نقاط ولوحة تحكم للمدرّب. كما بنيت مجموعة اختبارات آلية تغطّي الصلاحيات والمدفوعات والمناطق الزمنية والتزامن. مبنية بـ Next.js 14 وTypeScript وSupabase.' },
  { id: 'v3', t: 'V3 Cafe', img: 'assets/p-v3.jpg', th: 'assets/p-v3-t.jpg', url: 'https://v3cafes.com', st: 'live', cat: 'website', feat: false, year: '2026',
    tags: ['React', 'Vite', 'i18n', 'GTM'],
    role_en: 'Design and development', role_ar: 'التصميم والتطوير',
    s_en: 'Website for a specialty coffee brand presenting its space, services, and menu.',
    s_ar: 'موقع لعلامة قهوة مختصة يعرض المكان والخدمات وقائمة المنتجات.',
    l_en: 'A bilingual website for a specialty coffee brand in Jeddah that presents its space, services, and menu with a clear path to contact and visit. Built with React and Vite, with analytics and lead capture integrated.',
    l_ar: 'موقع ثنائي اللغة لعلامة قهوة مختصة في جدة، يعرض المكان والخدمات وقائمة المنتجات مع مسار واضح للتواصل والزيارة. مبني بـ React وVite، ومزوّد بأدوات التحليل واستقبال طلبات العملاء.' },
  { id: 'hrc', t: 'Health Recovery', img: 'assets/p-hrc.jpg', th: 'assets/p-hrc-t.jpg', url: 'https://healthrecovery.com.sa', st: 'live', cat: 'website', feat: false, year: '2026',
    tags: ['Astro', 'Tailwind', 'MailerLite', 'GA4'],
    role_en: 'Rebuild and launch', role_ar: 'إعادة البناء والإطلاق',
    s_en: 'High-performance bilingual website for a recovery and wellness company.',
    s_ar: 'موقع ثنائي اللغة عالي الأداء لشركة متخصصة في التعافي والعافية.',
    l_en: 'A complete rebuild on Astro and Tailwind focused on speed and reliability, with analytics, advertising pixels, and lead capture through MailerLite, designed to handle high traffic on mobile and desktop.',
    l_ar: 'إعادة بناء كاملة على Astro وTailwind بتركيز على السرعة والاعتمادية، مع أدوات التحليل وبكسلات الإعلانات واستقبال العملاء عبر MailerLite، ومصمّم لتحمّل زيارات عالية على الجوال والحاسب.' },
  { id: 'vitality', t: 'Vitality Flows', img: 'assets/p-vitality.jpg', th: 'assets/p-vitality-t.jpg', url: 'https://vitality-flows.com', st: 'live', cat: 'website', feat: false, year: '2026',
    tags: ['HTML', 'CSS', 'i18n', 'PHP forms'],
    role_en: 'Design and development', role_ar: 'التصميم والتطوير',
    s_en: 'Bilingual corporate website for a wellness company.',
    s_ar: 'موقع مؤسسي ثنائي اللغة لشركة في قطاع العافية.',
    l_en: 'A bilingual corporate website built as fast static pages with full Arabic and English support, and a shared contact handler that routes enquiries to email and MailerLite.',
    l_ar: 'موقع مؤسسي ثنائي اللغة مبني بصفحات ثابتة سريعة ودعم كامل للعربية والإنجليزية، مع معالج موحّد لنماذج التواصل يوجّه الاستفسارات إلى البريد وMailerLite.' },
  { id: 'dh', t: 'DH Barbers', img: 'assets/p-dh.jpg', th: 'assets/p-dh-t.jpg', url: 'https://dhbarbers.com', st: 'live', cat: 'website', feat: false, year: '2026',
    tags: ['React', 'Vite', 'WebP gallery'],
    role_en: 'Design and development', role_ar: 'التصميم والتطوير',
    s_en: 'Brand website for a barbershop with a gallery and online booking entry.',
    s_ar: 'موقع لعلامة صالون حلاقة يضم معرض أعمال ومدخلاً للحجز.',
    l_en: 'A mobile-first brand website for a barbershop, built with React and Vite, featuring an optimized image gallery and a direct booking entry point.',
    l_ar: 'موقع لعلامة صالون حلاقة مصمّم للجوال أولاً، مبني بـ React وVite، ويضم معرض صور محسّناً ومدخلاً مباشراً للحجز.' },
  { id: 'vlink', t: 'V-LINK', img: 'assets/p-vlink.jpg', th: 'assets/p-vlink-t.jpg', url: '', st: 'grad', cat: 'platform', feat: false, year: '2025',
    tags: ['React', 'Firebase', 'Google Maps API', 'Scrum'],
    role_en: 'Developer in a three-person Agile team', role_ar: 'مطوّر ضمن فريق Agile من ثلاثة أعضاء',
    s_en: 'Volunteer management platform with roles, attendance, and verifiable certificates.',
    s_ar: 'منصّة لإدارة التطوّع تشمل الصلاحيات والحضور والشهادات الموثّقة.',
    l_en: 'My graduation project: a full-stack platform that automates volunteer-team management, attendance and hours tracking, and the issuing of verifiable digital certificates, with authentication and role-based access for volunteers, team leaders, and administrators. Built on React and Firebase and delivered with Agile Scrum by a three-person team.',
    l_ar: 'مشروع التخرّج: منصّة متكاملة تؤتمت إدارة الفرق التطوعية وتتبّع الحضور والساعات وإصدار شهادات رقمية موثّقة، مع مصادقة وصلاحيات للمتطوعين وقادة الفرق والمشرفين. مبنية على React وFirebase ومنفّذة بمنهجية Agile Scrum ضمن فريق من ثلاثة أعضاء.' },
  { id: 'accel', t: 'ACCEL Therapy', img: 'assets/p-accel.jpg', th: 'assets/p-accel-t.jpg', url: '', st: 'internal', cat: 'tool', feat: false, year: '2026',
    tags: ['Power Apps', 'SharePoint', 'Low-code'],
    role_en: 'Sole developer', role_ar: 'مطوّر منفرد',
    s_en: 'Session-management app for an occupational therapy center.',
    s_ar: 'تطبيق لإدارة الجلسات في مركز للعلاج الوظيفي.',
    l_en: 'A low-code application for an occupational therapy center covering scheduling, session records, and therapist views, built on Microsoft Power Apps and SharePoint Lists with no additional licensing costs.',
    l_ar: 'تطبيق منخفض الكود لمركز علاج وظيفي يغطي الجدولة وسجلات الجلسات وواجهات المعالجين، مبني على Power Apps وSharePoint Lists دون تكاليف تراخيص إضافية.' },
];

const T = {
  en: {
    open: 'View project', visit: 'Visit live', cur: 'OPEN',
    roles: ['Full-stack developer', 'Founder of Boshara B', 'IT graduate, GPA 4.74 / 5'],
    filters: { all: 'All', platform: 'Platforms', website: 'Websites', tool: 'Tools' },
    status: { live: 'Live', beta: 'Live · Beta', grad: 'Graduation project', internal: 'Internal tool', prelaunch: 'Pre-launch', events: 'Events brand' },
    year: 'Year', role: 'Role', stack: 'Stack', copied: 'Copied', copy: 'Copy email',
    priv: 'private', lang_btn: 'عربي', title: 'Abdulrahman Alsyami · Developer',
  },
  ar: {
    open: 'عرض المشروع', visit: 'زُر الموقع', cur: 'افتح',
    roles: ['مطوّر ويب متكامل', 'مؤسس بُشارة بي', 'خريج تقنية معلومات، معدل 4.74 من 5'],
    filters: { all: 'الكل', platform: 'منصّات', website: 'مواقع', tool: 'أدوات' },
    status: { live: 'منشور', beta: 'نسخة تجريبية', grad: 'مشروع تخرّج', internal: 'أداة داخلية', prelaunch: 'قيد الإطلاق', events: 'علامة فعاليات' },
    year: 'السنة', role: 'الدور', stack: 'التقنيات', copied: 'تم النسخ', copy: 'انسخ البريد',
    priv: 'خاص', lang_btn: 'EN', title: 'عبدالرحمن السيامي · مطوّر',
  },
};

let LANG = localStorage.getItem('lang') || ((navigator.language || '').toLowerCase().startsWith('ar') ? 'ar' : 'en');
let FILTER = 'all';
let lenis = null;
let P = null;

/* ---------- particles ---------- */
// free vertical band for the particle picture: below the top bar and pill, above the hero text
function heroRegion() {
  const inEl = document.querySelector('.hero-in'), pill = document.querySelector('.hero .pill');
  const top = pill ? pill.getBoundingClientRect().bottom + 14 : 110;
  const bottom = inEl ? inEl.getBoundingClientRect().top - 18 : innerHeight * .55;
  return bottom - top > 120 ? { top, bottom } : { top: innerHeight * .12, bottom: innerHeight * .55 };
}
const VS = `
attribute vec3 aA; attribute vec3 aB; attribute vec3 aS; attribute vec3 aR; attribute float aSeed; attribute float aSize;
uniform float uTime, uMix, uShape, uScatter, uForce, uRadius, uSize; uniform vec2 uMouse, uOffset, uRot;
varying float vSeed; varying float vDepth;
mat3 rotY(float a){ float c=cos(a), s=sin(a); return mat3(c,0.,-s, 0.,1.,0., s,0.,c); }
mat3 rotX(float a){ float c=cos(a), s=sin(a); return mat3(1.,0.,0., 0.,c,s, 0.,-s,c); }
void main(){
  vec3 t = mix(aA, aB, uMix);
  vec3 sp = rotX(uRot.y) * rotY(uTime*0.12 + uRot.x) * aS;
  sp.xy += uOffset;
  vec3 p = mix(t, sp, uShape);
  vec3 r = aR + vec3(sin(uTime*0.15 + aSeed*20.)*3., cos(uTime*0.12 + aSeed*13.)*3., 0.);
  p = mix(p, r, uScatter);
  float wob = 0.14 + 0.5*uShape;
  p += vec3(sin(uTime*0.9 + aSeed*40.), cos(uTime*0.7 + aSeed*31.), sin(uTime*0.5 + aSeed*17.)) * wob;
  vec2 d = p.xy - uMouse; float dist = length(d); float f = smoothstep(uRadius, 0., dist);
  p.xy += normalize(d + 0.001) * f * uForce;
  vec4 mv = modelViewMatrix * vec4(p, 1.);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = aSize * uSize * (100. / -mv.z);
  vSeed = aSeed; vDepth = clamp((p.z + 40.) / 80., 0., 1.);
}`;
const FS = `
precision highp float;
uniform vec3 uColA, uColB, uColC; uniform float uAlpha; varying float vSeed; varying float vDepth;
void main(){
  vec2 c = gl_PointCoord - .5; float d = length(c); if (d > .5) discard;
  float a = smoothstep(.5, .1, d);
  vec3 col = mix(uColB, uColA, smoothstep(.2, .9, vSeed));
  col = mix(col, uColC, step(.93, vSeed) * .8);
  if (vSeed > .985) col = vec3(1.);
  gl_FragColor = vec4(col, a * uAlpha * (0.55 + 0.45 * vDepth));
}`;

class Particles {
  constructor(canvas) {
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true, powerPreference: 'high-performance' });
    this.renderer.setPixelRatio(Math.min(devicePixelRatio || 1, MOBILE ? 1.5 : 1.75));
    this.renderer.setClearColor(0x000000, 0);
    this.scene = new THREE.Scene();
    this.canvas = canvas;
    this.camera = new THREE.PerspectiveCamera(45, this.box().w / this.box().h, 1, 500);
    this.camera.position.z = 100;
    // particle density follows screen area so tablets are not sparse and small phones stay fast
    this.N = innerWidth < 480 ? 7000 : innerWidth < 1100 ? 12000 : 16000;
    this.state = { shape: 0, scatter: 0, introScatter: 1, burst: 0, ox: 0, oy: 0 };
    this.mouse = new THREE.Vector2(9999, 9999);
    this.mouseT = new THREE.Vector2(9999, 9999);
    this.mouseN = new THREE.Vector2(0, 0);
    this.rot = new THREE.Vector2(0, 0);
    this.cur = 'A';
    this.text = 'ALSYAMI'; this.font = '800 200px Sora';
    this.build();
    // iOS toolbars change the height on every scroll direction change; only re-sample when the width changes
    // or the height changes a lot, otherwise just refit the buffer
    let rt; this.lastBox = this.box();
    const onBox = () => { clearTimeout(rt); rt = setTimeout(() => this.onResize(), 160); };
    if (window.ResizeObserver) new ResizeObserver(onBox).observe(canvas); else addEventListener('resize', onBox);
  }
  box() { const r = this.canvas.getBoundingClientRect(); return { w: Math.max(1, r.width || innerWidth), h: Math.max(1, r.height || innerHeight) }; }
  vis() { const h = 2 * Math.tan(THREE.MathUtils.degToRad(this.camera.fov / 2)) * this.camera.position.z; return { h, w: h * this.camera.aspect }; }
  build() {
    const N = this.N, g = new THREE.BufferGeometry();
    this.bufA = new Float32Array(N * 3); this.bufB = new Float32Array(N * 3);
    this.bufS = new Float32Array(N * 3); this.bufR = new Float32Array(N * 3);
    const seed = new Float32Array(N), size = new Float32Array(N);
    for (let i = 0; i < N; i++) { seed[i] = Math.random(); size[i] = 0.55 + Math.random() * 1.1; if (Math.random() > 0.985) size[i] = 2.4; }
    this.fillShapes();
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(N * 3), 3));
    this.attrA = new THREE.BufferAttribute(this.bufA, 3); this.attrB = new THREE.BufferAttribute(this.bufB, 3);
    this.attrS = new THREE.BufferAttribute(this.bufS, 3); this.attrR = new THREE.BufferAttribute(this.bufR, 3);
    g.setAttribute('aA', this.attrA); g.setAttribute('aB', this.attrB); g.setAttribute('aS', this.attrS); g.setAttribute('aR', this.attrR);
    g.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1)); g.setAttribute('aSize', new THREE.BufferAttribute(size, 1));
    this.u = {
      uTime: { value: 0 }, uMix: { value: 0 }, uShape: { value: 0 }, uScatter: { value: 1 },
      uMouse: { value: this.mouse }, uForce: { value: 0 }, uRadius: { value: 9 },
      uSize: { value: (MOBILE ? 2.0 : 2.3) * this.renderer.getPixelRatio() },
      uOffset: { value: new THREE.Vector2() }, uRot: { value: this.rot }, uAlpha: { value: .95 },
      uColA: { value: new THREE.Color('#7cc0ff') }, uColB: { value: new THREE.Color('#1d4ed8') }, uColC: { value: new THREE.Color('#38bdf8') },
    };
    const mat = new THREE.ShaderMaterial({ uniforms: this.u, vertexShader: VS, fragmentShader: FS, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
    this.points = new THREE.Points(g, mat);
    this.points.frustumCulled = false;
    this.scene.add(this.points);
    const bx = this.box(); this.renderer.setSize(bx.w, bx.h, false);
  }
  fillShapes() {
    const { w, h } = this.vis(), N = this.N, R = Math.min(w, h) * 0.24, ga = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2, r = Math.sqrt(1 - y * y), th = ga * i, rr = R * (0.9 + Math.random() * 0.2);
      this.bufS[i * 3] = Math.cos(th) * r * rr; this.bufS[i * 3 + 1] = y * rr; this.bufS[i * 3 + 2] = Math.sin(th) * r * rr;
      this.bufR[i * 3] = (Math.random() - .5) * w * 1.6; this.bufR[i * 3 + 1] = (Math.random() - .5) * h * 1.6; this.bufR[i * 3 + 2] = -40 + Math.random() * 70;
    }
    if (this.attrS) { this.attrS.needsUpdate = true; this.attrR.needsUpdate = true; }
  }
  sampleDraw(draw, maxH) {
    const { w, h } = this.vis();
    const cw = 1400, ch = 700, c = document.createElement('canvas'); c.width = cw; c.height = ch;
    const x = c.getContext('2d', { willReadFrequently: true });
    x.fillStyle = '#fff'; x.strokeStyle = '#fff'; x.lineCap = 'round'; x.lineJoin = 'round';
    draw(x, cw, ch);
    const d = x.getImageData(0, 0, cw, ch).data, pts = [];
    let x0 = cw, x1 = 0, y0 = ch, y1 = 0;
    for (let yy = 0; yy < ch; yy += 2) for (let xx = 0; xx < cw; xx += 2) if (d[(yy * cw + xx) * 4 + 3] > 120) {
      pts.push(xx, yy); if (xx < x0) x0 = xx; if (xx > x1) x1 = xx; if (yy < y0) y0 = yy; if (yy > y1) y1 = yy;
    }
    const out = new Float32Array(this.N * 3), n = pts.length / 2;
    if (!n) { out.set(this.bufS); return out; }
    const bw = x1 - x0 || 1, bh = y1 - y0 || 1, mx = (x0 + x1) / 2, my = (y0 + y1) / 2;
    const reg = heroRegion(), regH = h * (reg.bottom - reg.top) / innerHeight;
    const s = Math.min((w * 0.84) / bw, (h * maxH) / bh, (regH * 0.9) / bh), cy = h * (0.5 - (reg.top + reg.bottom) / 2 / innerHeight);
    const tmp = [];
    for (let i = 0; i < this.N; i++) {
      const k = (Math.random() * n) | 0;
      tmp.push([(pts[k * 2] - mx) * s + (Math.random() - .5) * .6, -(pts[k * 2 + 1] - my) * s + cy + (Math.random() - .5) * .6, (Math.random() - .5) * 4]);
    }
    tmp.sort((a, b) => a[0] - b[0]);
    tmp.forEach((p, i) => { out[i * 3] = p[0]; out[i * 3 + 1] = p[1]; out[i * 3 + 2] = p[2]; });
    return out;
  }
  sample(text, font) {
    const lines = text.split('\n');
    return this.sampleDraw((x, cw, ch) => {
      x.textAlign = 'center'; x.textBaseline = 'middle'; x.font = font;
      const lh = parseInt(font.match(/(\d+)px/)[1], 10) * 1.12, y0 = ch / 2 - (lines.length - 1) * lh / 2;
      lines.forEach((l, k) => x.fillText(l, cw / 2, y0 + k * lh));
    }, lines.length > 1 ? (MOBILE ? 0.34 : 0.44) : 0.36);
  }
  async setText(text, font, immediate) {
    this.text = text; this.font = font; this.icon = null;
    try { await document.fonts.load(font); } catch (e) { }
    if (this.text !== text || this.icon) return;
    this.apply(this.sample(text, font), immediate);
  }
  setIcon(name, immediate) {
    this.icon = name;
    this.apply(this.sampleDraw(ICONS[name], MOBILE ? 0.3 : 0.4), immediate);
  }
  apply(data, immediate) {
    if (immediate) { const b = this.cur === 'A' ? this.bufA : this.bufB; b.set(data); (this.cur === 'A' ? this.attrA : this.attrB).needsUpdate = true; return; }
    gsap.killTweensOf(this.u.uMix);
    // settle the current mix first so the buffer we are about to overwrite is not on screen
    if (this.cur === 'A') { this.u.uMix.value = 0; this.bufB.set(data); this.attrB.needsUpdate = true; gsap.to(this.u.uMix, { value: 1, duration: 1.3, ease: 'power3.inOut' }); this.cur = 'B'; }
    else { this.u.uMix.value = 1; this.bufA.set(data); this.attrA.needsUpdate = true; gsap.to(this.u.uMix, { value: 0, duration: 1.3, ease: 'power3.inOut' }); this.cur = 'A'; }
  }
  onResize() {
    const bx = this.box(), prev = this.lastBox; this.lastBox = bx;
    this.camera.aspect = bx.w / bx.h; this.camera.updateProjectionMatrix();
    this.renderer.setSize(bx.w, bx.h, false);
    if (Math.abs(bx.w - prev.w) < 2 && Math.abs(bx.h - prev.h) / prev.h < .2) return;
    this.fillShapes(); if (this.icon) this.setIcon(this.icon, true); else this.setText(this.text, this.font, true);
  }
  pointer(x, y) {
    const { w, h } = this.vis();
    this.mouseN.set(x / innerWidth * 2 - 1, -(y / innerHeight * 2 - 1));
    this.mouseT.set(this.mouseN.x * w / 2, this.mouseN.y * h / 2);
  }
  leave() { this.mouseT.set(9999, 9999); }
  render(t) {
    const st = this.state, u = this.u;
    u.uTime.value = t;
    this.mouse.lerp(this.mouseT, .08);
    const scatter = Math.max(st.scatter, st.introScatter, st.burst * (1 - st.shape));
    u.uShape.value = st.shape; u.uScatter.value = scatter;
    u.uForce.value = (REDUCED ? 0 : 7) * (1 - st.shape) * (1 - scatter);
    u.uOffset.value.set(st.ox, st.oy);
    u.uAlpha.value = lerp(lerp(.95, .55, st.shape), .3, scatter);
    this.rot.x = lerp(this.rot.x, this.mouseN.x * .35, .04);
    this.rot.y = lerp(this.rot.y, -this.mouseN.y * .25, .04);
    this.renderer.render(this.scene, this.camera);
  }
}

function initGL() {
  const canvas = $('#gl');
  try {
    P = new Particles(canvas);
  } catch (e) {
    document.body.classList.add('no-gl'); canvas.remove(); P = null; return;
  }
  if (!TOUCH) {
    addEventListener('pointermove', e => P.pointer(e.clientX, e.clientY), { passive: true });
    document.documentElement.addEventListener('mouseleave', () => P.leave());
  } else {
    addEventListener('touchmove', e => { const t = e.touches[0]; if (t) P.pointer(t.clientX, t.clientY); }, { passive: true });
    addEventListener('touchend', () => P.leave(), { passive: true });
  }
  const loop = t => { P.render(t / 1000); requestAnimationFrame(loop); };
  requestAnimationFrame(loop);
}

function driveParticles() {
  if (!P || document.body.classList.contains('locked')) return;
  const s = Math.max(0, scrollY - pinDistance()) / innerHeight, st = P.state;
  st.shape = REDUCED ? 0 : clamp(s / .85, 0, 1);
  st.scatter = clamp((s - (MOBILE ? 1.0 : 1.25)) / .9, 0, 1);
  const { w, h } = P.vis(), dir = LANG === 'ar' ? -1 : 1;
  st.ox = dir * w * (MOBILE ? 0 : .27) * st.shape;
  st.oy = (MOBILE ? h * .3 : h * .06) * st.shape;
}

const WORDS = { en: ['ABDULRAHMAN\nALSYAMI'], ar: ['عبدالرحمن\nالسيامي'] };
function fontForLang() { return LANG === 'ar' ? '700 170px "IBM Plex Sans Arabic"' : '800 150px Sora'; }
function textForLang() { return [WORDS[LANG][0], fontForLang()]; }

/* After the name, the particles draw the three principles as pictures (a bulb for
   thinking, code brackets for building, a rocket for shipping) with a crisp caption,
   then come back to the name. Pictures read at a glance; spelled words did not. */
const ICONS = {
  think(x, cw, ch) {
    const cx = cw / 2, cy = ch / 2 - 40;
    x.lineWidth = 34;
    x.beginPath(); x.arc(cx, cy - 20, 150, Math.PI * 0.78, Math.PI * 2.22); x.stroke();
    x.beginPath(); x.moveTo(cx - 60, cy + 150); x.lineTo(cx - 70, cy + 95); x.moveTo(cx + 60, cy + 150); x.lineTo(cx + 70, cy + 95); x.stroke();
    x.lineWidth = 26; x.beginPath(); x.moveTo(cx - 62, cy + 190); x.lineTo(cx + 62, cy + 190); x.moveTo(cx - 48, cy + 232); x.lineTo(cx + 48, cy + 232); x.stroke();
    x.lineWidth = 18; x.beginPath(); x.moveTo(cx - 45, cy + 95); x.lineTo(cx - 45, cy + 10); x.lineTo(cx - 15, cy - 25); x.lineTo(cx + 15, cy + 10); x.lineTo(cx + 45, cy - 25); x.lineTo(cx + 45, cy + 95); x.stroke();
    x.lineWidth = 22;
    for (const a of [-150, -115, -65, -30]) { const r = a * Math.PI / 180; x.beginPath(); x.moveTo(cx + Math.cos(r) * 205, cy - 20 + Math.sin(r) * 205); x.lineTo(cx + Math.cos(r) * 265, cy - 20 + Math.sin(r) * 265); x.stroke(); }
  },
  build(x, cw, ch) {
    x.textAlign = 'center'; x.textBaseline = 'middle'; x.font = '800 330px Sora'; x.fillText('</>', cw / 2, ch / 2);
  },
  ship(x, cw, ch) {
    x.save(); x.translate(cw / 2, ch / 2); x.rotate(Math.PI / 4);
    x.beginPath(); x.moveTo(0, -260); x.bezierCurveTo(95, -170, 100, -40, 80, 110); x.lineTo(-80, 110); x.bezierCurveTo(-100, -40, -95, -170, 0, -260); x.fill();
    x.beginPath(); x.moveTo(-80, 20); x.lineTo(-165, 150); x.lineTo(-80, 125); x.closePath(); x.fill();
    x.beginPath(); x.moveTo(80, 20); x.lineTo(165, 150); x.lineTo(80, 125); x.closePath(); x.fill();
    x.globalCompositeOperation = 'destination-out'; x.beginPath(); x.arc(0, -90, 44, 0, Math.PI * 2); x.fill();
    x.globalCompositeOperation = 'source-over';
    x.beginPath(); x.moveTo(-50, 135); x.quadraticCurveTo(0, 330, 50, 135); x.fill();
    x.restore();
  },
};
const STEPS = ['think', 'build', 'ship'];
const CAPS = {
  en: [['Welcome to my portfolio', 'I build systems that make life easier, with a technical and commercial mindset'], ['Think', 'Analyse the problem before writing any code'], ['Build', 'Simple systems that serve users and the business goal'], ['Ship', 'Launch to real users, then measure and improve']],
  ar: [['مرحباً بك في ملفي الشخصي', 'أبني أنظمة تسهّل حياة الناس، بعقلية تقنية وتجارية'], ['أفكّر', 'أحلّل المشكلة قبل كتابة أي سطر برمجي'], ['أبني', 'أنظمة بسيطة تخدم المستخدم وتحقق هدف النشاط'], ['أُطلق', 'إطلاق لمستخدمين فعليين، ثم قياس وتحسين مستمر']],
};
let wordIdx = -1, stageST = null;
const STAGES = STEPS.length + 1;
function showCaption(i) {
  const cap = $('#heroCap'); if (!cap) return;
  const [word, line] = CAPS[LANG][i];
  gsap.killTweensOf(cap);
  gsap.timeline()
    .to(cap, { opacity: 0, y: -10, duration: .2, ease: 'power2.in' })
    .call(() => { cap.innerHTML = `<b class="fd">${word}</b><span>${line}</span>`; cap.classList.toggle('intro', i === 0); })
    .fromTo(cap, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: .6, ease: 'back.out(2)' }, '+=.25');
  $$('#stageDots i').forEach((d, k) => d.classList.toggle('on', k === i));
}
function showWord(i) {
  if (i === wordIdx) return;
  wordIdx = i;
  if (P && !REDUCED) {
    if (i === 0) { const [txt, font] = textForLang(); P.setText(txt, font, false); }
    else P.setIcon(STEPS[i - 1], false);
  }
  showCaption(i);
}
/* The hero stays pinned while the visitor scrolls through the four stages
   (name, think, build, ship); one screen of scroll per stage, then the page moves on. */
let pinPx = 0, pinW = 0;
function pinDistance() {
  if (REDUCED) return 0;
  if (!pinPx || pinW !== innerWidth) { pinW = innerWidth; pinPx = Math.round(document.documentElement.clientHeight * (MOBILE ? 0.6 : 0.85) * (STAGES - 1)); }
  return pinPx;
}
function setupStages() {
  const track = $('#heroTrack');
  if (track) track.style.setProperty('--pin', pinDistance() + 'px');
  updateStage();
}
function updateStage() {
  if (REDUCED) { showWord(0); return; }
  const d = pinDistance(); if (!d) return;
  // stage k covers [(k-1)*step + step/2 .. k*step + step/2): half a step of scroll is enough to move on
  const step = d / (STAGES - 1), k = Math.floor((scrollY + step / 2) / step);
  showWord(clamp(k, 0, STAGES - 1));
}
/* Touch: inside the hero one swipe moves exactly one stage (native momentum skipped stages on iPhone).
   Outside the hero the page scrolls natively. */
function initHeroSwipe() {
  if (!TOUCH || REDUCED) return;
  let y0 = null, busy = false;
  const step = () => pinDistance() / (STAGES - 1);
  const heroEnd = () => $('#heroTrack').getBoundingClientRect().bottom + scrollY;
  const inHero = () => !document.body.classList.contains('locked') && scrollY < heroEnd() - 2;
  const go = dir => {
    if (busy) return;
    // between the last stage and the next section, going up returns to the last stage first
    const k = scrollY > pinDistance() + 4 && dir < 0 ? STAGES - 1 : wordIdx + dir; if (k < 0) return;
    busy = true; setTimeout(() => busy = false, 750);
    const top = k >= STAGES ? heroEnd() : Math.round(k * step());
    window.scrollTo({ top, behavior: 'smooth' });
  };
  // just below the hero, an upward swipe should step back into the last stage instead of flinging to the top
  const nearEnd = () => !document.body.classList.contains('locked') && scrollY >= heroEnd() - 2 && scrollY < heroEnd() + 60;
  let edge = false;
  addEventListener('touchstart', e => { edge = nearEnd(); y0 = inHero() || edge ? e.touches[0].clientY : null; }, { passive: true });
  addEventListener('touchmove', e => {
    if (y0 === null) return;
    if (edge && e.touches[0].clientY < y0) { y0 = null; return; } // moving on down the page: let it scroll natively
    e.preventDefault();
  }, { passive: false });
  addEventListener('touchend', e => {
    if (y0 === null) return;
    const dy = y0 - e.changedTouches[0].clientY; y0 = null;
    if (Math.abs(dy) > 28) go(dy > 0 ? 1 : -1);
  }, { passive: true });
}
addEventListener('resize', () => { if (pinW !== innerWidth) { pinPx = 0; setupStages(); ScrollTrigger.refresh(); } });
/* ---------- language ---------- */
function applyLang(first) {
  const t = T[LANG];
  document.documentElement.lang = LANG;
  document.documentElement.dir = LANG === 'ar' ? 'rtl' : 'ltr';
  localStorage.setItem('lang', LANG);
  $$('[data-en]').forEach(el => {
    const v = el.dataset[LANG]; if (v == null) return;
    if (el.hasAttribute('data-html')) el.innerHTML = v; else el.textContent = v;
  });
  $$('[data-en-ph]').forEach(el => el.placeholder = el.dataset[LANG + 'Ph']);
  $('#lang').textContent = t.lang_btn;
  document.title = t.title;
  $('.cur span').textContent = t.cur;
  renderFilters(); renderProjects();
  if (!first) { setupReveals(true); }
  if (P) { const [txt, font] = textForLang(); P.setText(txt, font, !!first); }
  if (!first) { const i = wordIdx; wordIdx = -1; if (i > 0 && P) P.setIcon(STEPS[i - 1], true); showCaption(Math.max(0, i)); wordIdx = Math.max(0, i); }
  if ($('#modal').classList.contains('open')) fillModal();
  setTimeout(() => dispatchEvent(new Event('scroll')), 350);
}

/* ---------- projects ---------- */
const visitLabel = p => /instagram\.com/.test(p.url) ? (LANG === 'ar' ? 'زُر الحساب' : 'Visit profile') : T[LANG].visit;
function statusHTML(p) { return `<span class="status ${p.st}">${T[LANG].status[p.st]}</span>`; }
function tagsHTML(p) { return `<div class="tags">${p.tags.map(x => `<span>${x}</span>`).join('')}</div>`; }
function renderFilters() {
  const t = T[LANG];
  $('#filters').innerHTML = Object.entries(t.filters).map(([k, v]) => `<button data-f="${k}" class="${k === FILTER ? 'on' : ''}">${v}</button>`).join('');
  $$('#filters button').forEach(b => b.onclick = () => { FILTER = b.dataset.f; renderFilters(); renderGrid(); });
}
function renderProjects() {
  const t = T[LANG];
  const feat = PROJECTS.filter(p => p.feat);
  $('#stack').innerHTML = feat.map((p, i) => `
    <article class="fcard" data-id="${p.id}" style="--i:${i}">
      <div class="fcard-media"><img style="${p.pos ? 'object-position:' + p.pos : ''}" src="${p.th}" srcset="${p.th} 800w, ${p.img} 1600w" sizes="(max-width:820px) 100vw, 60vw" alt="${p.t}" loading="eager"></div>
      <div class="fcard-body">
        <div class="fcard-top"><span class="num">0${i + 1}</span>${statusHTML(p)}</div>
        <h3 class="fd">${p.t}</h3>
        <p>${LANG === 'ar' ? p.s_ar : p.s_en}</p>
        ${tagsHTML(p)}
        <div class="fcard-actions">
          <button class="btn pri sm open"><span>${t.open}</span><span class="arr">→</span></button>
          ${p.url ? `<a class="link" href="${p.url}" target="_blank" rel="noopener">${visitLabel(p)} ↗</a>` : ''}
        </div>
      </div>
    </article>`).join('');
  $$('#stack .fcard').forEach(card => {
    card.querySelector('.open').addEventListener('click', e => { e.stopPropagation(); openProject(card.dataset.id); });
    card.querySelector('.fcard-media').addEventListener('click', () => openProject(card.dataset.id));
  });
  renderGrid();
  setupStack();
}
function renderGrid() {
  const t = T[LANG];
  const rest = PROJECTS.filter(p => !p.feat && (FILTER === 'all' || p.cat === FILTER));
  const grid = $('#grid');
  grid.innerHTML = rest.map(p => `
    <article class="gcard tilt" data-id="${p.id}">
      <div class="gmedia"><img src="${p.th}" alt="${p.t}" loading="lazy"><span class="go">→</span></div>
      <div class="gbody">
        <div class="row"><h3 class="fd">${p.t}</h3>${statusHTML(p)}</div>
        <p>${LANG === 'ar' ? p.s_ar : p.s_en}</p>
        ${tagsHTML(p)}
        <div class="gact">
          <button class="link open">${t.open} ${LANG === 'ar' ? '←' : '→'}</button>
          ${p.url ? `<a class="link visit" href="${p.url}" target="_blank" rel="noopener">${visitLabel(p)} ↗</a>` : ''}
        </div>
      </div>
    </article>`).join('');
  $$('.gcard', grid).forEach(c => c.addEventListener('click', () => openProject(c.dataset.id)));
  $$('.gcard .visit', grid).forEach(a => a.addEventListener('click', e => e.stopPropagation()));
  bindTilt(); bindCursorTargets();
  if (!REDUCED) gsap.fromTo($$('.gcard', grid), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: .7, stagger: .06, ease: 'power3.out', overwrite: true });
  ScrollTrigger.refresh();
}
let stackTriggers = [];
function setupStack() {
  stackTriggers.forEach(t => t.kill()); stackTriggers = [];
  const cards = $$('#stack .fcard');
  cards.forEach((card, i) => {
    card.style.transform = ''; card.style.filter = '';
    const img = card.querySelector('img');
    if (!REDUCED && !MOBILE) {
      const tw = gsap.fromTo(img, { yPercent: -5 }, { yPercent: 5, ease: 'none', scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: true } });
      stackTriggers.push(tw.scrollTrigger);
    }
    const next = cards[i + 1]; if (!next || REDUCED || MOBILE) return;
    stackTriggers.push(ScrollTrigger.create({
      trigger: next, start: 'top bottom', end: 'top top+=110', scrub: true,
      onUpdate: s => { card.style.transform = `scale(${1 - .07 * s.progress}) translateY(${-14 * s.progress}px)`; card.style.filter = `brightness(${1 - .4 * s.progress})`; },
    }));
  });
  bindCursorTargets();
}

/* ---------- modal ---------- */
let mIdx = -1, lockY = 0;
function lockScroll() {
  lockY = scrollY; document.body.style.top = -lockY + 'px'; document.body.classList.add('locked'); lenis && lenis.stop();
}
function unlockScroll() {
  document.body.classList.remove('locked'); document.body.style.top = '';
  window.scrollTo(0, lockY);
  if (lenis) { lenis.start(); lenis.resize(); lenis.scrollTo(lockY, { immediate: true, force: true }); }
}
function openProject(id) {
  const i = PROJECTS.findIndex(p => p.id === id); if (i < 0) return;
  mIdx = i; fillModal();
  $('#modal').classList.add('open'); lockScroll();
  $('#modal .close').focus({ preventScroll: true });
}
function closeModal(next) {
  $('#modal').classList.remove('open'); unlockScroll();
  // land where the visitor is, not where they started: the card now on screen, or the next section after the last project
  const p = PROJECTS[mIdx], card = document.querySelector(`[data-id="${p && p.id}"]`);
  const target = typeof next === 'string' ? document.querySelector(next) : card;
  if (target) requestAnimationFrame(() => scrollToEl(target, typeof next === 'string' ? -10 : -90));
}
function scrollToEl(el, off) {
  const y = el.getBoundingClientRect().top + scrollY + off;
  if (lenis) lenis.scrollTo(y, { duration: 1 }); else window.scrollTo({ top: y, behavior: REDUCED ? 'auto' : 'smooth' });
}
let mLock = false;
const groupOf = p => PROJECTS.filter(q => q.feat === p.feat);
function stepModal(d) {
  if (mLock) return;
  const g = groupOf(PROJECTS[mIdx]), k = g.indexOf(PROJECTS[mIdx]) + d;
  if (k >= g.length) { closeModal(PROJECTS[mIdx].feat ? '#clients' : '#exp'); return; }
  if (k < 0) { gsap.fromTo('.panel', { y: 0 }, { y: 10, duration: .12, yoyo: true, repeat: 1, ease: 'power2.out' }); return; }
  mLock = true; mIdx = PROJECTS.indexOf(g[k]); fillModal(d);
  setTimeout(() => mLock = false, 720);
}
function fillModal(dir = 0) {
  const parts = ['.m-media', '.m-body'];
  if (!dir || REDUCED) { fillModalNow(); if (!REDUCED) gsap.fromTo('.m-body > *', { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: .5, stagger: .05, ease: 'power3.out', overwrite: true }); return; }
  gsap.to(parts, { y: -70 * dir, opacity: 0, duration: .22, ease: 'power2.in', overwrite: true, onComplete: () => {
    fillModalNow();
    gsap.fromTo(parts, { y: 70 * dir, opacity: 0 }, { y: 0, opacity: 1, duration: .6, ease: 'expo.out', overwrite: true });
  } });
}
function fillModalNow() {
  const p = PROJECTS[mIdx], t = T[LANG];
  const img = $('#mImg'); img.src = p.img; img.alt = p.t; $('.m-media').scrollTop = 0;
  $('#mUrl').textContent = p.url ? p.url.replace(/^https?:\/\//, '') : t.priv;
  $('#mTitle').textContent = p.t;
  const st = $('#mStatus'); st.className = 'status ' + p.st; st.textContent = t.status[p.st];
  $('#mDesc').textContent = LANG === 'ar' ? p.l_ar : p.l_en;
  $('#mTags').innerHTML = p.tags.map(x => `<span>${x}</span>`).join('');
  $('#mYear').textContent = p.year; $('#mRole').textContent = LANG === 'ar' ? p.role_ar : p.role_en;
  const v = $('#mVisit'); if (p.url) { v.href = p.url; v.style.display = ''; v.querySelector('span').textContent = /instagram\.com/.test(p.url) ? visitLabel(p) : (LANG === 'ar' ? 'زُر الموقع الحيّ' : 'Visit live site'); } else v.style.display = 'none';
  const g = groupOf(p), k = g.indexOf(p) + 1;
  $('#mCount').innerHTML = `<span class="m-group">${p.feat ? (LANG === 'ar' ? 'مشاريعي' : 'My ventures') : (LANG === 'ar' ? 'أعمال للعملاء' : 'Client work')}</span> ${String(k).padStart(2, '0')} / ${String(g.length).padStart(2, '0')}`;
  $('.m-rail i').style.height = (k / g.length * 100) + '%';
  $('#modal .up').disabled = k === 1; $('#modal .down').disabled = false;
  const last = k === g.length, hint = $('#mHint');
  hint.textContent = last ? (p.feat ? (LANG === 'ar' ? 'مرّر لعرض أعمال العملاء' : 'Scroll to see client work') : (LANG === 'ar' ? 'مرّر لمتابعة الصفحة' : 'Scroll to continue')) : (LANG === 'ar' ? 'مرّر للمشروع التالي' : 'Scroll for the next project');
  $('#modal .down').setAttribute('aria-label', last ? 'Close and continue' : 'Next project');
  $('.m-body').scrollTop = 0; $('.panel').scrollTop = 0;
}
function initModal() {
  $('#modal .back').addEventListener('click', () => closeModal());
  $('#modal .close').addEventListener('click', () => closeModal());
  $('#modal .up').addEventListener('click', () => stepModal(-1));
  $('#modal .down').addEventListener('click', () => stepModal(1));
  // Vertical feed: wheel or swipe moves to the next or previous project once the inner text has nothing left to scroll
  const panel = $('#modal .panel');
  const innerCanScroll = (el, dir) => !!el && ((dir > 0 && el.scrollTop + el.clientHeight < el.scrollHeight - 2) || (dir < 0 && el.scrollTop > 0));
  let acc = 0, accT = 0;
  panel.addEventListener('wheel', e => {
    const dir = Math.sign(e.deltaY); if (!dir) return;
    if (innerCanScroll(e.target.closest('.m-body, .m-media'), dir)) return;
    const now = performance.now(); if (now - accT > 220) acc = 0; accT = now;
    acc += e.deltaY;
    if (Math.abs(acc) > 70) { acc = 0; stepModal(dir); }
  }, { passive: true });
  let ty = 0;
  panel.addEventListener('touchstart', e => { ty = e.touches[0].clientY; }, { passive: true });
  panel.addEventListener('touchend', e => {
    const dy = ty - e.changedTouches[0].clientY; if (Math.abs(dy) < 120) return;
    const dir = dy > 0 ? 1 : -1;
    if (innerCanScroll(panel, dir) || innerCanScroll(e.target.closest('.m-media'), dir)) return;
    stepModal(dir);
  }, { passive: true });
  addEventListener('keydown', e => {
    if (!$('#modal').classList.contains('open')) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowDown' || e.key === 'PageDown') { e.preventDefault(); stepModal(1); }
    if (e.key === 'ArrowUp' || e.key === 'PageUp') { e.preventDefault(); stepModal(-1); }
  });
}

/* ---------- scroll + motion ---------- */
function scrollToSel(sel) {
  const el = $(sel); if (!el) return;
  if (lenis) lenis.scrollTo(el, { offset: sel === '#hero' ? 0 : -20, duration: 1.4 });
  else el.scrollIntoView({ behavior: REDUCED ? 'auto' : 'smooth' });
}
function initScroll() {
  if (!REDUCED && window.Lenis) {
    lenis = new Lenis({ lerp: .09, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }
  $$('a[href^="#"]').forEach(a => a.addEventListener('click', e => { const h = a.getAttribute('href') || ''; if (!h.startsWith('#')) return; e.preventDefault(); scrollToSel(h); }));
  const nav = $('#nav'), bar = $('#progress'), navLinks = $$('#navLinks a'), ind = $('#navLinks .ind');
  const secs = ['about', 'work', 'clients', 'exp', 'vol', 'contact'].map(id => $('#' + id));
  const onScroll = () => {
    if (document.body.classList.contains('locked')) return;
    updateStage();
    clearTimeout(onScroll.rt); onScroll.rt = setTimeout(() => revealPass(), 120);
    nav.classList.toggle('scrolled', scrollY > 30);
    let cur = ''; secs.forEach(s => { if (s.getBoundingClientRect().top <= innerHeight * .45) cur = '#' + s.id; });
    if (scrollY + innerHeight >= document.documentElement.scrollHeight - 4) cur = '#contact';
    let on = null; navLinks.forEach(a => { const hit = a.getAttribute('href') === cur; a.classList.toggle('on', hit); if (hit) on = a; });
    if (on) { ind.style.left = on.offsetLeft + 'px'; ind.style.width = on.offsetWidth + 'px'; ind.classList.add('show'); } else ind.classList.remove('show');
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.width = (max > 0 ? scrollY / max * 100 : 0) + '%';
    driveParticles();
  };
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
}
let io = null;
/* ---------- kinetic typography ----------
   Same language as the motion-graphics ads: words land one at a time with a
   bounce, the last word is the accent and gets an underline that draws itself,
   and each section heading drifts in like a camera settling on it. */
function splitEl(el) {
  const words = el.textContent.trim().split(/\s+/);
  el.innerHTML = words.map((w, i) => `<span class="w${i === words.length - 1 ? ' hl' : ''}"><i>${w}</i></span>`).join(' ');
}
function splitChars(el) {
  if (el.dataset.chars) return;
  el.dataset.chars = 1;
  el.innerHTML = [...el.textContent].map(c => c === ' ' ? ' ' : `<span class="ch">${c}</span>`).join('');
}
function landWords(el) {
  const words = $$('.w i', el), hl = el.querySelector('.hl');
  const tl = gsap.timeline();
  tl.fromTo(words, { yPercent: 115, scale: 1.4, rotate: LANG === 'ar' ? -6 : 6, opacity: 0, filter: 'blur(8px)' },
    { yPercent: 0, scale: 1, rotate: 0, opacity: 1, filter: 'blur(0px)', duration: .8, stagger: .11, ease: 'back.out(2.2)' });
  if (hl) tl.add(() => hl.classList.add('drawn'), '-=.25');
  return tl;
}
let camTriggers = [];
function setupCamera() {
  camTriggers.forEach(t => t.kill()); camTriggers = [];
  if (REDUCED) return;
  $$('.sh').forEach(sh => {
    const narrow = innerWidth < 700;
    const tw = gsap.fromTo(sh, { scale: narrow ? 1 : 1.12, x: narrow ? 0 : (LANG === 'ar' ? -1 : 1) * 60, opacity: .35 },
      { scale: 1, x: 0, opacity: 1, ease: 'none', scrollTrigger: { trigger: sh, start: 'top 95%', end: 'top 45%', scrub: .6 } });
    camTriggers.push(tw.scrollTrigger);
    const idx = sh.querySelector('.idx');
    if (idx) {
      const t2 = gsap.fromTo(idx, { yPercent: 60, rotate: -12 }, { yPercent: -30, rotate: 0, ease: 'none', scrollTrigger: { trigger: sh, start: 'top bottom', end: 'bottom top', scrub: true } });
      camTriggers.push(t2.scrollTrigger);
    }
  });
}
let revealPass = () => {};
function setupReveals(reset) {
  $$('[data-shown]').forEach(el => delete el.dataset.shown);
  io && io.disconnect();
  $$('.split').forEach(el => { splitEl(el); if (!REDUCED) gsap.set($$('i', el), { yPercent: 115, opacity: 0 }); });
  // Arabic letters join, so splitting them into separate spans breaks the word; wipe it in whole instead
  $$('.eyebrow, .sk h3').forEach(el => { if (REDUCED) return; if (LANG === 'ar') { el.dataset.chars = ''; gsap.set(el, { opacity: 0, x: 24, letterSpacing: '.4em' }); } else { gsap.set(el, { opacity: 1, x: 0, clearProps: 'letterSpacing' }); el.dataset.chars = ''; splitChars(el); gsap.set($$('.ch', el), { opacity: 0, y: 8 }); } });
  if (reset) $$('.reveal').forEach(el => el.classList.remove('in'));
  if (!REDUCED) gsap.set('.pr b, .ti, .org', { opacity: 0 });
  io = new IntersectionObserver(entries => entries.forEach(en => {
    if (!en.isIntersecting) return;
    revealEl(en.target);
  }), { threshold: .2, rootMargin: '0px 0px -8% 0px' });
  function revealEl(el) {
    if (el.dataset.shown) return; el.dataset.shown = 1; io.unobserve(el);
    if (REDUCED) { el.classList.add('in'); if (el.classList.contains('stat')) countUp(el); return; }
    if (el.classList.contains('split')) landWords(el);
    else if (el.matches('.eyebrow, .sk h3')) { if (LANG === 'ar') gsap.to(el, { opacity: 1, x: 0, letterSpacing: '0em', duration: .8, ease: 'expo.out' }); else gsap.to($$('.ch', el), { opacity: 1, y: 0, duration: .35, stagger: .03, ease: 'power2.out' }); }
    else if (el.classList.contains('stat')) countUp(el);
    else if (el.classList.contains('pr')) {
      gsap.fromTo(el.querySelector('b'), { scale: 2.6, rotate: -20, opacity: 0 }, { scale: 1, rotate: 0, opacity: 1, duration: .7, ease: 'back.out(3)' });
      gsap.fromTo(el.querySelector('h4'), { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: .7, delay: .2, ease: 'power3.out' });
    }
    else if (el.classList.contains('ti')) gsap.fromTo(el, { x: (LANG === 'ar' ? 1 : -1) * 60, opacity: 0 }, { x: 0, opacity: 1, duration: .8, ease: 'expo.out' });
    else if (el.classList.contains('org')) gsap.fromTo(el, { scale: .6, rotate: (Math.random() - .5) * 16, opacity: 0 }, { scale: 1, rotate: 0, opacity: 1, duration: .7, ease: 'back.out(2)' });
    el.classList.add('in');
  }
  revealPass = () => $$('.split, .reveal, .stat, .eyebrow, .sk h3').forEach(el => { if (!el.dataset.shown && el.getBoundingClientRect().top < innerHeight) revealEl(el); });
  $$('.split, .reveal, .stat, .eyebrow, .sk h3').forEach(el => io.observe(el));
  setupCamera();
}
function countUp(el) {
  const b = el.querySelector('b'), n = parseFloat(b.dataset.n), dec = +(b.dataset.dec || 0), suf = b.dataset.suf || '';
  if (REDUCED) { b.textContent = n.toFixed(dec) + suf; return; }
  const o = { v: 0 };
  gsap.fromTo(b, { scale: .4, opacity: 0 }, { scale: 1, opacity: 1, duration: .6, ease: 'back.out(3)' });
  gsap.to(o, { v: n, duration: 1.6, ease: 'expo.out', onUpdate: () => b.textContent = o.v.toFixed(dec) + suf,
    onComplete: () => gsap.fromTo(b, { scale: 1.18 }, { scale: 1, duration: .5, ease: 'elastic.out(1,.4)' }) });
}

/* ---------- cursor, magnet, tilt ---------- */
function initCursor() {
  if (TOUCH) return;
  const c = $('.cur'), d = $('.cur-d'); let x = innerWidth / 2, y = innerHeight / 2, cx = x, cy = y;
  addEventListener('pointermove', e => { x = e.clientX; y = e.clientY; c.classList.remove('hide'); d.classList.remove('hide'); }, { passive: true });
  document.documentElement.addEventListener('mouseleave', () => { c.classList.add('hide'); d.classList.add('hide'); });
  const loop = () => { cx = lerp(cx, x, .18); cy = lerp(cy, y, .18); c.style.transform = `translate(${cx}px,${cy}px) translate(-50%,-50%)`; d.style.transform = `translate(${x}px,${y}px) translate(-50%,-50%)`; requestAnimationFrame(loop); };
  loop();
  bindCursorTargets();
}
function bindCursorTargets() {
  if (TOUCH) return;
  const c = $('.cur');
  $$('a, button, .filters button').forEach(el => { if (el.dataset.cb) return; el.dataset.cb = 1; el.addEventListener('mouseenter', () => c.classList.add('big')); el.addEventListener('mouseleave', () => c.classList.remove('big')); });
  $$('.fcard-media, .gcard').forEach(el => { if (el.dataset.ct) return; el.dataset.ct = 1; el.addEventListener('mouseenter', () => c.classList.add('txt')); el.addEventListener('mouseleave', () => c.classList.remove('txt')); });
}
function initMagnet() {
  if (TOUCH || REDUCED) return;
  $$('.magnet').forEach(el => {
    el.addEventListener('mousemove', e => { const r = el.getBoundingClientRect(); gsap.to(el, { x: (e.clientX - r.left - r.width / 2) * .3, y: (e.clientY - r.top - r.height / 2) * .35, duration: .4, ease: 'power3.out' }); });
    el.addEventListener('mouseleave', () => gsap.to(el, { x: 0, y: 0, duration: .7, ease: 'elastic.out(1,.4)' }));
  });
}
function bindTilt() {
  if (TOUCH || REDUCED) return;
  $$('.tilt').forEach(el => {
    if (el.dataset.tilt) return; el.dataset.tilt = 1;
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect(), px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
      el.style.setProperty('--ry', ((px - .5) * 10) + 'deg'); el.style.setProperty('--rx', ((.5 - py) * 8) + 'deg');
      el.style.setProperty('--mx', px * 100 + '%'); el.style.setProperty('--my', py * 100 + '%');
    });
    el.addEventListener('mouseleave', () => { el.style.setProperty('--ry', '0deg'); el.style.setProperty('--rx', '0deg'); });
  });
}

/* ---------- scramble roles ---------- */
function initRoles() {
  const el = $('#role .rs'); if (!el) return; let i = 0;
  const chars = '!<>-_\\/[]{}=+*^?#01';
  const show = txt => new Promise(res => {
    if (REDUCED) { el.textContent = txt; return res(); }
    // scrambling swaps single letters, which breaks Arabic joining mid-animation; slide whole lines instead
    if (LANG === 'ar') { gsap.timeline({ onComplete: res }).to(el, { opacity: 0, y: -12, duration: .3, ease: 'power2.in' }).call(() => { el.textContent = txt; }).fromTo(el, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: .55, ease: 'back.out(2)' }); return; }
    const from = el.textContent, len = Math.max(from.length, txt.length), q = [];
    for (let k = 0; k < len; k++) { const s = Math.floor(Math.random() * 18), e = s + Math.floor(Math.random() * 18); q.push({ s, e, to: txt[k] || '' }); }
    let f = 0; const step = () => {
      let out = '', done = 0;
      q.forEach(c => { if (f >= c.e) { done++; out += c.to; } else if (f >= c.s) out += chars[Math.floor(Math.random() * chars.length)]; else out += from[q.indexOf(c)] || ''; });
      el.textContent = out; f++;
      if (done === q.length) res(); else requestAnimationFrame(step);
    }; step();
  });
  const cycle = async () => { const roles = T[LANG].roles; i = (i + 1) % roles.length; await show(roles[i]); };
  el.textContent = T[LANG].roles[0];
  setInterval(cycle, 3000);
}

/* ---------- misc ---------- */
async function copyEmail() {
  const btn = $('#copyBtn'), t = T[LANG];
  try { await navigator.clipboard.writeText('ab.alsyami@gmail.com'); btn.querySelector('span').textContent = t.copied; setTimeout(() => btn.querySelector('span').textContent = t.copy, 1600); } catch (e) { location.href = 'mailto:ab.alsyami@gmail.com'; }
}
function initClock() {
  const el = $('#clock'); if (!el) return;
  const f = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Riyadh', hour: '2-digit', minute: '2-digit', hour12: false });
  const tick = () => el.textContent = f.format(new Date()) + ' GMT+3';
  tick(); setInterval(tick, 10000);
}
function toggleLang() { LANG = LANG === 'ar' ? 'en' : 'ar'; applyLang(false); }

/* ---------- boot ---------- */
async function boot() {
  const counter = { v: 0 }, num = $('#loader .ld-num'), bar = $('#loader .ld-bar i');
  const count = gsap.to(counter, { v: 100, duration: 1.3, ease: 'power2.inOut', onUpdate: () => { num.textContent = String(Math.round(counter.v)).padStart(3, '0'); bar.style.width = counter.v + '%'; } });
  applyLang(true);
  initGL();
  initScroll(); initModal(); initCursor(); initMagnet(); bindTilt(); initRoles(); initClock();
  $('#lang').addEventListener('click', toggleLang);
  $('#copyBtn').addEventListener('click', copyEmail);
  setupReveals(false);
  await Promise.race([document.fonts.ready, wait(1800)]);
  if (P) { const [txt, font] = textForLang(); await P.setText(txt, font, true); }
  await new Promise(r => { if (count.progress() >= 1) r(); else count.eventCallback('onComplete', r); });
  const loader = $('#loader');
  gsap.to(loader, { yPercent: -100, duration: .9, ease: 'expo.inOut', onComplete: () => loader.remove() });
  if (P) gsap.to(P.state, { introScatter: 0, duration: 2.4, ease: 'expo.out', delay: .25 });
  wordIdx = 0; showCaption(0); setupStages(); initHeroSwipe();
  gsap.fromTo('.hero-in > *, .hero .pill, .scroll-hint', { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 1.1, stagger: .09, ease: 'expo.out', delay: .55 });
  setTimeout(() => ScrollTrigger.refresh(), 1200);
  addEventListener('load', () => ScrollTrigger.refresh());
}
boot();
