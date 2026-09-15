# Waitlist setup

Signups hit `POST /api/waitlist`, which writes the email to Google Sheets and
sends a confirmation through Resend. The row write is what decides success; a
failed confirmation email is logged but still returns 200, so nobody loses
their spot because Resend had a bad minute.

## 1. Google Sheets via Apps Script

1. Create a sheet. Put `email` in A1 and `submitted at` in B1.
2. Extensions > Apps Script, replace `Code.gs` with:

```javascript
const SECRET = ''; // set this and GOOGLE_SHEETS_WEBHOOK_SECRET to the same value

function doPost(e) {
  const body = JSON.parse(e.postData.contents);

  if (SECRET && body.secret !== SECRET) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: 'unauthorized' }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  SpreadsheetApp.getActiveSpreadsheet()
    .getSheetByName('Sheet1')
    .appendRow([body.email, body.submittedAt]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

3. Deploy > New deployment > type **Web app**.
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Copy the `/exec` URL into `GOOGLE_SHEETS_WEBHOOK_URL`.

"Anyone" means anyone with the URL can append rows, which is why `SECRET`
exists. Set it on both sides.

## 2. Resend

1. Create an API key at https://resend.com/api-keys, set `RESEND_API_KEY`.
2. Set `WAITLIST_FROM_EMAIL`. Resend only sends from domains you have
   verified, so this cannot be a gmail address. Until you verify a domain,
   `onboarding@resend.dev` works but only delivers to your own Resend account
   email.
3. `WAITLIST_REPLY_TO` can be any address, including gmail. Replies to the
   confirmation land there.

## Behaviour without configuration

| Configured | Result |
| --- | --- |
| Nothing | 503, "waitlist is not accepting signups yet" |
| Sheets only | 200, row written, no confirmation email |
| Resend only | 200, email sent, nothing stored |
| Both | 200, row written and confirmation sent |
