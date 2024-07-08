<?php

include 'bd.php';
 if (isset($_POST['remember_me']) && $_POST['remember_me'] == 'on') {
     // Set a long-lived cookie for "Remember Me"
     $cookie_name = "user_session";
     $cookie_value = session_id(); // Or any unique identifier for the session
     $expiration = time() + (86400 * 30); // 30 days
     setcookie($cookie_name, $cookie_value, $expiration, "/", "", false, true); // Set the cookie
 }

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = json_decode(file_get_contents('php://input'), true);
    $username = $conn->real_escape_string($data['username']);
    $password = $data['password'];

    $sql = "SELECT * FROM users WHERE username='$username'";
    $result = $conn->query($sql);

    if ($result->num_rows == 1) {
        $row = $result->fetch_assoc();
        if (password_verify($password, $row['password_hash'])) {
            $_SESSION['user_id'] = $row['user_id'];
            $_SESSION['username'] = $username;
            echo json_encode(array("success" => true, "message" => "Login successful"));
        } else {
            echo json_encode(array("success" => false, "message" => "Invalid password"));
        }
    } else {
        echo json_encode(array("success" => false, "message" => "Username not found"));
    }
} else {
    echo json_encode(array("success" => false, "message" => "Invalid request method"));
}
?>
