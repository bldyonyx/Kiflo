const javascriptSnippets = [
  {
    code: `const message = "hello, kiflo";`,
    explanation:
      "Creates a constant called message and stores the string \"hello, kiflo\" inside it.",
    concepts: ["const", "variable", "string"],
  },

  {
    code: `const add = (a, b) => a + b;`,
    explanation:
      "Creates an arrow function called add. It takes two values and returns their sum.",
    concepts: ["const", "arrow function", "parameters", "return value"],
  },

  {
    code: `const isReady = true;`,
    explanation:
      "Creates a constant called isReady and gives it the boolean value true.",
    concepts: ["const", "variable", "boolean"],
  },

  {
    code: `const colors = ["blue", "pink", "green"];`,
    explanation:
      "Creates an array called colors containing three strings.",
    concepts: ["const", "array", "string"],
  },

  {
    code: `const doubled = numbers.map((number) => number * 2);`,
    explanation:
      "Uses map() to create a new array where every value from numbers is multiplied by two.",
    concepts: ["array", "map", "arrow function"],
  },

  {
    code: `const greeting = \`hello, \${name}!\`;`,
    explanation:
      "Creates a template literal and inserts the value of name directly into the string.",
    concepts: ["const", "template literal", "interpolation"],
  },

  {
    code: `if (isLoggedIn) {
  showDashboard();
}`,
    explanation:
      "Checks whether isLoggedIn is true. If it is, the showDashboard function is called.",
    concepts: ["if statement", "condition", "function call"],
  },

  {
    code: `const getName = (user) => {
  return user.name;
};`,
    explanation:
      "Creates an arrow function that receives a user object and returns its name property.",
    concepts: ["arrow function", "object", "property", "return"],
  },
];

export default javascriptSnippets;