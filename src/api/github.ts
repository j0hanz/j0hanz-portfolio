const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN as string | undefined;

interface Commit {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    };
  };
}

// Fetch commit history from GitHub API
export const fetchCommitHistory = async (
  repo: string,
  limit = 5,
): Promise<Commit[]> => {
  const parts = repo.split('/');
  if (parts.length < 2) {
    console.error('Invalid repository format. Expected "owner/repo".');
    return [];
  }

  // Extract owner and repository name
  const [owner, repoName] = parts.slice(-2);
  const url = `https://api.github.com/repos/${owner}/${repoName}/commits`;

  try {
    // Add authorization header if token is available
    const headers: Record<string, string> = GITHUB_TOKEN
      ? { Authorization: `token ${GITHUB_TOKEN}` }
      : {};

    // Fetch the commit history from the GitHub API
    const response = await fetch(url, { headers });
    if (!response.ok) {
      throw new Error(
        `GitHub API error (${response.status}): ${response.statusText}`,
      );
    }

    // Parse the JSON response
    const data = await response.json();
    if (!Array.isArray(data)) {
      console.error('Unexpected response format.');
      return [];
    }

    // Return the limited number of commits
    return data.slice(0, limit) as Commit[];
  } catch (error: any) {
    console.error('Error fetching commit history:', error.message);
    return [];
  }
};
