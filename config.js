// Kindly Monthly Review Tool - Configuration
// Store your Google Sheets credentials here

const CONFIG = {
  // Replace with your actual Google Sheet ID
  // Get from: sheets.google.com/d/{SHEET_ID}/edit
  GOOGLE_SHEET_ID: '1S-MfaOrepfq9KIqWM0pu8ZzEPyhnsCBkQmtuKx0meIM',
  
  // Google Sheets API Key (or OAuth token)
  // This will be stored as a Vercel environment variable, not in code
  // Set in Vercel dashboard: Settings → Environment Variables
  GOOGLE_SHEETS_API_KEY: 'SET_IN_VERCEL_ENV', 
  
  // App version for tracking
  APP_VERSION: '1.1',
  
  // When was this deployed
  DEPLOYED_DATE: '2026-06-08',
  
  // Google Sheets tab names (must match your Sheet)
  SHEETS: {
    DECISIONS: 'decisions',
    MONTHLY_SUMMARY: 'monthly_summary',
    AUDIT_LOG: 'audit_log'
  },
  
  // Vercel deployment URL
  LIVE_URL: 'https://kindly-cost-review.vercel.app'
};

// Usage in HTML tool:
// 1. When user clicks approve/reject, save to Google Sheet using CONFIG.GOOGLE_SHEET_ID
// 2. On page load, fetch previous decisions from Sheet
// 3. Display in tool with date filters
