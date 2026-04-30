import React from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-light mb-6">Moraj Silent Valley</h3>
              <p className="text-gray-400 font-light leading-relaxed max-w-md mb-8">
                Experience luxury living redefined with our premium condominiums 
                featuring world-class amenities and breathtaking views.
              </p>
              <div className="w-16 h-px bg-white/20" />
            </motion.div>
          </div>

          {/* Contact */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-light mb-6">Contact</h4>
              <ul className="space-y-3 text-gray-400 font-light">
                <li>Plot-22, Sector 11, Nerul, Navi Mumbai, 400706</li>
                <li>sales@morajinfratech.com</li>
              </ul>
            </motion.div>
          </div>

          {/* Hours */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-light mb-6">Hours</h4>
              <ul className="space-y-3 text-gray-400 font-light">
                <li className="whitespace-nowrap">Monday - Sunday: 10:30 AM - 7:00 PM</li>
              </ul>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="border-t border-gray-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="text-center md:text-left">
            <p className="text-gray-400 text-sm font-light">
              © {new Date().getFullYear()} Moraj Silent Valley. All rights reserved.
            </p>
            <p className="text-gray-500 text-xs font-light mt-2 tracking-wide">
              Project registration number: <span className="text-gray-400 tabular-nums">PM1330002502535</span>
            </p>
          </div>
          <div className="flex space-x-8 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white text-sm font-light transition-colors">
              Privacy
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm font-light transition-colors">
              Terms
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;