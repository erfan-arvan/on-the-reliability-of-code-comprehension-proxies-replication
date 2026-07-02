//common

function getLocalStorage(name) {
  const value = localStorage.getItem(name);
  return value ? decodeURIComponent(value) : null;
}

function setLocalStorage(name, value, days = 30) {
  localStorage.setItem(name, encodeURIComponent(value));
}



//save to server
function saveToServerQuick() {
  const name = sessionStorage.getItem('participantName') || localStorage.getItem('participantName') || 'Anonymous';
  const username = localStorage.getItem('username') || 'anonymous';

  const phase1 = {};
  for (let i = 1; i <= 8; i++) {
    const summary = sessionStorage.getItem(`summary${i}`) || localStorage.getItem(`summary${i}`) || '';
    const comp = sessionStorage.getItem(`compSummary${i}`) || localStorage.getItem(`compSummary${i}`) || '';
    phase1[`snippet${i}`] = { summary, comprehensibility: comp };
  }

  let phase2 = {}, phase3 = {};
  try {
    phase2 = JSON.parse(sessionStorage.getItem('phase3_ranking') || localStorage.getItem('phase3_ranking') || '{}');
    phase3 = JSON.parse(sessionStorage.getItem('phase3_reasoning') || localStorage.getItem('phase3_reasoning') || '{}');
  } catch { }

  const flags = {
    phase1Complete: sessionStorage.getItem('phase1Complete') || localStorage.getItem('phase1Complete') || 'false',
    phase2Complete: sessionStorage.getItem('phase2Complete') || localStorage.getItem('phase2Complete') || 'false',
    phase3Complete: sessionStorage.getItem('phase3Complete') || localStorage.getItem('phase3Complete') || 'false',
    codeTheme: localStorage.getItem('codeTheme') || 'light',
    submitted: '0',
  };

  const payload = {
    username,
    participantName: name,
    phase1,
    phase2,
    phase3,
    ...flags
  };

  const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
  navigator.sendBeacon('/submit_final', blob);
}

window.addEventListener('beforeunload', function () {
  saveToServerQuick();
});


async function saveToServer() {
  const name = sessionStorage.getItem('participantName') || getLocalStorage('participantName') || 'Anonymous';
  const username = getLocalStorage('username') || 'anonymous';

  // Phase 1 data
  const phase1 = {};
  for (let i = 1; i <= 8; i++) {
    const summary = sessionStorage.getItem(`summary${i}`) || getLocalStorage(`summary${i}`) || '';
    const comp = sessionStorage.getItem(`compSummary${i}`) || getLocalStorage(`compSummary${i}`) || '';
    phase1[`snippet${i}`] = { summary, comprehensibility: comp };
  }

  // Phase 2 & 3 data
  let phase2 = {}, phase3 = {};
  try {
    phase2 = JSON.parse(sessionStorage.getItem('phase3_ranking') || getLocalStorage('phase3_ranking') || '{}');
    phase3 = JSON.parse(sessionStorage.getItem('phase3_reasoning') || getLocalStorage('phase3_reasoning') || '{}');
  } catch (e) {
    console.warn("Error parsing phase2 or phase3 data", e);
  }

  // Completion flags and theme
  const flags = {
    phase1Complete: sessionStorage.getItem('phase1Complete') || getLocalStorage('phase1Complete') || 'false',
    phase2Complete: sessionStorage.getItem('phase2Complete') || getLocalStorage('phase2Complete') || 'false',
    phase3Complete: sessionStorage.getItem('phase3Complete') || getLocalStorage('phase3Complete') || 'false',
    codeTheme: localStorage.getItem('codeTheme') || 'light',
    submitted: '0',
  };

  const payload = {
    username,
    participantName: name,
    phase1,
    phase2,
    phase3,
    ...flags
  };

  const payloadStr = JSON.stringify(payload);

  // Hash function (returns hex string)
  async function hashString(str) {
    const buffer = new TextEncoder().encode(str);
    const digest = await crypto.subtle.digest('SHA-256', buffer);
    return [...new Uint8Array(digest)].map(b => b.toString(16).padStart(2, '0')).join('');
  }

  const currentHash = await hashString(payloadStr);
  const previousHash = sessionStorage.getItem('lastPayloadHash');

  if (currentHash === previousHash) {
    console.log('Payload unchanged, not saving to server.');
    return;
  }

  sessionStorage.setItem('lastPayloadHash', currentHash);

  const blob = new Blob([payloadStr], { type: 'application/json' });
  navigator.sendBeacon('/submit_final', blob);

  console.log('Payload saved to server:', payload);
}


//-----------------------------------------------


// Clear storage and redirect to login
function logout() {
  saveToServer();
  sessionStorage.clear();
  localStorage.clear();

  // Clear all cookies
  document.cookie.split(";").forEach((cookie) => {
    const name = cookie.split("=")[0].trim();
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  });

  window.location.href = "index.html";
}


function isLoggedIn() {
  const name =
    sessionStorage.getItem("participantName") ||
    localStorage.getItem("participantName");
  const order =
    sessionStorage.getItem("snippetOrder") ||
    localStorage.getItem("snippetOrder");
  return name && order;
}

function checkLogin() {
  if (!isLoggedIn()) {
    alert(
      "You must be logged in to access this page. Redirecting to the homepage."
    );
    window.location.href = "/";
  }
}

window.addEventListener("load", checkLogin);







function openJavadocModal(url) {
  const iframe = document.getElementById("javadocFrame");
  iframe.src = url;
  document.getElementById("javadocModal").style.display = "block";
}

function closeJavadocModal() { 
  document.getElementById("javadocModal").style.display = "none";
  document.getElementById("javadocFrame").src = "";
}

function javadocFrameReload() {
  const iframe = document.getElementById("javadocFrame");
  iframe.src = iframe.src;
}


