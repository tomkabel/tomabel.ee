import React, { useEffect } from 'react';
import { Shield, Linkedin, ChevronDown } from 'lucide-react';

function App() {
  const scrollToContent = () => {
    const contentSection = document.getElementById('content');
    contentSection?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Hero Section */}
      <div className="h-screen flex items-center justify-center relative">
        <div className="text-center">
          <div className="mb-6">
          <h1 className="text-6xl font-bold tracking-tight " data-text="Tom Kristian Abel">Tom Kristian Abel</h1>
          <h2 className="text-2xl font-semibold mb-6  " data-text="Software Developer">Software Developer</h2>
          </div>

          <div className="flex justify-center gap-4 mb-12">
            <a href="https://proksiabel.ee"
               target="_blank"
               rel="noopener noreferrer"
               className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 rounded-lg shadow-lg hover:shadow-indigo-500/25">
              <Shield className="w-4 h-4" />
              Company
            </a>
            <a href="https://www.linkedin.com/in/tom-kristian-abel-75ba4b191"
               target="_blank"
               rel="noopener noreferrer"
               className="flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 transition-all duration-300 rounded-lg shadow-lg hover:shadow-gray-700/25">
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </a>
            <a href="/well-known/openpgpkey/public-key.asc"
               target="_blank"
               rel="noopener noreferrer"
               title="My GPG Public Key"
               className="flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 transition-all duration-300 rounded-lg shadow-lg hover:shadow-gray-700/25">
              <Shield className="w-4 h-4" />
              GPG Key
            </a>
          </div>

          <button
            onClick={scrollToContent}
            className="animate-bounce flex flex-col items-center text-indigo-400 hover:text-indigo-300 transition-colors duration-300"
          >
            <span className="mb-2">Learn More</span>
            <ChevronDown className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div id="content" className="container mx-auto px-4 py-16">
        {/* Experience Timeline Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-indigo-400">
            Journey So Far...
          </h2>

          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            <div className="fade-in card-gradient rounded-xl p-8 transition-all duration-300 shadow-lg hover:shadow-indigo-500/10">
              <h3 className="text-xl font-semibold mb-3">Security Engineer</h3>
              <p className="text-indigo-400/80 mb-3">January 2025 - Present</p>
              <p className="text-gray-400 mb-2">ProksiAbel OÜ</p>
              <p className="text-gray-300">
               Leading a cybersecurity firm specializing in MITM attack detection and prevention, setting industry standards with innovative solutions against advanced phishing threats and digital asset protection.
              </p>
            </div>

            <div className="fade-in card-gradient rounded-xl p-8 transition-all duration-300 shadow-lg hover:shadow-indigo-500/10">
              <h3 className="text-xl font-semibold mb-3">Hacker Tools Developer</h3>
              <p className="text-indigo-400/80 mb-3">June 2021 - May 2024 · 3 years</p>
              <p className="text-gray-400 mb-2">Self-employed</p>
              <p className="text-gray-300">
              Engineered innovative techniques to bypass JavaScript-based security defenses on major platforms, including Google, Microsoft, and Yahoo.
              </p>
            </div>

            <div className="fade-in card-gradient rounded-xl p-8 transition-all duration-300 shadow-lg hover:shadow-indigo-500/10">
              <h3 className="text-xl font-semibold mb-3">Software Developer</h3>
              <p className="text-indigo-400/80 mb-3">September 2019 - May 2021 · 1 year 9 months</p>
              <p className="text-gray-400 mb-2">Smaily - Email Marketing and Automation</p>
              <p className="text-gray-300">
              Led the development of various PHP integrations for Smaily's API, expanding the platform's compatibility across multiple e-commerce and content management systems.
              </p>
            </div>
          </div>
        </div>

        {/* Achievements Section */}
        <div>
          <h2 className="text-3xl font-bold mb-8 text-center text-indigo-400">
            Achievements
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* <div className="fade-in card-gradient rounded-xl p-8 transition-all duration-300 shadow-lg hover:shadow-indigo-500/10 animate-fade-in">
              <h3 className="text-2xl font-semibold mb-4 text-indigo-400">Certified Hacker</h3>
              <p className="text-gray-300">   <a href="https://forte.delfi.ee/artikkel/120300810/intervjuu-krakkeriga-noor-mees-kellele-keskkriminaalpolitsei-esitas-enneolematu-kahtlustuse" target="_blank" rel="noopener noreferrer" className="no-underline">Convicted of cybercrime</a> for forking a publicly available open-source GitHub repository and sharing its configuration files online.</p>
            </div> */}

            <div className="fade-in card-gradient rounded-xl p-8 transition-all duration-300 shadow-lg hover:shadow-indigo-500/10">
              <h3 className="text-2xl font-semibold mb-4 text-indigo-400">Google Botguard</h3>
              <p className="text-gray-300">Analyzed and discovered bypass methods for Google's Botguard and MFA, compromising account security. Published <a href="https://github.com/M41KL-N41TT/evilginx.botguard" target="_blank" rel="noopener noreferrer" className="no-underline">a detailed report and proof-of-concept on GitHub.</a></p>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;