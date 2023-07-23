// Project : Currency Converter App
import { Country_List } from "./countries.js";

const baseCurrency = document.querySelector("#base-currency");
const targetCurrency = document.querySelector("#target-currency");
const countriesArray = Object.entries(Country_List);
const amountInput = document.querySelector("#amount");
const submitBtn = document.querySelector("button");
const result = document.querySelector("p");
const APIKey = `8636123eb435b05b77958bea`;
const change = document.querySelector(".arrows");
const flagImgBase = document.querySelector(".base img");
const flagImgtarget = document.querySelector(".target img");
// add options
for (let i = 0; i < countriesArray.length; i++) {
  const optionB = document.createElement("option");
  optionB.textContent = countriesArray[i][0];
  optionB.setAttribute("flag", countriesArray[i][1]);
  baseCurrency.appendChild(optionB);
  ////
  const optionT = document.createElement("option");
  optionT.textContent = countriesArray[i][0];
  optionT.setAttribute("flag", countriesArray[i][1]);
  targetCurrency.appendChild(optionT);
}
// fetch data for the default values
onload = fetchData();
// fetch data from the enterd values when clicking the btn
submitBtn.addEventListener("click", fetchData);
// swap currencies
change.addEventListener("click", function () {
  [
    baseCurrency.value,
    flagImgBase.src,
    targetCurrency.value,
    flagImgtarget.src,
  ] = [
    targetCurrency.value,
    flagImgtarget.src,
    baseCurrency.value,
    flagImgBase.src,
  ];
  fetchData();
});
// fetchData function that fetch data
async function fetchData() {
  if (amountInput.value === "") return;
  result.textContent = "Getting exchange rate...";
  try {
    let data = await fetch(
      `https://v6.exchangerate-api.com/v6/${APIKey}/pair/${baseCurrency.value}/${targetCurrency.value}/${amountInput.value}`
    );
    data = await data.json();
    // show the result on the page
    result.textContent = `${amountInput.value} ${
      baseCurrency.value
    } = ${data.conversion_result.toFixed(2)} ${targetCurrency.value}`; // end showing
  } catch (error) {
    console.log(error);
  }
}
//
const updateFlagImages = () => {
  const selectedBaseCurrency = baseCurrency.options[baseCurrency.selectedIndex];
  const selectedTargetCurrency =
    targetCurrency.options[targetCurrency.selectedIndex];

  flagImgBase.src = `https://flagsapi.com/${selectedBaseCurrency.getAttribute(
    "flag"
  )}/flat/32.png`;
  flagImgtarget.src = `https://flagsapi.com/${selectedTargetCurrency.getAttribute(
    "flag"
  )}/flat/32.png`;
};

baseCurrency.onchange = updateFlagImages;
targetCurrency.onchange = updateFlagImages;
