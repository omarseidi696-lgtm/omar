(() => {
  const form = document.getElementById('composer');
  const input = document.getElementById('input');
  const sendButton = document.getElementById('send');
  const messagesEl = document.getElementById('messages');
  const errorEl = document.getElementById('error');

  const history = [];

  function appendMessage(role, content) {
    const el = document.createElement('div');
    el.className = `message message--${role}`;
    el.textContent = content;
    messagesEl.appendChild(el);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return el;
  }

  function showError(text) {
    errorEl.textContent = text;
    errorEl.hidden = false;
  }

  function clearError() {
    errorEl.hidden = true;
    errorEl.textContent = '';
  }

  function setBusy(busy) {
    input.disabled = busy;
    sendButton.disabled = busy;
  }

  appendMessage('assistant', "Hi! I'm the support assistant. How can I help you today?");

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    clearError();

    const message = input.value.trim();
    if (!message) {
      showError('Type a message before sending.');
      return;
    }

    appendMessage('user', message);
    input.value = '';
    setBusy(true);

    const pendingEl = appendMessage('assistant message--pending', 'Thinking...');
    pendingEl.classList.add('message--pending');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, history }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong.');
      }

      pendingEl.textContent = data.reply;
      pendingEl.classList.remove('message--pending');

      history.push({ role: 'user', content: message });
      history.push({ role: 'assistant', content: data.reply });
    } catch (err) {
      pendingEl.remove();
      showError(err.message || 'The support assistant is unavailable right now.');
    } finally {
      setBusy(false);
      input.focus();
    }
  });
})();
