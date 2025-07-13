#!/usr/bin/env node
/**
 * Script to get Google OAuth refresh token for calendar access
 * Run this locally once to get your refresh token for production
 */

const { google } = require('googleapis');
const http = require('http');
const url = require('url');

// Check for required environment variables
if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  console.error('❌ Missing required environment variables!');
  console.error('\nPlease set the following in your .env file:');
  console.error('GOOGLE_CLIENT_ID=your_client_id_here');
  console.error('GOOGLE_CLIENT_SECRET=your_client_secret_here');
  console.error('\nGet these from Google Cloud Console OAuth credentials.');
  process.exit(1);
}

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'http://localhost:3000/callback'
);

const scopes = ['https://www.googleapis.com/auth/calendar'];

async function getRefreshToken() {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    prompt: 'consent', // Force consent screen to ensure refresh token
  });

  console.log('\n📋 To get your refresh token:\n');
  console.log('1. Open this URL in your browser:');
  console.log('\n' + authUrl + '\n');
  console.log('2. Sign in with your Google account');
  console.log('3. Grant calendar permissions');
  console.log('4. You\'ll be redirected to localhost:3000');
  console.log('\nWaiting for authentication...\n');
  
  // Create temporary server to handle callback
  const server = http.createServer(async (req, res) => {
    if (req.url.startsWith('/callback')) {
      const qs = new url.URL(req.url, `http://localhost:3000`).searchParams;
      const code = qs.get('code');
      
      if (code) {
        try {
          const { tokens } = await oauth2Client.getToken(code);
          
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(`
            <html>
              <body style="font-family: system-ui; padding: 40px; max-width: 600px; margin: 0 auto;">
                <h1>✅ Success!</h1>
                <p>Add these to your .env file:</p>
                <pre style="background: #f4f4f4; padding: 20px; border-radius: 8px; overflow-x: auto;">
GOOGLE_CLIENT_ID=${process.env.GOOGLE_CLIENT_ID}
GOOGLE_CLIENT_SECRET=${process.env.GOOGLE_CLIENT_SECRET}
GOOGLE_REFRESH_TOKEN=${tokens.refresh_token}</pre>
                <p>You can close this window.</p>
              </body>
            </html>
          `);
          
          console.log('\n✅ Success! Add these to your .env files:\n');
          console.log(`GOOGLE_CLIENT_ID=${process.env.GOOGLE_CLIENT_ID}`);
          console.log(`GOOGLE_CLIENT_SECRET=${process.env.GOOGLE_CLIENT_SECRET}`);
          console.log(`GOOGLE_REFRESH_TOKEN=${tokens.refresh_token}\n`);
          
          setTimeout(() => {
            server.close();
            process.exit(0);
          }, 2000);
        } catch (error) {
          res.writeHead(500);
          res.end('Error getting tokens');
          console.error('Error:', error);
          server.close();
          process.exit(1);
        }
      }
    }
  });

  server.listen(3000, () => {
    console.log('Server listening on http://localhost:3000 for callback...');
  });
}

getRefreshToken().catch(console.error);