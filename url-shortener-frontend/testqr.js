import QRCode from 'qrcode';

const testUrl = 'http://localhost:5000/test';
QRCode.toDataURL(testUrl, (err, data) => {
  if (err) {
    console.error('QR Code error:', err);
  } else {
    console.log('QR code generated:', data);
  }
});