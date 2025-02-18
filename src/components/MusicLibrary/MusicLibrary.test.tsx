import { render, screen, fireEvent } from "@testing-library/react";
import MusicLibrary from "./MusicLibrary";
import { SONGS_DATA } from "../../constants";

describe("MusicLibrary", () => {
  it("renders login message if userRole is not admin or user", () => {
    render(<MusicLibrary userRole={{ role: "guest" }} />);
    expect(screen.getByText("Please login to proceed")).toBeInTheDocument();
  });

  it("renders Music Library if userRole is admin", () => {
    render(<MusicLibrary userRole={{ role: "admin" }} />);
    expect(screen.getByText("Music Library")).toBeInTheDocument();
  });

  it("renders Music Library if userRole is user", () => {
    render(<MusicLibrary userRole={{ role: "user" }} />);
    expect(screen.getByText("Music Library")).toBeInTheDocument();
  });

  it("filters songs based on search input", () => {
    render(<MusicLibrary userRole={{ role: "user" }} />);
    const searchInput = screen.getByPlaceholderText("Search...");
    fireEvent.change(searchInput, { target: { value: "song1" } });
    expect(screen.getByText("song1")).toBeInTheDocument();
  });

  it("sorts songs based on selected sort key", () => {
    render(<MusicLibrary userRole={{ role: "user" }} />);
    const sortSelect = screen.getByLabelText("Sort by");
    fireEvent.change(sortSelect, { target: { value: "artist" } });
    const sortedSongs = SONGS_DATA.sort((a, b) =>
      a.artist > b.artist ? 1 : -1
    );
    expect(screen.getByText(sortedSongs[0].title)).toBeInTheDocument();
  });

  it("adds a new song when admin adds a song", () => {
    render(<MusicLibrary userRole={{ role: "admin" }} />);
    fireEvent.click(screen.getByText("Add Song"));
    fireEvent.change(screen.getByPlaceholderText("Title"), {
      target: { value: "New Song" },
    });
    fireEvent.change(screen.getByPlaceholderText("Artist"), {
      target: { value: "New Artist" },
    });
    fireEvent.change(screen.getByPlaceholderText("Album"), {
      target: { value: "New Album" },
    });
    fireEvent.click(screen.getByText("Save"));
    expect(screen.getByText("New Song")).toBeInTheDocument();
  });

  it("removes a song when admin removes a song", () => {
    render(<MusicLibrary userRole={{ role: "admin" }} />);
    const initialSong = SONGS_DATA[0];
    fireEvent.click(screen.getByText(`Remove ${initialSong.title}`));
    expect(screen.queryByText(initialSong.title)).not.toBeInTheDocument();
  });
});
