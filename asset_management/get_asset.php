<?php

include('db/connect.php');

if (isset($_GET['asset_id']) && !empty($_GET['asset_id'])) {
    $asset_id = intval($_GET['asset_id']);

    $sql = "SELECT * FROM assets WHERE id = :id";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':id', $asset_id, PDO::PARAM_INT);

    try {
        $stmt->execute();
        $asset = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($asset) {
            echo json_encode($asset);
        } else {
            echo json_encode(['error' => 'Asset not found']);
        }
    } catch (PDOException $e) {
        echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['error' => 'Invalid request: asset_id missing']);
}
?>
