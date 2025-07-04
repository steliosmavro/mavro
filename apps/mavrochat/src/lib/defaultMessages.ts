const defaultMarkdownContent = `# Markdown Feature Demo

Welcome to the Markdown Feature Demo! This document showcases various Markdown features, including headers, code blocks, tables, and more.

## Headers

### H1, H2, H3

\`\`\`markdown
# H1 Header
## H2 Header
### H3 Header
\`\`\`

# H1 Header
## H2 Header
### H3 Header

## Code Blocks with Syntax Highlighting

### Python Example

\`\`\`python
def greet(name):
    print(f"Hello, {name}!")

greet("World")
\`\`\`

### JavaScript Example

\`\`\`javascript
import { Checkbox } from "@/components/ui/checkbox"

function greet(name) {
    console.log(\`Hello, \${name}!\`);
}

greet("World");
\`\`\`

### CSS Example

\`\`\`css
body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f9;
}
\`\`\`

## Inline Code

Use inline code with \`backticks\` to highlight code within a sentence, like \`print("Hello, World!")\` in Python.

## Tables

Here's a table with multiple columns and rows:

| Name     | Age | Occupation |
|----------|-----|------------|
| Alice    | 30  | Engineer   |
| Bob      | 25  | Designer   |
| Charlie  | 35  | Teacher    |

## Text Formatting

- **Bold** text is created with \`**double asterisks**\`.
- *Italic* text is created with \`*single asterisks*\`.
- ~~Strikethrough~~ text is created with \`~~double tildes~~\`.

## Task Lists

- [x] Complete the Markdown demo
- [ ] Review the document
- [ ] Share with the team

## Bullet Points and Numbered Lists

### Bullet Points

- Item 1
- Item 2
  - Sub-item 2.1
  - Sub-item 2.2

### Numbered Lists

1. First item
2. Second item
   1. Sub-item 2.1
   2. Sub-item 2.2

## Blockquotes

> This is a blockquote. Use it to highlight important information or quotes.

## Links

You can include [links](https://www.example.com) in your Markdown documents to direct users to other resources.

---

This concludes the Markdown Feature Demo. Feel free to use this as a reference for creating your own Markdown documents!`;

// Default messages to show when page loads
export const defaultMessages = [
    {
        id: 'demo-user',
        role: 'user' as const,
        content: 'Show me a comprehensive markdown demo with all features',
        parts: [
            {
                type: 'text' as const,
                text: 'Show me a comprehensive markdown demo with all features',
            },
        ],
    },
    {
        id: 'demo-assistant',
        role: 'assistant' as const,
        content: defaultMarkdownContent,
        parts: [{ type: 'text' as const, text: defaultMarkdownContent }],
    },
];
