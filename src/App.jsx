import React, { useState } from 'react';
import Logo from './components/Logo';
import AdminDashboard from './components/AdminDashboard';

const DeleGOLandingPage = () => {
  const [view, setView] = useState('landing');



  const [formData, setFormData] = useState({
    name: '',
    email: '',
    handle: '',
    city: '',
    neighborhood: '',
    category: '',
    followers: '',
    reach: '',
    consent: false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: '0ebe2d75-4f91-4be9-970d-1410f1bdde3c',
          subject: `New Founding Influencer Application: ${formData.name}`,
          ...formData
        })
      });

      const json = await response.json();

      if (!response.ok || !json.success) throw new Error(json.message || 'Failed to submit');

      console.log("Delegate Application Submitted via Web3Forms:", formData);
      alert("Application Received! We will review your profile shortly.");
    } catch (error) {
      console.error("Submission failed:", error);
      alert("There was an error submitting your application. Please try again.");
    }

    // Reset Form
    setFormData({
      name: '', email: '', handle: '', city: '', neighborhood: '',
      category: '', followers: '', reach: '', consent: false
    });
  };

  const [showLogin, setShowLogin] = useState(false);
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'Delego@2026') {
      setView('admin');
      setShowLogin(false);
      setPassword('');
    } else {
      alert('Invalid Access Code');
    }
  };

  if (view === 'admin') {
    return <AdminDashboard onBack={() => setView('landing')} />;
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans relative">
      {/* Admin Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl">
            <h2 className="text-xl font-bold mb-4">Admin Access</h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                autoFocus
                placeholder="Enter Passcode"
                className="w-full p-3 bg-gray-100 rounded-lg border focus:ring-2 focus:ring-yellow-400 outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowLogin(false)}
                  className="flex-1 py-3 text-gray-500 hover:bg-gray-100 rounded-lg font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-black text-[#FFEB3B] rounded-lg font-bold hover:bg-gray-800"
                >
                  Enter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <header className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-black">
        {/* Logo - Top Left (Dark Mode for overlay) */}
        <div className="absolute top-6 left-6 z-30">
          <Logo variant="dark" className="scale-110 origin-top-left" />
        </div>

        {/* Veo 3.1 AI Video */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-60"
          >
            <source src="/media/hero_video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>
        </div>

        <div className="relative z-20 text-center px-6">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-4 tracking-tight text-white">
            Own Your City's Discovery. <br /> <span className="text-[#FFEB3B]">Forever.</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
            Turn your local expertise into the city’s decision engine.
            Become a Founding Influencer for Indore & Pune.
          </p>
          <a href="#apply" className="bg-[#FFEB3B] text-black px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-xl inline-block">
            Apply for Founding Status
          </a>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-20 px-6 max-w-6xl mx-auto space-y-32">

        {/* Feature 1: The Delegate Engine (Philosophy) */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="order-1">
            <h2 className="text-4xl font-bold mb-6">The Delegate Engine</h2>
            <p className="text-lg text-gray-600 mb-6">
              We don’t do "feeds." We do <strong>Answers</strong>. When users need the best,
              they delegate the choice to you. Your recommendations aren't just posts—they are
              the data that powers the city.
            </p>
            <div className="space-y-4">
              {['Scientific Vibe Metrics', 'Direct Attribution', 'Experience Monetization'].map((item) => (
                <div key={item} className="flex items-center space-x-3">
                  <span className="bg-[#FFEB3B] p-1 rounded-full text-xs font-bold w-6 h-6 flex items-center justify-center">✓</span>
                  <span className="font-semibold">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="order-2">
            <div className="bg-gray-50 p-6 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden transform hover:scale-[1.02] transition-transform duration-500">
              <div className="rounded-2xl overflow-hidden relative group shadow-sm">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-80 object-cover"
                >
                  <source src="/media/vibe_demo.mp4" type="video/mp4" />
                </video>
                <div className="absolute bottom-4 left-4 bg-black/50 text-white text-xs px-3 py-1.5 rounded backdrop-blur-sm">
                  Live Vibe Detection
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature 2: The Locality Engine (Hyper-Local Intelligence) - Priority #2 */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <div className="bg-gray-50 p-6 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden transform hover:scale-[1.02] transition-transform duration-500">
              {/* Locality Image */}
              <img
                src="/media/locality.png"
                alt="Locality Engine Interface"
                className="w-full h-80 object-cover rounded-2xl mb-5 shadow-sm"
              />
              <h3 className="text-center font-bold mb-3 uppercase tracking-wider text-xs text-gray-400">Hyper-Local Intelligence</h3>

              <div className="bg-white/60 p-4 rounded-xl backdrop-blur-sm border border-gray-50 text-center">
                <p className="text-xs font-medium text-gray-500">"Trending in Vijay Nagar"</p>
                <p className="text-[10px] text-gray-400 mt-1">Verified by 12 Locals & 3 Influencers</p>
              </div>
            </div>
          </div>

          <div className="order-1 md:order-2">
            <h2 className="text-4xl font-bold mb-6">The Locality Engine</h2>
            <p className="text-lg text-gray-600 mb-6">
              Stop hoarding bookmarks. Access a live intelligence layer that drills down
              from <strong>City</strong> to <strong>Zone</strong> to <strong>Locality</strong>.
              See what's buzzing <em>right now</em>, validated by both experts and the community.
            </p>
            <div className="space-y-6">
              {[
                { title: 'Dual Validation', desc: 'Trust the consensus: Rated by real Locals AND verified Influencers.' },
                { title: 'Granular Zoom', desc: 'City → Zone → Locality. Find the buzz where you are.' },
                { title: 'Truth over Hype', desc: 'Advanced Vibe Scores filter out the noise of promotional ratings.' }
              ].map((item) => (
                <div key={item.title} className="flex items-start space-x-4">
                  <span className="bg-black text-[#FFEB3B] p-2 rounded-lg text-lg mt-1">⌖</span>
                  <div>
                    <h4 className="font-bold text-lg">{item.title}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Feature 3: The Explore Engine (Discovery) - Priority #3 */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="order-1">
            <h2 className="text-4xl font-bold mb-6">The Explore Engine</h2>
            <p className="text-lg text-gray-600 mb-6">
              Stop searching. Start <strong>Finding</strong>. Users don't want lists; they want the
              <span className="bg-[#FFEB3B]/30 px-1 mx-1 rounded">#1 Choice</span> for their specific vibe.
              Your expertise becomes the shortcut they trust.
            </p>
            <div className="space-y-6">
              {[
                { title: 'Contextual Discovery', desc: 'Queries like "Best Cafe to Work in Koregaon Park" get instant answers.' },
                { title: 'Trusted Rankings', desc: 'No algorithms. Just the #1 picks from Founding Influencers.' },
                { title: 'Instant Decisions', desc: 'One click "Let\'s Go" navigation for high-intent users.' }
              ].map((item) => (
                <div key={item.title} className="flex items-start space-x-4">
                  <span className="bg-black text-[#FFEB3B] p-2 rounded-lg text-lg mt-1">➤</span>
                  <div>
                    <h4 className="font-bold text-lg">{item.title}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="order-2">
            <div className="bg-gray-50 p-6 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden transform hover:scale-[1.02] transition-transform duration-500">
              {/* Explore Image */}
              <img
                src="/media/cafe_image.png"
                alt="Explore Engine Interface"
                className="w-full h-80 object-cover rounded-2xl mb-5 shadow-sm"
              />
              <h3 className="text-center font-bold mb-3 uppercase tracking-wider text-xs text-gray-400">Contextual Discovery</h3>

              <div className="bg-white/60 p-4 rounded-xl backdrop-blur-sm border border-gray-50 text-center">
                <p className="text-xs font-medium text-gray-500">"Best Cafe to Work in Koregaon Park"</p>
                <p className="text-[10px] text-gray-400 mt-1">Founding Influencer Choice #1</p>
              </div>
            </div>
          </div>
        </div>

        {/* Feature 4: Host Experiences (The Product) - Priority #4 */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <div className="bg-gray-50 p-6 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden transform hover:scale-[1.02] transition-transform duration-500">
              {/* Feature Image */}
              <img
                src="/media/feature_image.png"
                alt="DeleGO App Interface"
                className="w-full h-auto md:h-80 object-contain md:object-cover rounded-2xl mb-5 shadow-sm"
              />
              <h3 className="text-center font-bold mb-3 uppercase tracking-wider text-xs text-gray-400">Host Experiences with Vibe</h3>
              <div className="grid grid-cols-2 gap-3 bg-white/60 p-3 rounded-xl backdrop-blur-sm border border-gray-50">
                {[
                  { icon: '🔥', label: 'Energy', score: 5.0, desc: 'Intensity (1-10)' },
                  { icon: '🗣️', label: 'Social', score: 7.0, desc: 'Interaction (1-10)' },
                  { icon: '📅', label: 'Structure', score: 6.0, desc: 'Schedule (1-10)' },
                  { icon: '✨', label: 'Novelty', score: 7.0, desc: 'Uniqueness (1-10)' },
                  { icon: '💪', label: 'Effort', score: 3.0, desc: 'Difficulty (1-10)' }
                ].map((vibe) => (
                  <div key={vibe.label} className="flex flex-col justify-center">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] font-bold text-gray-700 flex items-center gap-1">{vibe.icon} {vibe.label}</span>
                      <span className="text-[10px] font-bold text-gray-900">{vibe.score}</span>
                    </div>
                    <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-1.5 bg-[#FFEB3B] rounded-full"
                        style={{ width: `${(vibe.score / 10) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-[8px] text-gray-400 mt-0.5 leading-tight truncate">{vibe.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="order-1 md:order-2">
            <h2 className="text-4xl font-bold mb-6">Host Real-World Experiences</h2>
            <p className="text-lg text-gray-600 mb-6">
              Don't just post about it—<strong>live it</strong>. Organize and host real-world events
              that match your style, from <strong>Cafe Crawls</strong> and <strong>Pub Hops</strong> to
              <strong>Treks</strong> and <strong>Jamming Sessions</strong>.
            </p>
            <div className="space-y-6">
              {[
                { title: 'Curated Gatherings', desc: 'Bring your community together for experiences only you can design.' },
                { title: 'Vibe Transparency', desc: 'Use the matrix to show if it\'s a chill jam or a high-energy crawl.' },
                { title: 'Seamless Hosting', desc: 'You focus on the guests and the vibe; we handle the rest.' }
              ].map((item) => (
                <div key={item.title} className="flex items-start space-x-4">
                  <span className="bg-black text-[#FFEB3B] p-2 rounded-lg text-lg mt-1">⚡</span>
                  <div>
                    <h4 className="font-bold text-lg">{item.title}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </section>

      {/* Form Section */}
      <section id="apply" className="py-20 bg-gray-50 px-6">
        <div className="max-w-3xl mx-auto bg-white p-10 rounded-3xl shadow-2xl border border-gray-100">
          <h2 className="text-3xl font-bold mb-2 text-center">Founding Influencer Application</h2>
          <p className="text-center text-gray-500 mb-10 text-lg">Claim your neighborhood before it's taken.</p>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
            {/* Row 1: Identity */}
            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text" placeholder="Full Name"
                className="p-4 bg-gray-100 rounded-xl focus:ring-2 focus:ring-[#FFEB3B] outline-none"
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <input
                type="email" placeholder="Email Address"
                className="p-4 bg-gray-100 rounded-xl focus:ring-2 focus:ring-[#FFEB3B] outline-none"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            {/* Row 2: Location & Social */}
            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text" placeholder="Instagram Handle (@...)"
                className="p-4 bg-gray-100 rounded-xl focus:ring-2 focus:ring-[#FFEB3B] outline-none"
                onChange={(e) => setFormData({ ...formData, handle: e.target.value })}
              />
              <input
                type="text" placeholder="Primary City"
                className="p-4 bg-gray-100 rounded-xl focus:ring-2 focus:ring-[#FFEB3B] outline-none"
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              />
            </div>

            {/* Row 3: Expertise */}
            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text" placeholder="Primary Neighborhood Expertise"
                className="p-4 bg-gray-100 rounded-xl focus:ring-2 focus:ring-[#FFEB3B] outline-none"
                onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
              />
              <select
                className="p-4 bg-gray-100 rounded-xl focus:ring-2 focus:ring-[#FFEB3B] outline-none"
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="">Content Category</option>
                <option value="Food">Food</option>
                <option value="Cafe">Cafe</option>
                <option value="Real Estate">Real Estate</option>
                <option value="Experiences">Experiences</option>
                <option value="Mixed">Mixed</option>
              </select>
            </div>

            {/* Row 4: Stats */}
            <div className="grid md:grid-cols-2 gap-6">
              <select
                className="p-4 bg-gray-100 rounded-xl focus:ring-2 focus:ring-[#FFEB3B] outline-none"
                onChange={(e) => setFormData({ ...formData, followers: e.target.value })}
              >
                <option value="">Follower Count</option>
                <option value="1k-10k">1k - 10k</option>
                <option value="10k-50k">10k - 50k</option>
                <option value="50k-100k">50k - 100k</option>
                <option value="100k+">100k+</option>
              </select>
              <select
                className="p-4 bg-gray-100 rounded-xl focus:ring-2 focus:ring-[#FFEB3B] outline-none"
                onChange={(e) => setFormData({ ...formData, reach: e.target.value })}
              >
                <option value="">Monthly Reach</option>
                <option value="Under 50k">Under 50k</option>
                <option value="50k-200k">50k - 200k</option>
                <option value="200k+">200k+</option>
              </select>
            </div>

            {/* Consent */}
            <div className="flex items-start gap-3 p-2">
              <input
                type="checkbox"
                id="consent"
                className="mt-1.5 w-5 h-5 accent-black cursor-pointer"
                onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
              />
              <label htmlFor="consent" className="text-sm text-gray-500 cursor-pointer select-none">
                I commit to building real credibility for my city, prioritizing honest recommendations over paid promotions, and becoming a trusted voice for the community.
              </label>
            </div>

            <button
              disabled={!formData.consent}
              className={`w-full py-5 rounded-2xl font-bold text-xl transition-all duration-300 ${formData.consent
                ? 'bg-black text-[#FFEB3B] hover:bg-gray-800 cursor-pointer shadow-lg hover:shadow-xl'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
            >
              Submit Application
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 text-center text-gray-400 text-sm border-t border-gray-100 flex flex-col items-center">
        <Logo variant="light" className="mb-4" />
        <p>&copy; 2026 DeleGO Engine. Curated by Locals. Powered by Antigravity.</p>
        <button
          onClick={() => setShowLogin(true)}
          className="mt-4 text-xs text-gray-300 hover:text-gray-500 transition-colors"
        >
          Admin Login
        </button>
      </footer>
    </div>
  );
};

export default DeleGOLandingPage;
