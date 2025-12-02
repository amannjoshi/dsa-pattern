"use client";

import dynamic from "next/dynamic";
import React from "react";

// Lazy load visualizers to avoid bundle bloat
const ContainerVisualizer = dynamic(() => import("./ContainerVisualizer"), {
  loading: () => <div className="h-40 bg-black/20 rounded-xl animate-pulse" />,
  ssr: false
});

const RainWaterVisualizer = dynamic(() => import("./RainWaterVisualizer"), {
  loading: () => <div className="h-44 bg-black/20 rounded-xl animate-pulse" />,
  ssr: false
});

const NQueensVisualizer = dynamic(() => import("./NQueensVisualizer"), {
  loading: () => <div className="h-64 bg-black/20 rounded-xl animate-pulse" />,
  ssr: false
});

// Define a base props type for visualizers (empty since they don't take props)
type VisualizerComponent = React.ComponentType<Record<string, never>>;

// Map problem slugs to their visualizers
export const PROBLEM_VISUALIZERS: Record<string, VisualizerComponent> = {
  "container-with-most-water": ContainerVisualizer as VisualizerComponent,
  "trapping-rain-water": RainWaterVisualizer as VisualizerComponent,
  "n-queens": NQueensVisualizer as VisualizerComponent,
};

// Check if a problem has visualization
export function hasVisualization(slug: string): boolean {
  return slug in PROBLEM_VISUALIZERS;
}

// Get visualizer component for a problem
export function getVisualizer(slug: string): VisualizerComponent | null {
  return PROBLEM_VISUALIZERS[slug] || null;
}

// Wrapper component that renders the appropriate visualizer
export function ProblemVisualizer({ slug }: { slug: string }) {
  const Visualizer = PROBLEM_VISUALIZERS[slug];
  
  if (!Visualizer) return null;
  
  return (
    <div className="mt-8">
      <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">
        Interactive Visualization
      </h3>
      <Visualizer />
    </div>
  );
}
