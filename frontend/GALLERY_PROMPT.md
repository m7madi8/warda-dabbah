# برومبت بناء صفحة المعرض - Gallery/Portfolio Showcase

> انسخ هذا البرومبت وضعه في Claude Code مباشرة

---

أنت مهندس برمجيات خبير. مهمتك بناء صفحة "معرض الأعمال" (Gallery/Portfolio Showcase) كاملة لهذا المشروع. اقرأ هذا البرومبت بالكامل وافهمه قبل البدء.

═══════════════════════════════════════════════
أولاً: هندسة المشروع والتكنولوجيات المستخدمة
═══════════════════════════════════════════════

المشروع يقع داخل `frontend/` ويعتمد على:
- React 19.1.0 + Vite 6.3.5
- Tailwind CSS v4 (بإضافة `@tailwindcss/vite` — لا يوجد ملف tailwind.config.js، الإعداد عبر CSS فقط)
- GSAP 3.13.0 مع: ScrollTrigger, ScrollSmoother, SplitText (بإضافة `@gsap/react` لـ useGSAP hook)
- @studio-freight/lenis للتمرير السلس
- react-router-dom v7.6.1 (createBrowserRouter)
- react-icons v5.5.0
- react-responsive (useMediaQuery)
- اللغة: عربية (RTL) — `lang="ar" dir="rtl"`

═══════════════════════════════════════════════
ثانياً: Style Guide والألوان والخطوط
═══════════════════════════════════════════════

**الخطوط (محملة عبر Google Fonts في index.css):**
- "Cairo" (weights: 300,400,500,600,700,800,900) — الخط الرئيسي للنصوص العربية
- "Cormorant Garamond" (italic, weight: 300) — للـ taglines الإنجليزية
- "Syncopate" (weight: 700) — لشعار BRAND فقط

**الألوان (CSS Custom Properties في :root):**
```css
--base-100: #f5f2ed;   /* خلفية فاتحة - beige */
--base-200: #e8dcc8;   /* beige متوسط */
--base-300: #2d2a26;   /* لون النص الداكن */
--accent: #c9a87c;     /* لون تيركوتا/دافئ */
--terracotta: #b8956e; /* تيركوتا ثانوي */
--natural: #a6947c;    /* لون المواد الطبيعية */
```

**أنماط التصميم المتاحة:**
- الزوايا الدائرية: `rounded-[2.5rem]`, `rounded-[3rem]`, `rounded-2xl`, `rounded-full`
- التأثير الزجاجي (Glassmorphism): `backdrop-filter: blur(20px)` + خلفية شبه شفافة + حافة بيضاء شفافة
- التدرجات: `linear-gradient(to bottom/from top)` مع الألوان المعرفة
- الاتجاه: RTL بالكامل — `direction: rtl`
- التمرير السلس عبر GSAP ScrollSmoother + Lenis

═══════════════════════════════════════════════
ثالثاً: بنية الملفات والأنماط (patterns)
═══════════════════════════════════════════════

```
frontend/src/
├── assets/          ← الصور والوسائط
├── components/      ← مكونات قابلة لإعادة الاستخدام (كل مكون في مجلد + .css)
├── constants/       ← نصوص ثابتة
├── data/            ← بيانات (مثل projects.js)
├── layouts/         ← MainLayout.jsx (يحتوي Navbar, Footer, Preloader, ScrollSmoother)
├── pages/           ← صفحات (كل صفحة في مجلد منفصل)
├── Router/          ← Router.jsx
├── lib/             ← ملفات مساعدة (lenis.js)
├── index.css        ← الأنماط العامة + CSS Variables
└── main.jsx         ← نقطة الدخول
```

**قواعد المكونات المهمة:**
1. كل مكون في مجلد خاص به مع ملف .css مصاحب (مثل `About/About.jsx` + `About/about.css`)
2. لا تُستخدم CSS Modules — CSS عادي مع أسماء كلاسات BEM-like
3. الأنيميشن عبر GSAP فقط (useGSAP hook + ScrollTrigger)
4. يتم تسجيل الإضافات: `gsap.registerPlugin(ScrollTrigger)`
5. يُستخدم `gsap.context()` مع `ref` للتنظيف عند unmount
6. التمرير السلس عبر ScrollSmoother في MainLayout (يجب ألا تمسه)

═══════════════════════════════════════════════
رابعاً: تحليل الصفحة الحالية (Projects.jsx)
═══════════════════════════════════════════════

الصفحة الحالية في `pages/Projects/Projects.jsx` تحتوي:
- Header مع عنوان ووصف
- فلاتر (All / داخلي / خارجي)
- Grid بسيط (1→2→3 أعمدة responsive)
- Modal لعرض تفاصيل المشروع

البيانات موجودة في `data/projects.js`:
```js
// كل مشروع فيه: id, title, category (interior/exterior), coverImage, images[], description
// التصنيفات: { id: 'all', name: 'الكل' }, { id: 'interior', name: 'داخلي' }, { id: 'exterior', name: 'خارجي' }
```

═══════════════════════════════════════════════
خامساً: المتطلبات الوظيفية لصفحة المعرض الجديدة
═══════════════════════════════════════════════

قم بتعديل الصفحة الحالية `pages/Projects/Projects.jsx` وملفها `pages/Projects/projects.css` لتصبح صفحة معرض احترافية تتضمن:

### 1. Header Section
- عنوان كبير بخط Cairo Bold مع ظل نصي خفيف
- وصف فرعي بخط natural color
- خلفية تدرج من base-100 إلى base-200

### 2. شريط التصفية (Filter Bar)
- أزرار pill-shaped (rounded-full) مع تأثير hover
- الزر النشط: `bg-[var(--base-300)] text-[var(--base-100)]`
- الأزرار غير النشطة: `bg-white text-[var(--base-300)]` مع hover إلى terracotta
- أنيميشن دخول staggered مع ScrollTrigger

### 3. شبكة المشاريع (Projects Grid)
- Responsive Grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- فجوات: `gap-8`
- **بطاقة المشروع (Project Card):**
  - صورة غلاف بـ `rounded-2xl overflow-hidden`
  - ارتفاع الصورة: `h-64 md:h-80`
  - تأثير hover على الصورة: `group-hover:scale-110` مع transition
  - تراكب (overlay) داكن يظهر عند hover: gradient من الشفاف للأسود مع نص "عرض التفاصيل"
  - عنوان المشروع تحت الصورة بـ Cairo Bold
  - تصنيف المشروع بلون accent
  - ارتفاع البطاقة: `translateY(-8px)` عند hover
  - أنيميشن دخول: `y: 50 → 0` + `opacity: 0 → 1` مع stagger

### 4. Modal تفاصيل المشروع
- خلفية شبه شفافة: `bg-black/90`
- محتوى: `bg-[var(--base-100)] rounded-3xl max-w-4xl`
- Header مع عنوان وزر إغلاق (×)
- عرض جميع صور المشروع في صف/عمود مع `rounded-xl`
- وصف المشروع
- Badge للتصنيف بلون accent
- أنيميشن: fadeIn للـ modal + slideUp للمحتوى
- تمرير داخلي مع scrollbar مخصص بلون terracotta

### 5. تأثيرات حركية (Micro-interactions)
- **Staggered entrance** للبطاقات عند الظهور (GSAP ScrollTrigger)
- **Hover scale** على صور البطاقات (`scale-110`)
- **Hover lift** على البطاقات (`translateY(-8px)`)
- **Overlay reveal** عند hover على البطاقة
- **Smooth filter transition** عند تغيير التصنيف
- **Modal open/close** animations (fadeIn + slideUp)

### 6. التصميم المتجاوب (Responsive)
- الموبايل: عمود واحد (grid-cols-1)
- التابلت: عمودين (md:grid-cols-2)
- الديسكتوب: 3 أعمدة (lg:grid-cols-3)
- الحد الأقصى للعرض: `max-w-7xl mx-auto`
- الحشو: `px-4 md:px-8`

═══════════════════════════════════════════════
سادساً: تعليمات صارمة للتنفيذ
═══════════════════════════════════════════════

1. **عدم كسر الهيكلية:** لا تعدل `MainLayout.jsx` أو `Router.jsx` أو أي مكون خارج مجلد `Projects/`
2. **الملفات المسموح بتعديلها فقط:**
   - `frontend/src/pages/Projects/Projects.jsx`
   - `frontend/src/pages/Projects/projects.css`
3. **استخدم CSS Variables** المعرفة في `:root` — لا تُنشئ ألوان جديدة
4. **لا تستخدم Framer Motion** — المشروع يستخدم GSAP حصرياً
5. **التزم بنمط useGSAP** مع `gsap.context()` و `ScrollTrigger` كما في المكونات الأخرى
6. **البيانات موجودة** في `data/projects.js` — لا تعدلها، استخدمها كما هي
7. **CSS عادي** لا CSS Modules — اكتب في ملف projects.css
8. **RTL بالكامل** — كل النصوص العربية، الاتجاه من اليمين لليسار
9. **استخدم أسماء الكلاسات** المعرفة في projects.css ووسّعها — لا تمسّ الكلاسات الموجودة في المكونات الأخرى
10. **تأكد من** أن `gsap.registerPlugin(ScrollTrigger)` موجود في أعلى الملف
11. **التمرير السلس** مُفعّل تلقائياً عبر MainLayout — لا تفعل أي شيء للتمرير
12. **react-icons** متوفر — استخدمه للأيقونات إن لزم الأمر

═══════════════════════════════════════════════
سابعاً: مثال على نمط الأنيميشن المطلوب
═══════════════════════════════════════════════

```jsx
// نمط GSAP الصحيح لهذا المشروع:
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// داخل المكون:
const pageRef = useRef(null);

useEffect(() => {
    const ctx = gsap.context(() => {
        gsap.fromTo(".target-class",
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".trigger-class",
                    start: "top 80%",
                }
            }
        );
    }, pageRef);

    return () => ctx.revert();
}, []);
```

═══════════════════════════════════════════════
ثامناً: المخرج المتوقع
═══════════════════════════════════════════════

صفحة معرض أعمال (Portfolio/Gallery) متكاملة تتضمن:
1. Header أنيق مع عنوان ووصف
2. شريط تصفية تفاعلي (الكل / داخلي / خارجي)
3. شبكة مشاريع responsive بتصميم بطاقات أنيق
4. تأثيرات hover متعددة (scale, lift, overlay)
5. Modal تفاصيل مشروع بتصميم premium
6. أنيميشنات GSAP سلسة عند التمرير
7. تصميم 100% متوافق مع الهوية البصرية للمشروع
8. تجربة مستخدم سلسة واحترافية

ابدأ التنفيذ الآن. اقرأ ملفات المشروع أولاً لفهم السياق، ثم عدّل الملفات المطلوبة.
