import React from "react";
import Enzyme, { mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import { rootReducer } from "../../redux/configfureStore";
import { BrowserRouter as Router } from 'react-router-dom';
import thunk from 'redux-thunk';
import ProfilePage from "./profile-page";
import { userMockData } from "../../mockData/mocks";

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe("<ProfilePage /> component renders correct", () => {

  const location = {
    state: { profile: userMockData }
  }
  const middlewares = [thunk];
  const mockStore = createStore(
      rootReducer, compose(
      applyMiddleware(...middlewares)
  ));

  it("should be render correctly", () => {

    const tree = mount(<Provider store={mockStore}>
        <Router>
          <ProfilePage location={location}/>
        </Router>
      </Provider>
    )

    expect(tree).toMatchSnapshot();
  })

})

