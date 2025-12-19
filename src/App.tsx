import { useState, useEffect } from 'react';
import {
    Shield, Cpu, Key, Fingerprint, Lock, RefreshCw, Info, Sparkles, X, Menu,
    LayoutDashboard, HelpCircle, LogOut, Terminal, RotateCcw, BookOpen, AlertCircle,
    ArrowRightLeft, Check, Smartphone, HardDrive
} from 'lucide-react';
import { useToast } from './components/ui/ToastContext';
import Modal from './components/ui/Modal';

const StyleOverlay = () => (
    <style>{`
      @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
      .noise-bg { position: fixed; top: -50%; left: -50%; width: 200%; height: 200%; background: transparent url('http://assets.iceable.com/img/noise-transparent.png') repeat; animation: noise .2s infinite; opacity: .03; z-index: 1; pointer-events: none; }
      .animate-marquee { animation: marquee 15s linear infinite; }
      .active-nav { border-left: 3px solid #EE5D43; background: linear-gradient(90deg, rgba(238,93,67,0.05) 0%, transparent 100%); color: white !important; }
      .sidebar-blur { backdrop-filter: blur(20px); background: rgba(5, 5, 5, 0.95); }
      .main-transition { transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
    `}</style>
);

const App = () => {
    const { toast } = useToast();

    // -- State --
    const [currentView, setCurrentView] = useState('dashboard');
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Default to false for Auth Page demo



    // FIDO Wizard
    const [wizardStep, setWizardStep] = useState(0);

    // News Widget State
    const [newsIndex, setNewsIndex] = useState(0);
    const newsItems = [
        { title: "Новая возможность", text: "Доступен аудит безопасности AI для ваших ключей.", type: "news" },
        { title: "Акция", text: "Скидка 50% на Titan-X до конца месяца.", type: "promo" },
        { title: "Кибер-угроза", text: "Рост фишинговых атак: обновите прошивку.", type: "alert" },
        { title: "Совет дня", text: "Используйте разные PIN-коды для разных устройств.", type: "tip" }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setNewsIndex((prev) => (prev + 1) % newsItems.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    // -- Modal States --

    // Firmware Update Flow
    // 0: idle, 1: checking, 2: available, 3: touch, 4: progress, 5: success
    const [updateStep, setUpdateStep] = useState(0);

    // PIN Management Flow
    const [pinData, setPinData] = useState({ current: '', new: '', confirm: '' });
    const [pinModal, setPinModal] = useState<'success' | 'error' | null>(null);

    // Factory Reset Flow
    // 0: idle, 1: warning, 2: replug, 3: touch, 4: success
    const [resetStep, setResetStep] = useState(0);

    // -- Handlers --

    // Update System
    const handleCheckUpdate = () => {
        setUpdateStep(1); // Checking
        setTimeout(() => {
            // Mocking availability
            setUpdateStep(2); // Available
        }, 1500);
    };

    const startUpdate = () => {
        setUpdateStep(3); // Touch
        // Mock user touch
        setTimeout(() => {
            setUpdateStep(4); // Progress
            // Mock install
            setTimeout(() => {
                setUpdateStep(5); // Success
            }, 3000);
        }, 2000);
    };

    // PIN System
    const handlePinUpdate = () => {
        const { current, new: newPin, confirm } = pinData;

        if (!current || !newPin || !confirm) {
            toast('Заполните все поля', 'error');
            return;
        }
        if (newPin !== confirm) {
            toast('PIN-коды не совпадают', 'error');
            return;
        }

        // Mock validation logic
        if (current === '1234') { // Assume 1234 is correct for demo
            setPinModal('success');
            setPinData({ current: '', new: '', confirm: '' });
        } else {
            setPinModal('error');
        }
    };

    // Reset System
    const handleReset = () => {
        setResetStep(1); // Warning
    };

    const confirmReset = () => {
        setResetStep(2); // Replug
        setTimeout(() => {
            setResetStep(3); // Touch
            setTimeout(() => {
                setResetStep(4); // Success
            }, 2000);
        }, 2000);
    };


    // -- Render Functions (changed from Components to fix focus bug) --

    const renderDashboardView = () => (
        <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-grow glass-card p-8 rounded-[32px] relative overflow-hidden group border-zinc-800">
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Cpu size={160} className="text-brand-orange" />
                    </div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                            <span className="text-green-500 text-xs font-bold tracking-widest uppercase text-glow-green">Устройство активно</span>
                        </div>
                        <h1 className="text-4xl font-bold text-white mb-4">TauTan Key v2</h1>
                        <p className="text-zinc-400 max-w-md mb-8 leading-relaxed">Ваш аппаратный токен полностью работоспособен. Последняя проверка обновлений пройдена 12 минут назад.</p>
                        <div className="flex flex-wrap gap-4">
                            <button onClick={handleCheckUpdate} className="px-6 py-3 bg-[#a771fe] text-white font-bold rounded-full text-sm hover:scale-105 transition-transform active:scale-95 shadow-lg shadow-[#a771fe]/20">Проверить обновления</button>
                        </div>
                    </div>
                </div>

                <div className="w-full lg:w-72 flex flex-col gap-4">
                    <div className="flex-1 p-6 glass-card border-zinc-800 rounded-[24px]">
                        <p className="text-zinc-500 text-[10px] uppercase font-bold mb-2 tracking-widest">Записей FIDO2</p>
                        <p className="text-4xl font-bold text-white">3</p>
                    </div>
                    <div className="flex-1 p-6 glass-card border-zinc-800 rounded-[24px]">
                        <p className="text-zinc-500 text-[10px] uppercase font-bold mb-2 tracking-widest">Уровень доверия</p>
                        <p className="text-3xl font-bold text-brand-orange tracking-tighter text-glow">MAXIMUM</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { icon: Lock, color: 'orange', title: 'Шифрование данных', desc: 'Используется AES-256 GCM на уровне чипа.' },
                    { icon: Fingerprint, color: 'brand-purple', title: 'WebAuthn/FIDO2', desc: 'Беспарольный вход в Google, GitHub и др.' },
                    { icon: Shield, color: 'green', title: 'Защита от фишинга', desc: 'Ключ проверяет домен перед подписью.' }
                ].map((feat, i) => (
                    <div key={i} className="p-6 bg-zinc-900/20 border border-zinc-800/40 rounded-[24px] hover:border-zinc-700 transition-all cursor-pointer group">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-${feat.color === 'brand-purple' ? 'brand-purple' : feat.color + '-500'}`} style={{ backgroundColor: feat.color === 'brand-purple' ? 'rgba(167, 113, 254, 0.1)' : `rgba(var(--${feat.color}-rgb), 0.1)` }}>
                            <feat.icon size={20} className={feat.color === 'brand-purple' ? 'text-brand-purple drop-shadow-[0_0_8px_rgba(167,113,254,0.5)]' : ''} />
                        </div>
                        <h3 className="text-white font-bold mb-1">{feat.title}</h3>
                        <p className="text-xs text-zinc-500">{feat.desc}</p>
                    </div>
                ))}
            </div>

            {/* News Widget */}
            <div className="mt-8 relative overflow-hidden group cursor-pointer">
                <div className="absolute inset-0 bg-zinc-900/40 backdrop-blur-xl border border-[#a771fe]/30 rounded-2xl transition-all duration-300 group-hover:border-[#a771fe]/60 group-hover:shadow-[0_0_20px_rgba(167,113,254,0.15)]"></div>
                <div className="relative z-10 p-4 px-6 flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                        <div className="w-10 h-10 rounded-full bg-[#a771fe]/10 flex items-center justify-center text-[#a771fe] shrink-0 animate-pulse">
                            <Sparkles size={20} />
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <div className="transition-all duration-500 ease-in-out transform" key={newsIndex}>
                                <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
                                    <span className="text-[#a771fe] text-[10px] font-black uppercase tracking-widest border border-[#a771fe]/30 px-2 py-0.5 rounded-md self-start md:self-auto">
                                        {newsItems[newsIndex].title}
                                    </span>
                                    <p className="text-zinc-300 text-sm truncate font-medium">
                                        {newsItems[newsIndex].text}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-1">
                        {newsItems.map((_, idx) => (
                            <div
                                key={idx}
                                className={`h-1 rounded-full transition-all duration-300 ${idx === newsIndex ? 'w-6 bg-[#a771fe]' : 'w-1.5 bg-zinc-800'}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    const renderPinView = () => (
        <div className="max-w-3xl mx-auto space-y-8 animate-fade-in relative z-0">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-2">Управление PIN</h2>
                <p className="text-zinc-500">Настройка доступа к функциям ключа</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Change PIN */}
                <div className="p-8 glass-card rounded-[32px] flex flex-col items-center border-zinc-800">
                    <div className="w-12 h-12 bg-brand-orange/10 rounded-full flex items-center justify-center text-brand-orange mb-4"><RefreshCw size={24} /></div>
                    <h3 className="text-white font-bold mb-4">Смена PIN-кода</h3>
                    <input
                        type="password"
                        placeholder="Текущий PIN"
                        value={pinData.current}
                        onChange={e => setPinData({ ...pinData, current: e.target.value })}
                        className="w-full bg-black border border-zinc-800 rounded-xl p-3 text-sm mb-3 outline-none focus:border-brand-orange text-white transition-colors"
                    />
                    <input
                        type="password"
                        placeholder="Новый PIN"
                        value={pinData.new}
                        onChange={e => setPinData({ ...pinData, new: e.target.value })}
                        className="w-full bg-black border border-zinc-800 rounded-xl p-3 text-sm mb-3 outline-none focus:border-brand-orange text-white transition-colors"
                    />
                    <input
                        type="password"
                        placeholder="Повторите новый PIN"
                        value={pinData.confirm}
                        onChange={e => setPinData({ ...pinData, confirm: e.target.value })}
                        className="w-full bg-black border border-zinc-800 rounded-xl p-3 text-sm mb-6 outline-none focus:border-brand-orange text-white transition-colors"
                    />
                    <button onClick={handlePinUpdate} className="w-full py-3 bg-zinc-800 text-white font-bold rounded-xl hover:bg-zinc-700 transition-colors active:scale-95">Обновить PIN</button>
                </div>

                {/* Reset Device */}
                <div className="p-8 glass-card border-red-900/20 rounded-[32px] flex flex-col items-center">
                    <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center text-red-500 mb-4"><RotateCcw size={24} /></div>
                    <h3 className="text-white font-bold mb-2">Сброс до заводских</h3>
                    <p className="text-[10px] text-zinc-600 text-center mb-6">ВНИМАНИЕ: Все учетные записи FIDO2 будут безвозвратно удалены.</p>
                    <button onClick={handleReset} className="mt-auto w-full py-3 border border-red-500/30 text-red-500 font-bold rounded-xl hover:bg-red-500/10 transition-colors active:scale-95">Сброс устройства</button>
                </div>
            </div>
        </div>
    );

    const renderFidoView = () => (
        <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
            <div className="flex justify-between items-center px-2">
                <div>
                    <h2 className="text-2xl font-bold text-white">Учетные записи FIDO2</h2>
                    <p className="text-sm text-zinc-500">Управление зарегистрированными сервисами</p>
                </div>
            </div>
            {wizardStep === 0 ? (
                <div className="grid gap-3">
                    {[
                        { name: 'Google Account', id: 'google.com', date: '12.01.2024' },
                        { name: 'GitHub Enterprise', id: 'github.com', date: '05.02.2024' },
                        { name: 'Microsoft Azure', id: 'login.microsoft.com', date: '20.02.2024' }
                    ].map((item, idx) => (
                        <div key={idx} className="p-4 glass-card border-zinc-800 rounded-2xl flex items-center justify-between group hover:border-zinc-700 transition-all">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-brand-orange transition-colors"><Shield size={20} /></div>
                                <div><p className="text-white font-bold text-sm">{item.name}</p><p className="text-[10px] text-zinc-500 font-mono tracking-wider">{item.id}</p></div>
                            </div>
                            <button className="p-2 text-zinc-600 hover:text-red-500 rounded-lg transition-colors"><X size={16} /></button>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="glass-card border-zinc-800 rounded-[32px] p-12 flex flex-col items-center text-center animate-zoom-in">
                    <div className="w-20 h-20 bg-brand-orange/10 rounded-full flex items-center justify-center text-brand-orange mb-6 animate-pulse text-glow"><Key size={32} /></div>
                    <h3 className="text-xl font-bold text-white mb-2">{wizardStep === 1 ? 'Подключите устройство' : 'Коснитесь сенсора'}</h3>
                    <button onClick={() => setWizardStep(0)} className="px-8 py-3 bg-zinc-800 text-white rounded-full font-bold text-sm mt-4">Назад</button>
                </div>
            )}
        </div>
    );

    const renderDeviceInfoView = () => (
        <div className="max-w-5xl mx-auto space-y-6 animate-fade-in">
            <h2 className="text-2xl font-bold text-white mb-6">Техническая спецификация</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-card border-zinc-800 rounded-[32px] p-8">
                    <h3 className="text-brand-orange font-bold mb-6 flex items-center gap-2 uppercase tracking-widest text-[10px]"><Terminal size={14} /> Системные логи</h3>
                    <div className="font-mono text-[11px] text-zinc-500 space-y-2 h-48 overflow-y-auto scrollbar-hide">
                        <p className="text-green-500/80">[OK] Secure Boot initialized</p><p className="text-green-500/80">[OK] Root of Trust established</p><p>[INFO] FIDO2 Subsystem started (Rev 4.1)</p><p>[OK] Device ready.</p>
                    </div>
                </div>
                <div className="space-y-4">
                    <div className="p-6 glass-card border-zinc-800 rounded-[24px] flex justify-between items-center"><span className="text-zinc-500 text-sm">Модель</span><span className="text-white font-bold">TT-SEC-X PRO</span></div>
                    <div className="p-6 glass-card border-zinc-800 rounded-[24px] flex justify-between items-center"><span className="text-zinc-500 text-sm">Серийный номер</span><span className="text-green-500 font-bold text-glow-green">EDS88000FKZ78</span></div>
                    <button onClick={handleCheckUpdate} className="w-full py-4 bg-[#a771fe] border border-[#a771fe]/20 text-white rounded-full text-xs font-bold hover:scale-105 transition-all uppercase tracking-widest shadow-[0_0_20px_rgba(167,113,254,0.3)]">Проверить обновление</button>
                </div>
            </div>
        </div>
    );

    const renderAuthView = () => (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 relative overflow-hidden">
            <div className="noise-bg"></div>
            <div className="absolute top-0 left-0 w-full h-[500px] bg-brand-purple/20 blur-[120px] rounded-full opacity-20 -translate-y-1/2 pointer-events-none"></div>

            <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
                {/* Visual Side */}
                <div className="flex flex-col items-center justify-center animate-fade-in order-2 lg:order-1">
                    <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
                        <div className="absolute inset-0 bg-brand-purple/20 blur-[80px] rounded-full animate-pulse"></div>
                        <img
                            src="/img/render_type_c.png"
                            alt="Token"
                            className="w-full h-full object-contain drop-shadow-[0_0_50px_rgba(167,113,254,0.3)] hover:scale-105 transition-transform duration-700 ease-in-out"
                        />
                    </div>
                </div>

                {/* Login Form Side */}
                <div className="glass-card p-10 rounded-[40px] border-zinc-800/50 backdrop-blur-2xl animate-slide-in-right order-1 lg:order-2">
                    <div className="text-center mb-10">
                        <div className="w-16 h-16 bg-brand-purple/10 rounded-2xl flex items-center justify-center text-brand-purple mx-auto mb-6 shadow-[0_0_20px_rgba(167,113,254,0.2)]">
                            <div
                                className="w-16 h-16 bg-[#a771fe]"
                                style={{
                                    maskImage: 'url(/img/bars_head.png)',
                                    maskSize: 'contain',
                                    maskRepeat: 'no-repeat',
                                    maskPosition: 'center',
                                    WebkitMaskImage: 'url(/img/bars_head.png)',
                                    WebkitMaskSize: 'contain',
                                    WebkitMaskRepeat: 'no-repeat',
                                    WebkitMaskPosition: 'center'
                                }}
                            />
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Tautan Secure Key</h1>
                        <p className="text-zinc-500 text-sm">Панель управления безопасностью</p>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest ml-1">Логин</label>
                            <input
                                type="text"
                                placeholder="name@company.com"
                                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 text-white outline-none focus:border-brand-purple/50 transition-colors"
                            />
                        </div>

                        <button
                            onClick={() => setIsAuthenticated(true)}
                            className="w-full py-4 bg-[#a771fe] hover:bg-[#905bf5] text-white font-bold rounded-xl transition-all shadow-[0_0_30px_rgba(167,113,254,0.4)] hover:shadow-[0_0_50px_rgba(167,113,254,0.6)] flex items-center justify-center gap-3 active:scale-95 group"
                        >
                            <Fingerprint size={24} className="group-hover:scale-110 transition-transform" />
                            <span>Войти с Passkey</span>
                        </button>

                        <button
                            className="w-full py-4 bg-zinc-800/50 hover:bg-zinc-800 text-white font-bold rounded-xl transition-all border border-zinc-700 hover:border-zinc-600 flex items-center justify-center gap-3 active:scale-95 group mt-3"
                        >
                            <span>Регистрация</span>
                        </button>

                        <div className="text-center pt-4">
                            <p className="text-[10px] uppercase tracking-widest font-light text-red-500/80">
                                Мы не принимаем вход с помощью пароля<br />
                                <span className="text-[#a771fe] cursor-not-allowed hover:underline font-light mt-1 inline-block">и вот почему</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-8 text-center w-full text-zinc-700 text-[10px] uppercase tracking-[0.2em] font-bold">
                Protected by Tautan Security Engine
            </div>
        </div>
    );

    if (!isAuthenticated) {
        return (
            <>
                <StyleOverlay />
                {renderAuthView()}
            </>
        );
    }

    return (
        <div className="min-h-screen bg-[#050505] text-zinc-100 font-sans selection:bg-brand-orange/30 flex relative overflow-x-hidden">
            <StyleOverlay />
            <div className="noise-bg"></div>

            {/* --- MODALS --- */}

            {/* Update Modals */}
            <Modal isOpen={updateStep === 1} showClose={false} type="default">
                <div className="flex flex-col items-center py-8">
                    <RefreshCw className="animate-spin text-brand-orange mb-4" size={48} />
                    <h3 className="text-xl font-bold text-white">Поиск обновлений</h3>
                </div>
            </Modal>

            <Modal isOpen={updateStep === 2} onClose={() => setUpdateStep(0)} type="update" title="Доступна новая версия прошивки!">
                <div className="flex justify-between items-start gap-8 mb-8 text-left">
                    <p className="text-sm text-zinc-400 max-w-[200px]">Советуем обновиться для доступа к новым функциям и поддержанию безопасности устройства</p>
                    <div className="text-right">
                        <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Актуальная версия</p>
                        <p className="text-4xl font-black text-white">1.17</p>
                    </div>
                </div>
                <button onClick={startUpdate} className="w-full py-4 bg-brand-orange hover:bg-orange-500 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(238,93,67,0.3)]">Начать установку</button>
            </Modal>

            <Modal isOpen={updateStep === 3} showClose={false} title="Обновление">
                <div className="flex flex-col items-center gap-6 py-4">
                    <p>Нажмите на кнопку на устройстве и следуйте дальнейшим инструкциям</p>
                    <Fingerprint size={80} className="text-white animate-pulse" />
                </div>
            </Modal>

            <Modal isOpen={updateStep === 4} showClose={false} title="Обновление">
                <div className="flex items-center justify-center gap-12 py-8">
                    <div className="animate-spin-slow w-16 h-16 border-4 border-dashed border-zinc-600 border-t-brand-orange rounded-full"></div>
                    <Smartphone size={64} className="text-zinc-500" />
                </div>
                <p className="text-center text-sm text-zinc-400 mt-4">Не отключайте устройство пока не завершится обновление!</p>
            </Modal>

            <Modal isOpen={updateStep === 5} onClose={() => setUpdateStep(0)} title="Обновление" type="success">
                <div className="flex items-center justify-between gap-8 py-4">
                    <p className="text-left text-lg">Обновление успешно установлено</p>
                    <Check size={80} className="text-green-500 drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                </div>
                <button onClick={() => setUpdateStep(0)} className="w-full mt-8 py-3 bg-brand-orange hover:bg-orange-500 text-white font-bold rounded-xl transition-all">Понятно</button>
            </Modal>

            {/* PIN Modals */}
            <Modal isOpen={pinModal === 'success'} onClose={() => setPinModal(null)} title="Установка PIN" type="success">
                <div className="flex items-center justify-between gap-8 py-4">
                    <p className="text-left text-lg">PIN успешно изменен</p>
                    <Check size={80} className="text-green-500 drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                </div>
                <button onClick={() => setPinModal(null)} className="w-full mt-8 py-3 bg-brand-orange hover:bg-orange-500 text-white font-bold rounded-xl transition-all">Понятно</button>
            </Modal>

            <Modal isOpen={pinModal === 'error'} onClose={() => setPinModal(null)} title="Установка PIN" type="error">
                <div className="text-center py-4">
                    <p className="text-lg mb-2">Ошибка ввода старого пин-кода</p>
                    <p className="text-zinc-500 uppercase text-xs tracking-widest mb-6">Осталось попыток: <br /><span className="text-2xl font-bold text-white">2</span></p>
                    <div className="flex justify-center mb-6">
                        <X size={80} className="text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                    </div>
                </div>
                <button onClick={() => setPinModal(null)} className="w-full py-3 bg-brand-orange hover:bg-orange-500 text-white font-bold rounded-xl transition-all">Понятно</button>
            </Modal>

            {/* Reset Modals */}
            <Modal isOpen={resetStep === 1} onClose={() => setResetStep(0)} title="Сбросить FIDO ключи?" type="error">
                <div className="text-center space-y-6 py-2">
                    <p className="text-zinc-300">Вы уверены?<br />Это действие сотрёт все ключи и сбросит PIN код.</p>
                    <p className="text-brand-orange font-bold uppercase tracking-wider text-sm">Это действие не может быть отменено!</p>
                    <div className="grid grid-cols-2 gap-4 mt-6">
                        <button onClick={() => setResetStep(0)} className="py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl transition-colors">Нет</button>
                        <button onClick={confirmReset} className="py-3 bg-brand-orange hover:bg-orange-500 text-white font-bold rounded-xl transition-colors shadow-[0_0_20px_rgba(238,93,67,0.3)]">Да</button>
                    </div>
                </div>
            </Modal>

            <Modal isOpen={resetStep === 2} showClose={false} title="Сброс FIDO ключей">
                <div className="flex items-center justify-center gap-8 py-8">
                    <p className="text-left font-bold max-w-[150px]">Вытащите и обратно вставьте ключ</p>
                    <div className="flex gap-4 text-zinc-400">
                        <ArrowRightLeft size={48} />
                        <HardDrive size={48} />
                    </div>
                </div>
            </Modal>

            <Modal isOpen={resetStep === 3} showClose={false} title="Сброс FIDO ключей">
                <div className="flex flex-col items-center gap-6 py-4">
                    <p>Нажмите на кнопку на устройстве и следуйте дальнейшим инструкциям</p>
                    <Fingerprint size={80} className="text-white animate-pulse" />
                </div>
            </Modal>

            <Modal isOpen={resetStep === 4} onClose={() => setResetStep(0)} title="Сброс FIDO ключей" type="success">
                <div className="flex items-center justify-between gap-8 py-4">
                    <p className="text-left text-lg">Ключи успешно сброшены</p>
                    <Check size={80} className="text-green-500 drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                </div>
                <button onClick={() => setResetStep(0)} className="w-full mt-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all">Понятно</button>
            </Modal>

            {/* --- MAIN LAYOUT --- */}

            <aside className={`fixed top-0 left-0 h-full sidebar-blur border-r border-white/5 z-40 main-transition flex flex-col ${isSidebarOpen ? 'w-64' : 'w-20'} hidden md:flex`}>
                <div className="p-6 mb-4 flex items-center justify-center">
                    <div className="flex items-center gap-3 group cursor-pointer w-full">
                        <div className="min-w-[40px] h-10 bg-brand-orange rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(238,93,67,0.3)] shrink-0 overflow-hidden p-1">
                            <img src="/img/bars_head.png" className="w-full h-full object-contain brightness-0 invert" alt="Logo" />
                        </div>
                        {isSidebarOpen && (
                            <div className="animate-fade-in leading-tight">
                                <span className="block text-lg font-bold text-white tracking-tight">Tautan</span>
                                <span className="block text-[10px] font-bold text-brand-orange tracking-widest uppercase">Secure Key</span>
                            </div>
                        )}
                    </div>
                </div>

                <nav className="flex-grow flex flex-col px-3 gap-1">
                    {[
                        { id: 'dashboard', label: 'Дашборд', icon: LayoutDashboard },
                        { id: 'pin', label: 'Управление PIN', icon: Key },
                        { id: 'fido', label: 'FIDO2 Аккаунты', icon: Shield },
                        { id: 'device', label: 'Информация', icon: Info },
                        { id: 'tips', label: 'Советы безопасности', icon: BookOpen },
                        { id: 'news', label: 'Новости киберрисков', icon: AlertCircle },
                        { id: 'faq', label: 'Поддержка', icon: HelpCircle },
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setCurrentView(item.id)}
                            className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all group ${currentView === item.id ? 'active-nav' : 'text-zinc-500 hover:text-white hover:bg-white/5'}`}
                        >
                            <item.icon size={20} className={`shrink-0 ${currentView === item.id ? 'text-brand-orange drop-shadow-[0_0_5px_rgba(238,93,67,0.5)]' : ''}`} />
                            {isSidebarOpen && <span className="text-sm font-bold truncate">{item.label}</span>}
                        </button>
                    ))}
                </nav>

                <div className="p-4 border-t border-white/5 space-y-6">
                    {isSidebarOpen && (
                        <div className="space-y-6 animate-fade-in">
                            <div>
                                <p className="text-[9px] text-zinc-600 uppercase tracking-widest mb-3 font-bold">Design by</p>
                                <img src="/img/tsarka_labs_logo_black.png" alt="Tsarka Labs" className="h-20 -ml-4 brightness-100 opacity-60 hover:opacity-100 transition-opacity" />
                            </div>
                            <div>
                                <p className="text-[9px] text-zinc-600 uppercase tracking-widest mb-3 font-bold">Member of</p>
                                <img src="/img/logo_astana_hub.png" alt="Astana Hub" className="h-18 brightness-100 opacity-60 hover:opacity-100 transition-opacity" />
                            </div>
                        </div>
                    )}
                    <button className="flex items-center gap-4 text-zinc-500 hover:text-white transition-colors px-4 py-2 w-full" onClick={() => setIsAuthenticated(false)}>
                        <LogOut size={20} className="shrink-0" />
                        {isSidebarOpen && <span className="text-sm font-bold">Выход</span>}
                    </button>
                </div>
            </aside>

            <div className={`flex-grow flex flex-col min-w-0 main-transition ${isSidebarOpen ? 'md:pl-64' : 'md:pl-20'}`}>
                <header className="md:hidden flex items-center justify-between p-5 sidebar-blur border-b border-white/5 sticky top-0 z-30">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-brand-orange rounded-lg flex items-center justify-center overflow-hidden p-1">
                            <img src="/img/bars_head.png" className="w-full h-full object-contain brightness-0 invert" alt="Logo" />
                        </div>
                        <span className="font-bold tracking-tight">Tautan Secure Key</span>
                    </div>
                    <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 bg-zinc-900 rounded-lg"><Menu size={20} /></button>
                </header>

                <div className="hidden md:flex h-16 items-center px-12 border-b border-white/5 justify-between bg-black/50 backdrop-blur-sm sticky top-0 z-30">
                    <div className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest flex items-center gap-2">СТАТУС TAUTAN SECURE KEY: <span className="text-green-500 text-glow-green">ПОДКЛЮЧЕН</span></div>
                    <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="text-zinc-500 hover:text-white transition-colors">
                        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>

                <main className="flex-grow p-6 md:p-12 w-full overflow-x-hidden relative z-0">
                    <div className="max-w-6xl mx-auto">
                        {currentView === 'dashboard' && renderDashboardView()}
                        {currentView === 'pin' && renderPinView()}
                        {currentView === 'fido' && renderFidoView()}
                        {currentView === 'device' && renderDeviceInfoView()}
                        {currentView === 'tips' && (
                            <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
                                <div className="text-center"><h2 className="text-3xl font-bold text-white mb-2">Советы кибербезопасности</h2><p className="text-zinc-500">Рекомендации для защиты ваших аккаунтов</p></div>
                                <div className="flex flex-col items-center justify-center py-20"><BookOpen size={64} className="text-zinc-800 mb-6" /><p className="text-zinc-600">Раздел в разработке</p></div>
                            </div>
                        )}
                        {currentView === 'news' && (
                            <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
                                <div className="text-center"><h2 className="text-3xl font-bold text-white mb-2">Новости киберрисков</h2><p className="text-zinc-500">Последние актуальные угрозы и инциденты</p></div>
                                <div className="flex flex-col items-center justify-center py-20"><AlertCircle size={64} className="text-zinc-800 mb-6" /><p className="text-zinc-600">Раздел в разработке</p></div>
                            </div>
                        )}
                        {currentView === 'faq' && (
                            <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
                                <HelpCircle size={64} className="text-zinc-800 mb-6" />
                                <h2 className="text-2xl font-bold text-white mb-4">Нужна помощь?</h2>
                            </div>
                        )}
                    </div>
                </main>

                <div className="w-[120%] bg-brand-orange py-0 overflow-hidden select-none z-10 relative rotate-2 origin-bottom-left scale-110 -translate-x-4 -translate-y-8">
                    <div className="flex animate-marquee whitespace-nowrap">
                        {[...Array(24)].map((_, i) => (
                            <span key={i} className="mx-8 text-white text-[9px] font-black uppercase tracking-[0.3em] flex items-center gap-3">
                                PROTECTED BY TSARKA
                                <img src="/img/tsarka_bars_logo.png" alt="Tsarka Bars" className="h-14 w-auto opacity-90 brightness-100 grayscale" />
                            </span>
                        ))}
                    </div>
                </div>
            </div>


        </div>
    );
};

export default App;
