import { generateContent } from '@google/generative-ai';

export default async function handler(req, res) {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message content is required' });
  }

  try {
    const apiResponse = await generateContent({
      model: 'gemini-1.5-flash',
      prompt: message,  // Ensure the payload only contains fields that the API expects
      // Ensure there is no "type" field in the payload
    });

    // Extract the response content
    const responseText = apiResponse.data?.response || "No response from the model.";

    res.status(200).json({ response: responseText });
  } catch (error) {
    console.error('Error generating response:', error);
    res.status(500).json({ error: 'Failed to generate response from Google Generative AI.' });
  }
}
