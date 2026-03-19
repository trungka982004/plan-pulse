export const aiService = {
  async getGoalAdvice(goals, habits, userProfile) {
    const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
    
    if (!API_KEY) {
      return "AI Coach is ready, but no API Key found. Please check your .env file.";
    }

    const prompt = `
      User Name: ${userProfile.name}
      Current Goals: ${goals.map(g => `- ${g.title} (${g.status})`).join('\n')}
      Daily Habits: ${habits.map(h => `- ${h.name} (${h.streak} day streak)`).join('\n')}
      
      You are a motivational and professional AI Goal Coach named Antigravity. 
      Your task is to provide a short, specific, and highly motivational advice (max 3 sentences) 
      to help this user stay focused on their goals and maintain their habit streaks today. 
      Focus on one specific achievement or goal mentioned.
      Reply in a friendly, supportive tone.
    `;

    // Sử dụng endpoint v1beta và model gemini-2.5-flash phù hợp với tài khoản của bạn
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Gemini API Error details:", errorData);
        throw new Error(`Gemini API error: ${response.status} - ${errorData.error?.message || response.statusText}`);
      }

      const data = await response.json();
      const advice = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      return advice ? advice.trim() : "Keep up the great work! You're making progress every single day.";
      
    } catch (error) {
      console.error("AI Service Error:", error);
      return "I'm having a bit of trouble thinking right now, but keep pushing toward your goals! You've got this.";
    }
  }
}
