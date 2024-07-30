const API_URL = "http://localhost:8000";
const wrapper = document.querySelector(".wrapper");
const form = document.querySelector(".form");

const [
  fnameInput,
  lnameInput,
  usernameInput,
  passwordInput,
  urlInput,
  ageInput,
] = form.querySelectorAll("input");

async function fetchData(api) {
  let response = await fetch(`${api}/users`);
  response
    .json()
    .then((res) => userData(res))
    .catch((err) => console.log(err));
}

fetchData(API_URL);

function userData(data) {
  while (wrapper.firstChild) {
    wrapper.firstChild.remove();
  }
  data.payload?.forEach((user) => {
    let card = document.createElement("div");
    card.classList.add("card");
    card.dataset.id = user.id;
    card.innerHTML = `
            <img src=${user.url} alt="">
             <div class="card__info">
                <h3>${user.fname}</h3>
                <h3>${user.lname}</h3>
            </div>
            <p><b>username</b>:${user.username}</p>
            <p><b>age</b>:${user.age}</p>
            <div class="btns">
                <button>edit</button>
                <button>delete</button>
            </div>
    `;
    wrapper.appendChild(card);
  });
}
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let newUser = {
    fname: fnameInput.value,
    lname: lnameInput.value,
    username: usernameInput.value,
    password: passwordInput.value,
    url: urlInput.value,
    age: ageInput.value,
  };
});
