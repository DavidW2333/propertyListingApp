

import React, { useEffect, useState } from 'react';
import Footer from '../component/Footer'; 
import Header from '../component/Header';

interface Listing {
  id: number;
  address: string;
  description: string;
  bedrooms: number;
  bathrooms: number;
  availableFrom: string;
  rent: number;
  contactNumber: string;
  trademeLink?: string | null;
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.5rem',
  borderRadius: '6px',
  border: '1px solid #cbd5e0',
  fontSize: '1rem',
};

const buttonStyle: React.CSSProperties = {
  padding: '0.5rem 1rem',
  backgroundColor: '#3182ce',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
  fontWeight: 'bold',
};

export default function AdminPage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [error, setError] = useState('');
  const [editingListing, setEditingListing] = useState<Listing | null>(null);

  // Add form state
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [availableFrom, setAvailableFrom] = useState('');
  const [rent, setRent] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [trademeLink, setTrademeLink] = useState('');

  // New login state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const ADMIN_PASSWORD = 'AdminPassword';

  // Fetch listings on mount & after changes
  async function fetchListings() {
    try {
      const res = await fetch('/api/get-listings');
      if (!res.ok) throw new Error('Failed to fetch listings');
      const data = await res.json();
      setListings(data);
      setError('');
    } catch {
      setError('Error fetching listings');
    }
  }

  useEffect(() => {
    if (isLoggedIn) {
      fetchListings();
    }
  }, [isLoggedIn]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      setPasswordInput('');
      setError('');
      // fetchListings(); -- already called by useEffect when isLoggedIn changes
    } else {
      setError('Incorrect password');
    }
  };

  // Add new listing
  async function addListing(e: React.FormEvent) {
    e.preventDefault();
    if (!address || !bedrooms || !bathrooms || !availableFrom || !rent || !contactNumber) {
      setError('Please fill all required fields');
      return;
    }

    try {
      const newListing = {
        id: Date.now(), // Simple unique id
        address,
        description,
        bedrooms: parseInt(bedrooms, 10),
        bathrooms: parseInt(bathrooms, 10),
        availableFrom,
        rent: parseInt(rent, 10),
        contactNumber,
        trademeLink: trademeLink || null,
      };

      const res = await fetch('/api/add-listing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: ADMIN_PASSWORD, listing: newListing }),
      });

      if (!res.ok) throw new Error('Failed to add listing');

      // Clear form
      setAddress('');
      setDescription('');
      setBedrooms('');
      setBathrooms('');
      setAvailableFrom('');
      setRent('');
      setContactNumber('');
      setTrademeLink('');
      setError('');

      // Refresh listings
      await fetchListings();
    } catch {
      setError('Error adding listing');
    }
  }

  // Edit handlers
  function startEditing(listing: Listing) {
    setEditingListing({ ...listing });
  }

  function cancelEditing() {
    setEditingListing(null);
  }

  function handleEditChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    if (!editingListing) return;
    const { name, value } = e.target;
    setEditingListing(prev => (prev ? { ...prev, [name]: value } : null));
  }

  async function saveEdit() {
    if (!editingListing) return;

    const updatedListing = {
      ...editingListing,
      bedrooms: Number(editingListing.bedrooms),
      bathrooms: Number(editingListing.bathrooms),
      rent: Number(editingListing.rent),
    };

    try {
      const res = await fetch('/api/update-listing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: ADMIN_PASSWORD, listing: updatedListing }),
      });
      if (!res.ok) throw new Error('Failed to update listing');

      await fetchListings();
      setEditingListing(null);
      setError('');
    } catch {
      setError('Error updating listing');
    }
  }

  // Delete handler
  async function deleteListing(id: number) {
    if (!confirm('Are you sure you want to delete this listing?')) return;
    try {
      const res = await fetch('/api/delete-listing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: ADMIN_PASSWORD, id }),
      });
      if (!res.ok) throw new Error('Failed to delete listing');

      await fetchListings();
      setError('');
    } catch {
      setError('Error deleting listing');
    }
  }

  if (!isLoggedIn) {
    return (
      <div style={{ maxWidth: 400, margin: '5rem auto', textAlign: 'center' }}>
        <h1>Admin Login</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="password"
            placeholder="Enter admin password"
            value={passwordInput}
            onChange={e => setPasswordInput(e.target.value)}
            style={{ ...inputStyle, marginBottom: '1rem' }}
            required
          />
          <button type="submit" style={buttonStyle}>
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <>
    <Header />
    
      <h1 style={{ textAlign: 'center', marginTop: '2rem' }}>Admin Property Listings</h1>
      <button
  onClick={() => window.location.href = '/'}
  style={{
    margin: '1rem auto',
    display: 'block',
    padding: '0.5rem 1rem',
    backgroundColor: '#4a5568',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  }}
>
  Back to Main Page
</button>

      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

      {/* Add Listing Form */}
      <form
        onSubmit={addListing}
        style={{
          maxWidth: 700,
          margin: '2rem auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1rem',
          padding: '1rem',
          border: '1px solid #cbd5e0',
          borderRadius: '8px',
          backgroundColor: '#f7fafc',
        }}
      >
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={e => setAddress(e.target.value)}
          style={inputStyle}
          required
        />
        <input
          type="number"
          placeholder="Rent Price"
          value={rent}
          onChange={e => setRent(e.target.value)}
          style={inputStyle}
          required
        />
        <input
          type="number"
          placeholder="Bedrooms"
          value={bedrooms}
          onChange={e => setBedrooms(e.target.value)}
          style={inputStyle}
          required
        />
        <input
          type="number"
          placeholder="Bathrooms"
          value={bathrooms}
          onChange={e => setBathrooms(e.target.value)}
          style={inputStyle}
          required
        />
        <input
          type="date"
          placeholder="Available From"
          value={availableFrom}
          onChange={e => setAvailableFrom(e.target.value)}
          style={inputStyle}
          required
        />
        <input
          type="text"
          placeholder="Contact Number"
          value={contactNumber}
          onChange={e => setContactNumber(e.target.value)}
          style={inputStyle}
          required
        />
        <input
          type="url"
          placeholder="TradeMe Link (optional)"
          value={trademeLink}
          onChange={e => setTrademeLink(e.target.value)}
          style={inputStyle}
        />
        <textarea
          placeholder="Short Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          style={{ ...inputStyle, gridColumn: '1 / -1', height: '80px', resize: 'vertical' }}
        />
        <button
          type="submit"
          style={{ ...buttonStyle, gridColumn: '1 / -1', fontWeight: 'bold', fontSize: '1.1rem' }}
        >
          Add Listing
        </button>
      </form>

      {/* Edit Listing Form (shows only if editing) */}
      {editingListing && (
        <div
          style={{
            maxWidth: 700,
            margin: '1rem auto 2rem',
            backgroundColor: '#f7fafc',
            padding: '1rem',
            borderRadius: '8px',
            border: '1px solid #cbd5e0',
          }}
        >
          <h2>Edit Listing</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <input
              name="address"
              placeholder="Address"
              value={editingListing.address}
              onChange={handleEditChange}
              style={inputStyle}
            />
            <input
              name="rent"
              placeholder="Rent Price"
              type="number"
              value={editingListing.rent}
              onChange={handleEditChange}
              style={inputStyle}
            />
            <input
              name="bedrooms"
              placeholder="Bedrooms"
              type="number"
              value={editingListing.bedrooms}
              onChange={handleEditChange}
              style={inputStyle}
            />
            <input
              name="bathrooms"
              placeholder="Bathrooms"
              type="number"
              value={editingListing.bathrooms}
              onChange={handleEditChange}
              style={inputStyle}
            />
            <input
              name="availableFrom"
              placeholder="Available From"
              type="date"
              value={editingListing.availableFrom}
              onChange={handleEditChange}
              style={inputStyle}
            />
            <input
              name="contactNumber"
              placeholder="Contact Number"
              value={editingListing.contactNumber}
              onChange={handleEditChange}
              style={inputStyle}
            />
            <input
              name="trademeLink"
              placeholder="TradeMe Link (optional)"
              value={editingListing.trademeLink || ''}
              onChange={handleEditChange}
              style={inputStyle}
              type="url"
            />
            <textarea
              name="description"
              placeholder="Short Description"
              value={editingListing.description}
              onChange={handleEditChange}
              style={{ ...inputStyle, gridColumn: '1 / -1', height: '80px', resize: 'vertical' }}
            />
          </div>
          <div style={{ marginTop: '1rem' }}>
            <button
              onClick={saveEdit}
              style={{ ...buttonStyle, marginRight: '1rem', backgroundColor: '#2b6cb0' }}
            >
              Save
            </button>
            <button onClick={cancelEditing} style={buttonStyle}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Listings grid */}
      <div
        style={{
          maxWidth: 700,
          margin: '2rem auto',
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '1.5rem',
        }}
      >
        {listings.map(listing => (
          <div
            key={listing.id}
            style={{
              backgroundColor: '#fff',
              padding: '1rem',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              border: '1px solid #cbd5e0',
              position: 'relative',
            }}
          >
            <h3 style={{ color: '#2c5282' }}>{listing.address}</h3>
            <p style={{ fontStyle: 'italic', color: '#4a5568' }}>{listing.description}</p>
            <p>
              <strong>Rent:</strong> ${listing.rent}
            </p>
            <p>
              <strong>Bedrooms:</strong> {listing.bedrooms}
            </p>
            <p>
              <strong>Bathrooms:</strong> {listing.bathrooms}
            </p>
            <p>
              <strong>Available From:</strong> {listing.availableFrom}
            </p>
            <p>
              <strong>Contact:</strong> {listing.contactNumber}
            </p>
            {listing.trademeLink && (
              <a
                href={listing.trademeLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#2b6cb0',
                  fontWeight: 'bold',
                  textDecoration: 'underline',
                }}
              >
                View More
              </a>
            )}

            {/* Edit and Delete buttons */}
            <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
              <button onClick={() => startEditing(listing)} style={buttonStyle}>
                Edit
              </button>
              <button
                onClick={() => deleteListing(listing.id)}
                style={{ ...buttonStyle, backgroundColor: '#e53e3e' }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    <Footer/>
    </>
  );
}

