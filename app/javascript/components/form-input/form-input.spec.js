import React from "react";
import { shallow } from "enzyme";
import FormInput from "./form-input";


describe("FormInput", () => {

  it("should be render correctly", () => {
    const mockFn = jest.fn();
    const tree = shallow(
      <FormInput id="3"
      name="email"
      placeholder="Your email"
      handleChange={mockFn}
      className="form-input" />
    )

    expect(tree).toMatchSnapshot();
  })

  it("should have correct props", () => {
    const mockFn = jest.fn();
    const tree = shallow(
      <FormInput id="3"
      name="email"
      placeholder="Your email"
      handleChange={mockFn}
      className="form-input" />
    )

    expect(tree.props().name).toEqual("email");
    expect(tree.props().id).toEqual("3");
    expect(tree.props().placeholder).toEqual("Your email");
    expect(tree.props().className).toEqual("form-input");
  })

  it("should call mock function on change ", () => {
    const mockFn = jest.fn();
    const tree = shallow(
      <FormInput id="3"
      name="email"
      placeholder="Your email"
      handleChange={mockFn}
      className="form-input" />
    )

    tree.simulate("change");
    expect(mockFn).toHaveBeenCalled();
  })

})
