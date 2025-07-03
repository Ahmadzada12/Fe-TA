# 🚀 Quick Backend Prompt - Dynamic Donor Count

## Copy Paste ke Copilot:

```
Add dynamic donor count to crowdfunding platform. Need 2 changes:

1. UPDATE existing findAll() method - add totalDonors field per campaign:
- Count unique userId from donations where status='SUCCESS'
- Add totalDonors: uniqueDonors.size to each campaign response
- Maintain existing response format

2. ADD new endpoint GET /crowdfounding/statistics:
- totalDonors: unique users across ALL campaigns (prevent double counting)
- activeCampaigns: published campaigns not expired
- totalRaised: sum successful donations
- successRate: % campaigns reaching target

Use Prisma groupBy for efficiency. Current schema has Campaign->Donation relationship. Response format: { data, message: 'success' }
```

## Expected Results:

**Campaign Response (Enhanced):**

```json
{
  "data": [
    {
      "id": "123",
      "title": "Campaign Title",
      "donationTarget": 10000000,
      "donationCollected": 5000000,
      "totalDonors": 25,
      "statusDonasi": "published"
    }
  ],
  "message": "success"
}
```

**Statistics Response (New):**

```json
{
  "data": {
    "totalDonors": 150,
    "activeCampaigns": 25,
    "totalRaised": 500000000,
    "successRate": 75
  },
  "message": "success"
}
```

## Test Command:

```bash
# After implementation
curl http://localhost:3001/v1/crowdfounding/statistics
```
