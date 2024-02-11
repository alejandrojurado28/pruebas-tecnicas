export interface Book {
    title: string;
    pages: number;
    genre: string;
    cover: string;
    synopsis: string;
    year: number;
    ISBN: string;
    isStarred: boolean;
    author: {
      name: string;
      OtherBooks: string[];
    };
  }