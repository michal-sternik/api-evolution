import { ReactNode } from "react";

interface SectionProps {
  header: ReactNode;
  children: ReactNode;
}

export default function Section({ header, children }: SectionProps) {
  return (
    <section className="py-12 md:py-16">
      {header}

      <div className="max-w-3xl space-y-6 ">{children}</div>
    </section>
  );
}
