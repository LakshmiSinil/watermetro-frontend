import  { useState } from 'react';
import './route.css';

const routes = [
  {
    id: "route1",
    name: "High Court - Vypeen",
    stations: ["High Court", "Vypeen"],
    time: "20 mins",
    fare: "₹20",
  },
  {
    id: "route2",
    name: "Vyttila - Kakkanad",
    stations: ["Vyttila", "Kakkanad"],
    time: "25 mins",
    fare: "₹25",
  },
];

export function RouteMap() {
  const [selectedRoute, setSelectedRoute] = useState(routes[0]);

  return (
    <section className="route-map-section">
      <div className="container">
        <div className="header">
          <h2>Route Map</h2>
          <p>Plan your journey across the waterways</p>
        </div>

        <div className="content">
          <div className="image-container">
            <img src="https://cdn-dev.watermetro.co.in/map2_802151b3e6.png" alt="Route Map" />
          </div>

          <div className="details">
            <div className="select-route">
              <label>Select Route</label>
              <select
                value={selectedRoute.id}
                onChange={(e) => {
                  const route = routes.find((r) => r.id === e.target.value);
                  if (route) setSelectedRoute(route);
                }}
              >
                {routes.map((route) => (
                  <option key={route.id} value={route.id}>
                    {route.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="route-info">
              <h3>{selectedRoute.name}</h3>
              <p>Stations: {selectedRoute.stations.join(" → ")}</p>
              <p>Journey Time: {selectedRoute.time}</p>
              <p>Fare: {selectedRoute.fare}</p>
            </div>

           
          </div>
        </div>
      </div>
    </section>
  );
}
