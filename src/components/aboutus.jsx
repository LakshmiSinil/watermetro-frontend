import React from 'react';
import Footer from './Footer';

export default function AboutPage() {
  return (
    <>
      <main style={{ minHeight: '100vh', fontFamily: 'Arial, sans-serif', background: 'white' }}>
        {/* Hero Section */}
        <header
          style={{
            position: 'relative',
            background: 'url("https://cdn-dev.watermetro.co.in/boat_05_b6ae163381.png") no-repeat center center/cover',
            height: '450px',
            display: 'flex',
            alignItems: 'left',
            justifyContent: 'left',
            textAlign: 'left',
            color: 'white',
            padding: '40px'
          }}>
          <div
           style={{
            background: 'rgba(0, 119, 182, 0.6)',
            padding: '100px 20px',
            borderRadius: '10px', // Increased for better UI
            width: '550%', // Adjust width as needed
            height: '100px', // Adjust height as needed
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            color: 'white'
          }}>
   <h1 style={{ marginBottom: '10px' }}>About Us</h1>
<p style={{ marginTop: '10px', textAlign:'center' }}>
  
  <br /><br/><br/><br /><br/><br/>
  Enjoy the pioneering initiative in sustainable urban water transport.
</p>


          </div>
        </header>

        {/* Main Content with Text and Image */}
        <section
          style={{
            display: 'flex',
            alignItems: 'left',
            justifyContent: 'space-between',
            padding: '40px',
            maxWidth: '1200px',
            margin: 'auto'
          }}>
          <div
            style={{
              width: '55%',
              textAlign: 'justify',
              fontSize: '16px',
              lineHeight: '1.6',
              color: '#333'
            }}>
            <p>
              Kochi, often referred to as the commercial capital of Kerala, is one of the most
              densely populated districts in the state of Kerala. The project is expected to
              reduce pollution and traffic congestion in the city and also ease access to
              business areas on the mainland for urban households situated along the Kochi lakeshore.
            </p>
            <p>
              The Kochi water metro project envisages the development of 15 identified routes,
              connecting 10 islands along a network of routes that span 78 km with a fleet of
              78 fast, electrically propelled hybrid ferries plying to 38 terminals.
            </p>
            <p>
              More than 33,000 islanders are expected to benefit from the water metro. It is
              envisaged to be a socially inclusive transport system that focuses on improved
              livelihoods through commercial property development and tourism-based initiatives.
            </p>
          </div>
          <div
            style={{
              width: '40%',
              display: 'flex',
              justifyContent: 'center'
            }}>
            <img
              src="https://cdn-dev.watermetro.co.in/boat0001_7dd6617bec.png"
              alt="Kochi Water Metro"
              style={{
                width: '100%',
                borderRadius: '10px',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)'
              }}
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

