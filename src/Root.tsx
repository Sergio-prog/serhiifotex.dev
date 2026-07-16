import { StrictMode } from "react";
import { Analytics } from "@vercel/analytics/react";
import { ToastContainer } from "react-toastify";
import App from "./App";

export default function Root({ path }: { path: string }) {
  return (
    <StrictMode>
      <App path={path} />
      <ToastContainer />
      <Analytics />
    </StrictMode>
  );
}
