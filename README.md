# 🤖 Chatty: OpenAI TypeScript CLI Chat Application 🚀

## 📝 Overview

A TypeScript command-line chat application that interfaces with OpenAI's GPT models.

## 🛠️ Prerequisites

- Node.js (v16+ recommended)
- Docker (optional)

## 🚀 Setup & Installation

### Local Setup
1. Clone the repository
```bash
git clone https://github.com/decagondev/chatty-typescript.git
cd chatty-typescript
```

2. Install Dependencies
```bash
npm install
```

3. Create .env File
```bash
echo "OPENAI_API_KEY=your_openai_api_key" > .env
```

### Docker Setup
1. Build Docker Image
```bash
docker build -t chatty-box .
```

2. Run Docker Container
```bash
# With API key as environment variable
docker run -it \
  -e OPENAI_API_KEY=your_openai_api_key \
  chatty-box
```

## 🏃‍♂️ Running the Application

### Local Development
```bash
npm run dev  # Development mode
npm run build  # Compile TypeScript
npm start  # Run compiled application
```

### Docker Execution
```bash
# Interactive mode
docker run -it \
  -e OPENAI_API_KEY=your_openai_api_key \
  chatty-box
```

## 📋 Usage

- Type messages at the prompt
- Type 'exit' to end chat
- Maintains conversation context

## 🛠️ Troubleshooting

- Verify Node.js installation
- Check API key validity
- Ensure internet connectivity

## 📜 License

MIT License
