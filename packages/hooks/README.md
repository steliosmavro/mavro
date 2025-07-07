# @repo/hooks

Shared React hooks for the monorepo.

## Installation

This package is automatically available to all apps in the monorepo.

```tsx
import { useMediaQuery, useDebounce, useLocalStorage } from '@repo/hooks';
```

## Available Hooks

### useMediaQuery

Detects if a media query matches.

```tsx
const isMobile = useMediaQuery('(max-width: 768px)');
const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
```

### useDebounce

Debounces a value with a specified delay.

```tsx
const [searchTerm, setSearchTerm] = useState('');
const debouncedSearchTerm = useDebounce(searchTerm, 500);

useEffect(() => {
    // API call with debouncedSearchTerm
}, [debouncedSearchTerm]);
```

### useLocalStorage

Manages localStorage with React state.

```tsx
const [user, setUser, removeUser] = useLocalStorage('user', null);

// Set value
setUser({ name: 'John', email: 'john@example.com' });

// Remove value
removeUser();
```

### useOnClickOutside

Triggers a callback when clicking outside an element.

```tsx
const ref = useRef(null);

useOnClickOutside(ref, () => {
    console.log('Clicked outside!');
});

return <div ref={ref}>Click outside me</div>;
```

### useCopyToClipboard

Copies text to clipboard with status tracking.

```tsx
const { copy, status } = useCopyToClipboard();

const handleCopy = async () => {
    await copy('Text to copy');
};

return (
    <button onClick={handleCopy}>
        {status === 'copied' ? 'Copied!' : 'Copy'}
    </button>
);
```

### useKeyPress

Detects when a specific key is pressed.

```tsx
// Simple key detection
const enterPressed = useKeyPress('Enter');

// With handler and modifiers
useKeyPress(
    'k',
    () => {
        console.log('Cmd+K pressed!');
    },
    { metaKey: true, preventDefault: true },
);
```

### useHighlightTheme

Dynamically loads highlight.js themes based on the current theme.

```tsx
import { useTheme } from 'next-themes';
import { useHighlightTheme } from '@repo/hooks';

function CodeBlock() {
    const { theme, resolvedTheme } = useTheme();
    useHighlightTheme({ theme, resolvedTheme });

    return (
        <pre>
            <code>...</code>
        </pre>
    );
}
```

## Adding New Hooks

1. Create a new file in `src/` with your hook
2. Export it from `src/index.ts`
3. Add documentation above
4. Consider adding tests

## Best Practices

- Hooks should be pure and reusable
- Include proper TypeScript types
- Handle edge cases (SSR, cleanup, etc.)
- Add JSDoc comments for better DX
- Keep hooks focused on a single responsibility
