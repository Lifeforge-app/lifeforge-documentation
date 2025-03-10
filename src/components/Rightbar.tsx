import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
import { toLinkCase, toTitleCase } from "../utils/string";
import { Link, useLocation } from "react-router-dom";

function Rightbar() {
  const [allSections, setAllSections] = useState<string[]>([]);
  const [activeSection, setActiveSection] = useState<string>("");
  const location = useLocation();

  useEffect(() => {
    const sections = document.querySelectorAll("article section");
    const _allSections: string[] = [];
    sections.forEach((heading) => {
      _allSections.push(heading.querySelector("h2,h6")?.textContent || "");
    });
    setAllSections(_allSections);

    // Reset active section when location changes
    setActiveSection("");

    // Create a map to track intersection ratios
    const sectionIntersectionRatios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id || "";
          const sanitizedId = toLinkCase(id);

          // Store the intersection ratio for this section
          sectionIntersectionRatios.set(sanitizedId, entry.intersectionRatio);
        });

        // Find the section with the highest intersection ratio
        let highestRatio = 0;
        let mostVisibleSection = "";

        sectionIntersectionRatios.forEach((ratio, id) => {
          if (ratio > highestRatio) {
            highestRatio = ratio;
            mostVisibleSection = id;
          }
        });

        // Only update if we have a visible section and it's different from current
        if (mostVisibleSection && mostVisibleSection !== activeSection) {
          setActiveSection(mostVisibleSection);

          // Remove current highlight from all section links
          document.querySelectorAll("li[aria-current=page]").forEach((li) => {
            li.removeAttribute("aria-current");
          });

          // Highlight the current section in the sidebar
          const activeLink = document.querySelector(
            `li a#${mostVisibleSection}`
          );
          if (activeLink?.parentElement) {
            activeLink.parentElement.setAttribute("aria-current", "page");
          }
        }
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
        rootMargin: "-10% 0px -70% 0px", // Adjust these values to fine-tune when sections become active
      }
    );

    sections.forEach((section) => {
      if (section.id) {
        observer.observe(section);
      } else {
        // If section doesn't have an ID, try to create one from its heading
        const heading = section.querySelector("h2,h6");
        if (heading && heading.textContent) {
          section.id = toLinkCase(heading.textContent.replace(/\./g, ""));
          observer.observe(section);
        }
      }
    });

    return () => {
      document.querySelectorAll("li[aria-current=page]").forEach((li) => {
        li.removeAttribute("aria-current");
      });
      observer.disconnect();
    };
  }, [location]);

  return (
    <aside className="w-80 fixed top-20 hidden lg:block right-0 h-full p-12 overflow-y-auto min-h-0">
      <h2 className="text-lg font-semibold">On This Page</h2>
      <ul className="mt-4 relative before:z-[-1] isolate before:h-full before:border-r-[1.5px] before:border-zinc-800 before:absolute before:top-0 before:left-0">
        {allSections.map((item, index) => {
          const itemId = toLinkCase(item.replace(/\./g, ""));
          return (
            <li
              key={index}
              className="py-2 px-4 cursor-pointer aria-[current=page]:font-semibold aria-[current=page]:text-primary aria-[current=page]:border-l-[2.5px] aria-[current=page]:border-primary text-zinc-500 hover:text-zinc-100 hover:font-medium"
              aria-current={activeSection === itemId ? "page" : undefined}
            >
              <Link
                id={itemId}
                to={`#${itemId}`}
                onClick={() => setActiveSection(itemId)}
              >
                {item}
              </Link>
            </li>
          );
        })}
      </ul>
      <a
        href={`https://github.com/melvinchia3636/lifeforge-documentation/edit/main/src/contents/${
          location.pathname.split("/")?.[1]
        }/${toTitleCase(
          location.pathname.split("/")?.[2]?.replace(/-/g, " ") || ""
        )}.mdx`}
        target="_blank"
        rel="noreferrer"
        className="mt-6 flex items-center font-medium gap-2 text-zinc-100 hover:underline"
      >
        Edit this page
        <Icon icon="tabler:arrow-up-right" className="w-5 h-5 -mb-1" />
      </a>
      <a
        href="https://github.com/melvinchia3636/lifeforge/issues/new"
        target="_blank"
        rel="noreferrer"
        className="mt-4 flex items-center font-medium gap-2 text-zinc-100 hover:underline"
      >
        Issue Report
        <Icon icon="tabler:arrow-up-right" className="w-5 h-5 -mb-1" />
      </a>
      <a
        href="https://github.com/melvinchia3636/lifeforge"
        target="_blank"
        rel="noreferrer"
        className="mt-4 flex items-center font-medium gap-2 text-zinc-100 hover:underline"
      >
        Star on GitHub
        <Icon icon="tabler:arrow-up-right" className="w-5 h-5 -mb-1" />
      </a>
    </aside>
  );
}

export default Rightbar;
