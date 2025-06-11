
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
      <Header />
      <div
        style={{
          minHeight: '100vh',
          padding: '3rem',
          background: 'linear-gradient(135deg,rgb(123, 127, 143) 0%,rgb(90, 86, 94) 100%)',
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
        <h1 style={{ fontSize: '3rem', fontWeight: '700', marginBottom: '0.5rem' }}>
          Welcome to the MOCK Property Listing Site
        </h1>
        <p style={{ fontSize: '1.25rem', maxWidth: 600 }}>
          This MOCK site shows rental properties with address, rooms, bathrooms, availability, and contact info.
        </p>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            onClick={() => router.push('/listings')}
            style={{
              padding: '0.75rem 2rem',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#ff6b6b',
              color: 'white',
              fontWeight: '600',
              fontSize: '1rem',
              cursor: 'pointer',
              boxShadow: '0 4px 10px rgba(255, 107, 107, 0.4)',
              transition: 'background-color 0.3s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#ff5252')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#ff6b6b')}
          >
            View Listings
          </button>

          <button
            onClick={goToAdmin}
            style={{
              padding: '0.75rem 2rem',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#4ecdc4',
              color: 'white',
              fontWeight: '600',
              fontSize: '1rem',
              cursor: 'pointer',
              boxShadow: '0 4px 10px rgba(78, 205, 196, 0.4)',
              transition: 'background-color 0.3s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#38b2ac')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#4ecdc4')}
          >
            Admin Login
          </button>
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
      <Footer />
    </>
  );
}


