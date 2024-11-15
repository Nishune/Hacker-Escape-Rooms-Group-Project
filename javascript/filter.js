async function filterRoom() {
    const data = await challengesApi();
    const roomData = data.challenges;
    const filterData = roomData.filter((room) => room.rating < 1);
    console.log(filterData);
}

filterRoom();