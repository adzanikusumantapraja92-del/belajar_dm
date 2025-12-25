// ================================
// FIREBASE AUTH - PEMULA FRIENDLY
// ================================

// 1. Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

// 2. Konfigurasi Firebase (PASTE PUNYA KAMU)
const firebaseConfig = {
  apiKey: "AIzaSyBfdu8u--kjkqo7VmCljFCEaF4UIlpDjCo",
  authDomain: "belajar-digital-marketing.firebaseapp.com",
  projectId: "belajar-digital-marketing",
  appId: "1:928549583734:web:3cba5a8375de165ec59857"
};

// 3. Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 4. Ambil elemen form
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const btnLogin = document.getElementById("btnLogin");
const btnRegister = document.getElementById("btnRegister");
const authMessage = document.getElementById("authMessage");

// 5. Helper tampilkan pesan
function showMessage(msg, isError = true) {
  authMessage.textContent = msg;
  authMessage.style.color = isError ? "#d9534f" : "#28a745";
}

// 6. LOGIN
if (btnLogin) {
  btnLogin.addEventListener("click", async () => {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email || !password) {
      showMessage("Email dan password wajib diisi.");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      showMessage("Login berhasil. Mengarahkan...", false);

      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 800);

    } catch (error) {
      showMessage(translateError(error.code));
    }
  });
}

// 7. REGISTER
if (btnRegister) {
  btnRegister.addEventListener("click", async () => {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email || !password) {
      showMessage("Email dan password wajib diisi.");
      return;
    }

    if (password.length < 6) {
      showMessage("Password minimal 6 karakter.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      showMessage("Akun berhasil dibuat. Mengarahkan...", false);

      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 800);

    } catch (error) {
      showMessage(translateError(error.code));
    }
  });
}

// 8. CEK STATUS LOGIN (OPSIONAL TAPI BAGUS)
onAuthStateChanged(auth, (user) => {
  if (user && window.location.pathname.includes("login")) {
    window.location.href = "dashboard.html";
  }
});

// 9. TERJEMAHKAN ERROR (PSIKOLOGI AMAN)
function translateError(code) {
  switch (code) {
    case "auth/user-not-found":
      return "Akun belum terdaftar.";
    case "auth/wrong-password":
      return "Password salah.";
    case "auth/email-already-in-use":
      return "Email sudah terdaftar.";
    case "auth/invalid-email":
      return "Format email tidak valid.";
    default:
      return "Terjadi kesalahan. Coba lagi.";
  }
}
