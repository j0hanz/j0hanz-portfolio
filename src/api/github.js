const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

/* Fetches latest 5 commits for a GitHub repository */
export const fetchCommitHistory = async (repo) => {
  try {
    const [owner, repoName] = repo.split('/').slice(-2);
    const url = `https://api.github.com/repos/${owner}/${repoName}/commits`;
    const response = await fetch(url, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return Array.isArray(data) ? data.slice(0, 5) : [];
  } catch (error) {
    console.error('Error fetching commit history:', error);
    return [];
  }
};
