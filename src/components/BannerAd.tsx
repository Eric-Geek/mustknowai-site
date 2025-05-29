
import React from 'react';

const BannerAd = () => {
  return (
    <section className="py-8 px-4">
      <div className="container mx-auto">
        <div className="bg-gradient-to-r from-brand-purple/10 to-blue-500/10 border border-brand-purple/20 rounded-2xl p-8 text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-foreground mb-4">
              Advertise Your AI Tool Here
            </h3>
            <p className="text-muted-foreground mb-6">
              Reach thousands of AI enthusiasts and potential customers. 
              Get your tool featured on MustKnowAI.
            </p>
            <button className="bg-brand-purple hover:bg-brand-purple/90 text-white px-6 py-3 rounded-lg font-medium transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerAd;
