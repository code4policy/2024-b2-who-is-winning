document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('expandMethodology');
    const additionalInfo = document.getElementById('additionalInfo');

    btn.addEventListener('click', () => {
        additionalInfo.style.display = 'block';
        btn.style.display = 'none';
    });
});
