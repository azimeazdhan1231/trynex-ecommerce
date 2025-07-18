import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    title: "Premium Gifts for Every Occasion",
    subtitle: "Discover our exclusive collection of luxury gifts, personalized mugs, and premium accessories",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080",
    cta1: "Shop Now",
    cta2: "Explore Categories"
  },
  {
    id: 2,
    title: "Exclusive Collections",
    subtitle: "From traditional Bengali crafts to modern premium accessories",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080",
    cta1: "Browse Collections",
    cta2: "View Offers"
  },
  {
    id: 3,
    title: "Traditional Heritage",
    subtitle: "Celebrating Bengali culture with authentic handcrafted items",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080",
    cta1: "Explore Heritage",
    cta2: "Learn More"
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="hero-slider floating-elements">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-fixed"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          <div className="hero-content flex items-center justify-center h-full text-center text-white">
            <div className="max-w-4xl mx-auto px-4">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight animate-fade-in">
                {slide.title.split(' ').map((word, i) => (
                  <span key={i} className={word === 'Premium' || word === 'Exclusive' || word === 'Traditional' ? 'text-gradient' : ''}>
                    {word}{' '}
                  </span>
                ))}
              </h1>
              <p className="text-xl md:text-2xl mb-8 animate-slide-in">
                {slide.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
                <button className="btn-primary text-lg px-8 py-4">
                  {slide.cta1}
                </button>
                <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-black transition-all duration-300">
                  {slide.cta2}
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 z-10"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 z-10"
      >
        <ChevronRight size={24} />
      </button>

      {/* Slider Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 right-20 w-20 h-20 bg-[#d4af37]/20 rounded-full animate-float"></div>
      <div className="absolute bottom-20 left-20 w-32 h-32 bg-[#f4e88a]/10 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
    </section>
  );
}
