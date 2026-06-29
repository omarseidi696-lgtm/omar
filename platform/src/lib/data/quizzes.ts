import type { Quiz, QuizQuestion } from "./types";

function q(
  en: string,
  ar: string,
  options: [string, string][],
  answerIndex: number
): QuizQuestion {
  return {
    question: { en, ar },
    options: options.map(([e, a]) => ({ en: e, ar: a })),
    answerIndex,
  };
}

export const quizzes: Quiz[] = [
  // Excel
  {
    id: "excel-short",
    skillSlug: "excel",
    level: "beginner",
    tier: "short",
    title: { en: "Excel Basics Check", ar: "اختبار أساسيات إكسل" },
    questions: [
      q("Which symbol must start every Excel formula?", "ما الرمز الذي يجب أن تبدأ به كل صيغة في إكسل؟", [["=", "="], ["#", "#"], ["@", "@"], ["$", "$"]], 0),
      q("What does VLOOKUP search by default?", "بماذا يبحث VLOOKUP افتراضياً؟", [["The first column", "العمود الأول"], ["The last row", "آخر صف"], ["Any cell", "أي خلية"], ["Headers only", "العناوين فقط"]], 0),
      q("Which feature summarizes large datasets interactively?", "أي ميزة تلخص البيانات الكبيرة بشكل تفاعلي؟", [["PivotTable", "الجدول المحوري"], ["Macro", "الماكرو"], ["Comment", "التعليق"], ["Freeze Panes", "تجميد الأجزاء"]], 0),
    ],
  },
  {
    id: "excel-medium",
    skillSlug: "excel",
    level: "intermediate",
    tier: "medium",
    title: { en: "Excel Intermediate", ar: "إكسل - متوسط" },
    questions: [
      q("Which tool lets you import & transform data from multiple sources?", "أي أداة تتيح استيراد وتحويل البيانات من مصادر متعددة؟", [["Power Query", "Power Query"], ["Conditional Formatting", "التنسيق الشرطي"], ["Goal Seek", "البحث عن الهدف"], ["Data Validation", "تحقق البيانات"]], 0),
      q("INDEX + MATCH is mainly an alternative to which function?", "INDEX + MATCH هو بديل أساسي لأي دالة؟", [["VLOOKUP", "VLOOKUP"], ["SUMIF", "SUMIF"], ["IFERROR", "IFERROR"], ["TEXTJOIN", "TEXTJOIN"]], 0),
      q("What does the $ in $A$1 do?", "ماذا تفعل علامة $ في $A$1؟", [["Locks the reference", "تثبّت المرجع"], ["Deletes the cell", "تحذف الخلية"], ["Converts to text", "تحوّل إلى نص"], ["Nothing", "لا شيء"]], 0),
      q("Which chart best shows trend over time?", "أي رسم بياني يُظهر الاتجاه بمرور الوقت بشكل أفضل؟", [["Line chart", "الرسم الخطي"], ["Pie chart", "الدائري"], ["Scatter only", "نقطي فقط"], ["Radar", "الرادار"]], 0),
    ],
  },
  {
    id: "excel-pro",
    skillSlug: "excel",
    level: "advanced",
    tier: "professional",
    title: { en: "Excel Professional", ar: "إكسل - محترف" },
    questions: [
      q("Which Excel feature creates a reusable data model with relationships?", "أي ميزة تبني نموذج بيانات قابل لإعادة الاستخدام بعلاقات؟", [["Power Pivot", "Power Pivot"], ["Sparklines", "الخطوط المصغّرة"], ["Watch Window", "نافذة المراقبة"], ["Track Changes", "تتبع التغييرات"]], 0),
      q("What does a dynamic array spill range do?", "ماذا تفعل نتيجة المصفوفة الديناميكية المنسكبة؟", [["Auto-fills adjacent cells with results", "تعبئ الخلايا المجاورة بالنتائج تلقائياً"], ["Locks the file", "تقفل الملف"], ["Deletes formulas", "تحذف الصيغ"], ["Hides columns", "تخفي الأعمدة"]], 0),
      q("Which function aggregates while ignoring filtered-out rows?", "أي دالة تُجمّع البيانات وتتجاهل الصفوف المُرشّحة؟", [["SUBTOTAL", "SUBTOTAL"], ["SUM", "SUM"], ["COUNT", "COUNT"], ["LEN", "LEN"]], 0),
      q("LAMBDA functions in modern Excel let you do what?", "ماذا تتيح لك دوال LAMBDA في إكسل الحديث؟", [["Define custom reusable functions", "تعريف دوال مخصصة قابلة لإعادة الاستخدام"], ["Change cell colors", "تغيير ألوان الخلايا"], ["Password-protect sheets", "حماية الورقات بكلمة مرور"], ["Print settings", "إعدادات الطباعة"]], 0),
    ],
  },
  // Figma
  {
    id: "figma-short",
    skillSlug: "figma",
    level: "beginner",
    tier: "short",
    title: { en: "Figma Basics Check", ar: "اختبار أساسيات Figma" },
    questions: [
      q("What is Figma primarily used for?", "ما الاستخدام الأساسي لـ Figma؟", [["UI/UX design & prototyping", "تصميم وتجهيز نماذج الواجهات"], ["Video editing", "تحرير الفيديو"], ["Database design", "تصميم قواعد البيانات"], ["3D modeling", "النمذجة ثلاثية الأبعاد"]], 0),
      q("What groups reusable UI elements in Figma?", "ماذا يجمّع عناصر الواجهة القابلة لإعادة الاستخدام في Figma؟", [["Components", "المكونات"], ["Comments", "التعليقات"], ["Plugins", "الإضافات"], ["Exports", "التصدير"]], 0),
      q("Which feature lets multiple people design at once?", "أي ميزة تتيح لعدة أشخاص التصميم في نفس الوقت؟", [["Real-time collaboration", "التعاون اللحظي"], ["Offline mode", "وضع عدم الاتصال"], ["Version lock", "قفل الإصدار"], ["Single-user mode", "وضع المستخدم الواحد"]], 0),
    ],
  },
  {
    id: "figma-medium",
    skillSlug: "figma",
    level: "intermediate",
    tier: "medium",
    title: { en: "Figma Intermediate", ar: "Figma - متوسط" },
    questions: [
      q("What lets a component change appearance based on a property?", "ماذا يسمح بتغيير شكل المكون حسب خاصية معينة؟", [["Variants", "المتغيرات"], ["Frames", "الإطارات"], ["Rulers", "المساطر"], ["Pages", "الصفحات"]], 0),
      q("Auto Layout in Figma mainly mimics which CSS concept?", "تشبه ميزة Auto Layout في Figma أي مفهوم CSS؟", [["Flexbox", "Flexbox"], ["Grid template areas", "مناطق Grid"], ["Float", "Float"], ["Position absolute", "Position absolute"]], 0),
      q("What are reusable color/spacing values called?", "ماذا تُسمى القيم القابلة لإعادة الاستخدام للألوان والمسافات؟", [["Design tokens / styles", "متغيرات/أنماط التصميم"], ["Plugins", "الإضافات"], ["Exports", "التصدير"], ["Comments", "التعليقات"]], 0),
      q("Prototyping in Figma lets you simulate what?", "ماذا تتيح لك ميزة النمذجة التفاعلية في Figma؟", [["Click-through user flows", "تدفقات تفاعلية للمستخدم"], ["Database queries", "استعلامات قواعد البيانات"], ["Code compilation", "تجميع الكود"], ["Server deployment", "نشر الخادم"]], 0),
    ],
  },
  {
    id: "figma-pro",
    skillSlug: "figma",
    level: "advanced",
    tier: "professional",
    title: { en: "Figma Professional", ar: "Figma - محترف" },
    questions: [
      q("A scalable design system relies most on?", "يعتمد نظام التصميم القابل للتوسع بشكل أساسي على؟", [["Consistent components & tokens", "مكونات ومتغيرات متّسقة"], ["Random colors", "ألوان عشوائية"], ["Many separate files", "ملفات منفصلة كثيرة"], ["No documentation", "بدون توثيق"]], 0),
      q("What helps designers and developers stay in sync?", "ماذا يساعد المصممين والمطورين على البقاء متزامنين؟", [["Dev Mode / inspect & handoff", "وضع المطورين والتسليم"], ["Hiding layers", "إخفاء الطبقات"], ["Disabling comments", "تعطيل التعليقات"], ["Deleting history", "حذف السجل"]], 0),
      q("Branching in Figma is used to?", "تُستخدم ميزة التفريع (Branching) في Figma لـ؟", [["Work on changes without affecting main file", "العمل على تغييرات دون التأثير على الملف الأساسي"], ["Export PDFs", "تصدير ملفات PDF"], ["Compress images", "ضغط الصور"], ["Lock the file", "قفل الملف"]], 0),
      q("Best practice for a multi-brand design system?", "أفضل ممارسة لنظام تصميم متعدد العلامات التجارية؟", [["Token-based theming", "نظام متغيرات قابل للتخصيص"], ["Duplicate every file per brand", "تكرار كل ملف لكل علامة"], ["Hard-coded colors everywhere", "ألوان ثابتة في كل مكان"], ["No shared components", "بدون مكونات مشتركة"]], 0),
    ],
  },
  // Python
  {
    id: "python-short",
    skillSlug: "python",
    level: "beginner",
    tier: "short",
    title: { en: "Python Basics Check", ar: "اختبار أساسيات بايثون" },
    questions: [
      q("Which keyword defines a function in Python?", "أي كلمة مفتاحية تُعرّف دالة في بايثون؟", [["def", "def"], ["function", "function"], ["fn", "fn"], ["lambda only", "lambda فقط"]], 0),
      q("What data type is ['a', 'b', 'c']?", "ما نوع البيانات لـ ['a', 'b', 'c']؟", [["List", "قائمة"], ["Dictionary", "قاموس"], ["Tuple constant", "تابل ثابت"], ["Set only", "مجموعة فقط"]], 0),
      q("Which symbol starts a comment in Python?", "أي رمز يبدأ تعليقاً في بايثون؟", [["#", "#"], ["//", "//"], ["<!--", "<!--"], ["**", "**"]], 0),
    ],
  },
  {
    id: "python-medium",
    skillSlug: "python",
    level: "intermediate",
    tier: "medium",
    title: { en: "Python Intermediate", ar: "بايثون - متوسط" },
    questions: [
      q("Which library is the standard for tabular data analysis?", "أي مكتبة هي المعيار لتحليل البيانات الجدولية؟", [["Pandas", "Pandas"], ["Flask", "Flask"], ["Pygame", "Pygame"], ["Tkinter", "Tkinter"]], 0),
      q("What does a list comprehension do?", "ماذا يفعل list comprehension؟", [["Builds a list concisely in one line", "ينشئ قائمة بشكل مختصر في سطر واحد"], ["Deletes a list", "يحذف القائمة"], ["Sorts files", "يرتب الملفات"], ["Opens a socket", "يفتح منفذاً شبكياً"]], 0),
      q("Which keyword handles exceptions?", "أي كلمة تُستخدم لمعالجة الأخطاء؟", [["try/except", "try/except"], ["if/then", "if/then"], ["loop/break", "loop/break"], ["switch/case", "switch/case"]], 0),
      q("What's a virtual environment used for?", "ما استخدام البيئة الافتراضية (venv)؟", [["Isolating project dependencies", "عزل مكتبات المشروع"], ["Speeding up the CPU", "تسريع المعالج"], ["Encrypting files", "تشفير الملفات"], ["Rendering UI", "عرض الواجهة"]], 0),
    ],
  },
  {
    id: "python-pro",
    skillSlug: "python",
    level: "advanced",
    tier: "professional",
    title: { en: "Python Professional", ar: "بايثون - محترف" },
    questions: [
      q("What does the GIL primarily affect?", "على ماذا يؤثر GIL بشكل أساسي؟", [["True multi-threaded CPU parallelism", "التوازي الحقيقي متعدد الخيوط"], ["Disk space", "مساحة القرص"], ["Network latency", "زمن الشبكة"], ["File naming", "تسمية الملفات"]], 0),
      q("Decorators in Python are used to?", "تُستخدم المُزخرفات (decorators) في بايثون لـ؟", [["Wrap/extend function behavior", "تغليف/توسيع سلوك الدالة"], ["Define classes only", "تعريف الأصناف فقط"], ["Delete variables", "حذف المتغيرات"], ["Format strings", "تنسيق النصوص"]], 0),
      q("What's the benefit of type hints?", "ما فائدة تلميحات الأنواع (type hints)؟", [["Better tooling & fewer bugs", "أدوات أفضل وأخطاء أقل"], ["Faster runtime always", "تنفيذ أسرع دائماً"], ["Smaller file size", "حجم ملف أصغر"], ["Required by the interpreter", "مطلوبة من المفسّر"]], 0),
      q("Which pattern best separates an ML pipeline's stages?", "أي نمط يفصل أفضل مراحل خط أنابيب تعلم الآلة؟", [["Modular functions/classes per stage", "دوال/أصناف منفصلة لكل مرحلة"], ["One giant script", "سكريبت واحد ضخم"], ["No structure", "بدون أي تنظيم"], ["Global variables only", "متغيرات عامة فقط"]], 0),
    ],
  },
  // React
  {
    id: "react-short",
    skillSlug: "react",
    level: "beginner",
    tier: "short",
    title: { en: "React Basics Check", ar: "اختبار أساسيات React" },
    questions: [
      q("What does JSX let you write?", "ماذا تتيح لك JSX كتابته؟", [["HTML-like syntax in JavaScript", "صيغة شبيهة بـHTML داخل JavaScript"], ["SQL queries", "استعلامات SQL"], ["CSS animations only", "حركات CSS فقط"], ["Shell scripts", "سكريبتات شل"]], 0),
      q("Which hook manages local component state?", "أي خطّاف (hook) يدير الحالة المحلية للمكون؟", [["useState", "useState"], ["useEffect", "useEffect"], ["useRef", "useRef"], ["useMemo", "useMemo"]], 0),
      q("Props are used to?", "تُستخدم Props لـ؟", [["Pass data into components", "تمرير البيانات إلى المكونات"], ["Style components only", "تنسيق المكونات فقط"], ["Define routes", "تعريف المسارات"], ["Connect databases", "ربط قواعد البيانات"]], 0),
    ],
  },
  {
    id: "react-medium",
    skillSlug: "react",
    level: "intermediate",
    tier: "medium",
    title: { en: "React Intermediate", ar: "React - متوسط" },
    questions: [
      q("useEffect with an empty dependency array runs?", "متى يُنفّذ useEffect بمصفوفة تبعيات فارغة؟", [["Once after the first render", "مرة واحدة بعد أول عرض"], ["On every render", "في كل عرض"], ["Never", "لا يُنفّذ أبداً"], ["Only on unmount", "فقط عند إزالة المكون"]], 0),
      q("What problem does React Context solve?", "ما المشكلة التي يحلها React Context؟", [["Avoiding deep prop drilling", "تجنّب تمرير الخصائص عبر طبقات عميقة"], ["Styling components", "تنسيق المكونات"], ["Routing", "التوجيه"], ["Bundling code", "تجميع الكود"]], 0),
      q("What does React.memo help with?", "بماذا يساعد React.memo؟", [["Avoiding unnecessary re-renders", "تجنّب إعادة العرض غير الضرورية"], ["Fetching data", "جلب البيانات"], ["Routing", "التوجيه"], ["Form validation", "التحقق من النماذج"]], 0),
      q("Controlled inputs in React keep value in?", "تحتفظ الحقول المُتحكم بها في React بالقيمة في؟", [["Component state", "حالة المكون"], ["The DOM only", "DOM فقط"], ["A cookie", "ملف تعريف الارتباط"], ["The URL only", "الرابط فقط"]], 0),
    ],
  },
  {
    id: "react-pro",
    skillSlug: "react",
    level: "advanced",
    tier: "professional",
    title: { en: "React Professional", ar: "React - محترف" },
    questions: [
      q("Server Components mainly help with?", "تساعد مكونات الخادم بشكل أساسي في؟", [["Reducing client bundle size & data fetching", "تقليل حجم الحزمة وجلب البيانات بفعالية"], ["Styling only", "التنسيق فقط"], ["Local storage", "التخزين المحلي"], ["Animations only", "الحركات فقط"]], 0),
      q("What's a key benefit of code-splitting?", "ما الفائدة الأساسية لتقسيم الكود (code-splitting)؟", [["Faster initial load", "تحميل أولي أسرع"], ["More global state", "حالة عامة أكثر"], ["Simpler CSS", "CSS أبسط"], ["No need for routing", "عدم الحاجة للتوجيه"]], 0),
      q("Why use a state management library at scale?", "لماذا تُستخدم مكتبة إدارة حالة في المشاريع الكبيرة؟", [["Predictable shared state across the app", "حالة مشتركة قابلة للتنبؤ عبر التطبيق"], ["To remove all hooks", "لإزالة كل الخطافات"], ["To avoid components", "لتجنب المكونات"], ["To replace CSS", "لاستبدال CSS"]], 0),
      q("Suspense boundaries are mainly used for?", "تُستخدم حدود Suspense بشكل أساسي لـ؟", [["Coordinating loading states", "تنسيق حالات التحميل"], ["Styling", "التنسيق"], ["Routing only", "التوجيه فقط"], ["Type checking", "فحص الأنواع"]], 0),
    ],
  },
  // SEO
  {
    id: "seo-short",
    skillSlug: "seo",
    level: "beginner",
    tier: "short",
    title: { en: "SEO Basics Check", ar: "اختبار أساسيات السيو" },
    questions: [
      q("What does SEO stand for?", "ما معنى SEO؟", [["Search Engine Optimization", "تحسين محركات البحث"], ["Site Element Order", "ترتيب عناصر الموقع"], ["Server Edge Output", "مخرجات حافة الخادم"], ["Social Engagement Online", "التفاعل الاجتماعي عبر الإنترنت"]], 0),
      q("What does a meta title primarily affect?", "على ماذا يؤثر عنوان meta بشكل أساسي؟", [["Click-through rate & relevance signal", "نسبة النقر وإشارة الصلة"], ["Server speed", "سرعة الخادم"], ["Database size", "حجم قاعدة البيانات"], ["Image quality", "جودة الصور"]], 0),
      q("Backlinks from other sites mainly signal?", "تشير الروابط الخلفية من مواقع أخرى بشكل أساسي إلى؟", [["Authority/trust", "المصداقية والثقة"], ["Page color scheme", "نظام ألوان الصفحة"], ["Server location", "موقع الخادم"], ["File size", "حجم الملف"]], 0),
    ],
  },
  {
    id: "seo-medium",
    skillSlug: "seo",
    level: "intermediate",
    tier: "medium",
    title: { en: "SEO Intermediate", ar: "السيو - متوسط" },
    questions: [
      q("What's the purpose of a canonical tag?", "ما الغرض من علامة canonical؟", [["Avoid duplicate content issues", "تجنّب مشاكل المحتوى المكرر"], ["Speed up images", "تسريع الصور"], ["Add animations", "إضافة حركات"], ["Block all crawlers", "حظر كل الزواحف"]], 0),
      q("Core Web Vitals mainly measure?", "تقيس Core Web Vitals بشكل أساسي؟", [["Page speed & user experience", "سرعة الصفحة وتجربة المستخدم"], ["Keyword count", "عدد الكلمات المفتاحية"], ["Backlink count", "عدد الروابط الخلفية"], ["Social shares", "المشاركات الاجتماعية"]], 0),
      q("Search intent refers to?", "تشير نية البحث إلى؟", [["What the user actually wants to accomplish", "ما يريد المستخدم تحقيقه فعلياً"], ["The server's IP address", "عنوان IP للخادم"], ["The page's file size", "حجم ملف الصفحة"], ["The domain's age only", "عمر النطاق فقط"]], 0),
      q("Internal linking mainly helps with?", "يساعد الربط الداخلي بشكل أساسي في؟", [["Distributing authority & crawlability", "توزيع المصداقية وقابلية الفهرسة"], ["Reducing image size", "تقليل حجم الصور"], ["Hiding pages", "إخفاء الصفحات"], ["Changing the domain", "تغيير النطاق"]], 0),
    ],
  },
  {
    id: "seo-pro",
    skillSlug: "seo",
    level: "advanced",
    tier: "professional",
    title: { en: "SEO Professional", ar: "السيو - محترف" },
    questions: [
      q("A sudden ranking drop after a core update most likely needs?", "بعد انخفاض مفاجئ في الترتيب بعد تحديث أساسي، يجب أولاً؟", [["Content quality & relevance audit", "تدقيق جودة وصلة المحتوى"], ["Changing the domain immediately", "تغيير النطاق فوراً"], ["Deleting the sitemap", "حذف خريطة الموقع"], ["Disabling HTTPS", "تعطيل HTTPS"]], 0),
      q("Structured data (schema.org) primarily helps with?", "تساعد البيانات المنظمة (schema.org) بشكل أساسي في؟", [["Rich results & better content understanding", "النتائج الغنية وفهم أفضل للمحتوى"], ["Faster hosting", "استضافة أسرع"], ["More RAM usage", "استخدام ذاكرة أكبر"], ["Blocking bots", "حظر الروبوتات"]], 0),
      q("A topic cluster strategy is built around?", "تُبنى استراتيجية مجموعات المواضيع حول؟", [["A pillar page linked to supporting content", "صفحة رئيسية مرتبطة بمحتوى داعم"], ["One isolated keyword", "كلمة مفتاحية واحدة منعزلة"], ["Random blog posts", "تدوينات عشوائية"], ["Paid ads only", "الإعلانات المدفوعة فقط"]], 0),
      q("International SEO commonly relies on?", "يعتمد السيو الدولي بشكل شائع على؟", [["hreflang tags for language/region targeting", "علامات hreflang لاستهداف اللغة/المنطقة"], ["Using only one global domain with no tags", "استخدام نطاق عالمي واحد بدون علامات"], ["Blocking all non-English traffic", "حظر كل الزيارات غير الإنجليزية"], ["Disabling mobile support", "تعطيل دعم الموبايل"]], 0),
    ],
  },
];

function genericQuiz(skillSlug: string, name: string): Quiz[] {
  const tiers: Array<{ tier: Quiz["tier"]; level: Quiz["level"]; n: number }> = [
    { tier: "short", level: "beginner", n: 3 },
    { tier: "medium", level: "intermediate", n: 3 },
    { tier: "professional", level: "advanced", n: 3 },
  ];
  return tiers.map(({ tier, level, n }) => ({
    id: `${skillSlug}-${tier}`,
    skillSlug,
    level,
    tier,
    title: { en: `${name} — ${tier} quiz`, ar: `${name} — اختبار ${tier === "short" ? "قصير" : tier === "medium" ? "متوسط" : "محترف"}` },
    questions: Array.from({ length: n }, (_, i) =>
      q(
        `Which statement best reflects a ${level}-level understanding of ${name}? (Q${i + 1})`,
        `أي عبارة تعكس بشكل أفضل فهماً بمستوى ${level} لمهارة ${name}؟ (سؤال ${i + 1})`,
        [
          ["Applying core principles correctly in context", "تطبيق المبادئ الأساسية بشكل صحيح في سياقها"],
          ["Ignoring best practices", "تجاهل أفضل الممارسات"],
          ["Memorizing without applying", "الحفظ دون التطبيق"],
          ["Avoiding real practice", "تجنّب التطبيق العملي"],
        ],
        0
      )
    ),
  }));
}

export const allQuizzes: Quiz[] = [
  ...quizzes,
  ...genericQuiz("agile-scrum", "Agile & Scrum"),
  ...genericQuiz("solidworks", "SolidWorks"),
  ...genericQuiz("autocad", "AutoCAD"),
  ...genericQuiz("financial-modeling", "Financial Modeling"),
  ...genericQuiz("machine-learning", "Machine Learning"),
  ...genericQuiz("public-speaking", "Public Speaking"),
  ...genericQuiz("time-management", "Time Management"),
];

export function getQuizzesBySkill(skillSlug: string) {
  return allQuizzes.filter((quiz) => quiz.skillSlug === skillSlug);
}
