import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { colors } from '../../styles/theme';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = ['home', 'about', 'property', 'services', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'property', label: 'Residences' },
    { id: 'services', label: 'Services' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'bg-white/95 backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <motion.a 
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('home');
              }}
              className={`inline-flex items-center gap-3 text-2xl font-light tracking-wide ${
                isScrolled ? 'text-black' : 'text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img
                src="https://d1gzjhm4khhl9p.cloudfront.net/Logo/Moraj_Logo_Website.png"
                alt="Moraj logo"
                className="h-10 w-auto object-contain"
                loading="eager"
              />
              Silent Valley
            </motion.a>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-12">
              {navItems.map(({ id, label }) => (
                <motion.a
                  key={id}
                  href={`#${id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(id);
                  }}
                  className={`relative text-sm font-light tracking-wide transition-colors duration-300 ${
                    isScrolled
                      ? activeSection === id 
                        ? 'text-black' 
                        : 'text-gray-600 hover:text-black'
                      : activeSection === id
                        ? 'text-white'
                        : 'text-white/80 hover:text-white'
                  }`}
                  whileHover={{ y: -2 }}
                >
                  {label}
                  {activeSection === id && (
                    <motion.div
                      className={`absolute -bottom-1 left-0 right-0 h-px ${
                        isScrolled ? 'bg-black' : 'bg-white'
                      }`}
                      layoutId="activeSection"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden relative z-50 w-6 h-6 flex flex-col justify-center items-center"
            >
              <span className={`block w-6 h-px transition-all duration-300 ${
                isScrolled ? 'bg-black' : 'bg-white'
              } ${isMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-1'}`} />
              <span className={`block w-6 h-px transition-all duration-300 ${
                isScrolled ? 'bg-black' : 'bg-white'
              } ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
              <span className={`block w-6 h-px transition-all duration-300 ${
                isScrolled ? 'bg-black' : 'bg-white'
              } ${isMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-1'}`} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/95 backdrop-blur-sm" />
            <motion.div
              initial={{ y: '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ type: 'tween', duration: 0.4 }}
              className="relative h-full flex flex-col justify-center items-center"
            >
              <div className="space-y-8">
                {navItems.map(({ id, label }, index) => (
                  <motion.a
                    key={id}
                    href={`#${id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(id);
                    }}
                    className="block text-3xl font-light text-white hover:text-white/70 transition-colors"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                  >
                    {label}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;