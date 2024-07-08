<?php
include 'bd.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = json_decode(file_get_contents('php://input'), true);
    $question_id = $data['question_id'];

    $sql = "SELECT * FROM Questions WHERE question_id = '$question_id'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $question = $result->fetch_assoc();
        echo json_encode(array("success" => true, "question" => $question));
    } else {
        echo json_encode(array("success" => false, "message" => "Question not found"));
    }
} else {
    echo json_encode(array("success" => false, "message" => "Invalid request method"));
}
?>
