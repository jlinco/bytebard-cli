import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <section>
      <h1>HomePage</h1>
      <p>This is our homepage. Feel free to create more</p>
    </section>
  );
}
