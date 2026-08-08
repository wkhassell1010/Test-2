# Rubric OpenAI + Stripe billing setup

This version replaces the shared Groq generation path with OpenAI and adds server-side AI credit metering plus Stripe subscriptions.

## 1. Neon

Run `drizzle/0001_billing.sql` once in the Neon SQL editor.

## 2. OpenAI

Create an API key in the OpenAI API project used by Rubric and add it to Vercel as `OPENAI_API_KEY`.

The app defaults to `gpt-5.6-luna`, selected for cost-sensitive, high-volume workloads. OpenAI bills API usage separately from ChatGPT subscriptions.

## 3. Stripe

Create a recurring monthly Product/Price for Rubric Pro. The code expects that Price ID in `STRIPE_PRO_PRICE_ID`.

Recommended starting price in this build: $19/month.

Add:
- `STRIPE_SECRET_KEY`
- `STRIPE_PRO_PRICE_ID`
- `STRIPE_WEBHOOK_SECRET`
- `NEXT_PUBLIC_APP_URL`

## 4. Stripe webhook

Create a webhook endpoint at:

`https://rubricaiexam.vercel.app/api/stripe/webhook`

Subscribe it to:
- `checkout.session.completed`
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`

Stripe signatures are verified from the raw request body before any billing changes are made.

## 5. Deploy

Set all variables in Vercel Production and Preview environments as appropriate, then redeploy.

## 6. Test

1. Create a new Rubric account.
2. Confirm the account starts on Free with 50 credits.
3. Generate an exam and confirm credits decrease.
4. Open `/pricing`.
5. Use Stripe test mode to subscribe.
6. Confirm the webhook changes the account to Pro and gives 500 credits for the subscription period.
7. Open Manage billing and confirm Stripe Customer Portal opens.

## Important

Do not put `OPENAI_API_KEY`, `STRIPE_SECRET_KEY`, or `STRIPE_WEBHOOK_SECRET` in client-side code, GitHub, or public environment variables.
