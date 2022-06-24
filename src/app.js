//GET DOM ELEMENTS
const stockName = document.getElementById('name')
const stockTicker = document.getElementById('symbol')
const sector = document.getElementById('sector')
const currentPrice = document.getElementById('movingAverage')
const yearHigh = document.getElementById('52WeekHigh')
const yearLow = document.getElementById('52WeekLow')
const peRatio = document.getElementById('peRatio')
const beta = document.getElementById('beta')
const dividendPerShare = document.getElementById('dividendPerShare')
const exDividendDate = document.getElementById('exDividendDate')
const description = document.getElementById('description')

const searchForm = document.getElementById('searchForm')
const searchBtn = document.getElementById('searchBtn')

const goodPriceTarget = document.getElementById('goodPriceTarget')
const betterPriceTarget = document.getElementById('betterPriceTarget')
const bestPriceTarget = document.getElementById('bestPriceTarget')


fetch(apiURL)
  .then((response) => response.json())
  .then((data) => renderData(data));



function renderData(object) {
    stockName.textContent = object.Name
    stockTicker.textContent = object.Symbol
    sector.textContent = object.Sector
    // currentPrice.textContent = object[50DayMovingAverage]
    // yearHigh.textContent = object[52WeekHigh]
    // yearLow.textContent = object.[52WeekLow]
    peRatio.textContent = object.PERatio
    beta.textContent = object.Beta
    dividendPerShare.textContent = object.DividendPerShare
    exDividendDate.textContent = object.ExDividendDate
    description.textContent = object.Description

}

//event Listener for search form
searchForm.addEventListener('submit', renderSearch)

function renderSearch(e) {
    e.preventDefault();

    const searchItem = e.target.search.value
    console.log(searchItem)
    searchForm.reset()
}
