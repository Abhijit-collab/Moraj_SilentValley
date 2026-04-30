import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { colors } from '../../styles/theme';

interface HeroProps {
  title: string;
  subtitle: string;
}

const Hero: React.FC<HeroProps> = ({ title, subtitle }) => {
  const [videoError, setVideoError] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const heroFallbackImage = 'https://d1gzjhm4khhl9p.cloudfront.net/Exterior/Moraj_SV_Ext_05_TopView_Front.png';

  const handleVideoError = () => {
    console.log('Video failed to load, using fallback image');
    setVideoError(true);
  };

  return (
    <div className="relative min-h-screen">
      {/* Background Video/Image with Gradients */}
      <div className="absolute inset-0 z-0">
        {!videoError && (
          <img
            src={heroFallbackImage}
            alt=""
            className={`absolute inset-0 w-full h-full object-cover will-change-opacity transition-opacity duration-700 ease-out ${
              videoReady ? 'opacity-0' : 'opacity-60'
            }`}
          />
        )}

        {!videoError ? (
          // Desktop Video Background (screens wider than 768px)
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            onError={handleVideoError}
            onLoadedMetadata={() => setVideoReady(true)}
            onCanPlay={() => setVideoReady(true)}
            disablePictureInPicture
            className="w-full h-full object-cover hidden md:block opacity-48"
            style={{ objectPosition: 'center' }}
          >
            <source src="https://d1gzjhm4khhl9p.cloudfront.net/HeroVideo/Website_SV1.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          // Image Background (fallback)
          <div 
            className="w-full h-full hidden md:block"
            style={{
              backgroundImage: `url(${heroFallbackImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundAttachment: 'fixed'
            }}
          />
        )}

        {/* Mobile Video Background (screens 768px or smaller) */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onError={handleVideoError}
          onLoadedMetadata={() => setVideoReady(true)}
          onCanPlay={() => setVideoReady(true)}
          disablePictureInPicture
          className="w-full h-full object-cover block md:hidden opacity-52"
          style={{ objectPosition: 'center' }}
        >
          <source src="https://d1gzjhm4khhl9p.cloudfront.net/HeroVideo/Website_SV1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Primary Gradient Overlay */}
        <div className="absolute inset-0 opacity-95" style={{ background: colors.gradients.hero }} />
        
        {/* Secondary Gradient Overlay for extra text protection */}
        <div className="absolute inset-0 opacity-90" style={{ background: colors.gradients.heroOverlay }} />
        
        {/* Extra dark tint to keep text dominant */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center items-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-6xl md:text-8xl font-light mb-8 text-white [text-shadow:_0_6px_18px_rgba(0,0,0,0.55)]"
          >
            {title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-xl md:text-2xl text-white font-light mb-16 max-w-2xl mx-auto leading-relaxed [text-shadow:_0_4px_14px_rgba(0,0,0,0.45)]"
          >
            {subtitle}
          </motion.p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-[1px] h-24 bg-white/20 relative overflow-hidden">
            <motion.div
              className="w-full h-1/3 bg-white absolute top-0"
              animate={{
                y: [0, 48, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        </motion.div>

        {/* Bottom Info Container */}
        <div className="absolute bottom-4 sm:bottom-8 left-0 right-0 flex flex-col sm:flex-row justify-between items-center px-4 sm:px-12 gap-12 sm:gap-0">
          {/* Location Tag */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="text-white text-center sm:text-left"
          >
            <p className="text-xl md:text-2xl font-light tracking-wider [text-shadow:_0_1px_3px_rgba(0,0,0,0.3)]">
              Moraj Silent Valley
            </p>
            <div className="w-12 h-[1px] bg-white/30 my-3 mx-auto sm:mx-0" />
            <p className="text-base md:text-lg text-white/90 tracking-wide [text-shadow:_0_1px_3px_rgba(0,0,0,0.3)] max-w-xl">
              Plot-22, Sector 11, Nerul, Navi Mumbai, 400706
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="text-white text-center sm:text-right"
          >
            <div className="mb-4 sm:mb-8">
              <p className="text-4xl md:text-5xl font-light [text-shadow:_0_1px_3px_rgba(0,0,0,0.3)]">750 m</p>
              <p className="text-sm md:text-base mt-2 tracking-wide text-white/90 [text-shadow:_0_1px_3px_rgba(0,0,0,0.3)]">
                From DY Patil Hospital
              </p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-light [text-shadow:_0_1px_3px_rgba(0,0,0,0.3)]">500 m</p>
              <p className="text-sm md:text-base mt-2 tracking-wide text-white/90 [text-shadow:_0_1px_3px_rgba(0,0,0,0.3)]">
                From Nerul Station
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;