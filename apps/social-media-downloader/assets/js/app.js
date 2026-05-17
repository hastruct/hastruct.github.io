// Social Media Downloader — HydroStructAI
// Token injected inline by Jekyll build from ACTIONS_DISPATCH_TOKEN secret
const DISPATCH_TOKEN = (typeof window.DOWNLOADER_TOKEN !== 'undefined')
    ? window.DOWNLOADER_TOKEN
    : '';
const REPO_OWNER = 'hastruct';
const REPO_NAME = 'hastruct.github.io';
const WORKFLOW_FILE = 'video-downloader.yml';
const RELEASE_TAG = 'temp-downloads';

// ── Quality options ──────────────────────────────────────────────────────────

const qualityOptions = {
    mp4: [
        { value: 'best',  label: 'Tốt nhất hiện có' },
        { value: '4k',    label: '4K (2160p)' },
        { value: '1080p', label: 'Full HD (1080p)' },
        { value: '720p',  label: 'HD (720p)' },
        { value: '480p',  label: 'SD (480p)' },
        { value: '360p',  label: 'Thấp (360p)' },
    ],
    webm: [
        { value: 'best',  label: 'Tốt nhất hiện có' },
        { value: '1080p', label: 'Full HD (1080p)' },
        { value: '720p',  label: 'HD (720p)' },
        { value: '480p',  label: 'SD (480p)' },
    ],
    mp3: [
        { value: '320', label: '320 kbps (Tốt nhất)' },
        { value: '192', label: '192 kbps (Tốt)' },
        { value: '128', label: '128 kbps (Tiêu chuẩn)' },
    ],
    m4a: [
        { value: '256', label: '256 kbps (Tốt nhất)' },
        { value: '128', label: '128 kbps (Tiêu chuẩn)' },
    ],
    wav: [
        { value: 'best', label: 'Không nén (Lossless)' },
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

const platformPlaceholders = {
    youtube:   'https://youtube.com/watch?v=...',
    facebook:  'https://facebook.com/watch?v=...',
    instagram: 'https://instagram.com/p/...',
    tiktok:    'https://tiktok.com/@user/video/...',
    linkedin:  'https://linkedin.com/posts/...',
};

function updatePlaceholder() {
    const platform = document.getElementById('platform').value;
    document.getElementById('url-input').placeholder = platformPlaceholders[platform] || '';
}

async function pasteFromClipboard() {
    try {
        document.getElementById('url-input').value = await navigator.clipboard.readText();
    } catch {
        showStatus('Vui lòng dán thủ công bằng Ctrl+V / Cmd+V.', 'error');
    }
}

function clearForm() {
    document.getElementById('url-input').value = '';
    document.getElementById('format').value = 'mp4';
    document.getElementById('platform').value = 'youtube';
    updateQualityOptions();
    updatePlaceholder();
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
    if (!url.trim()) return 'Vui lòng nhập đường dẫn video.';
    try { new URL(url); } catch { return 'Định dạng đường dẫn không hợp lệ.'; }
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
            'Dịch vụ tải chưa được cấu hình. Secret <strong>ACTIONS_DISPATCH_TOKEN</strong> đang bị trống — kiểm tra lại cài đặt repository và deploy lại.',
            'error'
        );
        return;
    }

    const requestId = crypto.randomUUID().replace(/-/g, '').slice(0, 16);

    setDownloadBtnEnabled(false);
    showStatus(buildWaitingUI(0), 'loading');

    const dispatch = await dispatchWorkflow(url, format, quality, requestId);
    if (!dispatch.ok) {
        const is403 = dispatch.error.includes('403');
        showStatus(
            is403
                ? `Không có quyền truy cập (<strong>${dispatch.error}</strong>).<br>
                   <small>Cách sửa: Vào GitHub → Settings → Developer settings → Personal access tokens →
                   thêm scope <strong>workflow</strong> (classic PAT) hoặc đặt Actions thành
                   <strong>Read &amp; Write</strong> (fine-grained PAT), sau đó cập nhật secret
                   <code>ACTIONS_DISPATCH_TOKEN</code> và deploy lại.</small>`
                : `Lỗi dịch vụ tải — <strong>${dispatch.error}</strong><br>
                   <small>Đảm bảo token có quyền <em>Actions: Read &amp; Write</em> trên repository này.</small>`,
            'error'
        );
        setDownloadBtnEnabled(true);
        return;
    }

    const assetUrl = await pollForAsset(requestId, format);

    if (!assetUrl) {
        showStatus(
            'Quá thời gian chờ hoặc tải thất bại. Video có thể bị giới hạn riêng tư, chặn theo khu vực, hoặc dung lượng vượt 500 MB.',
            'error'
        );
        setDownloadBtnEnabled(true);
        return;
    }

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
        if (res.status === 204) return { ok: true };
        let errMsg = `HTTP ${res.status}`;
        try {
            const body = await res.json();
            if (body.message) errMsg += ': ' + body.message;
        } catch { /* non-JSON body */ }
        return { ok: false, error: errMsg };
    } catch (err) {
        return { ok: false, error: 'Lỗi mạng — ' + err.message };
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
            // Lỗi mạng tạm thời — tiếp tục thử
        }
    }
    return null;
}

// ── Download with Save-As dialog ─────────────────────────────────────────────

async function saveFile(assetUrl, requestId, format) {
    const ext      = format;
    const filename = `video-${requestId.slice(0, 8)}.${ext}`;
    const mime     = mimeTypes[ext] || 'application/octet-stream';

    if ('showSaveFilePicker' in window) {
        try {
            const handle = await window.showSaveFilePicker({
                suggestedName: filename,
                types: [{ description: 'Tệp media', accept: { [mime]: ['.' + ext] } }],
            });
            showStatus(buildProgressUI(), 'loading');

            const response = await fetch(assetUrl);
            if (!response.ok) throw new Error('Tải thất bại');

            const writable = await handle.createWritable();
            await response.body.pipeTo(writable);

            showStatus('<i class="fas fa-check-circle"></i> Đã lưu file thành công!', 'success');
            return;
        } catch (e) {
            if (e.name === 'AbortError') return;
        }
    }

    // Fallback: tải thẳng về thư mục Downloads
    const a = document.createElement('a');
    a.href = assetUrl;
    a.download = filename;
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showStatus('<i class="fas fa-check-circle"></i> Đang tải xuống — kiểm tra thư mục Tải xuống của bạn.', 'success');
}

// ── UI builders ───────────────────────────────────────────────────────────────

function buildWaitingUI(elapsed) {
    return `
        <div class="wait-ui">
            <div class="spinner"></div>
            <div>
                <p><strong>Đang xử lý yêu cầu của bạn…</strong></p>
                <p class="wait-note">Hệ thống đám mây đang tải video. Thông thường mất 1–3 phút.</p>
                <p class="wait-timer" id="wait-timer">Đã chờ: ${elapsed}s</p>
                <div class="progress-bar"><div class="progress-fill" id="progress-fill"></div></div>
            </div>
        </div>`;
}

function updateWaitingUI(elapsed) {
    const timer = document.getElementById('wait-timer');
    if (timer) timer.textContent = `Đã chờ: ${elapsed}s`;
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
                <p><strong>File đã sẵn sàng!</strong></p>
                <p class="wait-note">Nhấn nút bên dưới để chọn nơi lưu file.</p>
                <button class="btn btn-primary btn-large save-btn"
                    onclick="saveFile('${assetUrl}','${requestId}','${format}')">
                    <i class="fas fa-folder-open"></i> Chọn thư mục &amp; Lưu file
                </button>
            </div>
        </div>`;
}

function buildProgressUI() {
    return `
        <div class="wait-ui">
            <div class="spinner"></div>
            <p><strong>Đang ghi file xuống đĩa…</strong> Vui lòng chờ.</p>
        </div>`;
}

// ── Utilities ─────────────────────────────────────────────────────────────────

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(a.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});
