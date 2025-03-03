import { act, render, screen, waitFor } from "@testing-library/react";
import QuoteRotator from "../components/QuoteRotator";

jest.useFakeTimers();

test("should rotate quotes every 5 seconds", async () => {
  render(<QuoteRotator />);
  act(() => {
    jest.advanceTimersByTime(5100); // Simulerar 5 sekunder
  });

  await waitFor(() => {
    screen.getByText(/A Billion Zillion Gillion Dollars - Jacob Jackpot/);
  });

  act(() => {
    jest.advanceTimersByTime(5100); // Simulerar 5 sekunder
  });

  await waitFor(() =>
    screen.getByText(/I Can Quit When I Want To - Hugo Hustle./)
  );
});
