export type Topic = {
  title: string;
  description: string;
  questions: Question[];
};

export type Question = {
  name: string;
  solvingLink: string;
  solutionLink: string;
  id: number;
};

export type QuestionMeta = {
  question: Question;
  isBookMark: boolean;
  note: string;
  revisionDate: null | Date;
  checked: boolean;
};

export enum UpdateType {
  SELECTED = "SELECTED",
  META_UPDATED = "META_UPDATED",
}

export type PageWithParams<Params = any> = { params: Params };
