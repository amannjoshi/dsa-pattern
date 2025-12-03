'use client'

import Link from 'next/link'
import { ArrowLeft, Network, CheckCircle2, BookOpen, Binary, Globe2 } from 'lucide-react'

export default function IPAddressingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/dashboard/cn-theory"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to CN Theory
          </Link>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/20">
              <Network className="w-8 h-8 text-blue-500" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">IP Addressing</h1>
              <p className="text-muted-foreground">IPv4, IPv6 & Subnetting</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 mt-4">
            <p className="text-gray-300 text-sm">
              <strong className="text-white">IP addresses</strong> are unique identifiers for devices on a network.
              Understanding IP addressing and subnetting is essential for network design.
            </p>
          </div>
        </div>

        {/* IPv4 Section */}
        <div className="mb-8 p-6 rounded-2xl bg-cyan-500/10 border border-cyan-500/30">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-cyan-500 flex items-center justify-center">
              <Binary className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-cyan-400">IPv4 Addressing</h2>
              <p className="text-sm text-gray-400">32-bit Address Space</p>
            </div>
          </div>

          <div className="prose prose-invert max-w-none mb-4">
            <p className="text-gray-300 text-sm">
              <strong>IPv4</strong> uses 32-bit addresses, providing approximately 4.3 billion unique addresses.
              Written in dotted decimal notation (e.g., 192.168.1.1).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-black/40 border border-white/5 mb-4">
            <pre className="text-xs text-green-400 overflow-x-auto">
              <code>{`// IPv4 Address Format (32 bits = 4 octets)
┌─────────┬─────────┬─────────┬─────────┐
│ Octet 1 │ Octet 2 │ Octet 3 │ Octet 4 │
│ 8 bits  │ 8 bits  │ 8 bits  │ 8 bits  │
└─────────┴─────────┴─────────┴─────────┘
Example: 192.168.1.1
Binary:  11000000.10101000.00000001.00000001

// IPv4 Classes (Classful Addressing)
┌───────┬─────────────┬─────────────────┬──────────────────┬─────────────┐
│ Class │ First Octet │ Range           │ Default Mask     │ Networks    │
├───────┼─────────────┼─────────────────┼──────────────────┼─────────────┤
│   A   │ 0xxxxxxx    │ 1.0.0.0 -       │ 255.0.0.0 (/8)   │ 126 nets    │
│       │ (1-126)     │ 126.255.255.255 │                  │ 16M hosts   │
├───────┼─────────────┼─────────────────┼──────────────────┼─────────────┤
│   B   │ 10xxxxxx    │ 128.0.0.0 -     │ 255.255.0.0 (/16)│ 16K nets    │
│       │ (128-191)   │ 191.255.255.255 │                  │ 65K hosts   │
├───────┼─────────────┼─────────────────┼──────────────────┼─────────────┤
│   C   │ 110xxxxx    │ 192.0.0.0 -     │ 255.255.255.0    │ 2M nets     │
│       │ (192-223)   │ 223.255.255.255 │ (/24)            │ 254 hosts   │
├───────┼─────────────┼─────────────────┼──────────────────┼─────────────┤
│   D   │ 1110xxxx    │ 224.0.0.0 -     │ N/A              │ Multicast   │
│       │ (224-239)   │ 239.255.255.255 │                  │             │
├───────┼─────────────┼─────────────────┼──────────────────┼─────────────┤
│   E   │ 1111xxxx    │ 240.0.0.0 -     │ N/A              │ Reserved    │
│       │ (240-255)   │ 255.255.255.255 │                  │             │
└───────┴─────────────┴─────────────────┴──────────────────┴─────────────┘`}</code>
            </pre>
          </div>
        </div>

        {/* Private IP Ranges */}
        <div className="mb-8 p-6 rounded-2xl bg-yellow-500/10 border border-yellow-500/30">
          <h2 className="text-lg font-semibold text-yellow-400 mb-4">Private IP Address Ranges (RFC 1918)</h2>
          <div className="p-4 rounded-xl bg-black/40 border border-white/5">
            <pre className="text-xs text-green-400 overflow-x-auto">
              <code>{`// Private IP Ranges (Not routable on Internet)
┌───────┬─────────────────────────────────┬───────────────┬────────────┐
│ Class │ Range                           │ CIDR          │ Addresses  │
├───────┼─────────────────────────────────┼───────────────┼────────────┤
│   A   │ 10.0.0.0 - 10.255.255.255       │ 10.0.0.0/8    │ 16,777,216 │
│   B   │ 172.16.0.0 - 172.31.255.255     │ 172.16.0.0/12 │ 1,048,576  │
│   C   │ 192.168.0.0 - 192.168.255.255   │ 192.168.0.0/16│ 65,536     │
└───────┴─────────────────────────────────┴───────────────┴────────────┘

// Special IP Addresses
127.0.0.0/8     → Loopback (localhost)
0.0.0.0         → Default route / All interfaces
255.255.255.255 → Broadcast
169.254.0.0/16  → APIPA (Auto-configured)
224.0.0.0/4     → Multicast`}</code>
            </pre>
          </div>
        </div>

        {/* Subnetting */}
        <div className="mb-8 p-6 rounded-2xl bg-green-500/10 border border-green-500/30">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-green-500 flex items-center justify-center">
              <Network className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-green-400">Subnetting & CIDR</h2>
          </div>

          <div className="prose prose-invert max-w-none mb-4">
            <p className="text-gray-300 text-sm">
              <strong>Subnetting</strong> divides a network into smaller subnetworks. 
              <strong> CIDR</strong> (Classless Inter-Domain Routing) uses slash notation for flexible subnet masks.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-black/40 border border-white/5 mb-4">
            <pre className="text-xs text-green-400 overflow-x-auto">
              <code>{`// CIDR Notation
┌───────┬───────────────────┬────────────────┬───────────┐
│ CIDR  │ Subnet Mask       │ Hosts          │ Wildcard  │
├───────┼───────────────────┼────────────────┼───────────┤
│ /8    │ 255.0.0.0         │ 16,777,214     │ 0.255.255.255 │
│ /16   │ 255.255.0.0       │ 65,534         │ 0.0.255.255   │
│ /24   │ 255.255.255.0     │ 254            │ 0.0.0.255     │
│ /25   │ 255.255.255.128   │ 126            │ 0.0.0.127     │
│ /26   │ 255.255.255.192   │ 62             │ 0.0.0.63      │
│ /27   │ 255.255.255.224   │ 30             │ 0.0.0.31      │
│ /28   │ 255.255.255.240   │ 14             │ 0.0.0.15      │
│ /29   │ 255.255.255.248   │ 6              │ 0.0.0.7       │
│ /30   │ 255.255.255.252   │ 2              │ 0.0.0.3       │
│ /32   │ 255.255.255.255   │ 1 (host route) │ 0.0.0.0       │
└───────┴───────────────────┴────────────────┴───────────┘

// Subnetting Formula
Number of Subnets = 2^n (n = borrowed bits)
Hosts per Subnet = 2^h - 2 (h = host bits, -2 for network & broadcast)`}</code>
            </pre>
          </div>

          {/* Subnetting Example */}
          <div className="p-4 rounded-xl bg-black/30 border border-green-500/20">
            <h3 className="text-sm font-semibold text-green-400 mb-2">Example: Subnet 192.168.1.0/24 into 4 subnets</h3>
            <pre className="text-xs text-gray-300 overflow-x-auto">
              <code>{`Original: 192.168.1.0/24 (256 addresses, 254 usable)
Need: 4 subnets → borrow 2 bits → /26

Subnet 1: 192.168.1.0/26   (192.168.1.1 - 192.168.1.62)
Subnet 2: 192.168.1.64/26  (192.168.1.65 - 192.168.1.126)
Subnet 3: 192.168.1.128/26 (192.168.1.129 - 192.168.1.190)
Subnet 4: 192.168.1.192/26 (192.168.1.193 - 192.168.1.254)

Each subnet: 64 addresses, 62 usable hosts`}</code>
            </pre>
          </div>
        </div>

        {/* IPv6 Section */}
        <div className="mb-8 p-6 rounded-2xl bg-purple-500/10 border border-purple-500/30">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-purple-500 flex items-center justify-center">
              <Globe2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-purple-400">IPv6 Addressing</h2>
              <p className="text-sm text-gray-400">128-bit Address Space</p>
            </div>
          </div>

          <div className="prose prose-invert max-w-none mb-4">
            <p className="text-gray-300 text-sm">
              <strong>IPv6</strong> uses 128-bit addresses, providing 340 undecillion unique addresses.
              Written in hexadecimal with colons (e.g., 2001:0db8:85a3::8a2e:0370:7334).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-black/40 border border-white/5">
            <pre className="text-xs text-green-400 overflow-x-auto">
              <code>{`// IPv6 Address Format (128 bits = 8 groups of 16 bits)
Full:        2001:0db8:85a3:0000:0000:8a2e:0370:7334
Compressed:  2001:db8:85a3::8a2e:370:7334

// IPv6 Shortening Rules:
1. Leading zeros can be omitted: 0db8 → db8
2. Consecutive zero groups → :: (only once)

// IPv6 Address Types
┌──────────────────┬──────────────────┬──────────────────────┐
│ Type             │ Prefix           │ Description          │
├──────────────────┼──────────────────┼──────────────────────┤
│ Global Unicast   │ 2000::/3         │ Public routable      │
│ Link-Local       │ fe80::/10        │ Same link only       │
│ Unique Local     │ fc00::/7         │ Private (like RFC1918)│
│ Multicast        │ ff00::/8         │ One-to-many          │
│ Loopback         │ ::1/128          │ Localhost            │
│ Unspecified      │ ::/128           │ No address           │
└──────────────────┴──────────────────┴──────────────────────┘

// IPv4 vs IPv6 Comparison
┌─────────────────┬────────────────────┬────────────────────┐
│ Feature         │ IPv4               │ IPv6               │
├─────────────────┼────────────────────┼────────────────────┤
│ Address Size    │ 32 bits            │ 128 bits           │
│ Address Format  │ Dotted decimal     │ Hexadecimal        │
│ Example         │ 192.168.1.1        │ 2001:db8::1        │
│ Total Addresses │ ~4.3 billion       │ 340 undecillion    │
│ NAT Required    │ Yes (commonly)     │ No                 │
│ Configuration   │ Manual/DHCP        │ SLAAC/DHCPv6       │
│ Header Size     │ 20-60 bytes        │ 40 bytes (fixed)   │
│ Broadcast       │ Yes                │ No (multicast)     │
└─────────────────┴────────────────────┴────────────────────┘`}</code>
            </pre>
          </div>
        </div>

        {/* NAT Section */}
        <div className="mb-8 p-6 rounded-2xl bg-orange-500/10 border border-orange-500/30">
          <h2 className="text-lg font-semibold text-orange-400 mb-4">NAT (Network Address Translation)</h2>
          <div className="prose prose-invert max-w-none mb-4">
            <p className="text-gray-300 text-sm">
              <strong>NAT</strong> translates private IP addresses to public IP addresses, allowing multiple devices
              to share a single public IP.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-black/40 border border-white/5">
            <pre className="text-xs text-green-400 overflow-x-auto">
              <code>{`// NAT Types
┌─────────────┬──────────────────────────────────────────┐
│ Type        │ Description                              │
├─────────────┼──────────────────────────────────────────┤
│ Static NAT  │ 1:1 mapping (private ↔ public)           │
│ Dynamic NAT │ Pool of public IPs                       │
│ PAT/NAPT    │ Port-based (many:1), most common         │
└─────────────┴──────────────────────────────────────────┘

// PAT Example (Port Address Translation)
Inside Local       Inside Global      Outside
192.168.1.10:5001  203.0.113.5:10001  8.8.8.8:443
192.168.1.11:5002  203.0.113.5:10002  8.8.8.8:443
192.168.1.12:5003  203.0.113.5:10003  8.8.4.4:80`}</code>
            </pre>
          </div>
        </div>

        {/* Interview Tips */}
        <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
          <h2 className="text-xl font-semibold text-white mb-4">🎯 Interview Tips - IP Addressing</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
              <p className="text-gray-300 text-sm">Know <strong>IPv4 classes</strong> and their default subnet masks</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
              <p className="text-gray-300 text-sm">Be able to <strong>subnet a network</strong> given requirements (# of subnets or hosts)</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
              <p className="text-gray-300 text-sm">Understand <strong>private IP ranges</strong> (10.x.x.x, 172.16-31.x.x, 192.168.x.x)</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
              <p className="text-gray-300 text-sm">Know <strong>IPv6 address types</strong> and compression rules</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
              <p className="text-gray-300 text-sm">Understand <strong>NAT types</strong>: Static, Dynamic, PAT</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
