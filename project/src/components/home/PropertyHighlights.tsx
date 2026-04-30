import React from 'react';
import AnimatedSection, { AnimatedItem } from '../shared/AnimatedSection';
import { colors } from '../../styles/theme';

const PropertyHighlights: React.FC = () => {
  const highlights = [
    { value: '3.0', unit: 'km', description: 'to city center' },
    { value: '0.5', unit: 'km', description: 'to shops and bus stops' },
    { value: '0.3', unit: 'km', description: 'to forests and parks' },
    { value: '147', unit: 'm²', description: 'living space' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
      <AnimatedSection className="text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-light mb-6">Location Highlights</h2>
        <p className="text-lg text-white/70 max-w-3xl mx-auto leading-relaxed">
          Perfectly positioned for modern urban living, with nature and amenities at your doorstep.
        </p>
      </AnimatedSection>

      <AnimatedSection animation="stagger" className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-32">
        {highlights.map((highlight, index) => (
          <AnimatedItem key={index}>
            <div 
              className="group p-8 rounded-lg relative overflow-hidden hover:transform hover:scale-[1.02] transition-all duration-500"
              style={{
                background: colors.gradients.feature,
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)'
              }}
            >
              <div className="relative z-10">
                <p className="text-5xl md:text-6xl font-light mb-3">{highlight.value}</p>
                <p className="text-xl text-white/90 mb-2">{highlight.unit}</p>
                <p className="text-sm text-white/60">{highlight.description}</p>
              </div>
              <div 
                className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
            </div>
          </AnimatedItem>
        ))}
      </AnimatedSection>

      <AnimatedSection delay={0.2} className="relative">
        <div 
          className="aspect-video rounded-xl overflow-hidden relative shadow-2xl"
          style={{
            background: colors.gradients.feature,
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.2)'
          }}
        >
          <iframe
            src="https://maps.google.com/maps?q=Plot-22%2C+Sector+11%2C+Nerul%2C+Navi+Mumbai+400706&hl=en&z=15&output=embed"
            title="Moraj Silent Valley — Plot-22, Sector 11, Nerul"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          />
          <div 
            className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/50 to-transparent"
          />
        </div>
      </AnimatedSection>
    </div>
  );
};

export default PropertyHighlights;