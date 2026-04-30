import React from 'react';

interface ModelViewerProps {
  height?: string;
}

const ModelViewer: React.FC<ModelViewerProps> = ({ 
  height = '100%' 
}) => {
  return (
    <div className="w-full h-full bg-gray-900 rounded-lg overflow-hidden" style={{ height }}>
      <iframe
        title="3D Model Viewer"
        src="https://sketchfab.com/models/ae58706b10014ea3b539286d2762c9ce/embed"
        width="100%"
        height="100%"
        allowFullScreen
        allow="autoplay; fullscreen"
        style={{
          border: 0,
          backgroundColor: 'black'
        }}
      />
    </div>
  );
};

export default ModelViewer;