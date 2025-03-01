function calculateTotal() {
    let total = 0;

    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    
    checkboxes.forEach(function(checkbox) {
        total += parseInt(checkbox.value);
    });

    document.getElementById('totalCost').textContent = total;
}

document.getElementById('calculateButton').addEventListener('click', function() {
    calculateTotal();
});