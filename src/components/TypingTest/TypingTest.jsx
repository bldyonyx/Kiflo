import { useState } from "react";
import TestControls from "./TestControls";
import TypingArea from "./TypingArea";

function TypingTest() {
  const [mode, setMode] = useState("text");
  const [duration, setDuration] = useState(30);

  return (
    <section className="flex flex-1 flex-col items-center justify-center">
      <div className="flex w-full max-w-4xl flex-col gap-12">
        <TestControls
          mode={mode}
          onModeChange={setMode}
          duration={duration}
          onDurationChange={setDuration}
        />

        <div className="min-h-48">
          <TypingArea mode={mode} />
        </div>
      </div>
    </section>
  );
}

export default TypingTest;