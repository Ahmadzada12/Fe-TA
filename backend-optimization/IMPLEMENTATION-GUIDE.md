# Dynamic Donor Count Implementation Guide

## Overview

This guide implements dynamic donor count functionality to replace the hardcoded "1000+" with real data from the database.

## What's Changed

### Frontend (`src/pages/home.vue`)

- ✅ Added `totalDonors?: number` field to Campaign interface
- ✅ Created `calculateTotalDonors()` function to sum donors from all campaigns
- ✅ Updated statistics calculation to use dynamic data when available
- ✅ Fallback to "1000+" if backend doesn't provide donor data yet

### Backend (Required Changes)

- 🔧 Add `totalDonors` field to crowdfunding service response
- 🔧 Count unique donors per campaign using donations relationship
- 🔧 Maintain `{ data, message: 'success' }` response format

## Implementation Steps

### Step 1: Update Backend

Run the automated script:

```powershell
cd your-backend-directory
.\backend-optimization\add-dynamic-donors.ps1
```

Or manually update your crowdfunding service:

```typescript
async findAll() {
  const campaigns = await this.prisma.campaign.findMany({
    include: {
      donations: {
        select: {
          userId: true, // For counting unique donors
        },
      },
      user: {
        select: {
          id: true,
          fullName: true,
          profilePicture: true,
        },
      },
    },
  });

  return {
    data: campaigns.map(campaign => {
      const uniqueDonors = new Set(campaign.donations.map(d => d.userId));

      return {
        id: campaign.id,
        title: campaign.title,
        description: campaign.description,
        // ... other fields
        totalDonors: uniqueDonors.size, // Add this line
        // ... rest of fields
      };
    }),
    message: 'success'
  };
}
```

### Step 2: Test the Implementation

```powershell
.\backend-optimization\test-dynamic-donors.ps1
```

### Step 3: Verify Frontend

1. Start your frontend: `npm run dev`
2. Navigate to homepage
3. Check that "Donatur" statistic shows real numbers
4. Make a test donation and verify the count updates

## Database Requirements

Your Prisma schema should have:

```prisma
model Campaign {
  id               String     @id @default(cuid())
  title            String
  description      String
  // ... other fields
  donations        Donation[]
  // ... rest of model
}

model Donation {
  id         String   @id @default(cuid())
  userId     String
  campaignId String
  amount     Int
  campaign   Campaign @relation(fields: [campaignId], references: [id])
  user       User     @relation(fields: [userId], references: [id])
  // ... other fields
}
```

## How It Works

1. **Backend**: Counts unique `userId` values in donations for each campaign
2. **Frontend**: Sums `totalDonors` from all campaigns for the homepage statistic
3. **Fallback**: Shows "1000+" if backend doesn't provide donor data yet
4. **Real-time**: Updates automatically as new donations are made

## API Response Format

```json
{
  "data": [
    {
      "id": "campaign-id",
      "title": "Campaign Title",
      "donationTarget": 10000000,
      "donationCollected": 5000000,
      "totalDonors": 25,
      "statusDonasi": "published"
      // ... other fields
    }
  ],
  "message": "success"
}
```

## Benefits

- ✅ Real-time donor count
- ✅ Accurate statistics
- ✅ Better user engagement
- ✅ Data-driven insights
- ✅ Maintains backward compatibility

## Troubleshooting

### "1000+" Still Showing

- Check if backend provides `totalDonors` field
- Run test script to verify API response
- Check browser console for errors

### API Errors

- Verify backend server is running
- Check database connection
- Ensure proper authentication

### No Donors Counted

- Verify donations table has data
- Check userId field in donations
- Ensure proper database relationships

## Next Steps

After implementation:

1. Monitor performance with large datasets
2. Consider caching for high-traffic sites
3. Add donor count to individual campaign pages
4. Implement real-time updates with WebSockets (optional)
