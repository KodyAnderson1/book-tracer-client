import { title, subtitle } from "@/components/primitives";

export default function Home() {
  return (
    <section className="flex flex-col px-4 md:px-0">
      <header className="mb-4 md:mb-8">
        <h1 className={title({ className: "text-background-foreground", size: "sm" })}>
          Your Library
        </h1>
        <h2 className={subtitle({ className: "text-background-foreground" })}>
          Welcome, {"User.Username"}
        </h2>
      </header>
    </section>
  );
}
