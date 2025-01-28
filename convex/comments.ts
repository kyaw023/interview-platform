import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const addComment = mutation({
  args: {
    content: v.string(),
    rating: v.number(),
    interviewerId: v.string(),
    interviewId: v.id("interviews"),
  },

  handler: async (ctx, args) => {
    const { content, rating, interviewId } = args;

    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Authentication required");
    }

    const commentId = await ctx.db.insert("comments", {
      content,
      rating,
      interviewerId: identity.subject,
      interviewId,
    });

    return commentId;
  },
});

// get all comments for an interview
export const getComments = query({
  args: {
    interviewId: v.id("interviews"),
  },
  handler: async (ctx, args) => {
    const comments = await ctx.db
      .query("comments")
      .withIndex("by_interview_id", (q) =>
        q.eq("interviewId", args.interviewId)
      )
      .collect();

    return comments;
  },
});
