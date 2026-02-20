import { useEffect, useMemo, useState } from "react";

// Replace later with your full 100 list.
// Keep the shape: { id: number, title: string }
const MOVIES = [
  { id: 1, title: "The Shawshank Redemption" },
  { id: 2, title: "The Godfather" },
  { id: 3, title: "The Dark Knight" },
  { id: 4, title: "Pulp Fiction" },
  { id: 5, title: "Schindler's List" },
  { id: 6, title: "The Lord of the Rings" },
  { id: 7, title: "Léon: The Professional" },
  { id: 8, title: "12 Angry Men" },
  { id: 9, title: "Forrest Gump" },
  { id: 10, title: "Fight Club" },
  { id: 11, title: "The Matrix" },
  { id: 12, title: "Star Wars" },
  { id: 13, title: "Se7en" },
  { id: 14, title: "City of God" },
  { id: 15, title: "Inception" },
  { id: 16, title: "One Flew Over the Cuckoo's Nest" },
  { id: 17, title: "The Lion King" },
  { id: 18, title: "The Prestige" },
  { id: 19, title: "The Usual Suspects" },
  { id: 20, title: "Shutter Island" },
  { id: 21, title: "A Clockwork Orange" },
  { id: 22, title: "The Green Mile" },
  { id: 23, title: "Saving Private Ryan" },
  { id: 24, title: "Back to the Future" },
  { id: 25, title: "Up" },
  { id: 26, title: "Snatch" },
  { id: 27, title: "Gladiator" },
  { id: 28, title: "Life Is Beautiful" },
  { id: 29, title: "Raiders of the Lost Ark" },
  { id: 30, title: "The Pianist" },
  { id: 31, title: "The Shining" },
  { id: 32, title: "American Beauty" },
  { id: 33, title: "Amélie" },
  { id: 34, title: "The Big Lebowski" },
  { id: 35, title: "WALL·E" },
  { id: 36, title: "3 Idiots" },
  { id: 37, title: "Toy Story" },
  { id: 38, title: "2001: A Space Odyssey" },
  { id: 39, title: "Casablanca" },
  { id: 40, title: "The Silence of the Lambs" },
  { id: 41, title: "American History X" },
  { id: 42, title: "The Terminator" },
  { id: 43, title: "Apocalypse Now" },
  { id: 44, title: "Memento" },
  { id: 45, title: "Braveheart" },
  { id: 46, title: "Seven Samurai" },
  { id: 47, title: "Scarface" },
  { id: 48, title: "Taxi Driver" },
  { id: 49, title: "The Grand Budapest Hotel" },
  { id: 50, title: "Fargo" },
  { id: 51, title: "The Avengers" },
  { id: 52, title: "American Psycho" },
  { id: 53, title: "Alien" },
  { id: 54, title: "The Untouchables" },
  { id: 55, title: "Guardians of the Galaxy" },
  { id: 56, title: "Kill Bill" },
  { id: 57, title: "A Beautiful Mind" },
  { id: 58, title: "Pirates of the Caribbean: The Curse of the Black Pearl" },
  { id: 59, title: "Goodfellas" },
  { id: 60, title: "The Departed" },
  { id: 61, title: "Hachi: A Dog's Tale" },
  { id: 62, title: "Spirited Away" },
  { id: 63, title: "Harry Potter and the Sorcerer's Stone" },
  { id: 64, title: "Pan's Labyrinth" },
  { id: 65, title: "Reservoir Dogs" },
  { id: 66, title: "Good Will Hunting" },
  { id: 67, title: "Interstellar" },
  { id: 68, title: "Django Unchained" },
  { id: 69, title: "Vertigo" },
  { id: 70, title: "Trainspotting" },
  { id: 71, title: "Citizen Kane" },
  { id: 72, title: "Eternal Sunshine of the Spotless Mind" },
  { id: 73, title: "Finding Nemo" },
  { id: 74, title: "Donnie Darko" },
  { id: 75, title: "Batman Begins" },
  { id: 76, title: "The Bourne Identity" },
  { id: 77, title: "No Country for Old Men" },
  { id: 78, title: "Cinema Paradiso" },
  { id: 79, title: "Dirty Dancing" },
  { id: 80, title: "The Good, the Bad and the Ugly" },
  { id: 81, title: "Lock, Stock and Two Smoking Barrels" },
  { id: 82, title: "Million Dollar Baby" },
  { id: 83, title: "Monsters, Inc." },
  { id: 84, title: "Requiem for a Dream" },
  { id: 85, title: "Titanic" },
  { id: 86, title: "Inglourious Basterds" },
  { id: 87, title: "Before Sunrise" },
  { id: 88, title: "Rocky" },
  { id: 89, title: "Blade Runner" },
  { id: 90, title: "Into the Wild" },
  { id: 91, title: "V for Vendetta" },
  { id: 92, title: "Logan" },
  { id: 93, title: "Indiana Jones and the Last Crusade" },
  { id: 94, title: "Mad Max" },
  { id: 95, title: "Amadeus" },
  { id: 96, title: "The Truman Show" },
  { id: 97, title: "Airplane!" },
  { id: 98, title: "The Great Dictator" },
  { id: 99, title: "Jaws" },
  { id: 100, title: "Groundhog Day" },
];

const LS_KEY = "posterPact_v1";

function makeLinks(title) {
  const q = encodeURIComponent(title);
  return {
    justwatch: `https://www.justwatch.com/uk/search?q=${q}`,
    prime: `https://www.amazon.co.uk/s?k=${q}&i=instant-video`,
  };
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

export default function App() {
  const [watchedIds, setWatchedIds] = useState(() => new Set());
  const [tonightNopeIds, setTonightNopeIds] = useState(() => new Set());
  const [currentId, setCurrentId] = useState(null);
  const [hydrated, setHydrated] = useState(false);

  const [ratings, setRatings] = useState(() => ({}));
  const [showList, setShowList] = useState(false);

  // Load once
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) {
        const data = JSON.parse(raw);
        setWatchedIds(new Set(data.watchedIds ?? []));
        setCurrentId(data.currentId ?? null);
        setRatings(data.ratings ?? {});
      }
      setTonightNopeIds(new Set()); // reset "tonight" each session
      setHydrated(true);
    } catch {
      setHydrated(true);
    }
  }, []);

  // Save (after hydration)
  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(
      LS_KEY,
      JSON.stringify({
        watchedIds: Array.from(watchedIds),
        currentId,
        ratings,
      })
    );
  }, [watchedIds, currentId, ratings, hydrated]);

  const watchedCount = watchedIds.size;
  const total = MOVIES.length;
  const pct = total ? Math.round((watchedCount / total) * 100) : 0;

  const badge =
    watchedCount >= 100
      ? "Pact Complete"
      : watchedCount >= 75
      ? "75% Menace"
      : watchedCount >= 50
      ? "Halfway Hexed"
      : watchedCount >= 25
      ? "Quarter-Cursed"
      : watchedCount >= 10
      ? "Warming Up"
      : "The Pact Begins";

  const currentMovie = useMemo(
    () => MOVIES.find((m) => m.id === currentId) ?? null,
    [currentId]
  );

  const unwatched = useMemo(() => {
    return MOVIES.filter(
      (m) => !watchedIds.has(m.id) && !tonightNopeIds.has(m.id)
    );
  }, [watchedIds, tonightNopeIds]);

  function roll() {
    if (unwatched.length === 0) {
      setCurrentId(null);
      return;
    }
    const pick = unwatched[Math.floor(Math.random() * unwatched.length)];
    setCurrentId(pick.id);
  }

  function markWatched(id) {
    setWatchedIds((prev) => new Set([...prev, id]));
    setTonightNopeIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }

  function unwatch(id) {
    setWatchedIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }

  function nopeTonight(id) {
    setTonightNopeIds((prev) => new Set([...prev, id]));
    // immediate reroll
    setTimeout(roll, 0);
  }

  function resetTonight() {
    setTonightNopeIds(new Set());
  }

  function setStarRating(id, stars) {
    const s = clamp(stars, 1, 5);
    setRatings((prev) => ({
      ...prev,
      [id]: { ...(prev[id] ?? {}), stars: s },
    }));
  }

  function setRewatch(id, rewatch) {
    setRatings((prev) => ({
      ...prev,
      [id]: { ...(prev[id] ?? {}), rewatch: !!rewatch },
    }));
  }

  // ---------- Glam styles (inline, no extra files needed) ----------
  const styles = {
    page: {
      minHeight: "100vh",
      background:
        "radial-gradient(1200px 600px at 20% 10%, rgba(218,165,32,0.12), transparent 55%), radial-gradient(900px 500px at 80% 20%, rgba(255,255,255,0.06), transparent 60%), linear-gradient(180deg, #0b0b0f, #0a0a0c)",
      color: "rgba(255,255,255,0.92)",
      fontFamily:
        'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
    },
    wrap: {
      maxWidth: 860,
      margin: "0 auto",
      padding: "28px 16px 40px",
    },
    header: {
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "space-between",
      gap: 12,
      marginBottom: 16,
    },
    titleBlock: {},
    title: {
      margin: 0,
        fontSize: 30,
        letterSpacing: 0.6,
        fontWeight: 700,
        fontFamily: '"Playfair Display", ui-serif, Georgia, serif',
    },
    subtitle: {
      marginTop: 6,
      fontSize: 13,
      opacity: 0.75,
    },
    pill: {
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      padding: "10px 12px",
      borderRadius: 999,
      border: "1px solid rgba(255,255,255,0.10)",
      background:
        "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
      boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
      fontSize: 13,
      whiteSpace: "nowrap",
    },
    meter: {
      height: 8,
      borderRadius: 999,
      background: "rgba(255,255,255,0.08)",
      overflow: "hidden",
      border: "1px solid rgba(255,255,255,0.08)",
      marginTop: 10,
    },
    meterFill: {
      height: "100%",
      width: `${pct}%`,
      background:
        "linear-gradient(90deg, rgba(218,165,32,0.95), rgba(255,215,120,0.9))",
      boxShadow: "0 0 18px rgba(218,165,32,0.35)",
    },
    controls: {
      display: "flex",
      flexWrap: "wrap",
      gap: 10,
      margin: "18px 0 16px",
    },
    btn: {
      cursor: "pointer",
      padding: "10px 12px",
      borderRadius: 12,
      border: "1px solid rgba(255,255,255,0.12)",
      color: "rgba(255,255,255,0.92)",
      background:
        "linear-gradient(180deg, rgba(255,255,255,0.07), rgba(255,255,255,0.02))",
      boxShadow: "0 14px 30px rgba(0,0,0,0.35)",
      backdropFilter: "blur(6px)",
      transition: "transform .08s ease, border-color .08s ease",
      fontWeight: 600,
    },
    btnGold: {
      background:
        "linear-gradient(180deg, rgba(218,165,32,0.95), rgba(160,110,10,0.92))",
      border: "1px solid rgba(255,215,120,0.25)",
      color: "#140f06",
      boxShadow: "0 16px 32px rgba(218,165,32,0.18)",
    },
    btnQuiet: {
      opacity: 0.9,
    },
    card: {
      borderRadius: 18,
      border: "1px solid rgba(255,255,255,0.10)",
      background:
        "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
      boxShadow: "0 18px 45px rgba(0,0,0,0.45)",
      padding: 18,
    },
    movieTitle: {
      margin: 0,
      fontSize: 22,
      letterSpacing: 0.2,
    },
    row: {
      display: "flex",
      flexWrap: "wrap",
      gap: 10,
      marginTop: 12,
      alignItems: "center",
    },
    link: {
      display: "inline-flex",
      gap: 8,
      alignItems: "center",
      padding: "8px 10px",
      borderRadius: 12,
      border: "1px solid rgba(255,255,255,0.10)",
      color: "rgba(255,255,255,0.92)",
      textDecoration: "none",
      background: "rgba(0,0,0,0.18)",
    },
    split: {
      display: "flex",
      flexWrap: "wrap",
      gap: 10,
      marginTop: 14,
    },
    divider: {
      height: 1,
      background: "rgba(255,255,255,0.10)",
      margin: "18px 0",
    },
    sectionTitle: {
      fontSize: 13,
      opacity: 0.8,
      marginBottom: 10,
      letterSpacing: 0.2,
    },
    starBtn: (active) => ({
      cursor: "pointer",
      padding: "7px 10px",
      borderRadius: 12,
      border: "1px solid rgba(255,255,255,0.12)",
      background: active
        ? "rgba(218,165,32,0.18)"
        : "rgba(255,255,255,0.04)",
      color: "rgba(255,255,255,0.92)",
      fontWeight: 600,
    }),
    checkbox: {
      display: "inline-flex",
      gap: 10,
      alignItems: "center",
      opacity: 0.9,
      fontSize: 13,
      marginTop: 10,
    },
    listGrid: {
      display: "grid",
      gridTemplateColumns: "1fr auto",
      gap: 10,
    },
    listRow: {
      display: "contents",
    },
    listItem: {
      padding: "8px 0",
      opacity: 0.95,
    },
    tag: {
      display: "inline-flex",
      alignItems: "center",
      padding: "6px 10px",
      borderRadius: 999,
      border: "1px solid rgba(255,255,255,0.10)",
      background: "rgba(0,0,0,0.20)",
      fontSize: 12,
      opacity: 0.85,
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.wrap}>
        <div style={styles.header}>
          <div style={styles.titleBlock}>
            <h1 style={styles.title}>The Poster Pact</h1>
            <div style={styles.subtitle}>
              UK availability shortcuts • Prime search • progress saved on this
              device
            </div>
            <div style={styles.meter} aria-label="completion meter">
              <div style={styles.meterFill} />
            </div>
          </div>

          <div style={styles.pill}>
            <span>{watchedCount}/{total}</span>
            <span style={{ opacity: 0.55 }}>•</span>
            <span>{pct}%</span>
            <span style={{ opacity: 0.55 }}>•</span>
            <span style={{ color: "rgba(255,215,120,0.95)" }}>{badge}</span>
          </div>
        </div>

        <div style={styles.controls}>
          <button style={{ ...styles.btn, ...styles.btnGold }} onClick={roll}>
            Roll
          </button>
          <button style={{ ...styles.btn, ...styles.btnQuiet }} onClick={resetTonight}>
            Reset nopes
          </button>
          <button style={styles.btn} onClick={() => setShowList((s) => !s)}>
            {showList ? "Hide checklist" : "Show checklist"}
          </button>
          <span style={styles.tag}>
            Tonight pool: {unwatched.length} available
          </span>
        </div>

        <div style={styles.card}>
          {!currentMovie ? (
            <div style={{ opacity: 0.75 }}>
              No pick yet. Hit Roll and let fate do its thing.
            </div>
          ) : (
            <>
              <h2 style={styles.movieTitle}>{currentMovie.title}</h2>

              <div style={styles.split}>
                {!watchedIds.has(currentMovie.id) ? (
                  <button
                    style={{ ...styles.btn, ...styles.btnGold }}
                    onClick={() => markWatched(currentMovie.id)}
                  >
                    Mark watched
                  </button>
                ) : (
                  <button style={styles.btn} onClick={() => unwatch(currentMovie.id)}>
                    Undo watched
                  </button>
                )}

                <button
                  style={{ ...styles.btn, ...styles.btnQuiet }}
                  onClick={() => nopeTonight(currentMovie.id)}
                >
                  Reroll
                </button>
              </div>

              <div style={styles.divider} />

              <div style={styles.sectionTitle}>Rating</div>
              <div style={styles.row}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    style={styles.starBtn((ratings[currentMovie.id]?.stars ?? 0) >= s)}
                    onClick={() => setStarRating(currentMovie.id, s)}
                  >
                    ★ {s}
                  </button>
                ))}
              </div>

              <label style={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={!!ratings[currentMovie.id]?.rewatch}
                  onChange={(e) => setRewatch(currentMovie.id, e.target.checked)}
                />
                Would rewatch
              </label>

              <div style={styles.divider} />

              <div style={{ ...styles.row, marginTop: 0 }}>
                <a
                  style={{
                    ...styles.link,
                    fontSize: 12,
                    padding: "7px 9px",
                    opacity: 0.85,
                  }}
                  href={makeLinks(currentMovie.title).justwatch}
                  target="_blank"
                  rel="noreferrer"
                >
                  JustWatch (UK)
                </a>
                <a
                  style={{
                    ...styles.link,
                    fontSize: 12,
                    padding: "7px 9px",
                    opacity: 0.85,
                  }}
                  href={makeLinks(currentMovie.title).prime}
                  target="_blank"
                  rel="noreferrer"
                >
                  Prime search
                </a>
              </div>
            </>
          )}
        </div>

        {showList && (
          <>
            <div style={styles.divider} />
            <div style={styles.sectionTitle}>Checklist</div>

            <div style={styles.card}>
              <div style={styles.listGrid}>
                {MOVIES.map((m) => (
                  <div key={m.id} style={styles.listRow}>
                    <div style={styles.listItem}>
                      {watchedIds.has(m.id) ? "✓ " : "○ "}
                      {m.title}
                      {ratings[m.id]?.stars ? (
                        <span style={{ opacity: 0.6 }}>
                          {" "}
                          — {ratings[m.id].stars}/5
                        </span>
                      ) : null}
                    </div>
                    <button
                      style={styles.btn}
                      onClick={() =>
                        watchedIds.has(m.id) ? unwatch(m.id) : markWatched(m.id)
                      }
                    >
                      Toggle
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}