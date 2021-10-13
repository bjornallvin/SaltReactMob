import { IFail, ILogout, IUser, IUserInput } from "../../types/auth";

export async function login({
  userId,
  password,
}: IUserInput): Promise<IUser | IFail> {
  console.log("USER : ", userId);
  const response = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, password }),
  });
  const result = await response.json();

  return result;
}

export async function logout(userId): Promise<ILogout | IFail> {
  const response = await fetch("/api/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId }),
  });
  const result = await response.json();

  return result;
}
