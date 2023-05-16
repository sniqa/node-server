export interface WithId {
  _id: string;
}

export interface QeuryOptions {
  page: number;
  length: number;
}

export const defaultQueryOptions: QeuryOptions = {
  page: 0,
  length: 30,
};
