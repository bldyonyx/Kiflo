import { useState } from "react";
import Header from "./components/Header";
import TypingTest from "./components/TypingTest/TypingTest";

function App() {
  const [fontMode, setFontMode] = useState("default");

  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col px-8 py-8">
      <Header
        fontMode={fontMode}
        onFontModeChange={setFontMode}
      />

      <TypingTest fontMode={fontMode} />
    </main>
  );
}

export default App;