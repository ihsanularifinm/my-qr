const html5QrCode = new Html5Qrcode("reader");
const toggleBtn = document.getElementById('toggle-camera-btn');
const toggleBtnText = document.getElementById('toggle-btn-text');
const uploadBtn = document.getElementById('upload-btn');
const fileInput = document.getElementById('qr-input-file');
const statusMsg = document.getElementById('status-msg');
const readerEl = document.getElementById('reader');
const placeholderIcon = document.getElementById('placeholder-icon');

let isCameraRunning = false;

// PARSE RETURN URL
const urlParams = new URLSearchParams(window.location.search);
let returnUrl = urlParams.get('return');
let validReturnUrl = false;
try {
    if (returnUrl) {
        new URL(returnUrl); 
        validReturnUrl = true;
    }
} catch (e) {
    console.warn("Invalid Return URL");
}

// BACK BUTTON LOGIC
const backBtn = document.getElementById('back-btn');
if (backBtn) {
    backBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (validReturnUrl) {
            window.location.href = returnUrl;
        } else {
            window.location.href = "../";
        }
    });
}

// 1. TOGGLE CAMERA
toggleBtn.addEventListener('click', () => {
    if (!isCameraRunning) {
        startCamera();
    } else {
        stopCamera();
    }
});

// 2. FILE UPLOAD
uploadBtn.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', e => {
    if (e.target.files.length == 0) return;
    
    const imageFile = e.target.files[0];
    
    // UI Feedback
    statusMsg.innerText = "Scanning file...";
    placeholderIcon.classList.add('animate-pulse');

    html5QrCode.scanFileV2(imageFile, true)
    .then(decodedResult => {
        // Success
        onScanSuccess(decodedResult.decodedText, decodedResult);
    })
    .catch(err => {
        // Error
        console.error("Error scanning file", err);
        statusMsg.innerText = "No QR Code found in image.";
        statusMsg.classList.add('text-red-400');
        setTimeout(() => {
            statusMsg.innerText = isCameraRunning ? "Camera Active" : "Camera Inactive";
            statusMsg.classList.remove('text-red-400');
            placeholderIcon.classList.remove('animate-pulse');
        }, 3000);
    });
});




// VALIDATION REGEX (From Reference)
function validURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}

// SVG PATHS (Heroicons v2 Outline)
const ICON_CAM_START = "m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z";
const ICON_CAM_STOP = "m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M12 18.75H4.5a2.25 2.25 0 0 1-2.25-2.25V9m12.841 9.091L16.5 19.5m-1.409-1.409c.407-.407.659-.97.659-1.591v-9a2.25 2.25 0 0 0-2.25-2.25h-9c-.621 0-1.184.252-1.591.659m12.182 12.182L2.909 5.909M1.5 4.5l1.409 1.409";

const camIconSvg = document.getElementById('cam-icon-on');
const camIconPath = camIconSvg.querySelector('path');

function updateCamIcon(isScanning) {
    if (camIconPath) {
        camIconPath.setAttribute('d', isScanning ? ICON_CAM_STOP : ICON_CAM_START);
    }
}

function startCamera() {
    statusMsg.innerText = "Detecting cameras...";
    statusMsg.classList.remove('text-red-500');
    
    // Explicitly ask for cameras first
    Html5Qrcode.getCameras().then(devices => {
        if (devices && devices.length) {
            // Logic to find 'back' camera or last one
            let cameraId = devices[0].id;
            // Try to find a back camera
            for (const device of devices) {
                if (device.label.toLowerCase().includes('back') || device.label.toLowerCase().includes('environment')) {
                    cameraId = device.id;
                    break;
                }
            }
            
            // Start the camera
            const config = { fps: 10, qrbox: 250 }; // Reference uses simple int for qrbox
            
            html5QrCode.start(
                cameraId, 
                config, 
                onScanSuccess,
                (errorMessage) => {
                    // console.log(errorMessage); // Ignore frame errors
                }
            ).then(() => {
                isCameraRunning = true;
                
                // UI Updates
                readerEl.classList.remove('hidden');
                placeholderIcon.classList.add('hidden');
                toggleBtnText.innerText = "Stop Camera";
                updateCamIcon(true);
                
                toggleBtn.classList.remove('from-blue-600', 'to-blue-700', 'bg-gradient-to-r');
                toggleBtn.classList.add('bg-red-600', 'hover:bg-red-700');
                
                statusMsg.innerText = "Point camera at QR Code";
                statusMsg.className = "text-center text-xs text-green-400 font-medium mb-6 animate-pulse";
            }).catch(err => {
                 showError(err);
                 isCameraRunning = false; // Reset state if start fails
                 updateCamIcon(false);
            });
            
        } else {
            showError("No cameras found.");
        }
    }).catch(err => {
        showError("Permission denied or no camera. " + err);
    });
}
function stopCamera() {
    if(!isCameraRunning) return; // Prevent double stop

    html5QrCode.stop().then(() => {
        isCameraRunning = false;
        
        // UI Updates
        readerEl.classList.add('hidden');
        placeholderIcon.classList.remove('hidden');
        toggleBtnText.innerText = "Start Camera";
        updateCamIcon(false);
        
        // Reset Button Style
        toggleBtn.classList.remove('bg-red-600', 'hover:bg-red-700');
        toggleBtn.classList.add('bg-gradient-to-r', 'from-blue-600', 'to-blue-700');
        
        statusMsg.innerText = "Camera stopped";
        statusMsg.className = "text-center text-xs text-gray-500 font-medium mb-6";
    }).catch(err => {
        console.error("Stop failed", err);
        // Force UI reset even if stop fails (sometimes the library gets stuck)
        isCameraRunning = false;
        readerEl.classList.add('hidden');
        placeholderIcon.classList.remove('hidden');
        toggleBtnText.innerText = "Start Camera";
        updateCamIcon(false);
        toggleBtn.classList.remove('bg-red-600', 'hover:bg-red-700');
        toggleBtn.classList.add('bg-gradient-to-r', 'from-blue-600', 'to-blue-700');
        statusMsg.innerText = "Camera stopped (Force)";
    });
}

function onScanSuccess(decodedText, decodedResult) {
    if (isCameraRunning) {
        stopCamera(); 
    }
    
    statusMsg.innerText = "QR Code Found!";
    statusMsg.className = "text-sm text-green-400 font-bold px-4 z-10";

    const text = decodedText.trim();
    
    // Use Reference Validation
    if (validURL(text)) {
         // It's a URL
         // Extract params if possible
         try {
            const url = new URL(text);
            const user = url.searchParams.get('username') || url.searchParams.get('user');
            const pass = url.searchParams.get('password') || url.searchParams.get('pass');
            
            if (user) {
                redirectToLogin(user, pass || user); // Default pass=user if missing
            } else {
                // Just a URL without params, maybe redirect directly?
                // Reference just does window.location.href = text;
                window.location.href = text;
            }
         } catch(e) {
             window.location.href = text; // Fallback
         }
    } else {
        // Not a URL, try parsing username:password
         const colonIndex = text.indexOf(':');
         if (colonIndex > 0) {
             const user = text.substring(0, colonIndex);
             const pass = text.substring(colonIndex + 1);
             redirectToLogin(user, pass);
         } else {
             // Treat as voucher code (user=pass)
             redirectToLogin(text, text);
         }
    }
}

function redirectToLogin(username, password) {
    if (validReturnUrl) {
        try {
            const target = new URL(returnUrl);
            target.searchParams.set('username', username);
            target.searchParams.set('password', password);
            target.searchParams.set('autosubmit', 'true');
            window.location.href = target.toString();
        } catch(e) {
             statusMsg.innerText = "Redirect Error: " + e;
        }
    } else {
        statusMsg.innerText = `User: ${username} (No Return URL)`;
    }
}
