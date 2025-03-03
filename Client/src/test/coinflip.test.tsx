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

test("should render CoinFlip component", () => {
  render(<CoinFlip />);
  expect(screen.getByText(/Balance:/)).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: /Vinn pengar knappen/i })
  ).toBeInTheDocument();
});

const mockAxios = new MockAdapter(axios);

afterEach(() => {
  mockAxios.reset();
});

test("should fetch and display balance on mount", async () => {
  mockAxios
    .onGet("http://localhost:8080/game/balance")
    .reply(200, { balance: 100 });

  await act(async () => {
    render(<CoinFlip />);
  });

  await waitFor(() =>
    expect(screen.getByText(/Balance: 100 coins/)).toBeInTheDocument()
  );
});

test("should update image on win", async () => {
  mockAxios
    .onPost("http://localhost:8080/game/coinflip")
    .reply(200, { win: true, balance: 110 });

  render(<CoinFlip />);
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

  render(<CoinFlip />);
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

  render(<CoinFlip />);
  fireEvent.click(screen.getByText(/Vinn pengar knappen/i));

  await waitFor(() =>
    expect(
      screen.getByText(/An error occurred while fetching data/)
    ).toBeInTheDocument()
  );
});
