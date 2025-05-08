import { ReactNode } from "react";

export function Content({
  children,
  miniHeader,
}: {
  children: ReactNode;
  miniHeader?: ReactNode;
}) {
  return (
    <div>
      {miniHeader && (
        <h3 className="text-lg md:text-xl font-semibold mb-2">{miniHeader}</h3>
      )}
      <p>{children}</p>
    </div>
  );
}
