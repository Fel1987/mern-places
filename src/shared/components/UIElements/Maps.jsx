import { useRef, useEffect } from "react";
import "./Map.css";

const Map = ({ center, zoom, className = "", style = {} }) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Create map ONLY once
    mapInstance.current = new window.ol.Map({
      target: mapRef.current,
      layers: [
        new window.ol.layer.Tile({
          source: new window.ol.source.OSM(),
        }),
      ],
      view: new window.ol.View({
        center: window.ol.proj.fromLonLat([center.lng, center.lat]),
        zoom: zoom,
      }),
    });

    // Marker layer
    const marker = new window.ol.layer.Vector({
      source: new window.ol.source.Vector({
        features: [
          new window.ol.Feature({
            geometry: new window.ol.geom.Point(
              window.ol.proj.fromLonLat([center.lng, center.lat]),
            ),
          }),
        ],
      }),
      style: new window.ol.style.Style({
        image: new window.ol.style.Icon({
          anchor: [0.5, 1],
          crossOrigin: "anonymous",
          src: "https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/images/marker-icon.png",
        }),
      }),
    });

    mapInstance.current.addLayer(marker);

    return () => {
      // Cleanup
      mapInstance.current.setTarget(null);
    };
  }, []);

  // Update center & zoom when props change
  useEffect(() => {
    if (!mapInstance.current) return;

    const view = mapInstance.current.getView();
    view.setCenter(window.ol.proj.fromLonLat([center.lng, center.lat]));
    view.setZoom(zoom);
  }, [center, zoom]);

  return (
    <div
      ref={mapRef}
      className={`map ${className}`}
      style={{
        width: "100%",
        height: "300px", // 👈 guarantees visibility
        ...style,
      }}
    />
  );
};

export default Map;
