// Open edit modal
function openEditModal(db_id) {
    // Display a temporary alert to indicate the function is triggered
    document.body.classList.add('modal-open'); // Add blur effect
    document.getElementById('edit-modal').classList.add('active'); // Show modal

    // Fetch asset details via AJAX using the unique db_id
    $.ajax({
        url: 'get_asset.php', // Endpoint to fetch the asset details
        method: 'GET',
        data: { asset_id: db_id },  // Send the asset ID to the server
        success: function(response) {
            try {
                const asset = JSON.parse(response); // Parse the JSON response

                if (asset.error) {
                    alert(asset.error); // Display any error returned by the server
                } else {
                    // Populate the modal fields with asset data
                    $('.index').val(asset.id);  // Map to the correct field
                    $('#name').val(asset.name);
                    $('#description').val(asset.description);
                    $('#value').val(asset.value);
                    $('#management_group').val(asset.management_group);
                    $('#location').val(asset.location);
                    $('#added_by').val(asset.added_by);

                    // Fade in the edit modal
                    $('#edit-modal').fadeIn().css("opacity", 1);
                }
            } catch (e) {
                alert('Error parsing response. Please try again.');
            }
        },
        error: function() {
            alert('Error fetching asset details. Please check your network connection.');
        }
    });
}

// Close the edit modal
function closeEditModal() {
    $('#edit-modal').fadeOut().css("opacity", 0);  // Fade out modal
    document.body.classList.remove('modal-open'); // Remove blur
    document.getElementById('edit-modal').classList.remove('active'); 
}

// Submit the edit form
$('#edit-form').submit(function(event) {
    event.preventDefault(); // Prevent default form submission

    const assetId = parseInt($('.index').val(), 10);

    if (isNaN(assetId) || assetId <= 0) {
        alert('Asset ID is missing or invalid!');
        return;
    }

    // Proceed with the rest of your logic
    console.log('Asset ID:', assetId);

    const formData = $(this).serialize();  // Collect form data

    // Send the form data to update the asset via AJAX
    $.ajax({
        url: 'update_asset.php',  // Endpoint to update the asset
        method: 'POST',
        data: formData,  // Submit the serialized form data
        success: function(response) {
            if (response.trim() == 'Success') {
                alert('Asset updated successfully');
                location.reload();  // Refresh the page after successful update
            } else {
                alert('Error updating asset: ' + response);
                console.log(response);
            }
        },
        error: function() {
            alert('Error submitting the form. Please check your network connection.');
        }
    });
});


// Delete asset
function deleteAsset(db_id) {
    if (confirm('Are you sure you want to delete this asset?')) {
        $.ajax({
            url: 'delete_asset.php',
            method: 'POST',
            data: { asset_id: db_id },
            success: function(response) {
                if (response.trim() === 'success') {
                    alert('Asset deleted successfully');
                    location.reload();
                } else {
                    alert('Error deleting asset: ' + response);
                }
            },
            error: function() {
                alert('Error processing the request. Please check your network connection.');
            }
        });
    }
}

$('#search-input').on('input', function() {
    const searchTerm = $(this).val().toLowerCase();
    const filter = $('#search-filter').val();

    let columnIndex;
    if (filter === 'name') {
        columnIndex = 2;
    } else if (filter === 'added_by') {
        columnIndex = 7;
    } else if (filter === 'location') {
        columnIndex = 6;
    } else {
        columnIndex = 3;
    }

    $('#assets-table tbody tr').each(function() {
        const td = $(this).find('td');
        const searchText = td.eq(columnIndex).text().toLowerCase();

        if (searchText.includes(searchTerm)) {
            $(this).show();
        } else {
            $(this).hide();
        }
    });
});
