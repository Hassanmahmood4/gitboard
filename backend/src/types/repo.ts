/**
 * Subset of the GitHub REST API repository payload used by GitBoard.
 * @see https://docs.github.com/en/rest/repos/repos#list-repositories-for-a-user
 */
export type GitHubRepo = {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  private: boolean;
};
