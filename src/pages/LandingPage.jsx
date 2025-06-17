import React from "react";
import { FaLeaf } from "react-icons/fa";
import { HiBellAlert } from "react-icons/hi2";
import { RiMessage3Fill } from "react-icons/ri";
import PostCard from "../components/PostCard";
import { Link, useNavigate } from "react-router-dom";
import HeroImage from '../assets/HeroImage2.png'

const LandingPage = ({ posts,authStates }) => {
  const navigate = useNavigate()
  const FeatureCard = ({ icon, title, desc }) => (
    <div className="bg-[#1E1E2F]/80 py-6 rounded-md hover:scale-105 transition-all duration-300 ease-in-out hover:bg-[#1E1E2F]  space-y-2 flex flex-col items-center">
      <div className="text-3xl text-teal-500">{icon}</div>
      <h3 className="font-bold text-lg">{title}</h3>
      <p className="text-sm text-gray-400">{desc}</p>
    </div>
  );

  const StepCard = ({ step, title, desc }) => (
    <div className="bg-[#1E1E2F]/80 py-6 rounded-md hover:scale-105 transition-all duration-300 ease-in-out hover:bg-[#1E1E2F] space-y-2 flex flex-col items-center">
      <div className="text-3xl font-bold text-teal-500">{step}</div>
      <h3 className="font-bold text-lg">{title}</h3>
      <p className="text-sm text-gray-400">{desc}</p>
    </div>
  );
  return (

    <div className="text-white min-h-screen sm:p-8 px-4 space-y-16">
      <section className="text-white py-12 w-full sm:px-10">
        <div className="max-w-7xl mx-auto flex items-center md:flex-row flex-col-reverse">
          <div className="md:w-1/2 mt-5">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
              Discover and share <br className="hidden sm:block" />
              insightful <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-teal-500">articles </span>
            </h1>
            <p className="text-gray-400 mb-8 text-base sm:text-lg">
              Explore a variety of topics and gain new perspectives
              <br className="hidden sm:block" />
              from our community of writers.
            </p>
            <button onClick={() => authStates? navigate('/blogs'):navigate('/login')} className="bg-teal-500 hover:bg-teal-700 text-gray-100 font-semibold py-3 px-6 rounded-md transition duration-200">
              {authStates ? "Explore More":"Get Started"}
            </button>
          </div>
          <div className="md:w-1/2 rounded-3xl overflow-hidden"><img src={HeroImage} alt="HeroImagge" /></div>
        </div>
      </section>
      <div className="grid sm:grid-cols-3 gap-6 text-center">
        <FeatureCard icon={<FaLeaf />} title="Write Blogs" desc="Share your stories and insights with community" />
        <FeatureCard icon={<RiMessage3Fill />} title="Connect with Rexiers" desc="Engage with a direct audience and build following" />
        <FeatureCard icon={<HiBellAlert />} title="Stay Updated" desc="Receive notifications on latest blog posts" />
      </div>

      <section>
        <h2 className="text-2xl font-bold mb-6">Featured Blogs</h2>
        <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-6 sm:grid-cols-2 justify-center w-full">
          {posts.map((post, index) => post.is_Active === "Active" ? index < 4 && <PostCard key={post.$id} className="hover:scale-105 transition-all duration-300 ease-in-out" status={post.is_Active} post={post} /> : '')}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">How it Works</h2>
        <div className="grid sm:grid-cols-3 gap-6 text-center">
          <StepCard step="1" title="Create an Account" desc="Sign up to start sharing and engaging with blog posts" />
          <StepCard step="2" title="Write and Publish" desc="Craft your blog post and publish it to reach readers" />
          <StepCard step="3" title="Engage with the Community" desc="Comment, like, and share posts to connect with others" />
        </div>
      </section>

      <footer className="border-t border-gray-700 pt-6 flex flex-wrap mb-2 justify-between text-sm text-gray-400">
        <div className="space-x-4 ">
          {["About", "Contact", "Privacy", "Policy"].map((item,idx) => <Link key={idx} to='/' className="hover:text-teal-500">{item}</Link>)}
        </div>
        <div className="space-x-4 ">
          {["Facebook", "Instagram", "Discord", "LinkedIn"].map((item,idx) => <Link key={idx} to='/' className="hover:text-teal-500">{item}</Link>)}
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
