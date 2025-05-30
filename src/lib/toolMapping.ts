// Tool name to ID mapping utility
export const getToolId = (toolName: string): string => {
  const toolMapping: { [key: string]: string } = {
    // Chatbots
    'ChatGPT': 'chatgpt',
    'ChatGPT Free': 'chatgpt',
    'GPT-4 Turbo': 'chatgpt',
    'Claude': 'claude',
    'Claude AI': 'claude',
    'Claude 3 Opus': 'claude',
    'Bard': 'bard',
    'Perplexity AI': 'perplexity',
    
    // Design & Art
    'Midjourney': 'midjourney',
    'Midjourney V6': 'midjourney',
    'DALL-E 3': 'dalle3',
    'Stable Diffusion': 'stable-diffusion',
    'Adobe Firefly': 'adobe-firefly',
    'Design AI Studio': 'design-ai-studio',
    'Canva AI': 'canva-ai',
    
    // Voice & Audio
    'ElevenLabs': 'elevenlabs',
    'Elevenlabs Voice AI': 'elevenlabs',
    'Voice Clone Studio': 'voice-clone-studio',
    'Murf AI': 'murf-ai',
    'Resemble AI': 'resemble-ai',
    
    // Writing
    'Smart Writing Assistant': 'smart-writing-assistant',
    'Jasper': 'jasper',
    'Jasper AI': 'jasper',
    'Copy.ai': 'copy-ai',
    'Grammarly': 'grammarly',
    
    // Code & Development
    'GitHub Copilot': 'github-copilot',
    'Code Assistant Pro': 'code-assistant-pro',
    'Replit': 'replit',
    'Cursor': 'cursor',
    
    // Video
    'AI Video Generator Pro': 'ai-video-generator-pro',
    'Runway ML': 'runway-ml',
    'Synthesia': 'synthesia',
    'Lumen5': 'lumen5',
    
    // Music
    'AIVA': 'aiva',
    'Amper Music': 'amper-music',
    'Soundraw': 'soundraw',
    'Music AI Composer': 'music-ai-composer',
    
    // Office & Productivity
    'Notion AI': 'notion-ai',
    'Notion': 'notion-ai',
    'Otter.ai': 'otter-ai',
    'Calendly': 'calendly',
    
    // Free Tools
    'Google Colab': 'google-colab',
    'Hugging Face': 'hugging-face',
    'OpenAI Playground': 'openai-playground'
  };

  // Return mapped ID or create a URL-friendly ID from the name
  return toolMapping[toolName] || toolName.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim();
};

// Check if tool detail page exists
export const hasToolDetail = (toolName: string): boolean => {
  const toolsWithDetails = ['ChatGPT', 'ChatGPT Free', 'GPT-4 Turbo', 'Midjourney', 'Midjourney V6'];
  return toolsWithDetails.includes(toolName);
}; 