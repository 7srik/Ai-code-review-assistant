import express from "express";
import { getCodeReview } from "../services/openaiClient";

const router = express.Router();

/**
 * POST /api/review
 * body: { language: string, code: string, context?: string }
 */
router.post("/", async (req, res) => {
  try {
    const { language, code, context } = req.body;
    if (!code || !language) {
      return res.status(400).json({ error: "language and code are required" });
    }
    const review = await getCodeReview({ language, code, context });
    return res.json({ review });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: "internal_server_error", detail: err.message });
  }
});

export default router;
