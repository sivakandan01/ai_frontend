import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  MessageSquare,
  FileText,
  Image,
  Network,
  Sparkles,
  Zap,
  Shield,
  Users,
  ArrowRight,
  Bot,
  Brain,
  Lightbulb,
  CheckCircle2
} from 'lucide-react';
import ThemeToggle from '@/components/common/ThemeToggle';

export default function LandingPage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: MessageSquare,
      title: 'AI Chat',
      description: 'Intelligent conversations with multiple AI providers',
      gradient: 'from-emerald-400 to-teal-600',
      features: ['Multiple AI Models', 'Real-time Responses', 'Session History']
    },
    {
      icon: FileText,
      title: 'Smart Document Analysis',
      description: 'Upload PDFs and chat with your documents using RAG',
      gradient: 'from-blue-400 to-indigo-600',
      features: ['PDF Processing', 'Context-Aware Answers', 'Source Citations']
    },
    {
      icon: Image,
      title: 'AI Image Generation',
      description: 'Create stunning visuals from text descriptions',
      gradient: 'from-purple-400 to-pink-600',
      features: ['Text-to-Image', 'Multiple Providers', 'High Quality Output']
    },
    {
      icon: Network,
      title: 'Diagram Creator',
      description: 'Generate professional diagrams and flowcharts instantly',
      gradient: 'from-orange-400 to-red-600',
      features: ['Flowcharts', 'Sequence Diagrams', 'Auto-Generated']
    }
  ];

  const stats = [
    { icon: Bot, value: '10+', label: 'AI Models' },
    { icon: Zap, value: 'Real-time', label: 'Responses' },
    { icon: Shield, value: 'Secure', label: 'Authentication' },
    { icon: Users, value: 'Multi', label: 'Sessions' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[rgb(var(--sidebar-bg))] to-[rgb(var(--main-surface))]">
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 right-0 z-50 bg-[rgb(var(--main-surface))]/95 backdrop-blur-xl border-b border-[rgb(var(--border-color))]"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-8 h-8 text-[rgb(var(--button-primary))]" />
            <h1 className="text-2xl font-bold text-[rgb(var(--primary-text))]">
              AI Studio
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button
              onClick={() => navigate('/login')}
              className="px-4 py-2 text-[rgb(var(--secondary-text))] hover:text-[rgb(var(--primary-text))] transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate('/register')}
              className="px-6 py-2 bg-[rgb(var(--button-primary))] text-white rounded-lg hover:bg-[rgb(var(--button-hover))] transition-all shadow-lg hover:shadow-xl"
            >
              Get Started
            </button>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[rgb(var(--button-primary))]/10 border border-[rgb(var(--button-primary))]/30 rounded-full mb-8">
              <Sparkles className="w-4 h-4 text-[rgb(var(--button-primary))]" />
              <span className="text-sm text-[rgb(var(--button-primary))] font-medium">
                All-in-One AI Platform
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-[rgb(var(--primary-text))] mb-6 leading-tight"
          >
            Your AI-Powered
            <br />
            <span className="bg-gradient-to-r from-[rgb(var(--button-primary))] to-emerald-600 bg-clip-text text-transparent">
              Creative Studio
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-xl text-[rgb(var(--secondary-text))] mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Chat with AI, analyze documents, generate images, and create diagrams - all in one powerful platform. Choose from multiple AI providers for maximum flexibility.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex gap-4 justify-center flex-wrap mb-16"
          >
            <button
              onClick={() => navigate('/register')}
              className="group px-8 py-4 bg-[rgb(var(--button-primary))] text-white rounded-xl hover:bg-[rgb(var(--button-hover))] transition-all shadow-lg hover:shadow-xl flex items-center gap-2 text-lg font-semibold"
            >
              Start Free Trial
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => navigate('/login')}
              className="px-8 py-4 bg-[rgb(var(--main-surface))] border-2 border-[rgb(var(--border-color))] text-[rgb(var(--primary-text))] rounded-xl hover:border-[rgb(var(--button-primary))] transition-all shadow-lg text-lg font-semibold"
            >
              View Demo
            </button>
          </motion.div>

          {/* Stats - Moved below CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => (
              <div
                key={index}
                className="p-6 bg-[rgb(var(--main-surface))]/80 backdrop-blur-sm rounded-xl border border-[rgb(var(--border-color))]/50 hover:border-[rgb(var(--button-primary))]/50 transition-all"
              >
                <stat.icon className="w-7 h-7 text-[rgb(var(--button-primary))] mb-2 mx-auto" />
                <div className="text-2xl font-bold text-[rgb(var(--primary-text))] mb-1">
                  {stat.value}
                </div>
                <div className="text-xs text-[rgb(var(--secondary-text))] uppercase tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-[rgb(var(--main-surface))]/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[rgb(var(--button-primary))]/10 border border-[rgb(var(--button-primary))]/30 rounded-full mb-6">
              <Brain className="w-4 h-4 text-[rgb(var(--button-primary))]" />
              <span className="text-sm text-[rgb(var(--button-primary))] font-medium">
                Powerful Features
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[rgb(var(--primary-text))] mb-4">
              Everything You Need
            </h2>
            <p className="text-lg text-[rgb(var(--secondary-text))] max-w-2xl mx-auto">
              Four powerful AI tools integrated into one seamless experience
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group relative p-8 bg-[rgb(var(--main-surface))] rounded-2xl border border-[rgb(var(--border-color))] hover:border-[rgb(var(--button-primary))]/70 transition-all duration-300 hover:shadow-xl overflow-hidden"
              >
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity`} />

                <div className="relative">
                  <div className={`inline-flex p-4 bg-gradient-to-br ${feature.gradient} rounded-xl mb-6`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-[rgb(var(--primary-text))] mb-3">
                    {feature.title}
                  </h3>

                  <p className="text-[rgb(var(--secondary-text))] mb-6">
                    {feature.description}
                  </p>

                  <ul className="space-y-3">
                    {feature.features.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-[rgb(var(--primary-text))]">
                        <CheckCircle2 className="w-5 h-5 text-[rgb(var(--button-primary))]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[rgb(var(--button-primary))]/10 border border-[rgb(var(--button-primary))]/30 rounded-full mb-6">
              <Lightbulb className="w-4 h-4 text-[rgb(var(--button-primary))]" />
              <span className="text-sm text-[rgb(var(--button-primary))] font-medium">
                Simple Process
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[rgb(var(--primary-text))] mb-4">
              Get Started in Minutes
            </h2>
            <p className="text-lg text-[rgb(var(--secondary-text))] max-w-2xl mx-auto">
              Three simple steps to unlock the power of AI
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Create Account', description: 'Sign up in seconds with your email' },
              { step: '02', title: 'Choose Your Tool', description: 'Select from Chat, Documents, Images, or Diagrams' },
              { step: '03', title: 'Start Creating', description: 'Experience the power of AI instantly' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="relative text-center"
              >
                <div className="text-7xl font-bold text-[rgb(var(--button-primary))]/10 mb-4">
                  {item.step}
                </div>
                <h3 className="text-2xl font-bold text-[rgb(var(--primary-text))] mb-3">
                  {item.title}
                </h3>
                <p className="text-[rgb(var(--secondary-text))]">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="max-w-5xl mx-auto bg-gradient-to-r from-[rgb(var(--button-primary))] to-emerald-600 rounded-3xl p-12 md:p-16 text-center relative overflow-hidden shadow-2xl"
        >
          {/* Subtle background elements */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl" />
          </div>

          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Workflow?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of users leveraging AI to boost productivity and creativity
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <button
                onClick={() => navigate('/register')}
                className="px-8 py-4 bg-white text-[rgb(var(--button-primary))] rounded-xl hover:bg-gray-50 transition-all shadow-xl text-lg font-semibold flex items-center gap-2"
              >
                Start For Free
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => navigate('/login')}
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl hover:bg-white/10 transition-all text-lg font-semibold"
              >
                Sign In
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-[rgb(var(--border-color))]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-[rgb(var(--button-primary))]" />
              <span className="text-lg font-bold text-[rgb(var(--primary-text))]">
                AI Studio
              </span>
            </div>
            <p className="text-[rgb(var(--secondary-text))] text-sm">
              © 2024 AI Studio. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-[rgb(var(--secondary-text))]">
              <a href="#" className="hover:text-[rgb(var(--button-primary))] transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-[rgb(var(--button-primary))] transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-[rgb(var(--button-primary))] transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
