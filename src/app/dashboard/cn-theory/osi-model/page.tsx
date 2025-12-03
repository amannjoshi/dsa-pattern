'use client'

import Link from 'next/link'
import { ArrowLeft, Layers, CheckCircle2, BookOpen } from 'lucide-react'

const osiLayers = [
  {
    id: 1,
    number: 7,
    name: 'Application Layer',
    color: 'red',
    dataUnit: 'Data',
    protocols: 'HTTP, HTTPS, FTP, SMTP, DNS, DHCP, Telnet, SSH',
    devices: 'Gateways, Firewalls',
    description: `The Application Layer is the topmost layer and closest to the end user. It provides network services directly to applications.

Key Functions:
- Network Virtual Terminal
- File Transfer, Access, and Management (FTAM)
- Mail Services
- Directory Services

Real-world Example:
When you open a web browser and visit a website, you're using HTTP/HTTPS protocols at the Application Layer.`,
    code: `// HTTP Request Example
GET /index.html HTTP/1.1
Host: www.example.com
User-Agent: Mozilla/5.0
Accept: text/html

// HTTP Response
HTTP/1.1 200 OK
Content-Type: text/html
Content-Length: 1234

<html>...</html>`
  },
  {
    id: 2,
    number: 6,
    name: 'Presentation Layer',
    color: 'orange',
    dataUnit: 'Data',
    protocols: 'SSL/TLS, JPEG, MPEG, GIF, ASCII, EBCDIC',
    devices: 'Gateway',
    description: `The Presentation Layer acts as a translator between the network and application. It handles data formatting, encryption, and compression.

Key Functions:
- Translation: Converting data formats (ASCII ↔ EBCDIC)
- Encryption/Decryption: SSL/TLS encryption
- Compression: Reducing data size for transmission

Real-world Example:
When you see the "🔒" lock icon in your browser, SSL/TLS at the Presentation Layer is encrypting your data.`,
    code: `// SSL/TLS Handshake Steps
1. Client Hello: Supported cipher suites
2. Server Hello: Selected cipher suite
3. Server Certificate: Public key
4. Key Exchange: Pre-master secret
5. Change Cipher Spec: Switch to encrypted

// Example: Data Encryption
Original: "Password123"
Encrypted: "8f14e45f ceea167a 3b3b8b70 5a5d8e8d"

// Data Compression
Original: 1000 bytes
Compressed: 300 bytes (70% reduction)`
  },
  {
    id: 3,
    number: 5,
    name: 'Session Layer',
    color: 'yellow',
    dataUnit: 'Data',
    protocols: 'NetBIOS, PPTP, RPC, SQL, NFS',
    devices: 'Gateway',
    description: `The Session Layer establishes, manages, and terminates sessions between applications. It acts like a "dialog controller."

Key Functions:
- Session Establishment, Maintenance, and Termination
- Synchronization: Using checkpoints
- Dialog Control: Half-duplex or Full-duplex

Session Modes:
- Simplex: One-way communication (TV broadcast)
- Half-Duplex: Two-way, one at a time (Walkie-talkie)
- Full-Duplex: Two-way simultaneous (Phone call)`,
    code: `// Session Example: Video Call
1. Session Establishment
   User A ──[Connect Request]──> User B
   User A <──[Connect Accept]─── User B

2. Data Transfer (Full Duplex)
   User A ←──[Video/Audio]───→ User B
   
3. Checkpoints (Recovery Points)
   Checkpoint 1 → Checkpoint 2 → Checkpoint 3
   
4. Session Termination
   User A ──[Disconnect]──> User B`
  },
  {
    id: 4,
    number: 4,
    name: 'Transport Layer',
    color: 'green',
    dataUnit: 'Segment (TCP) / Datagram (UDP)',
    protocols: 'TCP, UDP, SCTP, DCCP',
    devices: 'Gateway, Firewall',
    description: `The Transport Layer provides end-to-end communication between processes. It's responsible for reliable data transfer.

Key Functions:
- Segmentation and Reassembly
- Connection Control (TCP) or Connectionless (UDP)
- Flow Control & Error Control
- Port Addressing

TCP vs UDP:
| Feature | TCP | UDP |
|---------|-----|-----|
| Connection | Connection-oriented | Connectionless |
| Reliability | Reliable (ACK) | Unreliable |
| Speed | Slower | Faster |
| Use Case | Web, Email | Gaming, Streaming |`,
    code: `// TCP 3-Way Handshake
Client ──[SYN]────────> Server     // Step 1
Client <──[SYN-ACK]──── Server     // Step 2
Client ──[ACK]────────> Server     // Step 3
// Connection Established!

// TCP Header (Important Fields)
┌─────────────────────────────────┐
│ Source Port │ Destination Port │
├─────────────────────────────────┤
│      Sequence Number            │
├─────────────────────────────────┤
│    Acknowledgment Number        │
├─────────────────────────────────┤
│ Flags: SYN ACK FIN RST PSH URG  │
└─────────────────────────────────┘

// Port Numbers
HTTP:  80    HTTPS: 443
FTP:   21    SSH:   22
SMTP:  25    DNS:   53`
  },
  {
    id: 5,
    number: 3,
    name: 'Network Layer',
    color: 'cyan',
    dataUnit: 'Packet',
    protocols: 'IP, ICMP, IGMP, IPsec, ARP, RARP',
    devices: 'Router, Layer 3 Switch',
    description: `The Network Layer handles logical addressing and routing. It determines the best path for data to travel across networks.

Key Functions:
- Logical Addressing (IP Addresses)
- Routing: Finding optimal path
- Packet Forwarding
- Fragmentation and Reassembly

Important Concepts:
- Routing: Determining the path (RIP, OSPF, BGP)
- Forwarding: Moving packets along the path
- IP Addressing: IPv4 (32-bit) and IPv6 (128-bit)`,
    code: `// IPv4 Header Structure
┌───────────────────────────────────────┐
│ Version │ IHL │ ToS │ Total Length   │
├───────────────────────────────────────┤
│ Identification │ Flags │ Frag Offset │
├───────────────────────────────────────┤
│ TTL │ Protocol │ Header Checksum     │
├───────────────────────────────────────┤
│        Source IP Address              │
├───────────────────────────────────────┤
│      Destination IP Address           │
└───────────────────────────────────────┘

// Routing Example
Source: 192.168.1.10
Destination: 10.0.0.5

Path: Router1 → Router2 → Router3
Hops: 3 (TTL decremented at each hop)

// ICMP: Ping Command
$ ping google.com
Reply from 142.250.190.14: bytes=32 time=15ms TTL=57`
  },
  {
    id: 6,
    number: 2,
    name: 'Data Link Layer',
    color: 'blue',
    dataUnit: 'Frame',
    protocols: 'Ethernet, PPP, HDLC, Frame Relay, ATM',
    devices: 'Switch, Bridge, NIC',
    description: `The Data Link Layer provides node-to-node data transfer and handles physical addressing (MAC addresses).

Two Sub-layers:
1. LLC (Logical Link Control): Flow control, error control
2. MAC (Media Access Control): Physical addressing, frame delimiting

Key Functions:
- Framing: Encapsulating packets into frames
- Physical Addressing: MAC addresses (48-bit)
- Error Detection: CRC (Cyclic Redundancy Check)
- Access Control: CSMA/CD, CSMA/CA`,
    code: `// Ethernet Frame Structure
┌─────────────────────────────────────────────┐
│ Preamble │ SFD │ Dest MAC │ Src MAC │ Type │
├─────────────────────────────────────────────┤
│           Data (46-1500 bytes)              │
├─────────────────────────────────────────────┤
│                   FCS (CRC)                 │
└─────────────────────────────────────────────┘

// MAC Address Example
AA:BB:CC:DD:EE:FF
│  │  │  │  │  └─ Device ID (OUI)
└──┴──┴──────────── Manufacturer ID

// CSMA/CD (Carrier Sense Multiple Access / Collision Detection)
1. Listen before transmitting
2. If channel busy, wait
3. If collision detected, stop and retry
4. Random backoff before retransmitting`
  },
  {
    id: 7,
    number: 1,
    name: 'Physical Layer',
    color: 'gray',
    dataUnit: 'Bits',
    protocols: 'Ethernet Physical, USB, Bluetooth, RS-232',
    devices: 'Hub, Repeater, Cables, NIC',
    description: `The Physical Layer is the lowest layer, dealing with actual physical transmission of raw bits over a medium.

Key Functions:
- Bit Synchronization: Clock synchronization
- Bit Rate Control: Transmission speed
- Physical Topologies: Star, Bus, Ring, Mesh
- Transmission Modes: Simplex, Half-duplex, Full-duplex

Transmission Media:
- Guided: Twisted Pair, Coaxial, Fiber Optic
- Unguided: Radio Waves, Microwaves, Infrared`,
    code: `// Physical Layer Specifications
┌───────────────────────────────────────┐
│ Medium      │ Speed       │ Distance │
├───────────────────────────────────────┤
│ Cat5e       │ 1 Gbps      │ 100m     │
│ Cat6        │ 10 Gbps     │ 55m      │
│ Fiber Optic │ 100+ Gbps   │ 100+ km  │
│ Coaxial     │ 10 Mbps     │ 500m     │
└───────────────────────────────────────┘

// Encoding Schemes
NRZ (Non-Return to Zero)
Manchester Encoding
4B/5B Encoding

// Signal Types
Digital: Discrete values (0, 1)
Analog: Continuous waveform

// Bit Rate vs Baud Rate
Bit Rate = Baud Rate × Bits per Signal
Example: 1000 baud × 4 bits = 4000 bps`
  }
]

const layerColors: Record<string, { bg: string; border: string; text: string; badge: string }> = {
  red: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-400', badge: 'bg-red-500' },
  orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-400', badge: 'bg-orange-500' },
  yellow: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-400', badge: 'bg-yellow-500' },
  green: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-400', badge: 'bg-green-500' },
  cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-400', badge: 'bg-cyan-500' },
  blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400', badge: 'bg-blue-500' },
  gray: { bg: 'bg-gray-500/10', border: 'border-gray-500/30', text: 'text-gray-400', badge: 'bg-gray-500' },
}

export default function OSIModelPage() {
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
              <Layers className="w-8 h-8 text-blue-500" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">OSI Model</h1>
              <p className="text-muted-foreground">Open Systems Interconnection - 7 Layer Model</p>
            </div>
          </div>

          {/* Quick Info */}
          <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 mt-4">
            <p className="text-gray-300 text-sm">
              <strong className="text-white">Remember:</strong> &quot;Please Do Not Throw Sausage Pizza Away&quot; 
              (Physical, Data Link, Network, Transport, Session, Presentation, Application) - from bottom to top!
            </p>
          </div>
        </div>

        {/* OSI Layer Stack Visualization */}
        <div className="mb-8 p-6 rounded-2xl bg-white/5 border border-white/10">
          <h2 className="text-lg font-semibold text-white mb-4">OSI Layer Stack</h2>
          <div className="space-y-2">
            {osiLayers.map((layer) => {
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
                    <span className="text-gray-500 text-sm ml-2">({layer.dataUnit})</span>
                  </div>
                  <span className="text-xs text-gray-500">{layer.devices}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Detailed Layer Sections */}
        <div className="space-y-6">
          {osiLayers.map((layer, index) => {
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
                    <p className="text-sm text-gray-400">Data Unit: {layer.dataUnit}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-black/20">
                    <p className="text-xs text-gray-500 uppercase mb-1">Protocols</p>
                    <p className="text-sm text-gray-300">{layer.protocols}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-black/20">
                    <p className="text-xs text-gray-500 uppercase mb-1">Devices</p>
                    <p className="text-sm text-gray-300">{layer.devices}</p>
                  </div>
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

        {/* Interview Tips */}
        <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
          <h2 className="text-xl font-semibold text-white mb-4">🎯 Interview Tips - OSI Model</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
              <p className="text-gray-300 text-sm">Know the mnemonic: <strong>&quot;Please Do Not Throw Sausage Pizza Away&quot;</strong></p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
              <p className="text-gray-300 text-sm">Understand data encapsulation: Data → Segment → Packet → Frame → Bits</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
              <p className="text-gray-300 text-sm">Know which devices operate at which layer (Router=Layer 3, Switch=Layer 2)</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
              <p className="text-gray-300 text-sm">Be ready to compare OSI vs TCP/IP model (7 layers vs 4 layers)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
