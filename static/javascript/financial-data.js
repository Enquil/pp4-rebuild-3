const form = document.getElementById('finance-form');
form.addEventListener('submit', getData);

function catchInput(event){
    event.preventDefault();
}

async function getData(event) {
    const currencies = [form[0].value, form[1].value];
    const apiOptions = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'f44866094amshb75f21ef852049fp114f61jsne03ec755eeed',
            'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com',
        }};

    const url = `https://${apiOptions.headers['X-RapidAPI-Host']}/query?from_symbol=${currencies[0]}&function=FX_DAILY&to_symbol=${currencies[1]}&outputsize=compact&datatype=json`;
    const response = await fetch(url, apiOptions);
    const cleanData = JSON.parse(JSON.stringify(await response.json()));
    const dataPoints = Object.entries(cleanData['Time Series FX (Daily)']);
    const chartData =  dataPoints.map(obj => [ obj[0], parseFloat(cleanData['Time Series FX (Daily)'][obj[0]]['1. open']) ]);
    const dataChart = google.visualization.arrayToDataTable(chartData.reverse(chartData.push(['Date', 'Open'])));
    const chartOptions = {
        title: `Exchange rate for ${cleanData['Meta Data']['2. From Symbol']} to ${cleanData['Meta Data']['3. To Symbol']}`,
        legend: { position: 'bottom' }};        
    const chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
    chart.draw(dataChart, chartOptions);
}