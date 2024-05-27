$(document).ready(function () {
    function updateDateTime() {
        const now = new Date();
        const formattedDateTime = now.toLocaleString();
        $('#date-time').text(formattedDateTime);
    }

    let dialValue = 1;
    const canvas = document.getElementById('dial');
    const context = canvas.getContext('2d');
    const radius = canvas.width / 2;

    function drawDial() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.beginPath();
        context.arc(radius, radius, radius - 10, 0, 2 * Math.PI, false);
        context.fillStyle = '#f0f0f0';
        context.fill();
        context.lineWidth = 10;
        context.strokeStyle = '#ccc';
        context.stroke();

        // Calcula el ángulo final basado en el valor actual del dial
        const endAngle = (2 * Math.PI) * (dialValue / 100) - (Math.PI / 2);
        context.beginPath();
        context.moveTo(radius, radius);
        context.arc(radius, radius, radius - 10, -Math.PI / 2, endAngle, false);
        context.lineTo(radius, radius);
        context.fillStyle = 'black';
        context.fill();
    }

    function updateDial() {
        // Incrementa el valor del dial, y reinicia a 1 si alcanza 101
        dialValue = (dialValue % 100) + 1;
        drawDial();
        $('#dial-value').text(dialValue);
    }

    // Configura los intervalos para actualizar la hora y el dial cada segundo
    setInterval(updateDateTime, 1000);
    setInterval(updateDial, 1000);

    function fetchData() {
        $.ajax({
            url: 'https://jsonplaceholder.typicode.com/posts/1',
            method: 'GET',
            success: function (data) {
                console.log(data);
            },
            error: function (error) {
                console.error('Error fetching data', error);
            }
        });
    }

    // Realiza solicitudes HTTP cada 5 segundos
    setInterval(fetchData, 5000);
});
