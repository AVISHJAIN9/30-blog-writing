# Interview Preparation: 150+ Questions & Answers

## Category 1: Project Overview & Core Architecture
1. **Can you give a 60-second summary of this project?**
   - It is a creative publishing platform combining React 19, Three.js 3D spatial canvas graphics, and a Node.js/MongoDB REST API. It delivers 60fps kinetic scrolling and physics-based cursor interactions on the frontend, supported by a secure JWT-authenticated publishing workflow with Cloudinary asset optimization on the backend.
2. **What inspired the inclusion of Three.js in a blogging platform?**
   - Traditional blogs feel static and uninspiring. By adding a lightweight, interactive 3D hero canvas, readers are greeted with an engaging visual experience that elevates technical storytelling without sacrificing reading speed.
3. **How do you ensure Three.js does not degrade page load performance?**
   - The Three.js canvas is initialized asynchronously after primary DOM content mounts, using low polygon geometry and dynamic LOD (level-of-detail) to keep CPU and GPU overhead minimal.

## Category 2: Frontend Engineering & Kinetics
4. **How does Lenis smooth scroll work under the hood?**
   - It intercepts the browser's native `wheel` and `touchmove` events, calculates a smoothed target position using a custom cubic easing equation inside a `requestAnimationFrame` loop, and updates the scroll position continuously.
5. **Why did you use React Three Fiber instead of raw Three.js?**
   - R3F allows Three.js objects to be expressed as declarative React components. This enables automatic cleanup on unmount, straightforward state-to-mesh prop binding, and cleaner lifecycle management.
6. **How do the magnetic buttons work?**
   - The magnetic component measures the bounding box of the element via `getBoundingClientRect()`. On mouse move, it computes the delta vector between the pointer and the element's center point, applying a damped spring transform via GSAP.

## Category 3: Backend, Database & Security
7. **Why did you choose MongoDB over PostgreSQL?**
   - Editorial articles have variable schemas (diverse tags, rich text blocks, dynamic cover formats). MongoDB's document model represents these hierarchies naturally without requiring multi-table joins.
8. **How do you prevent NoSQL injection?**
   - Mongoose schemas enforce strict type validation. Any unexpected query operators like `{ $gt: '' }` are stripped or rejected before reaching the database driver.
9. **How are passwords stored securely?**
   - They are salted and hashed using bcrypt with an adaptive work factor of 10 rounds, ensuring resistance against rainbow table attacks and brute-force cracking.
