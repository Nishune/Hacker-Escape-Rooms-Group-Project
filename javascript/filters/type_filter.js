export function filterType(data) {
    const onlineChallenges = document.querySelector("#online-challenges");
    const onsiteChallenges = document.querySelector("#on-site-challenges");

    // Checking if filter button can be worked with
    if (onlineChallenges) {
        // Add event listener on online challenges filter button
        onlineChallenges.addEventListener("change", () => {
            // put all DOM elements with class challenges__room in one variable
            const allChallenges = document.querySelectorAll(".challenges__room");
            // Go through that variable
            allChallenges.forEach((challenge) => {
                // If online filter has been unchecked but onsite filter is checked 
                // Show only onsite challenges
                if (!onlineChallenges.checked && onsiteChallenges.checked) {
                    if (challenge.getAttribute("id") === "onsite") {
                        challenge.style.display = "";
                    } else {
                        challenge.style.display = 'none';
                    }
                }
                // Show the hidden challenges if online filter is unchecked
                else if (!onlineChallenges.checked) {
                    challenge.style.display = "";
                } 
                // All the challenges will appear if both checkboxes are checked
                else if (onlineChallenges.checked && onsiteChallenges.checked) {
                    challenge.style.display = "";
                }
                // Else "hide" the onsite cards
                else {
                    if (challenge.getAttribute("id") === "online") {
                        challenge.style.display = "";
                    } else {
                        challenge.style.display = 'none';
                    }
                }
            })
        });
    };

    // Almost the same code as above. This is for including onsite cards
    if (onsiteChallenges) {
        onsiteChallenges.addEventListener("change", () => {
            const allChallenges = document.querySelectorAll(".challenges__room");

            allChallenges.forEach((challenge) => {
                if (!onsiteChallenges.checked && onlineChallenges.checked) {
                    if (challenge.getAttribute("id") === "online") {
                        challenge.style.display = "";
                    } else {
                        challenge.style.display = 'none';
                    }
                }
                else if (!onsiteChallenges.checked) {
                    challenge.style.display = "";
                } 
                else if (onlineChallenges.checked && onsiteChallenges.checked) {
                    challenge.style.display = "";
                } 
                else {
                    if (challenge.getAttribute("id") === "onsite") {
                        challenge.style.display = "";
                    } else {
                        challenge.style.display = 'none';
                    }
                }
            })
        });
    };


    onlineChallenges.addEventListener('change', () => {
        if (data.types.includes("online")) {
            const i = data.types.indexOf("online");
            if (i > -1) {
                data.types.splice(i, 1);
            }
        }
        else {
            data.types.push("online");
        }
        console.log(data);
    })

    onsiteChallenges.addEventListener('change', () => {
        if (data.types.includes("onsite")) {
            const index = data.types.indexOf("onsite");
            if (index > -1) {
                data.types.splice(index, 1);
            }
        }
        else {
            data.types.push("onsite");
        }
        console.log(data);
    })
};