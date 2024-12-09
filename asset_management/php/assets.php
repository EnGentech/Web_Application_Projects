<?php
include('db/connect.php');

// Fetch all assets from the database
$sql = "SELECT * FROM assets";
$result = $conn->query($sql);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>View Assets</title>
    <link rel="stylesheet" href="css/view_assets.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="js/view_assets.js" defer></script>
</head>
<body>

    <main id="monitor" class="">
        <header>
            <div class="header-container">
                <div class="logo">
                    <h1>Asset Management</h1>
                </div>
                <nav>
                    <ul>
                        <li><a href="index.html">Home</a></li>
                        <li><a href="add_asset.html">Add Asset</a></li>
                        <li><a href="#">About Us</a></li>
                    </ul>
                </nav>
            </div>
        </header>

        <section class="content">
            <h2>Manage Your Assets</h2>
            <p>Welcome to the Asset Management page. Here, you can view, search, edit, or delete your assets efficiently. Use the search and filter options to quickly locate specific assets.</p>

            <!-- Search Bar -->
            <div class="search-bar">
                <input type="text" id="search-input" placeholder="Search for assets...">
                <select id="search-filter">
                    <option value="name">Asset Name</option>
                    <option value="added_by">Added By</option>
                    <option value="location">Location</option>
                    <option value="serial_number">Serial Number</option>
                </select>
            </div>
            <hr>

            <!-- Assets Table -->
            <table id="assets-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Asset Name</th>
                        <th>Description</th>
                        <th>Value</th>
                        <th>Management Group</th>
                        <th>Location</th>
                        <th>Added By</th>
                        <th>Timestamp</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
            <?php if ($result->rowCount() > 0): ?>
                <?php $counter = 1;?>
                <?php while ($row = $result->fetch(PDO::FETCH_ASSOC)): ?>
                    <tr>
                        <input type="hidden" id="index"> 
                        <td><?php echo $counter++; ?></td>
                        <td><?php echo htmlspecialchars($row['name']); ?></td>
                        <td><?php echo htmlspecialchars($row['description']); ?></td>
                        <td><?php echo '$' . number_format($row['value'], 2); ?></td>
                        <td><?php echo htmlspecialchars($row['management_group']); ?></td>
                        <td><?php echo htmlspecialchars($row['location']); ?></td>
                        <td><?php echo htmlspecialchars($row['added_by']); ?></td>
                        <td><?php echo htmlspecialchars($row['timestamp_date'] . ' ' . $row['timestamp_time']); ?></td>
                        <td>
                            <button class="action-btn edit-btn" onclick="openEditModal(<?php echo htmlspecialchars($row['id']); ?>)">Edit</button>
                            <button class="action-btn delete-btn" onclick="deleteAsset(<?php echo htmlspecialchars($row['id']); ?>)">Delete</button>
                        </td>
                    </tr>
                <?php endwhile; ?>
            <?php else: ?>
                <tr>
                    <td colspan="9">No assets found</td>
                </tr>
            <?php endif; ?>
        </tbody>

            </table>
        </section>
<!-- Modal for Editing Asset -->
<div id="edit-modal" class="modal">
    <div class="modal-content">
        <h3>Edit Asset</h3>
        <form id="edit-form">
            <input type="text" class="index" name="index" style="display:none">
            <div class="form-group">
                <label for="name">Asset Name</label>
                <input type="text" id="name" name="name" required>
            </div>
            <div class="form-group">
                <label for="description">Description</label>
                <textarea id="description" name="description"></textarea>
            </div>
            <div class="form-group">
                <label for="value">Value</label>
                <input type="text" id="value" name="value" required>
            </div>
            <div class="form-group">
                <label for="management_group">Management Group</label>
                    <select id="management_group" name="management_group">
                        <option value="Nig-Management-GP">Nig-Management-GP</option>
                        <option value="Can-Management-GP">Can-Management-GP</option>
                        <option value="CX-Team-GP">CX-Team-GP</option>
                        <option value="QIT-NG-MGH-GP">QIT-NG-MGH-GP</option>
                    </select>
            </div>
            <div class="form-group">
                <label for="location">Location</label>
                <input type="text" id="location" name="location">
            </div>
            <div class="form-group">
                <label for="added_by">Added By</label>
                <input type="text" id="added_by" name="added_by" required>
            </div>
            <div class="modal-buttons">
                <button type="submit" class="save-btn">Save Changes</button>
                <button type="button" class="close-btn" onclick="closeEditModal()">Close</button>
            </div>
        </form>
    </div>
</div>
</main>

</body>
</html>
