// Listen for submit
document.querySelector("#loan-form").addEventListener("submit", function (e) {
  e.preventDefault();
  //Hide results
  document.getElementById("results").style.display = "none";
  //Show loader
  document.getElementById("loading").style.display = "block";

  setTimeout(calculateResults, 2000);
});

// calculate function
function calculateResults(e) {
  //UI variables
  const amount = document.getElementById("amount");
  const interest = document.getElementById("interest");
  const years = document.getElementById("years");
  const monthlyPaymnent = document.getElementById("monthly-payment");
  const totalPaymnent = document.getElementById("total-payment");
  const totalinterest = document.getElementById("total-interest");

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // Compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPaymnent.value = monthly.toFixed(2);
    totalPaymnent.value = (monthly * calculatedPayments).toFixed(2);
    totalinterest.value = (monthly * calculatedPayments - principal).toFixed(2);

    //Show result
    document.getElementById("results").style.display = "block";

    //hide loader
    document.getElementById("loading").style.display = "none";
  } else {
    showError("Please check your numbers");
  }
}

//Show Error
function showError(error) {
  //Hide result
  document.getElementById("results").style.display = "none";

  //hide loader
  document.getElementById("loading").style.display = "none";
  //Get elements
  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");
  //Create div
  const errorDiv = document.createElement("div");
  //Add class
  errorDiv.className = "alert alert-danger";
  //Create tex node and append to div

  errorDiv.appendChild(document.createTextNode(error));
  //Insert error above heading
  card.insertBefore(errorDiv, heading);

  // clear error after 3 sec
  setTimeout(clearError, 3000);
}

function clearError() {
  document.querySelector(".alert").remove();
}
