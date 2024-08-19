const submit = document.getElementById("submit");
const clearAll = document.getElementById("clear-all");
const amount = document.getElementById("mortgage-amount");
const term = document.getElementById("mortgage-term");
const rate = document.getElementById("interest-rate");
const rbRepayment = document.getElementById("rb-repayment");
const rbInterestOnly = document.getElementById("rb-interest-only");
const resultsEmptyContainer = document.querySelector("div.results-empty");
const mortgageType = document.querySelectorAll("input[name='mortgage-type'");
const showResultContainer = document.querySelector("div.show-result");
const monthlyTotal = document.getElementById("monthly-total");
const termTotal = document.getElementById("term-total");

clearAll.addEventListener("click", (ev) => {
    amount.value = "";
    term.value = "";
    rate.value = "";
    rbRepayment.checked = false;
    rbInterestOnly.checked = false;
    showResultContainer.style.display = "none";
    resultsEmptyContainer.style.display = "flex"
});

function calculateMortgage() {
    const mortgageAmount = parseFloat(amount.value);
    const mortgageTerm = parseInt(term.value);
    const interestRate = parseFloat(rate.value);
    const monthlyInterestRate = interestRate / 100 / 12;
    const total = mortgageTerm * 12;
    let monthlyPayment, totalRepaid;
    for (const type of mortgageType) {
        if(!type.checked){
            continue;
        }

        if(type.value === 'repayment'){
            monthlyPayment = (mortgageAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, total)) / (Math.pow(1 + monthlyInterestRate, total) - 1);
            totalRepaid = monthlyPayment * total;
            
        }
        else if(type.value === 'interest-only') {
            monthlyPayment = mortgageAmount * monthlyInterestRate;
            totalRepaid = monthlyPayment * total + mortgageAmount;
        }
    }

    const formatMonthlyPayment = monthlyPayment.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2  
    });

    const formatRepaid = totalRepaid.toLocaleString(undefined,  {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    monthlyTotal.textContent = `$${formatMonthlyPayment}`;
    termTotal.textContent = `$${formatRepaid}`;

    return {
        monthlyPayment: formatMonthlyPayment,
        totalRepaid: formatRepaid
    }

}

function showResults() {
    resultsEmptyContainer.style.display = "none";
    showResultContainer.style.display = "flex";
}

const handleSubmit = (event) => {
    event.preventDefault();
    let isValid = true;
    if(amount.value.trim() === ""){
        document.querySelector("span.prefix").style.background = "var(--red--color)";
        document.querySelector("span.prefix").style.color = "var(--white--color)";
        document.querySelector(".amount").style.borderColor = "red";
        document.querySelector(".amount-required").style.display = "block";
        isValid = false;
    }
    else {
        document.querySelector(".amount").style.borderColor = "inherit";
        document.querySelector(".amount-required").style.display = "none";
        document.querySelector("span.prefix").style.background = "var(--slate--100--color)";
        document.querySelector("span.prefix").style.color = "inherit";
    }

    if(term.value.trim() === ""){
        document.querySelector("#mortgage-term + span.suffix").style.background = "var(--red--color)";
        document.querySelector("#mortgage-term + span.suffix").style.color = "var(--white--color)";
        document.querySelector(".term").style.borderColor = "red";
        document.querySelector(".term-required").style.display = "block";
        isValid = false;
    }
    else {
        document.querySelector(".term-required").style.display = "none";
        document.querySelector("#mortgage-term + span.suffix").style.background = "var(--slate--100--color)";
        document.querySelector("#mortgage-term + span.suffix").style.color = "inherit";
        document.querySelector(".term").style.borderColor = "inherit";
    }

    if(rate.value.trim() === ""){
        document.querySelector(".interest__rate-required").style.display = "block";
        document.querySelector("#interest-rate + span.suffix").style.background = "var(--red--color)";
        document.querySelector("#interest-rate + span.suffix").style.color = "var(--white--color)";
        document.querySelector(".rate").style.borderColor = "red";
        isValid = false;
    }
    else {
        document.querySelector(".interest__rate-required").style.display = "none";
        document.querySelector("#interest-rate + span.suffix").style.background = "var(--slate--100--color)";
        document.querySelector("#interest-rate + span.suffix").style.color = "inherit";
        document.querySelector(".rate").style.borderColor = "inherit";
    }

    if(!(rbInterestOnly.checked || rbRepayment.checked)){
        document.querySelector(".mortgage__type-required").style.display = "block";
        isValid = false;
    }
    else {
        document.querySelector(".mortgage__type-required").style.display = "none";
    }

    if(!isValid){
        return;
    }

    calculateMortgage();
    showResults();
}

submit.addEventListener('click', handleSubmit);




