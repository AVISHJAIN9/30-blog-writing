# Security Audit & OWASP Top 10 Mapping

## Vulnerability Analysis & Mitigations
| OWASP Category | Risk in Blog Application | Implemented Mitigation |
|---|---|---|
| **A01: Broken Access Control** | Unauthorized authors editing other users' blogs | `blog.controller.js` validates `blog.author.toString() === req.user.id` before mutating |
| **A02: Cryptographic Failures** | Weak password storage | Passwords hashed using `bcrypt` with work factor 10 |
| **A03: Injection** | NoSQL query injection via malicious payload | Mongoose strict schema casting prevents operator injection (`$gt`, `$ne`) |
| **A07: Identification & Auth** | Credential stuffing & token tampering | Stateless HS256 JWT tokens with expiration verification |
| **A08: Software & Data Integrity** | Compromised third-party media uploads | Uploads validated and transformed strictly through Cloudinary SDK |
