import { GoogleMapsEmbed } from "@next/third-parties/google"
import Image from 'next/image'
import { google } from "googleapis"
import { Header } from "./header"
import { Images } from "./images"

export default function SePage() {
  return <Page lang={"se"} />
}

const folderId = "1uLUHC1nL_8091niN6GbjBMR78OeOg1hI"
const private_key = new Buffer(process.env.PRIVATE_KEY_BASE64, "base64")
  .toString("utf8")
  .split(String.raw`\n`)
  .join("\n")
const auth = new google.auth.GoogleAuth({
  credentials: {
    type: "service_account",
    project_id: "pp-mekanik",
    private_key_id: process.env.PRIVATE_KEY_ID,
    private_key: private_key,
    client_email: "website@pp-mekanik.iam.gserviceaccount.com",
    client_id: "117599555839545632958",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url:
      "https://www.googleapis.com/robot/v1/metadata/x509/website%40pp-mekanik.iam.gserviceaccount.com",
    universe_domain: "googleapis.com",
  },
  scopes: ["https://www.googleapis.com/auth/drive.readonly"],
})
const drive = google.drive({ version: "v3", auth })

export async function Page({ lang }) {
  const se = lang === "se"

  let images = []

  try {
    const response = await drive.files.list({
      q: `'${folderId}' in parents and mimeType contains 'image/'`,
      fields:
        "files(id, name, mimeType, webViewLink, webContentLink, imageMediaMetadata)",
    })
    images = response.data.files
      .map((file) => ({
        id: file.id,
        name: file.name,
        mimeType: file.mimeType,
        link: file.webContentLink || file.webViewLink,
        width: file.imageMediaMetadata?.width,
        height: file.imageMediaMetadata.height,
      }))
      .sort((a, b) => Number(a.name.replace(/\..*$/, '')) - Number(b.name.replace(/\..*$/, '')))
  } catch (err) {
    console.error(err)
  }

  return (
    <>
      <Header se={se} lang={lang} />
      <article id="main">
        <header className="Hero waypoint-section" id="hero">
          <div className="wrap">
            <h1 className="Hero-tagline">
              {se ? (
                <>
                  En liten verkstad <strong>med stora möjligheter</strong>.
                </>
              ) : (
                <>
                  A small workshop <strong>with big possibilities</strong>.
                </>
              )}
            </h1>

            <p className="Hero-description" id="description">
              {se ? (
                <>
                  Vi tillverkar metall- och plastdetaljer efter 3D-filer,
                  ritningar, skisser eller muntliga beskrivningar. Vi hjälper
                  gärna till att utveckla era idéer till precis det ni behöver.
                </>
              ) : (
                <>
                  We manufacture metal and plastic parts from 3D files,
                  drawings, sketches or verbal descriptions. Together we can
                  help you develop your ideas to satisfy your exact needs.
                </>
              )}
            </p>

            <Image
              priority
              width={471}
              height={436}
              src="/img/hero-image.png"
              alt="Skål producerad på vår mekaniska verkstad"
            />
          </div>
        </header>

        <div className="HomeVisits">
          <p>
            <img className="icon" src="/img/svg/home-visits.svg" />
            <span id="home-visits">
              {se ? (
                <>
                  Har ni en installation eller ett maskineri som inte går att
                  flytta, så kan även "hembesök" för uppmätning göras.
                </>
              ) : (
                <>
                  If you have an installation or machinery that can't be moved,
                  we also make home visits to measure your needs.
                </>
              )}
            </span>
          </p>
        </div>

        <section
          className="container--box Customers waypoint-section"
          id="customers"
        >
          <h2 className="Customers-regionDescription" id="region">
            {se ? (
              <>
                Närheten till Lund har resulterat i ett stort antal kunder
                därifrån, även om uppdragsgivare finns över hela Skandinavien.
              </>
            ) : (
              <>
                Our closeness to Lund has resulted in a large number of
                customers from there, but we also have several customers
                throughout Scandinavia.
              </>
            )}
          </h2>

          <section className="Customers-grid">
            <div className="Customer">
              <img className="Customer-icon" src="/img/svg/medicin.svg" />
              <p className="Customer-branch" id="medical-technology">
                {se ? "Medicinteknik" : "Medical technology"}
              </p>
            </div>

            <div className="Customer">
              <img className="Customer-icon" src="/img/svg/packaging.svg" />
              <p className="Customer-branch" id="packaging-industry">
                {se ? "Förpackningsindustri" : "Packaging industry"}
              </p>
            </div>

            <div className="Customer">
              <img
                className="Customer-icon"
                src="/img/svg/product-development.svg"
              />
              <p className="Customer-branch" id="product-development">
                {se ? "Produktutveckling" : "Product development"}
              </p>
            </div>

            <div className="Customer">
              <img className="Customer-icon" src="/img/svg/lightbulb.svg" />
              <p className="Customer-branch" id="opto-mechanics">
                {se ? "Optomekanik" : "Opto-mechanics"}
              </p>
            </div>

            <div className="Customer">
              <img className="Customer-icon" src="/img/svg/compose.svg" />
              <p className="Customer-branch" id="industrial-design">
                {se ? "Industridesign" : "Industrial design"}
              </p>
            </div>

            <div className="Customer">
              <img className="Customer-icon" src="/img/svg/group.svg" />
              <p className="Customer-branch" id="institutions">
                {se ? "Institutioner" : "Institutions"}
              </p>
            </div>

            <div className="Customer">
              <img className="Customer-icon" src="/img/svg/flask.svg" />
              <p className="Customer-branch" id="laboratories">
                {se ? "Laboratorier" : "Laboratories"}
              </p>
            </div>

            <div className="Customer">
              <img className="Customer-icon" src="/img/svg/it-telecom.svg" />
              <p className="Customer-branch">R&D</p>
            </div>
          </section>
        </section>

        <section className="JobTypes waypoint-section" id="job-types">
          <h2 id="what-we-do">{se ? "Vad vi gör" : "What we do"}</h2>

          <h3 id="what-we-do-text">
            {se ? (
              <>
                I verkstaden bearbetar vi diverse material. Störst rutin har vi
                på aluminium, vilket även lagerförs. Vi levererar hög kvalitet
                och att kunden ska bli riktigt nöjd har alltid högsta prioritet.
              </>
            ) : (
              <>
                We use various materials in our workshop but we have most
                experience using aluminium, which we always have in stock. We
                produce high quality results and always make sure that our
                customers are truly satisfied.
              </>
            )}
          </h3>

          <section className="JobTypes-grid">
            <div className="JobType">
              <img className="JobType-icon" src="/img/svg/cogs.svg" />
              <p className="JobType-title" id="construction-manufacturing">
                {se
                  ? "Konstruktion & Tillverkning"
                  : "Construction & Manufacturing"}
              </p>
            </div>

            <div className="JobType">
              <img className="JobType-icon" src="/img/svg/cnc.svg" />
              <p className="JobType-title" id="cad-cam-cnc">
                {se ? "CAD/CAM & CNC-fräsning" : "CAD/CAM & CNC milling"}
              </p>
            </div>

            <div className="JobType">
              <img className="JobType-icon" src="/img/svg/metal.svg" />
              <p className="JobType-title" id="metal-plastic">
                {se ? "Metall- & Plastdetaljer" : "Metal & Plastic parts"}
              </p>
            </div>

            <div className="JobType">
              <img className="JobType-icon" src="/img/svg/prototype.svg" />
              <p className="JobType-title" id="prototypes">
                {se ? "Prototyper & Lågserier" : "Prototypes & Small editions"}
              </p>
            </div>

            <div className="JobType">
              <img className="JobType-icon" src="/img/svg/open-box.svg" />
              <p className="JobType-title" id="shaped-parts">
                {se ? "Formatdelar för djupdragare" : "Parts for thermoforming"}
              </p>
            </div>

            <div className="JobType">
              <img className="JobType-icon" src="/img/svg/fixtur.svg" />
              <p className="JobType-title" id="stands">
                {se ? "Stativ & Ställningar" : "Stands & Racks"}
              </p>
            </div>

            <div className="JobType">
              <img className="JobType-icon" src="/img/svg/triangle.svg" />
              <p className="JobType-title" id="frames">
                {se ? "Stommar & Stöd" : "Frames & Support"}
              </p>
            </div>

            <div className="JobType">
              <img className="JobType-icon" src="/img/svg/special.svg" />
              <p className="JobType-title" id="special-devices">
                {se ? "Specialanordningar" : "Special devices"}
              </p>
            </div>

            <div className="JobType">
              <img className="JobType-icon" src="/img/svg/tripod.svg" />
              <p className="JobType-title" id="platforms">
                {se ? "Plattformar & Säten" : "Platforms & Seatings"}
              </p>
            </div>

            <div className="JobType">
              <img className="JobType-icon" src="/img/svg/wrench.svg" />
              <p className="JobType-title" id="reparations">
                {se ? "Reparationer & Ändringar" : "Repairs & Changes"}
              </p>
            </div>

            <div className="JobType">
              <img className="JobType-icon" src="/img/svg/finmekanik.svg" />
              <p className="JobType-title" id="tig-welding">
                {se
                  ? "Finmekanik & TIG-svetsning"
                  : "Precision mechanics & TIG welding"}
              </p>
            </div>

            <div className="JobType">
              <img className="JobType-icon" src="/img/svg/lab.svg" />
              <p className="JobType-title" id="test-lab-equipment">
                {se ? "Test- & labutrustning" : "Test & Laboratory equipment"}
              </p>
            </div>

            <div className="JobType">
              <img className="JobType-icon" src="/img/svg/jigg.svg" />
              <p className="JobType-title" id="jigs-rigs">
                {se ? "Jiggar & Riggar" : "Jigs & Rigs"}
              </p>
            </div>

            <div className="JobType">
              <img className="JobType-icon" src="/img/svg/pen-tool.svg" />
              <p className="JobType-title" id="gadgets">
                {se ? "Mojänger & Prylar" : "Gadgets & Contraptions"}
              </p>
            </div>

            <div className="JobType">
              <img className="JobType-icon" src="/img/svg/computer.svg" />
              <p className="JobType-title" id="simple-or-advanced">
                {se ? "Simpelt eller Avancerat" : "Simple or Advanced"}
              </p>
            </div>

            <div className="JobType">
              <img className="JobType-icon" src="/img/svg/van.svg" />
              <p className="JobType-title" id="homevisits-for-measurement">
                {se ? "Hembesök för Uppmätning" : "Home visits for measuring"}
              </p>
            </div>
          </section>
        </section>
        <Images se={se} images={images} />
      </article>

      <section className="Contact waypoint-section" id="contact">
        <h2 id="contact-us">{se ? "Kontakta oss" : "Contact us"}</h2>

        <h3 id="contact-us-text">
          {se ? (
            <>
              Hör gärna av dig om du har frågor eller funderingar. Du är också
              varmt välkommen att besöka oss!
            </>
          ) : (
            <>
              Please get in touch if you have any questions or queries. You are
              always welcome to visit us!
            </>
          )}
        </h3>

        <div className="Contact-wrap">
          <ul className="Contact-list">
            <li className="Contact-listHeading" id="telephone">
              {se ? "Telefon" : "Telephone"}
            </li>
            <li>046 - 514 90</li>
            <li className="Contact-listHeading">Jens Carlsson</li>
            <li>0705 - 74 45 14</li>
            <li className="Contact-listHeading" id="email">
              {se ? "E-post" : "Email"}
            </li>
            <li>pp.kontor[at]telia.com</li>
          </ul>

          <ul className="Contact-list">
            <li className="Contact-listHeading" id="address">
              {se ? "Adress" : "Address"}
            </li>
            <li className="contact-logo">PP Mekanik AB</li>
            <li>Borrsvängen 2</li>
            <li>247 32 Södra Sandby</li>
            <li>Sverige</li>
          </ul>
        </div>

        <div className="Contact-about">
          <p>
            <span id="contact-about">
              {se ? (
                <>
                  PP Mekanik AB startades redan 1977 av mina föräldrar. Jag har
                  arbetat i företaget sedan 1990 och övertog verksamheten 2008.
                </>
              ) : (
                <>
                  PP Mekanik was founded by my parents in 1977 and I've worked
                  in the company since 1990. I took the sole control of the
                  business in 2008.
                </>
              )}
            </span>
            <span className="Contact-aboutByLine">Jens Carlsson</span>
          </p>
        </div>
      </section>

      <div className="google-maps" id="google-maps">
        <GoogleMapsEmbed
          apiKey={process.env.GOOGLE_MAPS_API_KEY}
          height={500}
          zoom={11}
          width="100%"
          mode="place"
          q="place_id:ChIJA03UMRORU0YReKGIzVQZ5IM"
        />
      </div>

      <footer className="Footer" id="footer">
        <ul className="Footer-copyright">
          <li>
            Copyright © <span>{new Date().getFullYear()}</span>{" "}
            <strong>PP Mekanik AB</strong>
          </li>
        </ul>
      </footer>
    </>
  )
}
