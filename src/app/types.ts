export interface Client {
  firstName: string;
  lastName: string;
  email: string;
  uid?: string;
  phone: string;
  balance: number;
}

export interface AuthData {
  name?: string;
  email: string;
  password: string;
}
