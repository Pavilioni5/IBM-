import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Architecture from './components/Architecture';
import Installation from './components/Installation';
import ProjectStructure from './components/ProjectStructure';
import YAMLExplorer from './components/YAMLExplorer';
import CommandsTable from './components/CommandsTable';
import LiveDemo from './components/LiveDemo';
import Gallery from './components/Gallery';
import Documentation from './components/Documentation';
import Footer from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'home',
        'about',
        'architecture',
        'installation',
        'structure',
        'yaml',
        'commands',
        'demo',
        'gallery',
        'documentation'
      ];
      
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 font-sans selection:bg-blue-600 selection:text-white">
      
      {/* Sticky Top Navbar */}
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* Main Content Sections */}
      <main>
        <Hero setActiveSection={setActiveSection} />
        <About />
        <Architecture />
        <Installation />
        <ProjectStructure />
        <YAMLExplorer />
        <CommandsTable />
        <LiveDemo />
        <Gallery />
        <Documentation />
      </main>

      {/* Footer */}
      <Footer setActiveSection={setActiveSection} />

    </div>
  );
}
