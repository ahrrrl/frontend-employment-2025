export default function Group1Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div>Group 1 레이아웃입니다.</div>
      <section>{children}</section>
    </>
  );
}
