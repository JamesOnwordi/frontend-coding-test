import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar/Navbar";

function Home() {
  const [communities, setCommunities] = useState([]);
  const [homes, setHomes] = useState([]);
  // to keep track of both communities' and homes' axios call.
  const updatesComplete = useRef({ communities: false, homes: false });
  const [all, setAll] = useState([]);
  const [toshow, setToShow] = useState([]);
  const [search, setSearch] = useState([]);
  const [info, setInfo] = useState([]);
  const strings = [
    "Welcome to Calgary! Home to bustling urban areas and quiet rural neigborhoods alike, the city is divided into more than 184 communities. The Calgary community map is further broken down into quadrants (Northwest, Northeast, Southwest, and Southeast), with eight zones that you can search in. Feel free to explore the beautiful residential communities and park the city has to offer.",
  ];

  useEffect(() => {
    axios
      .get("/api/communities.json")
      .then((response) => {
        setCommunities(response.data);
        updatesComplete.current.communities = true;
      })
      // for handling error with api call
      .catch((error) => {
        console.error("Error fetching data", error);
        if (error.response) {
          console.error("Server error", error.response.data);
          console.error("Status code:", error.response.status);
        } else if (error.request)
          console.error("No response from the server:", error.request);
        else console.error("Error setting up request:", error.message);
      });
    axios
      .get("/api/homes.json")
      .then((response) => {
        setHomes(response.data);
        updatesComplete.current.homes = true;
      })
      .catch((error) => {
        console.error("Error fetching data", error);
        if (error.response) {
          console.error("Server error", error.response.data);
          console.error("Status code:", error.response.status);
        } else if (error.request)
          console.error("No response from the server:", error.request);
        else console.error("Error setting up request:", error.message);
      });
  }, []);

  useEffect(() => {
    if (updatesComplete.current.communities && updatesComplete.current.homes) {
      if (communities) {
        const val = communities
          .map((community, ind) => {
            const presentHome = homes.find(
              (element) => element.communityId === community.id
            );

            // adds extra pictures to the database
            if (community.name == "Oakridge")
              community.imgUrl = "assets/oakridge.jpeg";
            if (community.name == "Rosedale")
              community.imgUrl = "assets/rosedale.jpg";
            if (community.name == "AuburnBay") community.group = "South East";

            if (presentHome)
              return {
                name: community.name,
                image: community.imgUrl,
                type: presentHome.type,
                price: presentHome.price,
                group: community.group,
              };
          })
          .sort((a, b) => {
            return a.name[0].localeCompare(b.name[0]);
          });
        setAll(val);
        display(val);
      }
    }
  }, [communities, homes]);

  useEffect(() => {
    display(
      all.filter((selected) => {
        if (search.length)
          if (selected)
            return selected.name.toLowerCase().includes(search.toLowerCase());
      })
    );
    if (!search) display(all);
  }, [search]);

  const display = (all) => {
    setToShow(
      all.map((value, ind) => {
        if (value)
          return (
            <div key={value + ind}>
              <div className="sm:w-80 rounded bg-white border-2 border-teal-900 transition ease-in-out delay-100 hover:shadow-2xl  hover:scale-105 shadow-lg m-4 sm:m-8">
                <div className="sm:m-6 h-56 flex justify-center items-center overflow-hidden  h-fill duration-200 ">
                  <img
                    className="transition w-full h-56 object-cover ease-in-out delay-150  h-fill  duration-200 rounded "
                    src={value.image}
                  />
                </div>
                <div className="m-5">
                  <div>
                    <p className="text-xl text-blue-300 font-medium">
                      {value.name}
                    </p>
                  </div>
                  <div className="text-teal-600 italic">
                    The community of {value.name}, is located in the
                    {value.area} at the {value.group} part of Calgary with
                    majority of it's buildings being {value.type}.
                  </div>
                  <div className="text-base ">
                    The average price of homes in {value.name} is: $
                    {value.price.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          );
      })
    );
  };

  return (
    <>
      <Navbar
        search={search}
        setSearch={setSearch}
        info={info}
        setInfo={setInfo}
      />

      <div className="m-h-96 overflow:hidden">
        {!info && (
          <div>
            <div className="sm:ml-36 sm:mr-36 ml-6 mr-6 border-2 border-black p-4">
              {strings}
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-center flex-wrap">{toshow}</div>
    </>
  );
}

export default Home;
