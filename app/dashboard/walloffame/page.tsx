"use client";

import { LayoutGridDemo } from "@/components/WallOfFame";
import { Eye, Code } from "lucide-react";
import { useState } from "react";

export default function WallOfFame() {
  return (
    <div>
      <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-zinc-800">
        Fame Wall.
      </h1>
      <ToggleButton />

      <LayoutGridDemo />
    </div>
  );
}

const ToggleButton = () => {
  const [activeButton, setActiveButton] = useState("preview");

  return (
    <div className="relative flex flex-row justify-around items-center bg-gray-100 w-[200px] h-[40px] mt-4 rounded-lg   ">
      <div
        className={`absolute top-0 left-0 w-[100px] h-[30px] bg-white  rounded-lg transition-transform duration-300 ml-1  mt-1   ${
          activeButton === "code" ? "translate-x-full w-[90px] ml-4" : ""
        }`}
      ></div>

      <button
        onClick={() => setActiveButton("preview")}
        className="flex items-center font-medium text-gray-700 z-10 hover:text-black transition-colors"
      >
        <Eye className="mr-2 w-4" />
        Preview
      </button>

      <button
        onClick={() => setActiveButton("code")}
        className="flex items-center font-medium text-gray-700 z-10 hover:text-black transition-colors"
      >
        <Code className="mr-2 w-4" />
        Code
      </button>
    </div>
  );
};
