import Link from 'next/link';
import { productById, productForService } from '@/lib/payments/products';
import './buy-strip.css';

const inr = (n: number) => `₹${n.toLocaleString('en-IN')}`;

/** The buy band at the foot of a service page: its starter package, plus the Blueprint. */
export function BuyStrip({ slug }: { slug: string }) {
  const p = productForService(slug);
  const blueprint = productById('blueprint');
  if (!p) return null;
  return (
    <section className="buy" aria-labelledby="buy-title">
      <div className="buy-inner">
        <div className="buy-copy">
          <p className="buy-kick">Ready to start</p>
          <h2 id="buy-title">{p.name}</h2>
          <p className="buy-lead">{p.description}</p>
          <ul>{p.includes.map((i) => <li key={i}>{i}</li>)}</ul>
        </div>
        <div className="buy-card">
          <p className="buy-from">Starter package</p>
          <p className="buy-price">{inr(p.price)}</p>
          <Link className="buy-btn" href={`/pay?product=${p.id}`}>Buy now</Link>
          {blueprint && <Link className="buy-alt" href={`/pay?product=${blueprint.id}`}>Not sure yet? Start with a {blueprint.name} for {inr(blueprint.price)}</Link>}
          <p className="buy-note">Secure checkout by PhonePe · receipt by email</p>
        </div>
      </div>
    </section>
  );
}
