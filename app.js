// Your dedicated access key is: 8B5WZ1MU1IOSD0DG

<script>
    const api_url = 'https://www.alphavantage.co/query?function=OVERVIEW&symbol=AAPL&apikey=8B5WZ1MU1IOSD0DG';
    async function getData() {
        const response = await fetch(api_url);
        const data = await response.json();
        console.log(data);
    }
    getData();
</script>
