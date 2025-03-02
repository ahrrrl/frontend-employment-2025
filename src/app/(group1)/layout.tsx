export default function Group1Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div>Group 1 레이아웃입니다.</div>
      <section className=" mx-auto px-4 sm:px-12 max-w-[1200px]">{children}</section>
    </>
  );
}
