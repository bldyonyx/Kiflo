
const javascriptSnippets = [
  {
    code: `const message = "hello, kiflo";`,
    explanation:
      "`const` creates a variable that can't be reassigned. Here, `message` stores a string: a piece of text written between quotes.",
    concepts: ["const", "variable", "string"],
  },

  {
    code: `const add = (a, b) => a + b;`,
    explanation:
      "This creates an arrow function called `add`. The values `a` and `b` are parameters, and their sum becomes the return value.",
    concepts: [
      "const",
      "arrow function",
      "parameters",
      "return value",
    ],
  },

  {
    code: `const isReady = true;`,
    explanation:
      "`isReady` stores a boolean. A boolean is either `true` or `false` and commonly represents a yes/no state.",
    concepts: ["const", "variable", "boolean"],
  },

  {
    code: `const colors = ["blue", "pink", "green"];`,
    explanation:
      "An array stores multiple values in an ordered list. `colors[0]` accesses the first item, which is `\"blue\"`.",
    concepts: ["const", "array", "string"],
  },

  {
    code: `const doubled = numbers.map((number) => number * 2);`,
    explanation:
      "`map()` creates a new array by transforming each item. Here, each number is multiplied by two.",
    concepts: ["array", "map", "arrow function"],
  },

  {
    code: "const greeting = `hello, ${name}!`;",
    explanation:
      "A template literal uses backticks and `${}` to insert values into strings. The variable `name` is interpolated into the greeting.",
    concepts: [
      "const",
      "template literal",
      "interpolation",
    ],
  },

  {
    code: `if (isLoggedIn) {
  showDashboard();
}`,
    explanation:
      "An `if` statement executes its block only when the condition is truthy. Here, the dashboard is shown when the user is logged in.",
    concepts: [
      "if statement",
      "condition",
      "function call",
    ],
  },

  {
    code: `const getName = (user) => {
  return user.name;
};`,
    explanation:
      "This arrow function accepts a user object and returns its `name` property.",
    concepts: [
      "arrow function",
      "object",
      "property",
      "return",
    ],
  },

  {
    code: `const firstColor = colors[0];`,
    explanation:
      "Array indexes start at zero. `colors[0]` retrieves the first item.",
    concepts: ["array", "index", "variable"],
  },

  {
    code: `const user = {
  name: "Maya",
  level: 3,
};`,
    explanation:
      "An object groups related values using named properties. Here, the properties are `name` and `level`.",
    concepts: ["object", "property", "key", "value"],
  },

  {
    code: `const { name, level } = user;`,
    explanation:
      "Object destructuring extracts properties into variables with matching names.",
    concepts: [
      "object",
      "destructuring",
      "variable",
    ],
  },

  {
    code: `const activeUsers = users.filter((user) => user.active);`,
    explanation:
      "`filter()` creates a new array containing only the users whose `active` property is truthy.",
    concepts: [
      "array",
      "filter",
      "arrow function",
      "condition",
    ],
  },

  {
    code: `const hasBooks = books.length > 0;`,
    explanation:
      "The `length` property gives the number of items in an array. The comparison returns a boolean.",
    concepts: [
      "array",
      "length",
      "comparison",
      "boolean",
    ],
  },

  {
    code: `const theme = isDark ? "dark" : "light";`,
    explanation:
      "The ternary operator chooses between two values based on a condition.",
    concepts: [
      "ternary operator",
      "condition",
      "boolean",
    ],
  },

  {
    code: `const updatedUser = {
  ...user,
  online: true,
};`,
    explanation:
      "Object spread copies properties into a new object. The `online` property is then added or overwritten.",
    concepts: [
      "object",
      "spread operator",
      "immutability",
    ],
  },

  {
    code: `const allColors = [...colors, "purple"];`,
    explanation:
      "Array spread copies the existing colors into a new array, then adds `purple` without changing the original array.",
    concepts: [
      "array",
      "spread operator",
      "immutability",
    ],
  },

  {
    code: `for (const color of colors) {
  console.log(color);
}`,
    explanation:
      "A `for...of` loop iterates over array values and logs each color.",
    concepts: [
      "for...of",
      "loop",
      "array",
      "console",
    ],
  },

  {
    code: `const foundUser = users.find((user) => user.id === 3);`,
    explanation:
      "`find()` returns the first item matching a condition, or `undefined` if nothing matches.",
    concepts: [
      "array",
      "find",
      "strict equality",
      "undefined",
    ],
  },

  {
    code: `const username = user?.profile?.name;`,
    explanation:
      "Optional chaining safely accesses nested properties. If an intermediate value is missing, the expression returns `undefined`.",
    concepts: [
      "optional chaining",
      "object",
      "undefined",
    ],
  },

  {
    code: `const data = await fetchData();`,
    explanation:
      "`await` waits for a promise to settle. It is normally used inside an async function.",
    concepts: [
      "async",
      "await",
      "promise",
      "asynchronous code",
    ],
  },

  // Medium snippets

  {
    code: `const getCompletedTasks = (tasks) => {
  return tasks
    .filter((task) => task.completed)
    .map((task) => ({
      id: task.id,
      title: task.title,
    }));
};`,
    explanation:
      "This function combines `filter()` and `map()`. First, it selects completed tasks. Then, it transforms each task into a smaller object containing only its ID and title. Both methods return new arrays without modifying the original tasks.",
    concepts: [
      "array",
      "filter",
      "map",
      "arrow function",
      "object",
    ],
  },

  {
    code: `function validateUsername(username) {
  const trimmed = username.trim();

  if (trimmed.length < 3) {
    return false;
  }

  return trimmed.length <= 20;
}`,
    explanation:
      "This function validates a username. `trim()` removes whitespace from the beginning and end. The first condition rejects names shorter than three characters, while the final comparison accepts names of at most twenty characters.",
    concepts: [
      "function",
      "string",
      "trim",
      "validation",
      "return",
    ],
  },

  {
    code: `const calculateTotal = (items) => {
  const subtotal = items.reduce(
    (sum, item) => sum + item.price,
    0
  );

  const tax = subtotal * 0.08;

  return subtotal + tax;
};`,
    explanation:
      "This function uses `reduce()` to add item prices together. It starts from zero and accumulates each price. The function then calculates an 8% tax and returns the total including tax.",
    concepts: [
      "array",
      "reduce",
      "accumulator",
      "arithmetic",
      "return",
    ],
  },

  // Long snippets

  {
    code: `async function loadBooks(query) {
  const search = query.trim();

  if (!search) {
    return [];
  }

  try {
    const params = new URLSearchParams({
      q: search,
      maxResults: "10",
    });

    const response = await fetch(
      "https://www.googleapis.com/books/v1/volumes?" +
        params.toString()
    );

    if (!response.ok) {
      throw new Error("Search failed");
    }

    const data = await response.json();

    return (data.items ?? []).map((item) => ({
      id: item.id,
      title: item.volumeInfo?.title ?? "Untitled",
      authors: item.volumeInfo?.authors ?? [],
    }));
  } catch (error) {
    console.error("Unable to load books:", error);
    return [];
  }
}`,
    explanation:
      "This asynchronous function searches for books using the Google Books API. It validates the query, builds URL parameters, sends an HTTP request and checks the response. Optional chaining and nullish coalescing provide fallback values for missing metadata. The catch block handles errors and returns an empty array.",
    concepts: [
      "async/await",
      "fetch",
      "API",
      "try/catch",
      "optional chaining",
      "map",
    ],
  },

  {
    code: `function organizeTasks(tasks) {
  const groups = {
    pending: [],
    completed: [],
  };

  for (const task of tasks) {
    if (task.completed) {
      groups.completed.push(task);
    } else {
      groups.pending.push(task);
    }
  }

  const sortByTitle = (a, b) => {
    return a.title.localeCompare(b.title);
  };

  groups.pending.sort(sortByTitle);
  groups.completed.sort(sortByTitle);

  return {
    ...groups,
    total: tasks.length,
    completedCount: groups.completed.length,
    pendingCount: groups.pending.length,
  };
}`,
    explanation:
      "This function organizes tasks into pending and completed groups. A `for...of` loop assigns each task to the correct array. Both arrays are sorted alphabetically with `localeCompare()`. The returned object includes the groups and their counts. The arrays are new, although the task objects inside them are shared with the input.",
    concepts: [
      "function",
      "for...of",
      "condition",
      "sort",
      "localeCompare",
      "object spread",
    ],
  },

  {
    code: `function createReadingSummary(books) {
  const finished = books.filter(
    (book) => book.status === "finished"
  );

  const ratings = finished
    .map((book) => book.rating)
    .filter((rating) => typeof rating === "number");

  const totalRating = ratings.reduce(
    (sum, rating) => sum + rating,
    0
  );

  const averageRating =
    ratings.length > 0
      ? totalRating / ratings.length
      : 0;

  const genres = finished.flatMap(
    (book) => book.genres ?? []
  );

  const uniqueGenres = [...new Set(genres)];

  return {
    booksRead: finished.length,
    averageRating: Number(averageRating.toFixed(1)),
    favoriteGenres: uniqueGenres,
    hasFinishedBooks: finished.length > 0,
  };
}`,
    explanation:
      "This function builds a reading summary from a list of books. It filters completed books, extracts numeric ratings and calculates their average. `flatMap()` combines genre arrays, while `Set` removes duplicate genres. Finally, it returns an object containing the number of finished books, the average rating, the unique genres and a boolean indicating whether any books have been finished.",
    concepts: [
      "filter",
      "map",
      "reduce",
      "flatMap",
      "Set",
      "ternary operator",
      "object",
    ],
  },
];

export default javascriptSnippets;
