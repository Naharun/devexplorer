export interface RepositoryOwner {
    login: string;
    avatar_url: string;
}

export interface Repository {
    id: number;
    name: string;
    description: string | null;
    stargazers_count: number;
    forks_count: number;
    language: string | null;
    owner: RepositoryOwner;
}

export interface SearchRepositoriesResponse {
    items: Repository[];
    total_count: number;
}
export interface RepositoryLanguage {
    [key: string]: number;
}

export interface Contributor {
    id: number;
    login: string;
    avatar_url: string;
    contributions: number;
}
