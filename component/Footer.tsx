export default function Footer() {
    return (
      <footer style={{
        backgroundColor: '#2d3748',
        color: '#edf2f7',
        padding: '2rem',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '2rem',
        fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",

      }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>About Us</h3>
          <p style={{ maxWidth: '300px' }}>
            We are a professional property management company helping landlords and tenants find their perfect match.
          </p>
        </div>
  
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Contact Us</h3>
          <p>Email: info@propertylisting.co.nz</p>
        </div>
  
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Resources</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li><a href="/testimonial" style={{ color: '#63b3ed', textDecoration: 'none' }}>Testimonial</a></li>
            <li><a href="/contact" style={{ color: '#63b3ed', textDecoration: 'none' }}>Contact Us</a></li>
            <li><a href="/letting-management" style={{ color: '#63b3ed', textDecoration: 'none' }}>Letting & Management</a></li>
          </ul>
        </div>
      </footer>
    );
  }



