export const showToast = (message, type = "success") => {
  const toastEl = document.getElementById("appToast");
  const toastMsg = document.getElementById("toastMessage");

  if (!toastEl || !toastMsg) return;

  toastMsg.innerText = message;

  // change color based on type
  toastEl.className = `toast align-items-center text-bg-${type} border-0`;

  const toast = new window.bootstrap.Toast(toastEl);
  toast.show();
};
