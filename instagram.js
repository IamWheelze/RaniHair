// Instagram Integration for RaniHair
// This file handles all Instagram-related functionality

// Instagram Gallery Management
class InstagramGallery {
    constructor() {
        this.posts = this.loadPosts();
        this.init();
    }

    init() {
        this.renderGallery();
        this.setupEventListeners();
    }

    loadPosts() {
        const stored = localStorage.getItem('instagram_posts');
        return stored ? JSON.parse(stored) : [];
    }

    savePosts() {
        localStorage.setItem('instagram_posts', JSON.stringify(this.posts));
    }

    addPost(postData) {
        this.posts.unshift(postData);
        this.savePosts();
        this.renderGallery();
    }

    removePost(index) {
        this.posts.splice(index, 1);
        this.savePosts();
        this.renderGallery();
    }

    clearAll() {
        if (confirm('Are you sure you want to clear all Instagram posts from the gallery?')) {
            this.posts = [];
            this.savePosts();
            this.renderGallery();
            showNotification('Gallery cleared successfully!');
        }
    }

    renderGallery() {
        const gallery = document.getElementById('instagram-gallery');
        if (!gallery) return;

        if (this.posts.length === 0) {
            gallery.innerHTML = `
                <div class="gallery-placeholder">
                    <h3>No posts yet!</h3>
                    <p>Add your Instagram posts using the tools above to build your gallery.</p>
                    <p class="placeholder-tip">💡 Tip: You can add posts by pasting Instagram URLs or embed codes</p>
                </div>
            `;
            return;
        }

        gallery.innerHTML = this.posts.map((post, index) => `
            <div class="instagram-post-card" data-index="${index}">
                ${post.embedCode ? post.embedCode : `
                    <div class="post-preview">
                        <a href="${post.url}" target="_blank" rel="noopener">
                            <div class="post-icon">📸</div>
                            <p>View on Instagram</p>
                        </a>
                    </div>
                `}
                <div class="post-actions">
                    <button class="action-btn-small" onclick="sharePost(${index})">Share</button>
                    <button class="action-btn-small" onclick="removeInstagramPost(${index})">Remove</button>
                </div>
                ${post.caption ? `<p class="post-caption">${post.caption}</p>` : ''}
            </div>
        `).join('');

        // Load Instagram embed script if embed codes are present
        if (this.posts.some(post => post.embedCode)) {
            this.loadInstagramEmbedScript();
        }
    }

    loadInstagramEmbedScript() {
        if (!document.querySelector('script[src*="instagram.com/embed.js"]')) {
            const script = document.createElement('script');
            script.async = true;
            script.src = '//www.instagram.com/embed.js';
            document.body.appendChild(script);
        } else if (window.instgrm) {
            window.instgrm.Embeds.process();
        }
    }

    setupEventListeners() {
        // Set up any additional event listeners if needed
    }

    exportData() {
        const dataStr = JSON.stringify(this.posts, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `ranihair-instagram-posts-${Date.now()}.json`;
        link.click();
        URL.revokeObjectURL(url);
        showNotification('Gallery data exported successfully!');
    }
}

// Initialize gallery when DOM is loaded
let gallery;
document.addEventListener('DOMContentLoaded', () => {
    gallery = new InstagramGallery();
});

// Add Instagram post from URL or embed code
function addInstagramPost() {
    const input = document.getElementById('instagram-url');
    const embedInput = document.getElementById('embed-code');

    let url = input ? input.value.trim() : '';
    let embedCode = embedInput ? embedInput.value.trim() : '';

    if (!url && !embedCode) {
        showNotification('Please enter an Instagram URL or embed code', 'error');
        return;
    }

    // Validate Instagram URL
    if (url && !url.match(/instagram\.com\/(p|reel|tv)\//)) {
        showNotification('Please enter a valid Instagram post URL', 'error');
        return;
    }

    const postData = {
        url: url || extractURLFromEmbed(embedCode),
        embedCode: embedCode || null,
        addedAt: new Date().toISOString(),
        caption: ''
    };

    gallery.addPost(postData);

    if (input) input.value = '';
    if (embedInput) embedInput.value = '';

    showNotification('Instagram post added to gallery!');
}

// Extract URL from embed code
function extractURLFromEmbed(embedCode) {
    const match = embedCode.match(/https:\/\/www\.instagram\.com\/(p|reel|tv)\/[^\/\s"]+/);
    return match ? match[0] : '';
}

// Process embed code
function processEmbedCode() {
    const embedInput = document.getElementById('embed-code');
    if (!embedInput) return;

    const embedCode = embedInput.value.trim();
    if (!embedCode) {
        showNotification('Please paste an embed code', 'error');
        return;
    }

    const url = extractURLFromEmbed(embedCode);
    if (!url) {
        showNotification('Could not extract URL from embed code', 'error');
        return;
    }

    const postData = {
        url: url,
        embedCode: embedCode,
        addedAt: new Date().toISOString(),
        caption: ''
    };

    gallery.addPost(postData);
    embedInput.value = '';
    showNotification('Instagram post processed and added!');
}

// Remove Instagram post
function removeInstagramPost(index) {
    gallery.removePost(index);
    showNotification('Post removed from gallery');
}

// Clear gallery
function clearGallery() {
    gallery.clearAll();
}

// Export gallery
function exportGallery() {
    gallery.exportData();
}

// Share functions
function shareToInstagram() {
    const url = window.location.href;
    const text = 'Check out RaniHair - Premium Hair Care & Styling!';

    // For mobile devices, try to open Instagram app
    if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        showNotification('Opening Instagram... Copy the link to share in your story!');
        // Copy URL to clipboard
        copyToClipboard(url);
        // Try to open Instagram
        window.open('instagram://story-camera', '_blank');
    } else {
        // Desktop: provide instructions
        const message = `
            To share to Instagram Story:
            1. Open Instagram on your mobile device
            2. Create a new story
            3. Add a link sticker
            4. Paste this URL: ${url}

            The URL has been copied to your clipboard!
        `;
        copyToClipboard(url);
        alert(message);
    }
}

function sharePost(index) {
    if (!gallery || !gallery.posts[index]) return;

    const post = gallery.posts[index];
    copyToClipboard(post.url);
    showNotification('Instagram post URL copied to clipboard!');
}

function shareCurrentPage() {
    const url = window.location.href;
    copyToClipboard(url);
    showNotification('Page URL copied! Open Instagram to share in your story.');

    // Try to open Instagram on mobile
    if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        setTimeout(() => {
            window.open('instagram://story-camera', '_blank');
        }, 1000);
    }
}

function generateShareLink() {
    const output = document.getElementById('share-link-output');
    if (!output) return;

    const currentURL = window.location.href;
    const shareURL = currentURL;

    output.innerHTML = `
        <div class="share-link-result">
            <p><strong>Your Share Link:</strong></p>
            <input type="text" value="${shareURL}" readonly class="share-link-input">
            <button class="btn btn-small" onclick="copyToClipboard('${shareURL}')">Copy Link</button>
            <p class="share-instructions">
                Use this link in your Instagram bio, stories, or posts to direct followers to your website!
            </p>
        </div>
    `;

    showNotification('Share link generated!');
}

// Copy to clipboard helper
function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            showNotification('Copied to clipboard!');
        }).catch(() => {
            fallbackCopyToClipboard(text);
        });
    } else {
        fallbackCopyToClipboard(text);
    }
}

function fallbackCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();
    try {
        document.execCommand('copy');
        showNotification('Copied to clipboard!');
    } catch (err) {
        showNotification('Failed to copy. Please copy manually.', 'error');
    }
    document.body.removeChild(textArea);
}

// Copy link function (for main pages)
function copyLink() {
    const url = window.location.href;
    copyToClipboard(url);
}

// Download gallery data
function downloadGalleryData() {
    if (gallery) {
        gallery.exportData();
    }
}

// Open Instagram help
function openInstagramHelp() {
    const helpText = `
Instagram Integration Help:

1. ADDING POSTS:
   - Copy any Instagram post URL (instagram.com/p/...)
   - Paste it in the "Add Instagram Post" field
   - Click "Add Post"

2. USING EMBED CODES:
   - On Instagram web, click "..." on a post
   - Select "Embed"
   - Copy the embed code
   - Paste in "Embed Code Generator"
   - Click "Process Embed"

3. SHARING TO INSTAGRAM:
   - Click "Share to Instagram Story"
   - Your URL will be copied
   - Open Instagram app
   - Create a story and add link sticker
   - Paste the URL

4. INSTAGRAM API (Advanced):
   - For automatic feed updates, you'll need Instagram Basic Display API
   - Visit: developers.facebook.com/docs/instagram-basic-display-api
   - Requires Facebook Developer account

5. BEST PRACTICES:
   - Regular updates keep content fresh
   - Use high-quality images
   - Engage with followers
   - Use relevant hashtags

Need more help? Visit Instagram's help center or contact support.
    `;

    alert(helpText);
}

// Enhanced notification function
function showNotification(message, type = 'success') {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }

    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    const bgColor = type === 'error' ? '#dc3545' : '#8B4513';
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: ${bgColor};
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
        max-width: 400px;
    `;

    document.body.appendChild(notification);

    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Load Instagram feed on home page
document.addEventListener('DOMContentLoaded', () => {
    const feedContainer = document.getElementById('instagram-feed');
    if (feedContainer && gallery) {
        // Display recent posts on main pages
        const recentPosts = gallery.posts.slice(0, 6);
        if (recentPosts.length > 0) {
            feedContainer.innerHTML = `
                <div class="instagram-preview-grid">
                    ${recentPosts.map((post, index) => `
                        <div class="instagram-preview-item">
                            <a href="${post.url}" target="_blank" rel="noopener">
                                <div class="preview-icon">📸</div>
                                <span>Post ${index + 1}</span>
                            </a>
                        </div>
                    `).join('')}
                </div>
                <a href="gallery.html" class="view-all-link">View All Posts →</a>
            `;
        }
    }
});

console.log('%c Instagram Integration Loaded ', 'background: #E1306C; color: white; font-size: 14px; padding: 5px;');
