export interface HNStory {
    id: number;
    title: string;
    url?: string;
    by: string;
    score: number;
    time: number;
    descendants?: number;
    kids?: number[];
    type: string;
}

export interface HNComment {
    id: number;
    by?: string;
    text?: string;
    time: number;
    kids?: number[];
    deleted?: boolean;
    dead?: boolean;
    type: string;
}