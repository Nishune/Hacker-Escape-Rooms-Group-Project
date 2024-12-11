export function generateModule3() {
  const section = document.createElement("section");
  const modal3 = document.createElement("div");
  const modalTitle = document.createElement("h2");
  const challengesLink = document.createElement("a");
  const modalButtonClose = document.createElement("button");

  modal3.id = "modal3";
  modal3.className = "modal3";
  modalTitle.className = "modalTitle";
  challengesLink.className = "challengesLink";

  modal3.setAttribute("id", "hidden");

  modalTitle.textContent = "Thank you!";
  challengesLink.textContent = "Back to challenges";
  challengesLink.href = "./challenges.html"; // Update with the correct URL for challenges page

  modalButtonClose.className = "modal__button_close fa fa-times";
  modalButtonClose.id = "modal3__button_close";
  modalButtonClose.type = "button";

  document.body.appendChild(section);
  section.appendChild(modal3);
  modal3.appendChild(modalTitle);
  modal3.appendChild(challengesLink);
  modal3.appendChild(modalButtonClose);
}

// Generate module3 when the page loads
generateModule3();
