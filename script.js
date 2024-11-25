// Importando a biblioteca Node-forge para RSA
const forge = window.forge;

let publicKey, privateKey;

document.getElementById('generateKeys').addEventListener('click', () => {
  // Gerar pares de chaves RSA
  const keypair = forge.pki.rsa.generateKeyPair({ bits: 2048 });
  publicKey = keypair.publicKey;
  privateKey = keypair.privateKey;

  document.getElementById('publicKeyDisplay').textContent = `Chave Pública: ${forge.pki.publicKeyToPem(publicKey)}`;
  document.getElementById('privateKeyDisplay').textContent = `Chave Privada: ${forge.pki.privateKeyToPem(privateKey)}`;
});

document.getElementById('encrypt').addEventListener('click', () => {
  const message = document.getElementById('message').value;

  if (!publicKey) {
    alert('Por favor, gere as chaves primeiro.');
    return;
  }

  // Cifrar a mensagem
  const encrypted = publicKey.encrypt(message, 'RSA-OAEP');
  document.getElementById('encryptedMessage').textContent = forge.util.encode64(encrypted);
});

document.getElementById('decrypt').addEventListener('click', () => {
  const encryptedMessage = document.getElementById('encryptedMessage').textContent;

  if (!privateKey) {
    alert('Por favor, gere as chaves primeiro.');
    return;
  }

  // Decifrar a mensagem
  const decoded = forge.util.decode64(encryptedMessage);
  const decrypted = privateKey.decrypt(decoded, 'RSA-OAEP');
  document.getElementById('decryptedMessage').textContent = decrypted;
});
