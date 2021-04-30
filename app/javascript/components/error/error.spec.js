import React from "react";
import renderer from 'react-test-renderer';
import Error from "./error";


describe("Error message", () => {

  it('should render correctly error message', () => {
      const tree = renderer.create(<Error>This is error message</Error>).toJSON();
      expect(tree).toMatchSnapshot();
  });

})
