# Backend Copilot Prompt - Dynamic Donor Count

Copy and paste this prompt to GitHub Copilot in your backend:

---

## Prompt untuk Backend Developer:

````
I need to add dynamic donor count functionality to my crowdfunding platform backend. Currently, the frontend shows a hardcoded "1000+" for total donors, but I want to make this dynamic based on actual donation data.

Requirements:
1. Add `totalDonors` field to the crowdfunding service response
2. Count unique donors per campaign from the donations table
3. Maintain the existing response format: { data: [...], message: 'success' }
4. Use efficient database queries with Prisma

Current service structure:
- File: `src/app/crowdfounding/services/crowdfounding.service.ts`
- Uses Prisma ORM
- Has Campaign and Donation models
- Campaign has many Donations
- Donation belongs to User and Campaign

Expected database schema:
```prisma
model Campaign {
  id               String     @id @default(cuid())
  title            String
  description      String
  donationTarget   Int
  donationCollected Int
  statusDonasi     String
  donations        Donation[]
  // ... other fields
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
````

Please update the `findAll()` method in the crowdfunding service to:

1. Include donations relationship when querying campaigns
2. Count unique `userId` values per campaign
3. Add `totalDonors: number` field to each campaign response
4. Keep all existing fields and response structure

The response should look like:

```json
{
  "data": [
    {
      "id": "campaign-id",
      "title": "Campaign Title",
      "donationTarget": 10000000,
      "donationCollected": 5000000,
      "statusDonasi": "published",
      "totalDonors": 25
      // ... other existing fields
    }
  ],
  "message": "success"
}
```

Please show the complete updated service method with proper TypeScript types and error handling.

```

---

## Alternative Shorter Prompt:

```

Add `totalDonors` field to crowdfunding service response. Count unique donors per campaign from donations table using Prisma. Keep existing response format: { data, message: 'success' }.

Update findAll() method to include donations relationship and count unique userId values per campaign. Add totalDonors field to response.

````

---

## After Implementation, Test With:

```bash
# Start your backend
npm run start:dev

# Test the endpoint
curl http://localhost:3001/v1/crowdfounding
````

Expected response should include `totalDonors` field in each campaign object.
