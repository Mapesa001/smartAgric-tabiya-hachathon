import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const ChatbotContainer = styled.div`
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-color: #f9f9f9;
`;

const ChatWindow = styled.div`
    height: 300px;
    overflow-y: auto;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 5px;
    background-color: #fff;
`;

const UserMessage = styled.div`
    text-align: right;
    color: blue;
`;

const BotMessage = styled.div`
    text-align: left;
    color: green;
`;

const ChatForm = styled.form`
    display: flex;
`;

const InputField = styled.input`
    flex: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

const SendButton = styled.button`
    padding: 10px 15px;
    margin-left: 5px;
    border: none;
    border-radius: 5px;
    background-color: #28a745;
    color: white;
    cursor: pointer;

    &:hover {
        background-color: #218838;
    }
`;

const Chatbot = () => {
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        setChatHistory((prev) => [...prev, { sender: 'User', text: message }]);

        try {
            // Call OpenAI API directly from the frontend
            const response = await axios.post(
                'https://api.openai.com/v1/chat/completions',
                {
                    model: 'gpt-3.5-turbo',
                    messages: [{ role: 'user', content: message }]
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer YOUR_OPENAI_API_KEY`  // Replace with your API key
                    }
                }
            );

            const botResponse = response.data.choices[0].message.content;
            setChatHistory((prev) => [...prev, { sender: 'Bot', text: botResponse }]);
        } catch (error) {
            console.error('Error sending message:', error);
            setChatHistory((prev) => [...prev, { sender: 'Bot', text: 'Error: Unable to get a response from the server.' }]);
        } finally {
            setMessage('');
        }
    };

    return (
        <ChatbotContainer>
            <h2>Agricultural Chatbot</h2>
            <ChatWindow>
                {chatHistory.map((chat, index) => (
                    <div key={index} className={chat.sender === 'User' ? UserMessage : BotMessage}>
                        <strong>{chat.sender}: </strong>{chat.text}
                    </div>
                ))}
            </ChatWindow>
            <ChatForm onSubmit={handleSendMessage}>
                <InputField 
                    type="text" 
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)} 
                    placeholder="Type your message here..." 
                    required 
                />
                <SendButton type="submit">Send</SendButton>
            </ChatForm>
        </ChatbotContainer>
    );
};

export default Chatbot;
