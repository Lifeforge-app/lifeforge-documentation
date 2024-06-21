import { Link, useLocation } from "react-router-dom";
import { toLinkCase } from "../utils/string";
import SECTIONS from "../constants/Sections";

function Sidebar({ sidebarOpen }: { sidebarOpen: boolean }) {
  const location = useLocation();

  return (
    <>
      <div
        className={`w-full h-screen fixed top-0 left-0 transition-all ${
          sidebarOpen
            ? "bg-black/20 backdrop-blur-md z-40"
            : "bg-transparent filter-none z-[-1]"
        }`}
      ></div>
      <aside
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full xl:translate-x-0"
        } w-10/12 xl:w-80 z-50 bg-zinc-900 h-[calc(100%-2rem)] transition-all p-12 space-y-6 fixed left-0 flex-1 overflow-y-auto`}
      >
        {Object.entries(SECTIONS).map(([title, items]) => (
          <div key={title}>
            <h2 className="text-lg font-semibold">{title}</h2>
            <div className="mt-4 relative before:z-[-1] isolate before:h-full before:border-r-[1.5px] before:border-zinc-800 before:absolute before:top-0 before:left-0">
              {items.map((item) => (
                <Link
                  onClick={() => document.querySelector("main")?.scrollTo(0, 0)}
                  to={`/${toLinkCase(title)}/${toLinkCase(item)}`}
                  key={`${title}-${item}`}
                  className={`py-2 px-4 block cursor-pointer transition-all ${
                    location.pathname ===
                    `/${toLinkCase(title)}/${toLinkCase(item)}`
                      ? "font-semibold text-teal-500 border-l-[2.5px] border-teal-500 hover:text-teal-600"
                      : "text-zinc-500 hover:text-zinc-100 hover:font-medium"
                  }`}
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </aside>
    </>
  );
}

export default Sidebar;
