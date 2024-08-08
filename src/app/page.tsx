import Board from "@/components/Borad";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-2">
     <div style={{fontSize:'30px'}}>Agile Board</div>
      <Board />
    </main>
  );
}
