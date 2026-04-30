import React from 'react';
import { MapPin, Bus, Train, Coffee, ShoppingBag, School, Briefcase } from 'lucide-react';

const Location: React.FC = () => {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Location</h2>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="h-[400px] bg-gray-200 relative">
          {/* This would be replaced with an actual map integration */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-10 h-10 text-blue-900 mx-auto mb-2" />
              <p className="text-gray-800 font-medium px-4">
                Plot-22, Sector 11, Nerul, Thane, Navi Mumbai, 400706
              </p>
              <p className="text-sm text-gray-600 mt-2">Map integration would be here</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Transportation
          </h3>
          
          <ul className="space-y-4">
            <li className="flex items-start">
              <div className="bg-blue-50 p-2 rounded-full mr-3">
                <Train className="w-5 h-5 text-blue-900" />
              </div>
              <div>
                <span className="block font-medium text-gray-900">Metro Station</span>
                <span className="text-sm text-gray-600">0.2 miles - 5 min walk</span>
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-blue-50 p-2 rounded-full mr-3">
                <Bus className="w-5 h-5 text-blue-900" />
              </div>
              <div>
                <span className="block font-medium text-gray-900">Bus Stop</span>
                <span className="text-sm text-gray-600">0.1 miles - 2 min walk</span>
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-blue-50 p-2 rounded-full mr-3">
                <Train className="w-5 h-5 text-blue-900" />
              </div>
              <div>
                <span className="block font-medium text-gray-900">Train Station</span>
                <span className="text-sm text-gray-600">1.5 miles - 10 min drive</span>
              </div>
            </li>
          </ul>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Nearby Amenities
          </h3>
          
          <ul className="space-y-4">
            <li className="flex items-start">
              <div className="bg-blue-50 p-2 rounded-full mr-3">
                <Coffee className="w-5 h-5 text-blue-900" />
              </div>
              <div>
                <span className="block font-medium text-gray-900">Cafes & Restaurants</span>
                <span className="text-sm text-gray-600">Multiple options within 0.2 miles</span>
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-blue-50 p-2 rounded-full mr-3">
                <ShoppingBag className="w-5 h-5 text-blue-900" />
              </div>
              <div>
                <span className="block font-medium text-gray-900">Shopping</span>
                <span className="text-sm text-gray-600">Luxury mall 0.5 miles away</span>
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-blue-50 p-2 rounded-full mr-3">
                <School className="w-5 h-5 text-blue-900" />
              </div>
              <div>
                <span className="block font-medium text-gray-900">Schools & Universities</span>
                <span className="text-sm text-gray-600">Top-rated schools within district</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Neighborhood Highlights
        </h3>
        
        <p className="text-gray-600 mb-6">
          Moraj Silent Valley is located at Plot-22, Sector 11, Nerul — a well-established part of Navi Mumbai with strong rail and road links, everyday conveniences nearby, and a calmer residential pace while staying within reach of Thane and Mumbai.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <div className="bg-blue-50 p-3 rounded-full inline-flex mb-2">
              <Briefcase className="w-5 h-5 text-blue-900" />
            </div>
            <h4 className="text-sm font-medium text-gray-900">Business District</h4>
            <p className="text-xs text-gray-600">1.2 miles</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <div className="bg-blue-50 p-3 rounded-full inline-flex mb-2">
              <ShoppingBag className="w-5 h-5 text-blue-900" />
            </div>
            <h4 className="text-sm font-medium text-gray-900">Shopping District</h4>
            <p className="text-xs text-gray-600">0.5 miles</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <div className="bg-blue-50 p-3 rounded-full inline-flex mb-2">
              <Coffee className="w-5 h-5 text-blue-900" />
            </div>
            <h4 className="text-sm font-medium text-gray-900">Restaurant Row</h4>
            <p className="text-xs text-gray-600">0.3 miles</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <div className="bg-blue-50 p-3 rounded-full inline-flex mb-2">
              <MapPin className="w-5 h-5 text-blue-900" />
            </div>
            <h4 className="text-sm font-medium text-gray-900">City Park</h4>
            <p className="text-xs text-gray-600">0.7 miles</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Location;