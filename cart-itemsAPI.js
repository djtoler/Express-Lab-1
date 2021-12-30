console.log("start");
let sectionContainer = document.getElementById("container");
const displayJsonLink = (e) => {
    e.preventDefault()
  console.log("hi");
  let input = document.getElementById("subreddit");
  let jsonLink = input.value;
  console.log(jsonLink);
    fetch(jsonLink)
      .then((res) => res.json())
      .then((data) => {
        let target = data;
        console.log(target);
        for (let i = 0; i <= target.length - 1; i++) {
// ---------------------------------->Store object properties inside a variable.<-------------------------------
          let id = data[i].id;
          let product = data[i].product;
          let price = data[i].price;
          let quantity = data[i].quantity;
// ---------------------------------->Create set of HTML elements to house each object property.<-------------------------------
          let header = document.createElement("h1");
          let header2 = document.createElement("h2");
          let p1 = document.createElement("p");
          let p2 = document.createElement("p");
// ---------------------------------->Append each object property to an HTML element.<-------------------------------
          header.append(id);
          header2.append(product);
          p1.append(price);
          p2.append(quantity);
// ---------------------------->Create HTML element to house each HTML element with a object property.<-------------------------------
          let postItem = document.createElement("div");
// ------------------------------>Append each HTML element that has an object property to new postItem div.<-------------------------------
          postItem.append(header);
          postItem.append(header2);
          postItem.append(p1);
          postItem.append(p2);
// ---------------------------------->Append postItem div to main page container div.<-------------------------------
          sectionContainer.append(postItem);
        }
    });
};

let search = document.getElementById("search");
search.addEventListener("click", displayJsonLink());
