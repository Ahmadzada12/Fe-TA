# Prompt untuk Backend: Fix Donor Count Logic

Copy paste prompt ini ke GitHub Copilot di backend:

---

## 🎯 Issue: Double Counting in Donor Statistics

I have a donor counting issue in my crowdfunding platform. Currently:

**Problem:**

- Each campaign correctly counts unique donors per campaign ✅
- Homepage sums totalDonors from all campaigns ❌
- Result: Same user donating to multiple campaigns gets counted multiple times

**Example:**

```
User A donates to Campaign 1 → Campaign 1: totalDonors = 1
User A donates to Campaign 2 → Campaign 2: totalDonors = 1
Homepage shows: 1 + 1 = 2 donors (WRONG!)
Should show: 1 unique donor (CORRECT!)
```

## 🔧 Solution Needed

Add a **statistics endpoint** that counts **global unique donors** across all campaigns.

### Database Schema Context:

```prisma
model Campaign {
  id               String     @id @default(cuid())
  title            String
  donationTarget   Int
  donationCollected Int
  statusDonasi     String
  donations        Donation[]
}

model Donation {
  id         String   @id @default(cuid())
  userId     String
  campaignId String
  amount     Int
  status     String   // 'SUCCESS', 'PENDING', 'FAILED'
  campaign   Campaign @relation(fields: [campaignId], references: [id])
  user       User     @relation(fields: [userId], references: [id])
}
```

### Required Implementation:

**Add this controller method:**

```typescript
@Get('statistics')
async getStatistics() {
  // Count unique donors across ALL campaigns (not per campaign)
  // Only count successful donations
  // Return global statistics for homepage
}
```

**Expected Response:**

```json
{
  "data": {
    "totalDonors": 150, // ✅ Unique users across all campaigns
    "activeCampaigns": 25, // Published campaigns not expired
    "totalRaised": 500000000, // Sum of all successful donations
    "successRate": 75 // % of campaigns that reached target
  },
  "message": "success"
}
```

### Business Rules:

1. **totalDonors**: Count unique `userId` from ALL successful donations across ALL campaigns
2. **activeCampaigns**: Count published campaigns where `donationFinishedDate > now()`
3. **totalRaised**: Sum all donation amounts where status = 'SUCCESS'
4. **successRate**: (Campaigns with donationCollected >= donationTarget) / total campaigns \* 100

### Current Service Structure:

- File: `src/app/crowdfounding/controllers/crowdfounding.controller.ts`
- Uses Prisma ORM
- Existing endpoints maintain `{ data, message: 'success' }` format

Please implement the `@Get('statistics')` endpoint with efficient Prisma queries and proper TypeScript types.

---

## Alternative Shorter Prompt:

```
Add GET /crowdfounding/statistics endpoint. Count unique donors across ALL campaigns (not per campaign) to fix double counting. Return: totalDonors (unique users), activeCampaigns, totalRaised, successRate. Only count donations with status='SUCCESS'. Use Prisma groupBy for efficiency.
```
