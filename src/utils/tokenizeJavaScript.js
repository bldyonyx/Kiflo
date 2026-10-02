import Prism from "prismjs";
import "prismjs/components/prism-javascript";

function flattenToken(token, inheritedType = null) {
  if (typeof token === "string") {
    return [...token].map((character) => ({
      character,
      type: inheritedType,
    }));
  }

  const type = token.type || inheritedType;
  const content = token.content;

  if (Array.isArray(content)) {
    return content.flatMap((child) =>
      flattenToken(child, type)
    );
  }

  return flattenToken(content, type);
}

function tokenizeJavaScript(code) {
  const tokens = Prism.tokenize(
    code,
    Prism.languages.javascript
  );

  return tokens.flatMap((token) => flattenToken(token));
}

export default tokenizeJavaScript;