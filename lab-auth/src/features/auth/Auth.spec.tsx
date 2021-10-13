import { fireEvent, prettyDOM, render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import { Provider } from "react-redux";

jest.mock("./authApi", () => ({
  login: ({ userId, password }: { userId: string; password: string }) => {
    console.log("sfdf", userId, password);
    return new Promise<IUser>((resolve, reject) =>
      setTimeout(
        () =>
          userId !== "mrauthoto"
            ? reject({ error: "We all hate you!" })
            : resolve({
                userId: userId,
                loggedIn: new Date().toUTCString(),
                bankAccountNo: "25622-235-215",
                status: "login succeeded",
              }),
        500
      )
    );
  },
}));

import { makeStore } from "../../app/store";
import { IUser } from "../../types/auth";
import Auth from "./Auth";

describe("<Auth />", () => {
  it("renders the component for logout", () => {
    const store = makeStore();

    render(
      <Provider store={store}>
        <Auth />
      </Provider>
    );

    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  it("should get error if empty fields", async () => {
    const store = makeStore();

    render(
      <Provider store={store}>
        <Auth />
      </Provider>
    );
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(await screen.findByText("Failed to login")).toBeInTheDocument();
  });

  it("incorrect login", async () => {
    const store = makeStore();

    render(
      <Provider store={store}>
        <Auth />
      </Provider>
    );

    const loginInput = screen.getByTestId("username");
    fireEvent.change(loginInput, { target: { value: "bla" } });

    const passwordInput = screen.getByTestId("password");
    fireEvent.change(passwordInput, { target: { value: "ble" } });
    fireEvent.click(screen.getByRole("button"));

    //expect(screen.getByText('invalid')).toBeInTheDocument();
    console.log(prettyDOM(screen.getByTestId("wrapping")));
    expect(await screen.findByText("Failed to login")).toBeInTheDocument();
  });

  it("correct login", async () => {
    const store = makeStore();

    render(
      <Provider store={store}>
        <Auth />
      </Provider>
    );

    const loginInput = screen.getByTestId("username");
    fireEvent.change(loginInput, { target: { value: "mrauthoto" } });

    console.log(loginInput.nodeValue);

    const passwordInput = screen.getByTestId("password");
    fireEvent.change(passwordInput, { target: { value: "thepass" } });

    fireEvent.click(screen.getByRole("button"));

    expect(
      await screen.findByText("25622-235-215", { exact: false })
    ).toBeInTheDocument();
  });
});
