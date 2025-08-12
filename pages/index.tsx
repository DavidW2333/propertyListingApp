
import React from 'react';

import { useRouter } from 'next/router';
import { useState } from 'react';
import Header from '../component/Header';
import Footer from '../component/Footer';


export default function Home() {
  const router = useRouter();

  const goToAdmin = () => {
    router.push('/admin');
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    address: '',
    reason: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('/api/send-appraisal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      alert('Appraisal request submitted successfully!');
      setFormData({ name: '', email: '', mobile: '', address: '', reason: '', message: '' });
    } catch (err) {
      alert('Failed to submit the form. Please try again.');
    }
  };

  return (
    <>
      
      <div
        style={{
          minHeight: '100vh',
          padding: '3rem',
          background: '#F7F7F7',
          color: '#f0f4f8',
          fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          gap: '1.5rem',
        }}
      >
        <h1 style={{ fontSize: '3rem', fontWeight: '700', marginBottom: '0.5rem', color: '#2E1D1A' }}>
        Trusted and reliable property management
        </h1>
        <p style={{ fontSize: '1.25rem', maxWidth: 600, color: '#4A5568' }}>
        Over 0.5 years experience providing reliable property management services for homeowners and tenants in Auckland
        </p>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            onClick={() => router.push('/listings')}
            style={{
              padding: '1rem 4rem',
              borderRadius: '0px',
              border: 'none',
              backgroundColor: '#2E1D1A',
              color: 'white',
              fontWeight: '600',
              fontSize: '1rem',
              cursor: 'pointer',
              boxShadow: '0 4px 10px rgba(255, 107, 107, 0.4)',
              transition: 'background-color 0.3s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#4D4945')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#2E1D1A')}
          >
            ➝ View Listings
          </button>

          
        </div>
        <div
  style={{
    display: 'flex',
    justifyContent: 'space-between', // Space between left and right modules
    alignItems: 'flex-start', // Align items at the top
    gap: '2rem', // Add spacing between modules
    width: '100%', // Ensure the container spans the full width
    marginTop: '2rem',
  }}
>
  {/* Left Module */}
  <div
    style={{
      flex: '1', // Allow the module to take up available space
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      padding: '2rem',
      borderRadius: '0rem',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
      color: '#0F0F0F',
      maxWidth: '700px', // Limit the width of the module
      marginLeft: '2rem', // Add horizontal offset for the left module
    }}
  >
    <p style={{ marginBottom: '1rem' }}>
      <strong>We go the extra mile</strong><br />
      At Davids property management, we pride ourselves on delivering personalised and high-quality property management services tailored to your unique needs.
      <br /><br />
      Whether you're a landlord looking for seamless property management, a tenant seeking a responsive and reliable experience, or a contractor partnering with us, we are committed to exceeding your expectations.
    </p>
  </div>

  {/* Right Module */}
  <div
    style={{
      flex: '1', // Allow the right module to take up available space
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      padding: '2rem',
      borderRadius: '0rem',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
      color: '#0F0F0F',
      maxWidth: '700px', // Limit the width of the module
      marginTop: '20rem', // Add horizontal offset for the right module
    }}
  >
    <p>
      <strong>We're property managers that care</strong><br />
      Our approach is grounded in the principle of care. It's a simple word, but it defines everything we do. From maintaining properties to managing relationships, our dedication to care ensures that every interaction and service we provide is infused with genuine attention and respect.
      <br /><br />
      Choose Davids and experience property management where your needs come first.
    </p>
    <p style={{ textAlign: 'center' }}>Right module content goes here</p>
  </div>
</div>





        <div style={{
          marginTop: '4rem',
          maxWidth: '700px',
          width: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          padding: '2rem',
          borderRadius: '1rem',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
        }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: '#f0f4f8' }}>Request a Property Rent Appraisal</h2>

          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            {['name', 'email', 'mobile', 'address', 'reason', 'message'].map((field) => (
              <div key={field} style={{ marginBottom: '1.25rem', textAlign: 'left' }}>
                <label htmlFor={field} style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#f0f4f8' }}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                {field === 'message' ? (
                  <textarea
                    name={field}
                    id={field}
                    rows={4}
                    value={formData[field]}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ccc', fontFamily: 'inherit' }}
                    required
                  />
                ) : (
                  <input
                    type="text"
                    name={field}
                    id={field}
                    value={formData[field]}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ccc', fontFamily: 'inherit' }}
                    required
                  />
                )}
              </div>
            ))}

            <button type="submit" style={{ backgroundColor: '#ff6b6b', color: 'white', padding: '0.75rem 2rem', borderRadius: '8px', border: 'none', fontWeight: 'bold', cursor: 'pointer', transition: 'background-color 0.3s ease' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#ff5252')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#ff6b6b')}
            >
              Submit Request
            </button>
          </form>
        </div>
      </div>
      
    </>
  );
}


