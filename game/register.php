<?php
include 'bd.php';
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = json_decode(file_get_contents('php://input'), true);

    $username = $conn->real_escape_string($data['username']);
    $password = $data['password'];
    $passwordHash = password_hash($password, PASSWORD_BCRYPT);

    $sql = "SELECT * FROM users WHERE username='$username'";
    $result = $conn->query($sql);

    if ($result->num_rows == 0) {
        $sql = "INSERT INTO users (username, password_hash) VALUES ('$username', '$passwordHash')";
        if ($conn->query($sql) === TRUE) {
            echo json_encode(array("success" => true, "message" => "Registration successful"));
        } else {
            echo json_encode(array("success" => false, "message" => "Error: " . $conn->error));
        }
    } else {
        echo json_encode(array("success" => false, "message" => "Username already taken"));
    }
} else {
    echo json_encode(array("success" => false, "message" => "Invalid request method"));
}

$conn->close();
?>
