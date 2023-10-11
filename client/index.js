document.addEventListener('DOMContentLoaded', function () {
    const addItemForm = document.getElementById('addItemForm');
    const messageDiv = document.getElementById('message');

    addItemForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const itemData = {
            item_id: parseInt(addItemForm.item_id.value),
            item_name: addItemForm.item_name.value,
            item_price: parseFloat(addItemForm.item_price.value),
            exp_date: addItemForm.exp_date.value,
        };

        fetch('http://localhost:5030/insert', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(itemData),
        })
        .then(response => response.json())
        .then(data => {
            if (data.data) {
                messageDiv.textContent = 'Item added successfully.';
                addItemForm.reset();
            } else {
                messageDiv.textContent = 'Error adding item.';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            messageDiv.textContent = 'An error occurred.';
        });
    });
});