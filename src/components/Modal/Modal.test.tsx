import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "./Modal";
import "@testing-library/jest-dom";

describe("Modal component", () => {
  it("renders children when open", () => {
    render(
      <Modal isOpen={true} onClose={jest.fn()}>
        <div data-testid="modal-content">Modal Content</div>
      </Modal>
    );
    expect(screen.getByTestId("modal-content")).toBeInTheDocument();
  });

  it("does not render when closed", () => {
    render(
      <Modal isOpen={false} onClose={() => {}}>
        <div data-testid="modal-content">Modal Content</div>
      </Modal>
    );
    expect(screen.queryByTestId("modal-content")).not.toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", () => {
    const onClose = jest.fn();
    render(
      <Modal isOpen={true} onClose={onClose}>
        <div>Modal Content</div>
      </Modal>
    );
    fireEvent.click(screen.getByText("×"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
