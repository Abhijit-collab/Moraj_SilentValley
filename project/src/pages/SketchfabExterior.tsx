import React, { useEffect, useRef, useState } from 'react';

const SketchfabExterior: React.FC = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [api, setApi] = useState<any>(null);
  const [nodeMap, setNodeMap] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [apiReady, setApiReady] = useState(false);
  const [debugInfo, setDebugInfo] = useState<string>('');
  const [roofVisible, setRoofVisible] = useState(true);
  const [dimensionVisible, setDimensionVisible] = useState(false);

  // Toggle function from CodePen
  const Toggle = (api: any, instanceID: string, isVisible: boolean) => {
    if (isVisible === false) {
      api.hide(instanceID);
    } else {
      api.show(instanceID);
    }
  };

  // Get node by name function from CodePen
  const getNodeByName = (nodemap: any, nodename: string) => {
    return Object.values(nodemap).find((node: any) => {
      if (node.type === "MatrixTransform" && node.name === nodename) {
        return node;
      }
    }) as any;
  };

  // Button functions (will be set after API is ready)
  const [ShowRoof, setShowRoof] = useState<(() => void) | null>(null);
  const [HideRoof, setHideRoof] = useState<(() => void) | null>(null);
  const [ShowDimension, setShowDimension] = useState<(() => void) | null>(null);
  const [HideDimension, setHideDimension] = useState<(() => void) | null>(null);

  useEffect(() => {
    const loadSketchfab = () => {
      if (window.Sketchfab && iframeRef.current) {
        const version = '1.12.1';
        const client = new window.Sketchfab(version, iframeRef.current);
        const uid = 'ae58706b10014ea3b539286d2762c9ce';

        const success = (api: any) => {
          setApi(api);
          setApiReady(true);
          
          api.start(() => {
            api.addEventListener("viewerready", () => {
              api.getNodeMap(function (err: any, nodes: any) {
                if (!err) {
                  setNodeMap(nodes);
                  setDebugInfo(`Found ${Object.keys(nodes).length} nodes`);
                  setIsLoading(false);

                  // Set up button functions exactly like CodePen
                  setShowRoof(() => {
                    return () => {
                      const roof = getNodeByName(nodes, "roof");
                      if (roof) {
                        Toggle(api, roof.instanceID, true);
                        setRoofVisible(true);
                      }
                    };
                  });

                  setHideRoof(() => {
                    return () => {
                      const roof = getNodeByName(nodes, "roof");
                      if (roof) {
                        Toggle(api, roof.instanceID, false);
                        setRoofVisible(false);
                      }
                    };
                  });

                  setShowDimension(() => {
                    return () => {
                      const dimension = getNodeByName(nodes, "dimension");
                      if (dimension) {
                        Toggle(api, dimension.instanceID, true);
                        setDimensionVisible(true);
                      }
                    };
                  });

                  setHideDimension(() => {
                    return () => {
                      const dimension = getNodeByName(nodes, "dimension");
                      if (dimension) {
                        Toggle(api, dimension.instanceID, false);
                        setDimensionVisible(false);
                      }
                    };
                  });

                } else {
                  setDebugInfo("Error loading node map");
                  setIsLoading(false);
                }
              });
            });
          });
        };

        const error = () => {
          setDebugInfo("Failed to initialize Sketchfab API");
          setIsLoading(false);
        };

        client.init(uid, {
          success: success,
          error: error,
          ui_stop: 0,
        });
      } else {
        setDebugInfo("Sketchfab not available");
        setIsLoading(false);
      }
    };

    // Wait for Sketchfab script to be loaded
    if (!(window as any).Sketchfab) {
      const script = document.createElement('script');
      script.src = 'https://static.sketchfab.com/api/sketchfab-viewer-1.12.1.js';
      script.onload = () => {
        loadSketchfab();
      };
      script.onerror = () => {
        setDebugInfo("Failed to load Sketchfab script");
        setIsLoading(false);
      };
      document.body.appendChild(script);
    } else {
      loadSketchfab();
    }
  }, []);

  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      width: '100vw', 
      height: '100vh', 
      background: '#000',
      zIndex: 1000
    }}>
      {/* Full Screen Sketchfab Viewer */}
      <div style={{ 
        position: 'relative', 
        width: '100%', 
        height: '100%' 
      }}>
        <iframe
          ref={iframeRef}
          className="sketchfab"
          id="api-frame"
          title="Sketchfab 3D Model"
          src="https://sketchfab.com/models/ae58706b10014ea3b539286d2762c9ce/embed?autostart=1&ui_theme=dark&ui_annotations=0&ui_controls=1&ui_inspector=0&ui_watermark_link=0&ui_watermark=0&ui_ar=0&ui_help=0&ui_settings=0&ui_vr=0&ui_fullscreen=0&ui_animations=0&preload=1"
          style={{ 
            width: '100%', 
            height: '100%', 
            border: 'none',
            display: 'block'
          }}
          allowFullScreen
          allow="autoplay; fullscreen; xr-spatial-tracking; xr; gyroscope; accelerometer; magnetometer"
        />

        {/* Overlay Controls */}
        <div style={{ 
          position: 'absolute', 
          top: 20, 
          left: 20, 
          zIndex: 1001,
          display: 'flex',
          flexDirection: 'column',
          gap: 12
        }}>
          {/* Title */}
          <div style={{
            background: 'rgba(0, 0, 0, 0.8)',
            color: '#fff',
            padding: '12px 16px',
            borderRadius: 8,
            fontSize: '18px',
            fontWeight: 600,
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            3D Exterior Interactive Model
          </div>

          {/* Control Buttons */}
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column',
            gap: 8,
            background: 'rgba(0, 0, 0, 0.8)',
            padding: '16px',
            borderRadius: 12,
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            minWidth: '200px'
          }}>
            <div style={{ display: 'flex', gap: 8 }}>
              <button 
                onClick={ShowRoof || (() => {})} 
                disabled={!apiReady || !ShowRoof || roofVisible}
                style={{ 
                  padding: '10px 16px', 
                  background: !apiReady || !ShowRoof || roofVisible ? 'rgba(255, 255, 255, 0.1)' : '#2563eb', 
                  color: !apiReady || !ShowRoof || roofVisible ? 'rgba(255, 255, 255, 0.5)' : '#fff', 
                  border: 'none', 
                  borderRadius: 6, 
                  fontWeight: 500, 
                  cursor: !apiReady || !ShowRoof || roofVisible ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s',
                  fontSize: '14px',
                  flex: 1
                }}
              >
                Show Roof
              </button>
              
              <button 
                onClick={HideRoof || (() => {})} 
                disabled={!apiReady || !HideRoof || !roofVisible}
                style={{ 
                  padding: '10px 16px', 
                  background: !apiReady || !HideRoof || !roofVisible ? 'rgba(255, 255, 255, 0.1)' : '#ef4444', 
                  color: !apiReady || !HideRoof || !roofVisible ? 'rgba(255, 255, 255, 0.5)' : '#fff', 
                  border: 'none', 
                  borderRadius: 6, 
                  fontWeight: 500, 
                  cursor: !apiReady || !HideRoof || !roofVisible ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s',
                  fontSize: '14px',
                  flex: 1
                }}
              >
                Hide Roof
              </button>
            </div>
            
            <div style={{ display: 'flex', gap: 8 }}>
              <button 
                onClick={ShowDimension || (() => {})} 
                disabled={!apiReady || !ShowDimension || dimensionVisible}
                style={{ 
                  padding: '10px 16px', 
                  background: !apiReady || !ShowDimension || dimensionVisible ? 'rgba(255, 255, 255, 0.1)' : '#7c3aed', 
                  color: !apiReady || !ShowDimension || dimensionVisible ? 'rgba(255, 255, 255, 0.5)' : '#fff', 
                  border: 'none', 
                  borderRadius: 6, 
                  fontWeight: 500, 
                  cursor: !apiReady || !ShowDimension || dimensionVisible ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s',
                  fontSize: '14px',
                  flex: 1
                }}
              >
                Show Measurements
              </button>
              
              <button 
                onClick={HideDimension || (() => {})} 
                disabled={!apiReady || !HideDimension || !dimensionVisible}
                style={{ 
                  padding: '10px 16px', 
                  background: !apiReady || !HideDimension || !dimensionVisible ? 'rgba(255, 255, 255, 0.1)' : '#f59e0b', 
                  color: !apiReady || !HideDimension || !dimensionVisible ? 'rgba(255, 255, 255, 0.5)' : '#fff', 
                  border: 'none', 
                  borderRadius: 6, 
                  fontWeight: 500, 
                  cursor: !apiReady || !HideDimension || !dimensionVisible ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s',
                  fontSize: '14px',
                  flex: 1
                }}
              >
                Hide Measurements
              </button>
            </div>
          </div>

          {/* Loading Indicator */}
          {isLoading && (
            <div style={{
              background: 'rgba(0, 0, 0, 0.8)',
              color: '#fff',
              padding: '12px 16px',
              borderRadius: 8,
              fontSize: '14px',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              Loading 3D model...
            </div>
          )}
        </div>

        {/* Close Button */}
        <button 
          onClick={() => window.history.back()}
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            zIndex: 1001,
            background: 'rgba(0, 0, 0, 0.8)',
            color: '#fff',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            fontSize: '20px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(239, 68, 68, 0.8)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(0, 0, 0, 0.8)';
          }}
        >
          ✕
        </button>

        {/* Instructions */}
        <div style={{
          position: 'absolute',
          bottom: 20,
          left: 20,
          zIndex: 1001,
          background: 'rgba(0, 0, 0, 0.8)',
          color: '#fff',
          padding: '16px',
          borderRadius: 8,
          fontSize: '14px',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          maxWidth: '300px'
        }}>
          <div style={{ fontWeight: 600, marginBottom: 8 }}>Navigation:</div>
          <div>• Mouse: Rotate view</div>
          <div>• Scroll: Zoom in/out</div>
          <div>• Right-click: Pan</div>
        </div>
      </div>
    </div>
  );
};

export default SketchfabExterior; 