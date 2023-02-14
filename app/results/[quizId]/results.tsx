"use client";

import { animate, motion } from "framer-motion";
import React from "react";

import { IconOnly } from "@/components/quiz/icon";
import { KanjiQuiz } from "@/lib/quiz";

export function QuizResults({ quiz }: { quiz: KanjiQuiz }) {
  const textRef = React.useRef<HTMLParagraphElement>(null);
  const { progress: results, questions } = quiz;

  const numReadingCorrect = results.filter(
    (result) => result.reading.type === "correct"
  );
  const numMeaningCorrect = results.filter(
    (result) => result.meaning.type === "correct"
  );
  const totalCorrect = numReadingCorrect.length + numMeaningCorrect.length;

  React.useEffect(() => {
    animate(0, totalCorrect, {
      type: "spring",
      damping: 10,
      stiffness: 15,
      onUpdate(latest) {
        if (!textRef.current) return;
        textRef.current.innerText = latest.toFixed(0);
      },
    });
  }, [totalCorrect]);

  return (
    <div className="w-fit mx-auto my-32 flex">
      <motion.ul
        className="w-[1000px] space-y-12 mr-64"
        animate="shown"
        initial="hidden"
        transition={{ staggerChildren: 0.15 }}
      >
        {results.map((result, index) => {
          const question = questions[index];
          return (
            <motion.li
              key={index}
              className="rounded-lg overflow-hidden bg-gray2 shadow-md border border-gray4 flex"
              variants={{
                shown: { opacity: 1, y: 0 },
                hidden: { opacity: 0, y: 20 },
              }}
              transition={{ type: "spring", damping: 20 }}
            >
              <div className="font-bold text-[7rem] leading-none bg-gradient-to-br from-gray3 to-gray1 p-6 border-r border-inherit w-48 flex items-center justify-center">
                {question.literal}
              </div>
              <div className="border-r border-inherit flex-1 p-8 space-y-2">
                <h3 className="font-mono">Reading</h3>
                <div className="text-xl py-2 border-b border-inherit relative">
                  {result.reading.value || (
                    <span className="text-base italic text-gray10">
                      Skipped
                    </span>
                  )}
                  <span className="absolute bottom-3 right-2">
                    <IconOnly
                      size={25}
                      type={result.reading.type}
                      variants={{
                        shown: { pathLength: 1 },
                        hidden: { pathLength: 0 },
                      }}
                    />
                  </span>
                </div>
                <motion.div
                  animate={{
                    y: 0,
                    opacity: 1,
                  }}
                  initial={{ y: -16, opacity: 0 }}
                  transition={{ type: "spring", damping: 20 }}
                >
                  <p className="flex">
                    <span className="w-[60px] text-sm mr-2 font-mono text-gray10 translate-y-[2px]">
                      Kunyomi
                    </span>{" "}
                    {question.readings.kun.join(", ")}
                  </p>
                  <p className="flex items-center">
                    <span className="w-[60px] text-sm mr-2 font-mono text-gray10">
                      Onyomi
                    </span>{" "}
                    {question.readings.on.join(", ")}
                  </p>
                </motion.div>
              </div>
              <div className="flex-1 p-8 space-y-2 border-inherit">
                <h3 className="font-mono">Meaning</h3>
                <p className="text-xl py-2 border-b border-inherit relative">
                  {result.meaning.value || (
                    <span className="text-base italic text-gray10">
                      Skipped
                    </span>
                  )}
                  <span className="absolute bottom-3 right-2">
                    <IconOnly
                      size={25}
                      type={result.meaning.type}
                      variants={{
                        shown: { pathLength: 1 },
                        hidden: { pathLength: 0 },
                      }}
                    />
                  </span>
                </p>
                <motion.div
                  animate={{
                    y: 0,
                    opacity: 1,
                  }}
                  initial={{ y: -16, opacity: 0 }}
                  transition={{ type: "spring", damping: 20 }}
                >
                  <p className="text-sm font-mono text-gray10">Meanings</p>
                  <p>{question.meanings.join(", ")}</p>
                </motion.div>
              </div>
            </motion.li>
          );
        })}
      </motion.ul>
      <aside className="fixed h-fit right-[200px] rounded-lg border border-gray4 overflow-hidden w-[180px] flex flex-col shadow-md">
        <p
          className="text-[6rem] font-bold leading-none flex-1 flex items-center justify-center bg-gray2 py-8"
          ref={textRef}
        >
          0
        </p>
        <div className="h-px w-[150%] absolute bg-gray4 left-1/2 top-1/2 -translate-x-1/2 -rotate-12" />
        <p className="text-[6rem] font-bold leading-none flex-1 flex items-center justify-center py-8 bg-gray2">
          {results.length * 2}
        </p>
      </aside>
    </div>
  );
}
