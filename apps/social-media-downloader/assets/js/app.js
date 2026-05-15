// =====================================================
// Social Media Downloader - JavaScript
// HydroStructAI
// =====================================================

// Quality options based on format
const qualityOptions = {
    mp4: [
        { value: 'best', label: 'Best Available' },
        { value: '4k', label: '4K (2160p)' },
        { value: '1080p', label: 'Full HD (1080p)' },
        { value: '720p', label: 'HD (720p)' },
        { value: '480p', label: 'SD (480p)' },
        { value: '360p', label: 'Low (360p)' }
    ],
    webm: [
        { value: 'best', label: 'Best Available' },
        { value: '1080p', label: 'Full HD (1080p)' },
        { value: '720p', label: 'HD (720p)' },
        { value: '480p', label: 'SD (480p)' }
    ],
    mp3: [
        { value: '320', label: '320 kbps (Best)' },
        { value: '256', label: '256 kbps (High)' },
        { value: '192', label: '192 kbps (Good)' },
        { value: '128', label: '128 kbps (Standard)' },
        { value: '96', label: '96 kbps (Low)' }
    ],
    m4a: [
        { value: '256', label: '256 kbps (Best)' },
        { value: '192', label: '192 kbps (High)' },
        { value: '128', label: '128 kbps (Standard)' }
    ],
    wav: [
        { value: 'best', label: 'Lossless (Best)' },
        { value: 'high', label: 'High Quality' }
    ]
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    updateQualityOptions();
    setupEventListeners();
});

// Update quality options based on selected format
function updateQualityOptions() {
    const formatSelect = document.getElementById('format');
    const qualitySelect = document.getElementById('quality');
    const selectedFormat = formatSelect.value;

    // Clear existing options
    qualitySelect.innerHTML = '';

    // Get options for selected format
    const options = qualityOptions[selectedFormat] || qualityOptions.mp4;

    // Add new options
    options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option.value;
        optionElement.textContent = option.label;
        qualitySelect.appendChild(optionElement);
    });
}

// Setup event listeners
function setupEventListeners() {
    // Format change listener
    const formatSelect = document.getElementById('format');
    if (formatSelect) {
        formatSelect.addEventListener('change', updateQualityOptions);
    }

    // Enter key on URL input
    const urlInput = document.getElementById('url-input');
    if (urlInput) {
        urlInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleDownload();
            }
        });
    }
}

// Paste from clipboard
async function pasteFromClipboard() {
    try {
        const text = await navigator.clipboard.readText();
        document.getElementById('url-input').value = text;
        showStatus('URL pasted successfully!', 'success');
    } catch (err) {
        showStatus('Failed to paste. Please paste manually.', 'error');
    }
}

// Copy to clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showStatus('Copied to clipboard!', 'success');
    }).catch(() => {
        showStatus('Failed to copy. Please copy manually.', 'error');
    });
}

// Copy code block
function copyCodeBlock(button) {
    const codeBlock = button.closest('.code-block').querySelector('code');
    const text = codeBlock.textContent;

    navigator.clipboard.writeText(text).then(() => {
        const originalHTML = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i> Copied!';
        setTimeout(() => {
            button.innerHTML = originalHTML;
        }, 2000);
    });
}

// Clear form
function clearForm() {
    document.getElementById('url-input').value = '';
    document.getElementById('platform').value = 'youtube';
    document.getElementById('format').value = 'mp4';
    updateQualityOptions();
    hideStatus();
}

// Show status message
function showStatus(message, type = 'info') {
    const statusDiv = document.getElementById('status-message');
    statusDiv.textContent = message;
    statusDiv.className = `status-message ${type}`;
    statusDiv.style.display = 'block';

    // Auto-hide after 5 seconds for success messages
    if (type === 'success') {
        setTimeout(hideStatus, 5000);
    }
}

// Hide status message
function hideStatus() {
    const statusDiv = document.getElementById('status-message');
    statusDiv.style.display = 'none';
}

// Validate URL
function validateURL(url) {
    if (!url || url.trim() === '') {
        return { valid: false, message: 'Please enter a URL' };
    }

    try {
        new URL(url);
    } catch (e) {
        return { valid: false, message: 'Invalid URL format' };
    }

    const platform = document.getElementById('platform').value;
    const platformPatterns = {
        youtube: /youtube\.com|youtu\.be/i,
        facebook: /facebook\.com|fb\.watch/i,
        linkedin: /linkedin\.com/i,
        instagram: /instagram\.com/i,
        tiktok: /tiktok\.com/i
    };

    if (!platformPatterns[platform].test(url)) {
        return {
            valid: false,
            message: `URL doesn't appear to be from ${platform}`
        };
    }

    return { valid: true };
}

// Handle download
async function handleDownload() {
    const url = document.getElementById('url-input').value.trim();
    const platform = document.getElementById('platform').value;
    const format = document.getElementById('format').value;
    const quality = document.getElementById('quality').value;

    // Validate URL
    const validation = validateURL(url);
    if (!validation.valid) {
        showStatus(validation.message, 'error');
        return;
    }

    // Show loading
    showStatus('Processing... This may take a moment.', 'loading');

    // For GitHub Pages static site, we can't actually download server-side
    // We need to guide users to use CLI or provide alternative methods

    showCLIInstructions(url, platform, format, quality);
}

// Show CLI instructions for download
function showCLIInstructions(url, platform, format, quality) {
    const isAudio = ['mp3', 'm4a', 'wav'].includes(format);

    let command;
    if (isAudio) {
        command = `socialmediadl "${url}" --audio -f ${format} --audio-quality best`;
    } else {
        command = `socialmediadl "${url}" -q ${quality} -f ${format}`;
    }

    const escapedCommand = command.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    const message = `
        <div style="text-align: left;">
            <p><strong>To download this ${format.toUpperCase()} file:</strong></p>
            <ol style="margin: 1rem 0; padding-left: 1.5rem;">
                <li>Install the CLI tool: <code style="background: #e2e8f0; padding: 2px 6px; border-radius: 3px;">pip install socialmediadl</code></li>
                <li>Run this command:</li>
            </ol>
            <div style="background: #1e293b; color: #e2e8f0; padding: 1rem; border-radius: 8px; margin: 0.5rem 0; font-family: monospace; position: relative;">
                <code>${escapedCommand}</code>
                <button data-command id="copy-cmd-btn" style="position: absolute; top: 0.5rem; right: 0.5rem; background: rgba(255,255,255,0.1); border: none; color: white; padding: 0.25rem 0.5rem; border-radius: 4px; cursor: pointer;">
                    <i class="fas fa-copy"></i> Copy
                </button>
            </div>
            <p style="margin-top: 1rem;"><strong>Alternative:</strong> Use third-party services:</p>
            <ul style="margin: 0.5rem 0; padding-left: 1.5rem;">
                <li><a href="https://cobalt.tools" target="_blank" style="color: #2563eb;">Cobalt.tools</a> - Fast, ad-free</li>
                <li><a href="https://loader.to" target="_blank" style="color: #2563eb;">Loader.to</a> - Multi-platform</li>
            </ul>
        </div>
    `;

    const statusDiv = document.getElementById('status-message');
    statusDiv.innerHTML = message;
    statusDiv.className = 'status-message';
    statusDiv.style.display = 'block';
    statusDiv.style.background = '#eff6ff';
    statusDiv.style.color = '#1e40af';
    statusDiv.style.border = '1px solid #bfdbfe';

    // Attach copy handler safely (avoids inline onclick with special chars)
    document.getElementById('copy-cmd-btn').addEventListener('click', function() {
        navigator.clipboard.writeText(command).then(() => {
            this.innerHTML = '<i class="fas fa-check"></i> Copied!';
            setTimeout(() => { this.innerHTML = '<i class="fas fa-copy"></i> Copy'; }, 2000);
        });
    });
}

// Smooth scroll to section
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe feature cards and doc cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.feature-card, .doc-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s, transform 0.5s';
        observer.observe(card);
    });
});

// Mobile menu toggle (for future implementation)
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}
