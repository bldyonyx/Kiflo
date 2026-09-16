import Header from "./components/Header";
import TypingTest from "./components/TypingTest/TypingTest";

function App() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col px-8 py-8">
      <Header />
      <TypingTest />
    </main>
  );
}

export default App;