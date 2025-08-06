import 'dotenv/config';
import { clerkClient } from '@clerk/express';

export const auth = async (req, res, next) => {
  try {
    const { userId, has } = await req.auth();

    if (!userId) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const hasProPlan = await has({ plan: 'pro' });

    const user = await clerkClient.users.getUser(userId);
    const userMetadata = user.privateMetadata || {};

    req.plan = hasProPlan ? 'pro' : 'free';
    req.free_usage = userMetadata.free_usage ?? 0;

    // Optional: initialize free_usage if missing
    if (userMetadata.free_usage === undefined) {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: 0,
        },
      });
    }

    next();
  } catch (error) {
    console.log("Auth error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
