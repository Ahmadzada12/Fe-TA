# Backend Prompt - Dynamic Donor Count Implementation

Copy paste prompt ini ke GitHub Copilot di backend:

---

## 🎯 Requirement: Add Dynamic Donor Count to Crowdfunding Platform

I need to implement dynamic donor counting for my crowdfunding platform. Currently the frontend shows hardcoded "1000+" but I want real data from the database.

### Current Database Schema:

```prisma
model Campaign {
  id                   String     @id @default(cuid())
  title                String
  description          String
  donationTarget       Int
  donationCollected    Int
  statusDonasi         String     // 'published', 'draft', etc.
  donationStartDate    DateTime
  donationFinishedDate DateTime
  createdAt            DateTime   @default(now())
  updatedAt            DateTime   @updatedAt
  donations            Donation[]
  user                 User       @relation(fields: [userId], references: [id])
  userId               String
}

model Donation {
  id         String   @id @default(cuid())
  userId     String
  campaignId String
  amount     Int
  status     String   // 'SUCCESS', 'PENDING', 'FAILED'
  createdAt  DateTime @default(now())
  campaign   Campaign @relation(fields: [campaignId], references: [id])
  user       User     @relation(fields: [userId], references: [id])
}
```

### Requirements:

#### 1. **Enhance Existing Crowdfunding Service**

Update the `findAll()` method in `src/app/crowdfounding/services/crowdfounding.service.ts` to include `totalDonors` field for each campaign.

**Business Logic:**

- Count unique donors per campaign (not total donations)
- Only count donations with status = 'SUCCESS'
- One user donating multiple times = 1 donor
- Return `totalDonors` field for each campaign

#### 2. **Add Global Statistics Endpoint**

Create new endpoint `GET /crowdfounding/statistics` that returns global platform statistics.

**Business Logic:**

- `totalDonors`: Count unique users across ALL campaigns (prevent double counting)
- `activeCampaigns`: Count published campaigns where donationFinishedDate > now()
- `totalRaised`: Sum all successful donation amounts
- `successRate`: Percentage of campaigns that reached their target

### Expected Implementation:

#### Enhanced Campaign Response:

```typescript
// Current response structure to maintain
{
  "data": [
    {
      "id": "campaign-123",
      "title": "Bantuan Pendidikan",
      "donationTarget": 10000000,
      "donationCollected": 5500000,
      "statusDonasi": "published",
      "totalDonors": 25,  // ✅ ADD THIS FIELD
      "donationStartDate": "2025-01-01T00:00:00.000Z",
      "donationFinishedDate": "2025-12-31T00:00:00.000Z",
      "createdAt": "2025-01-01T00:00:00.000Z",
      "updatedAt": "2025-06-24T00:00:00.000Z"
    }
  ],
  "message": "success"
}
```

#### New Statistics Endpoint Response:

```typescript
// GET /crowdfounding/statistics
{
  "data": {
    "totalDonors": 150,           // Unique users across ALL campaigns
    "activeCampaigns": 25,        // Published & not expired campaigns
    "totalRaised": 500000000,     // Sum of all successful donations
    "successRate": 75             // % of campaigns reaching target
  },
  "message": "success"
}
```

### Implementation Guide:

#### Step 1: Update Existing Service Method

```typescript
// In crowdfounding.service.ts - enhance findAll()
async findAll() {
  const campaigns = await this.prisma.campaign.findMany({
    include: {
      donations: {
        where: {
          status: 'SUCCESS'  // Only successful donations
        },
        select: {
          userId: true  // Only need userId for counting
        }
      },
      user: {
        select: {
          id: true,
          fullName: true,
          // ... other user fields needed
        }
      }
    }
  });

  return {
    data: campaigns.map(campaign => {
      // Count unique donors per campaign
      const uniqueDonors = new Set(
        campaign.donations.map(donation => donation.userId)
      );

      return {
        id: campaign.id,
        title: campaign.title,
        description: campaign.description,
        donationTarget: campaign.donationTarget,
        donationCollected: campaign.donationCollected,
        statusDonasi: campaign.statusDonasi,
        totalDonors: uniqueDonors.size,  // ✅ New field
        donationStartDate: campaign.donationStartDate,
        donationFinishedDate: campaign.donationFinishedDate,
        createdAt: campaign.createdAt,
        updatedAt: campaign.updatedAt,
        user: campaign.user,
        // Don't include raw donations in response for performance
      };
    }),
    message: 'success'
  };
}
```

#### Step 2: Add Statistics Controller Method

```typescript
// In crowdfounding.controller.ts - add new endpoint
@Get('statistics')
async getStatistics() {
  return this.crowdfoundingService.getStatistics();
}
```

#### Step 3: Add Statistics Service Method

```typescript
// In crowdfounding.service.ts - add new method
async getStatistics() {
  // Count unique donors globally (prevent double counting)
  const uniqueDonorsGlobal = await this.prisma.donation.groupBy({
    by: ['userId'],
    where: {
      status: 'SUCCESS'
    }
  });

  // Count active campaigns
  const activeCampaigns = await this.prisma.campaign.count({
    where: {
      statusDonasi: 'published',
      donationFinishedDate: {
        gt: new Date()
      }
    }
  });

  // Calculate total raised
  const totalRaisedResult = await this.prisma.donation.aggregate({
    where: {
      status: 'SUCCESS'
    },
    _sum: {
      amount: true
    }
  });

  // Calculate success rate
  const totalCampaigns = await this.prisma.campaign.count({
    where: {
      statusDonasi: 'published'
    }
  });

  const successfulCampaigns = await this.prisma.campaign.count({
    where: {
      statusDonasi: 'published',
      donationCollected: {
        gte: this.prisma.campaign.fields.donationTarget
      }
    }
  });

  const successRate = totalCampaigns > 0
    ? Math.round((successfulCampaigns / totalCampaigns) * 100)
    : 0;

  return {
    data: {
      totalDonors: uniqueDonorsGlobal.length,
      activeCampaigns,
      totalRaised: totalRaisedResult._sum.amount || 0,
      successRate
    },
    message: 'success'
  };
}
```

### Performance Considerations:

- Use `select` to only fetch needed fields
- Use `groupBy` for efficient unique counting
- Remove raw donation data from response
- Consider caching for high-traffic applications

### Testing:

1. Test per-campaign donor count accuracy
2. Test global donor count (no double counting)
3. Verify only SUCCESS donations are counted
4. Test edge cases (campaigns with 0 donors)

### Error Handling:

- Handle database connection errors
- Validate response structure
- Add proper TypeScript types
- Maintain existing response format

Please implement both the enhanced campaign endpoint and the new statistics endpoint with proper error handling and TypeScript types.

---

## 🚀 Quick Implementation Checklist:

- [ ] Update `findAll()` method to include `totalDonors` per campaign
- [ ] Add `@Get('statistics')` endpoint to controller
- [ ] Add `getStatistics()` method to service
- [ ] Use Prisma `groupBy` for unique donor counting
- [ ] Maintain `{ data, message: 'success' }` response format
- [ ] Add proper TypeScript interfaces
- [ ] Test with real data
- [ ] Verify no double counting occurs

**Expected Result:** Frontend will show real donor counts instead of hardcoded "1000+"
