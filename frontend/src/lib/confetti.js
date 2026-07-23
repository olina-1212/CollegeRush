import confetti from "canvas-confetti";

export const celebrateListing = () => {
  confetti({
    particleCount: 120,
    spread: 90,
    startVelocity: 35,
    origin: {
      y: 0.7,
    },
  });
};