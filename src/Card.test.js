import React from 'react';
import { render } from '@testing-library/react';
import Card from './Card';


// Smoke test.
test('renders Card component without crashing', () => {
  render(<Card caption="Test Caption" src="test-image.jpg" currNum={1} totalNum={3} />);
});


// Snapshot test.
test('matches snapshot', () => {
  const { asFragment } = render(<Card caption="Test Caption" src="test-image.jpg" currNum={1} totalNum={3} />);
  expect(asFragment()).toMatchSnapshot();
});