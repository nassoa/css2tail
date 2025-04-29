import { Converter } from "@/components/converter";

export default function Home() {
  return (
    <main className="container mx-auto">
      <div className="h-screen flex py-10 flex-col">
        <Converter />
      </div>
    </main>
  );
}
