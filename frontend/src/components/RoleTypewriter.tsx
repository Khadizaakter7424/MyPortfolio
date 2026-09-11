import { useEffect, useState } from "react";

type Props = {
  text: string;
};

/** Renders `text` as a looping terminal-style typewriter: types it out,
 *  holds, deletes it, holds, and repeats. Falls back to the plain text
 *  (no animation) for prefers-reduced-motion or an empty string. */
export default function RoleTypewriter({ text }: Props) {
  const [display, setDisplay] = useState("");

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !text) {
      setDisplay(text);
      return;
    }

    const TYPE_SPEED = 55;
    const DELETE_SPEED = 30;
    const HOLD_FULL = 2000;
    const HOLD_EMPTY = 500;

    let charIndex = 0;
    let deleting = false;
    let timeoutId: number;

    function tick() {
      if (!deleting) {
        charIndex++;
        setDisplay(text.slice(0, charIndex));
        if (charIndex === text.length) {
          timeoutId = window.setTimeout(() => {
            deleting = true;
            tick();
          }, HOLD_FULL);
          return;
        }
        timeoutId = window.setTimeout(tick, TYPE_SPEED);
      } else {
        charIndex--;
        setDisplay(text.slice(0, charIndex));
        if (charIndex === 0) {
          timeoutId = window.setTimeout(() => {
            deleting = false;
            tick();
          }, HOLD_EMPTY);
          return;
        }
        timeoutId = window.setTimeout(tick, DELETE_SPEED);
      }
    }

    timeoutId = window.setTimeout(tick, TYPE_SPEED);
    return () => window.clearTimeout(timeoutId);
  }, [text]);

  return (
    <span className="role-chip">
      <span className="role-prompt">&gt;_</span>
      <span className="role-text">{display}</span>
      <span className="role-cursor" />
    </span>
  );
}