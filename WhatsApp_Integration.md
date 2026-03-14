# WhatsApp Integration Setup

Getting access to the WhatsApp Business API (now officially called the **WhatsApp Cloud API** since Meta hosts it for free) is a structured process. Here is the step-by-step procedure to get set up for your project:

### Phase 1: Preparation
Before you start the technical setup, you need two things:
1. **A Meta Business Manager Account**: You must have a registered business. If you don't have one, you'll need to create it at [business.facebook.com](https://business.facebook.com/).
2. **A Clean Phone Number**: You need a phone number that is **not currently registered with any WhatsApp or WhatsApp Business app**. If it is, you must delete the WhatsApp account associated with that number first.

### Phase 2: Create a Meta Developer App
1. Go to the [Meta for Developers](https://developers.facebook.com/) portal and log in.
2. Click on **My Apps** and then **Create App**.
3. Select **Other** as the use case, then choose **Business** as the app type.
4. Fill in your App Name (e.g., "Reliv Kiosk"), contact email, and link it to your Meta Business Manager account.
5. Click **Create App**.

### Phase 3: Add the WhatsApp Product to Your App
1. Once your app is created, you'll be taken to the App Dashboard. Scroll down to find the **WhatsApp** product and click **Set Up**.
2. Meta will automatically generate a **test phone number** and a **temporary access token** for you.
3. *At this stage, you can actually start testing your code!* You can send test WhatsApp messages from this temporary number to up to 5 verified phone numbers (like your own personal number).

### Phase 4: Add Your Real Business Number & Go Live
To move out of testing and start messaging real users (like sending OTPs from your kiosk), you need to add your actual phone number:
1. In the left sidebar of your App Dashboard, go to **WhatsApp > API Setup**.
2. Scroll down to "Step 5: Add a phone number" and click **Add Phone Number**.
3. Fill out your display name, timezone, and business category.
4. Enter the clean phone number you prepared in Phase 1.
5. Verify the number by receiving a 6-digit code via SMS or voice call.
6. Generate a **Permanent Access Token** (via a System User in your Business Manager settings) so your backend doesn't lose access every 24 hours.

### Phase 5: Get Business Verification (Required for Scaling)
Initially, you are in an "Unverified" tier, which limits you to 250 business-initiated conversations per 24 hours. Since you are building an OTP system, you will need to scale past this:
1. Go to your Meta Business Manager > **Security Center**.
2. Start the **Business Verification** process. You will need to provide official documents (like a certificate of incorporation, business license, or utility bill) to prove your business is legally registered.
3. Once verified, your messaging limit increases significantly (starting at 1,000 conversations per day and scaling up automatically as you use it).

### Phase 6: Create Message Templates (Crucial for OTPs)
To send notifications (like OTPs) outside of a standard 24-hour customer service window, you **must use pre-approved Message Templates**:
1. In your WhatsApp Manager, go to **Message Templates** and create a newly categorized template (select "Authentication" for OTPs).
2. The template for an OTP usually looks like: *"Your Reliv identification code is {{1}}. Do not share this code with anyone."*
3. Submit it for review. Meta usually approves straightforward OTP templates within minutes to a few hours.
4. Once approved, your backend can call the API, passing the generated OTP variable exactly where `{{1}}` is in the template.
