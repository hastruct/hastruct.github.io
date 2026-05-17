// Social Media Downloader — HydroStructAI
// Token loaded from config.js (generated at build time from ACTIONS_DISPATCH_TOKEN secret)
const DISPATCH_TOKEN = (typeof window.DOWNLOADER_TOKEN !== 'undefined' && window.DOWNLOADER_TOKEN)
    ? window.DOWNLOADER_TOKEN
    : '';
const REPO_OWNER = 'hastruct';
const REPO_NAME = 'hastruct.github.io';
const WORKFLOW_FILE = 'video-downloader.yml';
const RELEASE_TAG = 'temp-downloads';

// ── Quality options ──────────────────────────────────────────────────────────

const qualityOptions = {
    mp4: [
        { value: 'best',  label: 'Best Available' },
        { value: '4k',    label: '4K (2160p)' },
        { value: '1080p', label: 'Full HD (1080p)' },
        { value: '720p',  label: 'HD (720p)' },
        { value: '480p',  label: 'SD (480p)' },
        { value: '360p',  label: 'Low (360p)' },
    ],
    webm: [
        { value: 'best',  label: 'Best Available' },
        { value: '1080p', label: 'Full HD (1080p)' },
        { value: '720p',  label: 'HD (720p)' },
        { value: '480p',  label: 'SD (480p)' },
    ],
    mp3: [
        { value: '320', label: '320 kbps (Best)' },
        { value: '192', label: '192 kbps (Good)' },
        { value: '128', label: '128 kbps (Standard)' },
    ],
    m4a: [
        { value: '256', label: '256 kbps (Best)' },
        { value: '128', label: '128 kbps (Standard)' },
    ],
    wav: [
        { value: 'best', label: 'Lossless' },
    ],
};

const mimeTypes = {
    mp4: 'video/mp4',
    webm: 'video/webm',
    mp3: 'audio/mpeg',
    m4a: 'audio/mp4',
    wav: 'audio/wav',
};

// ── Init ─────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
    updateQualityOptions();
    document.getElementById('url-input').addEventListener('keypress', e => {
        if (e.key === 'Enter') handleDownload();
    });

    // Animate cards on scroll
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -80px 0px' });

    document.querySelectorAll('.feature-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s, transform 0.5s';
        observer.observe(card);
    });
});

// ── Form helpers ─────────────────────────────────────────────────────────────

function updateQualityOptions() {
    const format = document.getElementById('format').value;
    const sel = document.getElementById('quality');
    sel.innerHTML = '';
    (qualityOptions[format] || qualityOptions.mp4).forEach(opt => {
        const o = document.createElement('option');
        o.value = opt.value;
        o.textContent = opt.label;
        sel.appendChild(o);
    });
}

async function pasteFromClipboard() {
    try {
        document.getElementById('url-input').value = await navigator.clipboard.readText();
    } catch {
        showStatus('Please paste manually (Ctrl+V / Cmd+V).', 'error');
    }
}

function clearForm() {
    document.getElementById('url-input').value = '';
    document.getElementById('format').value = 'mp4';
    updateQualityOptions();
    hideStatus();
    setDownloadBtnEnabled(true);
}

// ── Status UI ─────────────────────────────────────────────────────────────────

function showStatus(html, type = 'info') {
    const area = document.getElementById('status-area');
    area.innerHTML = html;
    area.className = `status-message ${type}`;
    area.style.display = 'block';
}

function hideStatus() {
    const area = document.getElementById('status-area');
    area.style.display = 'none';
    area.innerHTML = '';
}

function setDownloadBtnEnabled(enabled) {
    const btn = document.getElementById('download-btn');
    btn.disabled = !enabled;
    btn.style.opacity = enabled ? '1' : '0.6';
}

// ── URL validation ────────────────────────────────────────────────────────────

function validateURL(url) {
    if (!url.trim()) return 'Please enter a video URL.';
    try { new URL(url); } catch { return 'Invalid URL format.'; }
    return null;
}

// ── Main download handler ─────────────────────────────────────────────────────

async function handleDownload() {
    const url     = document.getElementById('url-input').value.trim();
    const format  = document.getElementById('format').value;
    const quality = document.getElementById('quality').value;

    const err = validateURL(url);
    if (err) { showStatus(err, 'error'); return; }

    if (!DISPATCH_TOKEN) {
        showStatus(
            'Downloader not configured. The <strong>ACTIONS_DISPATCH_TOKEN</strong> secret is missing or empty — please check the repository secrets and redeploy.',
            'error'
        );
        return;
    }

    const requestId = crypto.randomUUID().replace(/-/g, '').slice(0, 16);

    setDownloadBtnEnabled(false);
    showStatus(buildWaitingUI(0), 'loading');

    // Trigger the GitHub Actions workflow
    const dispatched = await dispatchWorkflow(url, format, quality, requestId);
    if (!dispatched) {
        showStatus('Failed to start the download service. Check the URL and try again.', 'error');
        setDownloadBtnEnabled(true);
        return;
    }

    // Poll for the release asset
    const assetUrl = await pollForAsset(requestId, format);

    if (!assetUrl) {
        showStatus(
            'Download timed out or failed. The video may be private, geo-blocked, or too large (>500 MB).',
            'error'
        );
        setDownloadBtnEnabled(true);
        return;
    }

    // File is ready — ask user where to save
    showStatus(buildReadyUI(assetUrl, requestId, format), 'success');
    setDownloadBtnEnabled(true);
}

// ── GitHub Actions dispatch ───────────────────────────────────────────────────

async function dispatchWorkflow(url, format, quality, requestId) {
    const endpoint = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/actions/workflows/${WORKFLOW_FILE}/dispatches`;
    try {
        const res = await fetch(endpoint, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${DISPATCH_TOKEN}`,
                Accept: 'application/vnd.github+json',
                'X-GitHub-Api-Version': '2022-11-28',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ref: 'main',
                inputs: { url, format, quality, request_id: requestId },
            }),
        });
        return res.status === 204;
    } catch {
        return false;
    }
}

// ── Poll release assets ───────────────────────────────────────────────────────

async function pollForAsset(requestId, format, timeoutMs = 600000) {
    const apiUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/releases/tags/${RELEASE_TAG}`;
    const deadline = Date.now() + timeoutMs;
    let elapsed = 0;

    while (Date.now() < deadline) {
        updateWaitingUI(elapsed);
        await sleep(8000);
        elapsed += 8;

        try {
            const res = await fetch(apiUrl, {
                headers: {
                    Authorization: `Bearer ${DISPATCH_TOKEN}`,
                    Accept: 'application/vnd.github+json',
                    'X-GitHub-Api-Version': '2022-11-28',
                },
            });
            if (!res.ok) continue;

            const data = await res.json();
            const asset = (data.assets || []).find(a => a.name.startsWith(requestId));
            if (asset) return asset.browser_download_url;
        } catch {
            // Network glitch — keep polling
        }
    }
    return null;
}

// ── Download with Save-As dialog ─────────────────────────────────────────────

async function saveFile(assetUrl, requestId, format) {
    const ext      = format;
    const filename = `download-${requestId.slice(0, 8)}.${ext}`;
    const mime     = mimeTypes[ext] || 'application/octet-stream';

    if ('showSaveFilePicker' in window) {
        try {
            const handle = await window.showSaveFilePicker({
                suggestedName: filename,
                types: [{ description: 'Media file', accept: { [mime]: ['.' + ext] } }],
            });
            showStatus(buildProgressUI(), 'loading');

            const response = await fetch(assetUrl);
            if (!response.ok) throw new Error('Fetch failed');

            const writable = await handle.createWritable();
            await response.body.pipeTo(writable);

            showStatus('<i class="fas fa-check-circle"></i> File saved successfully!', 'success');
            return;
        } catch (e) {
            if (e.name === 'AbortError') return; // user cancelled
        }
    }

    // Fallback: browser native download
    const a = document.createElement('a');
    a.href = assetUrl;
    a.download = filename;
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showStatus('<i class="fas fa-check-circle"></i> Download started — check your Downloads folder.', 'success');
}

// ── UI builders ───────────────────────────────────────────────────────────────

function buildWaitingUI(elapsed) {
    return `
        <div class="wait-ui">
            <div class="spinner"></div>
            <div>
                <p><strong>Processing your request…</strong></p>
                <p class="wait-note">Our cloud engine is downloading the video. This usually takes 1–3 minutes.</p>
                <p class="wait-timer" id="wait-timer">Elapsed: ${elapsed}s</p>
                <div class="progress-bar"><div class="progress-fill" id="progress-fill"></div></div>
            </div>
        </div>`;
}

function updateWaitingUI(elapsed) {
    const timer = document.getElementById('wait-timer');
    if (timer) timer.textContent = `Elapsed: ${elapsed}s`;
    const fill = document.getElementById('progress-fill');
    if (fill) {
        const pct = Math.min(95, (elapsed / 180) * 100);
        fill.style.width = pct + '%';
    }
}

function buildReadyUI(assetUrl, requestId, format) {
    return `
        <div class="ready-ui">
            <i class="fas fa-check-circle" style="color:var(--success-color);font-size:2rem;"></i>
            <div>
                <p><strong>Your file is ready!</strong></p>
                <p class="wait-note">Click the button below to choose where to save it.</p>
                <button class="btn btn-primary btn-large save-btn"
                    onclick="saveFile('${assetUrl}','${requestId}','${format}')">
                    <i class="fas fa-folder-open"></i> Browse &amp; Save File
                </button>
            </div>
        </div>`;
}

function buildProgressUI() {
    return `
        <div class="wait-ui">
            <div class="spinner"></div>
            <p><strong>Writing file to disk…</strong> Please wait.</p>
        </div>`;
}

// ── Utilities ─────────────────────────────────────────────────────────────────

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(a.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});
