import React, { useState, useEffect } from 'react';

const CheckCircle = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

const Zap = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
    </svg>
);

const Globe = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="2" y1="12" x2="22" y2="12"></line>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
    </svg>
);

const Bell = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
        <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
    </svg>
);

const Twitter = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.223.085 4.923 4.923 0 004.6 3.419A9.9 9.9 0 010 17.54a13.94 13.94 0 007.548 2.212c9.058 0 14.01-7.502 14.01-14.01 0-.213 0-.425-.015-.637a10.02 10.02 0 002.45-2.54z"></path>
    </svg>
);

const GitHub = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.565 21.796 24 17.3 24 12c0-6.627-5.373-12-12-12z"></path>
    </svg>
);


const AppMockup = () => (
    <div className="relative mt-12 lg:mt-0 lg:ml-12">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-4 lg:w-[450px] transform-gpu transition-transform hover:-translate-y-2 hover:shadow-3xl duration-500">
            <div className="flex justify-between items-center mb-3">
                <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="text-sm font-medium text-gray-600">My Tasks</div>
                <div className="w-6 h-6"></div>
            </div>
            <div className="space-y-3">
                <div className="flex items-center bg-violet-100 p-3 rounded-lg shadow-sm">
                    <input type="checkbox" className="h-5 w-5 rounded-full text-violet-500 focus:ring-0 border-violet-300" defaultChecked/>
                    <p className="ml-3 text-gray-700 font-medium">Design new landing page</p>
                </div>
                <div className="flex items-center bg-white p-3 rounded-lg shadow-sm">
                     <input type="checkbox" className="h-5 w-5 rounded-full text-violet-500 focus:ring-0 border-gray-300"/>
                    <p className="ml-3 text-gray-800">Develop API for user authentication</p>
                </div>
                <div className="flex items-center bg-white p-3 rounded-lg shadow-sm">
                     <input type="checkbox" className="h-5 w-5 rounded-full text-violet-500 focus:ring-0 border-gray-300"/>
                    <p className="ml-3 text-gray-800">Deploy app to production server</p>
                </div>
                 <div className="flex items-center bg-white p-3 rounded-lg shadow-sm opacity-60">
                     <input type="checkbox" className="h-5 w-5 rounded-full text-violet-500 focus:ring-0 border-gray-300"/>
                    <p className="ml-3 text-gray-400">Write documentation</p>
                </div>
            </div>
        </div>
        <div className="absolute -bottom-8 -right-8 bg-white/70 backdrop-blur-md p-3 rounded-xl shadow-2xl w-56 transform-gpu transition-transform hover:scale-105 duration-500 hidden md:block">
            <p className="text-xs font-semibold text-gray-800 mb-1">Mobile Sync</p>
            <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-blue-200 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                    <p className="text-sm font-bold text-gray-900">Tasks Synced</p>
                    <p className="text-xs text-gray-500">Just now</p>
                </div>
            </div>
        </div>
    </div>
);


export default function LandingHome() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const sections = document.querySelectorAll('.fade-in-section');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.1 });

    sections.forEach(section => {
      observer.observe(section);
    });

    return () => sections.forEach(section => observer.unobserve(section));
  }, []);

  return (
    <div className="bg-gray-50 text-gray-800 font-sans antialiased">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">Taskify</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">Features</a>
            <a href="#testimonials" className="text-gray-600 hover:text-blue-600 transition-colors">Testimonials</a>
            <a href="/login" className="text-gray-600 hover:text-blue-600 transition-colors">Login</a>
            <a href="/signup" className="bg-blue-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-blue-700 transition-transform transform hover:scale-105">
              Sign Up
            </a>
          </nav>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-white py-4 px-6">
             <a href="#features" className="block text-gray-600 py-2 hover:text-blue-600 transition-colors">Features</a>
            <a href="#testimonials" className="block text-gray-600 py-2 hover:text-blue-600 transition-colors">Testimonials</a>
            <a href="/login" className="block text-gray-600 py-2 hover:text-blue-600 transition-colors">Login</a>
            <a href="/signup" className="mt-2 block w-full text-center bg-blue-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-blue-700 transition-transform transform hover:scale-105">
              Sign Up
            </a>
          </div>
        )}
      </header>

      <main>
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-28">
          <div className="absolute inset-0 overflow-hidden">
             <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200 rounded-full opacity-30 -translate-x-1/4 -translate-y-1/4 filter blur-3xl"></div>
             <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet-200 rounded-full opacity-30 translate-x-1/4 translate-y-1/4 filter blur-3xl"></div>
          </div>
          <div className="container mx-auto px-6 relative">
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <div className="lg:w-1/2 text-center lg:text-left">
                <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
                  Organize Your Day,
                  <br />
                  <span className="text-blue-600">The Smart Way</span>
                </h1>
                <p className="mt-6 text-lg text-gray-600 max-w-lg mx-auto lg:mx-0">
                  Taskify helps you manage tasks effortlessly with a simple, intuitive interface designed for modern productivity.
                </p>
                <div className="mt-8 flex justify-center lg:justify-start space-x-4">
                  <a href="/signup" className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-blue-700 transition-transform transform hover:scale-105 shadow-lg">
                    Get Started for Free
                  </a>
                </div>
              </div>
              <div className="lg:w-1/2">
                <AppMockup />
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="py-20 bg-white fade-in-section">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900">Everything you need, nothing you don't</h2>
              <p className="mt-4 text-lg text-gray-600">Taskify is packed with features to boost your productivity.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-gray-50 p-8 rounded-2xl text-center transform transition-transform hover:-translate-y-2 duration-300">
                <div className="inline-block bg-blue-100 text-blue-600 p-4 rounded-full">
                  <Zap />
                </div>
                <h3 className="mt-4 text-xl font-bold">Fast & Easy</h3>
                <p className="mt-2 text-gray-600">A simple, intuitive interface that lets you focus on your tasks.</p>
              </div>
              <div className="bg-gray-50 p-8 rounded-2xl text-center transform transition-transform hover:-translate-y-2 duration-300">
                <div className="inline-block bg-green-100 text-green-600 p-4 rounded-full">
                  <Globe />
                </div>
                <h3 className="mt-4 text-xl font-bold">Cross-Platform Sync</h3>
                <p className="mt-2 text-gray-600">Access your tasks from anywhere, on any device.</p>
              </div>
              <div className="bg-gray-50 p-8 rounded-2xl text-center transform transition-transform hover:-translate-y-2 duration-300">
                <div className="inline-block bg-yellow-100 text-yellow-600 p-4 rounded-full">
                  <Bell />
                </div>
                <h3 className="mt-4 text-xl font-bold">Smart Reminders</h3>
                <p className="mt-2 text-gray-600">Never miss a deadline with intelligent notifications.</p>
              </div>
              <div className="bg-gray-50 p-8 rounded-2xl text-center transform transition-transform hover:-translate-y-2 duration-300">
                <div className="inline-block bg-violet-100 text-violet-600 p-4 rounded-full">
                  <CheckCircle />
                </div>
                <h3 className="mt-4 text-xl font-bold">Elegant UI</h3>
                <p className="mt-2 text-gray-600">A beautiful and clean interface that you'll love to use.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="testimonials" className="py-20 bg-gray-50 fade-in-section">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900">Loved by teams everywhere</h2>
                    <p className="mt-4 text-lg text-gray-600">See what our users have to say about Taskify.</p>
                </div>
                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="bg-white p-8 rounded-2xl shadow-md">
                        <p className="text-gray-700">"Taskify has completely transformed how I manage my projects. It's simple, powerful, and a joy to use every day."</p>
                        <div className="mt-6 flex items-center">
                            <img className="w-12 h-12 rounded-full" src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="User Avatar" />
                            <div className="ml-4">
                                <p className="font-semibold text-gray-900">Sarah Johnson</p>
                                <p className="text-gray-500 text-sm">Project Manager</p>
                            </div>
                        </div>
                    </div>
                     <div className="bg-white p-8 rounded-2xl shadow-md">
                        <p className="text-gray-700">"The best productivity app I've ever used. The cross-platform sync is seamless and keeps my entire team on the same page."</p>
                        <div className="mt-6 flex items-center">
                            <img className="w-12 h-12 rounded-full" src="https://i.pravatar.cc/150?u=a042581f4e29026705d" alt="User Avatar" />
                            <div className="ml-4">
                                <p className="font-semibold text-gray-900">Mike Thompson</p>
                                <p className="text-gray-500 text-sm">Lead Developer</p>
                            </div>
                        </div>
                    </div>
                     <div className="bg-white p-8 rounded-2xl shadow-md">
                        <p className="text-gray-700">"From its elegant UI to its powerful features, Taskify has everything I need to stay organized and focused. Highly recommended!"</p>
                        <div className="mt-6 flex items-center">
                            <img className="w-12 h-12 rounded-full" src="https://i.pravatar.cc/150?u=a042581f4e29026706d" alt="User Avatar" />
                            <div className="ml-4">
                                <p className="font-semibold text-gray-900">Jessica Lee</p>
                                <p className="text-gray-500 text-sm">Freelance Designer</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="py-20 bg-blue-600 fade-in-section">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-4xl font-bold text-white">Boost your productivity today</h2>
                <p className="mt-4 text-lg text-blue-100">Join thousands of users who are getting more done with Taskify.</p>
                <div className="mt-8">
                    <a href="/signup" className="bg-white text-blue-600 px-10 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-transform transform hover:scale-105 shadow-lg">
                        Try for Free
                    </a>
                </div>
            </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white">
          <div className="container mx-auto px-6 py-12">
              <div className="md:flex md:justify-between md:items-center">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-8 h-8 text-white" />
                    <span className="text-2xl font-bold">Taskify</span>
                  </div>
                  <div className="flex mt-8 md:mt-0 space-x-6">
                      <a href="#" className="text-gray-400 hover:text-white">About</a>
                      <a href="#" className="text-gray-400 hover:text-white">Contact</a>
                      <a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a>
                  </div>
              </div>
              <hr className="my-8 border-gray-700" />
              <div className="flex flex-col md:flex-row justify-between items-center">
                  <p className="text-gray-400">&copy; {new Date().getFullYear()} Taskify. All rights reserved.</p>
                  <div className="flex mt-4 md:mt-0 space-x-4">
                      <a href="#" className="text-gray-400 hover:text-white"><Twitter /></a>
                      <a href="#" className="text-gray-400 hover:text-white"><GitHub /></a>
                  </div>
              </div>
          </div>
      </footer>
    </div>
  );
}

