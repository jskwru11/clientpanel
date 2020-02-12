export interface Client {
  firstName: string;
  lastName: string;
  email: string;
  uid?: string;
  phone: string;
  balance: number;
}

export interface AuthData {
  email: string;
  password: string;
}
