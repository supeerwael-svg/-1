import React, { useState } from 'react';
import { AppProvider, useApp } from '../context/AppContext';
import { StorageService } from '../services/storageService';

const sections = [
  {
    id: 1,
    title: "المذكرات التربوية والدروس",
    desc: "مذكرات الأسابيع، التحضير للبيداغوجيا، والدروس النموذجية.",
    icon: "📚",
    bgColor: "bg-blue-500",
    lightColor: "bg-blue-50 text-blue-600 border-blue-200",
    badge: "1",
    itemsCount: 24,
    files: ["مذكرة الوحدة الأولى - رياضيات", "تحضير درس العلوم الطبيعية", "مخطط التوزيع السنوي"]
  },
  {
    id: 2,
    title: "الوثائق الخاصة بالأستاذ",
    desc: "القرارات الوزارية، المناهج، والوثائق الرسمية الخاصة بالمهنة.",
    icon: "🪪",
    bgColor: "bg-amber-500",
    lightColor: "bg-amber-50 text-amber-600 border-amber-200",
    badge: "2",
    itemsCount: 12,
    files: ["المنهاج الرسمي للمادة", "قرار التعيين والترقية", "التدرجات السنوية"]
  },
  {
    id: 3,
    title: "الفروض والاختبارات",
    desc: "مواضيع الفروض والاختبارات، تقارير الخرجات الميدانية.",
    icon: "📝",
    bgColor: "bg-emerald-500",
    lightColor: "bg-emerald-50 text-emerald-600 border-emerald-200",
    badge: "3",
    itemsCount: 8,
    files: ["فرض الثلاثي الأول رياضيات", "تقرير خرجة تربوية للمتحف", "تصحيح نموذج الاختبار"]
  },
  {
    id: 4,
    title: "التكوين",
    desc: "ملفات التكوين الذاتي، الملتقيات، والندوات التربوية.",
    icon: "🎓",
    bgColor: "bg-purple-500",
    lightColor: "bg-purple-50 text-purple-600 border-purple-200",
    badge: "4",
    itemsCount: 5,
    files: ["شهادة تكوين المقاربة بالكفاءات", "ملخص الندوة التربوية الجهوية"]
  },
  {
    id: 5,
    title: "كتب مساعدة",
    desc: "المراجع، الكتب المدرسية، والأدلة الأستاذية المساعدة.",
    icon: "📖",
    bgColor: "bg-rose-500",
    lightColor: "bg-rose-50 text-rose-600 border-rose-200",
    badge: "5",
    itemsCount: 15,
    files: ["دليل الأستاذ السنة الخامسة", "كتاب التمارين المعلّمة"]
  },
  {
    id: 6,
    title: "الوسائل التعليمية",
    desc: "البطاقات الإيضاحية، الوسائل الرقمية، واللوحات البصرية.",
    icon: "💻",
    bgColor: "bg-cyan-500",
    lightColor: "bg-cyan-50 text-cyan-600 border-cyan-200",
    badge: "6",
    itemsCount: 19,
    files: ["عرض بوربوينت الوحدة 3", "بطاقات الحروف الملونة"]
  },
  {
    id: 7,
    title: "الوثائق الإدارية",
    desc: "الجداول الزمنية، الاستدعاءات، ورخص الغياب.",
    icon: "📁",
    bgColor: "bg-indigo-500",
    lightColor: "bg-indigo-50 text-indigo-600 border-indigo-200",
    badge: "7",
    itemsCount: 10,
    files: ["جدول استبدال الحصص", "طلب رخصة استثنائية"]
  },
  {
    id: 8,
    title: "قوائم التلاميذ",
    desc: "قوائم الأسماء، كشوف النقاط، وإحصائيات الحضور.",
    icon: "📊",
    bgColor: "bg-green-600",
    lightColor: "bg-green-50 text-green-700 border-green-200",
    badge: "8",
    itemsCount: 4,
    files: ["قائمة تلاميذ القسم 4 متوسط 1", "رصد نقاط الفصل الأول"]
  },
  {
    id: 9,
    title: "الاحتفالات الوطنية",
    desc: "برامج الأنشطة الثقافية، الأناشيد، والاحتفالات الرسمية.",
    icon: "🇩🇿",
    bgColor: "bg-red-600",
    lightColor: "bg-red-50 text-red-600 border-red-200",
    badge: "9",
    itemsCount: 6,
    files: ["برنامج يوم العلم", "نشيد قسماً والذكرى الوطنية"]
  },
  {
    id: 10,
    title: "السمعي البصري",
    desc: "الفيديوهات التعليمية، التسجيلات الصوتية، والوسائط المتعددة.",
    icon: "🎬",
    bgColor: "bg-teal-500",
    lightColor: "bg-teal-50 text-teal-600 border-teal-200",
    badge: "10",
    itemsCount: 14,
    files: ["فيديو تعليمي لقواعد النحو", "تسجيل صوتي لنصوص الإستماع"]
  },
  {
    id: 11,
    title: "شهادات تقديرية وتكريمية",
    desc: "شهادات التفوق، التكريمات المدرسية، وخطابات الشكر والتقدير.",
    icon: "🏆",
    bgColor: "bg-amber-600",
    lightColor: "bg-amber-50 text-amber-700 border-amber-200",
    badge: "11",
    itemsCount: 11,
    files: ["شهادة التميز الدراسي للفصل الأول", "رسالة شكر وتقدير من الإدارة"]
  },
  {
    id: 12,
    title: "ملفات عامة",
    desc: "مستندات متنوعة، ملاحظات، وأرشيف إضافي.",
    icon: "📦",
    bgColor: "bg-slate-600",
    lightColor: "bg-slate-100 text-slate-700 border-slate-200",
    badge: "12",
    itemsCount: 9,
    files: ["أرشيف المراسلات القديمة", "أفكار مقترحة للنوادي"]
  }
];

const MainLayout: React.FC = () => {
  const { t, lang, setLang, theme, toggleTheme } = useApp();
  const [activeTab, setActiveTab] = useState<'home' | 'library' | 'seminars' | 'forum' | 'settings'>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSection, setSelectedSection] = useState<any | null>(null);

  const filteredSections = sections.filter(sec => 
    sec.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    sec.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-['Cairo',sans-serif]">
      
      {/* رأس الصفحة العلوي */}
      <header className="bg-emerald-700 text-white shadow-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="w-10 h-10 bg-emerald-800 text-white rounded-xl flex items-center justify-center font-bold text-lg shadow-inner">
              📚
            </div>
            <div>
              <h1 className="text-base font-bold">{t('appName')}</h1>
              <p className="text-[10px] text-emerald-200">بوابة تنظيم الوثائق والأقسام</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={toggleTheme} className="p-2 rounded-lg bg-emerald-800 text-white text-xs">
              {theme === 'light' ? '🌙 دكن' : '☀️ فاتح'}
            </button>
            <select 
              value={lang} 
              onChange={(e) => setLang(e.target.value as any)}
              className="bg-emerald-800 text-white text-xs p-1.5 rounded-lg border-none outline-none"
            >
              <option value="ar">العربية</option>
              <option value="fr">Français</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>
      </header>

      {/* المحتوى الرئيسي */}
      <main className="flex-1 p-4 pb-24 max-w-7xl w-full mx-auto">
        
        {(activeTab === 'home' || activeTab === 'library') && (
          <div className="space-y-4">
            
            {/* بطاقة الترحيب والبحث الملونة */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl p-5 text-white shadow-lg">
              <span className="bg-white/20 text-[10px] font-bold px-3 py-1 rounded-full mb-2 inline-block">العام الدراسي 2025/2026</span>
              <h2 className="text-xl font-extrabold mb-1">مرحباً بك، الأستاذ الكريم</h2>
              <p className="text-emerald-100 text-xs mb-4">قم بإدارة أقسامك الإدارية والتربوية بكل سهولة واحترافية.</p>
              
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="🔍 ابحث عن قسم أو وثيقة..." 
                className="w-full px-4 py-3 bg-white text-slate-900 rounded-xl shadow-md focus:outline-none text-xs font-medium"
              />
            </div>

            <div className="flex items-center justify-between px-1">
              <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300">📂 الأقسام الـ 12 المعتمدة</h3>
              <span className="text-xs bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full font-bold">نشط</span>
            </div>

            {/* قائمة الأقسام الملونة والمنظمة */}
            <div className="flex flex-col gap-2.5">
              {filteredSections.map(sec => (
                <div 
                  key={sec.id}
                  onClick={() => setSelectedSection(sec)}
                  className="bg-white dark:bg-slate-900 rounded-2xl p-3.5 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between cursor-pointer active:scale-[0.99] transition hover:border-emerald-500"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0 shadow-sm ${sec.lightColor} border`}>
                      <span>{sec.icon}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-1.5 py-0.5 rounded">#{sec.badge}</span>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">{sec.title}</h4>
                      </div>
                      <p className="text-slate-500 dark:text-slate-400 text-[11px] line-clamp-1 mt-0.5">{sec.desc}</p>
                    </div>
                  </div>
                  <div className="text-left shrink-0 pl-1">
                    <span className="block text-[10px] font-bold text-emerald-700 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-1 rounded-md mb-1 text-center">{sec.itemsCount} ملفات</span>
                    <span className="text-[10px] text-emerald-600 font-bold">استعراض ←</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {activeTab === 'seminars' && (
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm text-center py-20 text-slate-500">
            <span className="text-4xl block mb-2">📅</span>
            <p className="text-sm font-bold">قسم الندوات التربوية قيد التفعيل</p>
          </div>
        )}
        {activeTab === 'forum' && (
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm text-center py-20 text-slate-500">
            <span className="text-4xl block mb-2">💬</span>
            <p className="text-sm font-bold">منتدى النقاش والدردشة قيد التفعيل</p>
          </div>
        )}
        {activeTab === 'settings' && (
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm space-y-4">
            <h3 className="font-bold text-base text-emerald-700">⚙️ إعدادات التطبيق والتخزين</h3>
            <p className="text-xs text-slate-500">التطبيق يعمل بنظام Offline-first مع تخزين محلي آمن عبر IndexedDB.</p>
          </div>
        )}

      </main>

      {/* نافذة تفاصيل القسم */}
      {selectedSection && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative border border-slate-200">
            <button onClick={() => setSelectedSection(null)} className="absolute top-4 left-4 text-slate-400 hover:text-slate-600 font-bold bg-slate-100 p-1.5 rounded-full">✕</button>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">{selectedSection.icon}</span>
              <div>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">قسم #{selectedSection.badge}</span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">{selectedSection.title}</h3>
              </div>
            </div>
            <p className="text-xs text-slate-500 mb-4 bg-slate-50 dark:bg-slate-800 p-3 rounded-xl">{selectedSection.desc}</p>
            <h5 className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">📄 الملفات المخزنة (${selectedSection.files.length}):</h5>
            <ul className="space-y-2 mb-4 max-h-40 overflow-y-auto">
              {selectedSection.files.map((file: string, idx: number) => (
                <li key={idx} className="bg-slate-50 dark:bg-slate-800 p-2.5 rounded-xl text-xs flex justify-between items-center border border-slate-100 dark:border-slate-700">
                  <span className="font-semibold text-slate-700 dark:text-slate-200">📁 {file}</span>
                  <span className="text-emerald-600 text-[10px] font-bold">متاح</span>
                </li>
              ))}
            </ul>
            <button onClick={() => setSelectedSection(null)} className="w-full py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-md">إغلاق النافذة</button>
          </div>
        </div>
      )}

      {/* شريط التنقل السفلي الملون والمنظم */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-2 px-1 flex justify-around items-center z-50 shadow-2xl">
        <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center w-1/5 py-1 ${activeTab === 'home' ? 'text-emerald-700 font-bold' : 'text-slate-400'}`}>
          <span className="text-lg">🏠</span>
          <span className="text-[10px] mt-1">{t('home')}</span>
        </button>
        <button onClick={() => setActiveTab('library')} className={`flex flex-col items-center w-1/5 py-1 ${activeTab === 'library' ? 'text-emerald-700 font-bold' : 'text-slate-400'}`}>
          <span className="text-lg">📁</span>
          <span className="text-[10px] mt-1">{t('library')}</span>
        </button>
        <button onClick={() => setActiveTab('seminars')} className={`flex flex-col items-center w-1/5 py-1 ${activeTab === 'seminars' ? 'text-emerald-700 font-bold' : 'text-slate-400'}`}>
          <span className="text-lg">📅</span>
          <span className="text-[10px] mt-1">{t('seminars')}</span>
        </button>
        <button onClick={() => setActiveTab('forum')} className={`flex flex-col items-center w-1/5 py-1 ${activeTab === 'forum' ? 'text-emerald-700 font-bold' : 'text-slate-400'}`}>
          <span className="text-lg">💬</span>
          <span className="text-[10px] mt-1">{t('forum')}</span>
        </button>
        <button onClick={() => setActiveTab('settings')} className={`flex flex-col items-center w-1/5 py-1 ${activeTab === 'settings' ? 'text-emerald-700 font-bold' : 'text-slate-400'}`}>
          <span className="text-lg">⚙️</span>
          <span className="text-[10px] mt-1">{t('settings')}</span>
        </button>
      </nav>

    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
