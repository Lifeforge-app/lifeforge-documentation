import { Route, Routes, Navigate, Link } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Rightbar from "./components/Rightbar";
import Introduction from "./contents/GettingStarted/Introduction.mdx";
import Installation from "./contents/GettingStarted/Installation.mdx";
import Configuration from "./contents/GettingStarted/Configuration.mdx";
import Deployment from "./contents/GettingStarted/Deployment.mdx";
import Colors from "./contents/DesignSystem/Colors.mdx";
import Boilerplate from "./components/Boilerplate";
import { MDXComponents } from "mdx/types";
import { toLinkCase } from "./utils/string";

const components: MDXComponents = {
  em(properties) {
    return <i {...properties} />;
  },
  h6(properties) {
    return <h6 {...properties} className="text-lg font-medium text-teal-500" />;
  },
  h1(properties) {
    return <h1 {...properties} className="text-4xl mb-8 font-bold mt-2" />;
  },
  h2(properties) {
    return <h2 {...properties} className="text-3xl font-semibold mt-12" />;
  },
  p(properties) {
    return <p {...properties} className="mt-6 text-lg text-zinc-500" />;
  },
  hr(properties) {
    return (
      <hr
        {...properties}
        className="mt-12 mb-8 border-t-[1.5px] border-zinc-800"
      />
    );
  },
  a(properties) {
    return (
      <Link
        to={properties.href || ""}
        className="font-medium text-teal-500 underline"
      >
        {properties.children}
      </Link>
    );
  },
  ul(properties) {
    return <ul {...properties} className="mt-4 list-disc pl-6 space-y-4" />;
  },
  li(properties) {
    return <li {...properties} className="text-lg text-zinc-500" />;
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
        className="text-left px-4 py-2 border-[1.5px] border-zinc-800"
      />
    );
  },
};

function App() {
  return (
    <main className="w-full h-dvh overflow-y-scroll  bg-zinc-900 text-zinc-200 flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
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
            <Route path="/design-system">
              <Route
                path="colors"
                element={<Colors components={components} />}
              />
              <Route path="typography" element={<div>Typography</div>} />
            </Route>
          </Route>
        </Routes>
        <Rightbar />
      </div>
    </main>
  );
}

export default App;
