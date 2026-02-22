# Sadder Days | Official Website & Management Suite

A high-end, contemporary web application featuring a bespoke administrative backend and interactive fan experiences.

## 🛠 Features
* **Bespoke CMS (/manage):** Password-protected dashboard (`sadderdays2025`) for real-time updates.
* **Interactive LAB:** Custom-built Yin/Yang quiz with editable questions and logic.
* **Dynamic Content Toggles:** Instant control over "Coming Soon" states for Shop and Tour modules.
* **Visual Precision:** Custom "Pink Slider" hero preview and responsive image management.

---

## 🌐 How to Connect Your Domain
To move from the preview URL to your official domain (e.g., `sadderdays.world`):

1. **Deployment:** Ensure the GitHub repo is connected to your hosting provider (Vercel or Netlify).
2. **Add Domain:** In your hosting dashboard, go to **Settings > Domains** and add your custom URL.
3. **Update DNS:** Login to your domain registrar (GoDaddy, Namecheap, etc.) and update the **A Record** or **CNAME** to the values provided by the host.
4. **SSL Activation:** The site will automatically generate a security certificate once DNS propagates (usually 1–24 hours).

---

## 🛍 Shopify Integration
The site is designed to pull products directly from your Shopify store:

1. **Generate Buy Button:** In your Shopify Admin, create a "Buy Button" or "Collection" sales channel.
2. **Copy IDs:** Grab the specific **Product ID** or **Collection ID** from the Shopify code snippet.
3. **Update Dashboard:** Log in to `/manage`, navigate to the **Shopify tab**, and paste the IDs into the corresponding fields.
4. **Go Live:** Toggle the **Shop Live** switch to **LIVE** to display the shop, or **OFF** to show the "COMING SOON" state.

---

## 🔑 Technical Handoff
The following environment variables must be configured in the hosting provider to maintain the database connection:
* `VITE_SUPABASE_URL`
* `VITE_SUPABASE_ANON_KEY`

> **Note:** Do not store these keys in a `.env` file within the GitHub repository for security reasons.

---
*Designed & Developed by Raina Bhatia*
