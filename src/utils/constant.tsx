export interface Pagination {
  totalIndex: number;
  startingIndex: number;
  endingIndex: number;
}

export interface Splash {
  _id: string;
  is_active: boolean;
  created_by: null;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  title: string;
  type: string;
  description: string;
  logo: string;
  images: string;
}

export interface Enum {
  _id: string;
  is_active: boolean;
  created_by: null;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
  key: string;
  value_type: string;
  values:
    | [""]
    | [
        {
          type: string;
          image: string;
        }
      ];
}
