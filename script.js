function copyOutput() {
  const output = document.getElementById('output');
  const text = output.querySelector('p:not(.error)')?.textContent || '';
  if (text) {
    navigator.clipboard.writeText(text).then(() => {
      const copyButton = document.getElementById('copyButton');
      copyButton.textContent = 'Copied!';
      setTimeout(() => {
        copyButton.textContent = 'Copy';
      }, 2000);
    }).catch(() => {
      output.innerHTML = '<p class="error">Error copying the text.</p>';
    });
  }
}

function encryptMessage() {
  const message = document.getElementById('message').value;
  const password = document.getElementById('password').value;
  const output = document.getElementById('output');

  if (!message || !password) {
    output.innerHTML = '<p class="error">Please fill in the message and password.</p>';
    return;
  }

  try {
    const encrypted = CryptoJS.AES.encrypt(message, password).toString();
    output.innerHTML = `<p>${encrypted}</p>`;
  } catch {
    output.innerHTML = '<p class="error">Error encrypting the message.</p>';
  }
}

function decryptMessage() {
  const encryptedMessage = document.getElementById('message').value;
  const password = document.getElementById('password').value;
  const output = document.getElementById('output');

  if (!encryptedMessage || !password) {
    output.innerHTML = '<p class="error">Please fill in the message and password.</p>';
    return;
  }

  try {
    const decrypted = CryptoJS.AES.decrypt(encryptedMessage, password);
    const decryptedMessage = decrypted.toString(CryptoJS.enc.Utf8);
    if (!decryptedMessage) {
      output.innerHTML = '<p class="error">Incorrect password or invalid message.</p>';
    } else {
      output.innerHTML = `<p>${decryptedMessage}</p>`;
    }
  } catch {
    output.innerHTML = '<p class="error">Error decrypting the message.</p>';
  }
}