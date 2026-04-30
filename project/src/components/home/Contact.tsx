import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, MapPin, Sparkles } from 'lucide-react';
import LeadForm from '../forms/LeadForm';

const Contact: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [showBrochureNotice, setShowBrochureNotice] = useState(false);

  return (
    <section ref={ref} className="py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="w-16 h-px bg-black mx-auto mb-8"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          
          <h2 className="text-4xl md:text-5xl font-light text-black mb-6">
            Begin Your
            <br />
            <span className="font-normal">Journey</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
            Connect with our team to discover how Moraj Silent Valley can become 
            your new home
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-2xl font-light text-black mb-12">Get in touch</h3>
            
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-black flex items-center justify-center mr-6">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-black font-light mb-1">Email</div>
                  <div className="text-gray-600 font-light">sales@morajinfratech.com</div>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 bg-black flex items-center justify-center mr-6">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-black font-light mb-1">Location</div>
                  <div className="text-gray-600 font-light">
                    Plot-22, Sector 11, Nerul, Navi Mumbai, 400706
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-16">
              <h4 className="text-lg font-light text-black mb-6">Visit our sales office</h4>
              <div className="space-y-2 text-gray-600 font-light">
                <p>Monday - Sunday: 10:30 AM - 7:00 PM</p>
              </div>
              <button
                type="button"
                onClick={() => setShowBrochureNotice(true)}
                className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded hover:bg-gray-800 transition-colors font-light text-base shadow"
                aria-expanded={showBrochureNotice}
              >
                <Sparkles className="w-4 h-4 opacity-80" aria-hidden />
                Request a Brochure
              </button>

              <AnimatePresence>
                {showBrochureNotice && (
                  <motion.div
                    role="status"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-6 max-w-md border border-stone-200 bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 p-6 text-white shadow-xl"
                  >
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-amber-200/90 mb-3">
                      Almost there
                    </p>
                    <p className="text-lg font-light leading-relaxed text-white/95">
                      Our digital brochure is still getting its final polish — good things, no rush. Use the form
                      beside this and we&apos;ll send it the moment it goes live.
                    </p>
                    <button
                      type="button"
                      onClick={() => setShowBrochureNotice(false)}
                      className="mt-5 text-sm font-light text-white/70 underline-offset-4 hover:text-white hover:underline"
                    >
                      Got it
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white p-12 shadow-lg"
          >
            <h3 className="text-2xl font-light text-black mb-8">Schedule a visit</h3>
            <LeadForm showTourOption={true} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;