//GET DOM ELEMENTS
const stockName = document.getElementById("stockName");
const currentPrice = document.getElementById("movingAverage");
const currentDate = document.getElementById("currentDate");

const sector = document.getElementById("sector");
const yearRange = document.getElementById("yearRange");
const analystTargetPrice = document.getElementById("analystTargetPrice");
const marketCap = document.getElementById("marketCap");
const peRatio = document.getElementById("peRatio");
const beta = document.getElementById("beta");
const divYield = document.getElementById("divYield");
const dividendPerShare = document.getElementById("dividendPerShare");
const exDividendDate = document.getElementById("exDividendDate");
const description = document.getElementById("description");

const searchForm = document.getElementById("searchForm");
const searchBtn = document.getElementById("searchBtn");

const goodPriceTarget = document.getElementById("goodPriceTarget");
const betterPriceTarget = document.getElementById("betterPriceTarget");
const bestPriceTarget = document.getElementById("bestPriceTarget");

const watchListButton = document.getElementById("watchListButton");
const removeFromWatchListButton = document.getElementById("removeFromWatchListButton")
const watchList = document.getElementById("watchList");

const databaseURL = 'http://localhost:3000/watchList'


//event Listener for search form
searchForm.addEventListener("submit", renderSearch);

//fetch data from API
fetch(apiURL)
  .then((response) => response.json())
  .then((data) => renderData(data));
// .then((data) => renderPrice(data))

//fetch to get data from db.json
fetch("http://localhost:3000/watchList")
  .then((response) => response.json())
  .then((data) => data.forEach(displayWatchListItems));

//function that loads up data from the users search
function renderSearch(e) {
  e.preventDefault();

  let searchStock = e.target.search.value;
  let searchURL = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${searchStock}&${urlAPIKey}`;
  // let priceUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${searchStock}&${urlAPIKey}`;

  console.log(searchStock);
  console.log(searchURL);
  searchForm.reset();

  fetch(searchURL)
    .then((response) => response.json())
    .then((data) => renderData(data));

  // fetch(priceUrl)
  //   .then((response) => response.json())
  //   .then((data) => renderPrice(data));
}

//function to render data and add them to DOM
function renderData(object) {
  stockName.textContent = object.Name + ` (${object.Symbol})`;
  currentPrice.textContent = "$" + object["50DayMovingAverage"];
  yearRange.textContent =
    "$" + object["52WeekLow"] + "-" + "$" + object["52WeekHigh"];
  analystTargetPrice.textContent = "$" + object.AnalystTargetPrice;
  peRatio.textContent = object.PERatio;
  divYield.textContent = (object.DividendYield * 100).toFixed(2) + "%";
  beta.textContent = object.Beta;
  dividendPerShare.textContent = object.DividendPerShare;
  exDividendDate.textContent = object.ExDividendDate;
  sector.textContent = `Sector: ${object.Sector}`;
  description.textContent = object.Description;

  const capitalization = parseInt(object.MarketCapitalization);
  marketCap.textContent = intToString(capitalization);

  //formula for calculating the price entry points
  goodEntryPrice = (0.85 * parseInt(object["52WeekHigh"])).toFixed(2);
  goodPriceTarget.textContent = `$${goodEntryPrice}`;

  betterPriceEntry = (0.75 * parseInt(object["52WeekHigh"])).toFixed(2);
  betterPriceTarget.textContent = `$${betterPriceEntry}`;

  bestPriceEntry = (0.65 * parseInt(object["52WeekHigh"])).toFixed(2);
  bestPriceTarget.textContent = `$${bestPriceEntry}`;

  //event listener to add stock to watchList
  watchListButton.addEventListener("click", addToWatchList);

  //event listenter to remove stock from watchList
  removeFromWatchListButton.addEventListener("click",removeWatchList )
}

//function to get current data
function date() {
  date = new Date().toLocaleDateString();
  currentDate.append(date);
}
date();

//formula to get larger numbers to display in an abbreviated String
function intToString(value) {
  const suffixes = ["", "K", "M", "B", "T"];
  const suffixNum = Math.floor(("" + value).length / 3);
  let shortValue = parseFloat(
    (suffixNum != 0 ? value / Math.pow(1000, suffixNum) : value).toPrecision(2)
  );
  if (shortValue % 1 != 0) {
    shortValue = shortValue.toFixed(2);
  }
  return shortValue + suffixes[suffixNum];
}


//function to add stock to wishlist
function addToWatchList() {
  //Change text content to say following
  removeFromWatchListButton.style.display = "inline";
  watchListButton.style.display ="none"

    const newWatchListItem = {
      name: stockName.textContent,
    };
    //add stock to json file using post method
    fetch(databaseURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newWatchListItem),
    })
    .then((response) => response.json())
    .then((data) => displayWatchListItems(data));

}
//function to remove item from watchList
function removeWatchList() {
  //Change text content to say Follow
  watchListButton.style.display = "inline";
  removeFromWatchListButton.style.display ="none"

  // let itemName = stockName.textContent

const id = 3
  fetch(`http://localhost:3000/watchList/${id}`, {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify()
  })
  .then((response) => response.json())
  .then((data) => displayWatchListItems(data));

}


//create for loop to loop through each item and display in watchList
function displayWatchListItems(object) {
  //create ul
  let addedStock = document.createElement("li");

  addedStock.textContent = object.name;

  watchList.append(addedStock);
}

//function to render accurate Price
// function renderPrice(object) {
//   let currentDate = new Date().toLocaleDateString();
//   console.log(object["Time Series (Daily)"][date]["2. high"]);
//   currentPrice.textContent = "$" + object["2. high"];
// }
