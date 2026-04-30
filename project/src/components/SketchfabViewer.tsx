import { useEffect, useRef } from 'react';

interface SketchfabViewerProps {
  modelId: string;
  width?: string | number;
  height?: string | number;
  autostart?: boolean;
  onLoad?: (api: any) => void;
  onError?: (error: any) => void;
}

declare global {
  interface Window {
    Sketchfab: any;
  }
}

export const SketchfabViewer = ({
  modelId,
  width = '100%',
  height = '400px',
  autostart = true,
  onLoad,
  onError,
}: SketchfabViewerProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const clientRef = useRef<any>(null);

  useEffect(() => {
    if (!iframeRef.current) return;

    const iframe = iframeRef.current;
    const client = new window.Sketchfab(iframe);

    const options = {
      autostart,
      success: (api: any) => {
        onLoad?.(api);
      },
      error: (error: any) => {
        console.error('Sketchfab API error:', error);
        onError?.(error);
      },
    };

    client.init(modelId, options);
    clientRef.current = client;

    return () => {
      // Cleanup if needed
      if (clientRef.current) {
        // The Sketchfab API doesn't provide a direct cleanup method
        // but we can remove the event listeners
        window.removeEventListener('message', clientRef.current._initializeAPIEmbedBinded);
      }
    };
  }, [modelId, autostart, onLoad, onError]);

  return (
    <iframe
      ref={iframeRef}
      title="Sketchfab 3D Model Viewer"
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        border: 'none',
      }}
      allow="autoplay; fullscreen; vr"
    />
  );
}; 