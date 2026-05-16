document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("a.cite").forEach((link) => {
    const href = link.getAttribute("href");
    if (!href || href === "#") return;
    const id = decodeURIComponent(href.slice(1));
    const target = document.getElementById(id);
    if (!target || target.tagName !== "LI") return;
    const ol = target.parentElement;
    if (!ol || ol.tagName !== "OL" || !ol.classList.contains("references"))
      return;

    const num = [...ol.children].indexOf(target) + 1;
    link.innerHTML = `<sup>[${num}]</sup>`;
  });
});