import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

import LeadForm from '../components/forms/LeadForm';

const ContactPage: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl font-bold text-white mb-4"
          >
            Contact Us
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-blue-100 max-w-3xl mx-auto"
          >
            Get in touch with our sales team to learn more about Moraj Silent Valley
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Contact Information
            </h2>
            
            <div className="space-y-8">
              <ContactInfo 
                icon={<Mail className="w-6 h-6 text-blue-900" />}
                title="Email"
                details={['info@morajsilentvalley.com', 'sales@marinaheights.com']}
              />
              
              <ContactInfo 
                icon={<MapPin className="w-6 h-6 text-blue-900" />}
                title="Address"
                details={['Plot-22, Sector 11, Nerul, Thane, Navi Mumbai, 400706']}
              />
              
              <ContactInfo 
                icon={<Clock className="w-6 h-6 text-blue-900" />}
                title="Sales Office Hours"
                details={[
                  'Monday - Friday: 9:00 AM - 6:00 PM',
                  'Saturday: 10:00 AM - 4:00 PM',
                  'Sunday: Closed'
                ]}
              />
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white shadow-lg rounded-lg p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Schedule a Tour
            </h2>
            <p className="text-gray-600 mb-8">
              Fill out the form below to schedule a virtual tour or to speak with our sales team about Moraj Silent Valley.
            </p>
            
            <LeadForm showTourOption={true} />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const ContactInfo: React.FC<{
  icon: React.ReactNode;
  title: string;
  details: string[];
}> = ({ icon, title, details }) => {
  return (
    <div className="flex items-start">
      <div className="bg-blue-50 p-3 rounded-full mr-4">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        {details.map((detail, index) => (
          <p key={index} className="text-gray-600">{detail}</p>
        ))}
      </div>
    </div>
  );
};

export default ContactPage;