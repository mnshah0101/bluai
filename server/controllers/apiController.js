import ProjectModel from '../models/Project.js';
import Tiktoken from 'tiktoken';
import OpenAI from "openai";


export const makeGPTCall = async (req, res) => {
    try {
        const blu_key = req.body.blu_key;
        if(!blu_key) {
            return res.status(400).json({ message: "missing blu_key" });
        }
        const prompt = req.body.prompt;
        if(!prompt) {
            return res.status(400).json({ message: "missing prompt" });
        }
        const open_ai_key = req.body.open_ai_key;
        if(!open_ai_key) {
            return res.status(400).json({ message: "missing open_ai_key" });
        }

        const project = await ProjectModel.findOne({ key: blu_key });
        if (!project) {
            return res.status(400).json({ message: "invalid blu key" });
        };

        const model = "gpt-4";
        const encoding = Tiktoken.encoding_for_model(model);
        const num_tokens = encoding.encode(prompt).length;

        let d = new Date();
    d.setDate(d.getDate());
    let today = `${d.getFullYear()}-${('0' + (d.getMonth() + 1)).slice(-2)}-${('0' + d.getDate()).slice(-2)}`;

      

        if (project.tokens.hasOwnProperty(today)) {
            
            project.tokens[today] =   project.tokens[today]+  num_tokens;
        }
        else {
            project.tokens[today] = num_tokens;
        }
        project.markModified('tokens');  


        if (project.carbon_footprint.hasOwnProperty(today)) {
            project.carbon_footprint[today] += num_tokens * 0.02406;
        }
        else {
            project.carbon_footprint[today] = num_tokens * 0.02406;
        }

          project.markModified('carbon_footprint');  
        

        if (project.water_footprint.hasOwnProperty(today)) {
            project.water_footprint[today] += num_tokens * 0.4226;
        }
        else {
            project.water_footprint[today] = num_tokens * 0.4226;
        }
        project.markModified('water_footprint');  


        await project.save();
        


        

  

        const openai = new OpenAI({
            apiKey: open_ai_key,
        });

        const response = await openai.chat.completions.create({
            model: model,
            messages: [
                {
                    role: "system",
                    content: `${prompt}`
                },
                {
                    role: "user",
                    content: prompt,
                },
            ],
            temperature: 0,
            max_tokens: 1024,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });

        return res.json(response.choices[0].message.content);

    } catch (error) {

        console.error('There has been a problem with your fetch operation. Make sure your openai key is correct.', error);
        res.status(400).json({ error: error.message });
    }
}