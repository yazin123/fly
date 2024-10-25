'use client'
import AnimatedBackground from '@/components/AnimatedBackground';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { BsCalendar2Event } from 'react-icons/bs';

const EventsPage = () => {
  // Sample events data - this would come from your backend
  const eventsData = [
    {
      id: 1,
      title: 'FLY Inaugurational Conference 2024',
      date: '2024-12-21T09:00:00',
      image: '/Image.png'
    },
   
  ];

  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Initialize events with countdown data
    const initializedEvents = eventsData.map(event => ({
      ...event,
      timeLeft: calculateTimeLeft(new Date(event.date))
    }));
    setEvents(initializedEvents);

    // Update all countdowns every second
    const timer = setInterval(() => {
      setEvents(prevEvents =>
        prevEvents.map(event => ({
          ...event,
          timeLeft: calculateTimeLeft(new Date(event.date))
        }))
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const calculateTimeLeft = (eventDate) => {
    const now = new Date();
    const difference = eventDate - now;

    // Return all zeros if the event has passed
    if (difference < 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    };
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-UK', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="min-h-screen p-6 pt-52">
      <AnimatedBackground />

      <h2 className="text-white text-4xl font-bold text-center mb-12">
        Explore and Join Upcoming Events
      </h2>

      <div className="flex flex-wrap justify-center gap-6 max-w-7xl mx-auto">
        {events.map((event, index) => (
          <div
            key={event.id}
            className="w-1/2"
            style={{
              opacity: 0,
              animation: `fadeIn 0.5s ease-out ${index * 0.1}s forwards`
            }}
          >
            <div className="backdrop-blur-3xl bg-white/5 md:pt-10 md:pl-10  border border-white/20 flex">
              <div className="md:w-2/3  p-3 pb-5 md:pb-10">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-white/70 text-sm mb-2 flex items-center gap-2">
                      <BsCalendar2Event />
                      {formatDate(event.date)}
                    </p>
                    <h3 className="text-white text-xl font-semibold mb-4">
                      {event.title}
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-2 mb-11">
                  <div className="text-center">
                    <p className="text-white text-xl font-bold">
                      {event.timeLeft.days}
                    </p>
                    <p className="text-white/70 text-xs">Days</p>
                  </div>
                  <div className="text-center">
                    <p className="text-white text-xl font-bold">
                      {event.timeLeft.hours}
                    </p>
                    <p className="text-white/70 text-xs">Hours</p>
                  </div>
                  <div className="text-center">
                    <p className="text-white text-xl font-bold">
                      {event.timeLeft.minutes}
                    </p>
                    <p className="text-white/70 text-xs">Mins</p>
                  </div>
                  <div className="text-center">
                    <p className="text-white text-xl font-bold">
                      {event.timeLeft.seconds}
                    </p>
                    <p className="text-white/70 text-xs">Secs</p>
                  </div>
                </div>

                <Link
                  className="p-2 btn-bg text-white rounded-sm  min-w-full
                           hover:bg-red-400 transition-colors duration-300"
                  href={`/${event.id}`}
                >
                  Know more
                </Link>
              </div>

              <img
                src={event.image}
                alt={event.title}
                className="md:w-1/3 h-auto object-cover hidden md:block"
              />
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default EventsPage;