import { useState } from 'react';
import { Plus, X, ChevronDown } from 'lucide-react';

export default function AboutPageRedesign() {
  const [isDark, setIsDark] = useState(false);

  return (
    <main className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
      
      {/* Hero Section - Luxury Banner */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with overlay */}
        <div className="absolute inset-0">
          <img 
            src="../images/hero.avif" 
            alt="Luxury Fitness"
            className="w-full h-full object-cover"
          />
          <div className={`absolute inset-0 ${isDark ? 'bg-black/70' : 'bg-white/40'}`}></div>
          
          {/* Geometric accent lines */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl">
          <div className="mb-8">
            <div className="text-8xl sm:text-9xl font-black tracking-tighter leading-none">
              <span className={isDark ? 'text-white' : 'text-white drop-shadow-2xl'}>
                CORE
              </span>
              <span className="text-red-600 drop-shadow-2xl">X</span>
            </div>
          </div>
          
          <p className={`text-2xl sm:text-3xl font-light leading-relaxed mb-4 ${isDark ? 'text-gray-200' : 'text-white drop-shadow-lg'}`}>
            Premium Performance Nutrition
          </p>
          
          <p className={`text-lg sm:text-xl tracking-widest uppercase font-semibold text-red-600 mb-12 ${isDark ? '' : 'drop-shadow-lg'}`}>
            Engineered for Excellence
          </p>

          <div className="flex items-center justify-center gap-2 mb-12">
            <div className={`h-px flex-grow ${isDark ? 'bg-gradient-to-r from-transparent to-gray-400' : 'bg-gradient-to-r from-transparent to-white'}`}></div>
            <span className={`${isDark ? 'text-gray-300' : 'text-white drop-shadow-lg'}`}>BORN IN CHICAGO</span>
            <div className={`h-px flex-grow ${isDark ? 'bg-gradient-to-l from-transparent to-gray-400' : 'bg-gradient-to-l from-transparent to-white'}`}></div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
          <div className={`w-6 h-10 border-2 border-red-600 rounded-full flex items-center justify-center ${isDark ? 'bg-red-600/10' : 'bg-white/20'}`}>
            <ChevronDown className="w-4 h-4 text-red-600" />
          </div>
        </div>

        {/* Theme Toggle */}
        <div className="absolute bottom-24 right-8 z-10 flex items-center gap-3">
          <button
            onClick={() => setIsDark(!isDark)}
            className={`relative inline-flex h-10 w-16 items-center rounded-full transition-colors ${
              isDark ? 'bg-gray-700' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-8 w-8 transform rounded-full ${isDark ? 'bg-white' : 'bg-black'} transition-transform ${
                isDark ? 'translate-x-1' : 'translate-x-7'
              }`}
            />
          </button>
        </div>
      </section>

      {/* Section 1: Founding Story */}
      <section className={`relative py-32 overflow-hidden ${isDark ? 'bg-black' : 'bg-white'}`}>
        <div className={`absolute inset-0 opacity-5 ${isDark ? 'bg-white' : 'bg-black'}`} 
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(220,38,38,.1) 35px, rgba(220,38,38,.1) 70px)'
          }}
        ></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-sm font-bold tracking-widest mb-4 text-red-600">
                OUR STORY
              </div>
              <h2 className={`text-5xl sm:text-6xl font-black mb-8 leading-tight ${isDark ? 'text-white' : 'text-black'}`}>
                Born in <span className="text-red-600">Chicago</span>
                <br />
                Built for <span className="text-red-600">Performance</span>
              </h2>
              <p className={`text-lg leading-relaxed mb-6 ${isDark ? 'text-gray-300' : 'text-gray-800'}`}>
                CoreX was founded in the heart of Chicago with an unwavering commitment to excellence. We're not just another supplement brand — we're <span className="font-semibold text-red-600">athletes, trainers, and health professionals</span> who refuse to compromise on quality.
              </p>
              <p className={`text-lg leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>
                Every formula is crafted with scientific precision and tested in real-world conditions by champions. We know what elite performance demands.
              </p>
              <div className="mt-8 h-1 w-16 bg-red-600 rounded-full"></div>
            </div>
            
            {/* Banner Image */}
            <div className={`relative h-95 sm:h-[400px] rounded-2xl overflow-hidden group border-4 ${isDark ? 'border-red-600/50' : 'border-red-600'}`}>
              <img 
                src="../images/hero-join-C0G8GwhA.png" 
                alt="Chicago Strength"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className={`absolute inset-0 ${isDark ? 'bg-black/30' : 'bg-white/20'}`}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Founder Experience */}
      <section className={`relative py-32 overflow-hidden ${isDark ? 'bg-gray-950' : 'bg-gray-50'}`}>
        <div className={`absolute inset-0 opacity-5 ${isDark ? 'bg-white' : 'bg-black'}`} 
          style={{
            backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 35px, rgba(0,0,0,.1) 35px, rgba(0,0,0,.1) 70px)'
          }}
        ></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            
            {/* Banner Image */}
            <div className={`relative h-96 sm:h-[500px] rounded-2xl overflow-hidden group border-4 order-2 md:order-1 ${isDark ? 'border-red-600/50' : 'border-red-600'}`}>
              <img 
                src="../images/running.jpg" 
                alt="Global Training"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className={`absolute inset-0 ${isDark ? 'bg-black/30' : 'bg-white/20'}`}></div>
            </div>

            <div className="order-1 md:order-2">
              <div className="text-sm font-bold tracking-widest mb-4 text-red-600">
                FOUNDER'S JOURNEY
              </div>
              <h2 className={`text-5xl sm:text-6xl font-black mb-8 leading-tight ${isDark ? 'text-white' : 'text-black'}`}>
                Global <span className="text-red-600">Experience</span>
                <br />
                Local <span className="text-red-600">Roots</span>
              </h2>
              <p className={`text-lg leading-relaxed mb-6 ${isDark ? 'text-gray-300' : 'text-gray-800'}`}>
                Our founder's journey spans <span className="font-semibold text-red-600">10 countries across 20+ years</span> in elite sports and wellness. As a competitive bodybuilder, gymnast, and trainer to professional fighters, he understands what truly separates premium supplements from the ordinary.
              </p>
              <p className={`text-lg leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>
                With deep expertise in movement science and rehabilitation, CoreX was born from a vision to create supplements that truly serve performance, recovery, and human potential.
              </p>
              <div className="mt-8 h-1 w-16 bg-red-600 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className={`relative py-32 overflow-hidden ${isDark ? 'bg-black' : 'bg-white'}`}>
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 opacity-5 rounded-full ${isDark ? 'bg-white' : 'bg-black'}`}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-20">
            <div className="text-sm font-bold tracking-widest mb-4 text-red-600">
              CORE VALUES
            </div>
            <h2 className={`text-5xl sm:text-6xl font-black leading-tight ${isDark ? 'text-white' : 'text-black'}`}>
              What Drives <span className="text-red-600">CoreX</span>
            </h2>
            <div className="mt-8 h-1 w-16 bg-red-600 rounded-full mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <LuxuryValueCard 
              title="Precision"
              description="Every formula backed by rigorous research and tested by elite athletes in real-world conditions."
              isDark={isDark}
            />
            <LuxuryValueCard 
              title="Integrity"
              description="We never compromise on quality, sourcing only premium, tested ingredients from trusted suppliers."
              isDark={isDark}
            />
            <LuxuryValueCard 
              title="Performance"
              description="Designed for champions. From weekend warriors to Olympic competitors, CoreX delivers results."
              isDark={isDark}
            />
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className={`relative py-32 overflow-hidden ${isDark ? 'bg-gray-950' : 'bg-gray-50'}`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
          <div className={`border-l-4 border-red-600 pl-12 py-12`}>
            <div className="text-sm font-bold tracking-widest mb-4 text-red-600">
              MISSION
            </div>
            <h2 className={`text-5xl font-black mb-8 leading-tight ${isDark ? 'text-white' : 'text-black'}`}>
              Precision. Integrity. <span className="text-red-600">Performance.</span>
            </h2>
            <p className={`text-2xl leading-relaxed font-light ${isDark ? 'text-gray-300' : 'text-gray-800'}`}>
              We deliver performance supplements crafted with <span className="text-red-600 font-semibold">scientific precision, uncompromising integrity, and premium quality</span> — engineered for athletes who refuse to settle for anything less than excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Getting Started */}
      <section className={`relative py-32 overflow-hidden ${isDark ? 'bg-black' : 'bg-white'}`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="mb-16">
            <div className="text-sm font-bold tracking-widest mb-4 text-red-600">
              GET STARTED
            </div>
            <h2 className={`text-5xl font-black mb-4 ${isDark ? 'text-white' : 'text-black'}`}>
              Explore <span className="text-red-600">CoreX</span>
            </h2>
            <p className={`text-xl ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>
              Follow these simple steps to discover our premium performance supplements and join our community.
            </p>
          </div>
          <AboutAccordion isDark={isDark} />
        </div>
      </section>

      {/* Footer CTA */}
      <section className={`relative py-24 border-t overflow-hidden ${isDark ? 'bg-gray-950 border-gray-800' : 'bg-gray-50 border-gray-200'}`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <p className={`text-2xl mb-8 font-bold ${isDark ? 'text-white' : 'text-black'}`}>
            Ready to <span className="text-red-600">Elevate</span> Your Performance?
          </p>
          <button className="px-16 py-5 bg-red-600 text-white font-black text-lg rounded-lg hover:bg-red-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl">
            SHOP NOW
          </button>
        </div>
      </section>
    </main>
  );
}

const LuxuryValueCard = ({ title, description, isDark }) => {
  return (
    <div className={`group relative p-8 rounded-xl border-4 transition-all duration-300 ${
      isDark 
        ? 'bg-gray-900 border-red-600/30 hover:border-red-600 hover:bg-gray-800' 
        : 'bg-gray-50 border-red-600/20 hover:border-red-600 hover:bg-white'
    }`}>
      <div className="flex items-start mb-6">
        <div className="h-1 w-12 bg-red-600 rounded-full"></div>
      </div>
      <h3 className={`text-2xl font-black mb-4 ${isDark ? 'text-white' : 'text-black'}`}>{title}</h3>
      <p className={`leading-relaxed text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{description}</p>
    </div>
  );
};

const AboutAccordion = ({ isDark }) => {
  const [openItems, setOpenItems] = useState(['item-1']);
  const isOpen = (value) => openItems.includes(value);

  const toggleItem = (value) => {
    setOpenItems(prev => 
      prev.includes(value) 
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };
  
  const steps = [
    {
      value: 'item-1',
      title: 'Access the website',
      content: (
        <>
          <p className="mb-2 font-semibold">Click the link below to visit our store:</p>
          <a 
            href='https://opencodechicago.org' 
            target='_blank' 
            rel="noopener noreferrer"
            className="text-red-600 hover:text-red-700 font-semibold underline break-all transition-colors text-lg"
          >
            https://opencodechicago.org
          </a>
          <p className={`mt-3 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>(This will open a new tab with the homepage.)</p>
        </>
      )
    },
    {
      value: 'item-2',
      title: 'Browse Products',
      content: (
        <>
          <p className="mb-3">Explore our premium collections including Pre-Workout, Build Muscle, Recovery, and more.</p>
          <p className={isDark ? 'text-gray-400' : 'text-gray-700'}>Use advanced filters to find products by category, benefit, or your specific performance goals.</p>
        </>
      )
    },
    {
      value: 'item-3',
      title: 'Add to cart',
      content: (
        <>
          <p className="mb-3">When you find products that match your goals, click "Add to Cart".</p>
          <p className={isDark ? 'text-gray-400' : 'text-gray-700'}>Your selected items will appear in your cart, ready for checkout whenever you're prepared.</p>
        </>
      )
    },
    {
      value: 'item-4',
      title: 'Checkout (Demo)',
      content: (
        <>
          <p className="mb-3">Proceed through our streamlined checkout process to experience our platform.</p>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>Note: This is a demonstration environment. No real payments are processed — this is part of our open source initiative with Open Code Chicago.</p>
        </>
      )
    },
    {
      value: 'item-5',
      title: 'Contribute & Collaborate',
      content: (
        <>
          <p className="mb-3 font-semibold">Want to help us build the future of CoreX?</p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-red-600 font-black mt-1 flex-shrink-0 text-xl">▸</span>
              <span className="text-lg">Visit our GitHub repository and explore the codebase.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-red-600 font-black mt-1 flex-shrink-0 text-xl">▸</span>
              <span className="text-lg">Check open issues for features, bugs, and documentation tasks.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-red-600 font-black mt-1 flex-shrink-0 text-xl">▸</span>
              <span className="text-lg">Pick a task, follow our contribution guidelines, and submit a pull request.</span>
            </li>
          </ul>
        </>
      )
    }
  ];
  
  return (
    <div className="space-y-4">
      {steps.map((step) => (
        <div key={step.value}>
          <button
            onClick={() => toggleItem(step.value)}
            className={`flex w-full items-center justify-between gap-4 px-8 py-6 font-bold text-lg rounded-lg border-4 transition-all duration-300 ${
              isDark 
                ? `${isOpen(step.value) ? 'bg-gray-900 border-red-600' : 'bg-gray-900 border-gray-800 hover:border-red-600/50'} text-white` 
                : `${isOpen(step.value) ? 'bg-white border-red-600' : 'bg-white border-gray-300 hover:border-red-600/50'} text-black`
            }`}
          >
            <span>{step.title}</span>
            <span className="text-red-600 transition-transform duration-300 flex-shrink-0">
              {isOpen(step.value) ? <X className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
            </span>
          </button>
          {isOpen(step.value) && (
            <div className={`px-8 py-6 rounded-b-lg border-4 border-t-0 transition-all ${
              isDark 
                ? 'bg-gray-800 border-gray-800 text-gray-200' 
                : 'bg-gray-100 border-gray-300 text-gray-900'
            }`}>
              <div className="text-base leading-relaxed">
                {step.content}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};