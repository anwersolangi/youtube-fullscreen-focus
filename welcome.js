document.addEventListener("DOMContentLoaded", function () {
  // FAQ toggle functionality with keyboard support
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    const arrow = question.querySelector("span:last-child");

    const toggleFAQ = () => {
      const isActive = item.classList.contains("active");
      item.classList.toggle("active");
      arrow.textContent = item.classList.contains("active") ? "▲" : "▼";
      item.setAttribute("aria-expanded", !isActive);

      // Close other FAQ items for accordion behavior
      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          const otherQuestion = otherItem.querySelector(".faq-question");
          const otherArrow = otherQuestion.querySelector("span:last-child");
          otherItem.classList.remove("active");
          otherArrow.textContent = "▼";
          otherItem.setAttribute("aria-expanded", "false");
        }
      });
    };

    question.addEventListener("click", toggleFAQ);
    question.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleFAQ();
      }
    });
  });

  // Add animation to feature cards on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target); // Stop observing once animated
      }
    });
  }, observerOptions);

  // Observe feature cards
  const features = document.querySelectorAll(".feature");
  features.forEach((feature, index) => {
    feature.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${
      index * 0.15
    }s`;
    observer.observe(feature);
  });
});
