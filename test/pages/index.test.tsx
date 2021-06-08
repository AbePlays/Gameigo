import Home from "../../pages/index";

import { render, screen } from "../test-utils";

describe("Home Page", () => {
  it("contains nextjs", () => {
    render(<Home />);
    expect(screen.getByText(/hello, nextjs/i)).toBeInTheDocument();
  });
});
