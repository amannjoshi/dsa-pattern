'use client'

import { useState } from 'react'
import { Building2, Search, X } from 'lucide-react'

interface CompanyFilterProps {
  companies: { name: string; count: number }[]
  selectedCompanies: string[]
  onCompanyToggle: (company: string) => void
  onClearAll: () => void
}

export function CompanyFilter({ 
  companies, 
  selectedCompanies, 
  onCompanyToggle, 
  onClearAll 
}: CompanyFilterProps) {
  const [searchQuery, setSearchQuery] = useState('')
  
  const filteredCompanies = companies.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="bg-secondary/5 border border-border/40 rounded-xl p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4 text-primary" />
          <h3 className="font-semibold text-sm">Filter Companies</h3>
        </div>
        {selectedCompanies.length > 0 && (
          <button 
            onClick={onClearAll}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search a company..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-background/50 border border-border/40 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {selectedCompanies.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedCompanies.map(company => (
            <button
              key={company}
              onClick={() => onCompanyToggle(company)}
              className="flex items-center gap-1.5 px-2.5 py-1 bg-primary/10 text-primary text-xs rounded-full border border-primary/20 hover:bg-primary/20 transition-colors"
            >
              {company}
              <X className="w-3 h-3" />
            </button>
          ))}
        </div>
      )}

      <div className="space-y-1 max-h-80 overflow-y-auto scrollbar-thin">
        {filteredCompanies.map(({ name, count }) => (
          <button
            key={name}
            onClick={() => onCompanyToggle(name)}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
              selectedCompanies.includes(name)
                ? 'bg-primary/10 text-primary border border-primary/20'
                : 'hover:bg-secondary/30 text-muted-foreground hover:text-foreground'
            }`}
          >
            <span className="truncate">{name}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              selectedCompanies.includes(name)
                ? 'bg-primary/20'
                : 'bg-secondary/50'
            }`}>
              {count}
            </span>
          </button>
        ))}
        {filteredCompanies.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">
            No companies found
          </p>
        )}
      </div>
    </div>
  )
}
