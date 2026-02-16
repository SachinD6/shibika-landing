"use client";

import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const revealRefs = useRef<HTMLDivElement[]>([]);
  const counterRefs = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    // Loading screen
    const timer = setTimeout(() => setIsLoaded(true), 2800);

    // Scroll handler
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);

    // Custom cursor
    const handleMouse = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener("mousemove", handleMouse);

    // Hover effects for cursor
    const interactiveElements = document.querySelectorAll(
      "a, button, .collection-item, .showcase-card, .testimonial-card, .quality-feature"
    );
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", () =>
        cursorRef.current?.classList.add("hovering")
      );
      el.addEventListener("mouseleave", () =>
        cursorRef.current?.classList.remove("hovering")
      );
    });

    // Intersection Observer for reveal animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    revealRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    // Counter animations
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLSpanElement;
            const target = parseInt(el.getAttribute("data-target") || "0");
            const suffix = el.getAttribute("data-suffix") || "";
            animateCounter(el, target, suffix);
            counterObserver.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );

    counterRefs.current.forEach((el) => {
      if (el) counterObserver.observe(el);
    });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouse);
      observer.disconnect();
      counterObserver.disconnect();
    };
  }, []);

  const animateCounter = (
    el: HTMLSpanElement,
    target: number,
    suffix: string
  ) => {
    let current = 0;
    const increment = target / 60;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current) + suffix;
    }, 30);
  };

  const addRevealRef = (el: HTMLDivElement | null) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  const addCounterRef = (el: HTMLSpanElement | null) => {
    if (el && !counterRefs.current.includes(el)) {
      counterRefs.current.push(el);
    }
  };

  return (
    <>
      {/* Loading Screen */}
      <div className={`loading-screen ${isLoaded ? "hide" : ""}`}>
        <div className="loading-logo">Shibika</div>
        <div className="loading-bar"></div>
      </div>

      {/* Custom Cursor */}
      <div ref={cursorRef} className="cursor-follower"></div>

      {/* Grain Overlay */}
      <div className="grain-overlay"></div>

      {/* Navigation */}
      <nav className={`nav-container ${isScrolled ? "scrolled" : ""}`}>
        <a href="#" className="nav-logo">
          Shibika
        </a>
        <ul className={`nav-links ${mobileMenuOpen ? "mobile-open" : ""}`}>
          <li>
            <a
              href="#philosophy"
              className="nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              Philosophy
            </a>
          </li>
          <li>
            <a
              href="#collection"
              className="nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              Collection
            </a>
          </li>
          <li>
            <a
              href="#quality"
              className="nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              Quality
            </a>
          </li>
          <li>
            <a
              href="#stories"
              className="nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              Stories
            </a>
          </li>
          <li>
            <button className="nav-cta" onClick={() => setMobileMenuOpen(false)}>
              <span>Shop Now</span>
            </button>
          </li>
        </ul>
        <button
          className={`menu-toggle ${mobileMenuOpen ? "active" : ""}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      {/* ===================== HERO ===================== */}
      <section className="hero" id="hero">
        <div className="hero-bg-pattern"></div>
        <div className="hero-floating-shapes">
          <div className="floating-shape"></div>
          <div className="floating-shape"></div>
          <div className="floating-shape"></div>
          <div className="floating-shape"></div>
        </div>

        <div className="hero-badge">
          <span className="hero-badge-dot"></span>
          Crafted in India · Since 2025
        </div>

        <h1 className="hero-title">
          <span className="hero-title-line">
            <span>Where Every</span>
          </span>
          <span className="hero-title-line">
            <span>
              Idea Finds <em>a Home</em>
            </span>
          </span>
        </h1>

        <p className="hero-subtitle">
          Premium notebooks and stationery rooted in India&apos;s spirit of
          creativity. Exceptional quality, remarkable value — stationery that
          inspires without being expensive.
        </p>

        <div className="hero-cta-group">
          <a href="#collection" className="btn-primary">
            <span>Explore Collection</span>
          </a>
          <a href="#philosophy" className="btn-outline">
            <span>Our Story</span>
          </a>
        </div>

        <div className="hero-scroll-indicator">
          <div className="hero-scroll-line"></div>
          <span className="hero-scroll-text">Scroll</span>
        </div>
      </section>

      {/* ===================== MARQUEE ===================== */}
      <section className="marquee-section">
        <div className="marquee-track">
          <div className="marquee-content">
            <span className="marquee-item">Premium Quality</span>
            <span className="marquee-separator"></span>
            <span className="marquee-item">Handcrafted Design</span>
            <span className="marquee-separator"></span>
            <span className="marquee-item">Made in India</span>
            <span className="marquee-separator"></span>
            <span className="marquee-item">Sustainable Materials</span>
            <span className="marquee-separator"></span>
            <span className="marquee-item">Exceptional Value</span>
            <span className="marquee-separator"></span>
            <span className="marquee-item">For Every Creator</span>
            <span className="marquee-separator"></span>
          </div>
          <div className="marquee-content">
            <span className="marquee-item">Premium Quality</span>
            <span className="marquee-separator"></span>
            <span className="marquee-item">Handcrafted Design</span>
            <span className="marquee-separator"></span>
            <span className="marquee-item">Made in India</span>
            <span className="marquee-separator"></span>
            <span className="marquee-item">Sustainable Materials</span>
            <span className="marquee-separator"></span>
            <span className="marquee-item">Exceptional Value</span>
            <span className="marquee-separator"></span>
            <span className="marquee-item">For Every Creator</span>
            <span className="marquee-separator"></span>
          </div>
        </div>
      </section>

      {/* ===================== PHILOSOPHY ===================== */}
      <section className="philosophy-section" id="philosophy">
        <div className="philosophy-grid">
          <div>
            <div ref={addRevealRef} className="reveal">
              <p className="philosophy-label">Our Philosophy</p>
              <h2 className="philosophy-heading">
                Great Ideas Deserve <em>Great Tools</em>
              </h2>
            </div>
            <div ref={addRevealRef} className="reveal reveal-delay-2">
              <p className="philosophy-text">
                Rooted in India&apos;s spirit of creativity and craftsmanship,
                Shibika is a stationery brand dedicated to offering exceptional
                quality at a reasonable price. Every product reflects our
                commitment to excellence, durability, and value. We believe that
                great ideas deserve the right tools — stationery that inspires
                without being expensive.
              </p>
            </div>
            <div ref={addRevealRef} className="reveal reveal-delay-3">
              <div className="philosophy-stats">
                <div className="stat-item">
                  <div className="stat-number">
                    <span
                      ref={addCounterRef}
                      className="counter"
                      data-target="50"
                      data-suffix="+"
                    >
                      0
                    </span>
                  </div>
                  <p className="stat-label">Products</p>
                </div>
                <div className="stat-item">
                  <div className="stat-number">
                    <span
                      ref={addCounterRef}
                      className="counter"
                      data-target="10"
                      data-suffix="K+"
                    >
                      0
                    </span>
                  </div>
                  <p className="stat-label">Happy Customers</p>
                </div>
                <div className="stat-item">
                  <div className="stat-number">
                    <span
                      ref={addCounterRef}
                      className="counter"
                      data-target="100"
                      data-suffix="%"
                    >
                      0
                    </span>
                  </div>
                  <p className="stat-label">Made in India</p>
                </div>
              </div>
            </div>
          </div>

          <div ref={addRevealRef} className="reveal reveal-delay-2">
            <div className="philosophy-visual">
              <div className="philosophy-card philosophy-card-1">
                <p className="card-quote">
                  &ldquo;Every stroke, every word, and every idea finds a
                  home.&rdquo;
                </p>
              </div>
              <div className="philosophy-card philosophy-card-2">
                <div className="card-icon-notebook">
                  <div className="lines">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
                <p className="card-text">Crafted with Purpose</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== RIBBON TEXT ===================== */}
      <section className="ribbon-section">
        <div className="ribbon-text">
          SHIBIKA — WRITE · CREATE · DREAM — SHIBIKA — WRITE · CREATE · DREAM —
          SHIBIKA — WRITE · CREATE · DREAM —&nbsp;
        </div>
      </section>

      {/* ===================== SHOWCASE ===================== */}
      <section className="showcase-section" id="showcase">
        <div ref={addRevealRef} className="reveal showcase-header">
          <p className="showcase-label">Curated for You</p>
          <h2 className="showcase-title">
            Notebooks That <em>Inspire</em>
          </h2>
        </div>

        <div className="showcase-cards">
          <div ref={addRevealRef} className="reveal reveal-delay-1 showcase-card">
            <div className="showcase-card-bg terracotta"></div>
            <div className="showcase-notebook-decor"></div>
            <div className="showcase-card-content">
              <p className="showcase-card-tag">Signature Line</p>
              <h3 className="showcase-card-title">The Classic Journal</h3>
            </div>
          </div>

          <div ref={addRevealRef} className="reveal reveal-delay-2 showcase-card">
            <div className="showcase-card-bg sage"></div>
            <div className="showcase-notebook-decor"></div>
            <div className="showcase-card-content">
              <p className="showcase-card-tag">Professional</p>
              <h3 className="showcase-card-title">The Executive</h3>
            </div>
          </div>

          <div ref={addRevealRef} className="reveal reveal-delay-3 showcase-card">
            <div className="showcase-card-bg navy"></div>
            <div className="showcase-notebook-decor"></div>
            <div className="showcase-card-content">
              <p className="showcase-card-tag">Creative</p>
              <h3 className="showcase-card-title">The Artist&apos;s Book</h3>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== COLLECTION ===================== */}
      <section className="collection-section" id="collection">
        <div ref={addRevealRef} className="reveal collection-header">
          <p className="collection-label">Our Collection</p>
          <h2 className="collection-title">
            Stationery That Speaks <br />
            to Your Soul
          </h2>
          <p className="collection-subtitle">
            Whether you&apos;re a student sketching dreams, a professional
            planning the next big thing, or an artist pouring passion onto pages
            — we&apos;ve got you covered.
          </p>
        </div>

        <div className="collection-grid">
          <div ref={addRevealRef} className="reveal collection-item">
            <span className="collection-item-number">01</span>
            <div className="collection-item-icon">
              <div className="notebook-icon"></div>
            </div>
            <h3 className="collection-item-name">Classic Notebooks</h3>
            <p className="collection-item-desc">
              Timeless design with premium 80 GSM paper. Ruled, plain, and dot
              grid options for every writing style.
            </p>
            <span className="collection-item-price">From ₹149</span>
          </div>

          <div ref={addRevealRef} className="reveal reveal-delay-1 collection-item">
            <span className="collection-item-number">02</span>
            <div className="collection-item-icon">
              <div className="notebook-icon"></div>
            </div>
            <h3 className="collection-item-name">Executive Series</h3>
            <p className="collection-item-desc">
              Premium leather-finish covers with lay-flat binding. Designed for
              professionals who mean business.
            </p>
            <span className="collection-item-price">From ₹299</span>
          </div>

          <div ref={addRevealRef} className="reveal reveal-delay-2 collection-item">
            <span className="collection-item-number">03</span>
            <div className="collection-item-icon">
              <div className="notebook-icon"></div>
            </div>
            <h3 className="collection-item-name">Art & Sketch</h3>
            <p className="collection-item-desc">
              Heavy-weight 120 GSM paper perfect for sketching, watercolors and
              mixed media. Acid-free and archival quality.
            </p>
            <span className="collection-item-price">From ₹249</span>
          </div>

          <div ref={addRevealRef} className="reveal reveal-delay-3 collection-item">
            <span className="collection-item-number">04</span>
            <div className="collection-item-icon">
              <div className="notebook-icon"></div>
            </div>
            <h3 className="collection-item-name">Student Essentials</h3>
            <p className="collection-item-desc">
              Durable, affordable, and beautifully designed. Because every
              student deserves quality they can rely on.
            </p>
            <span className="collection-item-price">From ₹79</span>
          </div>
        </div>
      </section>

      {/* ===================== QUALITY ===================== */}
      <section className="quality-section" id="quality">
        <div className="quality-header">
          <div ref={addRevealRef} className="reveal">
            <h2 className="quality-title">
              Uncompromising <em>Quality</em> in Every Detail
            </h2>
          </div>
          <div ref={addRevealRef} className="reveal reveal-delay-2 quality-description">
            <p>
              We obsess over every detail — from the paper weight to the binding
              technique, from the cover finish to the ink resistance. Because
              when you write with Shibika, you should feel the difference.
            </p>
          </div>
        </div>

        <div className="quality-features">
          <div ref={addRevealRef} className="reveal quality-feature">
            <div className="quality-feature-icon">
              <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <rect
                  x="8"
                  y="4"
                  width="32"
                  height="40"
                  rx="2"
                  strokeLinecap="round"
                />
                <line x1="14" y1="16" x2="34" y2="16" />
                <line x1="14" y1="22" x2="34" y2="22" />
                <line x1="14" y1="28" x2="28" y2="28" />
                <path d="M16 4V8" strokeLinecap="round" />
              </svg>
            </div>
            <h3 className="quality-feature-title">Premium Paper</h3>
            <p className="quality-feature-text">
              80–120 GSM acid-free paper that feels luxurious under every pen
              stroke. No bleed-through, no compromise.
            </p>
          </div>

          <div ref={addRevealRef} className="reveal reveal-delay-1 quality-feature">
            <div className="quality-feature-icon">
              <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 8C12 6.89543 12.8954 6 14 6H34C35.1046 6 36 6.89543 36 8V42L24 36L12 42V8Z"
                  strokeLinejoin="round"
                />
                <line x1="18" y1="14" x2="30" y2="14" strokeLinecap="round" />
                <line x1="18" y1="20" x2="30" y2="20" strokeLinecap="round" />
                <line x1="18" y1="26" x2="26" y2="26" strokeLinecap="round" />
              </svg>
            </div>
            <h3 className="quality-feature-title">Lay-Flat Binding</h3>
            <p className="quality-feature-text">
              Our signature thread-sewn binding ensures your notebooks lay
              perfectly flat — for effortless writing and sketching.
            </p>
          </div>

          <div ref={addRevealRef} className="reveal reveal-delay-2 quality-feature">
            <div className="quality-feature-icon">
              <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <circle cx="24" cy="24" r="16" />
                <path d="M24 14V24L30 30" strokeLinecap="round" />
                <circle cx="24" cy="24" r="2" />
              </svg>
            </div>
            <h3 className="quality-feature-title">Built to Last</h3>
            <p className="quality-feature-text">
              Reinforced covers, premium stitching, and durable materials ensure
              your Shibika notebook stands the test of time.
            </p>
          </div>
        </div>
      </section>

      {/* ===================== TESTIMONIALS ===================== */}
      <section className="testimonials-section" id="stories">
        <div ref={addRevealRef} className="reveal testimonials-header">
          <p className="testimonials-label">What They Say</p>
          <h2 className="testimonials-title">
            Loved by Creators, <br />
            Trusted by Professionals
          </h2>
        </div>

        <div className="testimonials-grid">
          <div ref={addRevealRef} className="reveal testimonial-card">
            <div className="testimonial-quote">&ldquo;</div>
            <p className="testimonial-text">
              The paper quality is unmatched at this price point. My fountain pen
              glides beautifully without any feathering. Shibika has become my
              go-to for all my journaling needs.
            </p>
            <div className="testimonial-author">
              <div className="testimonial-avatar bg-terracotta">A</div>
              <div>
                <p className="testimonial-author-name">Ananya Sharma</p>
                <p className="testimonial-author-role">
                  Architect & Journal Enthusiast
                </p>
              </div>
            </div>
          </div>

          <div ref={addRevealRef} className="reveal reveal-delay-1 testimonial-card">
            <div className="testimonial-quote">&ldquo;</div>
            <p className="testimonial-text">
              As an artist, I&apos;m extremely particular about sketchbook
              quality. Shibika&apos;s Art & Sketch series handles watercolors
              brilliantly. The texture, the weight — it&apos;s perfect.
            </p>
            <div className="testimonial-author">
              <div className="testimonial-avatar bg-sage">R</div>
              <div>
                <p className="testimonial-author-name">Rahul Menon</p>
                <p className="testimonial-author-role">
                  Illustrator & Visual Artist
                </p>
              </div>
            </div>
          </div>

          <div ref={addRevealRef} className="reveal reveal-delay-2 testimonial-card">
            <div className="testimonial-quote">&ldquo;</div>
            <p className="testimonial-text">
              I bought the Executive Series for my team and they absolutely loved
              it. The lay-flat binding and premium feel make meetings more
              productive. Outstanding value.
            </p>
            <div className="testimonial-author">
              <div className="testimonial-avatar bg-navy">P</div>
              <div>
                <p className="testimonial-author-name">Priya Desai</p>
                <p className="testimonial-author-role">
                  Startup Founder & CEO
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== CRAFTSMANSHIP ===================== */}
      <section className="craftsmanship-section" id="craftsmanship">
        <div className="craftsmanship-content">
          <div className="craftsmanship-top">
            <div ref={addRevealRef} className="reveal">
              <p className="craftsmanship-label">Our Process</p>
              <h2 className="craftsmanship-heading">
                From Raw Material to <em>Your Hands</em>
              </h2>
            </div>
            <div
              ref={addRevealRef}
              className="reveal reveal-delay-2 craftsmanship-desc"
            >
              <p>
                Every Shibika product goes through a meticulous process to ensure
                it meets our exacting standards. From sourcing sustainably to
                final quality checks, we leave nothing to chance.
              </p>
            </div>
          </div>

          <div className="craftsmanship-steps">
            <div ref={addRevealRef} className="reveal craft-step">
              <div className="craft-step-number">01</div>
              <h3 className="craft-step-title">Source</h3>
              <p className="craft-step-text">
                We carefully select sustainably sourced paper and materials from
                trusted Indian suppliers who share our values.
              </p>
            </div>

            <div ref={addRevealRef} className="reveal reveal-delay-1 craft-step">
              <div className="craft-step-number">02</div>
              <h3 className="craft-step-title">Design</h3>
              <p className="craft-step-text">
                Our design team crafts every cover, every layout with purpose —
                blending aesthetics with functionality.
              </p>
            </div>

            <div ref={addRevealRef} className="reveal reveal-delay-2 craft-step">
              <div className="craft-step-number">03</div>
              <h3 className="craft-step-title">Craft</h3>
              <p className="craft-step-text">
                Skilled artisans bring each notebook to life with precision
                binding, embossing, and finishing techniques.
              </p>
            </div>

            <div ref={addRevealRef} className="reveal reveal-delay-3 craft-step">
              <div className="craft-step-number">04</div>
              <h3 className="craft-step-title">Deliver</h3>
              <p className="craft-step-text">
                Each product passes through rigorous quality checks before being
                packaged with care and delivered to your door.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== CTA ===================== */}
      <section className="cta-section">
        <div ref={addRevealRef} className="reveal cta-content">
          <h2 className="cta-title">
            Ready to <em>Write Your Story?</em>
          </h2>
          <p className="cta-text">
            Join thousands who have discovered the joy of writing with Shibika.
            Premium quality, beautiful design, and prices that make sense.
            Because with Shibika, every idea finds a home.
          </p>
          <a href="#collection" className="cta-button">
            <span>Start Your Journey</span>
          </a>
        </div>
      </section>

      {/* ===================== FOOTER ===================== */}
      <footer className="footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">Shibika</div>
            <p className="footer-tagline">
              Rooted in India&apos;s spirit of creativity and craftsmanship.
              Exceptional quality notebooks and stationery at remarkable value.
              Every stroke, every word, every idea finds a home.
            </p>
          </div>

          <div>
            <h4 className="footer-column-title">Shop</h4>
            <ul className="footer-links">
              <li>
                <a href="#">Classic Notebooks</a>
              </li>
              <li>
                <a href="#">Executive Series</a>
              </li>
              <li>
                <a href="#">Art & Sketch</a>
              </li>
              <li>
                <a href="#">Student Essentials</a>
              </li>
              <li>
                <a href="#">Gift Sets</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="footer-column-title">Company</h4>
            <ul className="footer-links">
              <li>
                <a href="#">Our Story</a>
              </li>
              <li>
                <a href="#">Sustainability</a>
              </li>
              <li>
                <a href="#">Careers</a>
              </li>
              <li>
                <a href="#">Press</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="footer-column-title">Support</h4>
            <ul className="footer-links">
              <li>
                <a href="#">FAQs</a>
              </li>
              <li>
                <a href="#">Shipping</a>
              </li>
              <li>
                <a href="#">Returns</a>
              </li>
              <li>
                <a href="#">Bulk Orders</a>
              </li>
              <li>
                <a href="#">Track Order</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © 2024 Shibika. All rights reserved. Crafted with ❤️ in India.
          </p>
          <div className="footer-social">
            <a href="#">Instagram</a>
            <a href="#">Twitter</a>
            <a href="#">LinkedIn</a>
            <a href="#">Pinterest</a>
          </div>
        </div>
      </footer>
    </>
  );
}
