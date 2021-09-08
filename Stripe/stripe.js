
//cdn  stripe
//<script defer src="https://js.stripe.com/v3/"></script>

//* clef public de l api
let stripe = Stripe(
  "public Key"
);

//* Cette méthode crée une instance de Elements, qui gère un groupe d'éléments.
let elements = stripe.elements();

//* creation du formulaire de carte bancaire
let card = elements.create("card", { style: style });
card.mount("#card-element");

//* gestion de la saisie
card.addEventListener("change", (e) => {
  let displayError = document.getElementById("card-errors");
  if (e.error) {
    displayError.textContent = e.error.message;
  } else {
    displayError.textContent = "";
  }
});

let form = document.getElementById("payment-form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  //recuperation du prix 
  let price = window.location["search"];
  price = price.split("=")[1];
  console.log(price);
  
  stripe.createToken(card).then(function (result) {
    if (result.error) {
      //* gestion et affichage des erreurs
      let errorElement = document.getElementById("card-errors");
      errorElement.textContent = result.error.message;
    } else {
      //* creation du token
      stripeTokenHandler(result.token);
    }
  });
});

//*gestion du token et envoi en back-end
function stripeTokenHandler(token, price) {
  let form = document.getElementById("payment-form");
  let hiddenInput = document.createElement("input");
  hiddenInput.setAttribute("type", "text");
  hiddenInput.setAttribute("value", token.id);
  hiddenInput.setAttribute("name", "tok_visa");
  console.log(hiddenInput.value);
  form.appendChild(hiddenInput);
  form.submit();
}

