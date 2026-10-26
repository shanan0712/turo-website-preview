import Image from "next/image";
import HomeHeroVideo from "./components/home-hero-video";
import SiteNav from "./components/site-nav";
import SiteFooter from "./components/site-footer";
import WorkspaceSection from "./components/workspace-section";
import WorkInProgress from "./components/WorkInProgress";

const territoryFeatures = [
  { title: "My Route", detail: "Keep your routes close and record your best performances." },
  { title: "Challenges", detail: "Challenge others on your routes and compete for the best scores." },
  { title: "Places", detail: "Explore the best and most popular routes in your city." },
  { title: "Leaderboards", detail: "See where you rank among the top performers." },
];

export default function Home() {
  return (
    <main id="top" className="homePage">
      <section className="homeHero" aria-labelledby="hero-title">
        <HomeHeroVideo />
        <div className="homeHeroOverlay" />
        <SiteNav />
        <div className="homeHeroComposition">
          <div className="homeHeroCopy">
            <h1 id="hero-title">Simple habits that compound.</h1>
            <p className="homeHeroPillars">Move. Eat. Recover. Connect.</p>
          </div>
        </div>
      </section>

      <section className="homeHeroIntro" aria-label="About Turó">
        <div className="homeHeroIntroContent">
          <div className="homeHeroIntroCopy">
            <a href="#product" className="homeHeroIntroCta">
              EXPLORE TURÓ <span aria-hidden="true">→</span>
            </a>
            <Image
              className="homeHeroIntroMark"
              src="/Images/turo-logo-white.PNG"
              alt="Turó symbol"
              width={2134}
              height={2134}
            />
            <p>Inspired by Barcelona, the way you live shapes how you feel. Turó brings the everyday habits that matter into one connected experience.</p>
          </div>
        </div>
      </section>

      <section id="product" className="wellbeingSection" aria-label="Movement, nutrition and recovery">
        <article id="move" className="wellbeingChapter movementChapter" aria-labelledby="movement-title">
          <p className="eyebrow">Movement</p>
          <div className="wellbeingChapterContent">
            <h2 id="movement-title">Move with purpose.</h2>
            <div className="wellbeingChapterCopy">
              <p className="wellbeingLead">Find your route. Keep moving.</p>
              <p>Turó brings movement into your everyday — helping you discover new routes, explore new places, and stay connected to what keeps you moving.</p>
            </div>
          </div>
        </article>

        <article id="eat" className="wellbeingChapter nutritionChapter" aria-labelledby="nutrition-title">
          <p className="eyebrow">Nutrition</p>
          <div className="wellbeingChapterContent">
            <h2 id="nutrition-title">Eat well. Live well.</h2>
            <div className="wellbeingChapterCopy">
              <p className="wellbeingLead">Good food should fit your life.</p>
              <p>Turó helps you make more informed choices about what you eat, bringing your goals, preferences, and everyday habits together so eating well feels natural.</p>
            </div>
          </div>
        </article>

        <article id="recover" className="wellbeingChapter recoveryChapter" aria-labelledby="recovery-title">
          <div className="recoveryChapterCopy">
            <p className="eyebrow">Recovery</p>
            <h2 id="recovery-title">Recover with intention.</h2>
            <p className="wellbeingLead">Give your body what it needs.</p>
            <p>Turó brings together your movement, environment, and everyday habits to help you stay hydrated, recover well, and feel ready for what comes next.</p>
          </div>
          <figure className="recoveryVisual">
            <Image
              src="/Images/website/hydration-ring.png"
              alt="A person drinks water as Turó adjusts their hydration target for the conditions around them."
              width={1080}
              height={1350}
              sizes="(max-width: 760px) min(100vw - 40px, 520px), (max-width: 1100px) 52vw, 600px"
            />
          </figure>
        </article>
      </section>

      <section id="social" className="connectSection" aria-labelledby="connect-title">
        <div className="connectContent">
          <p className="eyebrow">@CLUBTURO</p>
          <h2 id="connect-title">For those who choose to live well.</h2>
          <p className="sectionLead">People who value their time, their health, and the way they spend both.</p>
          <p className="connectSupporting">Move together. Discover new places. Connect with people who see wellbeing as part of a life well lived.</p>
        </div>
        <figure className="communityArtwork">
          <Image
            src="/Images/website/community-run.png"
            alt="Friends sharing a moment together after a run."
            width={2160}
            height={2700}
            sizes="(max-width: 600px) calc(100vw - 48px), (max-width: 900px) calc(100vw - 68px), (max-width: 1100px) 52vw, 640px"
          />
        </figure>
      </section>

      <section id="territory" className="territorySection" aria-labelledby="territory-title">
        <Image
          className="territoryMapBackground"
          src="/Images/website/Territory map view.png"
          alt=""
          width={1710}
          height={920}
          sizes="(max-width: 760px) 70vw, 48vw"
          aria-hidden="true"
        />
        <div className="territoryContent">
          <div className="territoryHeader">
            <p className="eyebrow">TERRITORY / DISCOVER</p>
            <h2 id="territory-title">A layer around the places you move through.</h2>
            <p className="sectionLead">Territory connects routes, places and movement. Keep your own path close; find another place to go when you’re ready.</p>
          </div>
          <div className="territoryGrid">
            {territoryFeatures.map((feature, index) => (
              <article key={feature.title}>
                <span className="territoryIndex">0{index + 1}</span>
                <h3>{feature.title}</h3>
                <p>{feature.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="experts" className="expertsSection" aria-labelledby="experts-title">
        <div className="expertsLayout">
          <div className="expertsContent">
            <p className="eyebrow">Experts</p>
            <h2 id="experts-title">Expertise that informs how you live.</h2>
            <p className="sectionLead">Turó brings together expertise in nutrition, movement and performance to make wellbeing more personal, informed and practical.</p>
            <div className="expertProfiles">
              <article className="expertProfile">
                <h3>Dr. Giulia Solimando</h3>
                <p className="expertRole">Nutrition specialist</p>
                <p>Specialized in personalized diet plans and nutritional strategies for health and performance. Expert in pregnancy and breastfeeding nutrition, integrating training and nutrition synergistically.</p>
              </article>
              <article className="expertProfile">
                <h3>Dr. Filippo Polpatelli</h3>
                <p className="expertRole">Sports nutrition expert</p>
                <p>Specialized in nutrition for professional athletes with targeted dietary and supplementation strategies. Scientific approach to optimize performance, recovery, and quality of life across sports disciplines.</p>
              </article>
            </div>
          </div>
          <figure className="expertsImage">
            <Image
              src="/Images/website/experts-team.jpg"
              alt="Dr. Giulia Solimando and Dr. Filippo Polpatelli"
              width={1080}
              height={1080}
              sizes="(max-width: 420px) calc(100vw - 40px), (max-width: 900px) calc(100vw - 68px), (max-width: 1100px) 48vw, 600px"
            />
          </figure>
        </div>
      </section>

      <section id="origin" className="originSection" aria-labelledby="origin-title">
        <Image src="/Images/website/movement-barcelona.jpg" alt="A moment of movement in Barcelona" fill sizes="100vw" />
        <div className="originShade" />
        <div className="originContent">
          <p className="eyebrow">The starting point</p>
          <h2 id="origin-title">Born in Barcelona.<br />Inspired by the way we live.<br />Built for everywhere.</h2>
          <p>Movement, food, sport, streets, sun and community shaped the idea behind Turó.</p>
        </div>
        <Image className="originMark" src="/Images/turo-logo-white.PNG" alt="" width={2134} height={2134} aria-hidden="true" />
      </section>

      <WorkInProgress />

      <WorkspaceSection />

      <SiteFooter />
    </main>
  );
}
