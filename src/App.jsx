import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Car from './Car'
import Logo from './Logo'

gsap.registerPlugin(ScrollTrigger)

const HEADLINE = 'WELCOME ITZFIZZ'
const BRAND = 'ITZFIZZ'

// side = which edge the metric sits on, top = vertical position in vh
const STATS = [
  { value: 58, label: 'Increase in pick up point use', side: 'left', top: 30 },
  { value: 23, label: 'Decrease in customer phone calls', side: 'right', top: 46 },
  { value: 27, label: 'Increase in pick up point use', side: 'left', top: 62 },
  { value: 40, label: 'Increase in pick up point use', side: 'right', top: 78 },
]

// Scroll timeline: car drives 0 → CAR_END (straight down), then rocket + brand take over
const CAR_START_VH = 22
const CAR_END_VH = 112
const CAR_END = 8

export default function App() {
  const root = useRef(null)
  const confetti = useRef(null)

  useLayoutEffect(() => {
    const q = gsap.utils.selector(root)

    const ctx = gsap.context(() => {
      /* ---------- 1. Intro: logo, headline and car (plays once on load) ---------- */
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from(q('.logo'), { opacity: 0, y: -16, duration: 0.8 })
        .from(q('.h-char'), { yPercent: 120, opacity: 0, stagger: 0.045, duration: 1 }, 0.1)
        .from(q('.car-wrap'), { y: '-30vh', opacity: 0, duration: 1.1 }, 0.5)
        .from(q('.scroll-hint'), { opacity: 0, duration: 0.8 }, 1.2)

      /* ---------- 2. Scroll timeline (progress-based, scrubbed) ---------- */
      let fired = false
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: q('.stage')[0],
          start: 'top top',
          end: '+=450%',
          pin: true,
          scrub: 1.2, // smooths scroll → eased, fluid motion
          onUpdate: (self) => {
            if (self.progress > 0.94 && !fired) { fired = true; celebrate() }
            if (self.progress < 0.8) fired = false
          },
        },
      })

      tl.to(q('.scroll-hint'), { opacity: 0, duration: 0.4 }, 0)
        .fromTo(q('.car-wrap'), { y: `${CAR_START_VH}vh` }, { y: `${CAR_END_VH}vh`, duration: CAR_END }, 0)
        .fromTo(q('.trail'), { scaleY: 0 }, { scaleY: 1, duration: CAR_END }, 0)

      // each metric appears exactly as the car drives down to its height
      q('.stat').forEach((el, i) => {
        const s = STATS[i]
        const at = Math.max(0, (s.top - CAR_START_VH - 4) / (CAR_END_VH - CAR_START_VH)) * CAR_END
        const num = q('.stat-num')[i]
        const counter = { n: 0 }
        tl.fromTo(el, { opacity: 0, x: s.side === 'left' ? -60 : 60 }, { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' }, at)
          .fromTo(q('.stat-line')[i], { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: 'power2.out' }, at + 0.15)
          .to(counter, { n: s.value, duration: 0.9, onUpdate: () => { num.textContent = Math.round(counter.n) } }, at)
      })

      // fire-orange layer rises, rocket launches, brand reveals
      tl.fromTo(q('.flood'), { scaleY: 0 }, { scaleY: 1, duration: 2, ease: 'power2.in' }, 6.5)
        .fromTo(q('.rocket'), { y: '30vh', opacity: 0 }, { y: '-130vh', opacity: 1, duration: 2.6, ease: 'power1.in' }, 7)
        .fromTo(q('.b-char'), { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, stagger: 0.08, duration: 0.8, ease: 'power3.out' }, 8.4)
        .fromTo(q('.b-sub'), { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, 9.2)
        .to({}, { duration: 0.01 }, 10)

      /* ---------- 3. Celebration burst (flash + ring + confetti, no text) ---------- */
      function celebrate() {
        gsap.timeline()
          .fromTo(q('.flash'), { opacity: 0.6 }, { opacity: 0, duration: 0.9, ease: 'power2.out' })
          .fromTo(q('.ring'), { scale: 0.2, opacity: 0.9 }, { scale: 7, opacity: 0, duration: 1.2, ease: 'power2.out' }, 0)
        const box = confetti.current
        const colors = ['#ff5a1f', '#ffffff', '#0a0a0a', '#ffb08a']
        for (let i = 0; i < 70; i++) {
          const p = document.createElement('i')
          Object.assign(p.style, {
            position: 'absolute', left: '50%', top: '55%', width: '8px', height: '14px',
            borderRadius: '2px', background: colors[i % colors.length],
          })
          box.appendChild(p)
          gsap.to(p, {
            x: gsap.utils.random(-480, 480), y: gsap.utils.random(-420, 260),
            rotation: gsap.utils.random(-540, 540), duration: gsap.utils.random(1.2, 2.2), ease: 'power3.out',
            onComplete: () => gsap.to(p, { opacity: 0, y: '+=120', duration: 0.6, onComplete: () => p.remove() }),
          })
        }
      }
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <main ref={root}>
      <section className="stage relative h-screen overflow-hidden bg-ink">
        {/* orange light path drawn behind the car */}
        <div className="trail absolute left-1/2 w-[clamp(90px,11vw,160px)] -translate-x-1/2 origin-top bg-linear-to-b from-fire/0 to-fire/45 will-change-transform"
             style={{ top: `${CAR_START_VH - 6}vh`, height: `${CAR_END_VH - CAR_START_VH + 6}vh` }} />

        <Logo className="logo absolute left-[4vw] top-[3.2vh] z-30" />

        <h1 className="headline absolute inset-x-0 top-[3vh] z-20 text-center text-[clamp(1.1rem,3vw,2.6rem)] font-light leading-none">
          {HEADLINE.split('').map((c, i) => (
            <span key={i} className="inline-block overflow-hidden align-bottom">
              <span className="h-char inline-block" style={{ marginRight: c === ' ' ? '1.1em' : '0.55em' }}>
                {c === ' ' ? '\u00A0' : c}
              </span>
            </span>
          ))}
        </h1>

        {/* metrics: hidden until the car reaches them */}
        {STATS.map((s, i) => (
          <article key={i}
            className={`stat absolute z-10 w-[clamp(150px,18vw,310px)] opacity-0 will-change-transform ${s.side === 'left' ? 'left-[2vw] text-left' : 'right-[2vw] text-right'}`}
            style={{ top: `${s.top}vh` }}>
            <p className="text-[clamp(2.6rem,6vw,5.5rem)] font-light leading-none"><span className="stat-num">0</span>%</p>
            <div className={`stat-line my-3 h-px bg-fire ${s.side === 'left' ? 'origin-left' : 'origin-right'}`} />
            <p className="text-sm md:text-base text-white/60">{s.label}</p>
          </article>
        ))}

        <div className="car-wrap absolute left-1/2 top-0 z-20 w-[clamp(50px,6vw,84px)] -translate-x-1/2 will-change-transform">
          <Car />
        </div>

        {/* end scene */}
        <div className="flood absolute inset-0 z-30 origin-bottom bg-fire will-change-transform" />
        <div className="rocket absolute left-1/2 bottom-0 z-40 -translate-x-1/2 text-[clamp(3rem,8vw,6rem)] opacity-0 will-change-transform">
          <span className="inline-block -rotate-45">🚀</span>
        </div>

        <div className="absolute inset-0 z-40 flex flex-col items-center justify-center px-4 text-center text-ink">
          <svg viewBox="0 0 40 40" className="mb-6 h-14 w-14" aria-hidden="true">
            <rect width="40" height="40" rx="11" fill="#0a0a0a" />
            <path d="M23 6 11 22h8l-2 12 12-17h-8z" fill="#ff5a1f" />
          </svg>
          <h2 className="text-[clamp(2.4rem,11vw,9rem)] font-light leading-none tracking-[0.12em]">
            {BRAND.split('').map((c, i) => (
              <span key={i} className="inline-block overflow-hidden"><span className="b-char inline-block">{c}</span></span>
            ))}
          </h2>
          <p className="b-sub mt-6 max-w-md text-lg text-ink/70">Built to move. Made to be remembered.</p>
        </div>

        {/* celebration layers */}
        <div className="flash pointer-events-none absolute inset-0 z-50 bg-white opacity-0" />
        <div className="ring pointer-events-none absolute left-1/2 top-[55%] z-50 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-ink opacity-0" />
        <div ref={confetti} className="pointer-events-none absolute inset-0 z-50 overflow-hidden" />

        <p className="scroll-hint absolute bottom-6 left-1/2 z-20 -translate-x-1/2 text-xs tracking-[0.5em] text-white/60">SCROLL</p>
      </section>
    </main>
  )
}
