const bookshelf = document.getElementsByClassName("bookshelf");
const bookGrid = document.getElementsByClassName("book-grid");
var shelfHeight = window.innerWidth > 750 ? 310 : 175;
var curHeight = bookGrid[0].clientHeight;
// console.log(curHeight);
var shelves = Math.round(curHeight / shelfHeight);

const shelf = document.createElement("div");
shelf.innerHTML = '<div class="shelf-container"></div>';
for (i = 0; i < shelves; i++) {
  const shelfClone = shelf.cloneNode(true);
  bookshelf[0].appendChild(shelfClone);
}

var adjustmentFactor = 40; // padding between book and top shelf
var negativeMarginTop = (bookshelf[0].clientHeight - adjustmentFactor) * -1;
// console.log(negativeMarginTop);
bookGrid[0].style.marginTop = `${negativeMarginTop}px`;

addEventListener("resize", (event) => {});

onresize = (event) => {
  shelfHeight = window.innerWidth > 750 ? 310 : 175;
  curHeight = bookGrid[0].clientHeight;
  var diffShelves = Math.round(curHeight / shelfHeight) - shelves;
  // console.log(`diff shelves: ${diffShelves}`);
  if (diffShelves > 0) {
    for (i = 0; i < diffShelves; i++) {
      shelves++;
      const shelfClone = shelf.cloneNode(true);
      bookshelf[0].appendChild(shelfClone);
    }
  } else if (diffShelves < 0) {
    for (i = 0; i < Math.abs(diffShelves); i++) {
      shelves--;
      bookshelf[0].removeChild(bookshelf[0].firstChild);
    }
  }

  adjustmentFactor = 40;
  negativeMarginTop = (bookshelf[0].clientHeight - adjustmentFactor) * -1;
  bookGrid[0].style.marginTop = `${negativeMarginTop}px`;
};
