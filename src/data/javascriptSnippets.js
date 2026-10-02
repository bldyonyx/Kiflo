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
];

export default javascriptSnippets;