# SwiftHaul Logistics — Automated CI/CD Pipeline

**Live demo:** https://dlgbl7dwmay8u.cloudfront.net/

---

## The Problem

SwiftHaul's ops team was manually deploying their tracking dashboard on every release — SSH into a server, pull the latest code, run the build, hope nothing breaks. One bad deploy at 6pm meant drivers couldn't see their routes.

Manual deployments are ClickOps. No repeatability, no audit trail, no rollback — just human error waiting to happen.

## The Solution

A fully automated CI/CD pipeline using GitHub Actions, AWS S3, and CloudFront. Every push to `main` triggers a verified, zero-touch deployment. What previously took 20+ minutes of manual work now completes in under 30 seconds.

---

## Architecture

```
Git push to main
       │
       ▼
GitHub Actions triggered
       │
       ├── OIDC authentication → AWS (no static credentials)
       ├── Cache restore (node_modules + build output)
       ├── npm ci + npm run build
       ├── aws s3 sync dist/ → S3 bucket (eu-west-2)
       └── CloudFront invalidation → site live instantly
```

---

## Key Technical Decisions

### OIDC Authentication — no static AWS keys
Instead of storing long-lived IAM access keys as GitHub secrets, the pipeline uses OpenID Connect (OIDC) federated identity. GitHub Actions requests a short-lived token from AWS STS at runtime, scoped specifically to this repository and branch. No credentials to rotate, no risk of key leakage.

### Least-Privilege IAM Role
The IAM role assumed by the pipeline has exactly three permissions:
- `s3:PutObject` / `s3:DeleteObject` / `s3:ListBucket` — scoped to this bucket only
- `cloudfront:CreateInvalidation` — scoped to this distribution only

Nothing more.

### Dual Caching Strategy
Two independent cache layers reduce pipeline runtime:
- **node_modules cache** — keyed on `package-lock.json`. Skips reinstalling 150+ packages on unchanged dependencies.
- **Build cache** — keyed on `src/**`. Skips rebuilding on config/docs-only commits.

### CloudFront Invalidation
Cache invalidation is part of the deploy step, not an afterthought. Every deployment flushes `/*` ensuring users always receive the latest build — no stale assets served from edge locations.

---

## Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite |
| Hosting | AWS S3 (eu-west-2) |
| CDN | AWS CloudFront |
| CI/CD | GitHub Actions |
| Auth | OIDC + AWS STS |
| IaC | IAM (least-privilege inline policy) |

---

## Pipeline Performance

| Metric | Before (manual) | After (automated) |
|---|---|---|
| Deploy time | 20+ minutes | ~25 seconds |
| Human steps | 8+ | 0 |
| Audit trail | None | Full Git history |
| Credential exposure risk | High | None (OIDC) |

---

## Repository Structure

```
swifthaulapp/
├── .github/
│   └── workflows/
│       └── deploy.yml        # CI/CD pipeline definition
├── src/
│   ├── App.jsx               # Main React component
│   └── App.css               # Styling
├── public/                   # Static assets
├── dist/                     # Build output (auto-generated, not committed)
└── package.json
```

---

## Running Locally

```bash
git clone https://github.com/naheem1/swifthaul-logistics.git
cd swifthaul-logistics
npm install
npm run dev
```

Visit `http://localhost:5173`

---

## Author

**Naheem** — Cloud Engineer  
AWS Certified (SAA-C03, SysOps Associate)  
[LinkedIn](https://www.linkedin.com/in/naheem-afsar-8839193b2/) · [GitHub](https://github.com/naheem1)