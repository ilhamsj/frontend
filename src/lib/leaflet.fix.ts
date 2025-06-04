// lib/leaflet.fix.ts
import L from "leaflet";

delete (L.Icon.Default.prototype as unknown as { _getIconUrl: unknown })
  ._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/images/marker-icon-2x.png",
  iconUrl: "/images/marker-icon.png",
  shadowUrl: "/images/marker-shadow.png",
});
