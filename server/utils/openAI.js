
import dotenv from 'dotenv';

dotenv.config();

export const analyzeProjectData = async (projectData) => {
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    const response = await openai.createCompletion({
        model: "text-davinci-003", // Change the model if necessary
        prompt: `This is a test: ${projectData}`, // Adjust the prompt as needed
        max_tokens: 100,
        temperature: 0.5, // Adjust based on how deterministic you want the completions to be
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
    });

    return response.data.choices[0].text.trim();
};
