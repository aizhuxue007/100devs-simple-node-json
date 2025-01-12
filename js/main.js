document.querySelector('#clickMe').addEventListener('click', renderPizza)

const pizzaMenu = {
  'cheese': "/assets/cheese-pizza.png",
  'pepperoni': "/assets/pepperoni-pizza.jpg",
  'cbr': "/assets/cb-ranch.png"
}

async function renderPizza() {
  const pizzaRequest = document.querySelector("#pizza-input").value;
  const req = fetch(`${pizzaMenu[pizzaRequest]}`);
  
  document.querySelector("#pizza").src = pizzaMenu[pizzaRequest]
}
