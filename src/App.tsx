import { useState } from 'react';
import UKDigitalWalletArchitecture from './UKDigitalWalletArchitecture';
import UKDigitalWalletCredentials from './UKDigitalWalletCredentials';
import './App.css';

type View = 'architecture' | 'credentials';

const viewLabels: Record<View, string> = {
  architecture: 'Wallet Architecture',
  credentials: 'Wallet Credentials',
};

function App() {
  const [activeView, setActiveView] = useState<View>('architecture');

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="px-6 pt-8 pb-4 flex flex-wrap items-center justify-center gap-3">
        {Object.entries(viewLabels).map(([key, label]) => {
          const view = key as View;
          const isActive = activeView === view;

          return (
            <button
              key={view}
              onClick={() => setActiveView(view)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-400 focus-visible:ring-offset-slate-950 ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      <main className="pb-12">
        {activeView === 'architecture' ? (
          <UKDigitalWalletArchitecture />
        ) : (
          <UKDigitalWalletCredentials />
        )}
      </main>
    </div>
  );
}

export default App;
