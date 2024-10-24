'use client'
import AnimatedBackground from '@/components/AnimatedBackground';
import CategorySelection from '@/components/CategorySelection';
import QuizForm from '@/components/Quiz';
import RegistrationForm from '@/components/RegisterationForm';
import SuccessMessage from '@/components/SuccessMessage';
import Image from 'next/image';
import React, { useState } from 'react';

export default function Home() {
  const [showRegistration, setShowRegistration] = useState(false);
  const [step, setStep] = useState('registration');
  const [userData, setUserData] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

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
      // Submit all data to the API
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



    const speakers = [
        { name: 'Franki Wright', role: 'UI Product Designer' },
        { name: 'John Henry', role: 'Software Engineer' },
        { name: 'Jerry Wallace', role: 'Frontend Developer' },
        { name: 'James Valdes', role: 'Full Stack Developer' },
        { name: 'Erny Sukmana', role: 'Lead Engineer' },
        { name: 'Franki Wright', role: 'Full Stack Engineer' }
    ];

    const schedule = [
        { time: '08:00-10:00', title: 'Event Registration', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit' },
        { time: '10:00-12:00', title: 'The Future of JS', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit' },
        { time: '12:00-02:00', title: 'Javascript Ecosystem', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit' },
        { time: '02:00-04:00', title: 'Javascript Algorithm', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit' }
    ];

    return (
        <div className="min-h-screen  text-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <AnimatedBackground />

            {/* Hero Section */}
            <section className="h-screen  py-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                    <h2 className="text-4xl font-bold mb-8 md:mt-52 mt-20">FLY Inaugurational Conference 2023</h2>

                    {/* Countdown Timer */}
                    <div className="flex gap-4 mb-8">
                        {[
                            { value: '31', label: 'Days' },
                            { value: '16', label: 'Hours' },
                            { value: '20', label: 'Mins' },
                            { value: '50', label: 'Secs' }
                        ].map((item, index) => (
                            <div key={index} className="text-center">
                                <div className="text-2xl font-bold">{item.value}</div>
                                <div className="text-sm text-gray-400">{item.label}</div>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={() => setShowRegistration(true)}
                        className="w-full py-3 bg-red-500 rounded-md font-semibold"
                    >
                        Register Now
                    </button>
                    <button className="w-full py-3 rounded-md font-semibold mt-3">Know more</button>
                </div>

                <div className="  justify-center items-center hidden md:flex">
                    <div className=' border border-red-400 h-2/3 relative  flex justify-center items-center'>
                        <Image width={1000} height={1000} src="/Image.png" alt="Conference" className="h-full object-cover relative top-6 left-6" />

                    </div>
                </div>
            </section>
            {showRegistration && (
                <>
                    {step === 'registration' && (
                        <RegistrationForm onSuccess={handleRegistrationSuccess} />
                    )}
                    {step === 'categorySelection' && (
                        <CategorySelection onSelect={handleCategorySelect} />
                    )}
                    {step === 'quiz' && (
                        <QuizForm 
                            category={selectedCategory}
                            userData={userData}
                            onComplete={handleQuizComplete}
                        />
                    )}
                    {step === 'success' && (
                        <SuccessMessage userData={userData} />
                    )}
                </>
            )}
            {/* About Section */}
            <section>
                <div className="md:flex md:gap-3">
                    <div className='flex justify-center items-center'>
                        <Image src={'/Image.png'} width={500} height={200} className=" w-full h-2/3 object-cover" />

                    </div>
                    <div className=" flex justify-center items-center">
                        <div>
                            <h1 className="text-4xl font-bold mt-3 mb-4">About Conference</h1>
                            <p className="text-gray-400 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi quam malesuada scelerisque placerat torata ac amet.</p>
                            <p className="text-gray-400 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi quam malesuada scelerisque placerat torata ac amet.</p>
                            <p className="text-gray-400 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi quam malesuada scelerisque placerat torata ac amet.</p>

                            <div className="flex gap-8 mt-8">
                                <div className="text-center p-5 bg-gray-800">
                                    <div className="text-2xl font-bold">2</div>
                                    <div className="text-sm text-gray-400">Days Event</div>
                                </div>
                                <div className="text-center  p-5 bg-gray-800">
                                    <div className="text-2xl font-bold">15+</div>
                                    <div className="text-sm text-gray-400">Speakers</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Speakers Section */}
            <section className=" py-16">
                <div className="flex justify-between items-center mb-8">
                    <h3 className="text-2xl font-bold">Speakers</h3>
                    <button className="text-red-500">See all speakers</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {speakers.map((speaker, index) => (
                        <div key={index} className="bg-gray-800 p-6 rounded-lg">
                            <img src="/Image.png" alt={speaker.name} className="w-16 h-16 rounded-full mb-4" />
                            <h4 className="font-semibold">{speaker.name}</h4>
                            <p className="text-sm text-gray-400">{speaker.role}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Schedule Section */}
            <section className=" py-16">
                <h3 className="text-2xl font-bold mb-8">Conference Schedule</h3>
                <p className="text-gray-400 mb-8">Friday, 28 October 2024</p>

                <div className="space-y-4">
                    {schedule.map((item, index) => (
                        <div key={index} className="bg-gray-800 p-6 rounded-lg">
                            <div className="text-sm text-gray-400 mb-2">{item.time}</div>
                            <h4 className="font-semibold mb-2">{item.title}</h4>
                            <p className="text-sm text-gray-400">{item.description}</p>
                        </div>
                    ))}
                </div>

                <button className="w-full py-3 bg-red-500 rounded-md font-semibold mt-8">Join Now</button>
            </section>




        </div>
    );
}