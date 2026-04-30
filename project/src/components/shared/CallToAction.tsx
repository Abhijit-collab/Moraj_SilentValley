import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { colors, transitions } from '../../styles/theme';

interface CallToActionProps {
  title: string;
  description: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
}

const CallToAction: React.FC<CallToActionProps> = ({
  title,
  description,
  primaryButtonText,
  primaryButtonLink,
  secondaryButtonText,
  secondaryButtonLink,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 text-center">
      <div 
        className="p-12 md:p-16 rounded-2xl relative overflow-hidden"
        style={{
          background: colors.gradients.card,
        }}
      >
        <div className="relative z-10">
          <h2 className="text-4xl md:text-5xl font-light mb-6">{title}</h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-12 leading-relaxed">
            {description}
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <Link
              to={primaryButtonLink}
              className="inline-flex items-center px-12 py-5 text-lg bg-white text-black hover:bg-white/90 transition-all duration-500"
            >
              {primaryButtonText}
              <ArrowRight className="ml-3 w-5 h-5" />
            </Link>
            
            {secondaryButtonText && secondaryButtonLink && (
              <Link
                to={secondaryButtonLink}
                className="inline-flex items-center px-12 py-5 text-lg text-white border border-white/30 hover:bg-white hover:text-black transition-all duration-500"
              >
                {secondaryButtonText}
                <ArrowRight className="ml-3 w-5 h-5" />
              </Link>
            )}
          </div>
        </div>

        {/* Gradient overlay effect */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100"
          style={{ transition: transitions.slow }}
        />
      </div>
    </div>
  );
};

export default CallToAction;