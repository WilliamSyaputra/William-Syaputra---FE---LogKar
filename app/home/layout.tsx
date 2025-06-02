export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // eslint-disable-next-line no-console
  console.log("HomeLayout");

  return (
    <section className="flex flex-col items-center justify-center">
      <div className="inline-block text-center justify-center">{children}</div>
    </section>
  );
}
