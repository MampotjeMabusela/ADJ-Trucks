import type { Metadata } from "next";
import { COMPANY, PAGE_BACKGROUNDS } from "@/lib/constants";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Albert de Jongh Trucks (ADJT) — a used heavy-duty truck dealership in Pretoria since 2007, built on a family legacy in commercial vehicles dating back to 1948.",
};

const milestones = [
  {
    year: "1948",
    text: "Petrus J. de Jongh launches a bus service in Pretoria, laying the groundwork for the family’s transport business.",
  },
  {
    year: "1976",
    text: "Andre de Jongh joins the family’s truck dealership, marking the start of its reputable history since 1976 in commercial vehicle sales.",
  },
  {
    year: "1984",
    text: "The original De Jongh’s Toyota/Leyland dealership is sold to Imperial Trucks upon Albert Sr.’s retirement, after decades of successful truck sales and service.",
  },
  {
    year: "2007",
    text: "Albert de Jongh establishes ADJT as an independent used-truck trading company, continuing the family legacy in the truck business.",
  },
  {
    year: "2021",
    text: "By the early 2020s, ADJT had operated for over 14 years and was still going strong, reflecting the company’s stability and passion in the heavy-duty vehicle trade.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 sm:pt-28 pb-16 sm:pb-20">
      <PageHero image={PAGE_BACKGROUNDS.about}>
          <span className="text-xs font-semibold tracking-widest uppercase text-gold">
            About Us
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 mb-4 max-w-4xl">
            Albert de Jongh Trucks (ADJT)
          </h1>
          <p className="text-lg text-gold font-medium mb-2">
            History and Overview
          </p>
          <p className="text-muted-foreground max-w-3xl leading-relaxed">
            Making passion a business — a used heavy-duty truck dealership in
            Pretoria, South Africa, built on over four generations of family
            experience in commercial transport.
          </p>
      </PageHero>

      <article className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <section className="mb-14 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gold">
            Company Background and History
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Albert de Jongh Trucks (ADJT) is a used heavy-duty truck dealership
              based in Pretoria, South Africa. The business was founded in 2007 by
              Albert de Jongh, continuing a family legacy in the commercial vehicle
              industry that dates back several generations. The De Jongh family’s
              involvement in transportation began in the mid-20th century and has
              evolved through various ventures — from operating bus services to
              managing truck dealerships — before culminating in the establishment
              of ADJT.
            </p>
            <p>
              Historical photo of the De Jongh family’s Leyland truck dealership at
              the Pretoria Show in 1984. The De Jongh enterprise was an official
              Leyland dealer that supplied fleets of trucks to major clients like
              the Pretoria City Council. This deep-rooted history started when
              Petrus Johannes de Jongh (the great-grandfather of the current owner)
              launched De Jongh’s Bus Services in 1948, running a bus line between
              Pretoria North and the city center. After he retired, his son (Albert
              de Jongh Sr.) shifted the family business toward engineering and
              trucking — opening De Jongh’s Engineering at the same premises and
              later becoming an authorized Leyland commercial vehicles agency.
            </p>
            <p>
              During the 1970s and early 1980s, De Jongh’s Leyland sold and
              serviced British-made trucks and buses; at one point they delivered
              31 new Leyland trucks for use by Pretoria’s municipal departments,
              underscoring the family’s prominence in the local truck industry. In
              1976, Andre de Jongh (Albert Sr.’s son) joined the business, further
              extending the family’s expertise in commercial vehicles. When Leyland
              withdrew from the South African market, the De Jonghs pivoted to
              become a Toyota truck dealership (branded as De Jongh’s Toyota) on the
              same site. This chapter continued until 1984, when Albert Sr.
              retired and the longstanding family dealership was sold to Imperial
              Trucks (a large dealer network). Andre de Jongh stayed on with
              Imperial for 25 years as a workshop and sales manager, cementing the
              family’s reputation in the truck sales and service field.
            </p>
            <p>
              In 2007, Albert de Jongh (grandson of Albert Sr.) decided to carry on
              the family tradition under his own banner. He left his position at
              McCarthy Toyota and founded Albert de Jongh Trucks (ADJT), driven by
              the conviction that &ldquo;selling heavy-duty commercial vehicles was
              in my blood&rdquo;. Starting as an independent venture, ADJT built
              upon 42+ years of family experience in the industry.
            </p>
          </div>

          <div className="mt-10">
            <h3 className="text-lg font-bold mb-6">
              Key milestones in this evolutionary journey include:
            </h3>
            <ol className="space-y-4">
              {milestones.map((item) => (
                <li
                  key={item.year}
                  className="flex gap-4 p-4 rounded-xl border border-white/5 bg-metallic-gradient"
                >
                  <span className="text-gold font-bold shrink-0 w-14">
                    {item.year}
                  </span>
                  <span className="text-sm text-muted-foreground leading-relaxed">
                    {item.text}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="mb-14 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gold">
            Core Business and Specializations
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              ADJT’s core business is the buying and selling of pre-owned
              heavy-duty commercial vehicles, particularly trucks. The company
              markets itself as a &ldquo;Professional Used Truck Sales&rdquo; firm
              built on decades of industry experience. In practice, this means ADJT
              specializes in sourcing quality second-hand trucks, refurbishing or
              inspecting them as needed, and offering them for sale to customers
              looking for reliable commercial vehicles. Notably, the company not
              only sells trucks but also actively purchases used trucks from
              individuals or fleets looking to sell; as their site advertises:
              &ldquo;Did you know we also buy used trucks? Email us now!&rdquo;.
              This dual role as buyer and seller allows ADJT to maintain a robust
              and varied inventory.
            </p>
            <p>
              A modern example of ADJT’s offerings: a pre-owned Hino 300 series
              truck on the lot. ADJT deals in a wide range of truck types, from
              smaller 1–4 ton urban delivery trucks up to large long-haul and
              construction trucks. ADJT’s product range covers virtually all
              categories of heavy vehicles, and the stock spans numerous major
              brands. Customers will find everything from light-duty trucks like
              the Toyota Dyna and Hino 300, to medium-duty vehicles such as
              Mitsubishi Fuso Canters and Isuzu NPR/FSR series, and up to
              heavy-duty workhorses like Mercedes-Benz Atego/Axor models or
              Freightliner and UD (Nissan Diesel) trucks.
            </p>
            <p>
              The company’s listings routinely feature multi-brand inventory — for
              example, ADJT has offered models like a 2001 Nissan UD80, a 2002
              Mercedes-Benz 1317 dropside, a 2012 Toyota Dyna 4-093, and a 2018
              Hino 300, among others. In late 2022, new postings included a 1996
              Nissan Diesel, a 2011 Hino truck, a 2008 Isuzu FSR 700, and even a
              14-ton Tata truck, illustrating the broad spectrum of manufacturers
              and truck sizes handled. This wide selection positions ADJT as a
              one-stop shop for heavy-duty commercial vehicles, whether customers
              need a small delivery truck or a large tipper or tractor unit.
            </p>
            <p>
              ADJT’s specialization is purely in truck sales (as opposed to new
              passenger cars or light pickups). However, their decades-honed
              expertise means they can advise customers on the right type of truck
              for their needs and often carry niche configurations (e.g. dropside
              bodies, box bodies, tankers, etc., as inherited from the previous
              owners). The legacy of having once been official dealers for brands
              like Leyland and Toyota is reflected in the company’s emphasis on
              technical knowledge and quality. Every truck is advertised with key
              details (make, year, body type, condition) and the company ensures
              vehicles are in &ldquo;well-kept condition&rdquo; before sale. By
              focusing exclusively on commercial trucks, ADJT has cultivated a deep
              understanding of the heavy vehicle market.
            </p>
          </div>
        </section>

        <section className="mb-14 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gold">
            Customer Base and Operations
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Over the years, Albert de Jongh Trucks has developed a customer base
              that includes a variety of businesses and individual entrepreneurs in
              the transport and logistics sector. Typical customers range from local
              construction companies, freight and logistics firms, farming
              operations, to independent truckers and small business owners who
              need trucks for deliveries or services. Because trucks are critical
              assets across many industries, ADJT’s clients span everything from
              moving companies and contractors to municipalities and fleet
              operators. In fact, the family’s earlier dealership era demonstrated
              the ability to serve large institutional clients (such as city
              councils) in addition to private buyers.
            </p>
            <p>
              ADJT primarily serves the South African market, but it also has reach
              beyond its immediate locale. With an online presence and active
              marketing, the company invites sellers and buyers &ldquo;to all of
              Africa&rdquo; — suggesting that they engage in advertising trucks
              across the continent. This could involve facilitating sales to
              neighboring countries or at least attracting cross-border customers
              via their website and social media. The dealership is headquartered
              at Montana Park in Pretoria (at Stand 4, Zambesi Drive &amp; Avocet
              Street), which is in a motor-business hub easily accessible to
              customers from Pretoria and the broader Gauteng region. According to
              public listings, the business operates with flexible hours (often
              accommodating clients by appointment) and can be reached by phone or
              email for inquiries.
            </p>
            <p>
              To engage customers and sellers alike, ADJT maintains an up-to-date
              online listings catalog on its website and frequently posts new
              arrivals or special deals. For example, ADJT uses social media and
              classifieds platforms to announce &ldquo;New Listing&rdquo; alerts
              for incoming trucks, as well as promotional pricing on select units.
              By fostering a sort of &ldquo;buy-and-sell truck community,&rdquo;
              ADJT encourages truck owners to trade in or list their vehicles,
              ensuring a steady turnover of inventory. This approach not only
              broadens their customer base but also builds a network of repeat
              clients who return to upgrade or replace trucks as their business
              needs evolve.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gold">
            Reputation and Notable Achievements
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              One of ADJT’s notable strengths is its long-standing heritage and
              credibility in the truck industry. The tagline &ldquo;Making passion a
              Business&rdquo; aptly describes how a personal passion for heavy
              vehicles grew into a multi-generational enterprise. The cumulative
              experience (over 40 years in the trade) and the family name have
              helped establish trust with customers. This is evidenced by the
              company highlighting its &ldquo;reputable history since 1976&rdquo; on
              official materials. Additionally, customer feedback has been
              overwhelmingly positive — ADJT has earned five-star ratings in online
              reviews, with clients praising the &ldquo;professional team of
              people&rdquo; and the quality of service provided. Such testimonials
              suggest that beyond just selling trucks, the company emphasizes
              professionalism, honesty, and customer satisfaction, which are
              critical in the second-hand vehicle market.
            </p>
            <p>
              In terms of achievements, ADJT’s success is measured less by awards
              and more by its sustained growth and continuity. Surviving and
              thriving in the competitive truck resale business for well over a
              decade is itself a significant achievement. The company has navigated
              economic cycles and changes in the trucking industry while still
              expanding its inventory and clientele. Its adaptability can be traced
              back to the family’s history — for instance, pivoting from buses to
              engineering, then to truck dealerships and different brands over the
              decades shows a knack for evolution. Today, ADJT carries that forward
              by leveraging online marketing and broad network outreach, which
              keeps the business relevant in the digital age.
            </p>
            <p>
              Another point of pride is the family legacy: few independent truck
              dealers can cite a lineage of four generations in transportation. The
              story of how each generation of the de Jongh family contributed —
              from Petrus starting in 1948, to Albert Sr. and Andre running
              dealerships, and now Albert (Jr.) steering ADJT — is a unique
              heritage that the company often shares to underline its depth of
              experience. This continuity has likely helped ADJT secure repeat
              business and referrals from long-time associates who value dealing
              with an established name.
            </p>
            <p>
              In summary, Albert de Jongh Trucks (ADJT) is a thriving used-truck
              dealership that has grown out of a rich family history in South
              African commercial transport. It specializes in heavy-duty trucks of
              all types, serving a wide customer base with quality pre-owned
              vehicles and personalized service. From its historical roots as a
              Pretoria bus service and later a Leyland/Toyota franchise, the
              enterprise has evolved into a modern independent dealership that still
              upholds the values of passion, expertise, and reliability. Whether
              one is looking to buy a reliable truck for their business or sell an
              old fleet vehicle, ADJT provides a trusted platform backed by decades
              of know-how and a genuine love for the trucking industry.
            </p>
          </div>
        </section>

        <div className="p-6 rounded-xl border border-white/10 bg-metallic-gradient text-center">
          <p className="text-sm text-muted-foreground mb-2">
            Visit us at {COMPANY.address.full}
          </p>
          <p className="text-sm">
            <a
              href={`mailto:${COMPANY.contact.email}`}
              className="text-gold hover:underline"
            >
              {COMPANY.contact.email}
            </a>
            {" · "}
            <a
              href={`tel:${COMPANY.contact.mobileRaw}`}
              className="text-gold hover:underline"
            >
              {COMPANY.contact.mobile}
            </a>
          </p>
        </div>
      </article>
    </div>
  );
}
