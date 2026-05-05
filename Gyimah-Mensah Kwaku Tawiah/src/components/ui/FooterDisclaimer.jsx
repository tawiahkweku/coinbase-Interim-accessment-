import React from 'react';

const FooterDisclaimer = () => {
  return (
    <div style={{
      backgroundColor: '#7F1D1D',
      color: 'white',
      borderTop: '4px solid #DC2626',
      padding: '32px 16px',
      marginTop: '32px'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 16px'
      }}>
        <div style={{
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px'
          }}>
            <span style={{ fontSize: '24px', animation: 'pulse 2s infinite' }}>⚠️</span>
            <p style={{
              fontSize: '24px',
              fontWeight: 'bold',
              margin: '0',
              textDecoration: 'underline'
            }}>
              DEMO PROJECT: This is a student project for educational purposes only.
            </p>
            <span style={{ fontSize: '24px', animation: 'pulse 2s infinite' }}>⚠️</span>
          </div>
          <p style={{
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#FCA5A5',
            margin: '0',
            lineHeight: '1.5'
          }}>
            🚫 DO NOT ENTER REAL PERSONAL INFORMATION, PASSWORDS, OR FINANCIAL DATA 🚫
            <br />
            This application uses mock data and is not connected to real cryptocurrency markets.
          </p>
          <div style={{
            borderTop: '1px solid #991B1B',
            paddingTop: '16px',
            marginTop: '16px'
          }}>
            <p style={{
              fontSize: '14px',
              color: '#FCA5A5',
              margin: '0'
            }}>
              © 2024 Coinbase Clone - Student Project. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterDisclaimer;
