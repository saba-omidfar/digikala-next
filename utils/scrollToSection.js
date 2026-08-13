export default function scrollToSection(sectionId, offset) {
  const section = document.getElementById(sectionId);
  if (section) {
    const sectionTop =
      section.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({
      top: sectionTop,
      behavior: "smooth",
    });
  }
}
