import { GoogleGenAI } from "@google/genai";

// Initialize the client. API_KEY is assumed to be in the environment variables.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates a cover letter based on the job description and candidate's rough input.
 */
export const generateCoverLetter = async (
  jobTitle: string,
  companyName: string,
  candidateExperience: string
): Promise<string> => {
  try {
    const prompt = `
      You are a professional career coach helping a candidate apply for a job.
      
      Job Details:
      - Role: ${jobTitle}
      - Company: ${companyName}
      
      Candidate's Background/Notes:
      "${candidateExperience}"
      
      Task:
      Write a compelling, professional, yet authentic cover letter (approx 150-200 words) for this candidate. 
      Focus on why they are a good fit based on the notes provided. 
      Do not use placeholders like "[Your Name]" inside the body text if possible, or minimize them.
      Keep the tone enthusiastic but professional.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Could not generate cover letter. Please try again.";
  } catch (error) {
    console.error("Error generating cover letter:", error);
    throw new Error("Failed to generate cover letter. Please check your connection.");
  }
};
