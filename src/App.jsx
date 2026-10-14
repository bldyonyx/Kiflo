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
    <main className="mx-auto flex min-h-dvh w-full max-w-6xl flex-col px-4 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-8 min-[1800px]:max-w-[96rem] min-[1800px]:px-12 min-[1800px]:py-10 min-[2400px]:max-w-[110rem]">
      <Header
        fontMode={fontMode}
        onFontModeChange={setFontMode}
      />

      <TypingTest fontMode={fontMode} />
    </main>
  );
}

export default App;
