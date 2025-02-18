import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders MusicLibrary component", () => {
  render(<App />);
  const musicLibraryElement = screen.getByText(/MusicLibrary/i);
  expect(musicLibraryElement).toBeInTheDocument();
});

test("has correct background gradient", () => {
  render(<App />);
  const appElement = screen.getByRole("main");
  expect(appElement).toHaveClass(
    "bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400"
  );
});
