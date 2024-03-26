import OpenAI from "openai";

export async function getSuggestions(code) {
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "system",
                content: `You are an AI assistant that takes in a file of code, ${code}. Given that you know that the usage of LLMs such as OPENAI produces a great amount of carbon emissions and water usage for GPU cooling, provide a list of 4 suggestions specific suggestions that could limit the amount of LLM usage in this code and thus reduce the environmental impact of the code. Also, provide us an ESG score on a scale from 200-800 depending on the emissions caused by running the code. For example, code that has more usage of GPT calls with many ineffeciences will have a worse rating, while code that has a lower LLM usage will have a better rating. Also provide an estimate of the number of tokens that would be saved if each suggestion were implemented. Do your best to accomplish this. If you can, cite specific instances of the code. Example output: {"Suggestions": ["suggestion_1", "suggestion_2", ...], "Rating": 280, "tokens": ["450", "230", ...]}. Use this exact format. Do not include any other information or explanation.`
            },
          
        ],
        temperature: 0,
        max_tokens: 1024,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    });

    console.log(response.choices[0].message.content)
    const suggestions = response.choices[0].message.content
    
    return suggestions;
// Assuming the AI response is properly formatted JSON string
}
