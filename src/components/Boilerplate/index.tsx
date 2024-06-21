import { Icon } from "@iconify/react/dist/iconify.js";
import { Outlet, useLocation } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import { useEffect } from "react";

function Boilerplate() {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const element = document.getElementById(hash.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location]);

  return (
    <article className="flex-1 ml-[20rem] h-full p-12 overflow-y-auto min-h-0">
      <div className="w-[70%] min-w-0">
        <Outlet />
        <NavigationBar />
        <hr className="my-12 border-t-[1.5px] border-zinc-800" />
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="flex items-center gap-2 text-zinc-500">
            <Icon icon="tabler:creative-commons" className="size-6" />
            <Icon icon="tabler:creative-commons-by" className="size-6" />
            <Icon icon="tabler:creative-commons-nc" className="size-6" />
            <Icon icon="tabler:creative-commons-sa" className="size-6" />
          </div>
          <p className="text-center text-sm text-zinc-500">
            A project by{" "}
            <a
              className="text-teal-500 underline"
              target="_blank"
              href="https://thecodeblog.net"
              rel="noreferrer"
            >
              Melvin Chia
            </a>{" "}
            licensed under{" "}
            <a
              className="text-teal-500 underline"
              target="_blank"
              href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
              rel="noreferrer"
            >
              CC BY-NC-SA 4.0
            </a>
            .
          </p>
        </div>
      </div>
    </article>
  );
}

export default Boilerplate;
