document.addEventListener('DOMContentLoaded', function() {
    var navbar = document.getElementById('navbar');
    var navItems = [
        { name: 'Return Home', path: '../index.html' },
        { name: 'Our Team', path: 'our-team/index.html' },
        { name: 'Give us Feedback', path: 'https://forms.office.com/Pages/ResponsePage.aspx?id=9CL6b2hFBUGtQy461HJpV6PAlu8QsDNDvFA_VHvxVJZURDdTTlFUOTFZSTBDMEg0VFVDNjlGRUFYRC4u' },
        { name: 'Do Not Click!!', path: 'Chenged/index.html', class: 'special-link' } // Add a unique class for 'Do Not Click'
    ];

    navItems.forEach(function(item) {
        var link = document.createElement('a');
        link.textContent = item.name;
        link.href = item.path;
        if (item.class) { // Check if a special class is needed
            link.className = item.class;
        }
        navbar.appendChild(link);
    });
});
