export function generateBookroom2() {
  // We create all elements on top of the other code //
  const body = document.querySelector("body");
  const overlay = document.createElement("div");
  const bookroom_modal = document.createElement("section");
  const book_modal = document.createElement("div");
  const book_form = document.createElement("form");
  const modal__title2 = document.createElement("h2");
  const book_name_label = document.createElement("label");
  const book_name_input = document.createElement("input");
  const book_email_label = document.createElement("label");
  const book_email_input = document.createElement("input");
  const book_time_label = document.createElement("label");
  const book_time_select = document.createElement("select");
  const book_time_option = document.createElement("option");
  const participants_label = document.createElement("label");
  const participants_select = document.createElement("select");
  const participants_number = document.createElement("option");
  const booking_button = document.createElement("button");
  const book_phone_label = document.createElement("label");
  const book_phone_input = document.createElement("input");
  const modalButtonClose = document.createElement("button");

  // Sets classname and attributes on elements //
  overlay.className = "overlay";
  overlay.setAttribute("id", "hidden");
  bookroom_modal.className = "Bookroom_modal";
  bookroom_modal.setAttribute("id", "hidden");
  book_modal.className = "book_modal";
  book_form.className = "book_form";
  modal__title2.className = "modal__title2";

  book_name_label.className = "book_name";
  book_name_label.setAttribute("for", "name-text");
  book_name_input.type = "text";
  book_name_input.id = "name-text";

  book_email_label.className = "book_email";
  book_email_label.setAttribute("for", "email-text");
  book_email_input.type = "email";
  book_email_input.id = "email-text";

  book_time_label.className = "book_time";
  book_time_label.setAttribute("for", "time_options");
  book_time_select.id = "time_options";

  participants_label.className = "book_participants";
  participants_label.setAttribute("for", "participants_number");
  participants_select.id = "participants_number";

  booking_button.className = "booking_button";

  book_phone_label.className = "phone_number";
  book_phone_label.setAttribute("for", "phone-number");
  book_phone_input.type = "tel";
  book_phone_input.id = "phone-number";

  modalButtonClose.className = "modal__button_close fa fa-times";
  modalButtonClose.type = "button";
  modalButtonClose.id = "modal2__button_close";

  // Text on elements //
  modal__title2.textContent = "";
  book_name_label.textContent = "Name";
  book_phone_label.textContent = "Phone number(optional)";

  book_email_label.textContent = "Email";
  book_time_label.textContent = "What time?";
  participants_label.textContent = "How many participants?";
  booking_button.textContent = "Submit booking";
  
  //append all DOM-elements according to previous HTML-structure//
  body.appendChild(overlay);
  body.appendChild(bookroom_modal);
  bookroom_modal.appendChild(book_modal);
  book_modal.appendChild(book_form);
  book_form.appendChild(modal__title2);
  book_form.appendChild(book_name_label);
  book_form.appendChild(book_name_input);
  book_form.appendChild(book_phone_label);
  book_form.appendChild(book_phone_input);
  book_form.appendChild(book_email_label);
  book_form.appendChild(book_email_input);
  book_form.appendChild(book_time_label);
  book_form.appendChild(book_time_select);
  book_time_select.appendChild(book_time_option);
  book_form.appendChild(participants_label);
  book_form.appendChild(participants_select);
  participants_select.appendChild(participants_number);
  book_form.appendChild(booking_button);
  book_form.appendChild(modalButtonClose);
}
generateBookroom2();

// This is a different value from the one, created in generateBookroom2 function//
const book_form = document.querySelector(".book_form");
const modal__title2 = document.querySelector(".modal__title2");
let errorText = document.createElement("p");
errorText.className = "modal__date_error_text";
// Function to use if we want to update text on the error msg
// import { updateErrorText } from "./bookroom1";
  
// Declare roomId value that imports the ID from bookroom modal (step 1)
let roomId;

export function getRoomId(id) {
  roomId = id;
  return id;
}

export function changeTitle(title) {
  modal__title2.textContent = `Book room "${title}" (step 2)`;
  return title;
}

// Listen for the custom event
document.addEventListener("arrayEvent", (event) => {
  const { data, id, title } = event.detail; // Extract the message, array and room id

  // console.log(message); // Log the message
  let newTime = data;
  // Return id as roomId and title as modal__title2.textContent
  getRoomId(id);
  changeTitle(title);

  availableTimeNow(newTime);
});

book_form.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevents reloading the page when submit

  const userInputPhone = document.getElementById("phone-number").value.trim();

  // Validate phone number (optional or exactly 10 digits)
  const isValidPhoneNumber =
    userInputPhone === "" || /^\d{10}$/.test(userInputPhone);

  if (!isValidPhoneNumber) {
    return;
  }

  const userRoomId = parseInt(roomId, 10);
  const userInputName = document.getElementById("name-text").value;

  const userInputEmail = document.getElementById("email-text").value;
  const date = new Date().toISOString();
  const userInputTime = document.getElementById("time_options").value;
  const userInputParticipants = document.getElementById(
    "participants_number"
  ).value;

  const userInput = {
    challenge: userRoomId,
    name: userInputName,
    phone: userInputPhone,
    email: userInputEmail,
    date: date,
    time: userInputTime,
    participants: parseInt(userInputParticipants, 10),
  };

  fetch("https://lernia-sjj-assignments.vercel.app/api/booking/reservations", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInput), // Sending data in JSON format
  })
    .then((response) => {
      if (!response.ok) {
        book_form.appendChild(errorText);
        errorText.textContent = "All fields must be filled!"
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(() => {
      document.querySelector(".Bookroom_modal").setAttribute("id", "hidden");
      document.querySelector(".modal3").removeAttribute("id");
    });
});
export function availableTimeNow(newTime) {
  // This resets the time select options in every booking //
  const timeSelect = document.querySelector("#time_options");
  timeSelect.innerHTML = "";

  newTime.forEach((newTime) => {
    const option = document.createElement("option");
    option.value = newTime;
    option.textContent = newTime;
    timeSelect.appendChild(option);
  });
}
