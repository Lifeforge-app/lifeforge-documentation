import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";

function Header({
  sidebarOpen,
  setSidebarOpen,
}: {
  sidebarOpen: boolean;
  setSidebarOpen: (value: boolean) => void;
}) {
  return (
    <header className="w-full z-[55] sticky top-0 p-3 gap-8 flex items-center px-5 border-b-[1.5px] bg-zinc-900 border-zinc-800">
      <Link to="/" className="flex items-center gap-2">
        <Icon icon="tabler:hammer" className="w-8 h-8 text-teal-500" />
        <h1 className="text-2xl font-semibold hidden [@media(min-width:420px)]:block">
          LifeForge
          <span className="text-2xl ml-1 text-teal-500">.</span>
          <span className="text-xl ml-1 font-medium">Docs</span>
        </h1>
        <span className="text-xl ml-1 font-medium [@media(min-width:420px)]:hidden">
          Docs.
        </span>
      </Link>
      <div className="flex w-full justify-end items-center gap-2">
        <search className="bg-zinc-800/50 p-2 mr-2 pl-4 w-80 lg:w-96 gap-2 rounded-lg hidden md:flex items-center">
          <div className="flex items-center gap-2 w-full">
            <Icon icon="tabler:search" className="w-5 h-5 text-zinc-400" />
            <input
              type="text"
              placeholder="Search documentation..."
              className="p-1 bg-transparent w-full focus:outline-none placeholder-zinc-400"
            />
          </div>
          <div className="flex items-center text-zinc-400 bg-zinc-800/90 p-1 px-1.5 rounded-md">
            <Icon icon="tabler:command" className="w-4 h-4" />
            <span className="text-zinc-400 text-sm ml-0.5">K</span>
          </div>
        </search>
        <button className="p-2">
          <Icon icon="uil:moon" className="w-6 h-6 text-zinc-400" />
        </button>
        <a
          href="https://github.com/melvinchia3636/lifeforge-documentation"
          target="_blank"
          rel="noreferrer"
          className="p-2 block"
        >
          <Icon icon="uil:github" className="w-6 h-6 text-zinc-400" />
        </a>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 block xl:hidden"
        >
          <Icon icon="tabler:menu" className="w-6 h-6 text-zinc-400" />
        </button>
      </div>
    </header>
  );
}

export default Header;
