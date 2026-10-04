/* ══════════════════════════════════════
   SCROLL-DRIVEN LOGO SHRINK  (smooth)
   · Logo starts full width, shrinks toward the top-left corner
   · scroll event → updates targetT only
   · rAF loop → lerps currentT toward targetT each frame
══════════════════════════════════════ */
(function () {
  const logo = document.getElementById('heroLogo');
  const nav = document.getElementById('topbarNav');
  const intro = document.querySelector('.intro');
  if (!logo) return;

  /* ── Config ─────────────────────────── */
  const COMPACT_LOGO_W = 150;   // px
  const SCROLL_RANGE   = 350;   // px
  const SMOOTH         = 0.08;  // tension for smooth shrinking

  /* ── State ──────────────────────────── */
  let targetT  = 0;
  let currentT = 0;
  let rafId    = null;
  let fullW    = 0;

  function calcSizes() {
    const gutter = parseFloat(getComputedStyle(logo).left) || 14;
    fullW = document.documentElement.clientWidth - gutter * 2;
    logo.style.width = fullW + 'px';
    // Leave room above the intro text for the full-size logo
    if (intro) intro.style.paddingTop = (logo.offsetHeight + 60) + 'px';
  }

  /* ── Easing ─────────────────────────── */
  function ease(t) {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  }
  function lerp(a, b, t) { return a + (b - a) * t; }

  function render(t) {
    if (fullW === 0) return;
    const te = ease(t);
    const scale = lerp(1, COMPACT_LOGO_W / fullW, te);
    logo.style.transform = `scale(${scale})`;
    if (nav) {
      // Nav fades in once the logo has cleared the right side
      const navT = Math.min(Math.max((te - 0.5) / 0.5, 0), 1);
      nav.style.opacity = navT;
      nav.style.visibility = navT > 0 ? 'visible' : 'hidden';
    }
  }

  /* ── Animation Loop ── */
  function tick() {
    const delta = targetT - currentT;
    currentT += delta * SMOOTH;
    render(currentT);

    if (Math.abs(delta) > 0.0002) {
      rafId = requestAnimationFrame(tick);
    } else {
      currentT = targetT;
      render(currentT);
      rafId = null;
    }
  }

  /* ── Scroll Event ── */
  function onScroll() {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    targetT = Math.min(Math.max(scrollY / SCROLL_RANGE, 0), 1);
    if (!rafId) rafId = requestAnimationFrame(tick);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', () => { calcSizes(); render(currentT); });
  window.addEventListener('load', () => { calcSizes(); onScroll(); });
  calcSizes();
  onScroll();
  currentT = targetT;
  render(currentT);
})();

const MODEL_DATA = {
  luka: {
    number: '01',
    name: 'LUKA',
    breed: 'Siamese Lynx Point',
    origin: 'Paris, France',
    dob: '2021. 02. 12',
    keywords: ['Sharp', 'Sleek', 'Futuristic'],
    hobby: 'High-jump (높이뛰기)',
    habit: 'Tail flicking (꼬리 까딱거리기)',
    favorite: 'Vermilion (버밀리온 레드)',
    image: 'img/models/model_Luka_Siamese Lynx Point.png',
    runway: 'runway/luka.mp4',
  },
  onyx: {
    number: '02',
    name: 'ONYX',
    breed: 'Abyssinian',
    origin: 'Cairo, Egypt',
    dob: '2020. 05. 05',
    keywords: ['Noble', 'Golden', 'Ancient'],
    hobby: 'Shadow hunting (그림자 쫓기)',
    habit: 'Slow blinking (느리게 눈 깜빡이기)',
    favorite: 'Ochre (황토색, 오커)',
    image: 'img/models/model_Onyx.png',
    runway: 'runway/onyx.mp4',
  },
  tuco: {
    number: '03',
    name: 'TUCO',
    breed: 'Russian Blue',
    origin: 'Moscow, Russia',
    dob: '2021. 08. 21',
    keywords: ['Velvet', 'Silent', 'Stoic'],
    hobby: 'Dust particle tracking (먼지 움직임 관찰)',
    habit: 'Kneading (꾹꾹이)',
    favorite: 'Emerald Green (에메랄드 그린)',
    image: 'img/models/model_Tuco_Russian Blue.png',
    runway: 'runway/tuco.mp4',
  },
  bianca: {
    number: '04',
    name: 'BIANCA',
    breed: 'Persian Chinchilla',
    origin: 'Tehran, Iran',
    dob: '2019. 12. 25',
    keywords: ['Diva', 'Couture', 'Majestic'],
    hobby: 'Being groomed (털 관리 받기)',
    habit: 'Chin resting (턱 괴고 있기)',
    favorite: 'Pearl White (펄 화이트)',
    image: 'img/models/model_Bianca_Persian Chinchilla.png',
    runway: 'runway/bianca.mp4',
  },
  dupree: {
    number: '05',
    name: 'DUPREE',
    breed: 'Bengal',
    origin: 'Mumbai, India',
    dob: '2022. 03. 14',
    mbti: 'ESTP',
    keywords: ['Wild', 'Powerful', 'Exotic'],
    hobby: 'Laser tag (레이저 포인터 잡기)',
    habit: 'Pouncing (사냥 자세 취하기)',
    favorite: 'Charcoal (차콜 블랙)',
    image: 'img/models/model_Dupree_Bengal.png',
    runway: 'runway/DUPREE.mp4',
  },
  arthur: {
    number: '06',
    name: 'ARTHUR',
    breed: 'British Shorthair',
    origin: 'London, UK',
    dob: '2020. 06. 30',
    keywords: ['Classic', 'Solid', 'Serene'],
    hobby: 'People watching (사람 구경하기)',
    habit: 'Napping upright (앉아서 졸기)',
    favorite: 'Navy Blue (네이비 블루)',
    image: 'img/models/model_Arthur_British Shorthair.png',
    runway: 'runway/ARTHUR.mp4',
  },
  valka: {
    number: '07',
    name: 'VALKA',
    breed: 'Maine Coon',
    origin: 'Oslo, Norway',
    dob: '2018. 11. 11',
    keywords: ['Legend', 'Northern', 'Rugged'],
    hobby: 'Bird watching (창밖 새 구경)',
    habit: 'Chirping (채터링, 새 소리 흉내 내기)',
    favorite: 'Frosted Silver (프로스테드 실버)',
    image: 'img/models/model_Valka_Maine Coon.png',
    runway: 'runway/valka.mp4',
  },
  jinx: {
    number: '08',
    name: 'JINX',
    breed: 'Turkish Angora',
    origin: 'Rome, Italy',
    dob: '2021. 01. 01',
    keywords: ['Graphic', 'Avant-garde', 'Dark'],
    hobby: 'Singing (우아하게 울기)',
    habit: 'Paw stretching (앞발 쭉 뻗기)',
    favorite: 'Espresso (에스프레소 브라운)',
    image: 'img/models/model_Jinx_Turkish Angora.png',
    runway: 'runway/jinx.mp4',
  },
  roman: {
    number: '09',
    name: 'ROMAN',
    breed: 'Siamese',
    origin: 'Portland, USA',
    dob: '2019. 09. 09',
    keywords: ['Rustic', 'Cinema', 'Earthy'],
    hobby: 'Hiking (산책 고양이)',
    habit: 'Head-butting (머리 들이밀기)',
    favorite: 'Forest Green (포레스트 그린)',
    image: 'img/models/model_Roman_Siamese.png',
    runway: 'runway/roman.mp4',
  },
  soren: {
    number: '10',
    name: 'SOREN',
    breed: 'Norwegian Forest',
    origin: 'Addis Ababa, Ethiopia',
    dob: '2022. 03. 03',
    keywords: ['Bohemian', 'Fluid', 'Soft'],
    hobby: 'Feather play (깃털 장난감 놀이)',
    habit: 'Tail waving (꼬리 살랑거리기)',
    favorite: 'Burnt Orange (번트 오렌지)',
    image: 'img/models/model_Soren_Norwegian Forest.png',
    runway: 'runway/soren.mp4',
  },
  kael: {
    number: '11',
    name: 'KAEL',
    breed: 'British Shorthair',
    origin: 'Berlin, Germany',
    dob: '2021. 04. 02',
    keywords: ['Solid', 'Reliable', 'Quiet'],
    hobby: 'Cube sitting (네모난 박스 들어가기)',
    habit: 'Ear twitching (귀 쫑긋거리기)',
    favorite: 'Slate Grey (슬레이트 그레이)',
    image: 'img/models/model_Kael_British Shorthair.png',
    runway: 'runway/kael.mp4',
  },
  zane: {
    number: '12',
    name: 'ZANE',
    breed: 'Somali',
    origin: 'London, UK',
    dob: '2022. 07. 17',
    keywords: ['Icon', 'Geometric', 'Alien-chic'],
    hobby: 'Puzzle toys (노즈워크 퍼즐 풀기)',
    habit: 'High-perching (높은 곳에 올라가 앉아있기)',
    favorite: 'Pale Lilac (페일 라일락)',
    image: 'img/models/model_Zane_Somali.png',
    runway: 'runway/zane.mp4',
  },
  lucian: {
    number: '13',
    name: 'LUCIAN',
    breed: 'Bombay',
    origin: 'Lyon, France',
    dob: '2021. 02. 28',
    keywords: ['Smart', 'Velvet', 'Monotone'],
    hobby: 'Fetching (공 물어오기)',
    habit: 'Muzzle twitching (수염 파르르 떨기)',
    favorite: 'Copper Gold (코퍼 골드)',
    image: 'img/models/model_Lucian_Bombay.png',
    runway: 'runway/LUCIAN.mp4',
  },
  anya: {
    number: '14',
    name: 'ANYA',
    breed: 'Ragdoll',
    origin: 'St. Petersburg, Russia',
    dob: '2021. 05. 19',
    keywords: ['Dreamy', 'Cloud', 'Silk'],
    hobby: 'Cuddling (품에 안겨있기)',
    habit: 'Flopping (바닥에 툭 쓰러지며 눕기)',
    favorite: 'Sky Blue (스카이 블루)',
    image: 'img/models/model_Anya_Ragdoll.png',
    runway: 'runway/anya.mp4',
  },
  milo: {
    number: '15',
    name: 'MILO',
    breed: 'Scottish Fold',
    origin: 'Tokyo, Japan',
    dob: '2020. 10. 10',
    keywords: ['Minimal', 'Round', 'Composed'],
    hobby: 'Window gazing (가만히 바깥 풍경 보기)',
    habit: 'Sitting like a human (사람처럼 엉덩이 대고 앉기)',
    favorite: 'Soft Beige (소프트 베이지)',
    image: 'img/models/model_Milo_Scottish Fold.png',
    runway: 'runway/milo.mp4',
  },
  jackson: {
    number: '16',
    name: 'JACKSON',
    breed: 'Siamese',
    origin: 'New York, USA',
    dob: '2021. 06. 15',
    keywords: ['High-gloss', 'Panther', 'Urban'],
    hobby: 'Acrobatics (공중 점프)',
    habit: 'Leg rubbing (사람 다리에 몸 비비기)',
    favorite: 'Champagne Gold (샴페인 골드)',
    image: 'img/models/model_Jackson_Siamese.png',
    runway: 'runway/jaxkson.mp4',
  },
  caspian: {
    number: '17',
    name: 'CASPIAN',
    breed: 'Turkish Van',
    origin: 'Van, Turkey',
    dob: '2020. 08. 12',
    keywords: ['Athletic', 'Auburn', 'Contrasted'],
    hobby: 'Water splashing',
    habit: 'Tail thumping',
    favorite: 'Terracotta',
    image: 'img/models/model_CASPIAN_ragdoll.png',
    runway: 'runway/caspian.mp4',
  },
  freya: {
    number: '18',
    name: 'FREYA',
    breed: 'Siberian',
    origin: 'Novosibirsk, Russia',
    dob: '2019. 01. 15',
    keywords: ['Majestic', 'Triple-coat', 'Sovereign'],
    hobby: 'Snow gazing',
    habit: 'Heavy purring',
    favorite: 'Ice Silver',
    image: 'img/models/model_FREYA_Siberian.png',
    runway: 'runway/freya.mp4',
  },
  gideon: {
    number: '19',
    name: 'GIDEON',
    breed: 'American Curl',
    origin: 'California, USA',
    dob: '2021. 09. 01',
    keywords: ['Sculptural', 'Alert', 'Curvature'],
    hobby: 'Unlocking doors',
    habit: 'Tilting head 45 degrees',
    favorite: 'Mustard Yellow',
    image: 'img/models/model_GIDEON_Egyptian Mau.png',
    runway: 'runway/gideon.mp4',
  },
  ophelia: {
    number: '20',
    name: 'OPHELIA',
    breed: 'Balinese',
    origin: 'San Francisco, USA',
    dob: '2022. 05. 24',
    keywords: ['Fluid', 'Aristocratic', 'Sapphire'],
    hobby: 'Following shadows',
    habit: 'Elegant tail wrapping',
    favorite: 'Lavender White',
    image: 'img/models/model_OPHELIA_Turkish Van.png',
    runway: 'runway/ophelia.mp4',
  },
  tilly: {
    number: '21',
    name: 'TILLY',
    breed: 'Munchkin',
    origin: 'New York, USA',
    dob: '2023. 01. 05',
    keywords: ['Poised', 'Compact', 'Bold'],
    hobby: 'Standing on hind legs',
    habit: 'Toy hoarding',
    favorite: 'Pastel Coral',
    image: 'img/models/model_TILLY_Munchkin.png',
    runway: 'runway/tilly.mp4',
  },
};

// Lookbook photos + clips per model — [path, width, height]; generated from the lookbook/ folders
const LOOKBOOK = {
  luka: [
    ['lookbook/01_LUKA/Seedream5.0_Pro_T2I_00013.png', 1024, 1024],
    ['lookbook/01_LUKA/Seedream5.0_Pro_T2I_00015.png', 1024, 1024],
    ['lookbook/01_LUKA/djinc_httpss.mj.runYH_yJrcncn8_slight_motion_--ar_34_--video__5c01da52-8a73-477e-938e-50ac456195e0_3.mp4', 544, 720],
  ],
  onyx: [
    ['lookbook/02_ONYX/GPT_image_2.5_flare_t2i_00001_.png', 1024, 1536],
    ['lookbook/02_ONYX/Seedream5.0_Pro_T2I_00010.png', 1024, 1024],
    ['lookbook/02_ONYX/Seedream5.0_Pro_T2I_00021.png', 1024, 1024],
  ],
  tuco: [
    ['lookbook/03_TUCO/GPT_image_2.5_flare_t2i_00001_ (5).png', 1024, 1536],
    ['lookbook/03_TUCO/Seedream5.0_Pro_T2I_00001 (4).png', 1024, 1024],
    ['lookbook/03_TUCO/Seedream5.0_Pro_T2I_00003.png', 1024, 1024],
  ],
  bianca: [
    ['lookbook/04_BIANCA/GPT_image_2.5_flare_t2i_00001_ (2).png', 1024, 1536],
    ['lookbook/04_BIANCA/Seedream5.0_Pro_T2I_00002.png', 1024, 1024],
    ['lookbook/04_BIANCA/Seedream5.0_Pro_T2I_00006.png', 1024, 1024],
    ['lookbook/04_BIANCA/djinc_httpss.mj.runGZuKzfpEsrI_slight_motion_--ar_34_--video__9ab8c044-d407-42d0-8600-b2c38ae054c0_2.mp4', 544, 720],
  ],
  dupree: [
    ['lookbook/05_DUPREE/GPT_image_2.5_flare_t2i_00001_ (4).png', 1024, 1536],
    ['lookbook/05_DUPREE/Seedream5.0_Pro_T2I_00014.png', 1024, 1024],
    ['lookbook/05_DUPREE/djinc_httpss.mj.runrcbtFVbnCkg_slight_motion_--ar_34_--video__d91225aa-1de9-4075-86a3-7234e50dc73d_3.mp4', 544, 720],
  ],
  arthur: [
    ['lookbook/06_ARTHUR/Seedream5.0_Pro_T2I_00001 (3).png', 1024, 1024],
    ['lookbook/06_ARTHUR/Seedream5.0_Pro_T2I_00008.png', 1024, 1024],
    ['lookbook/06_ARTHUR/djinc_httpss.mj.runU2X5uWZvtlQ_slight_motion_--ar_34_--video__c7b6f84b-94b5-4b03-819f-7adfb761365b_0.mp4', 544, 720],
  ],
  valka: [
    ['lookbook/07_VALKA/Seedream5.0_Pro_T2I_00001.png', 1024, 1024],
    ['lookbook/07_VALKA/Seedream5.0_Pro_T2I_00007.png', 1024, 1024],
    ['lookbook/07_VALKA/Seedream5.0_Pro_T2I_00009.png', 1024, 1024],
  ],
  jinx: [
    ['lookbook/08_JINX/Seedream5.0_Pro_T2I_00001 (1).png', 1024, 1024],
    ['lookbook/08_JINX/Seedream5.0_Pro_T2I_00016.png', 1024, 1024],
    ['lookbook/08_JINX/Seedream5.0_Pro_T2I_00019.png', 1024, 1024],
    ['lookbook/08_JINX/djinc_httpss.mj.run9g4Lo1-2dJ4_slight_motion_--ar_34_--video__176b081c-e07b-4562-bc6c-2ceb0b2a26c3_3.mp4', 544, 720],
  ],
  roman: [
    ['lookbook/09_ROMAN/Seedream5.0_Pro_T2I_00001 (2).png', 1024, 1024],
    ['lookbook/09_ROMAN/Seedream5.0_Pro_T2I_00012.png', 1024, 1024],
    ['lookbook/09_ROMAN/Seedream5.0_Pro_T2I_00017.png', 1024, 1024],
  ],
  soren: [
    ['lookbook/10_SOREN/Seedream5.0_Pro_T2I_00002.png', 1024, 1024],
  ],
  kael: [
    ['lookbook/11_KAEL/Seedream5.0_Pro_T2I_00001 (5).png', 1024, 1024],
    ['lookbook/11_KAEL/Seedream5.0_Pro_T2I_00015.png', 1024, 1024],
  ],
  zane: [
    ['lookbook/12_ZANE/Seedream5.0_Pro_T2I_00018.png', 1024, 1024],
  ],
  lucian: [
    ['lookbook/13_LUCIAN/Seedream5.0_Pro_T2I_00001.png', 1024, 1024],
    ['lookbook/13_LUCIAN/djinc_httpss.mj.runeX5GWzUaCvQ_slight_motion_--ar_34_--video__b23e8e70-d95e-48ab-a94d-52e90745bc4c_2.mp4', 544, 720],
    ['lookbook/13_LUCIAN/djinc_httpss.mj.runeX5GWzUaCvQ_slight_motion_--ar_34_--video__b23e8e70-d95e-48ab-a94d-52e90745bc4c_3.mp4', 544, 720],
    ['lookbook/13_LUCIAN/djinc_httpss.mj.runy94mmMoc_2Q_slight_motion_--ar_43_--video__21d785db-540b-4d03-bba4-c7d50b949f62_1.mp4', 720, 544],
  ],
  anya: [
    ['lookbook/14_ANYA/Seedream5.0_Pro_T2I_00007.png', 1024, 1024],
    ['lookbook/14_ANYA/djinc_httpss.mj.runJhDuNcb0Utk_slight_motion_--ar_34_--video__ead1e734-c7ce-4705-9986-59f0e8e42642_3.mp4', 544, 720],
  ],
  milo: [
    ['lookbook/15_MILO/Seedream5.0_Pro_T2I_00001 (7).png', 1024, 1024],
    ['lookbook/15_MILO/Seedream5.0_Pro_T2I_00005.png', 1024, 1024],
    ['lookbook/15_MILO/djinc_httpss.mj.runGoKWcFnXPSI_slight_motion_--ar_43_--video__436e1cfe-26a1-4592-b032-e29f5ace5a4e_3.mp4', 720, 544],
    ['lookbook/15_MILO/fefwef.png', 1024, 1024],
  ],
  jackson: [
    ['lookbook/16_JACKSON/Seedream5.0_Pro_T2I_00017.png', 1024, 1024],
    ['lookbook/16_JACKSON/Seedream5.0_Pro_T2I_00018.png', 1024, 1024],
  ],
  caspian: [
    ['lookbook/17_CASPIAN/Seedream5.0_Pro_T2I_00001 (10).png', 1024, 1024],
    ['lookbook/17_CASPIAN/Seedream5.0_Pro_T2I_00001 (12).png', 1024, 1024],
    ['lookbook/17_CASPIAN/Seedream5.0_Pro_T2I_00016.png', 1024, 1024],
  ],
  freya: [
    ['lookbook/18_FREYA/Seedream5.0_Pro_T2I_00021.png', 1024, 1024],
    ['lookbook/18_FREYA/feggg.png', 1024, 1024],
  ],
  gideon: [
    ['lookbook/19_GIDEON/Seedream5.0_Pro_T2I_00011.png', 1024, 1024],
  ],
  ophelia: [
    ['lookbook/20_OPHELIA/Seedream5.0_Pro_T2I_00001 (6).png', 1024, 1024],
    ['lookbook/20_OPHELIA/Seedream5.0_Pro_T2I_00020.png', 1024, 1024],
    ['lookbook/20_OPHELIA/gdsrwgwe.png', 1024, 1024],
  ],
  tilly: [
    ['lookbook/21_TILLY/Seedream5.0_Pro_T2I_00001 (11).png', 1024, 1024],
    ['lookbook/21_TILLY/Seedream5.0_Pro_T2I_00003.png', 1024, 1024],
  ],
};



// Display order on the page
const ORDER = [
  'luka', 'onyx', 'bianca', 'dupree', 'arthur', 'valka', 'jinx',
  'roman', 'soren', 'kael', 'zane', 'lucian', 'anya', 'tuco',
  'milo', 'jackson', 'caspian', 'freya', 'gideon', 'ophelia', 'tilly',
];

// ── Strip parenthetical Korean text, e.g. "High-jump (높이뛰기)" → "High-jump" ──
function clean(str) {
  return str ? str.replace(/\s*\(.*?\)/g, '').trim() : str;
}

function titleCase(name) {
  return name.charAt(0) + name.slice(1).toLowerCase();
}

// ── Intro paragraph with every model name as an underlined link ──
const introText = document.getElementById('introText');
const nameLinks = ORDER
  .map(k => `<a href="#model-${k}" data-model="${k}">${titleCase(MODEL_DATA[k].name)}</a>`)
  .join(', ');
introText.innerHTML =
  `Clawset is an independent model agency representing ` +
  `twenty-one distinguished feline talents: ${nameLinks}. ` +
  `Clawset covers editorial, campaign and runway work for fashion houses, ` +
  `magazines and brands across Seoul, Paris, New York, London and Tokyo.`;

// ── Stacked model entries ──
const list = document.getElementById('modelsList');
list.innerHTML = ORDER.map(k => {
  const m = MODEL_DATA[k];
  const video = m.image.replace(/\.png$/, '.mp4');
  return `
    <article class="model-entry" id="model-${k}" data-model="${k}">
      <dl class="spec">
        <dt>Model</dt><dd>${titleCase(m.name)}</dd>
        <dt>Breed</dt><dd>${m.breed}</dd>
        <dt>Origin, D.O.B</dt><dd>${m.origin}, ${m.dob}</dd>
      </dl>
      <div class="entry-media">
        <img src="${m.image}" alt="${m.name}" loading="lazy" />
        <video src="${video}" muted loop playsinline preload="none"></video>
        <span class="entry-number">${m.number}</span>
      </div>
    </article>`;
}).join('');

// ── Index table ──
const indexBody = document.getElementById('indexBody');
indexBody.innerHTML = ORDER.map(k => {
  const m = MODEL_DATA[k];
  return `
    <tr data-model="${k}">
      <td>${m.number}</td>
      <td>${titleCase(m.name)}</td>
      <td>${m.breed}</td>
      <td class="col-hide">${m.origin}</td>
      <td class="col-hide">${m.dob}</td>
    </tr>`;
}).join('');

// ── Detail panel (right side) ──
const panel = document.getElementById('detailPanel');
const panelInner = document.getElementById('detailInner');
const closeBtn = document.getElementById('detailClose');
let activeKey = null;

const isNarrow = window.matchMedia('(max-width: 860px)');
const HEADER_H = 56; // px — space under the fixed top bar

// Desktop: pin the panel beside the active model's image — same top, same height
function positionPanel() {
  if (!activeKey || isNarrow.matches) {
    panel.style.top = panel.style.left = panel.style.height = '';
    return;
  }
  const media = document.querySelector(`#model-${activeKey} .entry-media`);
  const r = media.getBoundingClientRect();
  const gutter = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--gutter')) || 14;
  panel.style.top = (r.top + window.scrollY) + 'px';
  panel.style.left = (r.right + gutter * 2) + 'px';
  panel.style.height = r.height + 'px';
}

// Runway strip: runway clip + lookbook photos flow left in an endless loop.
// The set is repeated until it covers the strip plus one extra set, then the
// track shifts by exactly one set width so the loop is seamless.
const MARQUEE_SPEED = 60; // px / second

function setupMarquee() {
  const box = panelInner.querySelector('.runway-looks');
  if (!box) return;
  const track = box.querySelector('.looks-track');
  track.querySelectorAll('[data-clone]').forEach(el => el.remove());

  const originals = [...track.children];
  const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
  const setW = track.scrollWidth + gap; // one set incl. the gap before the next set
  if (setW <= gap) return;

  const copies = Math.ceil(box.clientWidth / setW) + 1;
  for (let i = 0; i < copies; i++) {
    originals.forEach(el => {
      const clone = el.cloneNode(true);
      clone.dataset.clone = '';
      if (clone.tagName === 'IMG') clone.alt = '';
      if (clone.tagName === 'VIDEO') {
        clone.muted = true;
        clone.play().catch(() => {});
      }
      track.appendChild(clone);
    });
  }
  track.style.setProperty('--marquee-shift', `-${setW}px`);
  track.style.setProperty('--marquee-dur', `${setW / MARQUEE_SPEED}s`);
  box.classList.add('is-marquee');
}

window.addEventListener('resize', () => { positionPanel(); setupMarquee(); });
window.addEventListener('load', positionPanel);

function openDetail(modelKey) {
  const m = MODEL_DATA[modelKey];
  if (!m) return;
  // Runway scene: add `runway: 'path/to/video.mp4'` to a model in MODEL_DATA
  // Runway clip first, then the lookbook photos — all in one looping strip
  const items = [
    m.runway ? `<video src="${m.runway}" muted loop playsinline autoplay></video>` : '',
    ...(LOOKBOOK[modelKey] || []).map(([src, w, h]) => /\.(mp4|webm)$/i.test(src)
      ? `<video src="${encodeURI(src)}" style="aspect-ratio: ${w} / ${h}" muted loop playsinline autoplay></video>`
      : `<img src="${encodeURI(src)}" width="${w}" height="${h}" alt="${m.name} lookbook" />`),
  ].join('');
  const runway = items
    ? `<div class="detail-runway"><div class="runway-looks"><div class="looks-track">${items}</div></div></div>`
    : `<div class="detail-runway is-empty">Runway</div>`;

  panelInner.innerHTML = `
    <div class="detail-text">
      <h2 class="detail-name">${titleCase(m.name)}</h2>
      <p class="detail-lede">${m.breed}, ${m.origin}.<br />${m.keywords.join(', ')}.</p>
      <dl class="detail-stats">
        <dt>No.</dt><dd>${m.number}</dd>
        <dt>D.O.B</dt><dd>${m.dob}</dd>
        <dt>Origin</dt><dd>${m.origin}</dd>
        <dt>Hobby</dt><dd>${clean(m.hobby)}</dd>
        <dt>Habit</dt><dd>${clean(m.habit)}</dd>
        <dt>Favorite</dt><dd>${clean(m.favorite)}</dd>
      </dl>
    </div>
    ${runway}
  `;

  document.querySelectorAll('.is-active').forEach(el => el.classList.remove('is-active'));
  document.querySelectorAll(`[data-model="${modelKey}"]`).forEach(el => el.classList.add('is-active'));

  activeKey = modelKey;
  positionPanel();
  setupMarquee();
  document.body.classList.add('detail-open');
  panel.setAttribute('aria-hidden', 'false');
}

function closeDetail() {
  if (!activeKey) return;
  document.querySelectorAll('.is-active').forEach(el => el.classList.remove('is-active'));
  document.body.classList.remove('detail-open');
  panel.setAttribute('aria-hidden', 'true');
  const vid = panelInner.querySelector('video');
  if (vid) vid.pause();
  activeKey = null;
}

// ── Desktop: the panel opens by itself when a model's photo scrolls up to the trigger line ──
const TRIGGER = 0.4; // fraction of viewport height from the top

function updateActiveFromScroll() {
  if (isNarrow.matches) return;
  const line = window.innerHeight * TRIGGER;
  let found = null;
  for (const media of document.querySelectorAll('.entry-media')) {
    const r = media.getBoundingClientRect();
    if (r.top <= line && r.bottom >= line) {
      found = media.closest('.model-entry').dataset.model;
      break;
    }
  }
  if (found === activeKey) return;
  if (found) openDetail(found);
  else closeDetail();
}

window.addEventListener('scroll', updateActiveFromScroll, { passive: true });
window.addEventListener('resize', updateActiveFromScroll);
window.addEventListener('load', updateActiveFromScroll);
isNarrow.addEventListener('change', () => { closeDetail(); updateActiveFromScroll(); });

// Entries: hover plays video; tap opens detail on narrow screens only
document.querySelectorAll('.model-entry').forEach(entry => {
  const media = entry.querySelector('.entry-media');
  const vid = media.querySelector('video');

  vid.addEventListener('playing', () => vid.classList.add('ready'));

  // Hover only on the main photo, not the lookbook row
  media.addEventListener('mouseenter', () => {
    vid.currentTime = 0;
    vid.play().catch(() => {});
  });

  media.addEventListener('mouseleave', () => vid.pause());

  media.addEventListener('click', () => {
    if (isNarrow.matches) openDetail(entry.dataset.model);
  });
});

// Index rows: desktop scrolls to the model (panel then opens by itself)
indexBody.querySelectorAll('tr').forEach(row => {
  row.addEventListener('click', () => {
    const key = row.dataset.model;
    if (isNarrow.matches) {
      openDetail(key);
      return;
    }
    const entry = document.getElementById(`model-${key}`);
    const y = entry.getBoundingClientRect().top + window.scrollY - HEADER_H;
    window.scrollTo({ top: y, behavior: 'smooth' });
  });
});

// Close button / Escape — only used by the narrow-screen overlay
closeBtn.addEventListener('click', closeDetail);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && isNarrow.matches) closeDetail();
});

// ── Back-to-top button ──
const toTop = document.getElementById('toTop');

function updateToTop() {
  toTop.classList.toggle('visible', window.scrollY > window.innerHeight * 0.6);
}

toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
window.addEventListener('scroll', updateToTop, { passive: true });
updateToTop();
