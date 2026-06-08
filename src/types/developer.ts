export interface Developer {
    id: number;
    username: string;
    avatar: string;
    repositories: number;
    followers: number;
}

export interface GitHubUser {
    id: number;
    login: string;
    avatar_url: string;
    type: string;
}

export interface SearchUsersResponse {
    total_count: number;
    items: GitHubUser[];
}

export interface UserProfile {
    id: number;
    login: string;
    avatar_url: string;
    name: string | null;
    followers: number;
    following: number;
    public_repos: number;
    bio: string | null;
    html_url: string;
    location: string | null;
    company: string | null;
    blog: string | null;
    twitter_username: string | null;
    created_at: string;
}