import Header from '../component/Header';
import Footer from '../component/Footer';

export default function ContactPage() {
  return (
    <div style={{ fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif" }}>
      <Header />

      <main style={{ padding: '5rem 2rem 2rem', backgroundColor: '#f6f9fc', minHeight: '100vh' }}>
        <h1 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '3rem', color: '#2d3748' }}>
          📬 Contact Us
        </h1>

        <div style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#fff', padding: '2rem', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)' }}>
          <p style={{ marginBottom: '1rem', color: '#4a5568' }}>Have a question or need support? Flick me an email!</p>
          <p><strong>Email:</strong> david.wang023@gmail.com</p>
          <p><strong>Phone:</strong> 0123456789</p>
          <p><strong>Office Hours:</strong> Mon–Sun, 24h</p>
        </div>
      </main>

      <Footer />
    </div>
  );
}