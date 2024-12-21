const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

/* Fetch commit history from GitHub */
export const fetchCommitHistory = async (repo) => {
  try {
    /* Extract owner and repo name from the repo string */
    const [owner, repoName] = repo.split('/').slice(-2);
    /* Construct the GitHub API URL for fetching commits */
    const url = `https://api.github.com/repos/${owner}/${repoName}/commits`;
    /* Make the API request with the authorization header */
    const response = await fetch(url, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });
    /* Check if the response is not ok */
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Repository not found');
      } else if (response.status === 401) {
        throw new Error('Unauthorized access - check your token');
      } else {
        throw new Error(`Error: ${response.statusText}`);
      }
    }
    /* Parse the response data as JSON */
    const data = await response.json();
    return Array.isArray(data) ? data.slice(0, 5) : [];
  } catch (error) {
    console.error('Error fetching commit history:', error.message);
    return [];
  }
};
