import { tektur } from "@/app/layout";

interface TitleProps {
  text: string;
}

export default function Title({ text }: TitleProps) {
  return (
    <section className="py-12 md:py-15">
      <h1
        className={`${tektur.className} text-6xl md:text-8xl font-bold tracking-tight leading-none mb-12`}
      >
        {text}
      </h1>
    </section>
  );
}
