'use client'

import Link from 'next/link'
import { ArrowLeft, Router, CheckCircle2, BookOpen, Server, Wifi, Radio, Shield } from 'lucide-react'

const networkDevices = [
  {
    id: 1,
    name: 'Router',
    icon: Router,
    layer: 'Layer 3 (Network)',
    color: 'cyan',
    description: `Router connects multiple networks and routes packets between them using IP addresses.

Key Functions:
- Connects different networks (LAN to WAN)
- Routes packets based on IP addresses
- NAT (Network Address Translation)
- DHCP server capability
- Firewall functionality

Types:
- Core Router: Backbone of internet
- Edge Router: Connects to ISP
- Home Router: For home networks`,
    features: ['IP Routing', 'NAT/PAT', 'ACL Support', 'DHCP', 'VPN Gateway'],
    code: `// Routing Table Example
Destination     Gateway         Mask            Interface
0.0.0.0         192.168.1.1     0.0.0.0         eth0  (default)
192.168.1.0     0.0.0.0         255.255.255.0   eth0
10.0.0.0        192.168.1.254   255.0.0.0       eth0

// NAT Translation
Inside Local    Inside Global    Outside Local   Outside Global
192.168.1.10    203.0.113.5      8.8.8.8         8.8.8.8

// Router Commands (Cisco)
Router> enable
Router# configure terminal
Router(config)# ip route 10.0.0.0 255.0.0.0 192.168.1.1`
  },
  {
    id: 2,
    name: 'Switch',
    icon: Server,
    layer: 'Layer 2 (Data Link)',
    color: 'green',
    description: `Switch connects devices within a LAN and forwards frames based on MAC addresses.

Key Functions:
- Learns MAC addresses automatically
- Forwards frames to specific ports
- Creates collision domains per port
- Supports VLANs for segmentation
- Full duplex communication

Types:
- Unmanaged Switch: Plug and play
- Managed Switch: Configurable
- Layer 3 Switch: Has routing capability`,
    features: ['MAC Learning', 'VLAN Support', 'STP', 'Port Mirroring', 'QoS'],
    code: `// MAC Address Table
Port    MAC Address         VLAN
----    -----------------   ----
Fa0/1   AA:BB:CC:DD:EE:01   10
Fa0/2   AA:BB:CC:DD:EE:02   10
Fa0/3   AA:BB:CC:DD:EE:03   20

// VLAN Configuration (Cisco)
Switch(config)# vlan 10
Switch(config-vlan)# name SALES
Switch(config)# interface fa0/1
Switch(config-if)# switchport access vlan 10

// Spanning Tree Protocol (STP)
Root Bridge: 00:AA:BB:CC:DD:EE
Path Cost to Root: 19
Port State: Forwarding/Blocking/Listening/Learning`
  },
  {
    id: 3,
    name: 'Hub',
    icon: Radio,
    layer: 'Layer 1 (Physical)',
    color: 'gray',
    description: `Hub is a simple network device that broadcasts data to all connected devices.

Key Characteristics:
- Broadcasts to all ports (no intelligence)
- Creates single collision domain
- Half duplex only
- No MAC address learning
- Deprecated - replaced by switches

Types:
- Passive Hub: No signal amplification
- Active Hub: Amplifies signals
- Intelligent Hub: Basic management`,
    features: ['Broadcasting', 'Signal Repeating', 'Simple Setup', 'Low Cost', 'Legacy'],
    code: `// Hub vs Switch Comparison
┌─────────────────┬─────────────┬─────────────┐
│ Feature         │    Hub      │   Switch    │
├─────────────────┼─────────────┼─────────────┤
│ Layer           │ Physical    │ Data Link   │
│ Intelligence    │ None        │ MAC-based   │
│ Collision       │ Shared      │ Per port    │
│ Bandwidth       │ Shared      │ Dedicated   │
│ Duplex          │ Half        │ Full        │
│ Security        │ Low         │ Higher      │
└─────────────────┴─────────────┴─────────────┘

// Hub operation
Frame arrives at Port 1
 └──> Broadcast to ALL other ports (2,3,4,5...)`
  },
  {
    id: 4,
    name: 'Bridge',
    icon: Server,
    layer: 'Layer 2 (Data Link)',
    color: 'blue',
    description: `Bridge connects two LAN segments and filters traffic using MAC addresses.

Key Functions:
- Connects network segments
- Filters traffic based on MAC
- Reduces collision domains
- Learns MAC addresses
- Predecessor to switches

Bridge vs Switch:
- Bridge: 2-4 ports, software-based
- Switch: Many ports, hardware-based (ASIC)`,
    features: ['MAC Filtering', 'Segment Connection', 'Traffic Isolation', 'Loop Prevention', 'Learning'],
    code: `// Bridge Forwarding Logic
if (dest_MAC in forwarding_table):
    if (dest_port == source_port):
        filter/discard frame  // Same segment
    else:
        forward to dest_port  // Different segment
else:
    flood to all ports except source

// Bridge Types
┌──────────────────┬─────────────────────────┐
│ Type             │ Description             │
├──────────────────┼─────────────────────────┤
│ Transparent      │ Invisible to devices    │
│ Source Routing   │ Path in frame header    │
│ Translational    │ Protocol conversion     │
└──────────────────┴─────────────────────────┘`
  },
  {
    id: 5,
    name: 'Gateway',
    icon: Shield,
    layer: 'Layer 7 (Application)',
    color: 'purple',
    description: `Gateway connects networks using different protocols and performs protocol translation.

Key Functions:
- Protocol conversion/translation
- Connects dissimilar networks
- Application-level processing
- Security gateway functionality
- Voice gateway (VoIP)

Types:
- Protocol Gateway: Protocol conversion
- Security Gateway: Firewall, VPN
- Voice Gateway: PSTN to VoIP`,
    features: ['Protocol Translation', 'Network Interconnection', 'Security', 'NAT', 'VPN'],
    code: `// Gateway Protocol Conversion
┌──────────────┐     ┌─────────────┐     ┌──────────────┐
│   Network A  │────>│   Gateway   │────>│   Network B  │
│   (IPv4)     │     │ Translation │     │   (IPv6)     │
└──────────────┘     └─────────────┘     └──────────────┘

// Default Gateway Configuration
IPv4: 192.168.1.1 (router interface)
IPv6: fe80::1

// Voice Gateway Example
PSTN ←→ Voice Gateway ←→ VoIP Network
Analog    Digital        IP-based`
  },
  {
    id: 6,
    name: 'Firewall',
    icon: Shield,
    layer: 'Layer 3-7',
    color: 'red',
    description: `Firewall monitors and controls network traffic based on security rules.

Key Functions:
- Packet filtering (Layer 3-4)
- Stateful inspection
- Application layer filtering (Layer 7)
- NAT and VPN support
- Intrusion prevention

Types:
- Packet Filter: Basic IP/port filtering
- Stateful: Tracks connection state
- Application: Deep packet inspection
- Next-Gen (NGFW): Advanced features`,
    features: ['Packet Filtering', 'Stateful Inspection', 'IDS/IPS', 'VPN', 'Application Control'],
    code: `// Firewall Rules Example
┌────┬────────┬────────┬───────┬────────┬────────┐
│ #  │ Action │ Source │ Dest  │ Port   │ Proto  │
├────┼────────┼────────┼───────┼────────┼────────┤
│ 1  │ ALLOW  │ ANY    │ DMZ   │ 80,443 │ TCP    │
│ 2  │ ALLOW  │ LAN    │ ANY   │ ANY    │ ANY    │
│ 3  │ DENY   │ ANY    │ ANY   │ 23     │ TCP    │
│ 4  │ DENY   │ ANY    │ ANY   │ ANY    │ ANY    │
└────┴────────┴────────┴───────┴────────┴────────┘

// Stateful Inspection
Connection Track: TCP 192.168.1.10:54321 → 8.8.8.8:443
State: ESTABLISHED
Reply allowed: 8.8.8.8:443 → 192.168.1.10:54321`
  },
  {
    id: 7,
    name: 'Access Point (AP)',
    icon: Wifi,
    layer: 'Layer 1-2',
    color: 'yellow',
    description: `Access Point extends wired network to wireless devices.

Key Functions:
- Wireless signal transmission
- SSID broadcasting
- Client authentication (WPA2/WPA3)
- Channel management
- Multiple SSID support

Types:
- Standalone AP: Independent operation
- Controller-based: Centrally managed
- Mesh AP: Wireless backhaul`,
    features: ['SSID Broadcast', 'WPA3 Security', 'Band Steering', 'VLAN Support', 'Roaming'],
    code: `// Wireless Configuration
SSID: Corporate_WiFi
Security: WPA3-Enterprise
Authentication: 802.1X (RADIUS)
Band: 5 GHz (preferred)
Channel: Auto (DFS enabled)

// 802.11 Frame Types
┌──────────────────┬─────────────────────────┐
│ Frame Type       │ Purpose                 │
├──────────────────┼─────────────────────────┤
│ Management       │ Association, Auth       │
│ Control          │ RTS, CTS, ACK           │
│ Data             │ Actual data transfer    │
└──────────────────┴─────────────────────────┘

// WiFi Security Evolution
WEP → WPA → WPA2 → WPA3
(Weak) (TKIP) (AES)  (SAE)`
  },
  {
    id: 8,
    name: 'Modem',
    icon: Radio,
    layer: 'Layer 1 (Physical)',
    color: 'orange',
    description: `Modem (Modulator-Demodulator) converts digital signals to analog and vice versa.

Key Functions:
- Signal modulation/demodulation
- Connects to ISP
- Provides internet access
- Error correction
- Compression

Types:
- DSL Modem: Phone line
- Cable Modem: Coaxial cable
- Fiber Modem (ONT): Fiber optic
- Cellular Modem: 4G/5G`,
    features: ['Signal Conversion', 'ISP Connection', 'Error Correction', 'Compression', 'Bridge Mode'],
    code: `// Modem Signal Flow
Digital Data     Modem         Analog Line
01100101 ──────> Modulate ──────> ~~~~~
                              
~~~~~   ──────> Demodulate ──> 01100101
Analog Line      Modem         Digital Data

// Modem Types & Speeds
┌──────────────┬──────────────┬─────────────┐
│ Type         │ Medium       │ Max Speed   │
├──────────────┼──────────────┼─────────────┤
│ DSL          │ Phone line   │ 100 Mbps    │
│ Cable        │ Coax         │ 1 Gbps      │
│ Fiber (ONT)  │ Fiber optic  │ 10 Gbps     │
│ 5G           │ Cellular     │ 1-10 Gbps   │
└──────────────┴──────────────┴─────────────┘`
  }
]

const deviceColors: Record<string, { bg: string; border: string; text: string; badge: string }> = {
  cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-400', badge: 'bg-cyan-500' },
  green: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-400', badge: 'bg-green-500' },
  gray: { bg: 'bg-gray-500/10', border: 'border-gray-500/30', text: 'text-gray-400', badge: 'bg-gray-500' },
  blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400', badge: 'bg-blue-500' },
  purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-400', badge: 'bg-purple-500' },
  red: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-400', badge: 'bg-red-500' },
  yellow: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-400', badge: 'bg-yellow-500' },
  orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-400', badge: 'bg-orange-500' },
}

export default function NetworkDevicesPage() {
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
            <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/20">
              <Router className="w-8 h-8 text-cyan-500" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Network Devices</h1>
              <p className="text-muted-foreground">Hardware that enables network communication</p>
            </div>
          </div>

          {/* Quick Info */}
          <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20 mt-4">
            <p className="text-gray-300 text-sm">
              Network devices operate at different <strong className="text-white">OSI layers</strong> and serve specific purposes 
              in connecting, filtering, and routing network traffic.
            </p>
          </div>
        </div>

        {/* Device Overview Grid */}
        <div className="mb-8 p-6 rounded-2xl bg-white/5 border border-white/10">
          <h2 className="text-lg font-semibold text-white mb-4">Device Quick Reference</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {networkDevices.slice(0, 8).map((device) => {
              const colors = deviceColors[device.color]
              const IconComponent = device.icon
              return (
                <div 
                  key={device.id}
                  className={`p-3 rounded-xl ${colors.bg} border ${colors.border} text-center`}
                >
                  <IconComponent className={`w-6 h-6 mx-auto mb-2 ${colors.text}`} />
                  <p className={`text-sm font-semibold ${colors.text}`}>{device.name}</p>
                  <p className="text-xs text-gray-500">{device.layer}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Detailed Device Sections */}
        <div className="space-y-6">
          {networkDevices.map((device) => {
            const colors = deviceColors[device.color]
            const IconComponent = device.icon
            return (
              <div 
                key={device.id}
                className={`p-6 rounded-2xl ${colors.bg} border ${colors.border}`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-xl ${colors.badge} flex items-center justify-center`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className={`text-xl font-bold ${colors.text}`}>{device.name}</h2>
                    <p className="text-sm text-gray-400">{device.layer}</p>
                  </div>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {device.features.map((feature, idx) => (
                    <span 
                      key={idx}
                      className="px-2 py-1 text-xs rounded-full bg-black/30 text-gray-300"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="prose prose-invert max-w-none mb-4">
                  <p className="text-gray-300 text-sm whitespace-pre-line">{device.description}</p>
                </div>

                <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-400">Configuration / Example</span>
                  </div>
                  <pre className="text-xs text-green-400 overflow-x-auto">
                    <code>{device.code}</code>
                  </pre>
                </div>
              </div>
            )
          })}
        </div>

        {/* Interview Tips */}
        <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
          <h2 className="text-xl font-semibold text-white mb-4">🎯 Interview Tips - Network Devices</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
              <p className="text-gray-300 text-sm"><strong>Hub vs Switch vs Router</strong>: Know the layer and key differences</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
              <p className="text-gray-300 text-sm"><strong>Collision vs Broadcast domains</strong>: Hub shares both, Switch separates collision, Router separates both</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
              <p className="text-gray-300 text-sm"><strong>MAC vs IP addressing</strong>: Switch uses MAC (L2), Router uses IP (L3)</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
              <p className="text-gray-300 text-sm"><strong>Firewall types</strong>: Packet filter, Stateful, Application, NGFW</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
