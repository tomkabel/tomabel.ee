import { useEffect } from 'react';
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
      <div className="h-screen flex items-center justify-center relative px-4">
        <div className="text-center">
          <div className="mb-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight break-words" data-text="Tom Kristian Abel">Tom Kristian Abel</h1>
          <h2 className="text-xl md:text-2xl font-semibold mb-6 break-words" data-text="Software Developer">Security Researcher</h2>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <a href="https://proksiabel.ee"
               target="_blank"
               rel="noopener noreferrer"
               className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 rounded-lg shadow-lg hover:shadow-indigo-500/25">
              <Shield className="w-4 h-4" />
              Company
            </a>
            <a href="https://www.linkedin.com/in/hr-abel/"
               target="_blank"
               rel="noopener noreferrer"
               className="flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 transition-all duration-300 rounded-lg shadow-lg hover:shadow-gray-700/25">
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </a>
            <a href="/.well-known/openpgpkey/public-key.asc"
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
              <h3 className="text-xl font-semibold mb-3">Founder & Principal Security Consultant</h3>
              <p className="text-indigo-400/80 mb-3">June 2024 - Present</p>
              <p className="text-gray-400 mb-2">ProksiAbel OÜ</p>
              <p className="text-gray-300">
                Founded ProksiAbel OÜ, specializing in digital security consulting. I conduct web application penetration testing, manage vulnerabilities, and implement secure development practices to protect against threats.
              </p>
            </div>

            <div className="fade-in card-gradient rounded-xl p-8 transition-all duration-300 shadow-lg hover:shadow-indigo-500/10">
              <h3 className="text-xl font-semibold mb-3">Independent Security Researcher</h3>
              <p className="text-indigo-400/80 mb-3">June 2021 - Present</p>
              <p className="text-gray-400 mb-2">Self-employed</p>
              <p className="text-gray-300">
                Advanced security research through innovative analysis and tool development. Conducted in-depth analysis on complex JavaScript applications, identifying critical vulnerabilities and authoring a PoC for bypassing a major platform's bot detection.
              </p>
            </div>

            <div className="fade-in card-gradient rounded-xl p-8 transition-all duration-300 shadow-lg hover:shadow-indigo-500/10">
              <h3 className="text-xl font-semibold mb-3">Software Developer</h3>
              <p className="text-indigo-400/80 mb-3">September 2019 - May 2021</p>
              <p className="text-gray-400 mb-2">Smaily</p>
              <p className="text-gray-300">
                Owned the development of plugins for seamless integration with popular platforms, driving user engagement and ensuring high performance and reliability through effective bug fixes.
              </p>
            </div>
          </div>
        </div>

        {/* Education Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-indigo-400">
            Education
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            <div className="fade-in card-gradient rounded-xl p-8 transition-all duration-300 shadow-lg hover:shadow-indigo-500/10">
              <h3 className="text-xl font-semibold mb-3">University of Tartu</h3>
              <p className="text-indigo-400/80 mb-3">June 2025 - June 2028</p>
              <p className="text-gray-300">
                Bachelor's degree, Computer Science
              </p>
            </div>
            <div className="fade-in card-gradient rounded-xl p-8 transition-all duration-300 shadow-lg hover:shadow-indigo-500/10">
              <h3 className="text-xl font-semibold mb-3">Tallinn Polytechnic School</h3>
              <p className="text-indigo-400/80 mb-3">2017 - 2020</p>
              <p className="text-gray-300">
                Software Developer
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
              <h3 className="text-2xl font-semibold mb-4 text-indigo-400">JavaScript Security Research</h3>
              <p className="text-gray-300">Analyzed and developed bypass methods for Google's Botguard and MFA, demonstrating expertise in web security. Published <a href="https://github.com/tomkabel/js-security-research" target="_blank" rel="noopener noreferrer" className="no-underline">a detailed report and proof-of-concept on GitHub.</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;