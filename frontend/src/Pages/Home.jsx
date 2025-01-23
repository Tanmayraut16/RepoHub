import React, { useCallback, useEffect, useState } from "react";
import Search from "../components/Search";
import SortRepos from "../components/SortRepos";
import ProfileInfo from "../components/ProfileInfo";
import Repos from "../components/Repos";
import Spinner from "../components/Spinner";
import toast from "react-hot-toast";

const Home = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortType, setSortType] = useState("recent");

  const getUserProfileAndRepos = useCallback(
    async (username = "Tanmayraut16") => {
      setLoading(true);
      try {
        const res = await fetch(`/api/users/profile/${username}`);
        if (!res.ok) {
          throw new Error(`Error fetching data: ${res.statusText}`);
        }
        const { repos, userProfile } = await res.json();
        repos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setRepos(repos);
        setUserProfile(userProfile);
      } catch (error) {
        toast.error(error.message);
        console.error(error);
        setUserProfile(null);
        setRepos([]);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    getUserProfileAndRepos();
  }, [getUserProfileAndRepos]);

  const onSearch = async (e, username) => {
    e.preventDefault();
    await getUserProfileAndRepos(username);
    setSortType("recent");
  };

  const onSort = (sortType) => {
    let sortedRepos;
    if (sortType === "recent") {
      sortedRepos = [...repos].sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
    } else if (sortType === "stars") {
      sortedRepos = [...repos].sort(
        (a, b) => b.stargazers_count - a.stargazers_count
      );
    } else if (sortType === "forks") {
      sortedRepos = [...repos].sort((a, b) => b.forks_count - a.forks_count);
    }
    setSortType(sortType);
    setRepos(sortedRepos);
  };

  return (
    <div className="m-4">
      <Search onSearch={onSearch} />
      {repos.length > 0 && <SortRepos onSort={onSort} sortType={sortType} />}
      <div className="flex gap-4 flex-col lg:flex-row justify-center items-start">
        {userProfile && !loading && <ProfileInfo userProfile={userProfile} />}
        {!loading && <Repos repos={repos} />}
        {loading && <Spinner />}
      </div>
    </div>
  );
};

export default Home;
