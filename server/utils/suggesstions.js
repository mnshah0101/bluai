//format the output as a json give it the dictionary keys
//array with list of suggests and other should be scores

import OpenAI from "openai";

export async function GetSuggsetions(code) {
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await openai.chat.completions.create({
        model: "gpt-4-turbo",
        messages: [
            {
                role: "system",
                content: `You are an AI assistant that takes in a file of python code, ${code}. Given that you know that the usage of LLMs produces a great amount of carbon emissions and water usage for GPU cooling, provide a list of 4 suggestions that could limit the amount of LLM usage in this code and thus reduce the environmental impact of the code. Also, provide us an ESG score on a scale from 200-800 depending on the emissions caused by running the code. For example, code that has more usage of LLMs will have a worse rating, especially LLMs that emit lots of carbon/water, while code that has a lower LLM usage will have a better rating. Example output: {Suggesstions: ['suggestion_1', 'suggestion_2', ..], Rating: 280}.`
            },
            {
                role: "user",
                content: params.prompt,
            },
        ],
        temperature: 0,
        max_tokens: 1024,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    });

    return response.json()
}