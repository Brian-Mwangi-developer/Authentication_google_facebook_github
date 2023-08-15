//doing the Authentication Manually without using third pary libraries

// routes/auth.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

const CLIENT_ID = 'YOUR_CLIENT_ID';
const CLIENT_SECRET = 'YOUR_CLIENT_SECRET';
const REDIRECT_URI = 'http://localhost:5000/auth/google/callback';

router.get('/google', (req, res) => {
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=openid%20profile`;

  res.redirect(authUrl);
});

router.get('/google/callback', async (req, res) => {
  const code = req.query.code;

  try {
    // Exchange code for access token
    const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', null, {
      params: {
        code,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
        grant_type: 'authorization_code',
      },
    });

    const accessToken = tokenResponse.data.access_token;

    // Fetch user profile using access token
    const profileResponse = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const userProfile = profileResponse.data;

    // Handle user data (e.g., store in database, session, etc.)
    // userProfile contains user information like name, email, picture, etc.

    res.json({ success: true, message: 'Google Sign-In Successful', user: userProfile });
  } catch (error) {
    console.error('Error during Google Sign-In:', error.message);
    res.status(500).json({ success: false, message: 'An error occurred during Google Sign-In' });
  }
});

module.exports = router;
