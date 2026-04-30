import React from 'react';

const ComingSoonPage: React.FC = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <video
        className="absolute inset-0 h-full w-full object-cover brightness-125 contrast-110 saturate-110"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/Exploded_view_show_showcase_1c31fc5a1e.gif"
      >
        <source src="/Exploded_view_show_showcase_1c31fc5a1e.mp4" type="video/mp4" />
        <img
          src="/Exploded_view_show_showcase_1c31fc5a1e.gif"
          alt=""
          className="absolute inset-0 h-full w-full object-cover brightness-125 contrast-110 saturate-110"
        />
      </video>

      <div className="absolute inset-0 bg-black/30" />

      <div className="relative min-h-screen flex items-center justify-center px-6">
        <div className="text-center rounded-3xl bg-black/35 px-8 py-10 ring-1 ring-white/15 backdrop-blur-sm shadow-2xl">
          <div className="text-sm md:text-base tracking-[0.35em] text-white/80 uppercase">
            Moraj Silent Valley
          </div>
          <div className="mt-4 pb-5 text-5xl md:text-7xl font-light leading-[1.25] tracking-widest overflow-visible bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent drop-shadow-[0_12px_35px_rgba(0,0,0,0.85)]">
            Coming Soon
          </div>
          <div className="mt-4 h-px w-40 mx-auto bg-gradient-to-r from-transparent via-white/50 to-transparent" />
        </div>
      </div>
    </div>
  );
};

export default ComingSoonPage;

