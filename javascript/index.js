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
  console.log(data);
  return data;
}
 //Creating a function for generating the rooms, that also calls the challengesAPI function to get the data from the API.
async function generateRoom() {
  const data = await challengesApi();
  const roomData = data.challenges;
  const challenges__container = document.querySelector("#challenges__container");
  const content__rooms = document.querySelector(".content__rooms");
//If-statement to generate room based on which container they should be added. 
  let container;
  if (challenges__container) {
    container = challenges__container;
  } else if (content__rooms) {
    container = content__rooms;
    roomData.sort((a,b) => b.rating - a.rating); //Using sort to sort the rooms based on highest to lowest rating.
    roomData.length = 3; //Takes the 3 first elements in the sorted array.
  }
   //forEach loop that loops through the challenges array which is located in the data from the API.
  roomData.forEach((room) => {
    //Creating a room with the same "structure" as in previous hardcoded HTML, adds correct class depending on container and gets appended to the dynamic container variable.
    const challengesRoom = document.createElement("div");
    challengesRoom.classList.add(content__rooms ? "content__room" : "challenges__room");
    container.appendChild(challengesRoom);
    //Creating a div for the room inside the container
    const rooms = document.createElement("div");
    rooms.classList.add("room");
    challengesRoom.appendChild(rooms);
    //creating an image for the room, using the rooms title as description
    const img = document.createElement("img");
    img.classList.add("room__img");
    img.src = room.image;
    img.alt = `Picture of the room ${room.title}`;
    rooms.appendChild(img);
    //adding heading for each room
    const heading = document.createElement("h3");
    heading.classList.add = ("room__heading");
    heading.textContent = (`${room.title} (${room.type})`)
    rooms.appendChild(heading);
    //adding first the div for the star pictures
    const roomStars = document.createElement("div");
    roomStars.classList.add("room__stars");
    rooms.appendChild(roomStars);
    //Making a for-loop that generates stars based on rating number from API-data.
    for (let i = 1; i <= 5; i++){
    const starImg = document.createElement("img");
    if (i <= room.rating) {
      starImg.src = "./img/starfilled.png";
      starImg.alt = "Filled star for rating of the room."
    } else {
      starImg.src = "./img/starunfilled.png";
      starImg.alt = "Unfilled star for rating of the room."
    }
    roomStars.appendChild(starImg);
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
      button.textContent = "Book this room"
      button.classList.add("room__button--onsite")
    } else if (room.type === "online") {
      button.textContent = "Take challenge online"
      button.classList.add("room__button--online")
    }
    roomActions.appendChild(button);

  })
}
generateRoom();