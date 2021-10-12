export interface IQuote {
  id: string;
  categories: string[];
  icon_url: string;
  value: string;
  charlieCount: number;
}

export type IQuotes = IQuote[];
