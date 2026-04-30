import React from 'react';
import { Link } from 'react-router-dom';
import { Home, MapPin, Calendar, Star, Award, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

import Hero from '../components/home/Hero';
import PropertyHighlights from '../components/home/PropertyHighlights';
import FeatureSection from '../components/home/FeatureSection';
import ModelViewer from '../components/shared/ModelViewer';
import CallToAction from '../components/shared/CallToAction';
import AnimatedSection, { AnimatedItem } from '../components/shared/AnimatedSection';
import { colors, transitions } from '../styles/theme';

const HomePage: React.FC = () => {
  return (
    <div className="relative">
      {/* Background Pattern Overlay */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse" />
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '4s' }} />
        </div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50" />
      </div>

      {/* Hero Section */}
      <section className="relative z-10">
        <Hero 
          title="Moraj Silent Valley"
          subtitle="A quiet place in a great neighborhood. Enjoy unlimited nature and the charms of city life."
        />
      </section>
      
      {/* Stats Section - New */}
      <section className="relative z-10 py-16 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <motion.div 
              className="text-center text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-3xl md:text-4xl font-bold mb-2">156</div>
              <div className="text-sm md:text-base opacity-90">Luxury Residences</div>
            </motion.div>
            <motion.div 
              className="text-center text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="text-3xl md:text-4xl font-bold mb-2">24</div>
              <div className="text-sm md:text-base opacity-90">Floors</div>
            </motion.div>
            <motion.div 
              className="text-center text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="text-3xl md:text-4xl font-bold mb-2">5★</div>
              <div className="text-sm md:text-base opacity-90">Luxury Rating</div>
            </motion.div>
            <motion.div 
              className="text-center text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="text-3xl md:text-4xl font-bold mb-2">2024</div>
              <div className="text-sm md:text-base opacity-90">Completion</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Model Viewer Section - Enhanced */}
      <section className="relative z-10 py-32 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%22100%22%20height%3D%22100%22%20viewBox%3D%220%200%20100%20100%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M11%2018c3.866%200%207-3.134%207-7s-3.134-7-7-7-7%203.134-7%207%203.134%207%207%207zm48%2025c3.866%200%207-3.134%207-7s-3.134-7-7-7-7%203.134-7%207%203.134%207%207%207zm-43-7c1.657%200%203-1.343%203-3s-1.343-3-3-3-3%201.343-3%203%201.343%203%203%203zm63%2031c1.657%200%203-1.343%203-3s-1.343-3-3-3-3%201.343-3%203%201.343%203%203%203zM34%2090c1.657%200%203-1.343%203-3s-1.343-3-3-3-3%201.343-3%203%201.343%203%203%203zm56-76c1.657%200%203-1.343%203-3s-1.343-3-3-3-3%201.343-3%203%201.343%203%203%203zM12%2086c2.21%200%204-1.79%204-4s-1.79-4-4-4-4%201.79-4%204%201.79%204%204%204zm28-65c2.21%200%204-1.79%204-4s-1.79-4-4-4-4%201.79-4%204%201.79%204%204%204zm23-11c2.76%200%205-2.24%205-5s-2.24-5-5-5-5%202.24-5%205%202.24%205%205%205zm-6%2060c2.21%200%204-1.79%204-4s-1.79-4-4-4-4%201.79-4%204%201.79%204%204%204zm29%2022c2.76%200%205-2.24%205-5s-2.24-5-5-5-5%202.24-5%205%202.24%205%205%205zM32%2063c2.76%200%205-2.24%205-5s-2.24-5-5-5-5%202.24-5%205%202.24%205%205%205zm57-13c2.76%200%205-2.24%205-5s-2.24-5-5-5-5%202.24-5%205%202.24%205%205%205zm-9-21c1.105%200%202-.895%202-2s-.895-2-2-2-2%20.895-2%202%20.895%202%202%202zM60%2091c1.105%200%202-.895%202-2s-.895-2-2-2-2%20.895-2%202%20.895%202%202%202zM35%2041c1.105%200%202-.895%202-2s-.895-2-2-2-2%20.895-2%202%20.895%202%202%202zM12%2060c1.105%200%202-.895%202-2s-.895-2-2-2-2%20.895-2%202%20.895%202%202%202z%22%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22/%3E%3C/svg%3E')] opacity-30" />
        <AnimatedSection className="px-4 md:px-8 lg:px-16 max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl md:text-5xl font-light mb-6 text-white"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Experience Your Future Home
            </motion.h2>
            <motion.p 
              className="text-lg text-white/80 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Step inside Moraj Silent Valley with our interactive 3D experience. Explore every detail of your potential home before making it yours.
            </motion.p>
          </div>

          <motion.div 
            className="relative bg-black/30 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl h-[600px] mb-24 border border-white/10"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent z-10" />
            <ModelViewer />
          </motion.div>
        </AnimatedSection>
      </section>

      {/* Features Section - Enhanced */}
      <section className="relative z-10 py-32 bg-gradient-to-br from-white via-blue-50 to-purple-50">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22%23000000%22%20fill-opacity%3D%220.02%22%3E%3Cpath%20d%3D%22M20%2020c0%2011.046-8.954%2020-20%2020s-20-8.954-20-20%208.954-20%2020-20%2020%208.954%2020%2020zm0%200c0%2011.046%208.954%2020%2020%2020s20-8.954%2020-20-8.954-20-20-20-20%208.954-20%2020z%22/%3E%3C/g%3E%3C/svg%3E')]" />
        <AnimatedSection className="px-4 md:px-8 lg:px-16 max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl md:text-5xl font-light mb-6 text-gray-900"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Premium Features
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Experience unparalleled luxury and comfort in every detail.
            </motion.p>
          </div>
          <AnimatedSection animation="stagger" className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatedItem>
              <EnhancedFeatureCard 
                icon={<Home className="w-8 h-8 text-blue-600" />}
                title="Premium Finishes"
                description="Luxury finishes and premium materials throughout every residence."
                gradient="from-blue-500 to-blue-600"
              />
            </AnimatedItem>
            <AnimatedItem>
              <EnhancedFeatureCard 
                icon={<MapPin className="w-8 h-8 text-purple-600" />}
                title="Prime Location"
                description="Located in the heart of the city with easy access to all amenities."
                gradient="from-purple-500 to-purple-600"
              />
            </AnimatedItem>
            <AnimatedItem>
              <EnhancedFeatureCard 
                icon={<Calendar className="w-8 h-8 text-green-600" />}
                title="Move-in Ready"
                description="Select units available for immediate occupancy."
                gradient="from-green-500 to-green-600"
              />
            </AnimatedItem>
          </AnimatedSection>
        </AnimatedSection>
      </section>

      {/* Awards Section - New */}
      <section className="relative z-10 py-20 bg-gradient-to-r from-gray-100 to-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl md:text-3xl font-light text-gray-800 mb-4">Award-Winning Excellence</h3>
            <p className="text-gray-600">Recognized for outstanding design and quality</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: <Award className="w-8 h-8" />, text: "Best Luxury Project 2024" },
              { icon: <Star className="w-8 h-8" />, text: "5-Star Design Rating" },
              { icon: <Shield className="w-8 h-8" />, text: "Quality Assurance Certified" },
              { icon: <Award className="w-8 h-8" />, text: "Green Building Award" }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="text-blue-600 mb-3 flex justify-center">{item.icon}</div>
                <p className="text-sm text-gray-700 font-medium">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Property Highlights - Enhanced */}
      <section className="relative z-10 py-32 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
        <AnimatedSection className="relative z-10">
          <PropertyHighlights />
        </AnimatedSection>
      </section>

      {/* Call to Action - Enhanced */}
      <section className="relative z-10 py-32 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%22100%22%20height%3D%22100%22%20viewBox%3D%220%200%20100%20100%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M11%2018c3.866%200%207-3.134%207-7s-3.134-7-7-7-7%203.134-7%207%203.134%207%207%207zm48%2025c3.866%200%207-3.134%207-7s-3.134-7-7-7-7%203.134-7%207%203.134%207%207%207zm-43-7c1.657%200%203-1.343%203-3s-1.343-3-3-3-3%201.343-3%203%201.343%203%203%203zm63%2031c1.657%200%203-1.343%203-3s-1.343-3-3-3-3%201.343-3%203%201.343%203%203%203zM34%2090c1.657%200%203-1.343%203-3s-1.343-3-3-3-3%201.343-3%203%201.343%203%203%203zm56-76c1.657%200%203-1.343%203-3s-1.343-3-3-3-3%201.343-3%203%201.343%203%203%203zM12%2086c2.21%200%204-1.79%204-4s-1.79-4-4-4-4%201.79-4%204%201.79%204%204%204zm28-65c2.21%200%204-1.79%204-4s-1.79-4-4-4-4%201.79-4%204%201.79%204%204%204zm23-11c2.76%200%205-2.24%205-5s-2.24-5-5-5-5%202.24-5%205%202.24%205%205%205zm-6%2060c2.21%200%204-1.79%204-4s-1.79-4-4-4-4%201.79-4%204%201.79%204%204%204zm29%2022c2.76%200%205-2.24%205-5s-2.24-5-5-5-5%202.24-5%205%202.24%205%205%205zM32%2063c2.76%200%205-2.24%205-5s-2.24-5-5-5-5%202.24-5%205%202.24%205%205%205zm57-13c2.76%200%205-2.24%205-5s-2.24-5-5-5-5%202.24-5%205%202.24%205%205%205zm-9-21c1.105%200%202-.895%202-2s-.895-2-2-2-2%20.895-2%202%20.895%202%202%202zM60%2091c1.105%200%202-.895%202-2s-.895-2-2-2-2%20.895-2%202%20.895%202%202%202zM35%2041c1.105%200%202-.895%202-2s-.895-2-2-2-2%20.895-2%202%20.895%202%202%202zM12%2060c1.105%200%202-.895%202-2s-.895-2-2-2-2%20.895-2%202%20.895%202%202%202z%22%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22/%3E%3C/svg%3E')] opacity-30" />
        <AnimatedSection className="relative z-10">
          <CallToAction 
            title="Ready to Experience Moraj Silent Valley?"
            description="Schedule a virtual tour or speak with our sales team today."
            primaryButtonText="Schedule Tour"
            primaryButtonLink="/contact"
            secondaryButtonText="View Property Details"
            secondaryButtonLink="/property"
          />
        </AnimatedSection>
      </section>
    </div>
  );
};

const EnhancedFeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
}> = ({ icon, title, description, gradient }) => {
  return (
    <motion.div 
      className="group p-8 rounded-2xl relative overflow-hidden transition-all duration-500 hover:transform hover:scale-[1.02] bg-white shadow-lg hover:shadow-2xl border border-gray-100"
      whileHover={{ y: -5 }}
    >
      {/* Gradient Background on Hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      
      {/* Content */}
      <div className="relative z-10">
        <div className="mb-6 group-hover:text-white transition-colors duration-500">{icon}</div>
        <h3 className="text-2xl font-light mb-4 text-gray-900 group-hover:text-white transition-colors duration-500">{title}</h3>
        <p className="text-gray-600 group-hover:text-white/90 leading-relaxed transition-colors duration-500">{description}</p>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
      <div className="absolute bottom-4 left-4 w-8 h-8 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
    </motion.div>
  );
};

export default HomePage;