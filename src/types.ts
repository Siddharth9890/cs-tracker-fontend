export type Topic = {
  title: string;
  description: string;
  questions: Question[];
};

export type Question = {
  name: string;
  solvingLink: string;
  solutionLink: string;
  bookMark: boolean;
  revisionDate: null | Date;
  note: string;
};

export type PageWithParams<Params = any> = { params: Params };
