const express = require('express');
const QRCode = require('qrcode');
const app = express();

app.get('/generate-qr', async (req, res) => {
  const { text } = req.query; // Text to encode passed as a query parameter

  if (!text) {
    return res.status(400).send('Text query parameter is required.');
  }

  try {
    // Generate QR Code as a Buffer
    const qrCodeBuffer = await QRCode.toBuffer(text);

    // Set headers to force download
    res.setHeader('Content-Disposition', `attachment; filename="qrcode.png"`);
    res.setHeader('Content-Type', 'image/png');

    // Send the QR Code as a file
    res.status(200).send(qrCodeBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error generating QR Code.');
  }
});

const PORT = 3006;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
