import React from 'react';
import { Heart, Users, Award, Target, CheckCircle, Star } from 'lucide-react';
import { TESTIMONIALS } from '../utils/constants';

const About: React.FC = () => {
  const stats = [
    { number: '10,000+', label: 'Happy Customers' },
    { number: '50+', label: 'Products' },
    { number: '11', label: 'Categories' },
    { number: '99%', label: 'Satisfaction Rate' }
  ];

  const values = [
    {
      icon: <Heart className="w-8 h-8 text-primary" />,
      title: 'Customer First',
      description: 'Every decision we make is centered around delivering exceptional value and experience to our customers.'
    },
    {
      icon: <Award className="w-8 h-8 text-primary" />,
      title: 'Premium Quality',
      description: 'We source only the finest materials and work with skilled craftspeople to ensure every product meets our high standards.'
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: 'Community Focus',
      description: 'We believe in building lasting relationships with our customers and contributing positively to our local community.'
    },
    {
      icon: <Target className="w-8 h-8 text-primary" />,
      title: 'Innovation',
      description: 'We continuously evolve our products and services to meet changing customer needs and market trends.'
    }
  ];

  const timeline = [
    {
      year: '2023',
      title: 'The Beginning',
      description: 'TryneX was founded with a simple vision: to make premium, personalized gifts accessible to everyone in Bangladesh.'
    },
    {
      year: '2024',
      title: 'Growing Strong',
      description: 'Expanded our product range to include 11 categories and served over 5,000 happy customers.'
    },
    {
      year: '2025',
      title: 'Premium Excellence',
      description: 'Launched our premium e-commerce platform with advanced features and enhanced customer experience.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About <span className="trynex-text-gradient">TryneX</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We are passionate about creating meaningful connections through premium gifts and personalized products. 
            Every item we offer is carefully selected to bring joy, celebrate special moments, and create lasting memories.
          </p>
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Our Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                TryneX began as a dream to bridge the gap between ordinary gifts and extraordinary experiences. 
                Founded in 2023, we started with a simple belief: every gift should tell a story, evoke emotion, 
                and create a lasting impression.
              </p>
              <p>
                What started as a small venture has grown into Bangladesh's premier destination for premium gifts 
                and personalized products. We've built our reputation on three pillars: uncompromising quality, 
                exceptional customer service, and innovative personalization options.
              </p>
              <p>
                Today, we're proud to serve thousands of customers across Bangladesh, helping them celebrate 
                life's special moments with products that are as unique as the people who receive them.
              </p>
            </div>
          </div>
          
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
              alt="Our Story"
              className="rounded-lg shadow-lg w-full h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-lg"></div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
            <p className="text-gray-600">
              To make every gift-giving moment special by providing premium, personalized products that 
              create lasting memories and strengthen relationships. We strive to be the trusted partner 
              for all your gifting needs.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Star className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
            <p className="text-gray-600">
              To become the leading premium gift and personalization company in Bangladesh, known for 
              our exceptional quality, innovative products, and unparalleled customer experience that 
              brings joy to every celebration.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Journey</h2>
          <div className="max-w-4xl mx-auto">
            {timeline.map((item, index) => (
              <div key={index} className="flex items-start space-x-4 mb-8">
                <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                  {item.year}
                </div>
                <div className="flex-1 bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Choose TryneX?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex items-start space-x-4">
              <CheckCircle className="w-6 h-6 text-green-500 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Premium Quality</h3>
                <p className="text-gray-600">Every product is carefully selected and quality-tested to ensure it meets our high standards.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <CheckCircle className="w-6 h-6 text-green-500 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Fast Delivery</h3>
                <p className="text-gray-600">Quick and reliable delivery across Bangladesh with real-time tracking.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <CheckCircle className="w-6 h-6 text-green-500 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Personalization</h3>
                <p className="text-gray-600">Extensive customization options to make every gift truly unique and personal.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <CheckCircle className="w-6 h-6 text-green-500 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Secure Payments</h3>
                <p className="text-gray-600">Multiple secure payment options including Bkash, Nagad, Rocket, and cash on delivery.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <CheckCircle className="w-6 h-6 text-green-500 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">24/7 Support</h3>
                <p className="text-gray-600">Round-the-clock customer support via WhatsApp, email, and phone.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <CheckCircle className="w-6 h-6 text-green-500 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Easy Returns</h3>
                <p className="text-gray-600">Hassle-free 7-day return policy for your peace of mind.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Testimonials */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial) => (
              <div key={testimonial.id} className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.comment}"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold mr-3">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-primary to-primary/80 rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Create Something Special?
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Join thousands of satisfied customers who trust TryneX for their gifting needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/products"
              className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Shop Now
            </a>
            <a
              href="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
