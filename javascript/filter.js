/* const filter__firstRate = document.querySelector(".filter__first-rate");
const filter__firstRateValue = filter__firstRate.querySelector("input:checked").value;

const filter__secondRate = document.querySelector(".filter__second-rate");
const filter__secondRateValue = filter__secondRate.querySelector("input:checked").value;
*/

function cardStatus() {

}

async function filterRoom() {
    const data = await challengesApi();
    const roomData = data.challenges;
    const filterData = roomData.filter((room) => room.rating < 1);
    console.log(filterData);
}

filterRoom();