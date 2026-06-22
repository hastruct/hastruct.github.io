"""
Generate interactive quiz HTML from On tap thi Thau.docx
- Extracts correct answers from GREEN color (#28A745) on option paragraphs
- Extracts explanations (Ly giai) embedded in text for 39 questions
- Output: ../_posts/2026-06-22-on-tap-nghiep-vu-dau-thau.html
"""
import zipfile, re, sys, io, os, json, html as html_module

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# ── Parse docx ───────────────────────────────────────────────────────────────
raw_dir = os.path.dirname(os.path.abspath(__file__))
files = os.listdir(raw_dir)
docx_file = [f for f in files if 'Th' in f and f.endswith('.docx') and 'BIM' not in f][0]

with zipfile.ZipFile(os.path.join(raw_dir, docx_file), 'r') as z:
    xml = z.read('word/document.xml').decode('utf-8')

raw_paragraphs = re.findall(r'<w:p[ >].*?</w:p>', xml, re.DOTALL)
ANSWER_COLOR = '28A745'


def para_text(p):
    texts = re.findall(r'<w:t[^>]*>(.*?)</w:t>', p, re.DOTALL)
    return ''.join(texts).strip()


def is_answer_para(p):
    colors = re.findall(r'<w:color w:val="([^"]+)"', p)
    green = colors.count(ANSWER_COLOR)
    return green > 0 and green >= len(colors) * 0.5


# Build list of (text, is_green)
items = []
for p in raw_paragraphs:
    text = para_text(p)
    if text:
        items.append((text, is_answer_para(p)))

print(f'Total non-empty lines: {len(items)}', file=sys.stderr)
print(f'Green paragraphs: {sum(1 for _, g in items if g)}', file=sys.stderr)


def parse_questions(items):
    questions = []
    i = 0
    while i < len(items):
        text, _ = items[i]
        m = re.match(r'Câu (\d+):\s*(.*)', text)
        if m:
            q_num = int(m.group(1))
            q_text = m.group(2).strip()
            opts = {}
            opt_correct = {}   # letter -> bool (from color)
            explanation = None
            correct_from_color = None
            i += 1
            for letter in ['A', 'B', 'C', 'D']:
                if i < len(items):
                    opt_text, is_green = items[i]
                    om = re.match(r'^' + letter + r':\s*(.*)', opt_text, re.DOTALL)
                    if om:
                        opt_raw = om.group(1)
                        # Check embedded explanation pattern
                        emb = re.search(
                            r'(.+?)\s+Đáp án:?\s*([A-D])[.\s].*?Lý giải:\s*(.+)',
                            opt_raw, re.DOTALL
                        )
                        if emb:
                            opts[letter] = emb.group(1).strip()
                            explanation = emb.group(3).strip()
                        else:
                            emb2 = re.search(
                                r'(.+?)\s+Đáp án\s+([A-D])\s+Lý giải:\s*(.+)',
                                opt_raw, re.DOTALL
                            )
                            if emb2:
                                opts[letter] = emb2.group(1).strip()
                                explanation = emb2.group(3).strip()
                            else:
                                opts[letter] = opt_raw.strip()
                        if is_green:
                            correct_from_color = letter
                        i += 1
            questions.append({
                'num': q_num,
                'text': q_text,
                'opts': opts,
                'correct': correct_from_color,
                'explanation': explanation
            })
        else:
            i += 1
    return questions


questions = parse_questions(items)
n_correct = sum(1 for q in questions if q['correct'])
n_expl = sum(1 for q in questions if q['explanation'])
print(f'Parsed {len(questions)} questions', file=sys.stderr)
print(f'With color answer: {n_correct}', file=sys.stderr)
print(f'With explanation: {n_expl}', file=sys.stderr)

# Verify: show first 5 and last 5
for q in questions[:5]:
    print(f'  Cau {q["num"]}: correct={q["correct"]} expl={bool(q["explanation"])}', file=sys.stderr)
for q in questions[-3:]:
    print(f'  Cau {q["num"]}: correct={q["correct"]} expl={bool(q["explanation"])}', file=sys.stderr)

# ── Build JSON payload ────────────────────────────────────────────────────────
q_data = []
for q in questions:
    q_data.append({
        'num': q['num'],
        'text': html_module.escape(q['text'] or ''),
        'opts': {k: html_module.escape(v or '') for k, v in q['opts'].items()},
        'correct': q['correct'] or '',
        'explanation': html_module.escape(q['explanation'] or '')
    })
q_json = json.dumps(q_data, ensure_ascii=False, separators=(',', ':'))

# ── HTML template ─────────────────────────────────────────────────────────────
TEMPLATE = r"""---
layout: post
title: "Trắc nghiệm ôn tập nghiệp vụ chuyên môn về đấu thầu (390 câu)"
date: 2026-06-22 18:00:00 +0700
permalink: "/posts/on-tap-nghiep-vu-dau-thau/"
categories: [on-tap, luat-dau-thau]
tags: [trac-nghiem, dau-thau, quiz, chung-chi-dau-thau]
description: "390 câu trắc nghiệm ôn tập nghiệp vụ chuyên môn về đấu thầu theo Luật Đấu thầu 2023, Nghị định 214/2025/NĐ-CP và Thông tư 79/2025/TT-BTC"
---

<style>
:root {
  --q-bg:#fff; --q-border:#e5e7eb; --q-shadow:rgba(0,0,0,.06);
  --opt-bg:#f9fafb; --opt-hover:#eff6ff;
  --correct-bg:#dcfce7; --correct-border:#28a745; --correct-text:#166534;
  --wrong-bg:#fee2e2; --wrong-border:#dc3545; --wrong-text:#991b1b;
  --expl-bg:#eff6ff; --expl-border:#3b82f6;
  --badge-bg:#dbeafe; --badge-text:#1e40af; --num-color:#6366f1;
  --sel-bg:#eef2ff; --sel-border:#6366f1;
}
.quiz-wrapper { font-family:'Segoe UI',system-ui,sans-serif; max-width:860px; margin:0 auto; padding:8px; }

/* ── Mode bar ── */
.mode-bar {
  display:flex; gap:6px; flex-wrap:wrap; align-items:center;
  margin-bottom:12px; padding:10px 16px;
  background:#fffbeb; border:1px solid #fde68a; border-radius:8px; font-size:.88rem;
}
.mode-bar strong { color:#92400e; margin-right:4px; }
.mode-btn {
  padding:5px 14px; border:1.5px solid #d1d5db; border-radius:20px;
  background:#fff; cursor:pointer; font-size:.85rem; font-weight:500;
  transition:all .15s; color:#374151;
}
.mode-btn:hover { border-color:#6366f1; color:#4f46e5; }
.mode-btn.active { background:#4f46e5; color:#fff; border-color:#4f46e5; }
.mode-desc { font-size:.78rem; color:#78716c; }

/* ── Toolbar ── */
.quiz-toolbar {
  display:flex; flex-wrap:wrap; gap:10px; align-items:center;
  margin-bottom:12px; padding:10px 14px;
  background:#f8faff; border:1px solid #e0e7ff; border-radius:10px;
}
.quiz-toolbar select, .quiz-toolbar input {
  padding:5px 9px; border:1px solid #d1d5db; border-radius:6px; font-size:.88rem;
}
.quiz-toolbar input[type=number] { width:68px; }
.btn { padding:6px 13px; border:none; border-radius:6px; cursor:pointer;
  font-size:.86rem; font-weight:500; transition:opacity .15s; }
.btn:hover { opacity:.85; }
.btn-primary { background:#4f46e5; color:#fff; }
.btn-secondary { background:#6b7280; color:#fff; }
.btn-success { background:#28a745; color:#fff; font-size:.95rem; padding:8px 22px; }
.btn-sm { padding:4px 10px; font-size:.82rem; }

/* ── Score bar ── */
.score-bar {
  display:flex; gap:12px; align-items:center; margin-bottom:12px;
  padding:9px 14px; background:#f0fdf4; border:1px solid #bbf7d0;
  border-radius:8px; font-size:.88rem; flex-wrap:wrap;
}
.score-bar span { font-weight:700; }
.sc-answered { color:#1e40af; }
.sc-correct  { color:#166534; }
.sc-wrong    { color:#991b1b; }

/* ── Pagination ── */
.paging {
  display:flex; flex-wrap:wrap; gap:5px; align-items:center;
  justify-content:center; margin:12px 0;
}
.paging button {
  min-width:32px; padding:4px 8px; border:1px solid #d1d5db;
  border-radius:6px; background:#fff; cursor:pointer; font-size:.82rem; transition:background .12s;
}
.paging button:hover { background:#eff6ff; }
.paging button.active { background:#4f46e5; color:#fff; border-color:#4f46e5; font-weight:700; }
.paging .page-info { font-size:.82rem; color:#6b7280; }

/* ── Question card ── */
.quiz-question {
  background:var(--q-bg); border:1px solid var(--q-border); border-radius:10px;
  padding:16px 18px; margin-bottom:16px; box-shadow:0 2px 5px var(--q-shadow);
}
.q-header { display:flex; align-items:center; gap:10px; margin-bottom:8px; }
.q-num { font-weight:700; font-size:1rem; color:var(--num-color); }
.q-badge {
  font-size:.68rem; padding:2px 7px; border-radius:20px;
  background:var(--badge-bg); color:var(--badge-text); font-weight:600;
}
.q-text { font-size:.94rem; color:#1e293b; line-height:1.55; margin-bottom:12px; font-weight:500; }

/* ── Options ── */
.quiz-options { list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:6px; }
.quiz-option {
  display:flex; align-items:flex-start; gap:9px;
  background:var(--opt-bg); border:2px solid var(--q-border); border-radius:7px;
  padding:9px 13px; cursor:pointer;
  transition:background .15s, border-color .15s; line-height:1.5;
}
.quiz-option:hover:not(.disabled) { background:var(--opt-hover); border-color:#a5b4fc; }
.opt-label { font-weight:700; color:#4f46e5; min-width:18px; font-size:.92rem; flex-shrink:0; }
.opt-text { font-size:.9rem; color:#374151; }

/* ── Selected (show-after pending state) ── */
.quiz-option.selected {
  background:var(--sel-bg)!important; border-color:var(--sel-border)!important;
}
.quiz-option.selected .opt-label { color:#4f46e5; }

/* ── Correct / Wrong revealed states ── */
.quiz-option.correct {
  background:var(--correct-bg)!important; border-color:var(--correct-border)!important;
}
.quiz-option.correct .opt-label, .quiz-option.correct .opt-text { color:var(--correct-text)!important; }
.quiz-option.incorrect {
  background:var(--wrong-bg)!important; border-color:var(--wrong-border)!important;
}
.quiz-option.incorrect .opt-label, .quiz-option.incorrect .opt-text { color:var(--wrong-text)!important; }
.quiz-option.disabled { pointer-events:none; cursor:default; }

/* ── Feedback message ── */
.feedback-msg {
  display:none; margin-top:10px; padding:10px 14px; border-radius:7px;
  font-size:.9rem; font-weight:600; line-height:1.5;
}
.feedback-msg.ok  { background:#dcfce7; border:1.5px solid #28a745; color:#166534; }
.feedback-msg.err { background:#fee2e2; border:1.5px solid #dc3545; color:#991b1b; }

/* ── Explanation ── */
.quiz-explanation {
  display:none; margin-top:8px; padding:11px 14px;
  background:var(--expl-bg); border-left:4px solid var(--expl-border);
  border-radius:6px; font-size:.87rem; line-height:1.6; color:#1e3a5f;
}
.quiz-explanation strong { color:#1d4ed8; }

/* ── Page-level "Xem kết quả" bar (show-after mode) ── */
.result-bar {
  display:none; margin:14px 0; padding:12px 16px;
  background:#fffbeb; border:1.5px solid #f59e0b; border-radius:10px;
  text-align:center;
}
.result-bar p { margin:0 0 10px; font-size:.9rem; color:#92400e; }

@media (max-width:600px) {
  .quiz-question { padding:12px; }
  .quiz-toolbar, .mode-bar { flex-direction:column; align-items:stretch; }
}
</style>

<div class="quiz-wrapper">

  <!-- Mode selector -->
  <div class="mode-bar">
    <strong>Chế độ:</strong>
    <button class="mode-btn active" id="modePractice" onclick="setMode('practice')">Luyện tập</button>
    <button class="mode-btn" id="modeShowEach" onclick="setMode('show-each')">Xem đáp án từng câu</button>
    <button class="mode-btn" id="modeShowAfter" onclick="setMode('show-after')">Xem đáp án sau</button>
    <span class="mode-desc" id="modeDesc">Click chọn đáp án → xem kết quả ngay</span>
  </div>

  <!-- Toolbar -->
  <div class="quiz-toolbar">
    <label>Câu/trang:
      <select id="perPageSel">
        <option value="10">10</option>
        <option value="20" selected>20</option>
        <option value="50">50</option>
        <option value="390">Tất cả</option>
      </select>
    </label>
    <label>Đến câu: <input type="number" id="jumpInput" min="1" max="390" placeholder="1-390"></label>
    <button class="btn btn-primary btn-sm" onclick="quizJump()">Đến</button>
    <span style="flex:1"></span>
    <button class="btn btn-secondary btn-sm" onclick="quizReset()">Làm lại</button>
  </div>

  <!-- Score bar -->
  <div class="score-bar" id="scoreBar">
    Đã trả lời: <span class="sc-answered" id="scAnswered">0</span>/<span id="scTotal">390</span>
    &nbsp;|&nbsp; Đúng: <span class="sc-correct" id="scCorrect">0</span>
    &nbsp;|&nbsp; Sai: <span class="sc-wrong" id="scWrong">0</span>
  </div>

  <div class="paging" id="pagingTop"></div>

  <!-- "Xem kết quả" bar — only visible in show-after mode, above questions -->
  <div class="result-bar" id="resultBarTop">
    <p>Chọn xong tất cả câu trả lời, nhấn nút bên dưới để xem kết quả.</p>
    <button class="btn btn-success" onclick="revealPageResults()">Xem kết quả trang này</button>
  </div>

  <div id="qContainer"></div>

  <!-- "Xem kết quả" bar — bottom -->
  <div class="result-bar" id="resultBarBottom">
    <p>Chọn xong tất cả câu trả lời, nhấn nút bên dưới để xem kết quả.</p>
    <button class="btn btn-success" onclick="revealPageResults()">Xem kết quả trang này</button>
  </div>

  <div class="paging" id="pagingBottom"></div>
</div>

<script>
(function() {
  var QUESTIONS = __Q_JSON__;

  var currentPage = 1, perPage = 20;
  var currentMode = 'practice'; // 'practice' | 'show-each' | 'show-after'
  // answered[qnum] = { choice: 'A'|'B'|'C'|'D', result: 'correct'|'wrong'|'pending' }
  var answered = {};
  var visibleQs = QUESTIONS;

  var modeDescs = {
    'practice':   'Click chọn đáp án → xem kết quả ngay',
    'show-each':  'Click chọn → hiện ngay đúng/sai từng câu + thông báo kết quả',
    'show-after': 'Chọn hết → nhấn "Xem kết quả trang này" để xem toàn bộ'
  };

  /* ── Mode ── */
  window.setMode = function(mode) {
    currentMode = mode;
    document.getElementById('modePractice').classList.toggle('active', mode==='practice');
    document.getElementById('modeShowEach').classList.toggle('active', mode==='show-each');
    document.getElementById('modeShowAfter').classList.toggle('active', mode==='show-after');
    document.getElementById('modeDesc').textContent = modeDescs[mode];
    answered = {};
    currentPage = 1;
    render();
  };

  /* ── Pagination ── */
  function totalPages() { return Math.ceil(visibleQs.length / perPage); }
  function pageQs() { var s=(currentPage-1)*perPage; return visibleQs.slice(s,s+perPage); }

  function renderPaging(id) {
    var tp = totalPages();
    var c = document.getElementById(id);
    c.innerHTML = '';
    if (tp <= 1) return;
    function mkBtn(label, page, active) {
      var b = document.createElement('button');
      b.textContent = label;
      if (active) b.classList.add('active');
      b.onclick = function() { currentPage=page; render(); window.scrollTo(0,0); };
      return b;
    }
    c.appendChild(mkBtn('‹', Math.max(1,currentPage-1), false));
    var start=Math.max(1,currentPage-3), end=Math.min(tp,start+6);
    start=Math.max(1,end-6);
    if (start>1) {
      c.appendChild(mkBtn('1',1,false));
      if (start>2) { var sp=document.createElement('span'); sp.className='page-info'; sp.textContent='…'; c.appendChild(sp); }
    }
    for (var p=start; p<=end; p++) c.appendChild(mkBtn(p,p,p===currentPage));
    if (end<tp) {
      if (end<tp-1) { var sp2=document.createElement('span'); sp2.className='page-info'; sp2.textContent='…'; c.appendChild(sp2); }
      c.appendChild(mkBtn(tp,tp,false));
    }
    c.appendChild(mkBtn('›',Math.min(tp,currentPage+1),false));
    var info=document.createElement('span'); info.className='page-info';
    info.textContent='Trang '+currentPage+'/'+tp; c.appendChild(info);
  }

  /* ── Render ── */
  function render() {
    var qs = pageQs();
    var container = document.getElementById('qContainer');
    container.innerHTML = '';

    // Show/hide result bars
    var showBars = (currentMode === 'show-after');
    document.getElementById('resultBarTop').style.display    = showBars ? 'block' : 'none';
    document.getElementById('resultBarBottom').style.display = showBars ? 'block' : 'none';

    qs.forEach(function(q) {
      var div = document.createElement('div');
      div.className = 'quiz-question';
      div.id = 'q'+q.num;

      var hasExpl = !!(q.correct && q.explanation);
      var badge = hasExpl ? '<span class="q-badge">Có lý giải</span>' : '';

      /* Options HTML */
      var optsHtml = '<ul class="quiz-options">';
      ['A','B','C','D'].forEach(function(letter) {
        optsHtml += '<li class="quiz-option" data-choice="'+letter+'"'+
          (q.correct===letter ? ' data-correct="true"' : '')+'>'+
          '<span class="opt-label">'+letter+'</span>'+
          '<span class="opt-text">'+(q.opts[letter]||'')+'</span></li>';
      });
      optsHtml += '</ul>';

      /* Feedback message placeholder */
      var feedHtml = '<div class="feedback-msg" id="feed'+q.num+'"></div>';

      /* Explanation block */
      var explHtml = '';
      if (hasExpl) {
        explHtml = '<div class="quiz-explanation" id="expl'+q.num+'">'+
          '<em>Lý giải:</em> '+q.explanation+'</div>';
      }

      div.innerHTML =
        '<div class="q-header"><span class="q-num">Câu '+q.num+'</span>'+badge+'</div>'+
        '<div class="q-text">'+q.text+'</div>'+
        optsHtml + feedHtml + explHtml;

      /* Restore previous state if any */
      var prev = answered[q.num];
      if (prev) {
        applyResult(div, q, prev.choice, prev.result);
      } else {
        attachOptionEvents(div, q);
      }

      container.appendChild(div);
    });

    renderPaging('pagingTop');
    renderPaging('pagingBottom');
    updateScore();
  }

  /* ── Attach click events to options ── */
  function attachOptionEvents(div, q) {
    div.querySelectorAll('.quiz-option').forEach(function(opt) {
      opt.addEventListener('click', function() {
        if (currentMode === 'practice' || currentMode === 'show-each') {
          handleImmediateClick(this, div, q);
        } else { // show-after
          handlePendingClick(this, div, q);
        }
      });
    });
  }

  /* ── Immediate mode (practice & show-each): click → reveal at once ── */
  function handleImmediateClick(opt, div, q) {
    var choice = opt.getAttribute('data-choice');
    var isCorrect = (choice === q.correct);
    var result = isCorrect ? 'correct' : 'wrong';
    answered[q.num] = { choice: choice, result: result };
    applyResult(div, q, choice, result);
    updateScore();
  }

  /* ── Pending mode (show-after): click → highlight selected only ── */
  function handlePendingClick(opt, div, q) {
    var choice = opt.getAttribute('data-choice');
    // Update selection highlight
    div.querySelectorAll('.quiz-option').forEach(function(o) {
      o.classList.remove('selected');
    });
    opt.classList.add('selected');
    answered[q.num] = { choice: choice, result: 'pending' };
    updateScore();
  }

  /* ── Apply revealed result to a question div ── */
  function applyResult(div, q, choice, result) {
    var isCorrect = (result === 'correct');

    // Lock all options
    div.querySelectorAll('.quiz-option').forEach(function(o) {
      o.classList.remove('selected');
      o.classList.add('disabled');
    });

    if (result === 'pending') {
      // Just show selection, no correct/wrong styling
      var selOpt = div.querySelector('[data-choice="'+choice+'"]');
      if (selOpt) selOpt.classList.add('selected');
      return;
    }

    // Mark correct option green
    div.querySelectorAll('[data-correct="true"]').forEach(function(o) {
      o.classList.add('correct');
    });
    // Mark chosen option red if wrong
    if (!isCorrect) {
      var wrongOpt = div.querySelector('[data-choice="'+choice+'"]');
      if (wrongOpt) wrongOpt.classList.add('incorrect');
    }

    // Feedback message
    var feed = div.querySelector('.feedback-msg');
    if (feed && q.correct) {
      if (isCorrect) {
        feed.className = 'feedback-msg ok';
        feed.innerHTML = '✓ Bạn đã trả lời <strong>đúng</strong>!';
      } else {
        var correctText = q.opts[q.correct] || q.correct;
        feed.className = 'feedback-msg err';
        feed.innerHTML = '✗ Bạn đã trả lời <strong>sai</strong>. ' +
          'Câu trả lời đúng là: <strong>' + q.correct + '</strong> — ' + correctText;
      }
      feed.style.display = 'block';
    }

    // Show explanation
    var expl = div.querySelector('.quiz-explanation');
    if (expl) expl.style.display = 'block';
  }

  /* ── Reveal ALL results for current page (show-after mode) ── */
  window.revealPageResults = function() {
    var qs = pageQs();
    qs.forEach(function(q) {
      var div = document.getElementById('q'+q.num);
      if (!div) return;
      var prev = answered[q.num];
      var choice = prev ? prev.choice : null;
      var result;
      if (choice) {
        result = (choice === q.correct) ? 'correct' : 'wrong';
      } else {
        result = 'wrong'; // unanswered = wrong
        choice = '—';
      }
      answered[q.num] = { choice: choice, result: result };

      // Remove existing click handlers by cloning
      var newDiv = div.cloneNode(true);
      div.parentNode.replaceChild(newDiv, div);
      applyResult(newDiv, q, choice, result);
    });

    // Hide the result bars after reveal
    document.getElementById('resultBarTop').style.display    = 'none';
    document.getElementById('resultBarBottom').style.display = 'none';
    updateScore();
  };

  /* ── Restore answered after pagination ── */
  // (handled inside render via 'prev' check)

  /* ── Score ── */
  function updateScore() {
    var vals = Object.values(answered);
    var answeredCount = vals.filter(function(v){ return v.result !== 'pending'; }).length;
    var correctCount  = vals.filter(function(v){ return v.result === 'correct'; }).length;
    var wrongCount    = vals.filter(function(v){ return v.result === 'wrong'; }).length;
    document.getElementById('scAnswered').textContent = answeredCount;
    document.getElementById('scCorrect').textContent  = correctCount;
    document.getElementById('scWrong').textContent    = wrongCount;
  }

  /* ── Jump & Reset ── */
  window.quizJump = function() {
    var num = parseInt(document.getElementById('jumpInput').value);
    if (!num) return;
    var idx = visibleQs.findIndex(function(q){ return q.num >= num; });
    if (idx < 0) return;
    currentPage = Math.floor(idx/perPage)+1;
    render();
    setTimeout(function() {
      var el = document.getElementById('q'+num);
      if (el) el.scrollIntoView({behavior:'smooth',block:'center'});
    }, 100);
  };

  window.quizReset = function() {
    if (!confirm('Đặt lại toàn bộ bài làm?')) return;
    answered = {};
    render();
  };

  document.getElementById('perPageSel').addEventListener('change', function(){
    perPage=parseInt(this.value); currentPage=1; render();
  });

  render();
})();
</script>
"""

html_out = TEMPLATE.replace('__Q_JSON__', q_json)

out_path = os.path.normpath(os.path.join(raw_dir, '..', '_posts', '2026-06-22-on-tap-nghiep-vu-dau-thau.html'))
with open(out_path, 'w', encoding='utf-8') as f:
    f.write(html_out)

size_kb = os.path.getsize(out_path) / 1024
print(f'Generated: {out_path}')
print(f'File size: {size_kb:.1f} KB')
print(f'Questions: {len(questions)} | Correct answers: {n_correct}/390 | Explanations: {n_expl}/390')
