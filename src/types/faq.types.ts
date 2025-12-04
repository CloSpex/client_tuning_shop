import type { BaseCreator } from "./general.types";

export interface FAQ extends BaseCreator {
  question: string;
  answer?: string;
}

export interface CreateFAQ {
  question: string;
  answer: string;
}

export interface UpdateFAQ {
  question?: string;
  answer?: string;
}
