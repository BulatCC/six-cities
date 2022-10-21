import { useEffect, useRef } from 'react';
import { useNavigate, generatePath } from 'react-router-dom';
import { Marker, Icon } from 'leaflet';
import useMap from '../../hooks/use-map';
import { Offer } from '../../types/offers';
import { AppRoute } from '../../consts';

type MapProps = {
  offers: Offer[];
  activeCard: number;
}

const defaultIcon = new Icon({
  iconUrl: 'img/pin.svg',
  iconSize: [27, 39],
  iconAnchor: [15, 20],
});

const currentIcon = new Icon({
  iconUrl: 'img/pin-active.svg',
  iconSize: [27, 39],
  iconAnchor: [15, 20],
});

function Map({ offers, activeCard }: MapProps): JSX.Element {
  const [{ city: { location } }] = offers;
  const mapRef = useRef(null);
  const navigate = useNavigate();

  const map = useMap(location, mapRef);

  useEffect(() => {
    if (map) {
      const markers: Marker[] = [];
      offers.forEach(({ location, id, title }) => {
        const marker = new Marker([location.latitude, location.longitude]);
        markers.push(marker);
        marker.setIcon(currentIcon);
        marker.bindPopup(title);
        id === activeCard ? marker.setIcon(currentIcon).addTo(map) : marker.setIcon(defaultIcon).addTo(map);
        marker.on('click', () =>  {
          window.scrollTo(0,0);
          return navigate(generatePath(AppRoute.Offer, { id: id.toString()}));
        });
        marker.on('mouseover', () => marker.openPopup());
        marker.on('mouseout', () => marker.closePopup());
      });

      return () => markers.forEach((marker) => map.removeLayer(marker));
    }
  }, [map, activeCard, offers]);

  return (
    <div data-testid="map" style={{
      height: '100%',
    }}
    ref={mapRef}
    >
    </div>
  );
}

export default Map;
