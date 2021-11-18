containerWidth = document.getElementById("container-carousel").clientWidth;
nextButtonn = document.getElementById("next-button");
previousButton = document.getElementById("previous-button");
slide = document.getElementById("slide-carousel");

firstCardLeftMargin = 10;
cardWidthAndRightMargin = 120 + 10;
totalWidth = slide.clientWidth;

const transformSlide = (val) => {
  slide.style.transform = `translate(${val}px,0px)`;
};

const getCurrentPosition = () => {
  const stringValue = slide.style.transform;
  const transformValue = stringValue.substring(
    stringValue.indexOf("(") + 1,
    stringValue.lastIndexOf("p")
  );
  return transformValue ? parseInt(transformValue) : 0;
};

const getNextPosition = () => {
  //take current position of the slide
  const currentPosition = getCurrentPosition();
  //last visibile pixel
  const lastVisiblePixel = containerWidth + -1 * currentPosition;
  //use the last visible pixel to calculate which card was fully-visible.
  //This will return a float whose floor will indicate the last fully-visible card.
  //We will show the next card as the first card after sliding
  const lastFullyVisibleCard = Math.floor(
    (lastVisiblePixel - firstCardLeftMargin) / cardWidthAndRightMargin
  );
  //Calculate the distance from slideStart to the lastVisibleCard's end
  const distanceToNextCard =
    lastFullyVisibleCard * cardWidthAndRightMargin + firstCardLeftMargin;
  if (distanceToNextCard + containerWidth > totalWidth) {
    return totalWidth - containerWidth + firstCardLeftMargin;
  }
  return distanceToNextCard - 5;
};

const getPreviousPosition = () => {
  const currentPosition = getCurrentPosition(); //take current position
  //getting first partially visible card. This will be the last card shown when the button is clicked.
  const firstPartiallyVisibleCard = Math.floor(
    (-1 * currentPosition - firstCardLeftMargin) / cardWidthAndRightMargin
  );
  //get distance to card end from slide start
  const distanceToCardEndFromSlideStart =
    firstPartiallyVisibleCard * cardWidthAndRightMargin + firstCardLeftMargin;
  //translateX distance would be total distance - containerwidth
  const distanceNeeded = distanceToCardEndFromSlideStart - containerWidth;
  //return calculateDistance only if it is positive
  if (distanceNeeded > 0) {
    return -distanceNeeded;
  }
  //if needed distance < 0 i.e. card end is closer to start than container width means that this scroll would overshoot the left edge.
  //return 0 and return the slide to it's initial position
  return 0;
};

nextButtonn.addEventListener("click", (event) => {
  transformSlide(-getNextPosition());
});

previousButton.addEventListener("click", (event) => {
  transformSlide(getPreviousPosition());
});


// line 29
