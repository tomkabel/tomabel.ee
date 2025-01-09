import React from 'react';
import { Shield, Linkedin, Mail, Code, Lock, Zap, Server, Globe } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-purple-900/30" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10" />
        
        <div className="container mx-auto px-4 py-24 relative">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-8 h-8 text-cyan-400" />
              <h1 className="text-4xl font-bold tracking-tight">Tom Kristian Abel</h1>
            </div>
            <h2 className="text-2xl font-semibold mb-6 text-cyan-400">
              Cybersecurity Specialist | Ethical Hacker
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Protecting Digital Assets Through Expertise and Innovation
            </p>
            <div className="flex gap-4">
              <a href="mailto:tomkristianabel@gmail.com" 
                 className="flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 transition rounded-lg">
                <Mail className="w-4 h-4" />
                Contact Me
              </a>
              <a href="https://www.linkedin.com/in/tom-kristian-a-75ba4b191" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 transition rounded-lg">
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Experience Section */}
      <div className="container mx-auto px-4 py-24">
        <h2 className="text-3xl font-bold mb-12 text-center">Professional Experience</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 hover:border-cyan-500 transition">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-6 h-6 text-cyan-400" />
              <h3 className="text-xl font-semibold">Cyber Security Consultant</h3>
            </div>
            <p className="text-gray-400 mb-2">ProksiAbel OÜ</p>
            <p className="text-gray-300">
              Partnering with organizations to strengthen their defenses against sophisticated cyber threats,
              specializing in MITM attack prevention and digital asset protection.
            </p>
          </div>

          <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 hover:border-cyan-500 transition">
            <div className="flex items-center gap-3 mb-4">
              <Code className="w-6 h-6 text-cyan-400" />
              <h3 className="text-xl font-semibold">Hacker Tools Developer</h3>
            </div>
            <p className="text-gray-400 mb-2">Self-employed</p>
            <p className="text-gray-300">
              Developed open-source security tools and advanced techniques for identifying vulnerabilities,
              contributing to improved security standards across major platforms.
            </p>
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div className="bg-gray-800/50 py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Core Competencies</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6">
              <Server className="w-12 h-12 text-cyan-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Information Security</h3>
              <p className="text-gray-400">Expert consulting in cybersecurity infrastructure and threat prevention</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6">
              <Zap className="w-12 h-12 text-cyan-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Software Development</h3>
              <p className="text-gray-400">Full-stack development with focus on security-first architecture</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6">
              <Globe className="w-12 h-12 text-cyan-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Security Research</h3>
              <p className="text-gray-400">Advanced persistent threat analysis and defense strategy development</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;