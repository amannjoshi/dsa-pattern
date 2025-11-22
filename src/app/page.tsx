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
            <span>SereneCode</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <Link href="#" className="hover:text-foreground transition-colors">Product</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Solutions</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Pricing</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Resources</Link>
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
                <button className="px-8 py-3 bg-foreground text-background rounded-lg font-medium hover:opacity-90 transition-all flex items-center gap-2">
                  Book a Free Demo
                </button>
                <button className="px-8 py-3 border border-border rounded-lg font-medium hover:bg-secondary/50 transition-all flex items-center gap-2">
                  Watch Overview
                </button>
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
      
      <Footer />
    </div>
  );
}
