


document.addEventListener("DOMContentLoaded", () => {
   
 
});

export function showLoadingIndicator() {
    let loadingIndicator = document.getElementById("loadingIndicator");

    if (!loadingIndicator) {
      const challenges = document.querySelector(".challenges");
        loadingIndicator = document.createElement("div");
        loadingIndicator.id = "loadingIndicator";
        challenges.appendChild(loadingIndicator);
    }

    loadingIndicator.style.display = "flex"; 
}


export function hideLoadingIndicator() {
    const loadingIndicator = document.getElementById("loadingIndicator");
    if (loadingIndicator) {
        setTimeout(() => {
            loadingIndicator.style.display="none";
        }, 300);
        
    }
}