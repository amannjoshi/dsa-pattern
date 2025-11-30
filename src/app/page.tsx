"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Code2, Terminal } from "lucide-react";
import { motion } from "framer-motion";

import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-sm border-b border-border/40">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-semibold text-xl tracking-tight">
            <Code2 className="w-6 h-6 text-primary" />
            <span>W Code</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <Link href="/explore" className="hover:text-foreground transition-colors">Explore</Link>
            <Link href="#features" className="hover:text-foreground transition-colors">Features</Link>
            <Link href="#pricing" className="hover:text-foreground transition-colors">Pricing</Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Sign In
            </Link>
            <Link 
              href="/login" 
              className="text-sm font-medium bg-foreground text-background px-4 py-2 rounded-full hover:opacity-90 transition-opacity"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-5xl md:text-7xl font-bold tracking-tight text-foreground"
              >
                Find Your Calm in <br />
                <span className="italic font-serif text-muted-foreground">the Complexity</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
              >
                Our platform handles the intricate data and workflows so you can stop firefighting and start focusing on what matters: mastering the patterns.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
              >
                <Link href="/explore" className="px-8 py-3 bg-foreground text-background rounded-lg font-medium hover:opacity-90 transition-all flex items-center gap-2">
                  Explore Problems
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/login" className="px-8 py-3 border border-border rounded-lg font-medium hover:bg-secondary/50 transition-all flex items-center gap-2">
                  Sign in with Google
                </Link>
              </motion.div>
            </div>

            {/* Visual Placeholder - FAANG Focus with Glorious Light Effect */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
              className="mt-20 relative max-w-5xl mx-auto group"
            >
              {/* The "Glorious Light" Glow Effect */}
              <div className="absolute -inset-1 bg-linear-to-r from-primary/20 via-blue-500/20 to-primary/20 rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
              <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/30 blur-[120px] rounded-full pointer-events-none opacity-60 mix-blend-screen" />

              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black/40 aspect-video backdrop-blur-sm flex items-center justify-center">
                <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent z-10" />
                
                {/* Abstract Tech Background */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>
                
                {/* FAANG Text Content */}
                <div className="relative z-20 text-center space-y-12 p-8 w-full overflow-hidden">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="space-y-2"
                  >
                    <h3 className="text-2xl md:text-3xl font-light text-muted-foreground tracking-wide">Target the Top 1%</h3>
                    <p className="text-sm text-muted-foreground/60 uppercase tracking-[0.2em]">Master the patterns used at</p>
                  </motion.div>

                  {/* Sliding Logos Marquee */}
                  <div className="relative w-full max-w-5xl mx-auto overflow-hidden py-6">
                     <div className="absolute inset-y-0 left-0 w-20 bg-linear-to-r from-background to-transparent z-10"></div>
                     <div className="absolute inset-y-0 right-0 w-20 bg-linear-to-l from-background to-transparent z-10"></div>
                     
                     <motion.div 
                       className="flex gap-16 items-center whitespace-nowrap"
                       animate={{ x: ["0%", "-50%"] }}
                       transition={{ duration: 30, ease: "linear", repeat: Infinity }}
                     >
                       {[
                         { name: "Meta", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" },
                         { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
                         { name: "Apple", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
                         { name: "Netflix", logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" },
                         { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
                         { name: "Goldman Sachs", logo: "https://upload.wikimedia.org/wikipedia/commons/6/61/Goldman_Sachs.svg" },
                         { name: "J.P. Morgan", logo: "https://upload.wikimedia.org/wikipedia/commons/e/e0/JPMorgan_Chase.svg" },
                         // Duplicate for seamless loop
                         { name: "Meta", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" },
                         { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
                         { name: "Apple", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
                         { name: "Netflix", logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" },
                         { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
                         { name: "Goldman Sachs", logo: "https://upload.wikimedia.org/wikipedia/commons/6/61/Goldman_Sachs.svg" },
                         { name: "J.P. Morgan", logo: "https://upload.wikimedia.org/wikipedia/commons/e/e0/JPMorgan_Chase.svg" },
                       ].map((company, i) => (
                          <div key={i} className="flex items-center justify-center min-w-[140px] px-6">
                            <img 
                                src={company.logo} 
                                alt={company.name} 
                                className={`h-16 md:h-20 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-300 ${['Apple', 'J.P. Morgan'].includes(company.name) ? 'dark:invert' : ''} ${company.name === 'Netflix' ? 'brightness-0 dark:brightness-100 dark:invert' : ''}`}
                            />
                          </div>
                       ))}
                     </motion.div>
                  </div>
                </div>
                
                {/* Floating UI Elements - DSA Context */}
                <div className="absolute bottom-8 left-8 z-20 flex flex-col gap-3">
                   <motion.div 
                     initial={{ x: -20, opacity: 0 }}
                     animate={{ x: 0, opacity: 1 }}
                     transition={{ delay: 1.6 }}
                     className="bg-black/60 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-xl flex items-center gap-4 hover:bg-black/70 transition-colors"
                   >
                      <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 border border-green-500/30">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs text-zinc-400 font-medium uppercase tracking-wider">Status</div>
                        <div className="text-sm font-semibold text-white">Offer Received</div>
                      </div>
                   </motion.div>
                </div>

                {/* Code Snippet Overlay (Right Side) */}
                <motion.div 
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.8 }}
                  className="absolute top-8 right-8 z-20 hidden md:block"
                >
                  <div className="bg-black/80 backdrop-blur-md p-5 rounded-xl border border-white/10 shadow-2xl font-mono text-xs text-zinc-300">
                    <div className="flex gap-1.5 mb-3">
                      <div className="w-3 h-3 rounded-full bg-red-500/50" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                      <div className="w-3 h-3 rounded-full bg-green-500/50" />
                    </div>
                    <div className="space-y-1 opacity-80">
                      <p><span className="text-purple-400">class</span> <span className="text-yellow-400">Solution</span>:</p>
                      <p className="pl-4"><span className="text-purple-400">def</span> <span className="text-blue-400">twoSum</span>(self, nums, target):</p>
                      <p className="pl-8">seen = {}</p>
                      <p className="pl-8"><span className="text-purple-400">for</span> i, n <span className="text-purple-400">in</span> <span className="text-purple-400">enumerate</span>(nums):</p>
                      <p className="pl-12"><span className="text-purple-400">if</span> target - n <span className="text-purple-400">in</span> seen:</p>
                      <p className="pl-16"><span className="text-purple-400">return</span> [seen[target-n], i]</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Features Section */}
            <section id="features" className="mt-32 md:mt-40">
              {/* Section Header */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="text-center mb-14"
              >
                <p className="text-xs uppercase tracking-[0.25em] text-primary/70 mb-4 font-medium">Why W Code</p>
                <h2 className="text-2xl md:text-3xl font-medium tracking-tight">
                  Everything you need to crack the code<span className="text-muted-foreground"></span>
                </h2>
              </motion.div>

              {/* Feature Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
                {/* Card 1 - Pattern First */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="group relative rounded-xl border border-border/50 bg-secondary/5 p-6 hover:border-border transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground mb-1">Pattern-first approach</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Learn the underlying patterns, not just solutions. Recognize similar problems instantly.
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Card 2 - Company Tagged */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0 }}
                  className="group relative rounded-xl border border-border/50 bg-secondary/5 p-6 hover:border-border transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground mb-1">Company-tagged problems</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Know exactly what Google, Meta, Amazon, and others are asking right now.
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Card 3 - Track Progress */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 }}
                  className="group relative rounded-xl border border-border/50 bg-secondary/5 p-6 hover:border-border transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground mb-1">Track your progress</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Visual progress tracking with streaks, stats, and difficulty breakdown.
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Card 4 - Curated */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                  className="group relative rounded-xl border border-border/50 bg-secondary/5 p-6 hover:border-border transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground mb-1">Curated, not overwhelming</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Quality over quantity. Every problem is handpicked for maximum learning.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Stats Row */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
                className="mt-16 pt-12 border-t border-border/20"
              >
                <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20">
                  <div className="text-center">
                    <p className="text-3xl md:text-4xl font-semibold tracking-tight">130+</p>
                    <p className="text-sm text-muted-foreground mt-1">Curated Problems</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl md:text-4xl font-semibold tracking-tight">15+</p>
                    <p className="text-sm text-muted-foreground mt-1">Core Patterns</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl md:text-4xl font-semibold tracking-tight">50+</p>
                    <p className="text-sm text-muted-foreground mt-1">Companies Covered</p>
                  </div>
                </div>
              </motion.div>
            </section>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
