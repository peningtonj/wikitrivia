export interface Item {
  date_prop_id: string;
  description: string;
  id: string;
  image: string;
  instance_of: string[];
  label: string;
  occupations: string[] | null;
  page_views: number;
  wikipedia_title: string;
  data: string;
}

export type PlayedItem = Item & {
  played: {
    correct: boolean;
  };
};
