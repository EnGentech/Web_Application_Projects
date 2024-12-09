<?php
require_once '../db/connect.php'; 
$response = array('status' => 'error', 'message' => 'An unknown error occurred.', 'icon' => '❌');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
   
    $added_by = $_POST['added_by'] ?? '';
    $name = $_POST['name'] ?? '';
    $serial_number = $_POST['serial_number'] ?? '';
    $management_group = $_POST['management_group'] ?? '';
    $location = $_POST['location'] ?? '';
    $description = $_POST['description'] ?? '';
    $value = $_POST['value'] ?? '';

    if (!empty($added_by) && !empty($name) && !empty($serial_number) && !empty($management_group) && !empty($value)) {
        $value = preg_replace("/[^0-9.-]/", "", $value);

        if (is_numeric($value)) {
            try {
                $stmt = $conn->prepare("INSERT INTO assets (added_by, name, serial_number, management_group, location, description, value) 
                                        VALUES (:added_by, :name, :serial_number, :management_group, :location, :description, :value)");

                $stmt->bindParam(':added_by', $added_by);
                $stmt->bindParam(':name', $name);
                $stmt->bindParam(':serial_number', $serial_number);
                $stmt->bindParam(':management_group', $management_group);
                $stmt->bindParam(':location', $location);
                $stmt->bindParam(':description', $description);
                $stmt->bindParam(':value', $value, PDO::PARAM_STR);

                if ($stmt->execute()) {
                    $response['status'] = 'success';
                    $response['message'] = 'Your asset has been submitted successfully!';
                    $response['icon'] = '✅';
                } else {
                    $response['message'] = 'Error: Unable to add asset to the database.';
                }
            } catch (PDOException $e) {
                $response['message'] = 'Database Error: ' . $e->getMessage();
            }
        } else {
            $response['message'] = 'Invalid value format.';
        }
    } else {
        $response['message'] = 'Please fill in all the required fields.';
    }
}

echo json_encode($response);
?>
