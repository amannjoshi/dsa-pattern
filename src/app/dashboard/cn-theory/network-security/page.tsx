'use client'

import Link from 'next/link'
import { ArrowLeft, Shield, CheckCircle2, BookOpen, Lock, Key, AlertTriangle, Eye, Server } from 'lucide-react'

const securityTopics = [
  {
    id: 1,
    name: 'Firewalls',
    icon: Shield,
    color: 'red',
    description: `Firewall is a network security device that monitors and filters incoming/outgoing traffic based on security rules.

Firewall Types:
- Packet Filter: Inspects packets based on IP, port, protocol (Layer 3-4)
- Stateful Inspection: Tracks connection state
- Application Layer: Deep packet inspection (Layer 7)
- Next-Gen (NGFW): IDS/IPS, application awareness, threat intelligence

Deployment:
- Network-based (hardware/software)
- Host-based (personal firewall)
- Cloud-based (WAF, firewall-as-a-service)`,
    code: `// Firewall Rule Example (iptables)
# Allow established connections
iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT

# Allow SSH from specific IP
iptables -A INPUT -p tcp -s 192.168.1.0/24 --dport 22 -j ACCEPT

# Allow HTTP/HTTPS
iptables -A INPUT -p tcp --dport 80 -j ACCEPT
iptables -A INPUT -p tcp --dport 443 -j ACCEPT

# Deny all other incoming
iptables -A INPUT -j DROP

// Firewall Rule Table
┌────┬────────┬──────────┬───────────┬───────┬────────┐
│ #  │ Action │ Source   │ Dest      │ Port  │ Proto  │
├────┼────────┼──────────┼───────────┼───────┼────────┤
│ 1  │ ALLOW  │ ANY      │ DMZ       │ 80,443│ TCP    │
│ 2  │ ALLOW  │ LAN      │ ANY       │ ANY   │ ANY    │
│ 3  │ DENY   │ ANY      │ ANY       │ 23    │ TCP    │
│ 4  │ DENY   │ ANY      │ ANY       │ ANY   │ ANY    │
└────┴────────┴──────────┴───────────┴───────┴────────┘`
  },
  {
    id: 2,
    name: 'VPN (Virtual Private Network)',
    icon: Lock,
    color: 'green',
    description: `VPN creates an encrypted tunnel over public networks for secure communication.

VPN Types:
- Site-to-Site: Connects two networks (office to office)
- Remote Access: Individual user to network
- SSL VPN: Browser-based, uses HTTPS
- IPSec VPN: Network layer encryption

VPN Protocols:
- OpenVPN: Open source, SSL/TLS
- WireGuard: Modern, fast, lightweight
- IPSec: Suite of protocols (ESP, AH, IKE)
- L2TP/IPSec: Layer 2 + encryption`,
    code: `// VPN Tunnel Visualization
┌──────────────┐                      ┌──────────────┐
│ Remote User  │                      │ Corporate    │
│ 192.168.1.10 │                      │ Network      │
└──────┬───────┘                      │ 10.0.0.0/24  │
       │                              └──────┬───────┘
       │ Encrypted Tunnel                    │
       └──────────[INTERNET]─────────────────┘
         ┌─────────────────────────┐
         │ ESP Header + Encrypted │
         │ Original IP Packet     │
         └─────────────────────────┘

// IPSec Components
┌────────────┬─────────────────────────────────────┐
│ Component  │ Function                            │
├────────────┼─────────────────────────────────────┤
│ ESP        │ Encryption + Authentication         │
│ AH         │ Authentication only                 │
│ IKE        │ Key exchange (Phase 1 & 2)          │
│ SA         │ Security Association (params)       │
└────────────┴─────────────────────────────────────┘

// WireGuard Config Example
[Interface]
PrivateKey = <client_private_key>
Address = 10.0.0.2/24

[Peer]
PublicKey = <server_public_key>
Endpoint = vpn.example.com:51820
AllowedIPs = 0.0.0.0/0`
  },
  {
    id: 3,
    name: 'Encryption & Cryptography',
    icon: Key,
    color: 'purple',
    description: `Encryption transforms data into unreadable format to protect confidentiality.

Encryption Types:
- Symmetric: Same key for encrypt/decrypt (AES, DES, 3DES)
- Asymmetric: Public/private key pair (RSA, ECC)
- Hashing: One-way function (SHA-256, MD5)

Use Cases:
- TLS/SSL: HTTPS, secure web traffic
- PGP/GPG: Email encryption
- SSH: Secure remote access
- Disk Encryption: BitLocker, FileVault`,
    code: `// Symmetric vs Asymmetric Encryption
Symmetric (AES):
┌───────┐    Same Key    ┌───────┐
│ Plain │ ────────────> │Cipher │
│ Text  │ <──────────── │ Text  │
└───────┘               └───────┘

Asymmetric (RSA):
┌───────┐  Public Key   ┌───────┐  Private Key  ┌───────┐
│ Plain │ ───────────> │Cipher │ ───────────> │ Plain │
│ Text  │              │ Text  │              │ Text  │
└───────┘              └───────┘              └───────┘

// Common Algorithms
┌────────────────┬─────────┬─────────────────────┐
│ Algorithm      │ Type    │ Use                 │
├────────────────┼─────────┼─────────────────────┤
│ AES-256        │ Symm    │ Data encryption     │
│ RSA-2048       │ Asymm   │ Key exchange, sigs  │
│ SHA-256        │ Hash    │ Integrity check     │
│ ECDSA          │ Asymm   │ Digital signatures  │
│ Diffie-Hellman │ Key Ex  │ Secure key exchange │
└────────────────┴─────────┴─────────────────────┘

// TLS Handshake (simplified)
1. Client Hello: Supported ciphers
2. Server Hello: Selected cipher + Certificate
3. Key Exchange: Generate session key
4. Encrypted communication begins`
  },
  {
    id: 4,
    name: 'Network Attacks',
    icon: AlertTriangle,
    color: 'orange',
    description: `Common network attacks that security professionals must understand and defend against.

Attack Categories:
- DoS/DDoS: Overwhelm with traffic
- Man-in-the-Middle: Intercept communication
- Spoofing: Impersonate another device
- Sniffing: Capture network traffic
- Injection: SQL, XSS, command injection

Attack Prevention:
- Firewalls and IDS/IPS
- Encryption (TLS, VPN)
- Authentication and authorization
- Regular security updates`,
    code: `// Common Network Attacks
┌─────────────────┬────────────────────────────────────┐
│ Attack          │ Description                        │
├─────────────────┼────────────────────────────────────┤
│ DDoS            │ Flood target with traffic          │
│ Man-in-Middle   │ Intercept & modify traffic         │
│ ARP Spoofing    │ Fake ARP responses                 │
│ DNS Spoofing    │ Return fake DNS responses          │
│ IP Spoofing     │ Fake source IP address             │
│ SYN Flood       │ Exhaust TCP connections            │
│ Ping of Death   │ Oversized ICMP packets             │
│ Smurf Attack    │ ICMP broadcast amplification       │
└─────────────────┴────────────────────────────────────┘

// ARP Spoofing Attack
Attacker sends: "192.168.1.1 is at [Attacker MAC]"
Result: Traffic meant for gateway goes to attacker

// SYN Flood Attack
Attacker ──[SYN]───> Server    (many requests)
Server   ──[SYN-ACK]> ???      (resources allocated)
Server waits... (connection table fills up)
Legitimate users cannot connect

// Defense Mechanisms
- IDS/IPS: Detect and block attacks
- Rate Limiting: Prevent floods
- DNSSEC: Prevent DNS spoofing
- 802.1X: Port-based authentication
- VPN: Encrypt traffic`
  },
  {
    id: 5,
    name: 'IDS/IPS',
    icon: Eye,
    color: 'cyan',
    description: `IDS (Intrusion Detection System) monitors network traffic for suspicious activity.
IPS (Intrusion Prevention System) actively blocks detected threats.

Detection Methods:
- Signature-based: Match known attack patterns
- Anomaly-based: Detect deviation from normal
- Policy-based: Enforce security policies

Deployment:
- NIDS/NIPS: Network-based
- HIDS/HIPS: Host-based`,
    code: `// IDS vs IPS
┌─────────────────┬─────────────────┬─────────────────┐
│ Feature         │ IDS             │ IPS             │
├─────────────────┼─────────────────┼─────────────────┤
│ Action          │ Detect & Alert  │ Detect & Block  │
│ Mode            │ Passive         │ Inline          │
│ Response        │ Admin notified  │ Automatic       │
│ Impact on flow  │ None            │ Can drop packets│
└─────────────────┴─────────────────┴─────────────────┘

// Snort IDS Rule Example
alert tcp any any -> 192.168.1.0/24 80 (
  content:"GET /admin"; 
  msg:"Potential admin access attempt";
  sid:1000001;
)

// IDS/IPS Placement
                    ┌─────────┐
  Internet ────────>│ Firewall│
                    └────┬────┘
                         │
                    ┌────┴────┐
                    │   IPS   │ (inline - blocks)
                    └────┬────┘
                         │
                    ┌────┴────┐
                    │   IDS   │ (span port - monitors)
                    └────┬────┘
                         │
                    Internal Network`
  },
  {
    id: 6,
    name: 'Authentication Protocols',
    icon: Server,
    color: 'blue',
    description: `Authentication protocols verify user identity before granting access.

Common Protocols:
- RADIUS: Remote Authentication Dial-In User Service
- TACACS+: Terminal Access Controller Access-Control
- Kerberos: Ticket-based authentication (AD)
- 802.1X: Port-based network access control
- LDAP: Directory-based authentication

Multi-Factor Authentication (MFA):
- Something you know (password)
- Something you have (token, phone)
- Something you are (biometrics)`,
    code: `// RADIUS vs TACACS+
┌─────────────────┬─────────────────┬─────────────────┐
│ Feature         │ RADIUS          │ TACACS+         │
├─────────────────┼─────────────────┼─────────────────┤
│ Transport       │ UDP (1812,1813) │ TCP (49)        │
│ Encryption      │ Password only   │ Entire packet   │
│ AAA Separation  │ Combined        │ Separate        │
│ Primary Use     │ Network access  │ Device admin    │
│ Standard        │ Open (RFC)      │ Cisco proprietary│
└─────────────────┴─────────────────┴─────────────────┘

// Kerberos Authentication Flow
1. User → AS: "I want to login" (TGT Request)
2. AS → User: TGT (Ticket Granting Ticket)
3. User → TGS: TGT + "I want Service X" 
4. TGS → User: Service Ticket
5. User → Service: Service Ticket
6. Service → User: Access Granted

// 802.1X Components
┌──────────────┐     ┌───────────────┐     ┌────────────┐
│  Supplicant  │────>│ Authenticator │────>│   RADIUS   │
│  (Client)    │ EAP │  (Switch/AP)  │     │   Server   │
└──────────────┘     └───────────────┘     └────────────┘`
  }
]

const topicColors: Record<string, { bg: string; border: string; text: string; badge: string }> = {
  red: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-400', badge: 'bg-red-500' },
  green: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-400', badge: 'bg-green-500' },
  purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-400', badge: 'bg-purple-500' },
  orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-400', badge: 'bg-orange-500' },
  cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-400', badge: 'bg-cyan-500' },
  blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400', badge: 'bg-blue-500' },
}

export default function NetworkSecurityPage() {
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
            <div className="p-3 rounded-xl bg-gradient-to-br from-red-500/20 to-orange-500/20 border border-red-500/20">
              <Shield className="w-8 h-8 text-red-500" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Network Security</h1>
              <p className="text-muted-foreground">Protecting networks from threats and attacks</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 mt-4">
            <p className="text-gray-300 text-sm">
              <strong className="text-white">Network security</strong> involves protecting the integrity, confidentiality, and 
              availability of computer networks and data. Essential for Cisco, Zscaler, and security-focused interviews.
            </p>
          </div>
        </div>

        {/* CIA Triad */}
        <div className="mb-8 p-6 rounded-2xl bg-white/5 border border-white/10">
          <h2 className="text-lg font-semibold text-white mb-4">CIA Triad - Security Principles</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-center">
              <Lock className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <h3 className="font-semibold text-blue-400">Confidentiality</h3>
              <p className="text-xs text-gray-400 mt-1">Data accessible only to authorized users</p>
            </div>
            <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-center">
              <CheckCircle2 className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <h3 className="font-semibold text-green-400">Integrity</h3>
              <p className="text-xs text-gray-400 mt-1">Data is accurate and unaltered</p>
            </div>
            <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-center">
              <Server className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <h3 className="font-semibold text-yellow-400">Availability</h3>
              <p className="text-xs text-gray-400 mt-1">Systems accessible when needed</p>
            </div>
          </div>
        </div>

        {/* Security Topics */}
        <div className="space-y-6">
          {securityTopics.map((topic) => {
            const colors = topicColors[topic.color]
            const IconComponent = topic.icon
            return (
              <div 
                key={topic.id}
                className={`p-6 rounded-2xl ${colors.bg} border ${colors.border}`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-xl ${colors.badge} flex items-center justify-center`}>
                    <IconComponent className="w-5 h-5 text-white" />
                  </div>
                  <h2 className={`text-xl font-bold ${colors.text}`}>{topic.name}</h2>
                </div>

                <div className="prose prose-invert max-w-none mb-4">
                  <p className="text-gray-300 text-sm whitespace-pre-line">{topic.description}</p>
                </div>

                <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-400">Example / Configuration</span>
                  </div>
                  <pre className="text-xs text-green-400 overflow-x-auto">
                    <code>{topic.code}</code>
                  </pre>
                </div>
              </div>
            )
          })}
        </div>

        {/* Interview Tips */}
        <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
          <h2 className="text-xl font-semibold text-white mb-4">🎯 Interview Tips - Network Security (Cisco/Zscaler)</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
              <p className="text-gray-300 text-sm">Know <strong>CIA Triad</strong>: Confidentiality, Integrity, Availability</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
              <p className="text-gray-300 text-sm">Understand <strong>firewall types</strong>: Packet filter, Stateful, Application, NGFW</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
              <p className="text-gray-300 text-sm">Explain <strong>VPN types</strong> and protocols (IPSec, SSL VPN, WireGuard)</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
              <p className="text-gray-300 text-sm">Know common <strong>network attacks</strong> and defenses (DDoS, MITM, Spoofing)</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
              <p className="text-gray-300 text-sm">Compare <strong>IDS vs IPS</strong> and their deployment modes</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
              <p className="text-gray-300 text-sm">Understand <strong>symmetric vs asymmetric encryption</strong> and TLS handshake</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
