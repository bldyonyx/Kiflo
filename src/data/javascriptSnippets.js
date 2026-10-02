const javascriptSnippets = [
  {
    code: `const message = "hello, kiflo";`,
    explanation:
      "`const` creates a variable that can't be reassigned. Here, the variable is called `message` and stores a string: a piece of text written between quotes. You can later use `message` anywhere you need that text.",
    concepts: ["const", "variable", "string"],
  },

  {
    code: `const add = (a, b) => a + b;`,
    explanation:
      "This creates an arrow function called `add`. The values `a` and `b` are parameters: inputs given to the function. The expression `a + b` becomes the function's result, so calling `add(2, 3)` would return `5`.",
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
      "`const` creates a variable that can't be reassigned. Here, the variable is called `isReady` and stores the boolean `true`. A boolean can only be `true` or `false`, and is often used to represent a yes/no state in a program.",
    concepts: ["const", "variable", "boolean"],
  },

  {
    code: `const colors = ["blue", "pink", "green"];`,
    explanation:
      "This creates an array called `colors`. An array stores multiple values together in an ordered list. Here, it contains three strings. You could access the first color with `colors[0]`, which would give you `\"blue\"`.",
    concepts: ["const", "array", "string"],
  },

  {
    code: `const doubled = numbers.map((number) => number * 2);`,
    explanation:
      "`map()` goes through every item in the `numbers` array and creates a new array from the results. For each number, the arrow function multiplies it by `2`. If `numbers` were `[1, 2, 3]`, `doubled` would become `[2, 4, 6]`.",
    concepts: ["array", "map", "arrow function"],
  },

  {
    code: `const greeting = \`hello, \${name}!\`;`,
    explanation:
      "This uses a template literal, which is a string written with backticks. `${name}` is interpolation: JavaScript replaces it with the current value of `name`. If `name` were `\"Maya\"`, the result would be `\"hello, Maya!\"`.",
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
      "An `if` statement runs a block of code only when its condition is true. Here, JavaScript checks `isLoggedIn`. If it is `true`, `showDashboard()` is called. If it is `false`, the block is skipped.",
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
      "This creates an arrow function called `getName` that receives a `user` object. `user.name` accesses the object's `name` property, and `return` sends that value back to whoever called the function. For example, a user with the name `\"Maya\"` would return `\"Maya\"`.",
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
      "Arrays use indexes to identify the position of each item. JavaScript starts counting array positions at `0`, so `colors[0]` accesses the first item in the `colors` array and stores it in `firstColor`.",
    concepts: ["array", "index", "variable"],
  },

  {
    code: `const user = {
  name: "Maya",
  level: 3,
};`,
    explanation:
      "This creates an object called `user`. Objects group related information using properties. Here, `name` and `level` are property names, while `\"Maya\"` and `3` are their values. You could read the name later with `user.name`.",
    concepts: ["object", "property", "key", "value"],
  },

  {
    code: `const { name, level } = user;`,
    explanation:
      "This uses object destructuring. Instead of writing `user.name` and `user.level` separately, JavaScript extracts both properties from `user` and creates variables called `name` and `level`.",
    concepts: [
      "object",
      "destructuring",
      "variable",
    ],
  },

  {
    code: `const activeUsers = users.filter((user) => user.active);`,
    explanation:
      "`filter()` checks every item in an array and creates a new array containing only the items that pass a condition. Here, only users whose `active` property is truthy are kept in `activeUsers`.",
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
      "The `length` property tells you how many items are inside an array. Here, JavaScript checks whether `books` contains more than zero items. The comparison produces a boolean, so `hasBooks` will be either `true` or `false`.",
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
      "This uses the ternary operator, a compact way to choose between two values. If `isDark` is true, `theme` becomes `\"dark\"`. Otherwise, it becomes `\"light\"`.",
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
      "The spread operator `...` copies the properties from `user` into a new object. The `online` property is then added or replaced with `true`. This is useful when you want an updated object without directly changing the original one.",
    concepts: [
      "object",
      "spread operator",
      "immutability",
    ],
  },

  {
    code: `const allColors = [...colors, "purple"];`,
    explanation:
      "The spread operator `...colors` copies every item from the `colors` array into a new array. `\"purple\"` is then added at the end. The original `colors` array stays unchanged.",
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
      "A `for...of` loop goes through the values of an iterable such as an array. On each iteration, `color` represents the next item from `colors`, and `console.log()` prints that value.",
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
      "`find()` searches through an array and returns the first item that matches a condition. Here, JavaScript looks for the first user whose `id` is exactly `3`. If no user matches, `find()` returns `undefined`.",
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
      "The optional chaining operator `?.` safely accesses nested properties. If `user` or `profile` is missing, JavaScript stops and returns `undefined` instead of throwing an error while trying to read `name`.",
    concepts: [
      "optional chaining",
      "object",
      "undefined",
    ],
  },

  {
    code: `const data = await fetchData();`,
    explanation:
      "`await` pauses the current async function until a promise settles. Here, JavaScript waits for `fetchData()` to finish and then stores its resolved value in `data`. `await` is normally used inside an `async` function.",
    concepts: [
      "async",
      "await",
      "promise",
      "asynchronous code",
    ],
  },
];

export default javascriptSnippets;