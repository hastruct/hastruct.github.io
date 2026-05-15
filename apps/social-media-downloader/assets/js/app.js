/* =====================================================
   Social Media Downloader - App Logic
   HydroStructAI
===================================================== */

const AUDIO_FORMATS = ['mp3', 'm4a', 'wav'];
const VIDEO_QUALITIES = ['4K (2160p)', '1080p', '720p', '480p', '360p'];
const AUDIO_QUALITIES = ['320 kbps', '192 kbps', '128 kbps', '64 kbps'];

function updateQualityOptions() {
    const format = document.getElementById('format').value;
    const qualitySelect = document.getElementById('quality');
    const isAudio = AUDIO_FORMATS.includes(format);
    const qualities = isAudio ? AUDIO_QUALITIES : VIDEO_QUALITIES;

    qualitySelect.innerHTML = qualities
        .map(q => `<option value="${q}">${q}</option>`)
        .join('');
}

function copyToClipboard(text, btn) {
    navigator.clipboard.writeText(text).then(() => {
        if (btn) {
            const original = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check"></i>';
            setTimeout(() => { btn.innerHTML = original; }, 2000);
        }
    }).catch(() => {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
    });
}

async function pasteFromClipboard() {
    try {
        const text = await navigator.clipboard.readText();
        document.getElementById('url-input').value = text;
    } catch {
        document.getElementById('url-input').focus();
    }
}

function handleDownload() {
    const url = document.getElementById('url-input').value.trim();
    const format = document.getElementById('format').value;
    const quality = document.getElementById('quality').value;

    if (!url) {
        showStatus('<i class="fas fa-exclamation-circle"></i> Please enter a video URL.', 'error');
        return;
    }

    if (!isValidUrl(url)) {
        showStatus('<i class="fas fa-exclamation-circle"></i> Please enter a valid URL.', 'error');
        return;
    }

    const isAudio = AUDIO_FORMATS.includes(format);
    let command;

    if (isAudio) {
        command = `socialmediadl "${url}" --audio -f ${format}`;
    } else {
        const qualityFlag = quality.includes('4K') ? '4K'
            : quality.replace('p', '').trim();
        command = `socialmediadl "${url}" -q ${qualityFlag} -f ${format}`;
    }

    const statusHtml = `
        <strong><i class="fas fa-terminal"></i> CLI Command:</strong><br>
        <code>${escapeHtml(command)}</code>
        <small style="display:block;margin-top:6px;">
            Run this in your terminal after installing:
            <strong>pip install socialmediadl</strong>
        </small>
        <button class="btn btn-primary" style="margin-top:12px;padding:8px 16px;font-size:0.9rem;"
            onclick="copyToClipboard('${escapeAttr(command)}', this)">
            <i class="fas fa-copy"></i> Copy Command
        </button>
    `;
    showStatus(statusHtml, 'success');
}

function clearForm() {
    document.getElementById('url-input').value = '';
    document.getElementById('platform').value = 'youtube';
    document.getElementById('format').value = 'mp4';
    updateQualityOptions();
    hideStatus();
}

function copyCodeBlock(btn) {
    const code = btn.closest('.code-block').querySelector('pre code').textContent;
    navigator.clipboard.writeText(code).then(() => {
        const original = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        setTimeout(() => { btn.innerHTML = original; }, 2000);
    });
}

function showStatus(html, type) {
    const el = document.getElementById('status-message');
    el.innerHTML = html;
    el.className = `status-message ${type}`;
    el.style.display = 'block';
    el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function hideStatus() {
    const el = document.getElementById('status-message');
    el.style.display = 'none';
}

function isValidUrl(str) {
    try {
        new URL(str);
        return true;
    } catch {
        return false;
    }
}

function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function escapeAttr(str) {
    return str.replace(/'/g, "\\'");
}

document.addEventListener('DOMContentLoaded', updateQualityOptions);
