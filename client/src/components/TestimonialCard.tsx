import { Star } from 'lucide-react';
import { Testimonial } from '../types';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          size={16}
          className={`${i <= rating ? 'text-[#d4af37] fill-current' : 'text-gray-300'}`}
        />
      );
    }
    return stars;
  };

  return (
    <div className="testimonial-card">
      <div className="flex items-center mb-4">
        <div className="flex space-x-1 mr-4">
          {renderStars(testimonial.rating)}
        </div>
        <span className="text-sm text-gray-600">{testimonial.rating}.0</span>
      </div>
      <p className="text-gray-700 mb-4">"{testimonial.comment}"</p>
      <div className="flex items-center">
        <div className="w-10 h-10 bg-[#d4af37] rounded-full flex items-center justify-center text-white font-bold mr-3">
          {testimonial.avatar}
        </div>
        <div>
          <h4 className="font-semibold">{testimonial.name}</h4>
          <p className="text-sm text-gray-600">{testimonial.location}</p>
        </div>
      </div>
    </div>
  );
}
