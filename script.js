// Load and display fuel stock on page load
async function loadFuelStock() {
    const response = await fetch('http://localhost:9393/api/fuelstock');
    const data = await response.json();

    // Display Table
    let stockTable = '<table border="1" cellpadding="10"><tr><th>Fuel Type</th><th>Quantity (Liters)</th></tr>';
    data.forEach(stock => {
        stockTable += `<tr><td>${stock.fuelType}</td><td>${stock.quantityInLiters}</td></tr>`;
    });
    stockTable += '</table>';
    document.getElementById('stockData').innerHTML = stockTable;
// Load and display fuel stock on page load
async function loadFuelStock() {
    const response = await fetch('http://localhost:9393/api/fuelstock');
    const data = await response.json();

    // Display Table
    let stockTable = '<table border="1" cellpadding="10"><tr><th>Fuel Type</th><th>Quantity (Liters)</th></tr>';
    data.forEach(stock => {
        stockTable += `<tr><td>${stock.fuelType}</td><td>${stock.quantityInLiters}</td></tr>`;
    });
    stockTable += '</table>';
    document.getElementById('stockData').innerHTML = stockTable;

    // Update Chart
    updateChart(data);
}

// Chart.js Chart Setup
let fuelStockChart;
function updateChart(data) {
    const ctx = document.getElementById('fuelStockChart').getContext('2d');

    const fuelTypes = data.map(stock => stock.fuelType);
    const quantities = data.map(stock => stock.quantityInLiters);

    if (fuelStockChart) {
        fuelStockChart.destroy();
    }

    fuelStockChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: fuelTypes,
            datasets: [{
                label: 'Quantity in Liters',
                data: quantities,
                backgroundColor: ['#3498db', '#2ecc71', '#f1c40f', '#e74c3c'],
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Handle Refill Form Submission
document.getElementById('refillForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const fuelType = document.getElementById('refillFuelType').value;
    const quantity = parseFloat(document.getElementById('refillQuantity').value);

    const response = await fetch('http://localhost:9393/api/fuelstock/refill', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fuelType, quantity })
    });

    if (response.ok) {
        alert('Fuel Stock Refilled Successfully');
        loadFuelStock();
    } else {
        alert('Failed to Refill Stock');
    }
});

// Handle Add New Stock Form Submission
document.getElementById('addStockForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const fuelType = document.getElementById('newFuelType').value;
    const quantity = parseFloat(document.getElementById('newQuantity').value);

    const response = await fetch('http://localhost:9393/api/fuelstock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fuelType, quantityInLiters: quantity })
    });

    if (response.ok) {
        alert('New Fuel Stock Added Successfully');
        loadFuelStock();
    } else {
        alert('Failed to Add New Stock');
    }
});

// Load fuel stock when page loads
window.onload = loadFuelStock;

    // Update Chart
    updateChart(data);
}

// Chart.js Chart Setup
let fuelStockChart;
function updateChart(data) {
    const ctx = document.getElementById('fuelStockChart').getContext('2d');

    const fuelTypes = data.map(stock => stock.fuelType);
    const quantities = data.map(stock => stock.quantityInLiters);

    if (fuelStockChart) {
        fuelStockChart.destroy();
    }

    fuelStockChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: fuelTypes,
            datasets: [{
                label: 'Quantity in Liters',
                data: quantities,
                backgroundColor: ['#3498db', '#2ecc71', '#f1c40f', '#e74c3c', '#9b59b6'],
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Handle Refill Form Submission
document.getElementById('refillForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const fuelType = document.getElementById('fuelType').value;
    const quantity = parseFloat(document.getElementById('quantityInLiters').value);

    const response = await fetch('http://localhost:9393/api/fuelstock/refill', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fuelType, quantity })
    });

    if (response.ok) {
        alert('Fuel Stock Refilled Successfully');
        loadFuelStock();
    } else {
        alert('Failed to Refill Stock');
    }
});

// Handle Add New Stock Form Submission
document.getElementById('addStockForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const fuelType = document.getElementById('newFuelType').value;
    const quantity = parseFloat(document.getElementById('newQuantity').value);

    const response = await fetch('http://localhost:9393/api/fuelstock/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fuelType, quantityInLiters: quantity })
});


    if (response.ok) {
        alert('New Fuel Stock Added Successfully');
        // 🔥 Reload the updated fuel stock table & chart
        loadFuelStock();

        // Clear Form Fields after submission
        document.getElementById('newFuelType').value = '';
        document.getElementById('newQuantity').value = '';
    } else {
        alert('Failed to Add New Stock');
    }
});


// Load fuel stock when page loads
window.onload = loadFuelStock;
