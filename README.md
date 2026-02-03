# Sadder Days – Website

This repository contains the official Sadder Days website, built as a custom React application using Vite and Tailwind CSS. The site includes a designed shop interface and a Supabase backend for mailing list subscriptions and admin access.

## 🛠 Tech Stack
- **Frontend:** React + Vite
- **Styling:** Tailwind CSS
- **Backend:** Supabase (Auth + Database)
- **Deployment:** Vercel (recommended)

## 🌐 Deployment & Domain
The domain is managed externally. To publish the site:
1. Connect this repository to a hosting platform such as **Vercel**.
2. Add the domain in the hosting platform dashboard.
3. Update DNS records (A and CNAME) at the domain registrar to point to the deployment.

## 🔐 Backend & Security (Supabase)
Supabase is used to manage email subscriptions and admin permissions.

### Role-Based Access
- Admin permissions are managed via the `user_roles` table.
- To grant admin access, insert a row with:
  - `user_id` (from `auth.users`)
  - `app_role` set to `'admin'`

### Row Level Security (RLS)
- RLS is enabled across tables.
- The `email_subscribers` table allows public `INSERT` so visitors can sign up without authentication.
- Admin-only access is required for viewing or deleting subscriber data.

## 🛒 Shopify Integration
The Shop page is a custom-designed React interface prepared for Shopify integration.

### Required Environment Variables
These must be added in the hosting platform (e.g. Vercel):
- `VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN`
- `VITE_SHOPIFY_STORE_DOMAIN`

Once connected, placeholder products can be replaced with live Shopify data or direct product links.

## 🧑‍💻 Local Development
For future development:
```bash
npm install
npm run dev
