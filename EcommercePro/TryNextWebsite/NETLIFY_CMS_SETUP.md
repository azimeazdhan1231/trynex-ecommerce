# TryneX Netlify CMS Setup Guide

## Step 1: Deploy to Netlify
1. Go to [netlify.com](https://netlify.com) and sign up/login
2. Click "Add new site" → "Deploy manually"
3. Drag and drop your entire project folder (the one containing index.html, admin folder, etc.)
4. Wait for deployment to complete
5. Your site will get a random name like `amazing-cupcake-123456.netlify.app`

## Step 2: Enable Netlify Identity
1. In your Netlify dashboard, go to your site
2. Click "Site settings" → "Identity"
3. Click "Enable Identity"
4. Under "Registration preferences", select "Invite only"
5. Under "External providers", enable "Google" or "GitHub" (recommended)

## Step 3: Enable Git Gateway
1. Still in Identity settings, scroll down to "Services"
2. Click "Enable Git Gateway"
3. This allows Netlify CMS to save content to your site

## Step 4: Create Your Admin User
1. Go to Site settings → Identity → "Invite users"
2. Enter your email address
3. Click "Send invite"
4. Check your email and click the invite link
5. Set your password

## Step 5: Access Admin Panel
1. Go to `yoursite.netlify.app/admin`
2. Click "Login with Netlify Identity"
3. Enter your credentials
4. You should now see the CMS dashboard!

## Step 6: Managing Content

### Adding Products:
1. Click "Products" in the CMS sidebar
2. Click "New Products"
3. Fill in all fields:
   - Product ID (unique number)
   - Product Name (English & Bengali)
   - Price in BDT
   - Category (dropdown)
   - Image URL
   - Description (English & Bengali)
   - Badge (optional)
4. Click "Publish" → "Publish now"

### Managing Categories:
1. Click "Categories" in the sidebar
2. Add/edit product categories
3. Use Font Awesome icon classes (like `fas fa-coffee`)

### Site Settings:
1. Click "Site Settings" to update:
   - Contact information
   - Payment numbers
   - Hero slides
   - Testimonials

## Troubleshooting

### Can't access /admin:
- Make sure you deployed the entire folder including the `admin` folder
- Check if Netlify Identity is enabled
- Try clearing browser cache

### Login not working:
- Ensure you accepted the email invite
- Check that Git Gateway is enabled
- Make sure registration is set to "Invite only"

### Content not saving:
- Verify Git Gateway is enabled
- Check you have proper permissions
- Try logging out and back in

## Important Notes:
- Always use "Publish" not "Save as draft" for content to appear on site
- Images must be uploaded to a hosting service (like Cloudinary) and paste the URL
- Changes may take 1-2 minutes to appear on your live site
- Keep your admin login credentials secure

## Need Help?
Contact TryneX support via WhatsApp: 01747292277