import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const magnetRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return; // leave touch/mobile devices with the normal cursor

    document.body.classList.add("custom-cursor-active");

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let magnetX = mouseX;
    let magnetY = mouseY;
    let hoveredEl: HTMLElement | null = null;

    function onMouseMove(e: MouseEvent) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }

    // Optional per-element label: <button data-cursor="Send">...
    // Falls back to a sensible default per tag.
    function labelFor(el: HTMLElement) {
      if (el.dataset.cursor) return el.dataset.cursor;
      const tag = el.tagName.toLowerCase();
      if (tag === "a") return "Open";
      if (tag === "button") return "Click";
      if (tag === "input" || tag === "textarea") return "Type";
      return "";
    }

    function onOver(e: MouseEvent) {
      const target = (e.target as HTMLElement).closest(
        "a, button, input, textarea"
      ) as HTMLElement | null;
      if (!target) return;
      hoveredEl = target;
      magnetRef.current?.classList.add("cursor-magnet-active");
      if (labelRef.current) labelRef.current.textContent = labelFor(target);
    }

    function onOut(e: MouseEvent) {
      const target = (e.target as HTMLElement).closest(
        "a, button, input, textarea"
      ) as HTMLElement | null;
      if (!target) return;
      if (hoveredEl === target) hoveredEl = null;
      magnetRef.current?.classList.remove("cursor-magnet-active");
      if (labelRef.current) labelRef.current.textContent = "";
    }

    let rafId: number;
    function animate() {
      let targetX = mouseX;
      let targetY = mouseY;

      if (hoveredEl) {
        // Pull the ring toward the hovered element's center, but let it
        // still drift a little with the actual pointer so it reads as
        // "magnetized" rather than teleported.
        const rect = hoveredEl.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const pull = 0.7;
        targetX = centerX + (mouseX - centerX) * (1 - pull);
        targetY = centerY + (mouseY - centerY) * (1 - pull);
        if (dotRef.current) dotRef.current.style.opacity = "0";
      } else {
        if (dotRef.current) {
          dotRef.current.style.opacity = "1";
          dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
        }
      }

      magnetX += (targetX - magnetX) * 0.22;
      magnetY += (targetY - magnetY) * 0.22;

      if (magnetRef.current) {
        magnetRef.current.style.transform = `translate(${magnetX}px, ${magnetY}px)`;
      }

      rafId = requestAnimationFrame(animate);
    }

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    rafId = requestAnimationFrame(animate);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={magnetRef} className="cursor-magnet">
        <span ref={labelRef} className="cursor-magnet-label" />
      </div>
    </>
  );
}