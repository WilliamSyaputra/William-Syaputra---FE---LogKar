export default function OrderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // eslint-disable-next-line no-console
  console.log("OrderLayout");

  return (
    <section className="flex justify-center w-full px-4">
      <div className="w-full max-w-screen-xl">{children}</div>
    </section>
  );
}
