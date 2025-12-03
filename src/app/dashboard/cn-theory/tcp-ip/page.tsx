'use client'

import Link from 'next/link'
import { ArrowLeft, Globe, CheckCircle2, BookOpen, ArrowUpDown } from 'lucide-react'

const tcpipLayers = [
  {
    id: 1,
    number: 4,
    name: 'Application Layer',
    osiEquivalent: 'Application + Presentation + Session',
    color: 'red',
    protocols: 'HTTP, HTTPS, FTP, SMTP, DNS, DHCP, SSH, Telnet, SNMP',
    description: `The Application Layer in TCP/IP combines the top 3 layers of OSI. It provides protocols that applications use for network communication.

Key Protocols:
- HTTP/HTTPS: Web browsing (Port 80/443)
- FTP: File transfer (Port 21)
- SMTP: Email sending (Port 25)
- DNS: Domain name resolution (Port 53)
- DHCP: IP address assignment (Port 67/68)
- SSH: Secure remote access (Port 22)`,
    code: `// DNS Resolution Example
$ nslookup google.com
Server:  dns.google
Address: 8.8.8.8

Name:    google.com
Address: 142.250.190.14

// HTTP Request/Response
GET /api/users HTTP/1.1
Host: api.example.com
Authorization: Bearer token123

HTTP/1.1 200 OK
Content-Type: application/json
{"users": [{"id": 1, "name": "John"}]}

// Common Port Numbers
HTTP:   80    DNS:    53
HTTPS:  443   DHCP:   67/68
FTP:    21    SNMP:   161
SSH:    22    SMTP:   25`
  },
  {
    id: 2,
    number: 3,
    name: 'Transport Layer',
    osiEquivalent: 'Transport',
    color: 'green',
    protocols: 'TCP (Transmission Control Protocol), UDP (User Datagram Protocol)',
    description: `The Transport Layer provides end-to-end communication services. The two main protocols are TCP (reliable) and UDP (fast).

TCP (Transmission Control Protocol):
- Connection-oriented (3-way handshake)
- Reliable delivery with acknowledgments
- Flow control and congestion control
- Used for: Web, Email, File Transfer

UDP (User Datagram Protocol):
- Connectionless
- No guarantee of delivery
- Faster, less overhead
- Used for: Streaming, Gaming, DNS, VoIP`,
    code: `// TCP 3-Way Handshake
┌────────┐                    ┌────────┐
│ Client │                    │ Server │
└───┬────┘                    └───┬────┘
    │──── SYN (seq=100) ────────>│  Step 1
    │                             │
    │<─ SYN-ACK (seq=300,ack=101)│  Step 2
    │                             │
    │──── ACK (ack=301) ────────>│  Step 3
    │                             │
    │   Connection Established    │

// TCP 4-Way Termination
Client ──[FIN]──> Server    // Step 1
Client <──[ACK]── Server    // Step 2
Client <──[FIN]── Server    // Step 3
Client ──[ACK]──> Server    // Step 4

// TCP vs UDP Comparison
┌──────────────┬─────────────┬─────────────┐
│   Feature    │     TCP     │     UDP     │
├──────────────┼─────────────┼─────────────┤
│ Connection   │ Required    │ Not needed  │
│ Reliability  │ Guaranteed  │ Best effort │
│ Ordering     │ Maintained  │ No order    │
│ Speed        │ Slower      │ Faster      │
│ Header Size  │ 20 bytes    │ 8 bytes     │
│ Use Case     │ Web, Email  │ Gaming, DNS │
└──────────────┴─────────────┴─────────────┘`
  },
  {
    id: 3,
    number: 2,
    name: 'Internet Layer',
    osiEquivalent: 'Network',
    color: 'cyan',
    protocols: 'IP, ICMP, ARP, RARP, IGMP',
    description: `The Internet Layer handles logical addressing and routing of packets across networks.

Key Protocols:
- IP (Internet Protocol): Logical addressing, routing
- ICMP: Error messages, ping, traceroute
- ARP: Maps IP to MAC address
- RARP: Maps MAC to IP address

IPv4 vs IPv6:
| Feature | IPv4 | IPv6 |
|---------|------|------|
| Address Size | 32-bit | 128-bit |
| Format | Dotted decimal | Hexadecimal |
| Example | 192.168.1.1 | 2001:0db8::1 |
| Addresses | ~4.3 billion | 340 undecillion |`,
    code: `// IPv4 Address Classes
┌───────┬─────────────────┬─────────────────┬──────────┐
│ Class │ First Octet     │ Default Mask    │ Use      │
├───────┼─────────────────┼─────────────────┼──────────┤
│   A   │ 1-126           │ 255.0.0.0       │ Large    │
│   B   │ 128-191         │ 255.255.0.0     │ Medium   │
│   C   │ 192-223         │ 255.255.255.0   │ Small    │
│   D   │ 224-239         │ N/A             │ Multicast│
│   E   │ 240-255         │ N/A             │ Reserved │
└───────┴─────────────────┴─────────────────┴──────────┘

// Private IP Ranges
Class A: 10.0.0.0 - 10.255.255.255
Class B: 172.16.0.0 - 172.31.255.255
Class C: 192.168.0.0 - 192.168.255.255

// ARP (Address Resolution Protocol)
Who has 192.168.1.1? Tell 192.168.1.100
192.168.1.1 is at AA:BB:CC:DD:EE:FF

// ICMP - Ping Example
$ ping 8.8.8.8
64 bytes from 8.8.8.8: icmp_seq=1 ttl=117 time=14.2ms`
  },
  {
    id: 4,
    number: 1,
    name: 'Network Access Layer',
    osiEquivalent: 'Data Link + Physical',
    color: 'blue',
    protocols: 'Ethernet, Wi-Fi (802.11), PPP, ARP, RARP',
    description: `The Network Access Layer (also called Link Layer) combines OSI's Physical and Data Link layers. It handles physical transmission and framing.

Key Functions:
- Physical addressing (MAC addresses)
- Framing and error detection
- Media access control (CSMA/CD, CSMA/CA)
- Physical signal transmission

Common Technologies:
- Ethernet: Wired LAN (IEEE 802.3)
- Wi-Fi: Wireless LAN (IEEE 802.11)
- PPP: Point-to-Point Protocol`,
    code: `// Ethernet Frame Structure
┌──────────┬─────────┬──────────┬─────────┬──────┬──────────┬─────┐
│ Preamble │   SFD   │ Dest MAC │ Src MAC │ Type │   Data   │ FCS │
│ 7 bytes  │ 1 byte  │ 6 bytes  │ 6 bytes │  2   │ 46-1500  │  4  │
└──────────┴─────────┴──────────┴─────────┴──────┴──────────┴─────┘

// MAC Address Format
AA:BB:CC:DD:EE:FF (48-bit)
└──┬──┘ └───┬───┘
   │        │
   OUI      Device ID
(Vendor)   (Unique)

// CSMA/CD (Ethernet Collision Detection)
1. Listen to channel
2. If idle, transmit
3. If collision, stop and send jam signal
4. Wait random time (exponential backoff)
5. Retry transmission

// Wi-Fi Standards
┌──────────┬───────────┬─────────────┐
│ Standard │ Frequency │ Max Speed   │
├──────────┼───────────┼─────────────┤
│ 802.11n  │ 2.4/5 GHz │ 600 Mbps    │
│ 802.11ac │ 5 GHz     │ 3.5 Gbps    │
│ 802.11ax │ 2.4/5/6GHz│ 9.6 Gbps    │
└──────────┴───────────┴─────────────┘`
  }
]

const layerColors: Record<string, { bg: string; border: string; text: string; badge: string }> = {
  red: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-400', badge: 'bg-red-500' },
  green: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-400', badge: 'bg-green-500' },
  cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-400', badge: 'bg-cyan-500' },
  blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400', badge: 'bg-blue-500' },
}

export default function TCPIPPage() {
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
            <div className="p-3 rounded-xl bg-gradient-to-br from-green-500/20 to-cyan-500/20 border border-green-500/20">
              <Globe className="w-8 h-8 text-green-500" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">TCP/IP Model</h1>
              <p className="text-muted-foreground">Internet Protocol Suite - 4 Layer Model</p>
            </div>
          </div>

          {/* Quick Info */}
          <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 mt-4">
            <p className="text-gray-300 text-sm">
              <strong className="text-white">TCP/IP</strong> is the practical model used on the Internet today. 
              It was developed by DARPA and has 4 layers instead of OSI&apos;s 7 layers.
            </p>
          </div>
        </div>

        {/* OSI vs TCP/IP Comparison */}
        <div className="mb-8 p-6 rounded-2xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-2 mb-4">
            <ArrowUpDown className="w-5 h-5 text-cyan-500" />
            <h2 className="text-lg font-semibold text-white">OSI vs TCP/IP Model</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {/* OSI Column */}
            <div>
              <h3 className="text-center text-sm font-semibold text-purple-400 mb-2">OSI Model (7 Layers)</h3>
              <div className="space-y-1">
                <div className="p-2 rounded bg-red-500/20 text-center text-xs text-red-400">7. Application</div>
                <div className="p-2 rounded bg-orange-500/20 text-center text-xs text-orange-400">6. Presentation</div>
                <div className="p-2 rounded bg-yellow-500/20 text-center text-xs text-yellow-400">5. Session</div>
                <div className="p-2 rounded bg-green-500/20 text-center text-xs text-green-400">4. Transport</div>
                <div className="p-2 rounded bg-cyan-500/20 text-center text-xs text-cyan-400">3. Network</div>
                <div className="p-2 rounded bg-blue-500/20 text-center text-xs text-blue-400">2. Data Link</div>
                <div className="p-2 rounded bg-gray-500/20 text-center text-xs text-gray-400">1. Physical</div>
              </div>
            </div>
            
            {/* TCP/IP Column */}
            <div>
              <h3 className="text-center text-sm font-semibold text-green-400 mb-2">TCP/IP Model (4 Layers)</h3>
              <div className="space-y-1">
                <div className="p-2 rounded bg-red-500/30 text-center text-xs text-red-400" style={{height: '84px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  4. Application
                </div>
                <div className="p-2 rounded bg-green-500/30 text-center text-xs text-green-400">3. Transport</div>
                <div className="p-2 rounded bg-cyan-500/30 text-center text-xs text-cyan-400">2. Internet</div>
                <div className="p-2 rounded bg-blue-500/30 text-center text-xs text-blue-400" style={{height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  1. Network Access
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TCP/IP Layer Stack */}
        <div className="mb-8 p-6 rounded-2xl bg-white/5 border border-white/10">
          <h2 className="text-lg font-semibold text-white mb-4">TCP/IP Layer Stack</h2>
          <div className="space-y-2">
            {tcpipLayers.map((layer) => {
              const colors = layerColors[layer.color]
              return (
                <div 
                  key={layer.id}
                  className={`flex items-center gap-4 p-3 rounded-lg ${colors.bg} border ${colors.border}`}
                >
                  <div className={`w-8 h-8 rounded-lg ${colors.badge} flex items-center justify-center text-white font-bold text-sm`}>
                    {layer.number}
                  </div>
                  <div className="flex-1">
                    <span className={`font-semibold ${colors.text}`}>{layer.name}</span>
                    <span className="text-gray-500 text-xs ml-2">(OSI: {layer.osiEquivalent})</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Detailed Layer Sections */}
        <div className="space-y-6">
          {tcpipLayers.map((layer) => {
            const colors = layerColors[layer.color]
            return (
              <div 
                key={layer.id}
                className={`p-6 rounded-2xl ${colors.bg} border ${colors.border}`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-xl ${colors.badge} flex items-center justify-center text-white font-bold`}>
                    {layer.number}
                  </div>
                  <div>
                    <h2 className={`text-xl font-bold ${colors.text}`}>{layer.name}</h2>
                    <p className="text-sm text-gray-400">OSI Equivalent: {layer.osiEquivalent}</p>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-black/20 mb-4">
                  <p className="text-xs text-gray-500 uppercase mb-1">Protocols</p>
                  <p className="text-sm text-gray-300">{layer.protocols}</p>
                </div>

                <div className="prose prose-invert max-w-none mb-4">
                  <p className="text-gray-300 text-sm whitespace-pre-line">{layer.description}</p>
                </div>

                <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-400">Example / Code</span>
                  </div>
                  <pre className="text-xs text-green-400 overflow-x-auto">
                    <code>{layer.code}</code>
                  </pre>
                </div>
              </div>
            )
          })}
        </div>

        {/* Key Differences */}
        <div className="mt-8 p-6 rounded-2xl bg-white/5 border border-white/10">
          <h2 className="text-xl font-semibold text-white mb-4">OSI vs TCP/IP - Key Differences</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-2 text-gray-400">Aspect</th>
                  <th className="text-left p-2 text-purple-400">OSI Model</th>
                  <th className="text-left p-2 text-green-400">TCP/IP Model</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr className="border-b border-white/5">
                  <td className="p-2">Layers</td>
                  <td className="p-2">7 layers</td>
                  <td className="p-2">4 layers</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="p-2">Developed by</td>
                  <td className="p-2">ISO</td>
                  <td className="p-2">DARPA (US DoD)</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="p-2">Approach</td>
                  <td className="p-2">Theoretical</td>
                  <td className="p-2">Practical</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="p-2">Usage</td>
                  <td className="p-2">Reference model</td>
                  <td className="p-2">Internet standard</td>
                </tr>
                <tr>
                  <td className="p-2">Reliability</td>
                  <td className="p-2">Less reliable</td>
                  <td className="p-2">More reliable</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Interview Tips */}
        <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
          <h2 className="text-xl font-semibold text-white mb-4">🎯 Interview Tips - TCP/IP</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
              <p className="text-gray-300 text-sm">Know the <strong>TCP 3-way handshake</strong>: SYN → SYN-ACK → ACK</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
              <p className="text-gray-300 text-sm">Understand <strong>TCP vs UDP</strong> differences and use cases</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
              <p className="text-gray-300 text-sm">Know common <strong>port numbers</strong>: HTTP(80), HTTPS(443), SSH(22), DNS(53)</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
              <p className="text-gray-300 text-sm">Be ready to explain <strong>what happens when you type a URL</strong> in browser</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
