import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "./index.css";

function App() {
  const [IpInput, setIpInput] = useState("1.1.1.1");
  const [ipAddress, setIpAdress] = useState("1.1.1.1");
  const [isp, setISP] = useState("Google");
  const [country, setCountry] = useState("US");
  const [location, setLocation] = useState("NY");
  const [zip, setZip] = useState("10001");
  const [longitude, setLongitude] = useState("-118.24549865722656");
  const [latitude, setLatitude] = useState("34.053611755371094");
  const [offset, setOffset] = useState("-05:00");
  const [timezone, setTimezone] = useState("UTC");
  const [center, setCenter] = useState([latitude, longitude]);

  async function getLocation() {
    const response = await fetch(
      `https://api.ipbase.com/v2/info?apikey=dPZG5BJBMUSrjrBKQakM0LF7t9kEHxyTQPgpFakb&ip=${IpInput}`
    );
    const data = await response.json();
    setLocation(data.data.location.city.name);
    setISP(data.data.connection.isp);
    setCountry(data.data.location.country.name);
    setZip(data.data.location.zip);
    setLongitude(data.data.location.longitude);
    setLatitude(data.data.location.latitude);
    setTimezone(data.data.timezone.code);
    setOffset(
      data.data.timezone.current_time.slice(
        data.data.timezone.current_time.length - 6,
        data.data.timezone.current_time.length
      )
    );
    setCenter([data.data.location.latitude, data.data.location.longitude]);
  }

  function handleChange(e) {
    let val = e.target.value;
    setIpAdress(val);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIpInput(ipAddress);
  }

  useEffect(() => {
    getLocation();
  }, [IpInput]);

  function ChangeView({ center }) {
    const map = useMap();
    map.setView(center);
    return null;
  }

  const svgIcon = L.divIcon({
    html: `<svg xmlns="http://www.w3.org/2000/svg" width="46" height="56"><path fill-rule="evenodd" d="M39.263 7.673c8.897 8.812 8.966 23.168.153 32.065l-.153.153L23 56 6.737 39.89C-2.16 31.079-2.23 16.723 6.584 7.826l.153-.152c9.007-8.922 23.52-8.922 32.526 0zM23 14.435c-5.211 0-9.436 4.185-9.436 9.347S17.79 33.128 23 33.128s9.436-4.184 9.436-9.346S28.21 14.435 23 14.435z"/></svg>`,
    className: "svg-icon",
    iconSize: [24, 40],
    iconAnchor: [22, 40],
  });

  return (
    <div>
      <div className="h-[25vh] w-[100%] bg-[url('./assets/images/pattern-bg.png')] bg-no-repeat bg-cover text-center uppercase pt-4">
        <h1>Ip Address Tracker</h1>
      </div>
      <div className="absolute z-10 top-[5rem] left-0 right-0 mr-auto ml-auto w-[70%] drop-shadow-2xl lg:w-[50%]">
        {" "}
        <form
          onSubmit={handleSubmit}
          className="mb-4 lg:mb-12 lg:w-1/2 lg:mx-auto lg:my-0"
        >
          <input
            className="w-10/12 min-h-[48px] rounded-l-2xl pl-5 bg-white text-black focus:outline-none"
            onChange={handleChange}
            placeholder="Enter IP"
          />
          <button
            disabled={ipAddress.length < 4}
            className="w-2/12 bg-black text-white min-h-[48px] active:bg-darkgray rounded-l-none"
          >
            {">"}
          </button>
        </form>
        <div className="grid grid-cols-1 grid-rows-4 gap-2 py-2 items-center rounded-2xl text-center bg-white  text-black lg:grid-rows-1 lg:grid-cols-4 lg:items-start lg:p-4">
          <div>
            <h6>ip address</h6>
            <p>{IpInput}</p>
          </div>
          <div className="flex flex-col">
            <h6>location</h6>
            <div className="font-bold">
              {location}, {country}, {zip}
            </div>
          </div>
          <div>
            <h6>Timezone</h6>
            <div className="font-bold">
              {timezone} {offset}
            </div>
          </div>
          <div>
            <h6>ISP</h6>
            <p>{isp}</p>
          </div>
        </div>
      </div>
      <div className="w-[100%] h-[75vh] relative z-0">
        <MapContainer center={center} zoom={13} scrollWheelZoom={false}>
          <ChangeView center={center} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={center} icon={svgIcon}></Marker>
        </MapContainer>
      </div>
    </div>
  );
}

export default App;
