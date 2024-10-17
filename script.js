
// index.html


// page appeler connection.html
function logout() {
    window.location.href = "connection.html"; // Redirige vers la page de connexion
}

   // Initialisation du graphique
   document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('statsChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
            datasets: [{
                label: 'Approbations des membres',
                data: [0, 5, 10, 15, 18, 20],
                borderColor: '#0000FF',
                tension: 0.4,
                fill: true,
                backgroundColor: 'rgba(0, 0, 255, 0.1)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});

// Animation smooth scroll
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const section = document.querySelector(this.getAttribute('href'));
        window.scrollTo({
            top: section.offsetTop - 100,
            behavior: 'smooth'
        });
    });
});