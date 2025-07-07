# @repo/ui

Shared React component library using shadcn/ui components.

## Usage

```bash
# Install in your app/package
npm install @repo/ui
```

```tsx
import { Button, Card, Input } from '@repo/ui';

export function MyComponent() {
    return (
        <Card>
            <Input placeholder="Enter text..." />
            <Button>Click me</Button>
        </Card>
    );
}
```

## Adding New Components

To add shadcn/ui components to this library:

```bash
# Navigate to the app that will use the component
cd apps/mavrochat  # or apps/mavrodev

# Add components (they'll be auto-placed in packages/ui)
npx shadcn@latest add dialog toast alert
```

**Important**: Always run the shadcn CLI from an app directory, not from packages/ui.

## Available Components

Check `src/components/` for all available components. Common ones include:

- `Button` - Primary interactive element
- `Card` - Container with padding and border
- `Input` - Form input field
- `Label` - Form label
- `Select` - Dropdown selector
- `Badge` - Status indicators

## Development Guidelines

- **Location**: Components go in `src/components/`
- **Styles**: Global styles in `src/styles/globals.css`
- **Exports**: All components must be exported from `src/index.ts`
- **Naming**: Follow shadcn/ui conventions (PascalCase)
- **Props**: Extend HTML element props when appropriate

## Customization

Components use CSS variables for theming. Override in your app's CSS:

```css
:root {
    --primary: 222.2 47.4% 11.2%;
    --radius: 0.5rem;
}
```

See `src/styles/globals.css` for all available CSS variables.
