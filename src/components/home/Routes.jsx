import { useState } from "react";

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
    <section style={{ padding: "20px 0", backgroundColor: "#f9fafb" }}>
      <div style={{ width: "90%", maxWidth: "1200px", margin: "0 auto", padding: "0 15px" }}>
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "10px" }}>
            Route Map
          </h2>
          <p style={{ color: "#718096" }}>Plan your journey across the waterways</p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "30px",
            ...(window.innerWidth >= 1024 && { gridTemplateColumns: "1fr 1fr" }),
          }}
        >
          <div
            style={{
              position: "relative",
              height: "500px",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <img
              src="https://cdn-dev.watermetro.co.in/map2_802151b3e6.png"
              alt="Route Map"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ display: "grid", gap: "10px" }}>
              <label style={{ fontSize: "0.875rem", fontWeight: "500" }}>Select Route</label>
              <select
                value={selectedRoute.id}
                onChange={(e) => {
                  const route = routes.find((r) => r.id === e.target.value);
                  if (route) setSelectedRoute(route);
                }}
                style={{
                  padding: "8px",
                  border: "1px solid #e2e8f0",
                  borderRadius: "4px",
                  fontSize: "1rem",
                }}
              >
                {routes.map((route) => (
                  <option key={route.id} value={route.id}>
                    {route.name}
                  </option>
                ))}
              </select>
            </div>

            <div
              style={{
                backgroundColor: "#ffffff",
                padding: "20px",
                borderRadius: "8px",
                boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
              }}
            >
              <h3 style={{ fontSize: "1.125rem", fontWeight: "600", marginBottom: "10px" }}>
                {selectedRoute.name}
              </h3>
              <p style={{ marginBottom: "5px", color: "#4a5568", fontWeight: "500" }}>
                Stations: {selectedRoute.stations.join(" → ")}
              </p>
              <p style={{ marginBottom: "5px", color: "#4a5568", fontWeight: "500" }}>
                Journey Time: {selectedRoute.time}
              </p>
              <p style={{ marginBottom: "5px", color: "#4a5568", fontWeight: "500" }}>
                Fare: {selectedRoute.fare}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
