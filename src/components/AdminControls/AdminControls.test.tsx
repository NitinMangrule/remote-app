import { render, screen, fireEvent } from "@testing-library/react";
import AdminControls from "./AdminControls";

describe("AdminControls", () => {
  const mockSetNewSong = jest.fn();
  const mockAddSong = jest.fn();
  const newSong = { title: "", artist: "", album: "" };

  beforeEach(() => {
    render(
      <AdminControls
        newSong={newSong}
        setNewSong={mockSetNewSong}
        addSong={mockAddSong}
      />
    );
  });

  it("renders input fields and button", () => {
    expect(screen.getByPlaceholderText("Title")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Artist")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Album")).toBeInTheDocument();
    expect(screen.getByText("Add Song")).toBeInTheDocument();
  });

  it("calls setNewSong with updated title", () => {
    const titleInput = screen.getByPlaceholderText("Title");
    fireEvent.change(titleInput, { target: { value: "New Title" } });
    expect(mockSetNewSong).toHaveBeenCalledWith({
      ...newSong,
      title: "New Title",
    });
  });

  it("calls setNewSong with updated artist", () => {
    const artistInput = screen.getByPlaceholderText("Artist");
    fireEvent.change(artistInput, { target: { value: "New Artist" } });
    expect(mockSetNewSong).toHaveBeenCalledWith({
      ...newSong,
      artist: "New Artist",
    });
  });

  it("calls setNewSong with updated album", () => {
    const albumInput = screen.getByPlaceholderText("Album");
    fireEvent.change(albumInput, { target: { value: "New Album" } });
    expect(mockSetNewSong).toHaveBeenCalledWith({
      ...newSong,
      album: "New Album",
    });
  });

  it("calls addSong when button is clicked", () => {
    const addButton = screen.getByText("Add Song");
    fireEvent.click(addButton);
    expect(mockAddSong).toHaveBeenCalled();
  });
});
