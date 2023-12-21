import React from "react";
import { BsInfoCircle } from "react-icons/bs";
import { LuMapPin } from "react-icons/lu";
import { MdOutlineCancel } from "react-icons/md";
// import { MdSearch } from 'react-icons/md';

function Navbar(props) {
  return (
    <div className=" bg-white ">
     <div className="flex justify-center">
        <div className="flex justify-center basis-1/2 sm:basis-1/3 items-center">
        <img className="h-20" src="assets/logo.png"/>
      </div>
      <div className="flex justify-center basis-1/2 sm:basis-1/3 items-center">
        <div className="invisible sm:visible m-5 pr- pl- p-2 rounded-3xl bg-gray-700 flex justify-center">

        <input placeholder="Search a Community" value={props.search} onFocus={(e)=>e.target.placeholder=""} onBlur={(e)=>e.target.placeholder="Search a Community"} onChange={(e)=> props.setSearch(e.target.value)}className="h-7 w-4/5 text-center focus:text-left bg-gray-700 overflow-hidden outline-none cursor-pointer text-white  text-sm " type="text" />
        </div>
      </div>
      <div className="flex justify-center basis-1/3 items-center">
     <button><BsInfoCircle onClick={()=>props.setInfo(!props.info)}className="text-3xl transform scale-100 hover:scale-110 animate-pulse transition-transform duration-300" /></button>
      </div>
      </div>
    </div>
  );
}

export default Navbar;
