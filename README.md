# Kindly Monthly Cost Review Tool

Monthly supplier cost price review and decision-making system for Kindly of Brighton.

**Status:** ✅ Production Ready  
**Version:** 1.1 (v1.2 with Google Sheets sync in progress)  
**Live:** https://kindly-cost-review.vercel.app

---

## Features

- **📊 Dashboard** — 7 key metrics at a glance
  - Total products, supplier breakdown, refill exclusions
  - Auto-approvable items, cheaper alternatives found
  
- **✅ Auto-approve Tab** — Batch approve cost updates
  - 583 products with cost changes on current supplier
  - One-button bulk approve (no supplier switching)
  - Shows supplier codes for spot-checking
  
- **💰 Cheaper Alternatives Tab** — Find better suppliers
  - 99 products where different supplier is cheaper
  - Shows both supplier codes and costs
  - Requires individual ✓/✗ decision (no batch for these)
  - Example: FIN Body Wash: Suma £2.30 → Infinity £1.96 (43% saving)
  
- **🚫 Refill Safe** — All refill products excluded
  - 286 refill products identified and removed from review
  
- **📋 Flags Tab** — Products needing manual input
  - Multi-level pack sizes (2 x 8 x 125g)
  - Split-sell products (buy box, sell single)
  - Not in catalogue, discontinued, large drifts
  
- **📥 EPOS Export** — Download CSV in exact EPOS format
  - Only approved products included
  - Cost Price updated, all other fields preserved
  - Ready for Epos Now import

- **📊 Persistent Storage** (v1.2+)
  - Google Sheets integration
  - Monthly decision history
  - Access decisions from any device

---

## Data Sources

| Supplier | Catalogue | Products | Update Frequency |
|----------|-----------|----------|-------------------|
| CLF (PriceTape) | PriceTape_2_.csv | 17,158 | Monthly |
| Suma | Suma-catalogue-listing-MayJune26.csv | 6,697 | Monthly |
| Infinity | invcat2_1__1_.csv | 5,618 | Monthly |

Current EPOS Products: **4,999**  
Products in Review: **1,121** (861 changes + 260 flags)

---

## Monthly Workflow

### Step 1: Generate New Tool
When new catalogues arrive:
```bash
python3 build_tool.py \
  --clf PriceTape_latest.csv \
  --suma Suma-catalogue-latest.csv \
  --infinity invcat2_latest.csv \
  --epos KindlyofBrighton_ProductUpdate_latest.csv
  
# Outputs: kindly_monthly_review_v1.1.html
```

### Step 2: Deploy to Live
```bash
cp kindly_monthly_review_v1.1.html index.html
git add index.html
git commit -m "v1.1: June 2026 (861 changes, 99 alternatives, 260 flags)"
git push origin main

# Vercel auto-deploys in 30 seconds
# Live at: https://kindly-cost-review.vercel.app
```

### Step 3: Review & Decide
1. Open tool in browser
2. Check Dashboard for overview
3. Auto-approve cost updates (batch)
4. Review cheaper alternatives individually
5. Review flags (multi-level packs, discontinued, etc.)
6. Download EPOS CSV

### Step 4: Track Decisions
- Decisions saved to Google Sheet (v1.2+)
- Monthly summary logged
- Audit trail preserved
- Next month: decisions restore automatically

### Step 5: Import to EPOS
1. Download CSV from tool
2. Epos Now → Products → Import
3. Select file
4. Verify + confirm

---

## Architecture

### Frontend
- **Framework:** Vanilla JavaScript (no dependencies)
- **Size:** 1.9MB (includes all supplier data)
- **Storage:** LocalStorage + Google Sheets (v1.2+)
- **Browser:** Chrome, Firefox, Safari, Edge

### Backend
- **Deployment:** Vercel (static HTML)
- **CDN:** Vercel Edge Network
- **Region:** Global (auto)
- **Performance:** <100ms load time

### Data Integration
- **Supplier Catalogues:** CSV upload (monthly)
- **EPOS Export:** CSV input (monthly)
- **Google Sheets:** Persistent decisions (monthly)
- **Version Control:** GitHub (all versions)

---

## File Structure

```
kindly-cost-review/
├── index.html                    (Main tool - 1.9MB)
├── config.js                     (Google Sheets config)
├── README.md                     (This file)
├── .gitignore                    (Ignore env files, node_modules)
├── package.json                  (Meta info, scripts)
└── build/
    └── build_tool.py            (Python script to rebuild from CSVs)
```

---

## Setup Instructions

### Prerequisites
- GitHub account (free)
- Vercel account (free tier sufficient)
- Google Sheet (for persistent storage in v1.2+)
- Python 3.8+ (for rebuilding tool locally)

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/kindly-cost-review.git
cd kindly-cost-review
```

### 2. Configure
Edit `config.js`:
```javascript
GOOGLE_SHEET_ID: 'YOUR_SHEET_ID_FROM_GOOGLE'
```

### 3. Deploy to Vercel
```bash
# Via GitHub: 
# - Go to vercel.com
# - Click "Import Project"
# - Select kindly-cost-review from GitHub
# - Deploy
```

Or via CLI:
```bash
npm install -g vercel
vercel
```

### 4. Set Environment Variables in Vercel
- `GOOGLE_SHEET_ID`: Your Sheet ID
- `GOOGLE_SHEETS_API_KEY`: Your API key (keep secret)

### 5. Done!
- Live at: https://kindly-cost-review.vercel.app
- Bookmark for easy access

---

## Configuration

### Google Sheets Setup (v1.2+)

Create 3 sheets in your Google Sheet:

**Sheet 1: decisions**
```
date_run | product_id | product_name | supplier | supplier_code | decision | 
category | old_cost | new_cost | savings_£ | savings_% | notes
```

**Sheet 2: monthly_summary**
```
run_date | total_changes | auto_approvable | cheaper_alts | flags | 
approved_count | rejected_count | total_savings_£ | avg_saving
```

**Sheet 3: audit_log**
```
version | date_updated | changes | notes
```

Get Sheet ID:
- Open your Google Sheet
- URL: `sheets.google.com/d/{SHEET_ID}/edit`
- Copy the ID and add to `config.js`

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| v1.0 | 2026-06-07 | Initial launch with comparison tool |
| v1.1 | 2026-06-07 | Dashboard, auto-approve, cheaper-alts tabs |
| v1.2 | 2026-06-08 | Google Sheets sync, persistent decisions |

---

## Performance Metrics

Current Monthly Run (June 2026):
- **Total EPOS products:** 4,999
- **Products reviewed:** 1,121
- **Cost updates:** 861 (same supplier)
- **Cheaper alternatives:** 99 (supplier switches)
- **Flags requiring input:** 260
- **Potential monthly savings:** £29.55
- **Estimated review time:** 10-15 minutes
- **Time saved per month:** ~10 minutes (vs manual review)

---

## Troubleshooting

### Decisions not saving?
1. Check browser console (F12 → Console)
2. Verify Google Sheet ID in config.js
3. Check Vercel environment variables are set
4. Try clearing browser cache

### Tool not loading?
1. Check Vercel deployment status
2. Try in incognito/private window
3. Check internet connection
4. Check GitHub Actions build log

### EPOS import failing?
1. Verify CSV format matches EPOS template
2. Check for special characters in product names
3. Ensure product IDs are unique
4. Try with smaller batch first (test 10 products)

---

## Support

For issues, questions, or feature requests:

1. Check this README
2. Review Google Sheet for decision history
3. Check GitHub commits (what version is deployed?)
4. Contact: (Add your contact info)

---

## License

Proprietary — Kindly of Brighton internal use only.

---

## Changelog

See `audit_log` sheet in Google Sheet for complete version history and changes.

Last updated: 2026-06-08
