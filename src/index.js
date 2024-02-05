const ramenMenu = document.querySelector("#ramen-menu");
const newRamen = document.querySelector("#new-ramen");

//fetch get ramen data
fetch("http://localhost:3000/ramens")
  .then(res => res.json())
  .then(ramens => ramens.forEach(ramen => renderRamen(ramen)))

//render ramens
function renderRamen(ramen) {
  const img = document.createElement("img");
  img.src = `${ramen.image}`;
  img.alt = "Ramen image";
  ramenMenu.append(img);

  img.addEventListener("click", () => handleRamenImgClick(ramen))
}

//display ramen info after click
function handleRamenImgClick(ramen) {
  const ramenDetail = document.querySelector("#ramen-detail");
  const ratingDisplay = document.querySelector("#rating-display");
  const commentDisplay = document.querySelector("#comment-display");

  ramenDetail.innerHTML = `
    <img class="detail-image" src=${ramen.image} alt=${ramen.name} />
    <h2 class="name">${ramen.name}</h2>
    <h3 class="restaurant">${ramen.restaurant}</h3>
  `
  ratingDisplay.textContent = `${ramen.rating}`;
  commentDisplay.textContent = `${ramen.comment}`;
}

//add new ramen
newRamen.addEventListener("submit", (e) => handleNewRamenSubmit(e))

function handleNewRamenSubmit(e) {
  e.preventDefault();
  const newRamen = {
    name: e.target["new-name"].value,
    restaurant: e.target["new-restaurant"].value,
    image: e.target["new-image"].value,
    rating: e.target["new-rating"].value,
    comment: e.target["new-comment"].value
  }
  fetch("http://localhost:3000/ramens", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify(newRamen)
  })
    .then(res => res.json())
    .then(addNewRamen => renderRamen(addNewRamen))
  e.target.reset();
}