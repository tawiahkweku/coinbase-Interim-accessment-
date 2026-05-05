import React from 'react';

const DemoNotice = () => {
  return (
    <div style={{
      backgroundColor: '#FEF2F2',
      border: '4px solid #EF4444',
      borderRadius: '8px',
      padding: '20px',
      marginBottom: '24px',
      boxShadow: '0 10px 15px -3px rgba(239, 68, 68, 0.1)',
      position: 'relative',
      zIndex: 9999
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px'
      }}>
        <span style={{ fontSize: '24px', animation: 'pulse 2s infinite', flexShrink: 0 }}>🔒</span>
        <div>
          <p style={{
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#991B1B',
            margin: '0 0 8px 0',
            textDecoration: 'underline'
          }}>
            DEMO APP – DO NOT USE YOUR REAL PASSWORD
          </p>
          <p style={{
            fontSize: '14px',
            color: '#DC2626',
            margin: '0',
            fontWeight: '500'
          }}>
            This is a demonstration application for educational purposes only.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DemoNotice;
