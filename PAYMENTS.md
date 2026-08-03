# Fee Payments Setup (Razorpay)

SPMS accepts fee payments online through [Razorpay](https://razorpay.com). This guide covers
setting up your keys, the webhook, and testing payments.

## 1. Create a Razorpay account

1. Go to <https://dashboard.razorpay.com> and sign up (or sign in).
2. Switch to **Test Mode** (toggle in the top-right of the dashboard). Test mode uses `rzp_test_` keys
   and simulates payments without moving real money.

## 2. Get your API keys

1. In the dashboard, go to **Settings → API Keys** (or **Account → API Keys**).
2. Click **Generate Key** and copy:
   - **Key ID** (looks like `rzp_test_xxxxxxxxxxxx`)
   - **Key Secret**
3. Paste them into `backend/.env`:

```env
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_key_secret_here
RAZORPAY_WEBHOOK_SECRET=any_long_random_string_you_choose
```

`RAZORPAY_WEBHOOK_SECRET` is created by you (any long random string). The same value must be
entered in the Razorpay dashboard in step 4. A template is in `backend/.env.example`.

> Never commit `.env` to git. It is already listed in `.gitignore`.

## 3. Restart the backend

Stop the running backend and start it again so it picks up the new keys:

```bash
cd backend
npm run dev
```

Until the keys are set, the checkout endpoint returns
`503 "Razorpay is not configured"` — that is expected.

## 4. Configure the webhook

The webhook is how Razorpay tells SPMS that a payment succeeded, so the fee is automatically
marked as paid.

1. In the Razorpay dashboard go to **Settings → Webhooks**.
2. Click **Add Webhook** and enter:
   - **Webhook URL:** `http://<your-backend-host>/api/v1/fees/payment/webhook`
     - Locally this is `http://localhost:5000/api/v1/fees/payment/webhook` (works only while the
       backend runs on your machine and only for test-mode checkouts).
     - For production (or mobile testing), use your public HTTPS domain.
3. **Secret:** paste the same `RAZORPAY_WEBHOOK_SECRET` value from `.env`.
4. Select these events:
   - `payment.captured`
   - `payment.failed`
5. Save.

SPMS verifies every webhook call using the HMAC signature, so a wrong secret means events are
rejected (a `400` is logged server-side).

## 5. Configure payment methods (optional)

In the app, log in as **admin → School Settings → Payments** and toggle which methods students can
use at checkout (UPI, Cards, Netbanking, Wallets). Choices are saved to the database and applied to
every checkout. Unused methods are hidden in the Razorpay popup.

## 6. Test a payment as a student

1. As an admin, create a fee for a student (Fees → New Fee) if one doesn't exist.
2. Log in as that student → **Fees** → click **Pay Now**.
3. In the Razorpay popup use a test card:

   | Card number          | Expiry   | CVV | Result            |
   | -------------------- | -------- | --- | ----------------- |
   | `4111 1111 1111 1111`| any future | 123 | Successful payment |
   | `4000 0000 0000 0002`| any future | 123 | Failed payment     |

   UPI and netbanking options also work in test mode with the sample inputs shown in the popup.

4. After payment, the app polls the order status, marks the fee `Paid` (or `Partial`), and the
   payment appears in the student's **Payment History**.

## Troubleshooting

- **`503 "Razorpay is not configured"`** → keys are missing from `.env`, or the backend wasn't
  restarted after adding them.
- **Webhook events rejected (`400`)** → the webhook secret in the Razorpay dashboard doesn't match
  `RAZORPAY_WEBHOOK_SECRET` in `.env`.
- **Popup says "Order already paid"** → an order was created but not completed; create a fresh
  checkout. A `Payment` in `Pending` status with an old order is harmless.
- **Payments not showing as paid** → confirm the webhook URL is reachable from the internet and
  that `payment.captured` is selected. Local `localhost` webhooks only fire if Razorpay test mode
  can reach your machine (use a tunnel like `ngrok` for that).
