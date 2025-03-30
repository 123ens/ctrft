// auth.js
.auth-container {
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
}

.auth-container h2 {
    text-align: center;
    color: #333;
    margin-bottom: 20px;
}

.auth-container form {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-bottom: 20px;
}

.auth-container input {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
}

.auth-container button {
    padding: 10px;
    background: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background 0.3s;
}

.auth-container button:hover {
    background: #45a049;
}

#user-info {
    display: none;
    text-align: right;
    padding: 10px;
}

#signout-btn {
    background: #f44336;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
    margin-left: 10px;
}

#signout-btn:hover {
    background: #da190b;
} 

