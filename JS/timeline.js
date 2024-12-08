const toggleJobContainer = (img) => {
  if (window.innerWidth < 500) return;
  
  const jobContainer = img.parentElement;
  const jobDescription = jobContainer.querySelector(".job-description");
  const isLeftElement = jobContainer.classList.contains("left-job-container");

  const isHidden =
    jobDescription.classList.contains("hidden-left") ||
    jobDescription.classList.contains("hidden-right");

  const isNarrowScreen = window.innerWidth <= 1000;

  if (isHidden) {
      jobDescription.classList.remove("hidden-left");
      jobDescription.classList.remove("hidden-right");
    jobContainer.classList.remove("hidden-container");
  } else {
    if (isLeftElement && !isNarrowScreen) {
      jobDescription.classList.add("hidden-left");
    } else {
      jobDescription.classList.add("hidden-right");
    }
    jobContainer.classList.add("hidden-container");
  }
};
