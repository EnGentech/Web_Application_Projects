<?php
include('db/connect.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['index'])) {
    $assetId = $_POST['index'];

    $stmt = $conn->prepare("SELECT * FROM assets WHERE id = :assetId");
    $stmt->bindParam(':assetId', $assetId, PDO::PARAM_INT);
    $stmt->execute();
    $asset = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($asset) {

        $updateFields = [];
        $params = [];

        if (isset($_POST['name']) && $_POST['name'] !== $asset['name']) {
            $updateFields[] = 'name = :name';
            $params[':name'] = $_POST['name'];
        }

        if (isset($_POST['description']) && $_POST['description'] !== $asset['description']) {
            $updateFields[] = 'description = :description';
            $params[':description'] = $_POST['description'];
        }

        if (isset($_POST['value']) && is_numeric($_POST['value']) && $_POST['value'] !== $asset['value']) {
            $updateFields[] = 'value = :value';
            $params[':value'] = $_POST['value'];
        }

        if (isset($_POST['management_group']) && $_POST['management_group'] !== $asset['management_group']) {
            $updateFields[] = 'management_group = :management_group';
            $params[':management_group'] = $_POST['management_group'];
        }

        if (isset($_POST['location'])) {
            $newLocation = $_POST['location'] === '' ? null : $_POST['location'];
            if ($newLocation !== $asset['location']) {
                $updateFields[] = 'location = :location';
                $params[':location'] = $newLocation;
            }
        }

        if (isset($_POST['added_by']) && $_POST['added_by'] !== $asset['added_by']) {
            $updateFields[] = 'added_by = :added_by';
            $params[':added_by'] = $_POST['added_by'];
        }

        if (!empty($updateFields)) {
            $sql = "UPDATE assets SET " . implode(', ', $updateFields) . " WHERE id = :assetId";
            $params[':assetId'] = $assetId;

            $stmt = $conn->prepare($sql);

            foreach ($params as $key => $value) {
                $stmt->bindValue($key, $value);
            }

            if ($stmt->execute()) {
                echo 'Success';
            } else {
                echo 'Error: Failed to update asset.';
            }
        } else {
            echo 'No changes detected.';
        }
    } else {
        echo 'Error: Asset not found.';
    }
} else {
    echo 'Error: Invalid request. Missing asset data.';
}
?>
