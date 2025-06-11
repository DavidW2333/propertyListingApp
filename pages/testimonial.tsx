import Header from '../component/Header';
import Footer from '../component/Footer';

export default function TestimonialPage() {
  const testimonials = [
    {
      name: 'Alice Johnson',
      role: 'Tenant',
      quote:
        "I had a fantastic experience finding a rental through this site. The process was smooth and transparent. Highly recommend!",
    },
    {
      name: 'Mark Stevenson',
      role: 'Landlord',
      quote:
        "I've worked with several property platforms before, but none as reliable as this. The listing was up in no time and I got quality tenant inquiries fast.",
    },
    {
      name: 'Rachel Lee',
      role: 'Tenant',
      quote:
        "What stood out to me was the fast response time and helpful customer support. This platform really made a stressful process easy.",
    },
  ];

  return (
    <div style={{ fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif" }}>
      <Header />

      <main style={{ padding: '5rem 2rem 2rem', backgroundColor: '#f6f9fc', minHeight: '100vh' }}>
        <h1 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '3rem', color: '#2d3748' }}>
          🌟 What Our Users Say
        </h1>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            maxWidth: '1000px',
            margin: '0 auto',
          }}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              style={{
                backgroundColor: 'white',
                padding: '2rem',
                borderRadius: '10px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                border: '1px solid #e2e8f0',
              }}
            >
              <p style={{ fontStyle: 'italic', marginBottom: '1.5rem', color: '#4a5568' }}>
                “{testimonial.quote}”
              </p>
              <p style={{ fontWeight: 'bold', color: '#2c5282' }}>{testimonial.name}</p>
              <p style={{ fontSize: '0.9rem', color: '#718096' }}>{testimonial.role}</p>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
