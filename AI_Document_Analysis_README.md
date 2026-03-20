# Reliv AI Health Coach: Medical Document Analysis Capabilities

## Summary
Currently, the **Reliv AI Health Coach** model **cannot** actually process or analyze uploaded medical documents (PDFs, images, or files).

## Current Architecture
- **Model Used:** The backend uses `llama-3.3-70b-versatile` running on the **Groq API**.
- **Model Capabilities:** `llama-3.3-70b-versatile` is an extremely powerful **text-only** language model. It does not have native multimodal capabilities (it cannot "see" images or natively read PDF byte streams). 
- **Frontend Implementation:** The document upload feature recently added to the chat interface acts as a **UI placeholder** for the user experience. When a user "uploads" a document, the chat interface currently only captures the **filename** (e.g., `📎 blood_test_report.pdf`) and appends it to the text message. The actual content of the file is **not** parsed or sent to the backend.

## Why it Cannot Analyze Documents Right Now
1. **Lacking Text Extraction:** There is no document parser (like an OCR tool, `pdf-parse`, or `tesseract`) running in your application to extract text from the files before sending them to the AI.
2. **Lacking Multimodal Integration:** The Groq API endpoint currently used only processes text messages. It does not have endpoints or models configured to take image or file objects to perform computer vision inference on medical records.
3. **No File Transport:** The frontend is not sending the file object to the backend endpoint. It is only sending the file *name* alongside the chat message.

## How to Enable Real Document Analysis in the Future
If you want the AI Health Coach to genuinely read and analyze medical documents, you would need to implement the following pipeline:

1. **Frontend to Backend Upload:** Modify the frontend chat component to actually transmit the file (via `FormData` allowing multipart/form-data support, or Base64 encoding) to the `POST /api/chat` route (or a dedicated `/api/upload` endpoint).
2. **Backend Text Extraction:** Add a library in the Node.js backend to extract the text from the uploaded files:
   - Use `pdf-parse` for PDFs.
   - Use Tesseract.js, Google Cloud Vision API, or AWS Textract to accurately scan and parse images (jpg, png).
3. **Prompt Injection:** Take the extracted text from the medical document and inject it into the prompt sent to the Groq API (e.g., *"Here is the user's uploaded medical report: [EXTRACTED TEXT]. Please analyze it and answer the user's question..."*).
4. **Alternative - Vision LLMs:** Switch to an inherently multimodal Vision model (like OpenAI's **GPT-4o** or Anthropic's **Claude 3.5 Sonnet**) that can receive images natively instead of having to rely strictly on backend text extraction. Note that Groq's fast inference services primarily host language models.
