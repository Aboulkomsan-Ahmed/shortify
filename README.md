# Shortify

Shortify is a lightweight URL shortener API built with Express.js and MongoDB that generates short, shareable links along with QR codes. All shortened URLs expire automatically 5 days after creation using MongoDB's TTL index.

## Features

- **URL Shortening:** Generates unique short codes for any provided URL.
- **QR Code Generation:** Automatically generates a QR code for each shortened URL.
- **Automatic Link Expiry:** Each link expires 5 days after creation. Expired links are automatically removed from the database using a TTL index on the expiryDate field.
- **Click Tracking:** Increments click count on each redirect.

## Tech Stack

- **Backend:** Express.js, Node.js
- **Database:** ongoDB (with Mongoose)
- **Frontend:** React
- **QR Code Library:** qrcode

### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/yourusername/shortify.git
cd shortify
```

2. **Install Dependencies:** 

```bash
npm install
```

3. **Environment Variables:**
Create a .env file in the root of the project with the following variables:

```bash
PORT=5000
MONGO_URI=mongodb://localhost:27017/shortifyDB
BASE_URL=http://localhost:5000
```

- MONGO_URI : Your MongoDB connection string.
- BASE_URL: The base URL used to generate full short links.

4. **Ensure MongoDB is Running:**

Make sure your MongoDB instance is up and running.

### Database Schema & TTL Index

The ShortUrl model is defined with the following schema:
```bash
const mongoose = require('mongoose');

const shortUrlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortCode: { type: String, required: true, unique: true },
  clickCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  expiryDate: { type: Date, required: true }
});

// TTL index: Documents will automatically be removed when expiryDate is reached.
shortUrlSchema.index({ expiryDate: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('ShortUrl', shortUrlSchema);
```

This TTL index automatically deletes documents once their expiryDate (set to 5 days after creation) has passed.

### API Endpoints

#### POST /shorten

- Description:

Creates a shortened URL for a given original URL. The expiry is automatically set to 5 days from creation.

- Request Body:

```bash
{
  "originalUrl": "https://www.example.com"
}
```
- Response:
```bash
{
  "shortUrl": "http://localhost:5000/abc123",
  "originalUrl": "https://www.example.com",
  "expiryDate": "2023-07-20T18:25:43.511Z"
}
```


#### GET /:shortCode

- Description: Redirects to the original URL if the link is still valid (not expired).
Returns a 410 status with an error message if the link has expired.

#### GET /:shortCode/qrcode

- Description: Generates a QR code for the short URL.

- Response:
```bash
{
  "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
}
```
### Running the Application

1. **Start the Server:**
```bash
npm start
```

2. **Access the API:**
The API will be running on http://localhost:5000.

### Testing the Endpoints
#### Use Postman or your favorite REST client to test the endpoints:

- POST http://localhost:5000/shorten to create a new short URL.

- GET http://localhost:5000/<shortCode> to redirect.

- GET http://localhost:5000/<shortCode>/qrcode to retrieve the QR code.


### Contributing

Contributions are welcome! If you want to contribute, please fork the repository and submit a pull request with your proposed changes.

### License

This project is licensed under the MIT License. See the LICENSE file for details.

### Contact

For any questions or suggestions, please open an issue or contact ahmed.aboulkomsan@gmail.com.

