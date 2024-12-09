document.getElementById("value").addEventListener("blur", function () {
    let valueInput = this;
    let value = valueInput.value.trim().replace(/[^\d.-]/g, "");
    if (value) {
        value = parseFloat(value).toFixed(2);
        valueInput.value = `$${value}`;
    }
});

const form = document.getElementById("add-asset-form");
let isSubmitting = false;

form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (isSubmitting) return;
    isSubmitting = true;

    const valueInput = document.getElementById("value");
    let value = valueInput.value.trim().replace(/[^\d.-]/g, "");

    if (!isNaN(value) && value !== "") {
        valueInput.value = value;

        const formData = new FormData(form);

        fetch('php/add_asset.php', {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                const flashText = document.getElementById("flash-text");
                const flashIcon = document.getElementById("flash-icon");
                const flashMessage = document.getElementById("flash-message");

                flashText.innerText = data.message;
                flashIcon.innerText = data.icon;

                if (data.status === 'success') {
                    flashMessage.style.backgroundColor = '#28a745';
                    setTimeout(() => {
                        window.location.href = "/asset_management/view_assets.php";
                    }, 3000);
                } else {
                    flashMessage.style.backgroundColor = '#dc3545';
                    setTimeout(() => {
                        flashMessage.style.display = 'none';
                    }, 5000);
                }

                flashMessage.style.display = 'block';
            })
            .catch((error) => {
                console.error('Error:', error);
            })
            .finally(() => {
                isSubmitting = false;
            });
    } else {
        alert("Please enter a valid value.");
        isSubmitting = false;
    }
});
