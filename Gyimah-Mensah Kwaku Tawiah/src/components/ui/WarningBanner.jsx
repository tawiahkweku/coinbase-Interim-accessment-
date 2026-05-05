import React from 'react';

const WarningBanner = () => {
  return (
    <div style={{
      backgroundColor: '#FEF3C7',
      border: '4px solid #F59E0B',
      padding: '16px',
      margin: '0',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      position: 'relative',
      zIndex: 9999
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 16px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px'
        }}>
          <span style={{ fontSize: '24px', animation: 'pulse 2s infinite' }}>⚠️</span>
          <p style={{
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#92400E',
            margin: '0',
            textAlign: 'center',
            textDecoration: 'underline'
          }}>
            STUDENT PROJECT: This is a demo application and is NOT affiliated with Coinbase, Inc.
          </p>
          <span style={{ fontSize: '24px', animation: 'pulse 2s infinite' }}>⚠️</span>
        </div>
      </div>
    </div>
  );
};

export default WarningBanner;
