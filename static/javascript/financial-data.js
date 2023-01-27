const currencies = [
    "AED","AFN","ALL","AMD","ANG","AOA","ARS",
    "AUD","AWG","AZN","BAM","BBD", "BDT","BGN",
    "BHD","BIF","BMD","BND","BOB","BRL","BSD",
    "BTN","BWP","BZD","CAD","CDF","CHF","CLF",
    "CLP","CNH","CNY","COP","CUP","CVE","CZK",
    "DJF","DKK","DOP","DZD","EGP","ERN","ETB",
    "EUR","FJD","FKP","GBP","GEL","GHS","GIP",
    "GMD","GNF","GTQ","GYD","HKD","HNL","HRK",
    "HTG","HUF","ICP","IDR","ILS","INR","IQD",
    "IRR","ISK","JEP","JMD","JOD","JPY","KES",
    "KGS", "KHR", "KMF", "KPW", "KRW", "KWD",
    "KYD","KZT","LAK","LBP","LKR","LRD","LSL",
    "LYD","MAD","MDL","MGA","MKD","MMK","MNT",
    "MOP","MRU","MUR","MVR","MWK","MXN","MYR",
    "MZN", "NAD", "NGN","NOK","NPR","NZD","OMR",
    "PAB","PEN","PGK","PHP","PKR","PLN","PYG",
    "QAR","RON","RSD","RUB","RUR","RWF","SAR",
    "SCR","SDG","SDR","SEK","SGD","SHP","SLL",
    "SOS","SRD","SYP","SZL","THB","TJS","TMT",
    "TND","TOP","TRY","TTD","TWD","TZS","UAH",
    "UGX","USD","UYU","UZS","VND","VUV","WST",
    "XAF","XCD","XDR","XOF", "XPF","YER","ZAR",
    "ZMW","ZWL",
];

    
document.addEventListener("DOMContentLoaded", function() {
    const currencySelectorOne = document.getElementById('currencyOne');
    const currencySelectorTwo = document.getElementById('currencyTwo');
    const form = document.getElementById('currencyConverter');
    form.addEventListener('submit', getData);
    for (let currency of currencies ) {
        currencySelectorOne.innerHTML += `<option value="${currency}">${currency}</option>`;
        currencySelectorTwo.innerHTML += `<option value="${currency}">${currency}</option>`;
    }
});


async function getData(event) {
    event.preventDefault();
    const selectedCurrency = document.querySelector('#currencyOne');
    const selectedCurrencyTwo = document.querySelector('#currencyTwo');
    const apiOptions = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'f44866094amshb75f21ef852049fp114f61jsne03ec755eeed',
            'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com',
        }};

    const url = `https://${apiOptions.headers['X-RapidAPI-Host']}/query?from_symbol=${selectedCurrency.value}&function=FX_DAILY&to_symbol=${selectedCurrencyTwo.value}&outputsize=compact&datatype=json`;
    const response = await fetch(url, apiOptions);
    const cleanData = JSON.parse(JSON.stringify(await response.json()));
    console.log(cleanData);
    const dataPoints = Object.entries(cleanData['Time Series FX (Daily)']);
    const chartData =  dataPoints.map(obj => [ obj[0], parseFloat(cleanData['Time Series FX (Daily)'][obj[0]]['1. open']) ]);
    const dataChart = google.visualization.arrayToDataTable(chartData.reverse(chartData.push(['Date', 'Open'])));
    const chartOptions = {
        title: `Exchange rate for ${cleanData['Meta Data']['2. From Symbol']} to ${cleanData['Meta Data']['3. To Symbol']}`,
        legend: { position: 'bottom' }};        
    const chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
    chart.draw(dataChart, chartOptions);
}