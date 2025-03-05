import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import CoinFlip from "../pages/coinflip";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { AuthProvider } from "../assets/AuthContext";

jest.mock("../assets/AuthContext", () => ({
  ...jest.requireActual("../assets/AuthContext"),
  useAuth: () => ({
    loggedIn: true, // Mocka att användaren alltid är inloggad
  }),
}));

const mockAxios = new MockAdapter(axios);

beforeEach(() => {
  mockAxios
    .onGet("http://localhost:8080/game/session")
    .reply(200, { loggedIn: true });
});

afterEach(() => {
  mockAxios.reset();
});

const renderWithAuth = (ui: React.ReactNode) => {
  return render(<AuthProvider>{ui}</AuthProvider>);
};

test("should render CoinFlip component", () => {
  renderWithAuth(<CoinFlip />);
  expect(screen.getByText(/Balance:/)).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: /Vinn pengar knappen/i })
  ).toBeInTheDocument();
});

test("should fetch and display balance on mount", async () => {
  mockAxios
    .onGet("http://localhost:8080/game/balance/get")
    .reply(200, { success: true, balance: 100 });

  await act(async () => {
    renderWithAuth(<CoinFlip />);
  });

  await waitFor(() =>
    expect(screen.getByText(/Balance: 100 coins/)).toBeInTheDocument()
  );
});

test("should update image on win", async () => {
  mockAxios
    .onPost("http://localhost:8080/game/coinflip")
    .reply(200, { win: true, balance: 110 });

  renderWithAuth(<CoinFlip />);
  fireEvent.click(screen.getByText(/Vinn pengar knappen/i));

  await waitFor(() =>
    expect(screen.getByAltText("coin")).toHaveAttribute(
      "src",
      "images/thumbsup.png"
    )
  );
  expect(screen.getByText(/Balance: 110 coins/)).toBeInTheDocument();
});

test("should update image on loss", async () => {
  mockAxios
    .onPost("http://localhost:8080/game/coinflip")
    .reply(200, { win: false, balance: 90 });

  renderWithAuth(<CoinFlip />);
  fireEvent.click(screen.getByText(/Vinn pengar knappen/i));

  await waitFor(() =>
    expect(screen.getByAltText("coin")).toHaveAttribute(
      "src",
      "images/catlaughing.jpg"
    )
  );
  expect(screen.getByText(/Balance: 90 coins/)).toBeInTheDocument();
});

test("should show error message on server error", async () => {
  mockAxios.onPost("http://localhost:8080/game/coinflip").reply(500);

  renderWithAuth(<CoinFlip />);
  fireEvent.click(screen.getByText(/Vinn pengar knappen/i));

  await waitFor(() =>
    expect(
      screen.getByText(/An error occurred while fetching data/)
    ).toBeInTheDocument()
  );
});
