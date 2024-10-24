'use client'
import AnimatedBackground from '@/components/AnimatedBackground';
import CategorySelection from '@/components/CategorySelection';
import QuizForm from '@/components/Quiz';
import RegistrationForm from '@/components/RegisterationForm';
import SuccessMessage from '@/components/SuccessMessage';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';

export default function Home() {
    const [showRegistration, setShowRegistration] = useState(false);
    const [step, setStep] = useState('registration');
    const [userData, setUserData] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [countdown, setCountdown] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });
    const [eventStatus, setEventStatus] = useState('upcoming'); // 'upcoming', 'ongoing', 'ended'

    const eventData = {
        id: '1',
        title: 'NextGen Entrepreneur Awards 2024',
        subtitle: 'Empowering Tomorrows Business Leaders Today',
        date: '21st December 2024',
        startTime: '09:00',
        endTime: '17:00',
        venue: 'Gokulam Convention Center, Kochi',
        description: `The FLY NextGen Awards 2024 is a premier platform dedicated to recognizing, inspiring and empowering young entrepreneurs to become the business leaders of tomorrow. Hosted by Forward Looking Youth (FLY) International, this event celebrates the vibrant entrepreneurial spirit of youth, providing a unique oppurtunity for emerging talents to showcase their skills and gain invaluable mentorship from industrial experts. With a commitment to equipping young minds with the essential knowledge, tools and networks needed for success, FLY gathers over 200+ young entrepreneurs from diverse industries for a dynamic day filled with competitions, training sessions, expert talks and a prestigious award ceremony`,
        whyParticipate: [
            'Tackle engaging activities across various categories including Strategy, Financial Management, Marketing, Leadership, Technology, and Human Resource Management',
            'Benefit from case studies and interactive sessions led by industry experts, equipping you with the knowledge to navigate complex business scenarios effectively.',
            'Present your skills before leaders and consultants who will offer guidance, support and valuable insights to help you grow',
            'Interact with successful business leaders and consultants who will offer guidance, support and valuable insights to help you grow',
            'Connect with like minded young entrepreneurs, fostering relationships that can shape your future business endeavours.',
            'Be recognized for your talents in front of a prestigious audience of industry leaders and peers, enhancing your credibility and visibility in the entrepreneurial community.'
        ],
        highlights: [
            'Compete in real world business challenges evaluated by industry experts.',
            'Attend interactive sessions led by successful business leaders to develop essential skills in finance, marketing, leadership and technology.',
            'Listen to successful entrepreneurs share their experiences and insights',
            'Meet and connect with over 200 young entrepreneurs and industry leaders to build valuable relationships',
            'Participate in activities like case studies and simulations to gain real world experiences'
        ]
    };

    useEffect(() => {
        const calculateCountdown = () => {
            const eventDate = new Date('2024-12-21T09:00:00');
            const eventEndDate = new Date('2024-12-21T17:00:00');
            const now = new Date();

            // Check event status
            if (now >= eventDate && now < eventEndDate) {
                setEventStatus('ongoing');
            } else if (now >= eventEndDate) {
                setEventStatus('ended');
            } else {
                setEventStatus('upcoming');
            }

            if (eventStatus === 'upcoming') {
                const difference = eventDate - now;

                setCountdown({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / (1000 * 60)) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                });
            }
        };

        const timer = setInterval(calculateCountdown, 1000);
        return () => clearInterval(timer);
    }, [eventStatus]);

    const handleRegistrationSuccess = (data) => {
        setUserData(data);
        setStep('categorySelection');
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setUserData(prev => ({
            ...prev,
            category
        }));
        setStep('quiz');
    };

    const handleQuizComplete = async (quizResults) => {
        const finalData = {
            ...userData,
            category: selectedCategory,
            quizResults
        };

        try {
            const response = await fetch('/api/registration', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(finalData),
            });

            if (!response.ok) {
                throw new Error('Failed to save registration');
            }

            setUserData(finalData);
            setStep('success');
        } catch (error) {
            console.error('Failed to save registration:', error);
            alert('Failed to save your registration. Please try again.');
        }
    };

    const renderEventStatus = () => {
        switch (eventStatus) {
            case 'ongoing':
                return (
                    <div className="bg-green-500 px-6 py-3 rounded-md text-center">
                        <h3 className="text-xl font-bold">Event is Live!</h3>
                        <p>The NextGen Entrepreneur Awards 2024 is currently in progress</p>
                    </div>
                );
            case 'ended':
                return (
                    <div className="bg-gray-700 px-6 py-3 rounded-md text-center">
                        <h3 className="text-xl font-bold">Event has Ended</h3>
                        <p>Thank you for your interest. Stay tuned for future events!</p>
                    </div>
                );
            default:
                return (
                    <>
                        <div className="flex gap-4 mb-8">
                            {Object.entries(countdown).map(([unit, value]) => (
                                <div key={unit} className="text-center bg-gray-800 p-4 rounded-lg">
                                    <div className="text-2xl font-bold">{String(value).padStart(2, '0')}</div>
                                    <div className="text-sm text-gray-400 capitalize">{unit}</div>
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={() => setShowRegistration(true)}
                            className="w-full py-3 bg-red-500 rounded-md font-semibold"
                        >
                            Register Now
                        </button>
                        <button className="w-full py-3 rounded-md font-semibold mt-3">
                            Know more
                        </button>
                    </>
                );
        }
    };

    return (
        <div className="min-h-screen text-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedBackground />

            {/* Hero Section */}
            <section className="min-h-screen py-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                    <h2 className="text-4xl font-bold mb-4 md:mt-52 mt-20">{eventData.title}</h2>
                    <p className="text-xl mb-4 text-gray-300">{eventData.subtitle}</p>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-red-500">📅</span>
                        <span>{eventData.date}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-red-500">🕒</span>
                        <span>{eventData.startTime} - {eventData.endTime}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-8">
                        <span className="text-red-500">📍</span>
                        <span>{eventData.venue}</span>
                    </div>

                    {renderEventStatus()}
                </div>

                <div className="justify-center items-center hidden md:flex">
                    <div className="border border-red-400 h-2/3 relative flex justify-center items-center">
                        <Image width={1000} height={1000} src="/Image.png" alt="Conference" className="h-full object-cover relative top-6 left-6" />
                    </div>
                </div>
            </section>

            {/* Registration Flow */}
            {showRegistration && eventStatus === 'upcoming' && (
                <>
                    {step === 'registration' && <> <RegistrationForm onSuccess={handleRegistrationSuccess} />   </>}
                    {step === 'categorySelection' && <CategorySelection onSelect={handleCategorySelect} />}
                    {step === 'quiz' && <QuizForm category={selectedCategory} userData={userData} onComplete={handleQuizComplete} />}
                    {step === 'success' && <SuccessMessage userData={userData} />}
                </>
            )}

            {/* About Section */}
            <section className="py-16">
                <h3 className="text-3xl font-bold mb-6">About The Event</h3>
                <p className="text-gray-300 mb-8">{eventData.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h4 className="text-2xl font-bold mb-4">Why Participate?</h4>
                        <ul className="space-y-4">
                            {eventData.whyParticipate.map((item, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <span className="text-red-500 mt-1">•</span>
                                    <span className="text-gray-300">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-2xl font-bold mb-4">Event Highlights</h4>
                        <ul className="space-y-4">
                            {eventData.highlights.map((item, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <span className="text-red-500 mt-1">•</span>
                                    <span className="text-gray-300">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            {eventStatus === 'upcoming' && (
                <section className="py-16">
                    <div className="text-center">
                        <h3 className="text-3xl font-bold mb-4">Ready to Join Us?</h3>
                        <p className="text-gray-300 mb-8">Don't miss this opportunity to be part of the NextGen Entrepreneur Awards 2024</p>
                        <button
                            onClick={() => setShowRegistration(true)}
                            className="px-8 py-3 bg-red-500 rounded-md font-semibold"
                        >
                            Register Now
                        </button>
                    </div>
                </section>
            )}
        </div>
    );
}