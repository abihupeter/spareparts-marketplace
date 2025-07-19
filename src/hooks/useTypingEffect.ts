import { useState, useEffect } from "react";

interface UseTypingEffectProps {
  text: string;
  speed?: number; // Typing speed in milliseconds per character
  delay?: number; // Initial delay before typing starts
  loop?: boolean; // Whether to loop the animation
}

export const useTypingEffect = ({
  text,
  speed = 100, // Default typing speed
  delay = 0, // Default initial delay
  loop = false, // Default no loop
}: UseTypingEffectProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    if (animationComplete && !loop) return; // Stop if animation completed and not looping

    let timeoutId: NodeJS.Timeout;

    const startTyping = () => {
      timeoutId = setTimeout(() => {
        if (currentIndex < text.length) {
          setDisplayedText((prev) => prev + text[currentIndex]);
          setCurrentIndex((prev) => prev + 1);
        } else if (loop) {
          // Reset for loop
          setDisplayedText("");
          setCurrentIndex(0);
          setAnimationComplete(false); // Reset completion flag for loop
        } else {
          setAnimationComplete(true); // Mark as complete if not looping
        }
      }, speed);
    };

    if (delay > 0 && currentIndex === 0 && !displayedText) {
      // Apply initial delay only at the very beginning
      timeoutId = setTimeout(startTyping, delay);
    } else {
      startTyping();
    }

    return () => clearTimeout(timeoutId); // Cleanup timeout on unmount or re-render
  }, [
    currentIndex,
    text,
    speed,
    delay,
    loop,
    displayedText,
    animationComplete,
  ]);

  return { displayedText, animationComplete };
};
