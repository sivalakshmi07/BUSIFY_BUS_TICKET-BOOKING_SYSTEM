import React from 'react';

const Services = () => {
  return (
    // ✅ ADD THIS ID
    <section id="services" style={{ backgroundColor: '#fff' }}>
      <div className="container py-5 mt-5">
        <h2 className="text-center mb-4">
          Our <span className="text-danger">Services</span>
        </h2>

        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="card p-4 shadow-sm text-center h-100">
              <h5>🔒 Secure Payment</h5>
              <p className="text-muted">
                Integrate secure payment gateways for users to pay for their tickets
              </p>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card p-4 shadow-sm text-center h-100">
              <h5>💸 Refund Policy</h5>
              <p className="text-muted">
                Offer options for refundable tickets with clear terms
              </p>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card p-4 shadow-sm text-center h-100">
              <h5>🎧 24/7 Support</h5>
              <p className="text-muted">
                Get assistance anytime through chat, email, or phone
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
