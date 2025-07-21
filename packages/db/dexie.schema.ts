import Dexie, { type Table } from 'dexie';

export interface User {
    id?: number;
    name: string;
    email: string;
    createdAt: Date;
}

export interface Bookmark {
    id?: string; // Use the browser bookmark ID as string
    title: string;
    url: string;
    dateAdded: number;
    parentId?: string;
}

export class BrowserSyncDB extends Dexie {
    users!: Table<User, number>;
    bookmarks!: Table<Bookmark, string>;

    constructor() {
        super('BrowserSyncDB');
        this.version(1).stores({
            users: '++id, name, email, createdAt',
            bookmarks: 'id, title, url, dateAdded, parentId',
        });
    }
}

export const db = new BrowserSyncDB(); 