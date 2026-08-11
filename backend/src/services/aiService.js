export class AiService { async translate() { return { status: 'pending_ai', message: 'The Signix AI service is not connected yet.' }; } async signaReply() { return { status: 'pending_ai', message: 'Signa is ready for the future AI service.' }; } }
export const aiService = new AiService();
