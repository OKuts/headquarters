import { useEffect, useState } from 'react';
/* 1. Імпортуємо необхідні іконки */
import { Server, Activity, LayoutDashboard, CheckCircle2, Loader2 } from 'lucide-react';
import type {HealthStatus} from "@headquarters/shared";

function App() {
    const [data, setData] = useState<{ status: string; time: string } | null>(null);

    useEffect(() => {
        fetch('/api/health')
            .then((res) => res.json())
            .then((result: HealthStatus) => setData(result));
    }, []);

    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col items-center justify-center p-6 font-sans">
            <div className="max-w-md w-full bg-slate-900/50 backdrop-blur-xl rounded-3xl p-8 border border-slate-800 shadow-2xl">

                {/* Заголовок з іконкою */}
                <div className="flex items-center gap-3 mb-8">
                    <div className="bg-blue-500/20 p-2 rounded-lg text-blue-400">
                        <LayoutDashboard size={28} />
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight">Project Console</h1>
                </div>

                <div className="space-y-6">
                    {/* Стан сервера */}
                    <div className="flex items-center justify-between p-4 bg-slate-800/40 rounded-2xl border border-slate-700/50">
                        <div className="flex items-center gap-3">
                            <Server size={20} className="text-slate-400" />
                            <span className="text-sm font-medium">Backend Status</span>
                        </div>

                        {data ? (
                            <div className="flex items-center gap-2 text-green-400 bg-green-400/10 px-3 py-1 rounded-full">
                                <CheckCircle2 size={14} />
                                <span className="text-xs font-bold uppercase tracking-wider">Online</span>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2 text-yellow-400 bg-yellow-400/10 px-3 py-1 rounded-full">
                                <Loader2 size={14} className="animate-spin" />
                                <span className="text-xs font-bold uppercase tracking-wider">Connecting</span>
                            </div>
                        )}
                    </div>

                    {/* Додаткова інфопанель */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-slate-800/40 rounded-2xl border border-slate-700/50">
                            <Activity size={18} className="text-purple-400 mb-2" />
                            <p className="text-xs text-slate-500 uppercase font-bold tracking-tighter">Stack</p>
                            <p className="text-sm font-semibold">Vite + tsx</p>
                        </div>
                        <div className="p-4 bg-slate-800/40 rounded-2xl border border-slate-700/50">
                            <div className="h-[18px] w-[18px] bg-blue-500 rounded-sm mb-2" />
                            <p className="text-xs text-slate-500 uppercase font-bold tracking-tighter">Styles</p>
                            <p className="text-sm font-semibold">Tailwind 4</p>
                        </div>
                    </div>
                </div>

                <button className="mt-8 w-full group flex items-center justify-center gap-2 bg-white text-slate-950 hover:bg-slate-200 transition-all py-3 rounded-xl font-bold overflow-hidden">
                    <span>Get Started</span>
                    <Activity size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>

            <p className="mt-6 text-slate-600 text-xs font-mono">
                {data ? `Server time: ${new Date(data.time).toLocaleTimeString()}` : 'Detecting system time...'}
            </p>
        </div>
    );
}

export default App;