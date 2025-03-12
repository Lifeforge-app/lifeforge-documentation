import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

function Notes({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full p-4 bg-zinc-800 mt-6 rounded-md border-l-4 border-primary">
      <div className="flex items-center gap-2">
        <Icon icon="tabler:info-circle" className="w-6 h-6 text-primary" />
        <h3 className="text-xl font-semibold">Notes</h3>
      </div>
      <p className="text-base -mt-2">{children}</p>
    </div>
  );
}

export default Notes;
