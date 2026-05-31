'use client';
import { useState } from 'react';

export default function LandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('https://formspree.io/f/xlgvzabv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        console.error("Submission failed.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans selection:bg-zinc-800">
      {/* 네비게이션 바 */}
      <nav className="flex justify-between items-center p-6 max-w-5xl mx-auto">
        <div className="font-extrabold text-2xl tracking-tighter cursor-default">
          aeno<span className="text-zinc-600">ex.</span>
        </div>
      </nav>

      {/* 헤드라인 (Hero Section) */}
      <main className="max-w-4xl mx-auto px-6 pt-32 pb-24 text-center">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
          Stop Chasing Creators for <br/> <span className="text-blue-500">Day-30 Analytics.</span>
        </h1>
        <p className="text-lg text-zinc-400 mt-6 max-w-2xl mx-auto">
          Drop a YouTube or Spotify URL. We automatically capture the 30-day snapshot and generate a white-labeled PDF report for your sponsors. No more manual screenshots and Excel nightmares.
        </p>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-zinc-100 text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:scale-105 transition-all duration-200 shadow-[0_0_40px_rgba(255,255,255,0.1)]"
        >
          Automate My Reports - $29/mo
        </button>
      </main>

      {/* 핵심 가치 증명 (Features) */}
      <section className="max-w-5xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-zinc-900">
        <div>
          <h3 className="text-xl font-bold mb-4 text-white">Fire and Forget</h3>
          <p className="text-zinc-500 leading-relaxed">
            Paste the URL once. We track the exact release date and automatically ping the API 30 days later.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4 text-white">White-labeled PDFs</h3>
          <p className="text-zinc-500 leading-relaxed">
            Your agency's logo, your branding. We generate professional snapshot reports ready to forward to sponsors.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4 text-white">Bulletproof Proof</h3>
          <p className="text-zinc-500 leading-relaxed">
            Stop arguing over changing numbers. We timestamp and lock the views/listens at the exact agreed-upon hour.
          </p>
        </div>
      </section>

      {/* 작동 예시 (Mock Dashboard List) */}
      <section className="max-w-4xl mx-auto px-6 py-12 mb-12">
        <div className="bg-[#09090b] border border-zinc-800 rounded-xl overflow-hidden shadow-2xl">
          <div className="flex flex-col md:flex-row items-center justify-between px-6 py-4 border-b border-zinc-800 bg-black/50">
            <span className="text-sm font-semibold text-zinc-200">Active Campaigns</span>
            <div className="flex gap-2 mt-4 md:mt-0">
              <input type="text" placeholder="Paste YouTube/Spotify URL..." className="bg-zinc-900 border border-zinc-700 text-sm rounded-md px-3 py-1.5 w-64 text-zinc-300 focus:outline-none" disabled />
              <button className="bg-blue-600 text-white text-sm px-4 py-1.5 rounded-md font-medium">Track</button>
            </div>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between py-3 border-b border-zinc-800/50">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-sm text-zinc-300">Tech Review - NordVPN Integration</span>
              </div>
              <div className="flex items-center gap-6">
                <span className="text-xs text-zinc-500">Day 28 / 30</span>
                <span className="text-xs font-mono bg-blue-500/10 text-blue-400 px-2 py-1 rounded">Capturing in 48h</span>
              </div>
            </div>
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-zinc-600"></div>
                <span className="text-sm text-zinc-500">Podcast Ep.14 - BetterHelp</span>
              </div>
              <div className="flex items-center gap-6">
                <span className="text-xs text-zinc-500">Day 30 / 30</span>
                <span className="text-xs font-mono bg-green-500/10 text-green-400 px-2 py-1 rounded">PDF Sent to Sponsor</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 대기자 명단 팝업 모달 (Waitlist Trap) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#09090b] border border-zinc-800 p-8 rounded-2xl max-w-md w-full relative shadow-2xl">
            <button 
              onClick={() => setIsModalOpen(false)} 
              className="absolute top-5 right-5 text-zinc-500 hover:text-white text-xl"
            >
              &times;
            </button>
            {!submitted ? (
              <>
                <h2 className="text-2xl font-bold mb-3 text-white">You're early! ⚡️</h2>
                <p className="text-zinc-400 mb-6 text-sm leading-relaxed">
                  We are currently onboarding users from our private beta. Drop your email below to get priority access and a <strong className="text-white">50% lifetime discount</strong> when we open to the public.
                </p>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <input
                    type="email"
                    required
                    placeholder="enter your work email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-all"
                  />
                  <button 
                    type="submit" 
                    className="bg-white text-black font-bold rounded-xl px-4 py-3 hover:bg-zinc-200 transition-colors"
                  >
                    Join the Waitlist
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-4 border border-zinc-800">
                  <span className="text-2xl">🤝</span>
                </div>
                <h2 className="text-xl font-bold mb-2 text-white">Added to waitlist!</h2>
                <p className="text-zinc-500 text-sm">Keep an eye on your inbox. We'll be in touch soon.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
