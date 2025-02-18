import { render, screen, fireEvent } from "@testing-library/react";
import SongList from "./SongList";
import { Song } from "../../types";

const mockSongs: Song[] = [
  { id: 1, title: "Song 1", artist: "Artist 1", album: "Album 1" },
  { id: 2, title: "Song 2", artist: "Artist 2", album: "Album 2" },
];

const mockRemoveSong = jest.fn();

describe("SongList", () => {
  it("renders a list of songs", () => {
    render(
      <SongList
        songs={mockSongs}
        userRole={{ role: "user" }}
        removeSong={mockRemoveSong}
      />
    );
    expect(screen.getByText("Song 1")).toBeInTheDocument();
    expect(screen.getByText("Artist 1")).toBeInTheDocument();
    expect(screen.getByText("Album 1")).toBeInTheDocument();
    expect(screen.getByText("Song 2")).toBeInTheDocument();
    expect(screen.getByText("Artist 2")).toBeInTheDocument();
    expect(screen.getByText("Album 2")).toBeInTheDocument();
  });

  it("renders 'No song available' when there are no songs", () => {
    render(
      <SongList
        songs={[]}
        userRole={{ role: "user" }}
        removeSong={mockRemoveSong}
      />
    );
    expect(screen.getByText("No song available")).toBeInTheDocument();
  });

  it("renders remove button for admin users", () => {
    render(
      <SongList
        songs={mockSongs}
        userRole={{ role: "admin" }}
        removeSong={mockRemoveSong}
      />
    );
    const removeButtons = screen.getAllByText("×");
    expect(removeButtons.length).toBe(2);
  });

  it("does not render remove button for non-admin users", () => {
    render(
      <SongList
        songs={mockSongs}
        userRole={{ role: "user" }}
        removeSong={mockRemoveSong}
      />
    );
    const removeButtons = screen.queryAllByText("×");
    expect(removeButtons.length).toBe(0);
  });

  it("calls removeSong when remove button is clicked", () => {
    render(
      <SongList
        songs={mockSongs}
        userRole={{ role: "admin" }}
        removeSong={mockRemoveSong}
      />
    );
    const removeButton = screen.getAllByText("×")[0];
    fireEvent.click(removeButton);
    expect(mockRemoveSong).toHaveBeenCalledWith(1);
  });
});
