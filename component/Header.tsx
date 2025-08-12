import { useRouter } from 'next/router';

export default function Header() {
  const router = useRouter();

  return (
    <header
      style={{
        backgroundColor: '#bbb4b2',
        position: 'sticky',
        zIndex: 1000,
        top: 0,
        color: '#edf2f7',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        alignItems: 'center',
        fontFamily:
          "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
      }}
    >
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <a href="/" style={{ color: '#10100f', textDecoration: 'none', fontWeight: 'bold' }}>
          Home
        </a>
        <a href="/testimonial" style={{ color: '#10100f', textDecoration: 'none' }}>
          Testimonial
        </a>
        <a href="/contact" style={{ color: '#10100f', textDecoration: 'none' }}>
          Contact Us
        </a>
        <a href="/lettingManagement" style={{ color: '#10100f', textDecoration: 'none' }}>
          Letting & Management
        </a>
        <a href="/listings" style={{ color: '#10100f', textDecoration: 'none' }}>
          Rental listings
        </a>
        <a href="/admin" style={{ color: '#10100f', textDecoration: 'none' }}>
          Admin Login
        </a>
      </div>

      <button
        onClick={() => router.push('https://apply.tenant.co.nz/tps7519?')}
        style={{
          padding: '1rem 2rem',
          backgroundColor: '#0A0909',
          color: 'white',
          border: 'none',
          borderRadius: '0px',
          fontWeight: 'bold',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease',
          marginTop: '1rem',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e53e3e')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#f56565')}
      >
        Application Form
      </button>
    </header>
  );
}
