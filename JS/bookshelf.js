const bookshelf = document.getElementsByClassName("bookshelf");
const bookGrid = document.getElementsByClassName("book-grid");
const shelfHeight = 310;
var curHeight = bookGrid[0].clientHeight;
var shelves = Math.round(curHeight / shelfHeight);

const shelf = document.createElement("div");
shelf.innerHTML = '<div class="shelf-container"></div>';
for (i = 0; i < shelves; i++) {
  const shelfClone = shelf.cloneNode(true);
  bookshelf[0].appendChild(shelfClone);
}

const adjustmentFactor = 10; // padding between book and top shelf
var negativeMarginTop = (shelfHeight * shelves - adjustmentFactor) * -1;
bookGrid[0].style.marginTop = `${negativeMarginTop}px`;

addEventListener("resize", (event) => {});

onresize = (event) => {
  curHeight = bookGrid[0].clientHeight;
  var diffShelves = Math.round(curHeight / shelfHeight) - shelves;
  console.log(`diff shelves: ${diffShelves}`);
  if (diffShelves > 0) {
    for (i = 0; i < diffShelves; i++) {
      shelves++;
      const shelfClone = shelf.cloneNode(true);
      bookshelf[0].appendChild(shelfClone);
    }
  } else if (diffShelves < 0) {
    for (i = 0; i < Math.abs(diffShelves); i++) {
      shelves--;
      console.log(bookshelf[0]);
      console.log(bookshelf[0].firstChild);
      bookshelf[0].removeChild(bookshelf[0].firstChild);
    }
  }

  var negativeMarginTop = (shelfHeight * shelves - adjustmentFactor) * -1;
  bookGrid[0].style.marginTop = `${negativeMarginTop}px`;
};
