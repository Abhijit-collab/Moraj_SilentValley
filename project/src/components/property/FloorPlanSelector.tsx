import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FloorPlanSelector: React.FC = () => {
  const [activeUnit, setActiveUnit] = useState<string>('1br');
  
  const floorPlans = [
    { id: '1br', name: '1 Bedroom', area: '800-1,000 sq ft', price: 'From $850,000' },
    { id: '2br', name: '2 Bedroom', area: '1,200-1,500 sq ft', price: 'From $1,200,000' },
    { id: '3br', name: '3 Bedroom', area: '1,800-2,200 sq ft', price: 'From $1,850,000' },
    { id: 'penthouse', name: 'Penthouse', area: '2,500-2,800 sq ft', price: 'From $3,200,000' },
  ];
  
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Floor Plans</h2>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-wrap space-x-2 mb-8">
          {floorPlans.map(plan => (
            <button
              key={plan.id}
              onClick={() => setActiveUnit(plan.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 mb-2 ${
                activeUnit === plan.id
                  ? 'bg-blue-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {plan.name}
            </button>
          ))}
        </div>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={activeUnit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <FloorPlanDetails 
              unitType={activeUnit}
              floorPlan={floorPlans.find(p => p.id === activeUnit)!}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

interface FloorPlanDetailsProps {
  unitType: string;
  floorPlan: {
    id: string;
    name: string;
    area: string;
    price: string;
  };
}

const FloorPlanDetails: React.FC<FloorPlanDetailsProps> = ({ unitType, floorPlan }) => {
  // Placeholder images for different floor plans
  const getFloorPlanImage = (type: string) => {
    switch(type) {
      case '1br':
        return 'https://images.pexels.com/photos/5524165/pexels-photo-5524165.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';
      case '2br':
        return 'https://images.pexels.com/photos/4846097/pexels-photo-4846097.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';
      case '3br':
        return 'https://images.pexels.com/photos/4846461/pexels-photo-4846461.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';
      case 'penthouse':
        return 'https://images.pexels.com/photos/4258282/pexels-photo-4258282.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';
      default:
        return 'https://images.pexels.com/photos/5524165/pexels-photo-5524165.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';
    }
  };

  // Get unit features based on type
  const getUnitFeatures = (type: string) => {
    const baseFeatures = [
      'Premium finishes throughout',
      'Floor-to-ceiling windows',
      'Smart home technology',
      'Energy-efficient appliances',
    ];
    
    switch(type) {
      case '1br':
        return [
          ...baseFeatures,
          '1 full bathroom',
          'Gourmet kitchen',
          'Walk-in closet',
        ];
      case '2br':
        return [
          ...baseFeatures,
          '2 full bathrooms',
          'Primary suite with en-suite bath',
          'Spacious balcony',
          'Separate dining area',
        ];
      case '3br':
        return [
          ...baseFeatures,
          '2.5 bathrooms',
          'Corner unit with dual exposures',
          'Chef\'s kitchen with island',
          'Primary suite with walk-in closet',
          'Private terrace',
        ];
      case 'penthouse':
        return [
          ...baseFeatures,
          '3.5 bathrooms',
          'Panoramic city views',
          'Private elevator access',
          'Custom Italian kitchen',
          'Dual primary suites',
          'Expansive outdoor terrace',
        ];
      default:
        return baseFeatures;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <div className="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden mb-4">
          <img 
            src={getFloorPlanImage(unitType)}
            alt={`${floorPlan.name} floor plan`}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-sm text-gray-500 mb-1">Area</h4>
            <p className="font-semibold">{floorPlan.area}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-sm text-gray-500 mb-1">Price</h4>
            <p className="font-semibold">{floorPlan.price}</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          {floorPlan.name} Details
        </h3>
        
        <div className="mb-6">
          <h4 className="text-base font-medium text-gray-800 mb-3">Features:</h4>
          <ul className="space-y-2">
            {getUnitFeatures(unitType).map((feature, index) => (
              <li key={index} className="flex items-start">
                <span className="bg-blue-900 rounded-full p-1 mr-3 mt-1">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                  </svg>
                </span>
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <button className="w-full px-6 py-3 bg-blue-900 text-white font-medium rounded-lg hover:bg-blue-800 transition-colors duration-200">
          Request More Information
        </button>
      </div>
    </div>
  );
};

export default FloorPlanSelector;