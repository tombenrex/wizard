// Fetch users! ......................................................
async function fetchUsers() {
  const usersUrl = "https://jsonplaceholder.typicode.com/users";

  const response = await fetch(usersUrl);

  if (!response.ok) {
    throw new Error("Response not ok!:", response.message);
  }
  const userData = await response.json();
  renderUsers(userData);
}
fetchUsers();
// ..................................................................
// User div elements & eventlistener per user .........................
function renderUsers(userData) {
  const usersContainer = document.querySelector("#users-container");
  userData.forEach((user) => {
    const userDiv = document.createElement("div");
    userDiv.classList.add("user-div");
    usersContainer.appendChild(userDiv);

    const username = document.createElement("h4");
    username.id = "username-text";
    username.textContent = user.name;
    userDiv.appendChild(username);

    userDiv.addEventListener("click", () => {
      console.log("user id:", user.id, "clicked");

      if (aside.style.width === "70%") {
        aside.style.width = "1%";
        setTimeout(() => {
          aside.style.width = "70%";
        }, 200);
      } else {
        openAside();
      }
    });
  });
}
// ..................................................................
// Aside logik ......................................................
const aside = document.querySelector("#user-info-aside");
document.querySelector("#close-aside").addEventListener("click", () => {
  closeAside();
});

function openAside() {
  aside.style.display = "flex";
  setTimeout(() => {
    aside.style.width = "70%";
  }, 0);
}

function closeAside() {
  aside.style.width = "1%";
  setTimeout(() => {
    aside.style.display = "none";
  }, 100);
}
// ..................................................................
