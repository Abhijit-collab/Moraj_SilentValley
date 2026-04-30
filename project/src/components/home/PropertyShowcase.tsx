import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronLeft, ChevronRight, Play, Pause, Sofa, Building2, Sparkles, Maximize2 } from 'lucide-react';

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: string;
}

const PANOEE_TOUR_SRC = 'https://tour.panoee.net/iframe/morajsilentvalley';
/** Inline Virtual Experience embed height (px); pano viewers need ample vertical space */
const PANOEE_EMBED_HEIGHT_PX = 560;

const PropertyShowcase: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [showFullScreenSketchfab, setShowFullScreenSketchfab] = useState(false);
  const [sketchfabUid] = useState('2f2b9d64f2c24e2097b82a2b1e8ff1fb');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showFullScreenGallery, setShowFullScreenGallery] = useState(false);
  const [activePopupImages, setActivePopupImages] = useState<GalleryImage[]>([]);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [showFullScreenTour, setShowFullScreenTour] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const thumbnailContainerRef = useRef<HTMLDivElement>(null);
  const thumbnailScrollRef = useRef<NodeJS.Timeout | null>(null);

  const viewOptions = [
    { id: 'interior', label: 'Interior', icon: Sofa },
    { id: 'exterior', label: 'Exterior', icon: Building2 },
    { id: 'amenities', label: 'Amenities', icon: Sparkles },
  ];

  const exteriorImages = [
    'https://d1gzjhm4khhl9p.cloudfront.net/Exterior/Horizontal_NightShot_V2.jpg',
    'https://d1gzjhm4khhl9p.cloudfront.net/Exterior/Moraj_SV_Ext_02.png',
    'https://d1gzjhm4khhl9p.cloudfront.net/Exterior/Moraj_SV_Ext_03_FRONT_VIEW.png',
    'https://d1gzjhm4khhl9p.cloudfront.net/Exterior/Moraj_SV_Ext_04_PARK_VIEW.png',
    'https://d1gzjhm4khhl9p.cloudfront.net/Exterior/Moraj_SV_Ext_05_TopView_Front.png',
    'https://d1gzjhm4khhl9p.cloudfront.net/Exterior/Moraj_SV_Ext_06_Front_StandingPOV_Night.png',
    'https://d1gzjhm4khhl9p.cloudfront.net/Exterior/Moraj_SV_Ext_06_Front_StandingPOV.png',
    'https://d1gzjhm4khhl9p.cloudfront.net/Exterior/Moraj_SV_Ext_08_Front_CloseUpElevation.png',
    'https://d1gzjhm4khhl9p.cloudfront.net/Exterior/Moraj_SV_Ext_09_TopDown_PodiumView.png',
    'https://d1gzjhm4khhl9p.cloudfront.net/Exterior/Moraj_SV_Ext_10_Drone_PodiumView.png',
    'https://d1gzjhm4khhl9p.cloudfront.net/Exterior/Moraj_SV_Ext_11_Drone_SwimmingPool.png',
    'https://d1gzjhm4khhl9p.cloudfront.net/Exterior/Moraj_SV_Ext_12_SwimmingPool_POV.png',
    'https://d1gzjhm4khhl9p.cloudfront.net/Exterior/Moraj_SV_Ext_13_Podium_Garden_YogaPOV.png',
    'https://d1gzjhm4khhl9p.cloudfront.net/Exterior/Moraj_SV_Ext_14_Podium_Gazebo_POV.png',
    'https://d1gzjhm4khhl9p.cloudfront.net/Exterior/Moraj_SV_Ext_15_IndoorHall_Foosball.png',
    'https://d1gzjhm4khhl9p.cloudfront.net/Exterior/Moraj_SV_Ext_16_Gym.png',
    'https://d1gzjhm4khhl9p.cloudfront.net/Exterior/Moraj_SV_Ext_17_Gym2.png',
    'https://d1gzjhm4khhl9p.cloudfront.net/Exterior/Moraj_SV_Ext_18_PoolTable.png',
    'https://d1gzjhm4khhl9p.cloudfront.net/Exterior/Moraj_SV_Ext_20_Lobby2_Parking.png',
    'https://d1gzjhm4khhl9p.cloudfront.net/Exterior/Moraj_SV_Int_1_Deck_BoyStanding1.png',
    'https://d1gzjhm4khhl9p.cloudfront.net/Exterior/Moraj_VerticalShot1.png',
    'https://d1gzjhm4khhl9p.cloudfront.net/Exterior/Moraj_VerticalShot2.png'
  ];

  const amenitiesImageUrls = [
    'https://d1gzjhm4khhl9p.cloudfront.net/Amenities/Moraj_SV_Ext_10_Drone_PodiumView.png',
    'https://d1gzjhm4khhl9p.cloudfront.net/Amenities/Moraj_SV_Ext_11_Drone_SwimmingPool.png',
    'https://d1gzjhm4khhl9p.cloudfront.net/Amenities/Moraj_SV_Ext_12_SwimmingPool_POV.png',
    'https://d1gzjhm4khhl9p.cloudfront.net/Amenities/Moraj_SV_Ext_13_Podium_Garden_YogaPOV.png',
    'https://d1gzjhm4khhl9p.cloudfront.net/Amenities/Moraj_SV_Ext_14_Podium_Gazebo_POV.png',
    'https://d1gzjhm4khhl9p.cloudfront.net/Amenities/Moraj_SV_Ext_15_IndoorHall_Foosball.png',
    'https://d1gzjhm4khhl9p.cloudfront.net/Amenities/Moraj_SV_Ext_16_Gym.png',
    'https://d1gzjhm4khhl9p.cloudfront.net/Amenities/Moraj_SV_Ext_17_Gym2.png',
    'https://d1gzjhm4khhl9p.cloudfront.net/Amenities/Moraj_SV_Ext_18_PoolTable.png',
  ];

  const interiorImageUrls = [
    'https://d1gzjhm4khhl9p.cloudfront.net/Interior/Moraj_SV_Ext_19_Lobby1.png',
    'https://d1gzjhm4khhl9p.cloudfront.net/Interior/Moraj_SV_Ext_22_Lobby3.png',
    'https://d1gzjhm4khhl9p.cloudfront.net/Interior/Moraj_SV_Ext_23_Lobby4.png',
    'https://d1gzjhm4khhl9p.cloudfront.net/Interior/Moraj_SV_Int_10_LivingRoom.png',
    'https://d1gzjhm4khhl9p.cloudfront.net/Interior/Moraj_SV_Int_11_LivingRoom2.png',
    'https://d1gzjhm4khhl9p.cloudfront.net/Interior/Moraj_SV_Int_2_Kitchen.png',
    'https://d1gzjhm4khhl9p.cloudfront.net/Interior/Moraj_SV_Int_3_Hallway.png',
    'https://d1gzjhm4khhl9p.cloudfront.net/Interior/Moraj_SV_Int_4_Bedroom1_A.png',
    'https://d1gzjhm4khhl9p.cloudfront.net/Interior/Moraj_SV_Int_5_Bedroom1_B.png',
    'https://d1gzjhm4khhl9p.cloudfront.net/Interior/Moraj_SV_Int_6_Bedroom1_C_Bathroom.png',
    'https://d1gzjhm4khhl9p.cloudfront.net/Interior/Moraj_SV_Int_7_Bedroom2_A.png',
    'https://d1gzjhm4khhl9p.cloudfront.net/Interior/Moraj_SV_Int_8_Bedroom3_A.png',
    'https://d1gzjhm4khhl9p.cloudfront.net/Interior/Moraj_SV_Int_9_Bedroom3_B.png',
  ];

  const extractFileName = (pathOrUrl: string) => {
    const cleanPath = pathOrUrl.split('?')[0].split('#')[0];
    const parts = cleanPath.split('/');
    return parts[parts.length - 1];
  };

  const formatGalleryTitle = (pathOrUrl: string) =>
    extractFileName(pathOrUrl)
      .replace('.png', '')
      .replace(/^Moraj_SV_(Ext|Int)_\d+_?/, '')
      .replace(/_/g, ' ')
      .replace('POV', 'POV')
      .trim();

  const exteriorGalleryImages: GalleryImage[] = exteriorImages.map((src, index) => ({
    id: index + 1,
    src,
    alt: `Moraj Silent Valley ${formatGalleryTitle(src)}`,
    category: 'exterior',
  }));
  const interiorGalleryImages: GalleryImage[] = interiorImageUrls.map((src, index) => ({
    id: index + 1,
    src,
    alt: `Moraj Silent Valley ${formatGalleryTitle(src)}`,
    category: 'interior',
  }));
  const amenitiesGalleryImages: GalleryImage[] = amenitiesImageUrls.map((src, index) => ({
    id: index + 1,
    src,
    alt: `Moraj Silent Valley ${formatGalleryTitle(src)}`,
    category: 'amenities',
  }));

  const usedFileNames = new Set<string>();
  for (const img of [...exteriorGalleryImages, ...interiorGalleryImages]) {
    usedFileNames.add(extractFileName(img.src));
  }
  const amenitiesInMainGallery = amenitiesGalleryImages.filter(
    (img) => !usedFileNames.has(extractFileName(img.src))
  );

  const galleryImages = [...exteriorGalleryImages, ...interiorGalleryImages, ...amenitiesInMainGallery].map((image, index) => ({
    ...image,
    id: index + 1,
  }));

  const popupImages = showFullScreenGallery && activePopupImages.length > 0 ? activePopupImages : galleryImages;

  // Auto-scroll thumbnails to keep current image visible
  useEffect(() => {
    if (thumbnailContainerRef.current) {
      const container = thumbnailContainerRef.current;
      const thumbnailWidth = 96; // w-24 = 96px
      const spacing = 12; // space-x-3 = 12px
      const totalThumbnailWidth = thumbnailWidth + spacing;
      const scrollPosition = currentImageIndex * totalThumbnailWidth;
      
      // Smooth scroll to the current thumbnail
      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  }, [currentImageIndex]);

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying && !isHovered && inView) {
      autoPlayRef.current = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
      }, 4000); // Change image every 4 seconds
    } else {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
        autoPlayRef.current = null;
      }
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, isHovered, inView, galleryImages.length]);

  // Panoee tour: forward device motion to iframe (replaces inline script from embed snippet)
  useEffect(() => {
    const handleDeviceMotion = (e: DeviceMotionEvent) => {
      const iframe =
        (document.getElementById('tour-embeded-modal') as HTMLIFrameElement | null) ??
        (document.getElementById('tour-embeded') as HTMLIFrameElement | null);
      if (!iframe?.contentWindow) return;
      const acc = e.acceleration;
      const accG = e.accelerationIncludingGravity;
      const rot = e.rotationRate;
      iframe.contentWindow.postMessage(
        {
          type: 'devicemotion',
          deviceMotionEvent: {
            acceleration: {
              x: acc?.x ?? null,
              y: acc?.y ?? null,
              z: acc?.z ?? null,
            },
            accelerationIncludingGravity: {
              x: accG?.x ?? null,
              y: accG?.y ?? null,
              z: accG?.z ?? null,
            },
            rotationRate: {
              alpha: rot?.alpha ?? null,
              beta: rot?.beta ?? null,
              gamma: rot?.gamma ?? null,
            },
            interval: e.interval,
            timeStamp: e.timeStamp,
          },
        },
        '*'
      );
    };
    window.addEventListener('devicemotion', handleDeviceMotion);
    return () => window.removeEventListener('devicemotion', handleDeviceMotion);
  }, []);

  useEffect(() => {
    if (!showFullScreenTour) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowFullScreenTour(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [showFullScreenTour]);

  // Auto-scroll thumbnails on mobile when images are not visible
  useEffect(() => {
    if (thumbnailContainerRef.current) {
      const container = thumbnailContainerRef.current;
      
      const checkAndScroll = () => {
        const containerWidth = container.clientWidth;
        const scrollWidth = container.scrollWidth;
        const scrollLeft = container.scrollLeft;
        
        // If there's more content to scroll and we're not at the end
        if (scrollWidth > containerWidth && scrollLeft < scrollWidth - containerWidth) {
          thumbnailScrollRef.current = setTimeout(() => {
            container.scrollBy({
              left: 100,
              behavior: 'smooth'
            });
          }, 3000); // Scroll every 3 seconds
        }
      };

      // Start auto-scroll after a delay
      const startAutoScroll = setTimeout(checkAndScroll, 2000);
      
      return () => {
        clearTimeout(startAutoScroll);
        if (thumbnailScrollRef.current) {
          clearTimeout(thumbnailScrollRef.current);
        }
      };
    }
  }, [currentImageIndex]);

  const handleViewChange = (viewId: string) => {
    if (viewId === 'interior') {
      openFullScreenGallery(0, interiorGalleryImages);
    } else if (viewId === 'exterior') {
      openFullScreenGallery(0, exteriorGalleryImages);
    } else if (viewId === 'amenities') {
      openFullScreenGallery(0, amenitiesGalleryImages);
    }
  };

  const closeFullScreen = () => {
    setShowFullScreenSketchfab(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % popupImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + popupImages.length) % popupImages.length);
  };

  const openFullScreenGallery = (index: number, images: GalleryImage[] = galleryImages) => {
    setActivePopupImages(images);
    setCurrentImageIndex(index);
    setShowFullScreenGallery(true);
  };

  const closeFullScreenGallery = () => {
    setShowFullScreenGallery(false);
    setActivePopupImages([]);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  return (
    <section ref={ref} className="py-32 bg-gray-50">
      {/* Full Screen Sketchfab Overlay */}
      {showFullScreenSketchfab && (
        <div className="fixed inset-0 z-50 bg-black">
          <div className="relative w-full h-full">
            {/* Close Button */}
            <button
              onClick={closeFullScreen}
              className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors duration-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Sketchfab iframe in full screen */}
            <div className="w-full h-full">
              <iframe
                title="Moraj Silent Valley Exterior"
                src={`https://sketchfab.com/models/${sketchfabUid}/embed?autostart=1&ui_theme=dark`}
                className="w-full h-full"
                frameBorder="0"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      <AnimatePresence>
        {showFullScreenTour && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex h-full min-h-0 flex-col bg-black/95 backdrop-blur-sm"
            onClick={() => setShowFullScreenTour(false)}
          >
            <button
              type="button"
              onClick={() => setShowFullScreenTour(false)}
              className="absolute right-4 top-4 z-10 rounded-full bg-white/20 p-3 text-white transition-colors hover:bg-white/30"
              aria-label="Close tour"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div
              className="flex min-h-0 flex-1 flex-col px-3 pb-3 pt-14 sm:px-4 sm:pb-4 sm:pt-16"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                id="tour-embeded-modal"
                name="Moraj Silent Valley — fullscreen"
                title="Moraj Silent Valley — fullscreen"
                src={PANOEE_TOUR_SRC}
                className="h-[calc(100dvh-4.5rem)] min-h-[80vh] w-full shrink-0 rounded-lg border-0 sm:h-[calc(100dvh-5.5rem)]"
                loading="eager"
                allow="vr; xr; accelerometer; gyroscope; autoplay;"
                allowFullScreen
                {...({
                  allowvr: 'yes',
                } as React.IframeHTMLAttributes<HTMLIFrameElement>)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full Screen Gallery Overlay */}
      <AnimatePresence>
        {showFullScreenGallery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm"
            onClick={closeFullScreenGallery}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Close Button */}
              <button
                onClick={closeFullScreenGallery}
                className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors duration-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Navigation Buttons */}
              <button
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                className="absolute left-4 z-10 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors duration-300"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                className="absolute right-4 z-10 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors duration-300"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Image */}
              <div className="relative max-w-7xl mx-auto px-4" onClick={(e) => e.stopPropagation()}>
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImageIndex}
                    src={popupImages[currentImageIndex].src}
                    alt={popupImages[currentImageIndex].alt}
                    className="max-h-[90vh] max-w-full object-contain rounded-lg"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  />
                </AnimatePresence>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-4 left-4 right-4 text-white text-center"
                >
                  <p className="text-white/80">{currentImageIndex + 1} / {popupImages.length}</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
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
            Virtual
            <br />
            <span className="font-normal">Experience</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
            Explore our meticulously designed spaces through an immersive virtual experience that captures every detail
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div
            className="group relative mb-24 cursor-pointer overflow-hidden rounded-xl bg-white shadow-lg"
            onClick={() => setShowFullScreenTour(true)}
          >
            <iframe
              id="tour-embeded"
              name="Moraj Silent Valley"
              title="Moraj Silent Valley"
              src={PANOEE_TOUR_SRC}
              width="100%"
              height={PANOEE_EMBED_HEIGHT_PX}
              className="pointer-events-none w-full max-w-full border-0"
              style={{ height: PANOEE_EMBED_HEIGHT_PX }}
              loading="lazy"
              scrolling="no"
              allow="vr; xr; accelerometer; gyroscope; autoplay;"
              allowFullScreen={false}
              {...({
                allowvr: 'yes',
                webkitallowfullscreen: 'false',
                mozallowfullscreen: 'false',
              } as React.IframeHTMLAttributes<HTMLIFrameElement>)}
            />
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/10">
              <span className="rounded-full bg-black/60 px-4 py-2 text-sm font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                Click for fullscreen tour
              </span>
            </div>
            <button
              type="button"
              className="pointer-events-auto absolute right-3 top-3 z-10 rounded-full bg-black/50 p-2.5 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
              aria-label="Open fullscreen tour"
              onClick={(e) => {
                e.stopPropagation();
                setShowFullScreenTour(true);
              }}
            >
              <Maximize2 className="h-5 w-5" />
            </button>
          </div>

          {/* Animated Gallery */}
          <div className="mb-8 pt-12 text-center md:pt-16">
            <motion.h3 
              className="text-3xl md:text-4xl font-light text-black mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Gallery
            </motion.h3>
            <motion.div 
              className="w-16 h-px bg-black mx-auto"
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            />
          </div>

          <div 
            className="bg-white shadow-lg overflow-hidden rounded-xl relative mb-8"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Auto-play Controls */}
            <div className="absolute top-4 right-4 z-10 flex items-center space-x-2">
              <button
                onClick={toggleAutoPlay}
                className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-colors duration-300"
                title={isAutoPlaying ? 'Pause Auto-play' : 'Start Auto-play'}
              >
                {isAutoPlaying ? (
                  <Pause className="w-4 h-4 text-white" />
                ) : (
                  <Play className="w-4 h-4 text-white" />
                )}
              </button>
            </div>

            {/* Main Gallery Image */}
            <div className="relative h-[500px] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={galleryImages[currentImageIndex].src}
                  alt={galleryImages[currentImageIndex].alt}
                  className="w-full h-full object-cover cursor-zoom-in"
                  onClick={() => openFullScreenGallery(currentImageIndex)}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                />
              </AnimatePresence>

              {/* Image Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <p className="text-white/80 text-lg capitalize">{galleryImages[currentImageIndex].category}</p>
                </div>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-colors duration-300"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-colors duration-300"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Thumbnail Grid - Horizontal Scrolling */}
            <div className="overflow-x-auto scrollbar-hide p-4" ref={thumbnailContainerRef}>
              <div className="flex space-x-3 min-w-max">
                {galleryImages.map((image, index) => (
                  <motion.div
                    key={image.id}
                    className={`relative cursor-pointer overflow-hidden rounded-lg flex-shrink-0 ${
                      index === currentImageIndex ? 'ring-2 ring-blue-500' : ''
                    }`}
                    onClick={() => openFullScreenGallery(index)}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-24 h-16 object-cover"
                    />
                    {index === currentImageIndex && (
                      <motion.div
                        className="absolute inset-0 bg-blue-500/20"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="h-1 bg-gray-200">
              <motion.div
                className="h-full bg-blue-500"
                initial={{ width: 0 }}
                animate={{ width: `${((currentImageIndex + 1) / galleryImages.length) * 100}%` }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
            </div>
          </div>

          {/* View Options - Enhanced with better hover effects and colors */}
          <div className="flex justify-center mb-8 px-4">
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-6 bg-gradient-to-r from-blue-50 to-purple-50 p-3 rounded-2xl shadow-xl border border-blue-100 w-full max-w-md sm:max-w-none sm:w-auto">
              {viewOptions.map((option) => (
                <motion.button
                  key={option.id}
                  onClick={() => handleViewChange(option.id)}
                  className="relative px-6 sm:px-10 py-4 sm:py-5 text-sm font-semibold tracking-wide transition-all duration-500 rounded-xl overflow-hidden group flex-1 sm:flex-none bg-white text-gray-800 hover:text-blue-700 hover:shadow-xl hover:transform hover:scale-105 border border-gray-200"
                  whileHover={{ 
                    scale: 1.05,
                    y: -2,
                    transition: { duration: 0.3 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Hover Background Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Button Content */}
                  <span className="relative z-10 font-bold inline-flex items-center gap-2 group-hover:text-white">
                    <option.icon className="w-4 h-4" />
                    {option.label}
                  </span>
                  
                  {/* Hover Border Effect */}
                  <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-blue-400 transition-all duration-300" />
                  
                  {/* Glow Effect */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-25 blur-sm transition-opacity duration-500" />
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Property Details */}
        <motion.div
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-12"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="text-center">
            <div className="text-3xl font-light text-black mb-4">2-4</div>
            <div className="text-sm text-gray-600 font-light tracking-wide mb-2">Bedrooms</div>
            <p className="text-gray-500 text-sm font-light">
              Thoughtfully designed layouts for every lifestyle
            </p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-light text-black mb-4">700-1,600</div>
            <div className="text-sm text-gray-600 font-light tracking-wide mb-2">Square Feet</div>
            <p className="text-gray-500 text-sm font-light">
              Spacious interiors with floor-to-ceiling windows
            </p>
          </div>
          <div className="text-center">
            <div className="text-xl sm:text-2xl md:text-3xl font-light text-black mb-4 leading-snug max-w-lg mx-auto px-2">
              15000 Sq ft Podium with recreational amenities
            </div>
            <p className="text-gray-500 text-sm font-light">
              A dedicated outdoor living layer for the community
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PropertyShowcase;