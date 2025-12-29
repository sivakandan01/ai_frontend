import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
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
  CheckCircle2,
  Star,
  UserCircle2
} from 'lucide-react';
import ThemeToggle from '@/components/common/ThemeToggle';
import { cn } from '@/lib/utils';

export default function LandingPage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: MessageSquare,
      title: 'Brilliant Conversations',
      description: 'Ask anything, get expert-level answers instantly. Access GPT-4, Claude, and more - pick the perfect AI for every question.',
      gradient: 'from-emerald-400 to-teal-600',
      features: ['10+ AI models at your fingertips', 'Answers in under 2 seconds', 'Never lose a conversation']
    },
    {
      icon: FileText,
      title: 'Documents That Talk Back',
      description: 'Upload any PDF and ask questions in plain English. Get precise answers with exact page references - like a research assistant who never sleeps.',
      gradient: 'from-blue-400 to-indigo-600',
      features: ['Understands 100+ page documents', 'Pinpoints where answers come from', 'Summarize hours of reading in seconds']
    },
    {
      icon: Image,
      title: 'Imagination, Visualized',
      description: 'Describe what you see in your mind. Watch it appear on screen. Create marketing assets, concept art, and visuals without design skills.',
      gradient: 'from-purple-400 to-pink-600',
      features: ['From idea to image in 30 seconds', 'Multiple art styles and formats', 'Commercial-ready quality']
    },
    {
      icon: Network,
      title: 'Complex Ideas Made Clear',
      description: 'Explain a process in words, get a polished diagram back. Perfect for documentation, presentations, and making sense of complicated systems.',
      gradient: 'from-orange-400 to-red-600',
      features: ['Flowcharts that draw themselves', 'Technical diagrams in plain English', 'Export-ready for any presentation']
    }
  ];

  const stats = [
    { icon: Bot, value: '10+', label: 'AI Models' },
    { icon: Zap, value: '<2s', label: 'Response Time' },
    { icon: Shield, value: '256-bit', label: 'Encryption' },
    { icon: Users, value: '50K+', label: 'Creators' }
  ];

  const testimonials = [
    {
      quote: "I used to spend 3 hours researching for each client proposal. Now I upload their documents, ask my questions, and have everything I need in 15 minutes. This tool paid for itself on day one.",
      name: "Sarah Chen",
      role: "Strategy Consultant",
      rating: 5
    },
    {
      quote: "As a one-person marketing team, I was drowning in content requests. AI Studio lets me brainstorm copy, generate social images, and create process diagrams without hiring three different specialists.",
      name: "Marcus Johnson",
      role: "Marketing Manager",
      rating: 5
    },
    {
      quote: "The diagram feature alone is worth it. I described our microservices architecture in a paragraph and got a presentation-ready diagram back. My engineering team thought I spent hours on it.",
      name: "Priya Patel",
      role: "Senior Developer",
      rating: 5
    }
  ];

  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[rgb(var(--sidebar-bg))] to-[rgb(var(--main-surface))] relative overflow-hidden">
      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 -left-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
          scrolled
            ? "py-3 bg-[rgb(var(--main-surface))]/95 backdrop-blur-xl shadow-lg border-b border-[rgb(var(--border-color))]"
            : "py-6 bg-transparent"
        )}
      >
        <div className="mx-[5%] px-6 py-4 flex items-center justify-between">
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
      <section className="relative px-6 min-h-screen flex items-center justify-center">
        <div className="max-w-7xl mx-auto relative z-10 w-full py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div className="text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 rounded-full mb-8 relative overflow-hidden backdrop-blur-sm">
                  <motion.span
                    className="relative"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="w-4 h-4 text-emerald-500" />
                  </motion.span>
                  <span className="text-sm text-emerald-600 dark:text-emerald-400 font-semibold">
                    Trusted by 50,000+ creators worldwide
                  </span>
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-[rgb(var(--primary-text))] mb-6 leading-[1.1]"
              >
                Turn Ideas Into Reality{' '}
                <span className="block mt-2 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                  10x Faster
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xl text-[rgb(var(--secondary-text))] mb-10 leading-relaxed max-w-xl"
              >
                From brainstorming to final deliverable in minutes. Chat with the smartest AI models, extract insights from documents, generate stunning visuals, and create professional diagrams.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex gap-4 flex-wrap mb-8"
              >
                <motion.button
                  onClick={() => navigate('/register')}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl transition-all shadow-2xl shadow-emerald-500/25 hover:shadow-emerald-500/40 flex items-center gap-2 text-lg font-semibold overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Start Creating - Free
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.button>
                <motion.button
                  onClick={() => navigate('/login')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-[rgb(var(--main-surface))] border-2 border-[rgb(var(--border-color))] text-[rgb(var(--primary-text))] rounded-xl hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 transition-all shadow-lg text-lg font-semibold"
                >
                  See It in Action
                </motion.button>
              </motion.div>

              {/* Trust indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex items-center gap-6 text-sm text-[rgb(var(--secondary-text))] flex-wrap"
              >
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Free to start
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> No credit card
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Cancel anytime
                </span>
              </motion.div>
            </div>

            {/* Right: Visual Elements */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative hidden lg:flex items-center justify-center"
            >
              {/* Animated gradient circle */}
              <div className="relative w-full max-w-lg aspect-square">
                {/* Background gradient orbs */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-full blur-3xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0],
                  }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                />

                {/* Feature icons floating around */}
                <motion.div
                  className="absolute top-[10%] left-[10%]"
                  animate={{
                    y: [0, -20, 0],
                    rotate: [0, 10, 0],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="p-6 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl shadow-2xl">
                    <MessageSquare className="w-10 h-10 text-white" />
                  </div>
                </motion.div>

                <motion.div
                  className="absolute top-[10%] right-[10%]"
                  animate={{
                    y: [0, 20, 0],
                    rotate: [0, -10, 0],
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                >
                  <div className="p-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl shadow-2xl">
                    <FileText className="w-10 h-10 text-white" />
                  </div>
                </motion.div>

                <motion.div
                  className="absolute bottom-[10%] left-[10%]"
                  animate={{
                    y: [0, -15, 0],
                    rotate: [0, 15, 0],
                  }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                  <div className="p-6 bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl shadow-2xl">
                    <Network className="w-10 h-10 text-white" />
                  </div>
                </motion.div>

                <motion.div
                  className="absolute bottom-[10%] right-[10%]"
                  animate={{
                    y: [0, 15, 0],
                    rotate: [0, -15, 0],
                  }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                >
                  <div className="p-6 bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl shadow-2xl">
                    <Image className="w-10 h-10 text-white" />
                  </div>
                </motion.div>

                {/* Center sparkle */}
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 360],
                  }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <div className="p-8 bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-400 rounded-full shadow-2xl">
                    <Sparkles className="w-16 h-16 text-white" />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Stats Section - moved inside hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto mt-20"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ y: -4 }}
                className="p-6 bg-[rgb(var(--main-surface))]/80 backdrop-blur-sm rounded-2xl border border-[rgb(var(--border-color))]/50 hover:border-emerald-500/50 transition-all text-center"
              >
                <stat.icon className="w-8 h-8 text-emerald-500 mb-3 mx-auto" />
                <div className="text-3xl font-bold text-[rgb(var(--primary-text))] mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-[rgb(var(--secondary-text))] font-medium">
                  {stat.label}
                </div>
              </motion.div>
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
                whileHover={{ y: -8 }}
                className="group relative p-8 bg-[rgb(var(--main-surface))] rounded-3xl border border-[rgb(var(--border-color))] hover:border-transparent transition-all duration-500 hover:shadow-2xl overflow-hidden"
              >
                {/* Animated gradient border on hover */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} style={{ padding: '1px' }}>
                  <div className="absolute inset-[1px] rounded-3xl bg-[rgb(var(--main-surface))]" />
                </div>

                {/* Glow effect */}
                <div className={`absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 bg-gradient-to-br ${feature.gradient} blur-xl`} />

                <div className="relative">
                  <motion.div
                    className={`inline-flex p-4 bg-gradient-to-br ${feature.gradient} rounded-2xl mb-6`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <feature.icon className="w-8 h-8 text-white" />
                  </motion.div>

                  <h3 className="text-2xl font-bold text-[rgb(var(--primary-text))] mb-3">
                    {feature.title}
                  </h3>

                  <p className="text-[rgb(var(--secondary-text))] mb-6 leading-relaxed">
                    {feature.description}
                  </p>

                  <ul className="space-y-3">
                    {feature.features.map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0.7, x: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="flex items-center gap-3 text-[rgb(var(--primary-text))] group-hover:translate-x-1 transition-transform"
                      >
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-6 bg-[rgb(var(--sidebar-bg))]/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full mb-6">
              <Star className="w-4 h-4 text-emerald-500" />
              <span className="text-sm text-emerald-500 font-medium">
                Loved by Teams Everywhere
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[rgb(var(--primary-text))] mb-4">
              See What Others Are Creating
            </h2>
            <p className="text-lg text-[rgb(var(--secondary-text))] max-w-2xl mx-auto">
              Join thousands of professionals who've made AI Studio their secret weapon
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="p-8 rounded-2xl bg-[rgb(var(--main-surface))] border border-[rgb(var(--border-color))] hover:border-emerald-500/50 transition-all hover:shadow-xl"
              >
                {/* Rating stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-lg mb-6 leading-relaxed text-[rgb(var(--primary-text))] italic">
                  "{testimonial.quote}"
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center">
                    <UserCircle2 className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-[rgb(var(--primary-text))]">{testimonial.name}</p>
                    <p className="text-sm text-[rgb(var(--secondary-text))]">
                      {testimonial.role}
                    </p>
                  </div>
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
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full mb-6">
              <Lightbulb className="w-4 h-4 text-emerald-500" />
              <span className="text-sm text-emerald-500 font-medium">
                Ridiculously Simple
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[rgb(var(--primary-text))] mb-4">
              From Zero to Creating in 3 Steps
            </h2>
            <p className="text-lg text-[rgb(var(--secondary-text))] max-w-2xl mx-auto">
              No tutorials. No learning curve. No patience required.
            </p>
          </motion.div>

          <div className="relative">
            {/* Connection line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500/0 via-emerald-500 to-emerald-500/0 hidden lg:block -translate-y-1/2" />

            <div className="grid lg:grid-cols-3 gap-12 lg:gap-8">
              {[
                { step: '01', title: 'Sign Up (30 Seconds)', description: 'Just email and password. No credit card, no approval wait.', icon: UserCircle2 },
                { step: '02', title: 'Pick Your Starting Point', description: 'Chat, documents, images, or diagrams - every tool is one click away.', icon: Brain },
                { step: '03', title: 'Create Something Amazing', description: 'Watch AI turn your ideas into polished output. Save, share, or keep building.', icon: Sparkles }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: index * 0.2 }}
                  className="relative text-center"
                >
                  {/* Step indicator */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="relative mx-auto mb-8 w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/30"
                  >
                    <span className="text-2xl font-bold text-white">{item.step}</span>
                    {/* Pulse ring */}
                    <div className="absolute inset-0 rounded-full border-2 border-emerald-500 animate-ping opacity-25" />
                  </motion.div>

                  <h3 className="text-2xl font-bold text-[rgb(var(--primary-text))] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-[rgb(var(--secondary-text))] max-w-xs mx-auto mb-6">
                    {item.description}
                  </p>

                  {/* Icon illustration */}
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    className="mt-8 p-6 rounded-2xl bg-[rgb(var(--main-surface))] border border-[rgb(var(--border-color))] inline-block"
                  >
                    <item.icon className="w-12 h-12 text-emerald-500" />
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto relative rounded-[2.5rem] overflow-hidden"
        >
          {/* Animated gradient background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600" />

            {/* Animated mesh */}
            <motion.div
              className="absolute inset-0 opacity-30"
              animate={{
                background: [
                  'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.3) 0%, transparent 40%)',
                  'radial-gradient(circle at 80% 70%, rgba(255,255,255,0.3) 0%, transparent 40%)',
                  'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.3) 0%, transparent 40%)',
                ]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />

            {/* Grid pattern overlay */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
              }}
            />
          </div>

          {/* Content */}
          <div className="relative z-10 px-8 py-20 md:px-16 md:py-24 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            >
              Your Best Work
              <br />
              Starts Here
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              Every minute you spend fighting clunky tools is a minute you're not spending on work that matters. Join 50,000+ creators who've already made the switch.
            </motion.p>

            {/* CTA buttons with enhanced styling */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex gap-4 justify-center flex-wrap mb-8"
            >
              <motion.button
                onClick={() => navigate('/register')}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group px-8 py-4 bg-white text-emerald-600 rounded-xl font-semibold text-lg shadow-xl shadow-black/20 flex items-center gap-2"
              >
                Create Your Free Account
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.span>
              </motion.button>

              <motion.button
                onClick={() => navigate('/login')}
                whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.1)' }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-semibold text-lg"
              >
                Already have an account? Sign in
              </motion.button>
            </motion.div>

            {/* Trust indicators */}
            <div className="mt-12 flex items-center justify-center gap-8 text-white/80 text-sm flex-wrap">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> No credit card required
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> 14-day free trial
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Cancel anytime
              </span>
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
              © 2025 AI Studio. All rights reserved.
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
