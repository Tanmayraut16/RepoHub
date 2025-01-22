export const getUserProfileAndRepos = async (req, res) => {
    const { username } = req.params;
    try {
      const userResponse = await fetch(
        `https://api.github.com/users/${username}`,
        {
          headers: {
            authorization: `token ${process.env.GITHUB_API_KEY}`,
          },
        }
      );
  
      if (!userResponse.ok) {
        throw new Error(`User fetch failed with status: ${userResponse.status}`);
      }
  
      const userProfile = await userResponse.json();
  
      const repoResponse = await fetch(userProfile.repos_url, {
        headers: {
          authorization: `token ${process.env.GITHUB_API_KEY}`,
        },
      });
  
      if (!repoResponse.ok) {
        throw new Error(`Repos fetch failed with status: ${repoResponse.status}`);
      }
  
      const repos = await repoResponse.json();
  
      res.status(200).json({ userProfile, repos });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  