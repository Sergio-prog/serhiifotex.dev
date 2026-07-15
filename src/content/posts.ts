import { collectPosts } from "./parsePost";

export type { BlogPost } from "./parsePost";

type PostModule = string;

const postModules = import.meta.glob<PostModule>("../posts/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

export const allPosts = collectPosts(Object.entries(postModules));

export const posts = allPosts.filter((post) => !post.hidden);
