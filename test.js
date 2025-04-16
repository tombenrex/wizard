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

async function fetchPosts() {
    const postsUrl = "https://jsonplaceholder.typicode.com/posts";
    const response = await fetch(postsUrl);

    if(!response.ok){
    throw new Error("Gick inte att hömta posts:", response.message);
    }
    const postsData = await response.json();
    renderPosts(postsData);
}

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
                    displayUserInfo(user);
                }, 200);
            } else {
            displayUserInfo(user);
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


  //hur ser aside ut i mobilskärm? Öppnas den neråt från user-diven?
//Öppnar aside, anropar renterUserDetails(), hämtar och visar posts
async function displayUserInfo(user) {
    const userInfoAside = document.getElementById("user-info-aside");
    userInfoAside.innerHTML = '<i id="close-aside" class="bx bx-arrow-to-right"></i>';
    document.querySelector("#close-aside").addEventListener("click", closeAside);
    openAside();

    renderUserDetails(user, userInfoAside);

    const userPosts = await fetchUserPosts(user.id);
    const postsContainer = await renderUserPosts(userPosts);
    const userTodos = await fetchTodo(user.id);
    const todoContainer = await renderTodos(userTodos)

    userInfoAside.appendChild(postsContainer);
    userInfoAside.appendChild(todoContainer);
}

//visar user-info och lägger i element
function renderUserDetails(user, container) {
    const name = document.createElement("h2");
    name.textContent = user.name;
    name.classList.add("user-info");
    container.appendChild(name);

    const username = document.createElement("h3");
    username.textContent = `Username: ${user.username}`;
    username.classList.add("user-info");
    container.appendChild(username);

    const email = document.createElement("h3");
    email.textContent = `Email: ${user.email}`;
    email.classList.add("user-info");
    container.appendChild(email);
}

//Fetchar användares posts
async function fetchUserPosts(userId) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    return await response.json();
}

//Skapar container, div för varje post, hämtar rätt kommentarer
async function renderUserPosts(posts) {
    const container = document.createElement("div");
    container.className = "posts-container";

    for (const post of posts) {
        const postDiv = document.createElement("div");
        postDiv.className = "post-div";
        postDiv.innerHTML = `<h4>${post.title}</h4><p>${post.body}</p>`;

        const comments = await fetchPostComments(post.id);
        const commentsList = createCommentsList(comments.slice(0, 3));
        postDiv.appendChild(commentsList);

        container.appendChild(postDiv);
    }

    return container;
}

//Hämtar kommentarer från api
async function fetchPostComments(postId) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
    return await response.json();
}

//Skapar lista för kommentarna
function createCommentsList(comments) {
    const ul = document.createElement("ul");
    comments.forEach(comment => {
        const li = document.createElement("li");
        li.textContent = comment.body;
        ul.appendChild(li);
    });
    return ul;
}
//Hämta todo från api
async function fetchTodo(userId) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/user/${userId}/todos`);
    return await response.json();
}
//skapa container och div för varje todo
async function renderTodos(todos) {
    const todoContainer = document.createElement("div");
    todoContainer.className = "todos-container";

    for (const todo of todos) {
        const todoDiv = document.createElement("div");
        todoDiv.className = "todo-div";
        todoDiv.innerHTML = `<h4>${todo.title}</h4><p>${todo.completed}</p>`;

        todoContainer.appendChild(todoDiv);
    }

    return todoContainer;
}