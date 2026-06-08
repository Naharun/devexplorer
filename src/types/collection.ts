export type CollectionItemType =
    | "repository"
    | "developer"
    | "article";

export interface CollectionItem {
    id: string;
    type: CollectionItemType;
    title: string;
}

export interface Collection {
    id: string;
    name: string;
    items: CollectionItem[];
}