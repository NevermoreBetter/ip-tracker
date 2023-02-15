import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "./index.css";

function App() {
  const [IpInput, setIpInput] = useState();
  const [ipAddress, setIpAdress] = useState("1.1.1.1");
  const [location, setLocation] = useState("");
  const [longitude, setLongitude] = useState("-118.24549865722656");
  const [latitude, setLatitude] = useState("34.053611755371094");
  const [timezone, setTimezone] = useState("");
  const [showMap, setShowMap] = useState(true);
  const [center, setCenter] = useState([latitude, longitude]);

  async function getLocation() {
    const response = await fetch(
      `https://api.ipbase.com/v2/info?apikey=dPZG5BJBMUSrjrBKQakM0LF7t9kEHxyTQPgpFakb&ip=${IpInput}`
    );
    const data = await response.json();
    setLocation(data.data.location.city.name);
    setLongitude(data.data.location.longitude);
    setLatitude(data.data.location.latitude);
    setTimezone(data.data.timezone.code);
    setCenter([data.data.location.latitude, data.data.location.longitude]);
  }

  function handleChange(e) {
    let val = e.target.value;
    setIpAdress(val);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setShowMap(true);
    setIpInput(ipAddress);
  }

  useEffect(() => {
    // getLocation();
  }, [IpInput]);

  function ChangeView({ center }) {
    const map = useMap();
    map.setView(center);
    return null;
  }

  return (
    <>
      <div>
        {" "}
        <form onSubmit={handleSubmit}>
          <input
            className="w-10/12 min-h-[48px] rounded-l-2xl pl-5"
            onChange={handleChange}
          />
          <button
            disabled={ipAddress.length < 4}
            className="w-2/12 bg-black text-white min-h-[48px]  rounded-r-2xl active:bg-darkgray"
          >
            {">"}
          </button>
        </form>
        <div>{IpInput}</div>
        <div>{timezone}</div>
        <div>{location}</div>
        <div>{longitude}</div>
        <div>{latitude}</div>
        <div>{center}</div>
        <div className="w-[300px] h-[300px]">
          {showMap && (
            <MapContainer center={center} zoom={13} scrollWheelZoom={false}>
              <ChangeView center={center} />
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={center}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            </MapContainer>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
