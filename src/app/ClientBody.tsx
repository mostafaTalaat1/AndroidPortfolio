"use client";

import type React from "react";
import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";

export default function ClientBody({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const cursorBallRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Custom cursor effect
  useEffect(() => {
    if (!mounted) return;

    const cursor = { x: 0, y: 0 };
    const cursorBall = { x: 0, y: 0, width: 10, height: 10 };
    let animationFrameId: number;

    const onMouseMove = (e: MouseEvent) => {
      cursor.x = e.clientX;
      cursor.y = e.clientY;
    };

    document.addEventListener("mousemove", onMouseMove);

    function lerp(start: number, end: number, amount: number) {
      return (1 - amount) * start + amount * end;
    }

    function animate() {
      cursorBall.x = lerp(cursorBall.x, cursor.x, 0.2);
      cursorBall.y = lerp(cursorBall.y, cursor.y, 0.2);

      if (cursorBallRef.current) {
        gsap.set(cursorBallRef.current, {
          x: cursorBall.x - cursorBall.width / 2,
          y: cursorBall.y - cursorBall.height / 2,
        });
      }

      animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    const handleMouseEnter = () => {
      if (cursorBallRef.current) {
        const circle = cursorBallRef.current.querySelector("circle");
        if (circle) {
          gsap.to(circle, { duration: 0.3, scale: 3 });
        }
      }
    };

    const handleMouseLeave = () => {
      if (cursorBallRef.current) {
        const circle = cursorBallRef.current.querySelector("circle");
        if (circle) {
          gsap.to(circle, { duration: 0.3, scale: 1 });
        }
      }
    };

    const links = document.querySelectorAll("a, button, .hover-text");

    for (const link of links) {
      link.addEventListener("mouseenter", handleMouseEnter);
      link.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animationFrameId);

      for (const link of links) {
        link.removeEventListener("mouseenter", handleMouseEnter);
        link.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [mounted]);

  // Handle route changes
  useEffect(() => {
    if (mounted) {
      const element = document.querySelector(".page-transition");
      if (element) {
        gsap.fromTo(
          element,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
        );
      }
    }
  }, [mounted]);

  if (!mounted) {
    return null;
  }

  return (
    <>
      {children}

      <div className="cursor" aria-hidden="true">
        <div className="cursor__ball" ref={cursorBallRef}>
          <svg height="30" width="30" aria-hidden="true" focusable="false">
            <circle cx="15" cy="15" r="8" strokeWidth="0" />
          </svg>
        </div>
      </div>
    </>
  );
}
