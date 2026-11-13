import React, { useState } from 'react';
import { AppProvider, useApp } from '../context/AppContext';
import { StorageService } from '../services/storageService';

const sections = [
  {
    id: 1,
    title: "المذكرات التربوية والدروس",
    desc: "مذكرات الأسابيع، التحضير للبيداغوجيا، والدروس النموذجية.",
    icon: "fa-book-open",
    lightColor: "bg-blue-50 text-blue-600",
    badge: "1",
    itemsCount: 24,
    files: ["مذكرة الوحدة الأولى - رياضيات", "تحضير درس العلوم الطبيعية", "مخطط التوزيع السنوي"]
  },
  {
    id: 2,
    title: "الوثائق الخاصة بالأستاذ",
    desc: "القرارات الوزارية، المناهج، والوثائق الرسمية الخاصة بالمهنة.",
    icon: "fa-id-card-clip",
    lightColor: "bg-amber-50 text-amber-600",
    badge: "2",
    itemsCount: 12,
    files: ["المنهاج الرسمي للمادة", "قرار التعيين والترقية", "التدرجات السنوية"]
  },
  {
    id: 3,
    title: "الفروض والاختبارات",
    desc: "مواضيع الفروض والاختبارات، تقارير الخرجات الميدانية.",
    icon: "fa-file-lines",
    lightColor: "bg-emerald-50 text-emerald-600",
    badge: "3",
    itemsCount: 8,
    files: ["فرض الثلاثي الأول رياضيات", "تقرير خرجة تربوية للمتحف", "تصحيح نموذج الاختبار"]
  },
  {
    id: 4,
    title: "التكوين",
    desc: "ملفات التكوين الذاتي، الملتقيات، والندوات التربوية.",
    icon: "fa-graduation-cap",
    lightColor: "bg-purple-50 text-purple-600",
    badge: "4",
    itemsCount: 5,
    files: ["شهادة تكوين المقاربة بالكفاءات", "ملخص الندوة التربوية الجهوية"]
  },
  {
    id: 5,
    title: "كتب مساعدة",
    desc: "المراجع، الكتب المدرسية، والأدلة الأستاذية المساعدة.",
    icon: "fa-book",
    lightColor: "bg-rose-50 text-rose-600",
    badge: "5",
    itemsCount: 15,
    files: ["دليل الأستاذ السنة الخامسة", "كتاب التمارين المعلّمة"]
  },
  {
    id: 6,
    title: "الوسائل التعليمية",
    desc: "البطاقات الإيضاحية، الوسائل الرقمية، واللوحات البصرية.",
    icon: "fa-laptop-code",
    lightColor: "bg-cyan-50 text-cyan-600",
    badge: "6",
    itemsCount: 19,
    files: ["عرض بوربوينت الوحدة 3", "بطاقات الحروف الملونة"]
  },
  {
    id: 7,
    title: "الوثائق الإدارية",
    desc: "الجداول الزمنية، الاستدعاءات، ورخص الغياب.",
    icon: "fa-folder-tree",
    lightColor: "bg-indigo-50 text-indigo-600",
    badge: "7",
    itemsCount: 10,
    files: ["جدول استبدال الحصص", "طلب رخصة استثنائية"]
  },
  {
    id: 8,
    title: "قوائم التلاميذ",
    desc: "قوائم الأسماء، كشوف النقاط، وإحصائيات الحضور.",
    icon: "fa-file-excel",
    lightColor: "bg-green-50 text-green-700",
    badge: "8",
    itemsCount: 4,
    files: ["قائمة تلاميذ القسم 4 متوسط 1", "رصد نقاط الفصل الأول"]
  },
  {
    id: 9,
    title: "الاحتفالات الوطنية",
    desc: "برامج الأنشطة الثقافية، الأناشيد، والاحتفالات الرسمية.",
    icon: "fa-flag",
    lightColor: "bg-red-50 text-red-600",
    badge: "9",
    itemsCount: 6,
    files: ["برنامج يوم العلم", "نشيد قسماً والذكرى الوطنية"]
  },
  {
    id: 10,
    title: "السمعي البصري",
    desc: "الفيديوهات التعليمية، التسجيلات الصوتية، والوسائط المتعددة.",
    icon: "fa-photo-film",
    lightColor: "bg-teal-50 text-teal-600",
    badge: "10",
    itemsCount: 14,
    files: ["فيديو تعليمي لقواعد النحو", "تسجيل صوتي لنصوص الإستماع"]
  },
  {
    id: 11,
    title: "شهادات تقديرية وتكريمية",
    desc: "شهادات التفوق، التكريمات المدرسية، وخطابات الشكر والتقدير.",
    icon: "fa-award",
    lightColor: "bg-amber-50 text-amber-700",
    badge: "11",
    itemsCount: 11,
    files: ["شهادة التميز الدراسي للفصل الأول", "رسالة شكر وتقدير من الإدارة"]
  },
  {
    id: 12,
    title: "ملفات عامة",
    desc: "مستندات متنوعة، ملاحظات، وأرشيف إضافي.",
    icon: "fa-box-archive",
    lightColor: "bg-slate-100 text-slate-700",
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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-['Cairo',sans-serif]">
      
      {/* رأس الصفحة العلوي */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center shadow-md">
              <i className="fa-solid fa-graduation-cap text-lg"></i>
            </div>
            <div>
              <h1 className="text-base font-bold">{t('appName')}</h1>
              <p className="text-[10px] text-slate-500">بوابة تنظيم الوثائق والأقسام</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={toggleTheme} className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800">
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            <select 
              value={lang} 
              onChange={(e) => setLang(e.target.value as any)}
              className="bg-slate-100 dark:bg-slate-800 text-xs p-1.5 rounded-lg border-none outline-none"
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
        
        {/* تبويب الرئيسية / المكتبة (عرض الأقسام الـ 12) */}
        {(activeTab === 'home' || activeTab === 'library') && (
          <div className="space-y-6">
            
            {/* بطاقة الترحيب والبحث */}
            <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
              <span className="bg-white/20 text-xs font-bold px-3 py-1 rounded-full mb-3 inline-block">العام الدراسي 2025/2026</span>
              <h2 className="text-2xl font-extrabold mb-2">مرحباً بك، الأستاذ الكريم</h2>
              <p className="text-indigo-100 text-xs mb-4">قم بإدارة أقسامك الإدارية والتربوية بكل سهولة واحترافية.</p>
              
              <div className="relative">
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ابحث عن قسم أو وثيقة..." 
                  className="w-full px-4 py-3 bg-white text-slate-900 rounded-2xl shadow-md focus:outline-none text-xs font-medium"
                />
              </div>
            </div>

            {/* شبكة الأقسام الـ 12 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredSections.map(sec => (
                <div 
                  key={sec.id}
                  onClick={() => setSelectedSection(sec)}
                  className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-12 h-12 ${sec.lightColor} rounded-xl flex items-center justify-center text-xl`}>
                        <i className={`fa-solid ${sec.icon}`}></i>
                      </div>
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">{sec.badge}</span>
                    </div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1">{sec.title}</h4>
                    <p className="text-slate-500 dark:text-slate-400 text-xs line-clamp-2 mb-4">{sec.desc}</p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-indigo-600">
                    <span>{sec.itemsCount} ملفات</span>
                    <span>استعراض ←</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {activeTab === 'seminars' && (
          <div className="text-center py-20 text-slate-400">قسم الندوات التربوية قيد التفعيل</div>
        )}
        {activeTab === 'forum' && (
          <div className="text-center py-20 text-slate-400">منتدى النقاش والدردشة قيد التفعيل</div>
        )}
        {activeTab === 'settings' && (
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm">
            <h3 className="font-bold text-lg mb-4">إعدادات التطبيق والتخزين</h3>
            <p className="text-xs text-slate-500">التطبيق يعمل بنظام Offline-first مع تخزين محلي آمن.</p>
          </div>
        )}

      </main>

      {/* نافذة تفاصيل القسم */}
      {selectedSection && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative">
            <button onClick={() => setSelectedSection(null)} className="absolute top-4 left-4 text-slate-400 hover:text-slate-600">✕</button>
            <h3 className="text-lg font-bold mb-2">{selectedSection.title}</h3>
            <p className="text-xs text-slate-500 mb-4">{selectedSection.desc}</p>
            <h5 className="text-xs font-bold text-slate-400 mb-2">الملفات المخزنة:</h5>
            <ul className="space-y-2 mb-4 max-h-40 overflow-y-auto">
              {selectedSection.files.map((file: string, idx: number) => (
                <li key={idx} className="bg-slate-50 dark:bg-slate-800 p-2.5 rounded-xl text-xs flex justify-between items-center">
                  <span>📄 {file}</span>
                </li>
              ))}
            </ul>
            <button onClick={() => setSelectedSection(null)} className="w-full py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold">إغلاق</button>
          </div>
        </div>
      )}

      {/* شريط التنقل السفلي الموثوق */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-2 px-1 flex justify-around items-center z-50 shadow-lg">
        <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center w-1/5 py-1 ${activeTab === 'home' ? 'text-indigo-600 font-bold' : 'text-slate-400'}`}>
          <span className="text-lg">🏠</span>
          <span className="text-[10px] mt-1">{t('home')}</span>
        </button>
        <button onClick={() => setActiveTab('library')} className={`flex flex-col items-center w-1/5 py-1 ${activeTab === 'library' ? 'text-indigo-600 font-bold' : 'text-slate-400'}`}>
          <span className="text-lg">📁</span>
          <span className="text-[10px] mt-1">{t('library')}</span>
        </button>
        <button onClick={() => setActiveTab('seminars')} className={`flex flex-col items-center w-1/5 py-1 ${activeTab === 'seminars' ? 'text-indigo-600 font-bold' : 'text-slate-400'}`}>
          <span className="text-lg">📅</span>
          <span className="text-[10px] mt-1">{t('seminars')}</span>
        </button>
        <button onClick={() => setActiveTab('forum')} className={`flex flex-col items-center w-1/5 py-1 ${activeTab === 'forum' ? 'text-indigo-600 font-bold' : 'text-slate-400'}`}>
          <span className="text-lg">💬</span>
          <span className="text-[10px] mt-1">{t('forum')}</span>
        </button>
        <button onClick={() => setActiveTab('settings')} className={`flex flex-col items-center w-1/5 py-1 ${activeTab === 'settings' ? 'text-indigo-600 font-bold' : 'text-slate-400'}`}>
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
