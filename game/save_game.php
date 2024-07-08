<?php
include 'bd.php';


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = json_decode(file_get_contents('php://input'), true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        die(json_encode(array("success" => false, "message" => "Invalid JSON input")));
    }

    if (!isset($_SESSION['user_id'])) {
        die(json_encode(array("success" => false, "message" => "User not logged in")));
    }

    $user_id = $_SESSION['user_id'];
    $score = $data['score'];

    $sql = "INSERT INTO Games (user_id, score) VALUES ('$user_id', '$score')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(array("success" => true, "message" => "Game data saved successfully"));
    } else {
        echo json_encode(array("success" => false, "message" => "Error: " . $conn->error));
    }
} else {
    echo json_encode(array("success" => false, "message" => "Invalid request method"));
}

$conn->close();
?>
