const btn = document.getElementById("btn");
const form = document.getElementById("form");
const name = document.getElementById("name");
const price = document.getElementById("price");
const description = document.getElementById("description");

function validate() {
  return true;
}

function createCard(phone) {
  return `
     <div class="card">
      <h3>${phone.name}</h3>
      <h3>${phone.price}</h3>
      <p>${phone.description}</p>

      <button data-id= '${phone.id}'>delete</button>
      </div>
      `;
}

form &&
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const isValid = validate();
    if (!isValid) {
      return;
    }
    btn.setAttribute("disabled", true);
    name.setAttribute("readonly", true);
    price.setAttribute("readonly", true);
    description.setAttribute("readonly", true);
    const product = {
      name: name.value,
      description: description.value,
      status: "active",
      category_id: 2,
      price: price.value,
    };
    fetch("https://auth-rg69.onrender.com/api/products/", {
      method: "POST",

      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((response) => {
        if (response.status == 200) {
          return response.json();
        }
      })
      .then((data) => {
        let card = createCard(data);
        container.innerHTML += card;
        form.reset();
      })

      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        btn.removeAttribute("disabled");
        name.removeAttribute("readonly");
        price.removeAttribute("readonly");
        description.removeAttribute("readonly");
      });
  });

document.addEventListener("DOMContentLoaded", function () {
  fetch("https://auth-rg69.onrender.com/api/products/all")
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
    })
    .then((data) => {
      if (Array.isArray(data)) {
        container.innerHTML = "";
        data.forEach((phone) => {
          let card = createCard(phone);
          container.innerHTML += card;
        });

        let deleteButtons = document.querySelectorAll(".card button");
        if (deleteButtons.length > 0) {
          deleteButtons.forEach((deleteButton) => {
            deleteButton &&
              deleteButton.addEventListener("click", function () {
                let confirmDelete = confirm("Rostdan ham uchirmoqchimisz");
                let elementId = this.getAttribute("data-id");
                if (confirmDelete && elementId) {
                  fetch(
                    `https://auth-rg69.onrender.com/api/products/${elementId}`,
                    {
                      method: "DELETE",
                    }
                  )
                    .then((response) => {
                      if (response.status == 200) {
                        return response.json();
                      }
                    })
                    .then((data) => {
                      console.log(data);
                      if (
                        data.message == "Mahsulot muvaffaqiyatli o'chirildi"
                      ) {
                        this.parentNode.remove();
                      }
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                }
              });
          });
        }
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

const text = document.getElementById("text");
const red = document.querySelector(".red");
const green = document.querySelector(".green");
const blue = document.querySelector(".blue");

red &&
  red.addEventListener("click", function () {
    text.style.color = "red";
  });
green &&
  green.addEventListener("click", function () {
    text.style.color = "green";
  });
blue &&
  blue.addEventListener("click", function () {
    text.style.color = "blue";
  });

//===================================================================================================
//2-masala
const restartbtn = document.querySelector(".restartbtn");
const stopbtn = document.querySelector(".stopbtn");
const playbtn = document.querySelector(".playbtn");
const time = document.querySelector(".time");
const circle = document.querySelector(".circle");
let times = 0;
let timer;
playbtn &&
  playbtn.addEventListener("click", function () {
    if (!timer) {
      timer = setInterval(() => {
        circle.classList.add("playing");
        times++;
        const minute = Math.floor((times / 3600) * 60)
          .toString()
          .padStart(2, "0");
        const secund = Math.floor((times % 3600) % 60)
          .toString()
          .padStart(2, "0");
        time.textContent = `${minute}:${secund}`;
      }, 1000);
    }
  });
stopbtn &&
  stopbtn.addEventListener("click", function () {
    clearInterval(timer);
    circle.classList.remove("playing");
    timer = 0;
  });

restartbtn &&
  restartbtn.addEventListener("click", function () {
    circle.classList.remove("playing");
    clearInterval(timer);
    times = 0;
    time.textContent = "00:00";
    timer = false;
  });
