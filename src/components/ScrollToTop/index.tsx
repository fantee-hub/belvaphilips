"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

const ScrollTop = () => {
  const pathname = usePathname();
  // Scroll to top when the pathname changess
  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
    });
  }, [pathname]);
  return null;
};
export default ScrollTop;
