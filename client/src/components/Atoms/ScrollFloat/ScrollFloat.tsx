"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import clsx from "clsx";
import { resolveResponsiveClass, ResponsiveValue } from "@/helpers/ResponsiveJustify";

type AlignOption = "left" | "center" | "right";
type JustifyValue = "start" | "center" | "end";

interface ScrollRevealProps {
  text: string;
  className?: string;
  delayStep?: number;
  align?: ResponsiveValue<AlignOption>;
  justifyContentH2?: ResponsiveValue<JustifyValue>;
  justifyContainer?: ResponsiveValue<JustifyValue>;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  text,
  className = "",
  delayStep = 0.1,
  align = "left",
  justifyContentH2,
  justifyContainer,
}) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, {
    margin: "-100px 0px -20px 0px",
    once: false,
  });

  useEffect(() => {
    controls.start((i) => ({
      opacity: isInView ? 1 : 0,
      filter: isInView ? "blur(0px)" : "blur(6px)",
      y: isInView ? 0 : 20,
      transition: {
        duration: 0.6,
        delay: i * delayStep,
        ease: "easeOut",
      },
    }));
  }, [isInView, controls, delayStep]);

  const words = text.split(" ");

  
  const justifyMap: Record<JustifyValue, string> = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
  };

  const alignMap: Record<AlignOption, string> = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  const justifyClassH2 = resolveResponsiveClass(justifyContentH2, justifyMap);
  const justifyClassDiv = resolveResponsiveClass(justifyContainer, justifyMap);
  const textAlignClass = resolveResponsiveClass(align, alignMap);

  return (
    <h2 ref={ref} className={clsx("w-full flex", justifyClassH2)}>
      <div className={clsx("flex flex-wrap w-full gap-x-2", justifyClassDiv, textAlignClass, className)}>
        {words.map((word, i) => (
          <motion.span
            key={i}
            custom={i}
            initial={{ opacity: 0, filter: "blur(6px)", y: 20 }}
            animate={controls}
            className="inline-block"
          >
            {word}&nbsp;
          </motion.span>
        ))}
      </div>
    </h2>
  );
};

export default ScrollReveal;
