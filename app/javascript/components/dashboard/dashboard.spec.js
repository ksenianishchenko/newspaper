import React from "react";
import Enzyme, { mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { rootReducer } from "../../redux/configfureStore";
import { BrowserRouter as Router } from 'react-router-dom';
import { userMockData } from "../../mockData/mocks";
import Dashboard from "./dashboard";

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe('<Dashboard /> unit test', () => {

  const mockFeed = [
    "Hi there",
    "How are you?"
  ]
  const mockStore = createStore(rootReducer);
  let wrapper = mount(<Provider store={mockStore}>
    <Router>
      <Dashboard user={userMockData} totalPosts={mockFeed.length}/>
    </Router>
  </Provider>)

  it("Should render component dashboard with user", () => {
    expect(wrapper).toMatchSnapshot();
  })
})