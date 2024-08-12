document.addEventListener('DOMContentLoaded', function() {
    const filterInput = document.querySelector('#filter');
    const eventTitleSelect = document.querySelector('#eventTitle');
    const errorMessage = document.querySelector('#delete-error-message');
    const closeButton = document.querySelector('.delete_close-button');
    const deleteContainer = document.querySelector('.delete_container');

    const originalOptions = Array.from(eventTitleSelect.options);

    filterInput.addEventListener('input', function() {
        const filterValue = filterInput.value.toLowerCase();
        eventTitleSelect.innerHTML = '';

        const filteredOptions = originalOptions.filter(option => 
            option.text.toLowerCase().startsWith(filterValue)
        );

        if (filteredOptions.length > 0) {
            filteredOptions.forEach(option => eventTitleSelect.add(option));
            errorMessage.style.display = 'none';
            errorMessage.textContent = '';
        } else {
            errorMessage.style.display = 'block';
            errorMessage.textContent = 'Title not found';
        }
    });

    filterInput.addEventListener('input', function() {
        if (filterInput.value === '') {
            eventTitleSelect.innerHTML = '';
            originalOptions.forEach(option => eventTitleSelect.add(option));
            errorMessage.textContent = '';
            errorMessage.style.display = 'none';
        }
    });

    closeButton.addEventListener('click', function() {
        deleteContainer.style.display = 'none';
    });
});
