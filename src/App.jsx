import { useMemo, useState } from "react"
import blueSequinDress from "./assets/dresses/blue-sequin-dress.jpeg"
import greenAutumnDress from "./assets/dresses/green-autumn-dress.jpeg"
import lilacFlowerDress from "./assets/dresses/lilac-flower-dress.jpeg"
import nallynLogo from "./assets/nallyn-logo.png"
import pinkFlowerDress from "./assets/dresses/pink-flower-dress.jpeg"
import pinkTulleDress from "./assets/dresses/pink-tulle-dress.jpeg"
import whiteGardenDress from "./assets/dresses/white-garden-dress.jpeg"
import whitePearlDress from "./assets/dresses/white-pearl-dress.jpeg"
import "./App.css"

const allDressModules = import.meta.glob("./assets/all-dresses/*.jpeg", {
  eager: true,
  import: "default",
})

const allDressImages = Object.entries(allDressModules)
  .sort(([firstPath], [secondPath]) => firstPath.localeCompare(secondPath))
  .map(([path, image]) => ({
    image,
    name: path.split("/").pop(),
  }))

const imageByName = new Map(
  allDressImages.map((dressImage) => [dressImage.name, dressImage.image]),
)

const createModel = (title, imageNames) => ({
  title,
  cover: imageByName.get(imageNames[0]),
  images: imageNames.map((imageName) => imageByName.get(imageName)).filter(Boolean),
})

const dressModels = [
  createModel("Plava haljina kod fontane", ["dress-01.jpeg"]),
  createModel("Bela cvetna haljina", ["dress-02.jpeg", "dress-30.jpeg"]),
  createModel("Tamna cvetna haljina", ["dress-03.jpeg", "dress-04.jpeg"]),
  createModel("Romanticni komplet pored vode", [
    "dress-05.jpeg",
    "dress-06.jpeg",
    "dress-09.jpeg",
  ]),
  createModel("Tirkizna haljina", ["dress-07.jpeg"]),
  createModel("Bela elegantna kombinacija", ["dress-08.jpeg"]),
  createModel("Roze tulle haljina", [
    "dress-12.jpeg",
    "dress-13.jpeg",
    "dress-14.jpeg",
    "dress-15.jpeg",
    "dress-21.jpeg",
    "dress-29.jpeg",
  ]),
  createModel("Beli letnji komplet", ["dress-16.jpeg", "dress-25.jpeg", "dress-27.jpeg"]),
  createModel("Crvena haljina", ["dress-17.jpeg", "dress-18.jpeg"]),
  createModel("Ljubicasta haljina", ["dress-19.jpeg", "dress-20.jpeg"]),
  createModel("Zuta haljina", ["dress-22.jpeg"]),
  createModel("Bela haljina sa perlama", ["dress-23.jpeg"]),
  createModel("Plavi detalj sa velom", ["dress-24.jpeg"]),
  createModel("Plava haljina sa balonima", ["dress-26.jpeg", "dress-28.jpeg"]),
  createModel("Crna i roze kombinacija", ["dress-10.jpeg", "dress-11.jpeg"]),
].filter((model) => model.cover && model.images.length > 0)

const dresses = [
  {
    title: "Roze cvetna haljina",
    text: "Razigran model sa volumenom i cvetnim detaljima, idealan za letnje fotografisanje.",
    image: pinkFlowerDress,
  },
  {
    title: "Plava svecana haljina",
    text: "Elegantna kombinacija svetloplave nijanse, sjaja i leprsavog pada materijala.",
    image: blueSequinDress,
  },
  {
    title: "Zeleni jesenji model",
    text: "Urbani kroj u zelenim tonovima koji se prirodno uklapa u temu sajta.",
    image: greenAutumnDress,
  },
  {
    title: "Bela haljina sa perlama",
    text: "Cist, prefinjen model sa naglasenim ledjima i detaljima koji privlace paznju.",
    image: whitePearlDress,
  },
  {
    title: "Bela vrtna haljina",
    text: "Nezna bela haljina sa cvetnom teksturom, pogodna za porodicne i svecane scene.",
    image: whiteGardenDress,
  },
  {
    title: "Lila cvetna haljina",
    text: "Efektan model sa velikim cvetnim detaljem i mekom lila bojom.",
    image: lilacFlowerDress,
  },
]

function App() {
  const [page, setPage] = useState(
    window.location.hash === "#sve-haljine" ? "all-dresses" : "home",
  )
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [pausedRows, setPausedRows] = useState({})
  const [rowOffsets, setRowOffsets] = useState([0, 0, 0])
  const [activeModel, setActiveModel] = useState(null)
  const [activeModelImageIndex, setActiveModelImageIndex] = useState(0)

  const dressRows = useMemo(() => {
    return [
      dressModels,
      [...dressModels.slice(5), ...dressModels.slice(0, 5)],
      [...dressModels.slice(10), ...dressModels.slice(0, 10)],
    ].filter((row) => row.length > 0)
  }, [])

  const showHomePage = () => {
    setIsMenuOpen(false)
    setPage("home")
    window.location.hash = "pocetna"
  }

  const showAllDressesPage = () => {
    setIsMenuOpen(false)
    setPage("all-dresses")
    window.location.hash = "sve-haljine"
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const toggleRow = (rowIndex) => {
    setPausedRows((currentRows) => ({
      ...currentRows,
      [rowIndex]: !currentRows[rowIndex],
    }))
  }

  const moveRow = (rowIndex, direction) => {
    setRowOffsets((currentOffsets) => {
      const nextOffsets = [...currentOffsets]
      const rowLength = dressRows[rowIndex].length
      nextOffsets[rowIndex] =
        (nextOffsets[rowIndex] + direction + rowLength) % rowLength

      return nextOffsets
    })
  }

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#pocetna" aria-label="Pocetna" onClick={showHomePage}>
          <img className="brand-logo" src={nallynLogo} alt="Nallyn" />
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-controls="main-navigation"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Zatvori meni" : "Otvori meni"}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        {isMenuOpen && (
          <button
            className="menu-backdrop"
            type="button"
            aria-label="Zatvori meni"
            onClick={() => setIsMenuOpen(false)}
          />
        )}

        <nav
          className={`main-nav ${isMenuOpen ? "is-open" : ""}`}
          id="main-navigation"
          aria-label="Glavna navigacija"
        >
          <a href="#pocetna" onClick={showHomePage}>Pocetna</a>
          <a href="#o-meni" onClick={showHomePage}>O meni</a>
          <a className="new-dresses-link" href="#sve-haljine" onClick={showAllDressesPage}>
            Sve Haljine
          </a>
          <a href="#haljine" onClick={showHomePage}>Haljine</a>
        </nav>
      </header>

      {page === "home" ? (
        <HomePage />
      ) : (
        <AllDressesPage
          dressRows={dressRows}
          moveRow={moveRow}
          openModel={(model) => {
            setActiveModel(model)
            setActiveModelImageIndex(0)
          }}
          pausedRows={pausedRows}
          rowOffsets={rowOffsets}
          toggleRow={toggleRow}
        />
      )}

      <footer className="site-footer">
        <div>
          <p className="eyebrow">Kontakt</p>
          <h2>Za saradnju i dodatne informacije</h2>
        </div>

        <address className="footer-contact">
          <a href="https://www.instagram.com/example" target="_blank" rel="noreferrer">
            Instagram: @example
          </a>
          <a href="mailto:example@example.com">Email: example@example.com</a>
          <a href="tel:+381601234567">Telefon: +381 60 123 4567</a>
        </address>
      </footer>

      {activeModel && (
        <div className="image-modal" role="dialog" aria-modal="true">
          <button
            className="modal-backdrop"
            type="button"
            aria-label="Zatvori uvecanu sliku"
            onClick={() => setActiveModel(null)}
          />
          <div className="modal-content">
            <button
              className="modal-close"
              type="button"
              aria-label="Zatvori"
              onClick={() => setActiveModel(null)}
            >
              X
            </button>
            <img
              className="modal-main-image"
              src={activeModel.images[activeModelImageIndex]}
              alt={activeModel.title}
            />
            <div className="modal-thumbnails" aria-label={`Sve slike: ${activeModel.title}`}>
              {activeModel.images.map((image, imageIndex) => (
                <button
                  className={
                    imageIndex === activeModelImageIndex ? "is-selected" : ""
                  }
                  type="button"
                  key={image}
                  aria-label={`Slika ${imageIndex + 1}`}
                  onClick={() => setActiveModelImageIndex(imageIndex)}
                >
                  <img src={image} alt={`${activeModel.title} ${imageIndex + 1}`} />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function HomePage() {
  return (
    <main>
      <section className="hero-section" id="pocetna">
        <div className="hero-content">
          <p className="eyebrow">Licni portfolio haljina</p>
          <h1>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h1>
          <p className="hero-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            vitae sem at nibh placerat luctus sed vitae arcu.
          </p>
          <a className="hero-link" href="#haljine">
            Pogledaj haljine
          </a>
        </div>

        <div className="hero-image-wrap">
          <img src={pinkTulleDress} alt="Roze haljina pored vode" />
        </div>
      </section>

      <section className="about-section" id="o-meni">
        <div>
          <p className="eyebrow">O osobi</p>
          <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h2>
        </div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
          viverra, massa sed elementum pretium, nibh justo suscipit nisl, vitae
          tincidunt libero lectus non neque. Donec sed velit at purus bibendum
          dictum.
        </p>
      </section>

      <section className="feature-strip" aria-label="Istaknute osobine">
        <div>
          <span>01</span>
          <strong>Nezan vizuelni identitet</strong>
        </div>
        <div>
          <span>02</span>
          <strong>Roze i zelena tema</strong>
        </div>
        <div>
          <span>03</span>
          <strong>Kartice za haljine</strong>
        </div>
      </section>

      <section className="dresses-section" id="haljine">
        <div className="section-heading">
          <p className="eyebrow">Galerija</p>
          <h2>Haljine</h2>
        </div>

        <div className="dress-grid">
          {dresses.map((dress) => (
            <article className="dress-card" key={dress.title}>
              <img src={dress.image} alt={dress.title} />
              <div className="dress-card-content">
                <h3>{dress.title}</h3>
                <p>{dress.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

function AllDressesPage({
  dressRows,
  moveRow,
  openModel,
  pausedRows,
  rowOffsets,
  toggleRow,
}) {
  return (
    <main className="all-dresses-page" id="sve-haljine">
      <section className="all-dresses-hero">
        <p className="eyebrow">Kompletna ponuda</p>
        <h1>Sve Haljine</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
          blandit lorem non arcu luctus, sed gravida sem fermentum.
        </p>
      </section>

      <section className="moving-gallery" aria-label="Svi modeli haljina">
        {dressRows.map((rowImages, rowIndex) => {
          const isPaused = Boolean(pausedRows[rowIndex])
          const shiftedModels = rotateItems(rowImages, rowOffsets[rowIndex])
          const visibleModels = isPaused
            ? shiftedModels
            : [...rowImages, ...rowImages]

          return (
            <div
              className={`gallery-row ${isPaused ? "is-paused" : ""}`}
              key={`row-${rowIndex}`}
              onClick={() => toggleRow(rowIndex)}
            >
              {isPaused && (
                <>
                  <button
                    className="row-arrow row-arrow-left"
                    type="button"
                    aria-label="Prethodna slika"
                    onClick={(event) => {
                      event.stopPropagation()
                      moveRow(rowIndex, -1)
                    }}
                  >
                    &lt;
                  </button>
                  <button
                    className="row-arrow row-arrow-right"
                    type="button"
                    aria-label="Sledeca slika"
                    onClick={(event) => {
                      event.stopPropagation()
                      moveRow(rowIndex, 1)
                    }}
                  >
                    &gt;
                  </button>
                </>
              )}

              <div
                className={`gallery-track row-direction-${rowIndex}`}
                aria-live="polite"
              >
                {visibleModels.map((model, modelIndex) => (
                  <button
                    className="gallery-image-button"
                    type="button"
                    key={`${model.title}-${modelIndex}`}
                    onClick={(event) => {
                      event.stopPropagation()
                      openModel(model)
                    }}
                  >
                    <img src={model.cover} alt={model.title} />
                  </button>
                ))}
              </div>
            </div>
          )
        })}
      </section>
    </main>
  )
}

function rotateItems(items, offset) {
  if (items.length === 0) {
    return items
  }

  return [...items.slice(offset), ...items.slice(0, offset)]
}

export default App
