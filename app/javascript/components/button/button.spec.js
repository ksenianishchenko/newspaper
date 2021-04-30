import React from "react";
import { shallow } from "enzyme";
import Button from "./button";

describe("Button", () => {

  function createButton(type, onClick, className) {
    const btn = shallow(
      <Button type={type}
      className={className}
      onClick={onClick}>Click me</Button>
    )
    return btn;
  };

  const mockFn = jest.fn();

  it("should be render correctly", () => {

    const tree = createButton("submit", mockFn, "button");

    expect(tree).toMatchSnapshot();
  })

  it("should call mock function on click", () => {

    const tree = createButton("submit", mockFn, "button");

    tree.simulate("click");
    expect(mockFn).toHaveBeenCalled();
  })

  it("should render default class", () => {
    const tree = createButton("submit", mockFn);

    expect(tree.hasClass('btn btn-primary btn-block waves-effect waves-light')).toBe(true);
  })

});
