import { createFileRoute } from "@tanstack/react-router";
import { ContactsComponent } from "../pages/ContactsPage";

export const Route = createFileRoute("/contacts")({
  component: ContactsComponent,
});
