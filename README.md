# eVoteLedger: Blockchain-Based Voting System

## Overview
**eVoteLedger** is a decentralized and secure blockchain-based voting system designed to ensure **transparency, integrity, and accessibility** in elections. Built using **Next.js** for the frontend and **Node.js/Express.js** for the backend, it leverages **Ethereum smart contracts** to store votes immutably, preventing fraud and ensuring verifiable elections.

## Features
✅ **Decentralized & Secure** – Blockchain-based voting eliminates tampering and fraud.  
✅ **Web3 Authentication** – Voters sign in using MetaMask or WalletConnect.  
✅ **Transparent Elections** – Results are verifiable and immutable on the blockchain.  
✅ **Responsive UI** – Built with **Next.js & Tailwind CSS**, ensuring mobile-friendliness.  
✅ **Role-Based Access** – Voters, administrators, and election organizers have distinct dashboards.  
✅ **Real-Time Updates** – Uses WebSockets to display live election progress.  
✅ **Dark Mode Support** – Modern UI with accessibility in mind.  

## Tech Stack
### **Frontend (Next.js)**
- React.js & Next.js (Server-side rendering & API routes)
- Tailwind CSS (Fully responsive UI)
- Ethers.js (Blockchain interaction)
- NextAuth.js (Authentication)
- Recharts (Election result visualization)

### **Backend (Node.js & Express.js)**
- Express.js (RESTful API)
- MongoDB (User & election metadata storage)
- Ethers.js (Smart contract interaction)
- JWT (Secure authentication)
- WebSockets (Real-time updates)

### **Blockchain & Smart Contracts**
- Solidity (Ethereum smart contracts)
- Hardhat (Smart contract development & testing)
- MetaMask (Web3 authentication)
- IPFS (Decentralized storage for election metadata)

## Installation & Setup
### **Prerequisites**
Ensure you have installed:
- Node.js (>=18.x.x)
- MongoDB (local or MongoDB Atlas)
- MetaMask extension
- Hardhat (for smart contract deployment)

### **1. Clone the Repository**
```bash
git clone https://github.com/your-repo/eVoteLedger.git
cd eVoteLedger
```

### **2. Backend Setup**
```bash
cd backend
npm install
cp .env.example .env # Configure environment variables
npm run dev # Start backend server
```

### **3. Frontend Setup**
```bash
cd frontend
npm install
cp .env.example .env # Configure environment variables
npm run dev # Start frontend server
```

### **4. Deploy Smart Contracts**
```bash
cd blockchain
npx hardhat compile
npx hardhat run scripts/deploy.js --network sepolia # Deploy to Ethereum testnet
```

## Usage
### **User Roles & Features**
- **Voters**: Register, view elections, and cast votes securely.
- **Admins**: Create/manage elections, verify voter eligibility, and publish results.
- **Public**: View finalized election results on a blockchain explorer.

### **Casting a Vote**
1. Connect your Web3 wallet (MetaMask).
2. Select an active election and view candidate details.
3. Cast your vote by signing a blockchain transaction.
4. Verify your vote on the blockchain.

### **Viewing Results**
- Real-time vote counts are displayed with charts.
- Results are published on-chain for transparency.
- Admins can export data for official records.

## Smart Contract Overview
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

## Deployment
Deploy on **Vercel** (Frontend) & **Render/Heroku** (Backend):
```bash
# Deploy frontend to Vercel
vercel

# Deploy backend to Heroku
heroku create evoteledger-api
git push heroku main
```

## Future Enhancements
- ✅ **Zero-Knowledge Proofs (ZK-SNARKs)** for anonymous voting
- ✅ **Multi-chain support** for greater decentralization
- ✅ **Mobile app version** for increased accessibility
- ✅ **AI-powered voter verification** to prevent identity fraud

## License
This project is licensed under the **MIT License**.

## Contributors
👨‍💻 **Levy Wanyonyi** – [GitHub](https://github.com/levywanke)  


