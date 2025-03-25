import React, { useState } from 'react';

const UrlShortener = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [error, setError] = useState('');

  const handleShorten = async (e) => {
    e.preventDefault();
    setError('');
    setShortUrl('');
    setQrCode('');

    try {
      // Shorten the URL via a POST request
      const res = await fetch('http://localhost:5000/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ originalUrl })
      });
      
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to shorten URL');
      }
      
      const data = await res.json();
      setShortUrl(data.shortUrl);
      
      // Extract the short code from the returned URL
      const shortCode = data.shortUrl.substring(data.shortUrl.lastIndexOf('/') + 1);
      console.log('Short code:', shortCode);
      
      // Generate the QR code by calling the endpoint
      const qrRes = await fetch(`http://localhost:5000/${shortCode}/qrcode`);
      if (!qrRes.ok) {
        const qrErrData = await qrRes.json();
        throw new Error(qrErrData.error || 'Failed to generate QR Code');
      }
      
      const qrData = await qrRes.json();
      setQrCode(qrData.qrCode);

      
      
    } catch (err) {
      console.error('Error:', err);
      setError(err.message);
    }
  };

  return (
    <div style={{ margin: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>URL Shortener</h1>
      <form onSubmit={handleShorten}>
        <input
          type="text"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          placeholder="Enter URL"
          style={{ width: '300px', marginRight: '10px', padding: '5px' }}
        />
        <button type="submit" style={{ padding: '5px 10px' }}>
          Shorten
        </button>
      </form>
      {shortUrl && (
        <div style={{ marginTop: '20px' }}>
          <h3>Short URL:</h3>
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">
            {shortUrl}
          </a>
        </div>
      )}
      {qrCode && (
        <div style={{ marginTop: '20px' }}>
          <h3>QR Code:</h3>
          <img src={qrCode} alt="QR Code" style={{ maxWidth: '200px' }} />
        </div>
      )}
      {error && (
        <div style={{ marginTop: '20px', color: 'red' }}>
          Error: {error}
        </div>
      )}
    </div>
  );
};

export default UrlShortener;
