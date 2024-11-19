import * as readline from 'readline';
import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

class OpenAICLI {
    private apiKey: string;
    private model: string;
    private chatHistory: string[];
    private rl: readline.Interface;

    constructor() {
        this.apiKey = process.env.OPENAI_API_KEY;
        if (!this.apiKey) {
            console.error('Error: API key not set in environment variables.');
            process.exit(1);
        }

        this.model = 'gpt-4o-mini';
        this.chatHistory = [];

        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    async makeOpenAIRequest(prompt: string): Promise<string> {
        try {
            const response = await axios.post(
                'https://api.openai.com/v1/chat/completions', 
                {
                    model: this.model,
                    messages: [
                        ...this.chatHistory.map(msg => ({
                            role: msg.startsWith('User:') ? 'user' : 'assistant',
                            content: msg.replace(/^(User:|Assistant:)\s*/, '')
                        })),
                        { role: 'user', content: prompt }
                    ]
                },
                {
                    headers: {
                        'Authorization': `Bearer ${this.apiKey}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            return response.data.choices[0].message.content;
        } catch (error) {
            console.error('Error making OpenAI request:', error.response?.data || error.message);
            throw error;
        }
    }

    async startChat() {
        console.log('Welcome to ChatGPT CLI! Type \'exit\' to quit.');

        const askQuestion = () => {
            this.rl.question('You: ', async (userInput) => {
                if (userInput.toLowerCase() === 'exit') {
                    this.rl.close();
                    return;
                }
              
                this.chatHistory.push(`User: ${userInput}`);

                try {
                    const reply = await this.makeOpenAIRequest(userInput);
                    
                    this.chatHistory.push(`Assistant: ${reply}`);

                    console.log('Assistant:', reply);
                } catch (error) {
                    console.error('Chat error:', error);
                }

                askQuestion();
            });
        };

        askQuestion();
    }
}

const cli = new OpenAICLI();
cli.startChat();
