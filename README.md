# My Project
npm run build && npm start to launch 
## Preface

I usually work on private repositories and don't get the chance to commit much of the stuff I'm learning. But here I am, unveiling this project to showcase some of the architectural models and techniques I've gained from my experience in the industry. This project is like a sandbox for me to try out a blend of technologies that are not entirely smooth in terms of integration—yet. 

## Design Philosophy

When it comes to design I've drawn inspiration from several architectural styles, such as Ports and Adapters, DDD (Domain-Driven Design), and so on. The idea is to keep the UI as pure as possible while the entities take care of the heavy lifting. 

## Tech Stack

Here's what I'm working with:

- **Inversify**: For dependency inversion.
- **React Query**: To handle client-side caching.
- **Next.js**: Mostly because  React, but also for its handy API proxy feature.

## API

I'm using the RAWG Games API for now. Currently, the project architecture is quite general and is gradually going to be spiced up with new features. Right now, there's just a simple "Get All Games" listing.

## Why Proxy with Next.js?

Good question! The RAWG Games API key is exposed on the client side, which is a no-go. So I've set up a Next.js API proxy to keep that safely tucked away.

## Code Example: Simple UI Structuring with Hooks

Here's a snippet showing how I'm using hooks like `useMutableEntity` to simplify UI structuring.

```jsx
<Input
  type="text"
  value={name}
  onChange={(e) => {
    user.changeName(e.target.value);
    mutate();
  }}
/>

In this example, path is an entity that has its tests separate from the UI layer.

## Testing
The project structure is highly testable. I've made sure that everything from entities to UI components can be tested in isolation.
What's Next?

I'll be incrementally adding more features.

