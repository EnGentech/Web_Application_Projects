<?php

include('db/connect.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['asset_id'])) {
    $assetId = $_POST['asset_id'];

    $sql = "DELETE FROM assets WHERE id = :assetId";

    try {
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':assetId', $assetId, PDO::PARAM_INT);

        if ($stmt->execute()) {

            if ($stmt->rowCount() > 0) {
                echo 'success';
            } else {
                echo 'Error: Asset not found or already deleted.';
            }
        } else {
            echo 'Error: Failed to delete the asset. Please try again.';
        }
    } catch (PDOException $e) {
        
        echo 'Database Error: ' . $e->getMessage();
    }
} else {
    echo 'Error: Invalid request or missing asset ID.';
}
?>
