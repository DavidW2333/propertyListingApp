import { useEffect, useState } from 'react';
//import Footer from '../component/Footer';
//import Header from '../component/Header';

interface Listing {
  id: number;
  address: string;
  description: string;
  bedrooms: number;
  bathrooms: number;
  availableFrom: string;
  contactNumber: string;
  rent: string;
  trademeLink?: string | null;
}

export default function ListingsPage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/get-listings')
      .then((res) => res.json())
      .then((data) => setListings(data))
      .catch(() => setError('Failed to load listings'));
  }, []);

  return (
    <>
    
    <div style={{ padding: '2rem', backgroundColor: '#f6f9fc', minHeight: '100vh', fontFamily: 'Segoe UI, sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem', color: '#1a202c', fontSize: '1.5rem' }}>Rental Listings</h1>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '7rem', //this little thing changed the gap between cards
        maxWidth: '1200px',
        padding: '1rem',
        width: '100%',
        }}>
        {listings.map((listing) => (
          <div
            key={listing.id}
            style={{
              backgroundColor: '#f6f9fc',
              padding: '1.5rem',
              borderRadius: '0px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'transform 0.2s',
              border: '1px solid #e2e8f0',
              width: '100%',
            }}
            onMouseEnter={(e) => ((e.currentTarget.style.transform = 'scale(1.02)'))}
            onMouseLeave={(e) => ((e.currentTarget.style.transform = 'scale(1)'))}
          >
            <div>
              <h2 style={{ marginBottom: '0.5rem', color: '#121111', fontSize: '1.25rem' }}>{listing.address}</h2>
              <p style={{ fontStyle: 'italic', marginBottom: '1rem', color: '#666160' }}>{listing.description}</p>
              <p><strong> Rent:</strong> ${listing.rent}</p>
              <p><strong> Bedrooms:</strong> {listing.bedrooms}</p>
              <p><strong> Bathrooms:</strong> {listing.bathrooms}</p>
              <p><strong> Available From:</strong> {listing.availableFrom}</p>
              <p><strong> Contact:</strong> {listing.contactNumber}</p>
            </div>
            {listing.trademeLink && (
              <a
                href={listing.trademeLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  marginTop: '1rem',
                  textAlign: 'center',
                  backgroundColor: '#2E1D1A',
                  color: 'white',
                  padding: '0.6rem 1rem',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  transition: 'background-color 0.1s'
                }}
                onMouseEnter={(e) => ((e.currentTarget.style.backgroundColor = '#4D4945'))}
                onMouseLeave={(e) => ((e.currentTarget.style.backgroundColor = '#2E1D1A'))}
              >
                More Details
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
    
    </>
  );
}
