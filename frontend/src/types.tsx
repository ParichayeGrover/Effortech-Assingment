export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  pan: string;
}

export interface UserFormInput {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  pan: string;
}
