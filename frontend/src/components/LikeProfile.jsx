import React from "react";
import toast from "react-hot-toast";
import { FaHeart } from "react-icons/fa"; // Import the FaHeart icon
import { useAuthContext } from "../context/AuthContext";

const LikeProfile = ({ userProfile }) => {
  const { authUser } = useAuthContext();

  const isOwnProfile = authUser?.username === userProfile.login;

  const handleLikeProfile = async () => {
    try {
      const res = await fetch(`/api/users/like/${userProfile.login}`, {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();

      if (data.error) throw new Error(data.error);

      toast.success("Profile liked successfully");
    } catch (error) {
      toast.error(error.message || "Unable to like profile");
    }
  };

  if (!authUser || isOwnProfile) return null;

  return (
    <button
      className="p-2 text-xs w-full font-medium rounded-md bg-glass border border-blue-400 flex items-center gap-2 cursor-pointer"
      onClick={handleLikeProfile}
    >
      <FaHeart size={20} /> Like Profile
    </button>
  );
};

export default LikeProfile;
