import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
import { toLinkCase } from "../utils/string";
import { Link, useLocation } from "react-router-dom";

function Rightbar() {
  const [allSections, setAllSections] = useState<string[]>([]);
  const location = useLocation();

  useEffect(() => {
    const sections = document.querySelectorAll("article section");
    const _allSections: string[] = [];
    sections.forEach((heading) => {
      _allSections.push(heading.querySelector("h2")?.textContent || "");
    });
    setAllSections(_allSections);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = toLinkCase(entry.target.id || "");
          if (entry.isIntersecting) {
            document
              .querySelector(`li a#${id}`)
              ?.parentElement?.setAttribute("aria-current", "page");
          } else {
            document
              .querySelector(`li a#${id}`)
              ?.parentElement?.removeAttribute("aria-current");
          }
        });
      },
      {
        threshold: 0.5,
      }
    );
    sections.forEach((heading) => {
      observer.observe(heading);
    });
    return () => {
      document.querySelectorAll("li[aria-current=page]").forEach((li) => {
        li.removeAttribute("aria-current");
      });
      observer.disconnect();
    };
  }, [location]);

  return (
    <aside className="w-1/5 fixed top-20 right-0 h-full p-12 overflow-y-auto min-h-0">
      <h2 className="text-lg font-semibold">On This Page</h2>
      <ul className="mt-4 relative before:z-[-1] isolate before:h-full before:border-r-[1.5px] before:border-zinc-800 before:absolute before:top-0 before:left-0">
        {allSections.map((item, index) => (
          <li
            key={index}
            className="py-2 px-4 cursor-pointer aria-[current=page]:font-semibold aria-[current=page]:text-teal-500 aria-[current=page]:border-l-[2.5px] aria-[current=page]:border-teal-500 text-zinc-500 hover:text-zinc-100 hover:font-medium"
          >
            <Link
              id={toLinkCase(item.replace(/\./g, ""))}
              to={`#${toLinkCase(item.replace(/\./g, ""))}`}
            >
              {item}
            </Link>
          </li>
        ))}
      </ul>
      <a
        href="#"
        className="mt-6 flex items-center font-medium gap-2 text-zinc-100 hover:underline"
      >
        Edit this page
        <Icon icon="tabler:arrow-up-right" className="w-5 h-5 -mb-1" />
      </a>
      <a
        href="#"
        className="mt-4 flex items-center font-medium gap-2 text-zinc-100 hover:underline"
      >
        Issue Report
        <Icon icon="tabler:arrow-up-right" className="w-5 h-5 -mb-1" />
      </a>
      <a
        href="#"
        className="mt-4 flex items-center font-medium gap-2 text-zinc-100 hover:underline"
      >
        Star on GitHub
        <Icon icon="tabler:arrow-up-right" className="w-5 h-5 -mb-1" />
      </a>
    </aside>
  );
}

export default Rightbar;
