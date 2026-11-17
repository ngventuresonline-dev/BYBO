import Link from "next/link";
import { Wordmark } from "@/components/Logo";

export const metadata = { title: "Flo Tempo — live demo" };

export default function Demo() {
  return (
    <main className="min-h-dvh px-4 py-6">
      <div className="mx-auto mb-6 flex max-w-[1500px] items-center justify-between">
        <Link href="/"><Wordmark size={28} /></Link>
        <ol className="hidden gap-5 text-[12px] text-muted lg:flex">
          <li><b className="text-flo">1</b> Rider books from Koramangala</li>
          <li><b className="text-flo">2</b> Captain gets a 20s offer → accepts</li>
          <li><b className="text-flo">3</b> Rider reads PIN → captain starts → ends</li>
          <li><b className="text-flo">4</b> Ops sees it all live</li>
        </ol>
      </div>
      <div className="mx-auto grid max-w-[1500px] items-start gap-8 xl:grid-cols-[390px_390px_1fr]">
        <Frame src="/rider" label="Rider · Ananya" />
        <Frame src="/captain" label="Captain · Manjunath (Bike)" />
        <div className="flex flex-col items-center gap-3">
          <iframe src="/admin" className="h-[820px] max-h-[88vh] w-full rounded-3xl border border-line bg-ink" />
          <div className="text-[11px] uppercase tracking-[0.2em] text-muted">Operations dashboard</div>
        </div>
      </div>
    </main>
  );
}

function Frame({ src, label }: { src: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="phone"><iframe src={src} className="h-full w-full" /></div>
      <div className="text-[11px] uppercase tracking-[0.2em] text-muted">{label}</div>
    </div>
  );
}
