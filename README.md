# RaniHair - Afro Hair Styling & General Hair Care Website

🌐 **[Visit Live Site](https://iamwheelze.github.io/RaniHair/)**

A modern, responsive website for hair care products and services, featuring two main sections:
- **Afro Hair Styling**: Specialized products and services for natural, textured, and afro hair
- **General Hair Care**: Comprehensive solutions for all hair types
- **Instagram Integration**: Seamlessly share and display Instagram content

## Features

### Main Landing Page
- Clean, modern design with hero section
- Easy navigation to both specialized sections
- Feature cards highlighting key services
- Responsive layout for all devices

### Afro Hair Styling Section
- Curated product selection for afro-textured hair
- Protective styling services (braids, twists, locs)
- Natural styling techniques
- Heat styling options
- Hair care tips specific to afro hair

### General Hair Care Section
- Products categorized by hair type (straight, wavy, curly, color-treated)
- Solutions for common hair concerns (dryness, oily scalp, dandruff, hair loss)
- Step-by-step hair care routine guide
- Featured products for all hair types

### Instagram Gallery
- Add Instagram posts by URL or embed code
- Share website content to Instagram stories
- Display Instagram feed on website
- Export/import gallery data
- Mobile-optimized social sharing

## Technologies Used

- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with CSS Grid and Flexbox
- **JavaScript**: Interactive features and animations
- **LocalStorage**: Shopping cart functionality

## File Structure

```
RaniHair/
├── index.html          # Main landing page
├── afro-hair.html      # Afro hair styling section
├── general-hair.html   # General hair care section
├── gallery.html        # Instagram gallery and integration tools
├── styles.css          # Main stylesheet
├── script.js           # JavaScript functionality
├── instagram.js        # Instagram integration features
└── README.md           # Project documentation
```

## Features

### Responsive Design
- Mobile-first approach
- Breakpoints for tablets and desktops
- Smooth animations and transitions

### Interactive Elements
- Add to cart functionality with localStorage
- Notification system for user feedback
- Smooth scrolling navigation
- Scroll-triggered animations
- Auto-hiding navbar on scroll

### Accessibility
- Semantic HTML structure
- Clear navigation
- Readable font sizes and color contrast

## Deployment on GitHub Pages

This website is deployed on GitHub Pages. Here's how to deploy it:

### Initial Setup

1. **Push your code to GitHub** (already done if you're reading this on GitHub)

2. **Enable GitHub Pages:**
   - Go to your repository on GitHub
   - Click on **Settings** tab
   - Scroll down to **Pages** section (in the left sidebar)
   - Under "Source", select **Deploy from a branch**
   - Choose branch: `main` (or `claude/afro-hair-styling-site-01TaYED3BSTaWecBR9pZV5Yc`)
   - Choose folder: `/ (root)`
   - Click **Save**

3. **Wait for deployment** (usually 1-2 minutes)
   - GitHub will build and deploy your site
   - You'll see a green checkmark when ready
   - Your site will be available at: `https://yourusername.github.io/RaniHair/`

### Updating Your Live Site

Every time you push changes to the selected branch, GitHub Pages will automatically rebuild and deploy your site.

```bash
git add .
git commit -m "Your update message"
git push origin main
```

### Custom Domain (Optional)

To use a custom domain like `www.ranihair.com`:

1. Buy a domain from a domain registrar
2. In your repository settings → Pages → Custom domain
3. Enter your domain name
4. Create a `CNAME` file in the root with your domain
5. Configure DNS settings at your domain registrar

## How to Use Locally

1. Clone or download this repository
2. Open `index.html` in your web browser
3. Navigate between sections using the navigation menu
4. Browse products in each section
5. Click "Add to Cart" to save products (stored in browser)

## Instagram Integration

### Adding Instagram Posts

1. Go to the **Instagram Gallery** page
2. Copy an Instagram post URL from the app or web
3. Paste it in the "Add Instagram Post" field
4. Click "Add Post"

### Sharing to Instagram

1. Click "Share to Instagram Story" on any page
2. The URL will be copied to your clipboard
3. Open Instagram and create a story
4. Add a link sticker with the copied URL

## Customization

### Colors
The color scheme can be customized in `styles.css` using CSS variables:
```css
:root {
    --primary-color: #8B4513;
    --secondary-color: #D4AF37;
    --accent-color: #E6B800;
    --dark-bg: #2C1810;
    --light-bg: #FFF8F0;
}
```

### Content
- Edit HTML files to update product information, prices, and descriptions
- Modify service offerings in the respective section files
- Update styling tips and hair care advice as needed

### Instagram Integration
- Change `@ranihair` to your actual Instagram handle in all HTML files
- Update social media links in the footer
- Customize meta tags with your actual domain and preview images

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Current Features

✅ Responsive design for all devices
✅ Instagram integration and social sharing
✅ Product catalog with add to cart
✅ Interactive UI with animations
✅ SEO-friendly meta tags
✅ LocalStorage for data persistence

## Future Enhancements

- Shopping cart page with checkout functionality
- Product search and filtering
- User accounts and order history
- Blog section for hair care tips
- Appointment booking system
- Customer reviews and ratings
- Instagram API integration for automatic feed updates
- Payment gateway integration
- Email newsletter signup

## License

This project is open source and available for everyone.

## Contact

For questions or feedback about RaniHair, please reach out through the website.

---

**RaniHair** - Beautiful Hair for Everyone
