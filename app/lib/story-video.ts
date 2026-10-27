const LOCAL_STORY_VIDEO = "/Images/website/turo-story.mp4";

export const storyVideoSource =
  process.env.NEXT_PUBLIC_STORY_VIDEO_URL?.trim() || LOCAL_STORY_VIDEO;
