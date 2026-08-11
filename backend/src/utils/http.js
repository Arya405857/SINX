export const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
export const ok = (res, data, status = 200) => res.status(status).json({ success: true, data });
export class AppError extends Error { constructor(message, status = 400, code = 'BAD_REQUEST') { super(message); this.status = status; this.code = code; } }
