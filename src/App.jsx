import Header from "./components/Header";
import TypingTest from "./components/TypingTest/TypingTest";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [fontMode, setFontMode] =
    useLocalStorage(
      "kiflo-font-mode",
      "default"
    );

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