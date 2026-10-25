# Gaps & Engineering Roadmap

## Identified Gaps & Upgrades
1. **Automated End-to-End Testing**: Integrate Playwright to automate end-to-end tests for author login, draft creation, and 3D canvas mounting.
2. **Redis Caching Tier**: Implement Redis cache-aside for high-frequency article read queries to reduce MongoDB read IOPS.
3. **Draft Auto-Save via WebSockets**: Enhance the draft editor with real-time WebSocket auto-save to prevent data loss during network interruptions.
