// // generate.js
//
// import { NextApiRequest, NextApiResponse } from 'next';
// import { generateGeminiRequest, geminiService } from "../../controllers/geminiService";
// import { useState } from 'react';
//
// export default async function generateHandler(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     const { prompt } = req.body;
//
//     //I have to gather the info
//     res.status(200).json({ response: geminiResponse });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// }
//
