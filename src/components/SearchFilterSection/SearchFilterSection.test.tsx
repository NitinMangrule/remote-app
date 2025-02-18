import { render, screen, fireEvent } from "@testing-library/react";
import SearchFilterSection from "./SearchFilterSection";
import { Song } from "../../types";

describe("SearchFilterSection", () => {
  const mockSetFilter = jest.fn();
  const mockSetSortKey = jest.fn();
  const mockSetIsModalOpen = jest.fn();

  const defaultProps = {
    filter: "",
    setFilter: mockSetFilter,
    sortKey: "title" as keyof Song,
    setSortKey: mockSetSortKey,
    userRole: { role: "user" },
    setIsModalOpen: mockSetIsModalOpen,
  };

  it("renders input and select elements", () => {
    render(<SearchFilterSection {...defaultProps} />);
    expect(screen.getByPlaceholderText("Filter songs")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("calls setFilter when input value changes", () => {
    render(<SearchFilterSection {...defaultProps} />);
    const input = screen.getByPlaceholderText("Filter songs");
    fireEvent.change(input, { target: { value: "new filter" } });
    expect(mockSetFilter).toHaveBeenCalledWith("new filter");
  });

  it("calls setSortKey when select value changes", () => {
    render(<SearchFilterSection {...defaultProps} />);
    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "artist" } });
    expect(mockSetSortKey).toHaveBeenCalledWith("artist");
  });

  it("renders Add New Song button for admin role", () => {
    render(
      <SearchFilterSection {...defaultProps} userRole={{ role: "admin" }} />
    );
    expect(screen.getByText("Add New Song")).toBeInTheDocument();
  });

  it("does not render Add New Song button for non-admin role", () => {
    render(<SearchFilterSection {...defaultProps} />);
    expect(screen.queryByText("Add New Song")).not.toBeInTheDocument();
  });

  it("calls setIsModalOpen when Add New Song button is clicked", () => {
    render(
      <SearchFilterSection {...defaultProps} userRole={{ role: "admin" }} />
    );
    const button = screen.getByText("Add New Song");
    fireEvent.click(button);
    expect(mockSetIsModalOpen).toHaveBeenCalledWith(true);
  });
});
