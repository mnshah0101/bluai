import { OpenAI } from "@langchain/openai";
import { JsonOutputFunctionsParser } from "langchain/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { config } from 'dotenv';

config();

export async function getSuggestions(code) {

    const chain = RunnableSequence.from([
        PromptTemplate.fromTemplate(`You are an AI assistant that takes in a file of code, {code}. Given that you know that the usage of LLMs such as OPENAI produces a great amount of carbon emissions and water usage for GPU cooling, provide a list of 4 suggestions specific suggestions that could limit the amount of LLM usage in this code and thus reduce the environmental impact of the code. By suggestions, you need to point out specific line numbers where the code can be improved and provide direct improvement examples in the form of code. Make sure you are not repeating line numbers. Also, provide us an ESG score on a scale from 200-800 depending on the emissions caused by running the code. For example, code that has more usage of GPT calls with many ineffeciences will have a worse rating, while code that has a lower LLM usage will have a better rating. Also provide an estimate of the number of tokens that would be saved if each suggestion were implemented. Do your best to accomplish this. If you can, cite specific instances of the code. Example output: in json format "Suggestions": ["suggestion_1", "suggestion_2", ...], "Rating": 280, "Tokens": ["450", "230", ...]. {format_instructions}. Do not include any other information or explanation.`),
        new OpenAI({ temperature: 0.4, maxTokens:3000, modelName: "gpt-4" }),
    ]);
    let response = await chain.invoke({
        code: code,
        format_instructions: "Format this in a json Only give me a json response nothing else."
    });

    return response;
}