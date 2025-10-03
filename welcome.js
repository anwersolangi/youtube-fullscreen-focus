// JavaScript for Welcome page - FAQ functionality
document.addEventListener("DOMContentLoaded", function () {
  // FAQ toggle functionality
  const faqQuestions = document.querySelectorAll(".faq-question");

  faqQuestions.forEach((question) => {
    question.addEventListener("click", function () {
      const item = this.parentElement;
      const arrow = this.querySelector("span:last-child");

      // Toggle active state
      item.classList.toggle("active");

      // Update arrow direction
      arrow.textContent = item.classList.contains("active") ? "▲" : "▼";

      // Close other FAQ items (optional - for accordion behavior)
      faqQuestions.forEach((otherQuestion) => {
        if (otherQuestion !== this) {
          const otherItem = otherQuestion.parentElement;
          const otherArrow = otherQuestion.querySelector("span:last-child");
          otherItem.classList.remove("active");
          otherArrow.textContent = "▼";
        }
      });
    });
  });

  // Smooth scroll for table of contents links
  const tocLinks = document.querySelectorAll(".toc a");

  tocLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Add animation to feature cards on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe feature cards
  const features = document.querySelectorAll(".feature");
  features.forEach((feature, index) => {
    feature.style.opacity = "0";
    feature.style.transform = "translateY(20px)";
    feature.style.transition = `all 0.5s ease ${index * 0.1}s`;
    observer.observe(feature);
  });
});
