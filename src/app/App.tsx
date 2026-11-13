import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from '../context/AppContext';
import { StorageService } from '../services/storageService';
import { BookOpen, FolderArchive, Calendar, MessageSquare, Settings, Moon, Sun } from 'lucide-react';

const MainLayout: React.FC = () => {
  const { t, lang, setLang, theme, toggleTheme } = useApp();
  const [activeTab, setActiveTab] = useState<'home' | 'library' | 'seminars' | 'forum' | 'settings'>('home');
  const [storageInfo, setStorageInfo] = useState({ usage: 0, quota: 0, percent: 0 });
  const [isPersisted, setIsPersisted] = useState(false);

  useEffect(() => {
    StorageService.getStorageStats().then(setStorageInfo);
    if (navigator.storage && navigator.storage.persisted) {
      navigator.storage.persisted().then(setIsPersisted);
    }
  }, []);

  const handleRequestPersist = async () => {
    const success = await StorageService.requestPersistence();
    setIsPersisted(success);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-['Cairo',sans-serif] transition-colors duration-200">
      
      {/* رأس الصفحة العلوي */}
      <header className="bg-emerald-700 dark:bg-emerald-900 text-white p-4 shadow-md flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-base font-bold flex items-center gap-2">
          <span>📚</span> {t('appName')}
        </h1>
        <div className="flex items-center gap-2">
          <button onClick={toggleTheme} className="p-2 rounded-lg bg-emerald-800 dark:bg-emerald-950 hover:bg-emerald-600 transition">
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <select 
            value={lang} 
            onChange={(e) => setLang(e.target.value as any)}
            className="bg-emerald-800 dark:bg-emerald-950 text-white text-xs p-1.5 rounded-lg border-none outline-none cursor-pointer"
          >
            <option value="ar">العربية</option>
            <option value="fr">Français</option>
            <option value="en">English</option>
          </select>
        </div>
      </header>

      {/* محتوى الشاشات */}
      <main className="flex-1 p-4 pb-24 max-w-4xl w-full mx-auto">
        {activeTab === 'home' && (
          <div className="space-y-4">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
              <h2 className="text-xl font-bold mb-2">مرحباً بك في لوحة التحكم</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">النظام يعمل محلياً بالكامل (Offline-first) وجاهز للتشغيل.</p>
            </div>
            
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 space-y-3">
              <h3 className="font-bold text-sm">حالة التخزين المحلي (IndexedDB & Storage)</h3>
              <div className="w-full bg-slate-200 dark:bg-slate-800 h-3 rounded-full overflow-hidden">
                <div className="bg-emerald-600 h-full transition-all duration-500" style={{ width: `${storageInfo.percent}%` }}></div>
              </div>
              <p className="text-xs text-slate-500">
                المساحة المستخدمة: {(storageInfo.usage / (1024 * 1024)).toFixed(2)} ميغابايت ({(storageInfo.percent)}%)
              </p>
              {!isPersisted ? (
                <button onClick={handleRequestPersist} className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition">
                  {t('enablePersist')}
                </button>
              ) : (
                <span className="text-xs text-emerald-600 font-semibold">✓ {t('persistentStorage')}</span>
              )}
            </div>
          </div>
        )}
        {activeTab !== 'home' && (
          <div className="flex flex-col items-center justify-center h-64 text-slate-400">
            <p className="text-lg font-medium">هذا القسم قيد الإنشاء في الخطوات القادمة</p>
          </div>
        )}
      </main>

      {/* شريط التنقل السفلي للهواتف (Bottom Navigation) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-2 px-2 flex justify-between items-center z-50 shadow-lg">
        <button onClick={() => setActiveTab('home')} className={`flex-1 flex flex-col items-center py-1 ${activeTab === 'home' ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-slate-400'}`}>
          <BookOpen size={20} />
          <span className="text-[10px] mt-1">الرئيسية</span>
        </button>
        <button onClick={() => setActiveTab('library')} className={`flex-1 flex flex-col items-center py-1 ${activeTab === 'library' ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-slate-400'}`}>
          <FolderArchive size={20} />
          <span className="text-[10px] mt-1">المكتبة</span>
        </button>
        <button onClick={() => setActiveTab('seminars')} className={`flex-1 flex flex-col items-center py-1 ${activeTab === 'seminars' ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-slate-400'}`}>
          <Calendar size={20} />
          <span className="text-[10px] mt-1">الندوات</span>
        </button>
        <button onClick={() => setActiveTab('forum')} className={`flex-1 flex flex-col items-center py-1 ${activeTab === 'forum' ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-slate-400'}`}>
          <MessageSquare size={20} />
          <span className="text-[10px] mt-1">المنتدى</span>
        </button>
        <button onClick={() => setActiveTab('settings')} className={`flex-1 flex flex-col items-center py-1 ${activeTab === 'settings' ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-slate-400'}`}>
          <Settings size={20} />
          <span className="text-[10px] mt-1">الإعدادات</span>
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
