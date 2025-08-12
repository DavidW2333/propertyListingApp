import Header from '../component/Header';
import Footer from '../component/Footer';

export default function LettingManagementPage() {
  return (
    <div style={{ fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif" }}>
      <Header />

      <main style={{ padding: '5rem 2rem 2rem', backgroundColor: '#f6f9fc', minHeight: '100vh' }}>
        <h1 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '3rem', color: '#2d3748' }}>
          🛠️ Letting & Property Management
        </h1>

        <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: '#fff', padding: '2rem', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)', color: '#4a5568' }}>
          <h2 style={{ color: '#2c5282' }}>Letting Service</h2>
          <p>We offer a full letting service that includes property marketing, tenant screening, viewings, and tenancy agreement signing.</p>

          <h2 style={{ color: '#2c5282', marginTop: '2rem' }}>Management Fees</h2>
          <ul style={{ lineHeight: '1.8' }}>
            <li><strong>Letting Fee:</strong> One week’s rent + GST</li>
            <li><strong>Ongoing Management Fee:</strong> 7.5% of weekly rent + GST</li>
            <li><strong>Inspection Fee:</strong> $50 + GST per inspection</li>
          </ul>

          <h2 style={{ color: '#2c5282', marginTop: '2rem' }}>Why Choose Us?</h2>
          <ul style={{ lineHeight: '1.8' }}>
            <li>✔️ Experienced property managers</li>
            <li>✔️ Detailed tenant background checks</li>
            <li>✔️ Transparent communication and reporting</li>
          </ul>
        </div>
      </main>

      <Footer />
    </div>
  );
}
