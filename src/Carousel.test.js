import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js";

it("works when you click on the right arrow", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();
});

// Smoke test.
test('renders Carousel component without crashing', () => {
  const photos = [
    { caption: 'caption test 1', src: TEST_IMAGES[0].src },
    { caption: 'caption test 2', src: TEST_IMAGES[1].src },
  ];
  render(<Carousel photos={TEST_IMAGES} title="testing title" />);
})

// Snapshot test.
test('matches snapshot', () => {
  const { asFragment } = render(<Carousel photos={TEST_IMAGES} title="testing title" />);
  expect(asFragment()).toMatchSnapshot();
});

// Left arrow test.
test('clicking left arrow moves to previous image', () => {
  const { getByTestId } = render(<Carousel photos={TEST_IMAGES} title="testing title" />);
  expect(getByTestId('carousel-container')).toHaveTextContent('testing image 1');

  fireEvent.click(getByTestId('arrow-right'));
  expect(getByTestId('carousel-container')).toHaveTextContent('testing image 2');

  fireEvent.click(getByTestId('arrow-left'));
  expect(getByTestId('carousel-container')).toHaveTextContent('testing image 1');
});

// Left arrow hidden test
test('left arrow is hidden on carousel render', () => {
  const {getByTestId} = render(<Carousel photos={TEST_IMAGES} title="testing title" />);
  expect(getByTestId('arrow-left')).toHaveAttribute('hidden')
});

// Right arrow hidden
test('right arrow is hidden when carousel on last image', () => {
  const {getByTestId} = render(<Carousel photos={TEST_IMAGES} title="testing title" />);
  fireEvent.click(getByTestId('arrow-right'));
  fireEvent.click(getByTestId('arrow-right'));
  expect(getByTestId('arrow-right')).toHaveAttribute('hidden')
});