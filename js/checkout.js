const form = document.querySelector("form");
const payBtn = document.querySelector(".pay-button");
const errorSpan = document.querySelector(".form-error");
  
payBtn.addEventListener("click", function (e) {
e.preventDefault();
errorSpan.textContent = "";
  
if (form.checkValidity()) {
  errorSpan.style.color = "green";
  errorSpan.textContent = "Payment made successfully!";
  form.reset();
} else {
    errorSpan.style.color = "red";
    errorSpan.textContent = "* Please fill out all required fields.";
    form.reportValidity();
  }
});
