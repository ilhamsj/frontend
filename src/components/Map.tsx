import React from "react";
import "@/lib/leaflet.fix";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const Map = () => {
  return (
    <MapContainer
      center={[-2.5, 117.9]}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[-2.5, 117.9]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
