# UI Components Documentation

This package contains shared UI components used across the monorepo applications.

## Installation

Components are automatically available to apps within the monorepo. No additional installation needed.

## Usage

All components are now organized by category but can still be imported from the main components export:

```typescript
// Import from main export (recommended)
import { Button, Card, Input } from '@repo/ui/components';

// Or import from specific categories
import { Button, Input } from '@repo/ui/components/form';
import { Card, Badge } from '@repo/ui/components/display';
```

## Components

### Layout Components

#### Header

A responsive header component with customizable content.

```tsx
<Header className="bg-background">
    <nav>Navigation content</nav>
</Header>
```

Props:

- `children`: React.ReactNode
- `className?`: string

#### ElementHeightObserver

Observes element height and sets CSS custom properties.

```tsx
<ElementHeightObserver selector="header" cssVar="--header-height" />
```

Props:

- `selector`: string - CSS selector for the element to observe
- `cssVar`: string - CSS custom property name to set

### Interactive Components

#### Button

A versatile button component with multiple variants.

```tsx
<Button variant="default" size="md" asChild>
    <a href="/link">Click me</a>
</Button>
```

Props:

- `variant?`: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
- `size?`: 'default' | 'sm' | 'lg' | 'icon'
- `asChild?`: boolean - Use with Radix UI's Slot for composability

#### ThemeToggle

Toggle between light and dark themes.

```tsx
<ThemeToggle />
```

No props - uses theme context internally.

### Data Display

#### Card

Container component for grouped content.

```tsx
<Card>
    <CardHeader>
        <CardTitle>Title</CardTitle>
        <CardDescription>Description</CardDescription>
    </CardHeader>
    <CardContent>Content</CardContent>
    <CardFooter>Footer</CardFooter>
</Card>
```

#### Badge

Display labels and tags.

```tsx
<Badge variant="default">New</Badge>
```

Props:

- `variant?`: 'default' | 'secondary' | 'destructive' | 'outline'

#### Avatar

User avatar with fallback support.

```tsx
<Avatar>
    <AvatarImage src="/avatar.jpg" alt="User" />
    <AvatarFallback>JD</AvatarFallback>
</Avatar>
```

### Form Components

#### Input

Text input field with consistent styling.

```tsx
<Input type="text" placeholder="Enter text..." className="w-full" />
```

Extends standard HTML input attributes.

#### Textarea

Multi-line text input.

```tsx
<Textarea placeholder="Enter message..." rows={4} />
```

Extends standard HTML textarea attributes.

#### Select

Dropdown selection component.

```tsx
<Select>
    <SelectTrigger>
        <SelectValue placeholder="Select option" />
    </SelectTrigger>
    <SelectContent>
        <SelectItem value="1">Option 1</SelectItem>
        <SelectItem value="2">Option 2</SelectItem>
    </SelectContent>
</Select>
```

### Feedback Components

#### Skeleton

Loading placeholder component.

```tsx
<Skeleton className="h-4 w-[250px]" />
```

Props:

- `className?`: string

#### Progress

Progress indicator.

```tsx
<Progress value={33} max={100} />
```

Props:

- `value?`: number
- `max?`: number

### Navigation

#### Tabs

Tabbed interface component.

```tsx
<Tabs defaultValue="tab1">
    <TabsList>
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
    </TabsList>
    <TabsContent value="tab1">Content 1</TabsContent>
    <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>
```

### Utility Components

#### ThemeProvider

Provides theme context to child components.

```tsx
<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    {children}
</ThemeProvider>
```

Props:

- `attribute?`: 'class' | 'data-theme'
- `defaultTheme?`: 'light' | 'dark' | 'system'
- `enableSystem?`: boolean
- `disableTransitionOnChange?`: boolean

#### LogoButton

Themed logo button that switches based on theme.

```tsx
<LogoButton
    lightLogoSrc="/light-logo.svg"
    darkLogoSrc="/dark-logo.svg"
    href="/"
/>
```

Props:

- `lightLogoSrc`: string
- `darkLogoSrc`: string
- `href?`: string
- `className?`: string

## Styling

All components use Tailwind CSS classes and can be customized using the `className` prop. Components follow the design system defined in the global CSS files.

## Accessibility

Components are built with accessibility in mind:

- Proper ARIA labels
- Keyboard navigation support
- Screen reader compatibility
- Focus management

## Best Practices

1. **Use semantic HTML**: Components render appropriate HTML elements
2. **Compose with `asChild`**: Many components support the `asChild` prop for flexibility
3. **Theme-aware**: Components automatically adapt to the current theme
4. **Responsive**: Components are mobile-first and responsive by default

## Adding New Components

To add a new shadcn/ui component:

```bash
cd packages/ui
npx shadcn@latest add [component-name]
```

Then export it from the appropriate barrel file.
