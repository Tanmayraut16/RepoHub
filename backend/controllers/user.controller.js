import User from "../models/user.model.js";

export const getUserProfileAndRepos = async (req, res) => {
  const { username } = req.params;
  try {
    // Fetch user profile
    const userResponse = await fetch(
      `https://api.github.com/users/${username}`,
      {
        headers: {
          authorization: `token ${process.env.GITHUB_API_KEY}`,
        },
      }
    );

    if (!userResponse.ok) {
      console.error("User fetch failed:", userResponse.statusText);
      throw new Error(`User fetch failed with status: ${userResponse.status}`);
    }

    const userProfile = await userResponse.json();

    // Fetch user repos
    const repoResponse = await fetch(userProfile.repos_url, {
      headers: {
        authorization: `token ${process.env.GITHUB_API_KEY}`,
      },
    });

    if (!repoResponse.ok) {
      console.error("Repos fetch failed:", repoResponse.statusText);
      throw new Error(`Repos fetch failed with status: ${repoResponse.status}`);
    }

    const repos = await repoResponse.json();

    res.status(200).json({ userProfile, repos });
  } catch (error) {
    console.error("Error in getUserProfileAndRepos:", error.message);
    res.status(500).json({ error: error.message });
  }
};

export const likeProfile = async (req, res) => {
  try {
    // Ensure user is authenticated
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { username } = req.params;

    // Validate username
    if (!username || typeof username !== "string") {
      return res.status(400).json({ error: "Invalid username" });
    }

    // Fetch users
    const user = await User.findById(req.user._id.toString());
    const userToLike = await User.findOne({ username });

    // Check if users exist
    if (!user || !userToLike) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if already liked
    if (user.liked.includes(userToLike.username)) {
      return res.status(400).json({ error: "User already liked" });
    }

    // Update likedBy and liked arrays
    userToLike.likedBy.push({
      username: user.username,
      avatarUrl: user.avatarUrl,
      likedDate: Date.now(),
    });
    user.liked.push(userToLike.username);

    // Save changes
    await Promise.all([userToLike.save(), user.save()]);

    res.status(200).json({ message: "User liked successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getLikes = async (req, res) => {
  try {
    const user = await User.findById(req.user._id.toString());
    res.status(200).json({ likedBy: user.likedBy });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
