//Variables.
const closeBooking1 = document.querySelector(".modal__button_close");
const windowBooking1 = document.querySelector(".modal")
const inputDate = document.querySelector(".modal__input")
const searchTimesBtn = document.querySelector(".modal__button");
const roomTitle = document.querySelector(".modal__title");
const room2Title = document.querySelector(".modal__title2");
if(roomTitle && room2Title){
    room2Title.className = roomTitle.className;
    room2Title.textContent = roomTitle.innerHTML= "Book room" 
    
}
roomTitle.innerHTML = "test olala"
//Event-listners.
closeBooking1.addEventListener("click", hideWindow);

//Menu-functions.
function hideWindow() {
windowBooking1.setAttribute("id","hidden")
}

searchTimesBtn.addEventListener("click", getDate);

let inputChallenge = 1 // 




//Takes date and gets slot data 
function getDate() {
console.log(inputDate.value)
if (inputDate.value==""){
    console.log("No date selected") // Error message if no date is selected
    return
}

// Collect data from api
let apiCall = `https://lernia-sjj-assignments.vercel.app/api/booking/available-times?date=${inputDate.value}&challenge=${inputChallenge}`;
let slotTimes = [];
// Checks the API if data is okay
fetch(apiCall)
.then(response => {
    if (!response.ok) {
        throw new Error("Network response was not ok"); // Error message if bad data
    }
    return response.json(); // Parse data from response
})
.then(data => {
    console.log(data);  // Handle the data from the API
    data.slots.forEach(slot => {
    console.log(slot)}) // Output available slots on that date
    slotTimes = data.slots;
    const event = new CustomEvent('arrayEvent', {
        detail: {
            message: 'Button clicked, sending array!',
            data: slotTimes, // Include the array
        },
    });
    hideWindow()
    // Dispatch the event on the document
    document.dispatchEvent(event);
})
.catch(error => {
    console.error("There was a problem with the fetch operation", error);
})

};





// Add a click event listener

windowBooking1.addEventListener('click', () => {
    // Create a custom event with the array in the detail property
    const event = new CustomEvent('arrayEvent', {
        detail: {
            message: 'Button clicked, sending array!',
            data: slotTimes, // Include the array
        },
    });

    // Dispatch the event on the document
    document.dispatchEvent(event);
});




searchTimesBtn.addEventListener("click",() => {
    windowBooking1.style.display ="none";
    Bookroom_modal.style.display ="flex";
})
overlay.addEventListener("click",() => {
    Bookroom_modal.style.display = "none";

})

export function openModal(bookModal1, roomTitle) {
    console.log("hejsan snygging:", bookModal1);
    const modal = document.querySelector(".modal");
    const titleChallenge = modal.querySelector("room.title");
    if(modal) {
        modal.style.display = "flex";
        
        if (titleChallenge) {
            titleChallenge.textContent = roomTitle;
        }
    } else {
        console.error("modal is not found", bookModal1)
    }
}