interface PageContentProps {
  children: React.ReactNode;
}

export function PageContent({ children }: PageContentProps) {
  return <div className="bg-black min-h-full p-8">{children}</div>;
}
