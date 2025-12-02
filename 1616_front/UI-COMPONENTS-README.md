# 16:16 Agency UI Components

This is a comprehensive UI component system built for the 16:16 marketing agency website, based on the design from the reference HTML file. The system includes TypeScript interfaces, JSON schemas, and React components that follow the design system principles.

## 📁 Project Structure

```
components/
├── ui/                    # Core UI components
│   ├── Button.tsx        # Reusable button component
│   ├── Navigation.tsx    # Main navigation component
│   ├── Hero.tsx          # Hero section component
│   ├── Card.tsx          # Universal card component
│   ├── Section.tsx       # Section wrapper component
│   ├── Form.tsx          # Form component
│   ├── Footer.tsx        # Footer component
│   └── index.ts          # Export file
├── common/               # Common layout components
│   └── AgencyLayout.tsx  # Main layout wrapper
lib/
├── design-system.ts      # Design system configuration
├── utils.ts             # Utility functions
└── ui-config.json       # UI configuration file
types/
└── ui-components.ts     # TypeScript interfaces
```

## 🎨 Design System

### Colors
- **Primary**: `#1a1a2e` (Dark blue)
- **Secondary**: `#0066cc` (Blue)
- **Accent**: `#d4a853` (Gold)
- **Background**: Light gray, white, and gray variants
- **Text**: Dark, gray, and muted variants

### Typography
- **Primary**: DM Sans (sans-serif)
- **Serif**: Playfair Display (for headings)
- **Sizes**: Hero, section, heading, subheading, body, small

### Components
All components follow the design system with consistent:
- Spacing
- Border radius
- Shadows
- Transitions
- Responsive breakpoints

## 🚀 Usage Examples

### Basic Button
```tsx
import { Button } from '@/components/ui'

<Button
  variant="primary"
  size="md"
  text="Get Started"
  href="/contact"
  icon="🚀"
  onClick={() => console.log('Clicked')}
/>
```

### Navigation
```tsx
import { Navigation } from '@/components/ui'

<Navigation
  logo={{
    src: "/logo.png",
    alt: "16:16",
    height: "40px"
  }}
  links={[
    { text: "About", href: "#about" },
    { text: "Services", href: "#services" }
  ]}
  cta={{
    variant: "primary",
    text: "Get in Touch",
    href: "#contact"
  }}
/>
```

### Hero Section
```tsx
import { Hero } from '@/components/ui'

<Hero
  tag="Full-Service Marketing Agency"
  title="<em>Knock-Knock</em><br>Greatness"
  description="We bring together professionals who are deeply in love with their craft..."
  cta={{
    variant: "primary",
    text: "Start Your Journey",
    href: "#contact"
  }}
  stats={[
    { value: "13+", label: "Years Experience" },
    { value: "5M+", label: "Followers Built" }
  ]}
/>
```

### Card Components

#### Service Card
```tsx
<Card
  type="service"
  title="Strategic Marketing"
  description="Growth planning for rapid scaling with data-driven strategies"
  icon="📈"
/>

#### Package Card
```tsx
<Card
  type="package"
  title="Scale"
  subtitle="Established companies • 6-8 specialists"
  price={{
    amount: "40,000",
    currency: "AED",
    period: "mo"
  }}
  features={[
    "60 pieces of content",
    "Micro + macro influencers",
    "Market research"
  ]}
  featured={true}
  button={{
    variant: "primary",
    text: "Get Started"
  }}
/>
```

#### Case Study Card
```tsx
<Card
  type="case"
  badge={{ text: "Real Estate Tech" }}
  title="PropertyPulse.AI"
  description="AI-powered property analysis platform..."
  stats={[
    { value: "327", label: "Active Users" },
    { value: "#1", label: "Market Position" }
  ]}
/>
```

### Section with Cards
```tsx
<Section
  id="services"
  tag="What We Do"
  title="Core Capabilities"
  subtitle="From strategy to execution—all in-house"
  background="light"
  cards={servicesData}
/>
```

### Form Component
```tsx
import { Form } from '@/components/ui'

<Form
  fields={[
    {
      name: "name",
      type: "text",
      label: "Your Name",
      placeholder: "John Doe",
      required: true
    },
    {
      name: "email",
      type: "email",
      label: "Email Address",
      placeholder: "john@company.com",
      required: true
    }
  ]}
  submit={{
    variant: "primary",
    text: "Send Message"
  }}
  onSubmit={(data) => {
    console.log('Form data:', data)
    // Handle form submission
  }}
/>
```

### Layout Component
```tsx
import { AgencyLayout } from '@/components/common'

<AgencyLayout navigation={navConfig} footer={footerConfig}>
  {/* Your page content */}
</AgencyLayout>
```

## 📋 Configuration

The UI components can be configured using the JSON schema:

### ui-config.json
This file contains all the website content and configuration:

```json
{
  "navigation": {
    "logo": { "src": "logo.png", "alt": "16:16" },
    "links": [
      { "text": "About", "href": "#about" }
    ],
    "cta": {
      "variant": "primary",
      "text": "Get in Touch",
      "href": "#contact"
    }
  },
  "hero": {
    "tag": "Full-Service Marketing Agency",
    "title": "<em>Knock-Knock</em><br>Greatness",
    "description": "..."
  }
}
```

## 🎯 Card Types

The universal Card component supports multiple types:

1. **Service** - Services section cards with icons
2. **Package** - Pricing cards with features and pricing
3. **Case** - Case study cards with badges and stats
4. **Team** - Team member cards with images
5. **Blog** - Blog post cards with metadata
6. **Why** - Why us cards with title and description
7. **Value** - Value proposition cards
8. **Stat** - Statistics display cards

## 🔧 Customization

### Adding New Card Types
1. Add the type to the CardType enum in `types/ui-components.ts`
2. Update the Card component styling in `components/ui/Card.tsx`
3. Add specific interfaces for the new card type

### Modifying Design System
Update the design system configuration in `lib/design-system.ts`:

```typescript
export const colors = {
  primary: '#your-color',
  // ... other colors
}
```

### Responsive Behavior
Components use Tailwind CSS responsive utilities with these breakpoints:
- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px

## 📱 Features

- **Responsive Design**: All components are mobile-first responsive
- **TypeScript**: Full TypeScript support with type safety
- **Accessibility**: Semantic HTML and ARIA attributes
- **Performance**: Optimized with React best practices
- **Customizable**: Easy to extend and customize
- **Consistent**: Unified design system across all components

## 🚀 Getting Started

1. Import the components you need
2. Use the TypeScript interfaces for type safety
3. Configure using the JSON schema
4. Extend the design system as needed

```bash
# Install dependencies
npm install clsx tailwind-merge

# Start development
npm run dev
```

## 📖 Documentation

- **JSON Schema**: `ui-components-schema.json`
- **TypeScript Interfaces**: `types/ui-components.ts`
- **Design System**: `lib/design-system.ts`
- **Configuration**: `lib/ui-config.json`

This component system provides a solid foundation for building the 16:16 agency website with consistent design, type safety, and maintainable code structure.