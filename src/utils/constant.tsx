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

export interface Coupon {
  _id:            string;
  is_active:      boolean;
  created_by:     null;
  deleted_at:     null;
  title:          string;
  coupon_code:    string;
  discount_value: number;
  start_date:     Date;
  end_date:       null;
  created_at:     Date;
  updated_at:     Date;
}

export interface ServiceWorker {
  _id:          string;
  is_active:    boolean;
  created_by:   null;
  deleted_at:   null;
  email:        string;
  phone_code:   string;
  phone_number: string;
  is_verified:  boolean;
  walletInfo:   any[];
  created_at:   Date;
  updated_at:   Date;
}

export interface Admin {
  _id:        string;
  is_active:  boolean;
  created_by: null;
  deleted_at: null;
  first_name: string;
  last_name:  string;
  email:      string;
  created_at: Date;
  updated_at: Date;
}

