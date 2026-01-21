document.addEventListener("DOMContentLoaded", function() {
    // Toggle which pin is active; may be multiple img_container callout class
    const containers = document.querySelectorAll(".img_container.callout");

    containers.forEach(container => {
      const pins = container.querySelectorAll(".pin");
      const labels = container.querySelectorAll(".callout_label");

      labels.forEach(label => label.classList.add("hidden"));
      // Initialize first label as active
      labels[0].classList.remove("hidden");

      // Initialize first pin as active
      pins.forEach(pin => {
        if (pin.getAttribute("data-pin-count") === "1") {
          pin.classList.add("active");
        } else {
          pin.classList.remove("active");
        }
        pin.addEventListener("click", function() {
          // Add active class to clicked pin
          const id = this.getAttribute("data-pin-count");
          // Remove active class from all pins
          pins.forEach(p => {
            p.classList.remove("active")
            if (p.getAttribute("data-pin-count") === id) {
              p.classList.add("active");
            }
          });
          // Show corresponding label
          labels.forEach(label => {
            label.classList.add("hidden");
            if (label.getAttribute("data-pin-count") === id) {
              label.classList.remove("hidden");
            }
          });
        })
      })
    })
  });