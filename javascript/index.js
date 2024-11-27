import { allFilters } from "./allFilter.js";

//variables.
const menuButton = document.querySelector(".header__menu-button");
const closeButton = document.querySelector(".header__navigation-close");
const navigationMenu = document.querySelector(".header__navigation");
const overlayBlur = document.querySelector(".overlay__blur");

//event-listeners.
menuButton.addEventListener("click", showMenu);
closeButton.addEventListener("click", hideMenu);
overlayBlur.addEventListener("click", hideMenu);

//Menu functions.
function showMenu() {
  navigationMenu.classList.add("overlay");
  overlayBlur.classList.add("active");
  document.body.style.overflow = "hidden";
}

function hideMenu() {
  navigationMenu.classList.remove("overlay");
  overlayBlur.classList.remove("active");
  document.body.style.overflow = "";
}
//Connection to API, this function can now be called wherever we need it.
async function challengesApi() {
  const response = await fetch(
    "https://lernia-sjj-assignments.vercel.app/api/challenges"
  );
  const data = await response.json();
  return data;
}

//Creating a function for generating the rooms, that also calls the challengesAPI function to get the data from the API.
async function generateRoom() {
  const data = await challengesApi();
  const roomData = data.challenges;
  const challenges__container = document.querySelector(
    "#challenges__container"
  );
  const content__rooms = document.querySelector(".content__rooms");
  //If-statement to generate room based on which container they should be added.
  let container;
  if (challenges__container) {
    container = challenges__container;
  } else if (content__rooms) {
    container = content__rooms;
    roomData.sort((a, b) => b.rating - a.rating); //Using sort to sort the rooms based on highest to lowest rating.
    roomData.length = 3; //Takes the 3 first elements in the sorted array.
  }
  //forEach loop that loops through the challenges array which is located in the data from the API.
  roomData.forEach((room) => {
    //Creating a room with the same "structure" as in previous hardcoded HTML, adds correct class depending on container and gets appended to the dynamic container variable.
    const challengesRoom = document.createElement("div");
    challengesRoom.classList.add(
      content__rooms ? "content__room" : "challenges__room"
    );
    //Adds the rooms labels from the API as a attribute in the html element
    challengesRoom.setAttribute("data-labels", room.labels.join(","));

    // This adds rating value from API as a DOM-element value
    challengesRoom.rating = room.rating;
    // Adding an id for easier finding
    if (room.type === "online") {
      challengesRoom.setAttribute("id", "online");
    } else {
      challengesRoom.setAttribute("id", "onsite");
    }
    container.appendChild(challengesRoom);
    //Creating a div for the room inside the container
    const rooms = document.createElement("div");
    rooms.classList.add("room");
    challengesRoom.appendChild(rooms);

    const imageContainer = document.createElement("div");
    imageContainer.classList.add("room__image-container");
    rooms.appendChild(imageContainer);

    //creating an image for the room, using the rooms title as description
    const img = document.createElement("img");
    img.classList.add("room__img");
    img.src = room.image;
    img.alt = `Picture of the room ${room.title}`;
    imageContainer.appendChild(img);
    //Creating a div to hold the icons
    const iconContainer = document.createElement("div");
    iconContainer.classList.add("room__type-icon");
    //create icon depending on which room type
    const roomIcon = document.createElement("i");
    if (room.type === "online") {
      roomIcon.classList.add("fa-solid", "fa-laptop");
    } else {
      roomIcon.classList.add("fa-solid", "fa-house");
    }
    iconContainer.appendChild(roomIcon);
    imageContainer.appendChild(iconContainer);
    //adding heading for each room
    const heading = document.createElement("h3");
    heading.classList.add("room__heading");
    heading.textContent = `${room.title} (${room.type})`;
    rooms.appendChild(heading);
    //Creating a div to hold the stars.
    const roomStars = document.createElement("div");
    roomStars.classList.add("room__stars");
    imageContainer.appendChild(roomStars);
    //Rounds down the rating to nearst "whole number" for filled stars
    const fullStar = Math.floor(room.rating);
    //Checks if the rating has a decimal for a half star between 0.1 - 0.9.
    const halfStar = room.rating % 1 !== 0;
    //Counts the number of empty stars by taking 5 minus the rating, then rounds up.
    const emptyStar = 5 - Math.ceil(room.rating);
    //Making a for-loop that generates stars with fontawesome icons based on the room.rating from fullstar.
    for (let i = 0; i < fullStar; i++) {
      const star = document.createElement("i");
      star.classList.add("fa-solid", "fa-star");
      roomStars.appendChild(star);
    }
    //if the rating has a decimal, a half star will be added.
    if (halfStar) {
      const decimalStar = document.createElement("i");
      decimalStar.classList.add("fa-solid", "fa-star-half-stroke");
      roomStars.appendChild(decimalStar);
    }
    //A loop that fills the rest of the stars as empty.
    for (let i = 0; i < emptyStar; i++) {
      const unfilledStar = document.createElement("i");
      unfilledStar.classList.add("fa-regular", "fa-star");
      roomStars.appendChild(unfilledStar);
    }
    //Adding the number of participants per room
    const participants = document.createElement("p");
    participants.classList.add("room__participants");
    participants.textContent = `${room.minParticipants} - ${room.maxParticipants} participants`;
    rooms.appendChild(participants);
 
    //adding the description for each room
    const roomInfo = document.createElement("p");
    roomInfo.classList.add("room__info");
    roomInfo.textContent = room.description;
    rooms.appendChild(roomInfo);
    //Creating the div to hold the button
    const roomActions = document.createElement("div");
    roomActions.classList.add("challenges__actions");
    rooms.appendChild(roomActions);
    //creating button for each room
    const button = document.createElement("button");
    button.type = "button";
    //In this if-statement, the text and class of a button gets set based on the data from API ("online" and "onsite").
    if (room.type === "onsite") {
      button.textContent = "Book this room";
      button.classList.add("room__button--onsite");
    } else if (room.type === "online") {
      button.textContent = "Take challenge online";
      button.classList.add("room__button--online");
    }
    roomActions.appendChild(button);
  });
}

generateRoom();

//Calls the textfilter function, but only for the challenges__container which is located on challenges.html.
if (document.querySelector("#challenges__container")) {
  allFilters();
}