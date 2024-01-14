
document.querySelectorAll('.accordion-button').forEach(button => {
    button.addEventListener('click', () => {
        const accordionContent = button.nextElementSibling;
        accordionContent.style.display = accordionContent.style.display === 'block' ? 'none' : 'block';
    });
});

document.querySelectorAll('.variable-button').forEach(button => {
    button.addEventListener('click', () => {
        const variableContent = button.nextElementSibling;
        variableContent.style.display = variableContent.style.display === 'block' ? 'none' : 'block';
        // Toggle plus/minus sign
        const plus = button.querySelector('.plus');
        if (plus) {
            plus.textContent = plus.textContent === '+' ? '-' : '+';
        }
    });
});
