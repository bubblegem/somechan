(() => {
  const PENDING_KEY = "rz_pending_quote_v2";

  function isThreadPage() {
    return /\/res\/\d+\.html$/i.test(location.pathname);
  }

  function findTextarea() {
    return document.querySelector('textarea[name="body"], textarea[name="comment"], textarea');
  }

  function scrollToReplyBox() {
    const ta = findTextarea();
    if (!ta) return;
    ta.scrollIntoView({ behavior: "smooth", block: "center" });
    ta.focus();
  }

  function getPostText(postEl) {
    const msg = postEl.querySelector(".postMessage,.body,.message,blockquote");
    if (!msg) return "";

    return (msg.innerText || msg.textContent || "")
      .replace(/\r\n/g, "\n")
      .replace(/\r/g, "\n")
      .trimEnd();
  }

  function prefixEveryLine(text, prefix) {
    return text.split("\n").map(line => prefix + line).join("\n");
  }

  function insertAtCursor(ta, text) {
    const start = ta.selectionStart ?? ta.value.length;
    const end = ta.selectionEnd ?? ta.value.length;
    const before = ta.value.slice(0, start);
    const after = ta.value.slice(end);

    const prefix = (before.length && !before.endsWith("\n")) ? "\n" : "";
    const insert = prefix + text + "\n";

    ta.value = before + insert + after;

    const pos = (before + insert).length;
    ta.selectionStart = ta.selectionEnd = pos;
    ta.focus();
  }

  function findThreadUrlFromPost(postEl) {
    const intro = postEl.querySelector("p.intro,.intro") || postEl;

    const replyLink = Array.from(intro.querySelectorAll("a"))
      .find(a => /^\[reply\]$/i.test((a.textContent || "").trim()));

    if (replyLink && replyLink.href) {
      return replyLink.href.split("#")[0];
    }

    const resLink = Array.from(intro.querySelectorAll("a"))
      .map(a => a.href || "")
      .find(href => /\/res\/\d+\.html/i.test(href));

    if (resLink) return resLink.split("#")[0];

    return null;
  }

  function findAnchorForPlacement(postEl) {
    const intro = postEl.querySelector("p.intro,.intro");
    if (!intro) return null;

    const reply = Array.from(intro.querySelectorAll("a"))
      .find(a => /^\[reply\]$/i.test((a.textContent || "").trim()));

    if (reply) return reply;

    const cite = intro.querySelector('a[onclick*="citeReply"]');
    if (cite) return cite;

    const links = intro.querySelectorAll("a");
    return links.length ? links[links.length - 1] : null;
  }

  function quotePost(postEl, quotePrefix) {
    const raw = getPostText(postEl);
    if (!raw) return;

    const quoted = prefixEveryLine(raw, quotePrefix);

    if (isThreadPage()) {
      const ta = findTextarea();
      if (!ta) return;

      insertAtCursor(ta, quoted);
      scrollToReplyBox();
      return;
    }

    try {
      sessionStorage.setItem(PENDING_KEY, quoted);
    } catch {}

    const threadUrl = findThreadUrlFromPost(postEl);

    if (threadUrl) {
      location.href = threadUrl;
      return;
    }

    const ta = findTextarea();
    if (!ta) return;

    insertAtCursor(ta, quoted);
    scrollToReplyBox();
  }

  function createQuoteButton(postEl, label, quotePrefix, title) {
    const btn = document.createElement("a");
    btn.href = "#";
    btn.className = `rz-quote-btn rz-quote-${quotePrefix === ">" ? "right" : "left"}`;
    btn.textContent = `[${label}]`;
    btn.title = title;

    btn.addEventListener("click", (event) => {
      event.preventDefault();
      quotePost(postEl, quotePrefix);
    });

    return btn;
  }

  function addQuoteButtons(postEl) {
    const intro = postEl.querySelector("p.intro,.intro");
    if (!intro) return;

    if (intro.querySelector(".rz-quote-controls")) return;

    const controls = document.createElement("span");
    controls.className = "rz-quote-controls";
    controls.style.marginLeft = "6px";
    controls.style.whiteSpace = "nowrap";

    const greentextBtn = createQuoteButton(
      postEl,
      ">",
      ">",
      "Quote every line with >"
    );

    const lessThanBtn = createQuoteButton(
      postEl,
      "<",
      "<",
      "Quote every line with <"
    );

    controls.appendChild(greentextBtn);
    controls.appendChild(document.createTextNode(" "));
    controls.appendChild(lessThanBtn);

    const anchor = findAnchorForPlacement(postEl);

    if (anchor) {
      anchor.insertAdjacentElement("afterend", controls);
    } else {
      intro.appendChild(controls);
    }
  }

  function run() {
    document
      .querySelectorAll('div[id^="reply_"], div[id^="op_"], .post, .reply')
      .forEach(addQuoteButtons);
  }

  function consumePending() {
    if (!isThreadPage()) return;

    let pending = null;

    try {
      pending = sessionStorage.getItem(PENDING_KEY);
    } catch {}

    if (!pending) return;

    const ta = findTextarea();
    if (!ta) return;

    insertAtCursor(ta, pending);
    scrollToReplyBox();

    try {
      sessionStorage.removeItem(PENDING_KEY);
    } catch {}
  }

  document.addEventListener("DOMContentLoaded", () => {
    run();
    consumePending();

    setTimeout(() => {
      run();
      consumePending();
    }, 300);

    setTimeout(() => {
      run();
      consumePending();
    }, 1200);
  });
})();
