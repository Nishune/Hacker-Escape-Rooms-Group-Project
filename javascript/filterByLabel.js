export function filterByLabel() {
  // Find all filter buttons from the dom.
  const filterButtons = document.querySelectorAll(".filter__tag button");

  //An Empty Array to store the labels that the user has clicked.
  let selectedLabels = [];

  //When the user clicks on our labels, the filter runs.
  filterButtons.forEach((filterButton) => {
    filterButton.addEventListener("click", (e) => {
      //Prevents the site from reloading when the labels buttons are clicked.
      e.preventDefault();

      //Added a toggle to style with SCSS when the label is "active"
      filterButton.classList.toggle("active");
      //Gets the label on the specific label that has been clicked and makes it lowercase.
      const clickedLabel = filterButton.textContent.toLowerCase();
      //checks to see if this label is already chosen
      const labelsSelected = selectedLabels.includes(clickedLabel);

      if (!labelsSelected) {
        //If the label is not in the list, it gets added to the selectedLabels array.
        selectedLabels.push(clickedLabel);
      } else {
        //If the label is in the array, it gets removed from the array.
        selectedLabels = selectedLabels.filter(
          (label) => label !== clickedLabel
        );
      }
      //Get all challenges that are located on challenges.html.
      const allChallenges = document.querySelectorAll(".challenges__room");
      //Loops through all challenges and controls if it should show or not.
      allChallenges.forEach((challenge) => {
        //Gets the challenges labels from the data-labels and adds them to an array
        const challengesLabels = challenge.dataset.labels.split(",");
        //If no labels are chosen, all challenges will show.
        if (selectedLabels.length === 0) {
          //Resets if some challenges would be hidden to be shown.
          challenge.style.display = "";
          return;
        }
        //By default challenges will show
        let showChallenges = true;
        //Loop through every chosen label and check if its in the challenges labels
        selectedLabels.forEach((label) => {
          const challengeHasLabel = challengesLabels.includes(label);
          //If a challenge does not have the chosen label by the user, the challenge will not show.
          if (!challengeHasLabel) {
            showChallenges = false;
          }
        });
        //If the challenge is supposed to be shown, we give it its standard value. Else its set to none.
        if (showChallenges) {
          challenge.style.display = "";
        } else {
          challenge.style.display = "none";
        }
      });
    });
  });
}