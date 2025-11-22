"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Code2, Terminal } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-sm border-b border-border/40">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-semibold text-xl tracking-tight">
            <Code2 className="w-6 h-6 text-primary" />
            <span>SereneCode</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <Link href="#" className="hover:text-foreground transition-colors">Product</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Solutions</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Pricing</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Resources</Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Sign In
            </Link>
            <Link 
              href="#" 
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
                <button className="px-8 py-3 bg-foreground text-background rounded-lg font-medium hover:opacity-90 transition-all flex items-center gap-2">
                  Book a Free Demo
                </button>
                <button className="px-8 py-3 border border-border rounded-lg font-medium hover:bg-secondary/50 transition-all flex items-center gap-2">
                  Watch Overview
                </button>
              </motion.div>
            </div>

            {/* Visual Placeholder - Tree and Bench with Glorious Light Effect */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
              className="mt-20 relative max-w-5xl mx-auto group"
            >
              {/* The "Glorious Light" Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-blue-500/20 to-primary/20 rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
              <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/30 blur-[120px] rounded-full pointer-events-none opacity-60 mix-blend-screen" />

              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black/40 aspect-video backdrop-blur-sm">
                <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent z-10" />
                
                {/* Serene Image with Light Effect */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-full absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=2500&auto=format&fit=crop')] bg-cover bg-center opacity-80 transition-transform duration-[2s] group-hover:scale-105"></div>
                  {/* Light Shafts Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/20 mix-blend-overlay pointer-events-none" />
                </div>
                
                {/* Floating UI Elements - DSA Context */}
                <div className="absolute bottom-8 left-8 z-20 flex flex-col gap-3">
                   <motion.div 
                     initial={{ x: -20, opacity: 0 }}
                     animate={{ x: 0, opacity: 1 }}
                     transition={{ delay: 1.2 }}
                     className="bg-black/60 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-xl flex items-center gap-4 hover:bg-black/70 transition-colors"
                   >
                      <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 border border-green-500/30">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs text-zinc-400 font-medium uppercase tracking-wider">Status</div>
                        <div className="text-sm font-semibold text-white">All Test Cases Passed</div>
                      </div>
                   </motion.div>

                   <motion.div 
                     initial={{ x: -20, opacity: 0 }}
                     animate={{ x: 0, opacity: 1 }}
                     transition={{ delay: 1.4 }}
                     className="bg-black/60 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-xl flex items-center gap-4 hover:bg-black/70 transition-colors"
                   >
                      <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 border border-blue-500/30">
                        <Terminal className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs text-zinc-400 font-medium uppercase tracking-wider">Current Pattern</div>
                        <div className="text-sm font-semibold text-white">Sliding Window</div>
                      </div>
                   </motion.div>
                </div>

                {/* Code Snippet Overlay (Right Side) */}
                <motion.div 
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.6 }}
                  className="absolute top-8 right-8 z-20 hidden md:block"
                >
                  <div className="bg-black/80 backdrop-blur-md p-5 rounded-xl border border-white/10 shadow-2xl font-mono text-xs text-zinc-300">
                    <div className="flex gap-1.5 mb-3">
                      <div className="w-3 h-3 rounded-full bg-red-500/50" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                      <div className="w-3 h-3 rounded-full bg-green-500/50" />
                    </div>
                    <div className="space-y-1 opacity-80">
                      <p><span className="text-purple-400">def</span> <span className="text-blue-400">max_area</span>(height):</p>
                      <p className="pl-4">left, right = <span className="text-orange-400">0</span>, <span className="text-purple-400">len</span>(height) - <span className="text-orange-400">1</span></p>
                      <p className="pl-4">res = <span className="text-orange-400">0</span></p>
                      <p className="pl-4"><span className="text-purple-400">while</span> left &lt; right:</p>
                      <p className="pl-8 text-zinc-500"># Calculate area...</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Trusted By */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="mt-20 pt-10 border-t border-border/40"
            >
              <p className="text-center text-sm text-muted-foreground mb-8">Trusted By Teams At</p>
              <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale">
                {/* Mock Logos */}
                <span className="text-xl font-bold">loom</span>
                <span className="text-xl font-bold">segment</span>
                <span className="text-xl font-bold">Notion</span>
                <span className="text-xl font-bold">Discord</span>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
