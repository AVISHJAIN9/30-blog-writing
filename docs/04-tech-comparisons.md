# Tech Choice Comparisons

## 1. 3D Graphics Engine: Three.js + React Three Fiber vs Plain WebGL vs Babylon.js vs Spline
| Criteria | Three.js + R3F (Chosen) | Plain WebGL | Babylon.js | Spline |
|---|---|---|---|---|
| React Integration | Native JSX Scene Graph | Manual Canvas Hooks | Wrapper Required | Iframe / Web Component |
| Bundle Overhead | ~150KB gzipped | Zero (browser native) | ~300KB gzipped | Hosted runtime |
| Learning Curve | Moderate | Extremely Steep | Moderate | Very Low |
| Shader Customization | Full ShaderMaterial support | Raw GLSL | Full Material Engine | Proprietary editor only |

**Why Chosen**: R3F brings Three.js into the declarative React 19 component lifecycle, allowing spatial meshes to react directly to application state while maintaining 60fps rendering.

## 2. Smooth Scrolling: Lenis vs Locomotive Scroll vs Native CSS Scroll-Behavior
| Criteria | Lenis (Chosen) | Locomotive Scroll | Native CSS Smooth Scroll |
|---|---|---|---|
| Performance | 60fps RAF loop | Can cause scroll jank | Native C++ browser engine |
| Custom Momentum | Fully configurable cubic easing | Heavy DOM hijacking | None |
| Accessibility | Auto-disables on reduced-motion | Requires custom code | Native compliance |
| Bundle Size | < 4KB | > 20KB | 0KB |

**Why Chosen**: Lenis preserves native browser scroll physics while applying lightweight, non-intrusive momentum easing without breaking keyboard accessibility.

## 3. Database: MongoDB / Mongoose vs PostgreSQL vs Firebase Firestore
| Criteria | MongoDB (Chosen) | PostgreSQL | Firebase Firestore |
|---|---|---|---|
| Data Model | Flexible BSON Documents | Relational Tables | Hierarchical Documents |
| Rich Content Fit | Exceptional (nested tags/JSON) | Good with JSONB | Good |
| Scaling | Built-in horizontal sharding | Read replicas & Citus | Auto-managed serverless |
| Vendor Lock-in | Low (open source engine) | Zero (open source standard)| High (Google proprietary) |

**Why Chosen**: Editorial articles frequently change schema (new metadata, interactive blocks, multi-tier tags), making MongoDB's flexible schema ideal.
