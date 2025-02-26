import { render, screen, waitFor } from "@testing-library/react";
import QuoteRotator from "../components/QuoteRotator";

jest.useFakeTimers();

test("should rotate quotes every 5 seconds", async () => {
  render(<QuoteRotator />);

  jest.advanceTimersByTime(5000); // Simulerar 5 sekunder
  await waitFor(() => {
    screen.getByText(/ A Billion Zillion Gillion Dollars - Jacob Jackpot/);
  });

  await waitFor(() =>
    screen.getByText(/I Can Quit When I Want To - Hugo Hustle./)
  );
});

test("should change quote", async () => {
  render(<QuoteRotator />);

  const text = screen.getByText(/./).textContent;

  jest.advanceTimersByTime(5000);

  expect(text).not.toEqual(screen.getByText(/./).textContent);
});
