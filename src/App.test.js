import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { mount } from 'enzyme';
import Organizations from './components/Organizations';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('Organizations', () => {
  describe('when loading is true', () => {
    it('should render a loading indicator', () => {
      const wrapper = mount(
        <Organizations userData={{}} loading={true} />
      );
      expect(wrapper.find('.loading').exists()).toEqual(true);
      wrapper.unmount();
    });
  });

  describe('when loading is false', () => {
    it('should not render a loading indicator', () => {
      const wrapper = mount(
        <Organizations userData={{}} loading={false} />
      );
      expect(wrapper.find('.loading').exists()).toEqual(false);
      wrapper.unmount();
    });
  });

  describe('there is no data', () => {
    it('should show a no data message', () => {
      const wrapper = mount(
        <Organizations userData={{}} loading={false} />
      );
      expect(wrapper.find('.no-data').exists()).toEqual(true);
      wrapper.unmount();
    });
  });
});
