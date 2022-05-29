const weather = document.getElementById('weather');
const input = document.getElementById('address');
const current = document.getElementById('current');
const loc = document.getElementById('location');
const h3 = document.getElementById('h3')
const result = document.getElementById('result');

result.setAttribute('hidden', 'true')

weather.addEventListener('submit', event => {
    event.preventDefault();

    const url = 'http://localhost:3000/weather?address=' + input.value;
    input.value = '';

    fetch(url).then(res => res.json())
        .then(data => {
            result.removeAttribute('hidden')
            current.textContent = data.forecast.current;
            loc.textContent = data.forecast.location
            h3.textContent = 'Weather Result for ' + data.address
        })
})