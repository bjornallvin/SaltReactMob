export interface IUser {
  userId: string;
  loggedIn: string;
  bankAccountNo: string;
  status: string;
}

export interface IFail {
  failedAt?: string;
  message: string;
  status: string;
}

export interface ILogout {
  userId: string;
  loggedOut: string;
  status: string;
}

export interface IUserInput {
  userId: string;
  password: string;
}
