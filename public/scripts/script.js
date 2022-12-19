function openModal(str) {
  console.log('opening modal:', str);
  if (document.querySelector("#star"))
  document.querySelector("#star").classList.add("hidden");
  const modal = document.querySelector("#modal-" + str);
  const overlay = document.querySelector("#overlay-" + str);
  const panel = document.querySelector("#modal-panel-" + str);
  modal.classList.remove("pointer-events-none");
  modal.classList.remove("scale-0");
  modal.classList.add("scale-100");
  modal.classList.remove("-z-50");
  modal.classList.add("z-50");
  // modal.classList.add("w-screen");
  // modal.classList.add("h-screen");
  overlay.classList.remove("opacity-0");
  overlay.classList.add("opacity-100");
  panel.classList.remove("opacity-0");
  panel.classList.add("opacity-100");
  panel.classList.remove("translate-y-4");
  panel.classList.add("translate-y-0");
  panel.classList.remove("sm:scale-95");
  panel.classList.add("sm:scale-100");
  panel.classList.remove("sm:translate-y-0");

}

function closeModal(str) {
  console.log('closing modal:', str);
  if (document.querySelector("#star"))
    document.querySelector("#star").classList.remove("hidden");
  const modal = document.querySelector("#modal-" + str);
  const overlay = document.querySelector("#overlay-" + str);
  const panel = document.querySelector("#modal-panel-" + str);
  modal.classList.add("pointer-events-none");
  modal.classList.remove("scale-100");
  modal.classList.add("scale-0");
  modal.classList.add("-z-50");
  modal.classList.remove("z-50");
  overlay.classList.add("opacity-0");
  overlay.classList.remove("opacity-100");
  panel.classList.add("opacity-0");
  panel.classList.remove("opacity-100");
  panel.classList.add("translate-y-4");
  panel.classList.remove("translate-y-0");
  panel.classList.add("sm:scale-95");
  panel.classList.remove("sm:scale-100");
  panel.classList.add("sm:translate-y-0");
}

function validatePass(str) {
  const pass = document.getElementById("pass").value;
  const confirmPass = document.getElementById("confirmPass").value;
  const submitBtn = document.getElementById("submit-btn-" + str);
  const alertDiv = document.getElementById("wrongPass");
  if (pass.length > 0 && confirmPass.length > 0 && pass != confirmPass) {
    alertDiv.innerHTML = "🔥 Use same password";
    alertDiv.classList.add("invert");
    submitBtn.classList.add("blur-[1.5px]");
    submitBtn.classList.add("grayscale");
    submitBtn.classList.add('brightness-125')
    submitBtn.disabled = true;
  } else if (pass.length > 0 && confirmPass.length > 0 && pass == confirmPass) {
    alertDiv.innerHTML = "🌈 Password Matched";
    alertDiv.classList.remove("invert");
    submitBtn.classList.remove("blur-[1.5px]");
    submitBtn.classList.remove("grayscale");
    submitBtn.classList.remove('brightness-125')
    submitBtn.disabled = false;
  }
  if (pass.length == 0 || confirmPass.length == 0) {
    alertDiv.innerHTML = "";
  }
}

function scrollDown() {
  console.log('scrolled down');
  setTimeout(function () {
    window.scrollTo({
      left: 0,
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  }, 333);
}

function loginSuccess(type) {
  console.log('successful login');
  setTimeout(_ => {
    window.location.href = `/${type}Dash`;
  }, 1333);
}

// Send a POST request when the logout button is clicked
async function logout() {
  await fetch('/logout', { method: 'POST' });
  window.location.href = '/';
}
