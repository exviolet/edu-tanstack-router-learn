import { createFileRoute } from "@tanstack/react-router";
import { AboutComponent } from "../pages/AboutPage";

export const Route = createFileRoute("/about")({
  component: AboutComponent,
});
