// import { Award, Book, Brain, Terminal, Timer, Users } from "lucide-react";
// import React from "react";
// import { Link } from "react-router-dom";
// import Footer from "../components/Footer";
// import ThemeToggle from "../components/ThemeToggle";

// export function Landing() {
//   return (
//     <div>
//       {/* Header */}
//       <header className="fixed w-full bg-yellow-50 dark:bg-[#18181b] backdrop-blur-sm py-4 z-50 transition-all duration-300">
//         <div className="container mx-auto px-4 flex justify-between items-center">
//           <h1 className="text-2xl font-bold text-yellow-600 dark:text-yellow-200 hover:text-yellow-500 dark:hover:text-yellow-100 transition-colors duration-300">
//             DoodleDuck
//           </h1>
//           <nav className="hidden md:flex space-x-6"></nav>
//           <div className="flex space-x-4">
//             <Link to="/sign-in">
//               <button className="bg-yellow-600 dark:bg-yellow-200 hover:bg-yellow-500 dark:hover:bg-yellow-100 text-[#f5f5f5] dark:text-black px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-200/20">
//                 Get Started
//               </button>
//             </Link>
//             <ThemeToggle />
//           </div>
//         </div>
//       </header>

//       {/* Hero Section */}
//       <div className="relative min-h-screen flex items-center">
//         <div
//           className="absolute inset-0 bg-cover bg-center transition-transform duration-10000 hover:scale-105"
//           style={{
//             backgroundImage:
//               "url('https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')",
//           }}
//         >
//           <div className="absolute inset-0 bg-gray-900/70"></div>
//         </div>
//         <div className="relative container mx-auto px-4 py-32">
//           <div className="max-w-3xl transform transition-all duration-700 hover:translate-x-2">
//             <h1 className="text-5xl md:text-7xl font-bold mb-6 text-yellow-200 animate-fade-in">
//               Master Programming with Confidence
//             </h1>
//             <p className="text-xl md:text-2xl mb-8 text-gray-200">
//               Interactive learning platform with AI-powered guidance, real-time
//               coding environments, and a supportive community to help you
//               achieve your coding goals.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4">
//               <Link to="/sign-up">
//                 <button className="w-full sm:w-auto bg-yellow-200 hover:bg-yellow-300 text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-200/20">
//                   Start Learning Now
//                 </button>
//               </Link>
//               <Link to="/courses">
//                 <button className="w-full sm:w-auto bg-transparent border-2 border-yellow-200 hover:bg-yellow-200/10 text-yellow-200 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-200/20">
//                   Explore Courses
//                 </button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Stats Section */}
//       <div className="bg-[#f5f5f5] dark:bg-[#18181b] py-20">
//         <div className="container mx-auto px-4">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {[
//               {
//                 number: "50K+",
//                 label: "Active Learners",
//                 description:
//                   "Join our growing community of dedicated programmers",
//               },
//               {
//                 number: "200+",
//                 label: "Video Tutorials",
//                 description:
//                   "High-quality, curated content for effective learning",
//               },
//               {
//                 number: "15+",
//                 label: "Programming Languages",
//                 description: "Comprehensive coverage of popular technologies",
//               },
//               {
//                 number: "98%",
//                 label: "Success Rate",
//                 description: "Our students achieve their learning goals",
//               },
//             ].map((stat, index) => (
//               <div
//                 key={index}
//                 className="bg-yellow-100 p-8 rounded-2xl transform transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl dark:hover:shadow-yellow-200 dark:hover:shadow-lg group"
//               >
//                 <div className="text-5xl font-bold text-black mb-2 group-hover:text-yellow-800 transition-colors duration-300">
//                   {stat.number}
//                 </div>
//                 <div className="text-xl font-semibold text-gray-700 mb-2">
//                   {stat.label}
//                 </div>
//                 <div className="text-gray-600">{stat.description}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Features Section */}
//       <div className="py-20 bg-white dark:bg-gray-900">
//         <div className="container mx-auto px-4">
//           <h2 className="text-3xl md:text-4xl font-bold text-center text-black dark:text-yellow-200 mb-16 transform transition-all duration-500 hover:scale-105">
//             Everything You Need to Succeed
//           </h2>
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {[
//               {
//                 icon: (
//                   <Terminal className="w-12 h-12 text-black dark:text-yellow-200 group-hover:text-gray-800 dark:group-hover:text-yellow-300 transition-colors duration-300" />
//                 ),
//                 title: "Interactive Code Editor",
//                 description:
//                   "Write, compile, and test code directly in your browser with our powerful editor.",
//               },
//               {
//                 icon: (
//                   <Brain className="w-12 h-12 text-black dark:text-yellow-200 group-hover:text-gray-800 dark:group-hover:text-yellow-300 transition-colors duration-300" />
//                 ),
//                 title: "AI-Powered Learning",
//                 description:
//                   "Get personalized suggestions and help from our AI assistant as you code.",
//               },
//               {
//                 icon: (
//                   <Book className="w-12 h-12 text-black dark:text-yellow-200 group-hover:text-gray-800 dark:group-hover:text-yellow-300 transition-colors duration-300" />
//                 ),
//                 title: "Comprehensive Curriculum",
//                 description:
//                   "Structured learning paths for multiple programming languages and skill levels.",
//               },
//               {
//                 icon: (
//                   <Timer className="w-12 h-12 text-black dark:text-yellow-200 group-hover:text-gray-800 dark:group-hover:text-yellow-300 transition-colors duration-300" />
//                 ),
//                 title: "Progress Tracking",
//                 description:
//                   "Monitor your learning journey with detailed progress analytics.",
//               },
//               {
//                 icon: (
//                   <Users className="w-12 h-12 text-black dark:text-yellow-200 group-hover:text-gray-800 dark:group-hover:text-yellow-300 transition-colors duration-300" />
//                 ),
//                 title: "Community Support",
//                 description:
//                   "Connect with fellow learners and mentors in our active community.",
//               },
//               {
//                 icon: (
//                   <Award className="w-12 h-12 text-black dark:text-yellow-200 group-hover:text-gray-800 dark:group-hover:text-yellow-300 transition-colors duration-300" />
//                 ),
//                 title: "Certification",
//                 description:
//                   "Earn certificates upon completing courses and projects.",
//               },
//             ].map((feature, index) => (
//               <div
//                 key={index}
//                 className="group bg-yellow-50 dark:bg-gray-800 p-8 rounded-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg"
//               >
//                 <div className="mb-6 transform transition-all duration-300 group-hover:scale-110">
//                   {feature.icon}
//                 </div>
//                 <h3 className="text-2xl font-semibold text-yellow-800 dark:text-yellow-200 mb-4 dark:group-hover:text-yellow-300 group-hover:text-yellow-600 transition-colors duration-300">
//                   {feature.title}
//                 </h3>
//                 <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
//                   {feature.description}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Testimonials Section */}
//       <div className="py-20 bg-[#f5f5f5] dark:bg-[#18181b]">
//         <div className="container mx-auto px-4">
//           <h2 className="text-3xl md:text-4xl font-bold text-center text-yellow-700 dark:text-yellow-200 mb-16 transform transition-all duration-500 hover:scale-105">
//             What Our Users Say
//           </h2>
//           <div className="grid md:grid-cols-3 gap-8">
//             {[
//               {
//                 name: "Sarah Johnson",
//                 role: "Software Developer",
//                 image:
//                   "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
//                 quote:
//                   "DoodleDuck helped me transition from a beginner to a confident developer. The AI suggestions are incredibly helpful!",
//               },
//               {
//                 name: "Michael Chen",
//                 role: "Computer Science Student",
//                 image:
//                   "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
//                 quote:
//                   "The interactive coding environment and community support made learning programming enjoyable and effective.",
//               },
//               {
//                 name: "Emily Rodriguez",
//                 role: "Web Developer",
//                 image:
//                   "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
//                 quote:
//                   "The structured curriculum and progress tracking helped me stay motivated throughout my learning journey.",
//               },
//             ].map((testimonial, index) => (
//               <div
//                 key={index}
//                 className="group bg-gray-300 dark:bg-gray-800 p-8 rounded-2xl transform transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl dark:shadow-black dark:hover:shadow-black"
//               >
//                 <div className="flex items-center mb-6">
//                   <img
//                     src={testimonial.image}
//                     alt={testimonial.name}
//                     className="w-16 h-16 rounded-full mr-4 transform transition-all duration-300 group-hover:scale-110"
//                   />
//                   <div>
//                     <h4 className="text-xl font-semibold text-black dark:text-yellow-300 group-hover:text-gray-600 dark:group-hover:text-yellow-100 transition-colors duration-300">
//                       {testimonial.name}
//                     </h4>
//                     <p className="text-gray-700 dark:text-gray-300 group-hover:text-gray-500 dark:group-hover:text-gray-100 transition-colors duration-300">
//                       {testimonial.role}
//                     </p>
//                   </div>
//                 </div>
//                 <p className="text-gray-600 dark:text-yellow-50 italic group-hover:text-gray-800 dark:group-hover:text-yellow-100 transition-colors duration-300">
//                   "{testimonial.quote}"
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* FAQ Section */}
//       <div className="py-20 bg-white dark:bg-gray-900">
//         <div className="container mx-auto px-4">
//           <h2 className="text-3xl md:text-4xl font-bold text-center text-black dark:text-yellow-200 mb-16 transform transition-all duration-500 hover:scale-105">
//             Frequently Asked Questions
//           </h2>
//           <div className="max-w-3xl mx-auto space-y-6">
//             {[
//               {
//                 question: "What programming languages do you offer?",
//                 answer:
//                   "We offer courses in Python, JavaScript, Java, C++, C#, and many more. Our curriculum is constantly expanding to include new languages and technologies.",
//               },
//               {
//                 question: "Is DoodleDuck suitable for complete beginners?",
//                 answer:
//                   "Absolutely! Our platform is designed to accommodate learners of all levels, from complete beginners to advanced developers.",
//               },
//               {
//                 question: "How does the AI-powered learning assistance work?",
//                 answer:
//                   "Our AI system analyzes your code in real-time, providing personalized suggestions, identifying potential errors, and offering optimization tips.",
//               },
//               {
//                 question: "Can I access the platform on mobile devices?",
//                 answer:
//                   "Yes, DoodleDuck is fully responsive and can be accessed on any device with a web browser.",
//               },
//             ].map((faq, index) => (
//               <div
//                 key={index}
//                 className="group bg-yellow-50 dark:bg-gray-800 rounded-2xl p-8 transform transition-all duration-300 hover:scale-102 shadow-lg dark:shadow-black hover:shadow-xl dark:hover:shadow-black"
//               >
//                 <h3 className="text-xl font-semibold text-yellow-800 dark:text-yellow-300 mb-4 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors duration-300">
//                   {faq.question}
//                 </h3>
//                 <p className="text-gray-800 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-200  transition-colors duration-300">
//                   {faq.answer}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Footer */}
//       <footer className="bg-yellow-50 dark:bg-[#18181b] py-16">
//         <div className="container mx-auto px-4">
//           <div className="grid md:grid-cols-4 gap-8">
//             <div className="transform transition-all duration-300 hover:translate-x-2">
//               <h3 className="text-xl font-bold text-yellow-600 dark:text-yellow-200 mb-4">
//                 DoodleDuck
//               </h3>
//               <p className="text-gray-800 dark:text-gray-400">
//                 Empowering developers through interactive learning and
//                 AI-powered guidance.
//               </p>
//             </div>
//             {[
//               {
//                 title: "Quick Links",
//                 links: [
//                   { name: "Courses", path: "/courses" },
//                   { name: "Pricing", path: "/pricing" },
//                   { name: "About Us", path: "/about" },
//                   { name: "Contact", path: "/contact" },
//                 ],
//               },
//               {
//                 title: "Resources",
//                 links: [
//                   { name: "Blog", path: "/blog" },
//                   { name: "Documentation", path: "/documentation" },
//                   { name: "Tutorials", path: "/tutorials" },
//                   { name: "FAQ", path: "/faq" },
//                 ],
//               },
//               {
//                 title: "Connect",
//                 links: [
//                   {
//                     name: "GitHub",
//                     path: "https://github.com/N4M154/Design_Project-I-SWE-4506",
//                   },
//                   { name: "Twitter", path: "#" },
//                   { name: "LinkedIn", path: "#" },
//                   { name: "Discord", path: "#" },
//                 ],
//               },
//             ].map((section, index) => (
//               <div
//                 key={index}
//                 className="transform transition-all duration-300 hover:translate-x-2"
//               >
//                 <h4 className="font-semibold text-yellow-600 dark:text-yellow-200 mb-4">
//                   {section.title}
//                 </h4>
//                 <ul className="space-y-2">
//                   {section.links.map((link, linkIndex) => (
//                     <li key={linkIndex}>
//                       <Link
//                         to={link.path}
//                         className="text-gray-800 dark:text-gray-400 hover:text-yellow-700 dark:hover:text-yellow-100 transition-colors duration-300"
//                       >
//                         {link.name}
//                       </Link>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>
//           {/* <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-800 dark:text-gray-400">
//             <p>© 2024 DoodleDuck. All rights reserved.</p>
//           </div> */}
//         </div>
//       </footer>
//       <Footer/>
//     </div>
//   );
// }

// export default Landing;

import {
  Award,
  Book,
  Brain,
  FileText,
  Terminal,
  Timer,
  Users,
  Video,
} from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import ThemeToggle from "../components/ThemeToggle";

export function Landing() {
  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Header */}
      <header className="fixed w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg py-4 z-50 transition-all duration-300 border-b border-yellow-100/50 dark:border-yellow-900/50">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-yellow-500 dark:text-yellow-300 hover:text-yellow-600 dark:hover:text-yellow-200 transition-colors duration-300">
            &lt;/CodERA&gt;
          </h1>

          <div className="flex items-center space-x-6">
            <Link to="/sign-in">
              <button className="bg-yellow-400/90 hover:bg-yellow-500 dark:bg-yellow-300/90 dark:hover:bg-yellow-200 text-gray-900 px-6 py-2 rounded-full text-base font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-yellow-200/20 hover:-translate-y-0.5">
                Get Started
              </button>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="min-h-screen flex items-center pt-24">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-left space-y-8">
                <div className="inline-block">
                  <span className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 text-sm font-medium px-4 py-1 rounded-full">
                    Launch Your Coding Journey
                  </span>
                </div>
                <h1 className="text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 dark:from-yellow-200 dark:via-yellow-300 dark:to-yellow-400 text-transparent bg-clip-text">
                    Master Code
                  </span>
                  <br />
                  <span className="text-gray-700 dark:text-gray-200">
                    Build Future
                  </span>
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-xl">
                  Experience the next generation of coding education with
                  AI-powered guidance, interactive environments, and a thriving
                  community of developers.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/sign-up">
                    <button className="group bg-yellow-400 hover:bg-yellow-500 dark:bg-yellow-300 dark:hover:bg-yellow-200 text-gray-900 px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 hover:shadow-xl hover:shadow-yellow-200/20 hover:-translate-y-1 flex items-center gap-2">
                      Start Your Journey
                      <span className="transform transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </button>
                  </Link>
                  <Link to="/courses">
                    <button className="group bg-transparent border-2 border-yellow-400 dark:border-yellow-300 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 text-yellow-600 dark:text-yellow-300 px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 flex items-center gap-2">
                      View Courses
                      <span className="transform transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </button>
                  </Link>
                </div>
                <div className="flex items-center gap-8 pt-4">
                  <div>
                    <div className="flex -space-x-3">
                      {[
                        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
                        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100",
                        "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=100",
                        "https://images.unsplash.com/photo-1548946526-f69e2424cf45?w=100",
                      ].map((src, idx) => (
                        <img
                          key={idx}
                          src={src}
                          alt="User"
                          className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-800"
                        />
                      ))}
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      ++
                    </span>{" "}
                    users
                    <br />
                    joined last month
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-yellow-400 to-yellow-600 dark:from-yellow-300 dark:to-yellow-500 rounded-lg blur-xl opacity-20 animate-pulse"></div>
                <div className="relative">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl">
                        <img
                          src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800"
                          alt="Modern Workspace"
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="rounded-2xl overflow-hidden aspect-square shadow-2xl">
                        <img
                          src="https://images.unsplash.com/photo-1552308995-2baac1ad5490?w=800"
                          alt="Collaborative Coding"
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </div>
                    <div className="space-y-4 pt-8">
                      <div className="rounded-2xl overflow-hidden aspect-square shadow-2xl">
                        <img
                          src="https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=800"
                          alt="Remote Work"
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl">
                        <img
                          src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800"
                          alt="Modern Setup"
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-yellow-50/30 dark:bg-gray-800/30">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {[
              { number: "24/7", label: "Availability" },
              { number: "150+", label: "Video Tutorials" },
              { number: "200+", label: "Active Users" },
              { number: "98%", label: "Success Rate" },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-xl bg-white dark:bg-gray-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border border-yellow-100/50 dark:border-yellow-900/50 group"
              >
                <div className="text-3xl font-bold text-yellow-500 dark:text-yellow-300 group-hover:scale-105 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 dark:from-yellow-300 dark:to-yellow-400 text-transparent bg-clip-text">
              Everything You Need
            </span>
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: <Terminal className="w-8 h-8" />,
                title: "Interactive Code Editor",
                description:
                  "Write, compile, and test code directly in your browser.",
              },
              {
                icon: <Brain className="w-8 h-8" />,
                title: "AI-Powered Learning",
                description: "Get personalized suggestions as you code.",
              },
              {
                icon: <Book className="w-8 h-8" />,
                title: "Comprehensive Curriculum",
                description: "Structured learning paths for all skill levels.",
              },
              {
                icon: <Timer className="w-8 h-8" />,
                title: "Progress Tracking",
                description: "Monitor your learning journey with analytics.",
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Community Support",
                description: "Connect with fellow learners and mentors.",
              },
              {
                icon: <Award className="w-8 h-8" />,
                title: "Certification",
                description: "Earn certificates upon course completion.",
              },
              {
                icon: <Video className="w-8 h-8" />,
                title: "Mock Interview",
                description: "Video calling system for real-time practice.",
              },

              {
                icon: <FileText className="w-8 h-8" />,
                title: "Content",
                description: "Access articles and videos for learning.",
              },

              {
                icon: <Brain className="w-8 h-8" />,
                title: "Career Guideline",
                description: "AI-driven career planning and guidance.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group bg-yellow-50/50 dark:bg-gray-800/50 p-6 rounded-xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-yellow-100/50 dark:border-yellow-900/50"
              >
                <div className="mb-4 text-yellow-500 dark:text-yellow-300 transition-all duration-300 group-hover:scale-110">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-yellow-300 mb-2">
                  {feature.title}
                </h3>
                <p className="text-base text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-16 bg-yellow-50/30 dark:bg-gray-800/30">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 dark:from-yellow-300 dark:to-yellow-400 text-transparent bg-clip-text">
              What Our Users Say
            </span>
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                name: "Sarah Ahmed",
                role: "Software Developer",
                image:
                  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
                quote:
                  "CodERA helped me transition from a beginner to a confident developer.",
              },
              {
                name: "Mishal Rahman",
                role: "Computer Science Student",
                image:
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
                quote:
                  "The interactive coding environment made learning programming enjoyable.",
              },
              {
                name: "Saifur Islam",
                role: "Web Developer",
                image:
                  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
                quote:
                  "The structured curriculum helped me stay motivated throughout my journey.",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="group bg-white dark:bg-gray-800 p-6 rounded-xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-yellow-100/50 dark:border-yellow-900/50"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4 transition-transform duration-300 group-hover:scale-110"
                  />
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-yellow-300">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <p className="text-base text-gray-600 dark:text-gray-300 italic">
                  "{testimonial.quote}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 dark:from-yellow-300 dark:to-yellow-400 text-transparent bg-clip-text">
              Common Questions
            </span>
          </h2>
          <div className="max-w-4xl mx-auto space-y-4">
            {[
              {
                question: "What programming languages do you offer?",
                answer:
                  "We offer courses in Python, JavaScript, Java, C++, and more.",
              },
              {
                question: "Is CodERA suitable for beginners?",
                answer:
                  "Absolutely! Our platform accommodates learners of all levels.",
              },
              {
                question: "How does the AI learning assistance work?",
                answer:
                  "Our AI analyzes your code in real-time, providing personalized suggestions.",
              },
              {
                question: "Can I access the platform on mobile devices?",
                answer: "Yes, It is fully responsive and works on any device.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="group bg-yellow-50/50 dark:bg-gray-800/50 rounded-xl p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-yellow-100/50 dark:border-yellow-900/50"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-yellow-300 mb-2">
                  {faq.question}
                </h3>
                <p className="text-base text-gray-600 dark:text-gray-300">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Landing;
