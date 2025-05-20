import ContactSection from "@/src/components/landing/ContactSection"

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="container">
          <h1>Welcome to Our Platform</h1>
          <p className="tagline">The easiest way to connect with our team and get the support you need.</p>
          <a href="#contact" className="btn-primary">
            Get Started
          </a>
        </div>
      </section>

      <section className="about">
        <div className="container">
          <h2>About Us</h2>
          <p>We're dedicated to providing exceptional service and innovative solutions to meet your needs.</p>
          <ul className="features-list">
            <li>24/7 Support</li>
            <li>Expert Team</li>
            <li>Custom Solutions</li>
            <li>Fast Response</li>
          </ul>
        </div>
      </section>

      <div className="container" id="contact">
        <ContactSection />
      </div>
    </main>
  )
}
