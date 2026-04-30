import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Check, ArrowRight, Home, Map, LayoutGrid, Video, Image as Image360 } from 'lucide-react';

import ModelViewer from '../components/shared/ModelViewer';
import PropertySpecs from '../components/property/PropertySpecs';
import FloorPlanSelector from '../components/property/FloorPlanSelector';
import Amenities from '../components/property/Amenities';
import Location from '../components/property/Location';
import LeadForm from '../components/forms/LeadForm';

const PropertyDetailsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [activeView, setActiveView] = useState<string>('apartment');
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const viewOptions = [
    { id: 'apartment', label: 'Apartment Tour', icon: <Home className="w-4 h-4" /> },
    { id: 'penthouse', label: 'Penthouse Tour', icon: <Image360 className="w-4 h-4" /> },
    { id: 'lobby', label: 'Lobby View', icon: <Video className="w-4 h-4" /> },
    { id: 'exterior', label: 'Exterior View', icon: <Home className="w-4 h-4" /> },
  ];

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
            Moraj Silent Valley
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-blue-100 max-w-3xl mx-auto"
          >
            Discover an unparalleled living experience in the heart of the city
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-wrap overflow-x-auto no-scrollbar mb-8 border-b">
          <TabButton 
            active={activeTab === 'overview'} 
            onClick={() => setActiveTab('overview')}
            icon={<Home className="w-4 h-4 mr-2" />}
            label="Overview"
          />
          <TabButton 
            active={activeTab === 'floorplans'} 
            onClick={() => setActiveTab('floorplans')}
            icon={<LayoutGrid className="w-4 h-4 mr-2" />}
            label="Floor Plans"
          />
          <TabButton 
            active={activeTab === 'location'} 
            onClick={() => setActiveTab('location')}
            icon={<Map className="w-4 h-4 mr-2" />}
            label="Location"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {activeTab === 'overview' && (
              <div>
                <div className="bg-white rounded-xl overflow-hidden shadow-lg mb-8">
                  <div className="flex flex-wrap gap-2 p-4 bg-gray-50 border-b">
                    {viewOptions.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => setActiveView(option.id)}
                        className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          activeView === option.id
                            ? 'bg-blue-900 text-white'
                            : 'bg-white text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <span className="mr-2">{option.icon}</span>
                        {option.label}
                      </button>
                    ))}
                  </div>
                  <div className="h-[500px]">
                    <ModelViewer />
                  </div>
                </div>

                <PropertySpecs />
                <Amenities />
              </div>
            )}

            {activeTab === 'floorplans' && (
              <FloorPlanSelector />
            )}

            {activeTab === 'location' && (
              <Location />
            )}
          </div>

          <div ref={ref} className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.5 }}
              className="bg-white shadow-lg rounded-lg sticky top-24"
            >
              <div className="p-6 border-b">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Interested in Moraj Silent Valley?</h3>
                <p className="text-gray-600">Fill out the form below and our team will contact you shortly.</p>
              </div>
              <div className="p-6">
                <LeadForm />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TabButton: React.FC<{
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}> = ({ active, onClick, icon, label }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center py-4 px-6 text-sm font-medium transition-all duration-200 border-b-2 whitespace-nowrap ${
        active 
          ? 'text-blue-900 border-blue-900' 
          : 'text-gray-500 border-transparent hover:text-blue-800 hover:border-blue-300'
      }`}
    >
      {icon}
      {label}
    </button>
  );
};

export default PropertyDetailsPage;