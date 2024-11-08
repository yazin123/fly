'use client'
import AnimatedBackground from '@/components/AnimatedBackground'
import EventsPage from '@/components/Event'
import HeroSection from '@/components/Home/Hero'
import MissionStatement from '@/components/Home/Mission'
import TeamBoard from '@/components/Home/Team'
import TestimonialSection from '@/components/Home/Testimonial'
import WhyJoinSection from '@/components/Home/WhyJoinFly'
import React from 'react'

const page = () => {
  return (
    <div className='max-w-7xl mx-auto text-center relative z-10 py-16 text-white'>
      <AnimatedBackground />
      <HeroSection />
      <div className="md:mb-60 p-3" data-aos="fade-in">
        <p>
          FLY connects ambitious individuals from entrepreneurial backgrounds, offering them access to valuable resources and personalized mentorship. Through FLY, members can engage in networking opportunities, share innovative ideas, and develop key business skills. The platform also hosts workshops and provides educational tools to help entrepreneurs navigate the challenges of building successful ventures
        </p>
      </div>
      <WhyJoinSection />
      <MissionStatement/>
      <TeamBoard />
      <EventsPage />
      <TestimonialSection/>
    </div>
  )
}

export default page
