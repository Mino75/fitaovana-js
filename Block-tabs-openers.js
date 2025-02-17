// Override window.open to prevent pop-ups
window.open = function() {
  console.log("Blocked a window.open attempt!");
  return null;
};

// Optional: Block links that try to open in a new tab/window
document.addEventListener("click", function(e) {
  const target = e.target.closest("a");
  if (target && target.getAttribute("target") === "_blank") {
    e.preventDefault();
    console.log("Blocked a _blank link:", target.href);
  }
}, true);
