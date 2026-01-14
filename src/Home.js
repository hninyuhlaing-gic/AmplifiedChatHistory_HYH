import React from "react";
import { MessageCircle, Sparkles, Shield, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate(); 
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl w-full bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-10"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Welcome to <span className="text-indigo-600">AI Chatbot</span>
          </h1>
          <p className="text-gray-600 text-lg">
            Your smart assistant for instant answers and conversations.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Feature
            icon={<Zap className="h-10 w-10 text-indigo-600" />}
            title="Fast Responses"
            text="Get instant replies powered by AI."
          />
          <Feature
            icon={<Sparkles className="h-10 w-10 text-purple-600" />}
            title="Smart Conversations"
            text="Natural, human-like chat experience."
          />
          <Feature
            icon={<Shield className="h-10 w-10 text-pink-600" />}
            title="Secure & Private"
            text="Your conversations stay protected."
          />
        </div>

        {/* CTA */}
        <div className="text-center">
          <button onClick={() => navigate("/chat")}  
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl text-lg flex items-center justify-center gap-2 mx-auto" >
            <MessageCircle className="h-5 w-5" />
            Start Chatting
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 text-center hover:scale-105 transition">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{text}</p>
    </div>
  );
}

export default Home;
