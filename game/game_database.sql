-- Users table
CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(100),
    -- Add more fields as needed
);

-- Games table
CREATE TABLE Games (
    game_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    start_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    end_time TIMESTAMP,
    score INT,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Answers table
CREATE TABLE Answers (
    answer_id INT AUTO_INCREMENT PRIMARY KEY,
    game_id INT,
    question_number INT,
    question_text VARCHAR(255),
    user_answer VARCHAR(100),
    is_correct BOOLEAN,
    FOREIGN KEY (game_id) REFERENCES Games(game_id)
);
