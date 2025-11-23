import React, { useEffect, useState, useRef } from "react";
import styled from "@emotion/styled";

const MIN_HEIGHT = 200;
const MAX_HEIGHT = 400;

export default function Banner() {
  const [height, setHeight] = useState(MAX_HEIGHT);
  const [scrollLocked, setScrollLocked] = useState(true);
  const touchStartY = useRef(null);

  // Lock page scrolling
  useEffect(() => {
    document.body.style.overflow = scrollLocked ? "hidden" : "auto";
  }, [scrollLocked]);

  // ---------------------------------------------
  // DESKTOP: Scroll shrinking & expanding
  // ---------------------------------------------
  useEffect(() => {
    const handleWheel = (e) => {
      const delta = e.deltaY;

      // SHRINKING (Scroll Down)
      if (scrollLocked && delta > 0) {
        e.preventDefault();
        setHeight((prev) => {
          const newHeight = prev - delta * 0.4;
          if (newHeight <= MIN_HEIGHT) {
            setScrollLocked(false); // unlock page scroll now
            return MIN_HEIGHT;
          }
          return newHeight;
        });
        return;
      }

      // EXPANDING Trigger (Scroll Up at page top)
      if (!scrollLocked && delta < 0 && window.scrollY === 0) {
        e.preventDefault();
        setScrollLocked(true); // lock again
        return;
      }

      // EXPANDING when scroll already locked
      if (scrollLocked && delta < 0) {
        e.preventDefault();
        setHeight((prev) => {
          const newHeight = prev - delta * 0.4;
          if (newHeight >= MAX_HEIGHT) {
            return MAX_HEIGHT; // fully expanded
          }
          return newHeight;
        });
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [scrollLocked]);

  // ---------------------------------------------
  // MOBILE: Touch shrinking & expanding
  // ---------------------------------------------
  useEffect(() => {
    const onTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const onTouchMove = (e) => {
      const currentY = e.touches[0].clientY;
      const delta = touchStartY.current - currentY;

      // SHRINK (Swipe Up)
      if (scrollLocked && delta > 0) {
        e.preventDefault();
        setHeight((prev) => {
          const newHeight = prev - delta * 0.2;
          if (newHeight <= MIN_HEIGHT) {
            setScrollLocked(false);
            return MIN_HEIGHT;
          }
          return newHeight;
        });
      }

      // EXPAND Trigger (Swipe Down at top)
      if (!scrollLocked && delta < 0 && window.scrollY === 0) {
        e.preventDefault();
        setScrollLocked(true);
        return;
      }

      // EXPAND (Swipe Down while locked)
      if (scrollLocked && delta < 0) {
        e.preventDefault();
        setHeight((prev) => Math.min(MAX_HEIGHT, prev + Math.abs(delta) * 0.2));
      }
    };

    window.addEventListener("touchstart", onTouchStart, { passive: false });
    window.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [scrollLocked]);

  const isLarge = height > 350;

  return (
    <>
      <BannerWrapper height={height}>
        {isLarge ? (
          <LargeContent>
            <h1>Big Banner</h1>
            <p>More content inside when large</p>
          </LargeContent>
        ) : (
          <SmallContent>
            <h1>Small Banner</h1>
          </SmallContent>
        )}
      </BannerWrapper>

      <PageContent>
        <h2>Page Content</h2>
        <p>Scroll to see effects...</p>
        <div style={{ height: "2000px" }} />
      </PageContent>
    </>
  );
}

// ---------------------------------------------
// Styled Components
// ---------------------------------------------
const BannerWrapper = styled.div`
  width: 100%;
  height: ${({ height }) => height}px;
  background: linear-gradient(135deg, #005bea, #00c6fb);
  transition: height 0.12s ease-out;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  color: white;
`;

const LargeContent = styled.div`
  text-align: center;
  transition: opacity 0.2s ease;
`;

const SmallContent = styled.div`
  text-align: center;
  transition: opacity 0.2s ease;
`;

const PageContent = styled.div`
  background: #fff;
  padding: 20px;
`;
