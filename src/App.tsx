import { Route, Routes, Navigate, Link } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Rightbar from "./components/Rightbar";
import Introduction from "./contents/getting-started/Introduction.mdx";
import Installation from "./contents/getting-started/Installation.mdx";
import Configuration from "./contents/getting-started/Configuration.mdx";
import Deployment from "./contents/getting-started/Deployment.mdx";

import Boilerplate from "./components/Boilerplate";
import { MDXComponents } from "mdx/types";
import { useState } from "react";

const components: MDXComponents = {
  em(properties) {
    return <i {...properties} />;
  },
  h6(properties) {
    return (
      <h6 {...properties} className="sm:text-lg font-medium text-primary" />
    );
  },
  h1(properties) {
    return (
      <h1
        {...properties}
        className="text-3xl sm:text-4xl mb-6 sm:mb-8 font-bold mt-2"
      />
    );
  },
  h2(properties) {
    return (
      <h2
        {...properties}
        className="text-2xl sm:text-3xl font-semibold mt-8 sm:mt-12"
      />
    );
  },
  h3(properties) {
    return (
      <h3 {...properties} className="text-xl sm:text-2xl font-semibold mt-6" />
    );
  },
  p(properties) {
    return (
      <p {...properties} className="mt-4 sm:mt-6 sm:text-lg text-zinc-500" />
    );
  },
  hr(properties) {
    return (
      <hr
        {...properties}
        className="mt-8 mb-4 sm:mt-12 sm:mb-8 border-t-[1.5px] border-zinc-800"
      />
    );
  },
  a(properties) {
    return (
      <Link
        to={properties.href || ""}
        className="font-medium text-primary underline"
      >
        {properties.children}
      </Link>
    );
  },
  ul(properties) {
    return <ul {...properties} className="mt-4 list-disc pl-6 space-y-4" />;
  },
  li(properties) {
    return <li {...properties} className="sm:text-lg text-zinc-500" />;
  },
  strong(properties) {
    return <strong {...properties} className="font-semibold text-zinc-100" />;
  },
  code(properties) {
    return (
      <div className="bg-zinc-800 rounded-md mt-6">
        <code {...properties} />
      </div>
    );
  },
  table(properties) {
    return (
      <table
        {...properties}
        className="w-full mt-6 border-collapse border-[1.5px] border-zinc-800"
      />
    );
  },
  th(properties) {
    return (
      <th
        {...properties}
        className="text-left px-4 py-2 border-[1.5px] border-zinc-800"
      />
    );
  },
  td(properties) {
    return (
      <td
        {...properties}
        className="text-left first:break-all px-4 py-2 border-[1.5px] border-zinc-800"
      />
    );
  },
  img(properties) {
    return <img {...properties} className="w-full rounded-lg" />;
  },
};

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <main className="w-full h-dvh bg-zinc-900 text-zinc-200 flex flex-col">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex flex-1">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/getting-started/introduction" />}
          />
          <Route element={<Boilerplate />}>
            <Route path="/getting-started">
              <Route
                path="introduction"
                element={<Introduction components={components} />}
              />
              <Route
                path="installation"
                element={<Installation components={components} />}
              />
              <Route
                path="configuration"
                element={<Configuration components={components} />}
              />
              <Route
                path="deployment"
                element={<Deployment components={components} />}
              />
            </Route>
          </Route>
        </Routes>
        <Rightbar />
      </div>
    </main>
  );
}

export default App;
