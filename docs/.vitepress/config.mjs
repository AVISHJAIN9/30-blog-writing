import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Creative Blog Platform',
  description: 'Full-Stack MERN Platform with 3D Spatial Canvas & Kinetic UI',
  appearance: 'dark',
  base: '/',
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/00a-project-analysis' },
      { text: 'Features', link: '/01-features' },
      { text: 'API Reference', link: '/03-api-reference' },
      { text: 'System Design', link: '/system-design/README' },
      { text: 'Interview Q&A', link: '/09-interview-qa' }
    ],
    sidebar: [
      {
        text: 'Overview',
        items: [
          { text: 'Project Type Pre-Check', link: '/00-project-type' },
          { text: 'Full Project Analysis', link: '/00a-project-analysis' },
          { text: 'Project Pitch', link: '/00b-project-pitch' },
          { text: 'Project Map', link: '/00-project-map' }
        ]
      },
      {
        text: 'Features',
        items: [
          { text: 'Feature Inventory', link: '/01-features' },
          { text: 'F1: 3D Spatial Canvas', link: '/features/F1-3d-interactive-canvas' },
          { text: 'F2: Kinetic Navigation', link: '/features/F2-kinetic-navigation-smoothscroll' },
          { text: 'F3: Story Publishing', link: '/features/F3-rich-draft-publishing' },
          { text: 'F4: Community Graph', link: '/features/F4-comments-notifications-social' },
          { text: 'F5: JWT Authentication', link: '/features/F5-jwt-auth-identity' }
        ]
      },
      {
        text: 'Engineering Deep Dive',
        items: [
          { text: 'Build Order', link: '/02-build-order' },
          { text: 'API Reference', link: '/03-api-reference' },
          { text: 'Tech Comparisons', link: '/04-tech-comparisons' },
          { text: 'Architecture', link: '/05-architecture' },
          { text: 'Security Audit', link: '/06-security' },
          { text: 'Graphics & Asset Pipeline', link: '/07-ai-integration' },
          { text: 'Quality & Operations', link: '/08-quality-and-ops' }
        ]
      },
      {
        text: 'System Design',
        items: [
          { text: 'System Design Index', link: '/system-design/README' },
          { text: '14.1 Requirements & Capacity', link: '/system-design/14.1-requirements-estimation' },
          { text: '14.2 Architecture Styles', link: '/system-design/14.2-architecture-styles' },
          { text: '14.3 Networking & CDN', link: '/system-design/14.3-networking-communication' },
          { text: '14.4 Load Balancing & Scaling', link: '/system-design/14.4-load-balancing-scaling' },
          { text: '14.5 Databases & Storage', link: '/system-design/14.5-databases-storage' },
          { text: '14.6 Caching Strategies', link: '/system-design/14.6-caching' },
          { text: '14.7 Messaging & Queues', link: '/system-design/14.7-messaging-queues' },
          { text: '14.8 Concurrency & Consistency', link: '/system-design/14.8-consistency-concurrency' },
          { text: '14.9 Reliability & Resilience', link: '/system-design/14.9-reliability-resilience' },
          { text: '14.10 API Design & Limiting', link: '/system-design/14.10-api-design-rate-limiting' },
          { text: '14.11 Security Architecture', link: '/system-design/14.11-security-architecture' },
          { text: '14.12 Search & GPU Pipeline', link: '/system-design/14.12-search-ai-architecture' },
          { text: '14.13 Real-Time Systems', link: '/system-design/14.13-real-time-systems' },
          { text: '14.14 Observability & Ops', link: '/system-design/14.14-observability-operations' },
          { text: '14.15 Performance Engineering', link: '/system-design/14.15-performance-engineering' },
          { text: '14.16 Cost & Trade-offs', link: '/system-design/14.16-cost-tradeoffs' },
          { text: '14.17 Classic System Design', link: '/system-design/14.17-classic-system-design' },
          { text: 'Decisions Log', link: '/system-design/decisions' }
        ]
      },
      {
        text: 'Interview & Readiness',
        items: [
          { text: 'Interview Q&A (150+)', link: '/09-interview-qa' },
          { text: 'Gaps & Improvements', link: '/10-gaps-and-improvements' },
          { text: 'Technical Glossary', link: '/11-glossary' },
          { text: 'Developer Confirm List', link: '/12-confirm-list' },
          { text: 'Master Checklist (275)', link: '/13-master-checklist' },
          { text: 'Say It Out Loud Scripts', link: '/14-say-it-out-loud' }
        ]
      }
    ],
    search: {
      provider: 'local'
    }
  }
})
