import { renderToString } from "react-dom/server";
import Root from "./Root";

export { allPosts } from "./content/posts";

export function render(path: string) {
  return renderToString(<Root path={path} />);
}
