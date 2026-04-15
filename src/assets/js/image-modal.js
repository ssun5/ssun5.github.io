(function () {
	const modal = document.getElementById("image-modal");
	const modalImg = modal?.querySelector(".image-modal__img");
	const closeBtn = modal?.querySelector(".image-modal__close");
	const main = document.querySelector("main");
	if (!modal || !modalImg || !main) return;

	let lastFocus = null;

	function isLightboxable(img) {
		if (!img || img.tagName !== "IMG") return false;
		if (img.classList.contains("no-lightbox")) return false;
		if (img.closest("a[href]")) return false;
		const src = img.currentSrc || img.src;
		if (!src || src.startsWith("data:")) return false;
		return true;
	}

	function openModal(img) {
		lastFocus = document.activeElement;
		modalImg.src = img.currentSrc || img.src;
		modalImg.alt = img.alt || "";
		modal.classList.add("is-open");
		modal.removeAttribute("hidden");
		modal.setAttribute("aria-hidden", "false");
		document.body.classList.add("image-modal-open");
		closeBtn?.focus({ preventScroll: true });
	}

	function closeModal() {
		modal.classList.remove("is-open");
		modal.setAttribute("hidden", "");
		modal.setAttribute("aria-hidden", "true");
		modalImg.removeAttribute("src");
		modalImg.alt = "";
		document.body.classList.remove("image-modal-open");
		if (lastFocus && typeof lastFocus.focus === "function") {
			lastFocus.focus({ preventScroll: true });
		}
		lastFocus = null;
	}

	main.addEventListener("click", function (e) {
		const host = e.target.closest(".img-lightbox");
		let img = null;
		if (host && main.contains(host)) {
			img = host.querySelector("img:not(.no-lightbox)");
		} else {
			const marked = e.target.closest("img.lightbox");
			if (marked && main.contains(marked)) img = marked;
		}
		if (!img || !isLightboxable(img)) return;
		e.preventDefault();
		openModal(img);
	});

	modal.addEventListener("click", function (e) {
		if (e.target === modal) closeModal();
	});

	closeBtn?.addEventListener("click", function (e) {
		e.stopPropagation();
		closeModal();
	});

	document.addEventListener("keydown", function (e) {
		if (e.key !== "Escape") return;
		if (!modal.classList.contains("is-open")) return;
		e.preventDefault();
		closeModal();
	});
})();
