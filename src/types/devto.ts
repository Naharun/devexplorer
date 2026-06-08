export interface Article {
    id: number;
    title: string;
    description: string;
    url: string;
    cover_image: string | null;
    published_at: string;
    reading_time_minutes: number;
    positive_reactions_count: number;
    comments_count: number;
    tag_list: string[];
    user: {
        name: string;
        username: string;
        profile_image: string;
    };
}

export interface Tag {
    id: number;
    name: string;
    bg_color_hex: string;
    text_color_hex: string;
}