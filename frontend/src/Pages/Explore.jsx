import React, { useState } from "react";
import toast from "react-hot-toast";
import Spinner from "../components/Spinner.jsx";
import Repos from "../components/Repos.jsx";

const Explore = () => {
  const [loading, setLoading] = useState(false);
  const [repos, setRepos] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("");

  const exploreRepos = async (language) => {
    setLoading(true);
    setRepos([]); // Clear existing repos before fetching new ones
    try {
      const res = await fetch(
        "/api/exploreRepos/repos/" + language
      );
      const data = await res.json();

      // Ensure that 'repos' is an array before setting it
      if (Array.isArray(data.repos)) {
        setRepos(data.repos);
      } else {
        throw new Error("Invalid response format");
      }

      setSelectedLanguage(language);
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4">
      <div className="bg-glass max-w-2xl mx-auto rounded-md p-4">
        <h1 className="text-xl font-bold text-center">
          Explore Popular Repositories
        </h1>
        <div className="flex flex-wrap gap-2 my-2 justify-center">
          <img
            src="/javascript.svg"
            alt="JavaScript logo"
            className="h-11 sm:h-20 cursor-pointer"
            onClick={() => exploreRepos("javascript")}
          />
          <img
            src="/typescript.svg"
            alt="TypeScript logo"
            className="h-11 sm:h-20 cursor-pointer"
            onClick={() => exploreRepos("typescript")}
          />
          <img
            src="/c++.svg"
            alt="C++ logo"
            className="h-11 sm:h-20 cursor-pointer"
            onClick={() => exploreRepos("c++")}
          />
          <img
            src="/python.svg"
            alt="Python logo"
            className="h-11 sm:h-20 cursor-pointer"
            onClick={() => exploreRepos("python")}
          />
          <img
            src="/java.svg"
            alt="Java logo"
            className="h-11 sm:h-20 cursor-pointer"
            onClick={() => exploreRepos("java")}
          />
        </div>
        {repos.length > 0 && (
          <h2 className="text-lg font-semibold text-center my-4">
            <span className="bg-blue-400 font-medium me-2 px-2.5 py-1 rounded-full">
              {selectedLanguage.toUpperCase()}
              {""}
            </span>
            Repositories
          </h2>
        )}
        {!loading && repos && repos.length > 0 && (
          <Repos repos={repos} alwaysFullWidth />
        )}
        {loading && <Spinner />}
      </div>
    </div>
  );
};

export default Explore;
