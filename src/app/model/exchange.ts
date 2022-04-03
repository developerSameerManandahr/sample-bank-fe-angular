export interface Exchange {
  success: boolean;
  base: boolean;
  date: string;
  rates: Rate
}

interface Rate {
  [key: string]: number;
}
