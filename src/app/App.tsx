import React, { useState, useEffect } from 'react';
import { 
  BookOpen, UserCheck, FileText, GraduationCap, Book, Laptop, 
  FolderTree, FileSpreadsheet, Flag, Film, Award, Archive, 
  Search, Plus, Download, BarChart3, X, CheckCircle, FilePlus
} from 'lucide-react';

interface SectionItem {
  id: number;
  title: string;
  desc: string;
  iconName: string;
  badge: string;
  files: string[];
}

const initialSections: SectionItem[] = [
  { id: 1, title: "المذكرات التربوية والدروس", desc: "مذكرات الأسابيع، التحضير للبيداغوجيا، والدروس النموذجية.", iconName: "BookOpen", badge: "1", files: ["مذكرة الوحدة الأولى - رياضيات", "تحضير درس العلوم الطبيعية"] },
  { id: 2, title: "الوثائق الخاصة بالأستاذ", desc: "القرارات الوزارية، المناهج، والوثائق الرسمية الخاصة بالمهنة.", iconName: "UserCheck", badge: "2", files: ["المنهاج الرسمي للمادة", "قرار التعيين والترقية"] },
  { id: 3, title: "الفروض والاختبارات", desc: "مواضيع الفروض والاختبارات، تقارير الخرجات الميدانية.", iconName: "FileText", badge: "3", files: ["فرض الثلاثي الأول رياضيات", "تصحيح نموذج الاختبار"] },
  { id: 4, title: "التكوين", desc: "ملفات التكوين الذاتي، الملتقيات، والندوات التربوية.", iconName: "GraduationCap", badge: "4", files: ["شهادة تكوين المقاربة بالكفاءات"] },
  { id: 5, title: "كتب مساعدة", desc: "المراجع، الكتب المدرسية، والأدلة الأستاذية المساعدة.", iconName: "Book", badge: "5", files: ["دليل الأستاذ السنة الخامسة"] },
  { id: 6, title: "الوسائل التعليمية", desc: "البطاقات الإيضاحية، الوسائل الرقمية، واللوحات البصرية.", iconName: "Laptop", badge: "6", files: ["عرض بوربوينت الوحدة 3"] },
  { id: 7, title: "الوثائق الإدارية", desc: "الجداول الزمنية، الاستدعاءات، ورخص الغياب.", iconName: "FolderTree", badge: "7", files: ["جدول استبدال الحصص", "طلب رخصة استثنائية"] },
  { id: 8, title: "قوائم التلاميذ", desc: "قوائم الأسماء، كشوف النقاط، وإحصائيات الحضور.", iconName: "FileSpreadsheet", badge: "8", files: ["قائمة تلاميذ القسم 4 متوسط 1", "رصد نقاط الفصل الأول"] },
  { id: 9, title: "الاحتفالات الوطنية", desc: "برامج الأنشطة الثقافية، الأناشيد، والاحتفالات الرسمية.", iconName: "Flag", badge: "9", files: ["برنامج يوم العلم", "نشيد قسماً"] },
  { id: 10, title: "السمعي البصري", desc: "الفيديوهات التعليمية، التسجيلات الصوتية، والوسائط المتعددة.", iconName: "Film", badge: "10", files: ["فيديو تعليمي لقواعد النحو", "تسجيل صوتي لنصوص الإستماع"] },
  { id: 11, title: "شهادات تقديرية وتكريمية", desc: "شهادات التفوق، التكريمات المدرسية، وخطابات الشكر والتقدير.", iconName: "Award", badge: "11", files: ["شهادة التميز الدراسي للفصل الأول", "رسالة شكر وتقدير"] },
  { id: 12, title: "ملفات عامة", desc: "مستندات متنوعة، ملاحظات، وأرشيف إضافي.", iconName: "Archive", badge: "12", files: ["أرشيف المراسلات القديمة"] }
];

export default function App() {
  const [sections, setSections] = useState<SectionItem[]>(() => {
    const saved = localStorage.getItem('teacher_portfolio_sections');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return initialSections; }
    }
    return initialSections;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSection, setSelectedSection] = useState<SectionItem | null>(null);
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('teacher_portfolio_sections', JSON.stringify(sections));
  }, [sections]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAddFile = (sectionId: number) => {
    const fileName = prompt("أدخل عنوان الملف الجديد:");
    if (fileName && fileName.trim() !== "") {
      setSections(prev => prev.map(sec => {
        if (sec.id === sectionId) {
          const updated = { ...sec, files: [...sec.files, fileName.trim()] };
          if (selectedSection?.id === sectionId) setSelectedSection(updated);
          return updated;
        }
        return sec;
      }));
      showToast("تمت إضافة الملف بنجاح إلى التخزين المحلي!");
    }
  };

  const filteredSections = sections.filter(sec => 
    sec.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    sec.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalFilesCount = sections.reduce((acc, curr) => acc + curr.files.length, 0);

  const renderIcon = (name: string) => {
    const props = { className: "w-6 h-6" };
    switch (name) {
      case 'BookOpen': return <BookOpen {...props} />;
      case 'UserCheck': return <UserCheck {...props} />;
      case 'FileText': return <FileText {...props} />;
      case 'GraduationCap': return <GraduationCap {...props} />;
      case 'Book': return <Book {...props} />;
      case 'Laptop': return <Laptop {...props} />;
      case 'FolderTree': return <FolderTree {...props} />;
      case 'FileSpreadsheet': return <FileSpreadsheet {...props} />;
      case 'Flag': return <Flag {...props} />;
      case 'Film': return <Film {...props} />;
      case 'Award': return <Award {...props} />;
      default: return <Archive {...props} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col rtl" dir="rtl">
      
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-md shadow-indigo-200">
              <GraduationCap className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">محفظة الأستاذ</h1>
              <p className="text-xs text-slate-500 font-semibold">بوابة تنظيم الوثائق والأقسام التربوية</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 space-x-reverse">
            <button 
              onClick={() => setIsStatsOpen(true)}
              className="flex items-center space-x-2 space-x-reverse bg-indigo-50 text-indigo-700 px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-indigo-100 transition"
            >
              <BarChart3 className="w-4 h-4 ml-1" />
              <span>إحصائيات الملفات</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Banner */}
        <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-3xl p-6 sm:p-10 text-white shadow-xl mb-10 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <span className="bg-white/20 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3 inline-block">العام الدراسي 2025/2026</span>
            <h2 className="text-2xl sm:text-4xl font-extrabold mb-3">مرحباً بك، الأستاذ الكريم</h2>
            <p className="text-indigo-100 text-sm sm:text-base mb-6 leading-relaxed">
              قم بإدارة أقسامك الإدارية والتربوية بكل سهولة واحترافية. التخزين المحلي مفعل لحفظ بياناتك وملفاتك بأمان تام دون إنترنت.
            </p>
            
            <div className="relative">
              <span className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-slate-400">
                <Search className="w-5 h-5 text-slate-400" />
              </span>
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث عن قسم أو وثيقة..." 
                className="w-full pl-4 pr-11 py-3.5 bg-white text-slate-900 rounded-2xl shadow-md focus:outline-none focus:ring-2 focus:ring-white placeholder-slate-400 text-sm font-medium"
              />
            </div>
          </div>
        </div>

        {/* Grid Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg sm:text-xl font-bold text-slate-800 flex items-center space-x-2 space-x-reverse">
            <span>الأقسام الـ 12 المعتمدة</span>
          </h3>
          <span className="text-xs font-bold bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-lg">{filteredSections.length} قسم معروض</span>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSections.map(sec => (
            <div 
              key={sec.id}
              onClick={() => setSelectedSection(sec)}
              className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center transition group-hover:scale-110 duration-300">
                    {renderIcon(sec.iconName)}
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-50 text-indigo-600">{sec.badge}</span>
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition">{sec.title}</h4>
                <p className="text-slate-500 text-xs sm:text-sm line-clamp-2 leading-relaxed mb-4">{sec.desc}</p>
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-semibold">
                <span>{sec.files.length} ملفات مخزنة</span>
                <span className="text-indigo-600 font-bold flex items-center space-x-1 space-x-reverse group-hover:translate-x-1 transition-transform">
                  <span>استعراض</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Modal تفاصيل القسم */}
      {selectedSection && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setSelectedSection(null)} 
              className="absolute top-5 left-5 text-slate-400 hover:text-slate-600 bg-slate-100 w-9 h-9 rounded-full flex items-center justify-center transition"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="flex items-center space-x-4 space-x-reverse mb-6">
              <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
                {renderIcon(selectedSection.iconName)}
              </div>
              <div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-600 inline-block mb-1">{selectedSection.badge}</span>
                <h3 className="text-xl font-black text-slate-900">{selectedSection.title}</h3>
              </div>
            </div>
            
            <p className="text-slate-600 text-sm mb-6 bg-slate-50 p-4 rounded-2xl border border-slate-100 leading-relaxed">{selectedSection.desc}</p>
            
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider">الملفات والمستندات ({selectedSection.files.length})</h5>
                <button 
                  onClick={() => handleAddFile(selectedSection.id)} 
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition flex items-center gap-1"
                >
                  <FilePlus className="w-4 h-4 ml-1" /> إضافة ملف جديد
                </button>
              </div>
              <ul className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {selectedSection.files.map((file, idx) => (
                  <li key={idx} className="flex items-center justify-between bg-slate-50 hover:bg-slate-100 p-3 rounded-xl transition text-sm">
                    <span className="font-semibold text-slate-700">{file}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-end pt-4 border-t border-slate-100">
              <button onClick={() => setSelectedSection(null)} className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm rounded-xl transition">إغلاق</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal الإحصائيات */}
      {isStatsOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
            <h3 className="text-xl font-black text-slate-900 mb-4">إحصائيات المنصة</h3>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-indigo-50 p-4 rounded-2xl text-center">
                <span className="block text-2xl font-black text-indigo-600 mb-1">12</span>
                <span className="text-xs font-bold text-slate-600">قسم تربوي</span>
              </div>
              <div className="bg-emerald-50 p-4 rounded-2xl text-center">
                <span className="block text-2xl font-black text-emerald-600 mb-1">{totalFilesCount}</span>
                <span className="text-xs font-bold text-slate-600">ملف مخزن محلياً</span>
              </div>
            </div>
            <button onClick={() => setIsStatsOpen(false)} className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm rounded-xl transition">حسناً</button>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 bg-slate-900 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center space-x-3 space-x-reverse z-50">
          <CheckCircle className="w-5 h-5 text-emerald-400" />
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
