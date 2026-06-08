export interface SOQuestion {
    question_id: number;
    title: string;
    body?: string;
    tags: string[];
    score: number;
    view_count: number;
    answer_count: number;
    is_answered: boolean;
    creation_date: number;
    link: string;
    owner: {
        display_name: string;
        profile_image?: string;
        reputation?: number;
    };
}

export interface SOAnswer {
    answer_id: number;
    body: string;
    score: number;
    is_accepted: boolean;
    creation_date: number;
    owner: {
        display_name: string;
        profile_image?: string;
        reputation?: number;
    };
}

export interface SOResponse<T> {
    items: T[];
    has_more: boolean;
    quota_remaining: number;
}