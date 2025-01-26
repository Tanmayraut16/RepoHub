import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaHeart } from "react-icons/fa";
import { useAuthContext } from "../context/AuthContext";

const LikeProfile = ({ userProfile }) => {
  const { authUser } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);

  const isOwnProfile = authUser?.username === userProfile.login;

  const handleLikeProfile = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/users/like/${userProfile.login}`, {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();

      if (data.error) throw new Error(data.error);

      toast.success("Profile liked successfully");
    } catch (error) {
      if (error.message === "Unauthorized") {
        toast.error("Please log in to like profiles");
      } else {
        toast.error(error.message || "Unable to like profile");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!authUser || isOwnProfile) return null;

  return (
    <button
      className={`p-2 text-xs w-full font-medium rounded-md bg-glass border border-blue-400 flex items-center gap-2 cursor-pointer ${
        isLoading ? "opacity-50 cursor-not-allowed" : ""
      }`}
      onClick={handleLikeProfile}
      disabled={isLoading}
    >
      <FaHeart size={20} /> {isLoading ? "Liking..." : "Like Profile"}
    </button>
  );
};

export default LikeProfile;
