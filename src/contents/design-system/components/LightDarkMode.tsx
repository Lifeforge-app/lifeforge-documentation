import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";

function LightDarkMode() {
  const [mode, setMode] = useState<"light" | "dark">("light");

  return (
    <div className="w-full min-w-0 flex mt-6">
      <div className="w-full p-4 rounded-md bg-zinc-800/50">
        <div className="flex flex-col gap-4 md:flex-row items-center justify-between">
          <h3 className="text-xl font-semibold w-full text-left">
            Light/Dark Theme Preview
          </h3>
          <div className="flex w-full md:w-auto bg-zinc-800 rounded-md gap-2">
            <button
              onClick={() => setMode("light")}
              className={`p-2 px-4 w-1/2 justify-center rounded-md flex items-center font-medium gap-1 ${
                mode === "light"
                  ? "bg-teal-500 text-zinc-800"
                  : "bg-zinc-800 text-zinc-400"
              }`}
            >
              <Icon icon="uil:sun" className="w-5 h-5" />
              Light
            </button>
            <button
              onClick={() => setMode("dark")}
              className={`p-2 px-4 w-1/2 justify-center rounded-md flex items-center font-medium gap-1 ${
                mode === "dark"
                  ? "bg-teal-500 text-zinc-800"
                  : "bg-zinc-800 text-zinc-400"
              }`}
            >
              <Icon icon="uil:moon" className="w-5 h-5" />
              Dark
            </button>
          </div>
        </div>
        <img
          key={mode}
          src={`/assets/colors/${mode}.png`}
          alt="Light/Dark Mode"
          className="w-full mt-4 rounded-md"
        />
      </div>
    </div>
  );
}

export default LightDarkMode;
