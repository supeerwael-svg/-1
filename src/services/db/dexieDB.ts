import Dexie, { Table } from 'dexie';

export class ProfessorWalletDB extends Dexie {
  files!: Table<any, string>;
  users!: Table<any, string>;
  academicYears!: Table<any, string>;
  settings!: Table<any, string>;

  constructor() {
    super('ProfessorWalletDB');
    this.version(1).stores({
      files: 'id, category, level, subject, term, isFavorite, updatedAt, ownerId, schoolId, academicYearId, *tags',
      users: 'id, username, role, schoolId',
      academicYears: 'id, name, isArchived',
      settings: 'key'
    });
  }
}

export const db = new ProfessorWalletDB();
