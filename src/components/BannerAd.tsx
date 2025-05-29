import React from 'react';

const BannerAd = () => {
  return (
    <section className="py-6 px-4">
      <div className="container mx-auto">
        <div className="bg-gradient-to-r from-brand-purple/5 to-blue-500/5 dark:from-brand-purple/10 dark:to-blue-500/10 border border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center">
          <div className="max-w-xl mx-auto">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Advertise Your AI Tool Here
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Reach thousands of AI enthusiasts and potential customers. 
              Get your tool featured on MustKnowAI.
            </p>
            <button className="bg-brand-purple hover:bg-brand-purple/90 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerAd;
