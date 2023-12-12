import React, { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { WiHumidity } from "react-icons/wi";
import { FaTemperatureHigh } from "react-icons/fa";
import { GiFlowerTwirl } from "react-icons/gi";
import { TbBrandSpeedtest } from "react-icons/tb";
import { toast } from "react-toastify";
import { FaWind } from "react-icons/fa";
const MY_KEY = process.env.REACT_APP_API_KEY;

const Page = () => {
  const [location, setLocation] = useState("Mumbai");
  const [current, setCurrent] = useState({
    date: "",
    condition: "",
    img: "",
    temp: "",
    wind: "",
    windDirection: "",
    humidity: "",
    press: "",
  });

  const [loc, setLoc] = useState({
    name: "",
    country: "",
    tz_id: "",
  });

  const change_handler = (e) => {
    setLocation(e.target.value);
  };
  const submit_Handler = (e) => {
    e.preventDefault();
    call_Api();
  };
  useEffect(() => {
    call_Api();
  }, []);

  async function call_Api() {
    try {
      const res = await fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=${MY_KEY}&q=${location}&days=1&aqi=no&alerts=no`
      );
      const json = await res.json();
      console.log(json);

      if (json!="") {
        setCurrent({
          date: json.current.last_updated,
          condition: json.current.condition.text,
          img: json.current.condition.icon,
          temp: json.current.temp_c,
          wind: json.current.wind_kph,
          windDirection: json.current.wind_dir, // corrected field name
          humidity: json.current.humidity,
          press: json.current.pressure_mb,
        });

        setLoc({
          name: json.location.name,
          country: json.location.country,
          tz_id: json.location.tz_id,
        });

        if (loc.name || loc.country ) {
          toast.success("Location Found");
        } else {
          if (location==="") {
            toast.error("No matching location found.");
          }
        }
      }
      // console.log(items);
    } catch (error) {
      toast.error(error.message);
      console.log("No matching location found ");
    }
  }
  return (
    <div className="p-4 bg-[url('../public/images/12.jpg')] bg-cover min-h-screen h-full">
      <div className=" md:w-8/12 lg:w-7/12 mx-auto p-8 rounded-xl backdrop-blur-xl ">
        <div className=" flex flex-col justify-center mx-auto  rounded-md bg-[#ffffff08]">
          {/* search bar  */}
          <div className=" relative p-1 w-full mx-auto flex justify-center items-center  ">
            <IoIosSearch className="absolute left-4 font-bold text-white" />
            <input
              className="text-white capitalize bg-transparent w-full h-10 rounded-lg text-center font-semibold border border-gray-500"
              type="search "
              placeholder="search"
              name="location"
              value={location}
              onChange={change_handler}
            />
            <button
              className="absolute right-2 text-white p-2"
              type="submit"
              onClick={submit_Handler}
            >
              submit
            </button>
          </div>

          {/* section 1 */}
          <section className=" flex rounded-md gap-x-3 mt-3 justify-evenly items-center p-4 text-white">
            <div className=" p-8 flex justify-around items-center ">
              <div className="text-8xl ">
                <img
                  src={current.img}
                  className="min-h-[200px] min-w-[210px]"
                />
              </div>
              <div className="flex flex-col gap-y-4">
                <div className="text-md">{current.date}</div>
                <div className="text-3xl sm:text-4xl  ">{current.condition}</div>
                <p className="capitalize text-xl text-white ">
                  {loc.name} , {loc.tz_id}
                </p>
                {/* <div className="text-6xl">Partly Cloudy</div> */}
              </div>
            </div>
          </section>

          {/* section 2 */}
          <section className="gap-x-3 mt-3  rounded-md p-2 flex flex-col text-white ">
            <div className="backdrop-blur-sm backdrop-brightness-90  flex justify-center items-center"></div>
            <div className="p-4 flex flex-wrap justify-around items-center  ">
              <div className="bg-[#ffffff0f] rounded-md  flex flex-col  justify-center items-center m-2 gap-y-4 min-h-[100px] min-w-[140px]">
                <div className="flex gap-x-2">
                  <FaTemperatureHigh className="text-xl" />
                  <p>Temperature</p>
                </div>
                <p className="text-4xl font-semibold">
                  {current.temp} <span className="text-sm">C</span>
                </p>
              </div>
              <div className="bg-[#ffffff0f] rounded-md  flex flex-col  justify-center items-center m-2 gap-y-4 min-h-[100px] min-w-[140px]">
                <div className="flex gap-x-2">
                  <FaWind className="text-xl" />
                  <p>Wind </p>
                </div>
                <p className="text-4xl font-semibold">
                  {current.wind} <span className="text-sm">Kph</span>
                </p>
              </div>

              <div className="bg-[#ffffff0f] rounded-md  flex flex-col  justify-center items-center m-2 gap-y-4 min-h-[100px] min-w-[140px]">
                <div className="flex gap-x-2">
                  <GiFlowerTwirl className="text-xl" />
                  <p>Wind direction </p>
                </div>
                <p className="text-4xl font-semibold">
                  {current.windDirection}
                </p>
              </div>
              <div className="bg-[#ffffff0f] rounded-md  flex flex-col  justify-center items-center m-2 gap-y-4 min-h-[100px] min-w-[140px]">
                <div className="flex gap-x-2">
                  <WiHumidity className="text-xl" />
                  <p>Humidity </p>
                </div>
                <p className="text-4xl font-semibold">{current.humidity}</p>
              </div>
              <div className="bg-[#ffffff0f] rounded-md  flex flex-col  justify-center items-center m-2 gap-y-4 min-h-[100px] min-w-[140px]">
                <div className="flex gap-x-2">
                  <TbBrandSpeedtest className="text-xl" />
                  <p>Pressure </p>
                </div>
                <p className="text-4xl font-semibold">
                  {current.press} <span className="text-sm">Mb</span>
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>{" "}
    </div>
  );
};

export default Page;
