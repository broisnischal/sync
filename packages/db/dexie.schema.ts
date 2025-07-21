import Dexie, { Table } from 'dexie';

export interface User {
    id?: number;
    name: string;
    email: string;
    createdAt: Date;
}

export class BrowserSyncDB extends Dexie {
    users!: Table<User, number>;

    constructor() {
        super('BrowserSyncDB');
        this.version(1).stores({
            users: '++id, name, email, createdAt',
        });
    }
}

export const db = new BrowserSyncDB(); 