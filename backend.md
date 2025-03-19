# Blockchain Voting System Backend

## Overview
This backend is designed to support the blockchain-based voting system, ensuring secure user authentication, election management, voting operations, and result verification. The backend is built using **Node.js** with **Express.js** and integrates with **Ethereum smart contracts** via **Ethers.js**. It uses **MongoDB** for storing user and election metadata, while actual votes are recorded immutably on the blockchain.

## Tech Stack
- **Node.js** – Server runtime
- **Express.js** – API framework
- **MongoDB** – Database for storing metadata
- **Ethers.js** – Blockchain interaction
- **JWT Authentication** – Secure user authentication
- **WebSockets** – Real-time voting updates
- **Next.js API Routes** – Backend integration for the frontend

## Installation

### Prerequisites
Ensure you have the following installed:
- **Node.js (>=18.x.x)**
- **MongoDB** (local or cloud-based like MongoDB Atlas)
- **MetaMask** (for testing with Ethereum testnets)
- **Hardhat** (for smart contract deployment)

### Setup
```bash
# Clone the repository
git clone https://github.com/your-repo/blockchain-voting-backend.git
cd blockchain-voting-backend

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env

# Start the backend server
npm run dev
```

## API Endpoints

### **Authentication**
#### Register User
```http
POST /api/auth/register
```
**Request Body:**
```json
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "securepassword",
  "walletAddress": "0x1234567890abcdef"
}
```
**Response:**
```json
{
  "message": "User registered successfully",
  "token": "jwt_token_here"
}
```

#### Login User
```http
POST /api/auth/login
```
**Request Body:**
```json
{
  "email": "johndoe@example.com",
  "password": "securepassword"
}
```
**Response:**
```json
{
  "message": "Login successful",
  "token": "jwt_token_here"
}
```

### **Election Management**
#### Create Election (Admin Only)
```http
POST /api/elections/create
```
**Request Body:**
```json
{
  "title": "Presidential Election 2025",
  "candidates": [
    { "name": "Alice", "party": "Independent" },
    { "name": "Bob", "party": "Democratic" }
  ],
  "startTime": "2025-07-01T00:00:00Z",
  "endTime": "2025-07-07T00:00:00Z"
}
```
**Response:**
```json
{
  "message": "Election created successfully",
  "electionId": "abc123"
}
```

#### Get Active Elections
```http
GET /api/elections/active
```
**Response:**
```json
[
  {
    "id": "abc123",
    "title": "Presidential Election 2025",
    "candidates": [
      { "name": "Alice", "party": "Independent" },
      { "name": "Bob", "party": "Democratic" }
    ],
    "startTime": "2025-07-01T00:00:00Z",
    "endTime": "2025-07-07T00:00:00Z"
  }
]
```

### **Voting System**
#### Cast Vote
```http
POST /api/voting/cast
```
**Request Body:**
```json
{
  "electionId": "abc123",
  "candidateId": "bob123",
  "walletAddress": "0x1234567890abcdef"
}
```
**Response:**
```json
{
  "message": "Vote submitted successfully",
  "transactionHash": "0xabc123def456"
}
```

### **Results Display**
#### Get Election Results
```http
GET /api/results/:electionId
```
**Response:**
```json
{
  "electionId": "abc123",
  "title": "Presidential Election 2025",
  "results": [
    { "candidate": "Alice", "votes": 4500 },
    { "candidate": "Bob", "votes": 5200 }
  ]
}
```

## Smart Contract Integration
The backend interacts with an Ethereum-based smart contract for vote recording. Here’s a simplified contract outline:
```solidity
pragma solidity ^0.8.0;
contract Voting {
    struct Candidate {
        string name;
        uint voteCount;
    }
    mapping(uint => Candidate) public candidates;
    mapping(address => bool) public hasVoted;

    function vote(uint candidateId) public {
        require(!hasVoted[msg.sender], "Already voted");
        candidates[candidateId].voteCount++;
        hasVoted[msg.sender] = true;
    }
}
```

## Security Features
- **JWT Authentication**: Secures API endpoints.
- **Blockchain Immutability**: Votes stored on-chain prevent tampering.
- **Rate Limiting**: Prevents spam voting attacks.
- **Data Encryption**: Protects sensitive user data in MongoDB.

## Deployment
For production, deploy using:
```bash
npm run build
npm start
```
Or use **Docker**:
```bash
docker build -t blockchain-voting-backend .
docker run -p 5000:5000 blockchain-voting-backend
```

## Conclusion
This backend is designed to work seamlessly with the **Next.js** frontend, ensuring secure and transparent elections using blockchain technology. Future improvements may include **zk-SNARKs for privacy voting** and **multi-chain support**.

