import Image from "next/image";
import Link from "next/link";
import SiteNav from "../components/site-nav";
import SiteFooter from "../components/site-footer";

export const metadata = {
  title: "Barcelona — Turó",
  description:
    "The city that shaped Turó: movement, food, sport, streets, sun and community.",
};

export default function BarcelonaPage() {
  return (
    <main className="barcelonaPage">
      <SiteNav home={false} />
      <section className="barcelonaPageHero">
        <Image src="/Images/website/movement-barcelona.jpg" alt="A runner stretching in a Barcelona park" fill priority sizes="100vw" />
        <div className="barcelonaPageShade" />
        <div className="barcelonaPageContent">
          <Image className="barcelonaPageMark" src="/Images/turo-logo-white.PNG" alt="" width={2134} height={2134} aria-hidden="true" />
          <p className="eyebrow">The origin</p>
          <h1>Born in Barcelona.<br />Built for everywhere.</h1>
          <p>Inspired by how people live: movement, food, sport, streets, sun and community.</p>
          <a href="#city-life" className="buttonLight">The Turó point of view <span aria-hidden="true">↓</span></a>
        </div>
        <span className="barcelonaPageLabel">BARCELONA / CATALUNYA</span>
      </section>

      <section id="city-life" className="barcelonaManifesto section">
        <div>
          <p className="eyebrow">A city that makes space for life</p>
          <h2>Wellbeing lives<br />in the everyday.</h2>
        </div>
        <div className="barcelonaManifestoCopy">
          <p>It’s in the walk that becomes a run, the long lunch after sport, the neighbourhood route you take without thinking, and the people you meet along the way.</p>
          <p>Barcelona gave Turó its starting point: a belief that living well is made from many small, connected moments.</p>
        </div>
      </section>

      <section className="barcelonaDetail">
        <div className="barcelonaDetailImage">
          <Image src="/Images/website/movement-barcelona.jpg" alt="An everyday moment of movement in Barcelona" fill sizes="(max-width: 760px) 100vw, 58vw" />
        </div>
        <div className="barcelonaDetailCopy">
          <p className="eyebrow">The feeling, wherever you are</p>
          <h2>Rooted in place.<br />Open to everywhere.</h2>
          <p>Turó is shaped by Barcelona, but it belongs wherever people want a more connected way to move, eat, recover and spend time together.</p>
          <Link href="/#product" className="buttonPrimary">Explore Turó <span aria-hidden="true">↗</span></Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
