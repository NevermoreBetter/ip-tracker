import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  useMap,
} from "https://cdn.esm.sh/react-leaflet";

function App() {
  const [IpInput, setIpInput] = useState();
  const [ipAddress, setIpAdress] = useState("");
  const [location, setLocation] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [timezone, setTimezone] = useState("");

  async function getLocation() {
    const response = await fetch(
      `https://api.ipbase.com/v2/info?apikey=dPZG5BJBMUSrjrBKQakM0LF7t9kEHxyTQPgpFakb&ip=${IpInput}`
    );
    const data = await response.json();
    setLocation(data.data.location.city.name);
    setLongitude(data.data.location.longitude);
    setLatitude(data.data.location.latitude);
    setTimezone(data.data.timezone.code);
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

  return (
    <>
      <div>
        {" "}
        <form onSubmit={handleSubmit}>
          <input
            className="w-10/12 min-h-[48px] rounded-l-2xl pl-5"
            // type={'number'}
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
      </div>
    </>
  );
}

export default App;
