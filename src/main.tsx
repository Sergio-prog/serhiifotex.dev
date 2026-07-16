import { hydrateRoot } from "react-dom/client";
import "react-tooltip/dist/react-tooltip.css";
import "./styles/globals.css";
import Root from "./Root";
import { legacyHashSlug, postPath } from "./routes";
import { printConsoleGreeting } from "./utils/consoleGreeting";

printConsoleGreeting();

const legacySlug = legacyHashSlug(window.location.hash);

if (legacySlug) {
  window.location.replace(postPath(legacySlug));
} else {
  hydrateRoot(
    document.getElementById("root")!,
    <Root path={window.location.pathname} />
  );
}
