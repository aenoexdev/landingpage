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
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
          Stop OpenAI Bill Shock <br className="hidden md:block" /> with 1 Line of Code.
        </h1>
        <p className="text-lg md:text-xl text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          Protect your LLM apps from malicious bots, scrapers, and repetitive prompts. Instant prompt caching and user-level rate limiting without setting up Redis.
        </p>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-zinc-100 text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:scale-105 transition-all duration-200 shadow-[0_0_40px_rgba(255,255,255,0.1)]"
        >
          Protect My API Now - $15/mo
        </button>
      </main>

      {/* 핵심 가치 증명 (Features) */}
      <section className="max-w-5xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-zinc-900">
        <div>
          <h3 className="text-xl font-bold mb-4 text-white">Instant Prompt Caching</h3>
          <p className="text-zinc-500 leading-relaxed">
            Stop paying for the same questions. We cache identical LLM responses globally, cutting your API costs by up to 80%.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4 text-white">Zero-Config Rate Limiting</h3>
          <p className="text-zinc-500 leading-relaxed">
            Set token limits per user or IP in seconds. Block abuse before the request even hits OpenAI.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4 text-white">Drop-in Replacement</h3>
          <p className="text-zinc-500 leading-relaxed">
            Just change your API Base URL to <code className="bg-zinc-900 text-zinc-300 px-2 py-1 rounded text-sm ml-1 border border-zinc-800">api.aenoex.dev</code>. No SDKs, no complex backend rewrites.
          </p>
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
