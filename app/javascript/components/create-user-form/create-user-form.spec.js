import React from "react";
import Enzyme, { mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import { rootReducer } from "../../redux/configfureStore";
import thunk from 'redux-thunk';

import CreateUserForm from "./create-user-form";

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe('<CreateUserForm /> unit test', () => {
    let wrapper;
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState')
    useStateSpy.mockImplementation((init) => [init, setState]);
    const middlewares = [thunk];
    const mockStore = createStore(
        rootReducer, compose(
        applyMiddleware(...middlewares)
    ));

    beforeEach(() => {
        wrapper = mount(<Provider store={mockStore}>
            <CreateUserForm />
        </Provider>
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render form with inputs', () => {
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find("input")).toHaveLength(4);
        expect(wrapper.find('button[type="submit"]').exists()).toEqual(true);
    });

    it('should capture email value onChange', () => {
      wrapper.find('input[name="email"]').simulate('change', {target: { value: 'the-value' }});
      expect(setState).toBeTruthy();
    });
  });

