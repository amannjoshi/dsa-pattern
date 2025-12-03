'use client'

import Link from 'next/link'
import { ArrowLeft, Network, ChevronDown, Building2, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'

interface Question {
  id: number
  question: string
  answer: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
}

interface CompanySection {
  company: string
  logo: string
  color: string
  questions: Question[]
}

const interviewData: CompanySection[] = [
  {
    company: 'Cisco',
    logo: '🔷',
    color: 'blue',
    questions: [
      {
        id: 1,
        question: 'Explain the OSI model and its 7 layers.',
        answer: `The OSI (Open Systems Interconnection) model has 7 layers:

1. **Physical Layer**: Transmits raw bits over physical medium (cables, signals)
2. **Data Link Layer**: MAC addressing, framing, error detection (Switches)
3. **Network Layer**: Logical addressing (IP), routing (Routers)
4. **Transport Layer**: End-to-end delivery, TCP/UDP (Ports)
5. **Session Layer**: Session establishment, management, termination
6. **Presentation Layer**: Data formatting, encryption, compression
7. **Application Layer**: User interface, HTTP, FTP, SMTP

**Mnemonic**: Please Do Not Throw Sausage Pizza Away`,
        difficulty: 'Easy'
      },
      {
        id: 2,
        question: 'What is the difference between a Router and a Switch?',
        answer: `**Router (Layer 3):**
- Uses IP addresses for routing
- Connects different networks (LANs/WANs)
- Performs NAT, DHCP, firewall functions
- Separates broadcast domains
- Makes routing decisions based on routing table

**Switch (Layer 2):**
- Uses MAC addresses for forwarding
- Connects devices within same network (LAN)
- Creates separate collision domains per port
- Faster than routers for local traffic
- Learns MAC addresses automatically`,
        difficulty: 'Easy'
      },
      {
        id: 3,
        question: 'Explain VLAN and its benefits.',
        answer: `**VLAN (Virtual Local Area Network)** logically segments a physical network into multiple broadcast domains.

**Benefits:**
- **Security**: Isolate sensitive traffic
- **Performance**: Reduce broadcast traffic
- **Flexibility**: Group users logically, not physically
- **Cost**: Use one switch for multiple networks
- **Management**: Easier to manage and troubleshoot

**Types:**
- Data VLAN: Regular user traffic
- Voice VLAN: VoIP traffic (QoS priority)
- Management VLAN: Switch/router management
- Native VLAN: Untagged traffic on trunk ports

**802.1Q**: Standard for VLAN tagging (4-byte tag in Ethernet frame)`,
        difficulty: 'Medium'
      },
      {
        id: 4,
        question: 'What is Spanning Tree Protocol (STP) and why is it needed?',
        answer: `**STP (Spanning Tree Protocol)** prevents layer 2 loops in redundant network topologies.

**Why needed:**
- Switches forward broadcasts to all ports
- Without STP, broadcast storms occur
- MAC address table instability
- Multiple frame copies

**How it works:**
1. Elect Root Bridge (lowest Bridge ID)
2. Calculate path cost to root
3. Select Root Port on each non-root switch
4. Select Designated Port on each segment
5. Block remaining ports

**Port States:**
- Blocking → Listening → Learning → Forwarding

**Variants:**
- STP (802.1D): Original, slow convergence (30-50s)
- RSTP (802.1w): Rapid, faster convergence (1-2s)
- MSTP (802.1s): Multiple spanning trees`,
        difficulty: 'Hard'
      },
      {
        id: 5,
        question: 'Explain the TCP 3-way handshake.',
        answer: `**TCP 3-way handshake** establishes a reliable connection:

\`\`\`
Client                    Server
   |                        |
   |---- SYN (seq=x) ------>|  Step 1: Client initiates
   |                        |
   |<-- SYN-ACK ------------|  Step 2: Server acknowledges
   |    (seq=y, ack=x+1)    |          and sends its SYN
   |                        |
   |---- ACK (ack=y+1) ---->|  Step 3: Client acknowledges
   |                        |
   |   Connection Established
\`\`\`

**Purpose:**
- Synchronize sequence numbers
- Agree on initial parameters
- Ensure both sides are ready

**4-way termination:**
FIN → ACK → FIN → ACK`,
        difficulty: 'Easy'
      },
      {
        id: 6,
        question: 'What is OSPF and how does it work?',
        answer: `**OSPF (Open Shortest Path First)** is a link-state routing protocol.

**Key Features:**
- Uses Dijkstra's SPF algorithm
- Metric: Cost (based on bandwidth)
- Administrative Distance: 110
- Supports VLSM and CIDR
- Fast convergence

**OSPF Operation:**
1. **Neighbor Discovery**: Hello packets (224.0.0.5)
2. **Database Exchange**: DBD, LSR, LSU, LSAck
3. **SPF Calculation**: Build shortest path tree
4. **Routing Table**: Install best routes

**OSPF Areas:**
- Area 0: Backbone (required)
- Other areas must connect to Area 0
- Reduces LSA flooding

**Router Types:**
- Internal Router
- Backbone Router
- ABR (Area Border Router)
- ASBR (Autonomous System Border Router)`,
        difficulty: 'Hard'
      }
    ]
  },
  {
    company: 'Zscaler',
    logo: '🔒',
    color: 'cyan',
    questions: [
      {
        id: 1,
        question: 'What is Zero Trust Architecture?',
        answer: `**Zero Trust** is a security model that requires strict verification for every user and device trying to access resources.

**Core Principles:**
- **Never trust, always verify**
- **Least privilege access**
- **Assume breach**
- **Microsegmentation**

**Key Components:**
- Strong identity verification (MFA)
- Device health validation
- Context-aware access policies
- Continuous monitoring and logging
- Encryption everywhere

**Zscaler Implementation:**
- ZPA (Zscaler Private Access): Zero trust access to private apps
- ZIA (Zscaler Internet Access): Secure internet gateway
- No VPN needed - connects users to apps, not networks`,
        difficulty: 'Medium'
      },
      {
        id: 2,
        question: 'Explain the difference between a Firewall and a Proxy.',
        answer: `**Firewall:**
- Filters traffic based on rules (IP, port, protocol)
- Operates at Layer 3-4 (or Layer 7 for NGFW)
- Allows/denies connections
- Does not modify traffic
- Types: Packet filter, Stateful, Application

**Proxy:**
- Acts as intermediary between client and server
- Operates at Layer 7 (Application)
- Can cache content, filter URLs, inspect SSL
- Hides client IP from server
- Types: Forward proxy, Reverse proxy, Transparent

**Key Differences:**
| Feature | Firewall | Proxy |
|---------|----------|-------|
| Layer | L3-L4 (L7 for NGFW) | L7 |
| Function | Filter | Intermediate |
| Visibility | IP/Port | Content |
| Caching | No | Yes |`,
        difficulty: 'Medium'
      },
      {
        id: 3,
        question: 'What is SSL/TLS inspection and its challenges?',
        answer: `**SSL/TLS Inspection** (also called SSL decryption) allows security devices to inspect encrypted traffic.

**How it works:**
1. Client connects to proxy/firewall
2. Proxy establishes separate TLS session to server
3. Proxy decrypts, inspects, re-encrypts
4. Uses proxy's certificate for client connection

**Benefits:**
- Detect malware in encrypted traffic
- Prevent data exfiltration
- Enforce content policies
- Visibility into HTTPS traffic

**Challenges:**
- **Performance**: CPU-intensive decryption
- **Privacy**: Legal/compliance concerns
- **Certificate pinning**: Some apps reject proxy certs
- **Certificate management**: Deploy proxy CA to clients
- **Exemptions**: Banking, healthcare (sensitive data)`,
        difficulty: 'Hard'
      },
      {
        id: 4,
        question: 'What is SASE (Secure Access Service Edge)?',
        answer: `**SASE** combines network and security functions into a cloud-delivered service.

**Components:**
- **SD-WAN**: Software-defined WAN
- **SWG**: Secure Web Gateway
- **CASB**: Cloud Access Security Broker
- **FWaaS**: Firewall as a Service
- **ZTNA**: Zero Trust Network Access

**Benefits:**
- Reduced complexity (single vendor)
- Better performance (edge locations)
- Consistent security policies
- Supports remote workforce
- Scalable and flexible

**Zscaler SASE:**
- ZIA: Internet security (SWG, CASB, FWaaS)
- ZPA: Private app access (ZTNA)
- ZDX: Digital experience monitoring
- Cloud-native architecture, 150+ data centers`,
        difficulty: 'Medium'
      },
      {
        id: 5,
        question: 'How does DNS work and what are DNS-based attacks?',
        answer: `**DNS Resolution Process:**
1. Browser cache → OS cache → Resolver
2. Resolver queries Root servers (.com)
3. Root refers to TLD server
4. TLD refers to Authoritative server
5. Authoritative returns IP address

**DNS-based Attacks:**
- **DNS Spoofing/Cache Poisoning**: Return fake IP
- **DNS Tunneling**: Exfiltrate data through DNS
- **DNS Amplification DDoS**: Reflect traffic using open resolvers
- **Domain Hijacking**: Modify DNS records
- **Typosquatting**: Register similar domain names

**DNS Security:**
- DNSSEC: Cryptographic signing of records
- DNS-over-HTTPS (DoH): Encrypted DNS
- DNS-over-TLS (DoT): Encrypted DNS
- DNS filtering: Block malicious domains
- Response Policy Zones (RPZ): Custom filtering`,
        difficulty: 'Medium'
      }
    ]
  },
  {
    company: 'Juniper Networks',
    logo: '🌿',
    color: 'green',
    questions: [
      {
        id: 1,
        question: 'What is BGP and when would you use it?',
        answer: `**BGP (Border Gateway Protocol)** is the routing protocol of the Internet, used between autonomous systems.

**Key Characteristics:**
- Path vector protocol
- Uses TCP port 179
- Administrative Distance: eBGP 20, iBGP 200
- Manual neighbor configuration
- Slow convergence (stability focus)

**When to use BGP:**
- Connecting to multiple ISPs
- Enterprise WAN with multiple sites
- Need granular routing control
- Traffic engineering requirements

**BGP Path Selection (simplified):**
1. Highest Weight (Cisco-specific)
2. Highest Local Preference
3. Locally originated
4. Shortest AS-Path
5. Lowest Origin type (IGP < EGP < ?)
6. Lowest MED
7. eBGP over iBGP
8. Lowest Router ID`,
        difficulty: 'Hard'
      },
      {
        id: 2,
        question: 'Explain QoS (Quality of Service) and its mechanisms.',
        answer: `**QoS** prioritizes network traffic to ensure performance for critical applications.

**QoS Mechanisms:**

**1. Classification & Marking:**
- Identify traffic types
- Mark with DSCP/CoS values
- Trust boundaries

**2. Queuing:**
- Priority Queuing (strict)
- Weighted Fair Queuing (WFQ)
- Class-Based WFQ (CBWFQ)
- Low Latency Queuing (LLQ)

**3. Congestion Avoidance:**
- WRED (Weighted Random Early Detection)
- Tail drop prevention

**4. Traffic Shaping/Policing:**
- Shaping: Buffer excess, smooth traffic
- Policing: Drop/mark excess immediately

**DSCP Values:**
- EF (46): Expedited Forwarding (voice)
- AF: Assured Forwarding (video)
- CS: Class Selector
- BE (0): Best Effort`,
        difficulty: 'Medium'
      },
      {
        id: 3,
        question: 'What is MPLS and how does it work?',
        answer: `**MPLS (Multiprotocol Label Switching)** forwards packets using labels instead of IP addresses.

**Key Concepts:**
- **Label**: 32-bit identifier
- **LSR**: Label Switching Router
- **LSP**: Label Switched Path
- **FEC**: Forwarding Equivalence Class

**MPLS Operation:**
1. **Push**: Ingress LSR adds label
2. **Swap**: Core LSRs swap labels
3. **Pop**: Egress LSR removes label

**Benefits:**
- Faster forwarding (label lookup)
- Traffic engineering
- VPN services (L2VPN, L3VPN)
- QoS support

**MPLS Applications:**
- **MPLS VPN**: Provider-managed VPNs
- **MPLS TE**: Traffic Engineering
- **VPLS**: Virtual Private LAN Service`,
        difficulty: 'Hard'
      }
    ]
  },
  {
    company: 'General Networking',
    logo: '🌐',
    color: 'purple',
    questions: [
      {
        id: 1,
        question: 'What happens when you type google.com in browser?',
        answer: `**Complete Process:**

1. **URL Parsing**: Browser parses URL (protocol, domain, path)

2. **DNS Resolution**:
   - Browser cache → OS cache → Resolver
   - Recursive query to DNS servers
   - Returns IP address (e.g., 142.250.190.14)

3. **TCP Connection**:
   - 3-way handshake (SYN → SYN-ACK → ACK)
   - Establish connection to port 443 (HTTPS)

4. **TLS Handshake**:
   - Exchange cipher suites
   - Server certificate verification
   - Key exchange, establish encrypted session

5. **HTTP Request**:
   - Send GET / HTTP/1.1 request
   - Include headers (Host, User-Agent, etc.)

6. **Server Processing**:
   - Server receives and processes request
   - Generates HTML response

7. **HTTP Response**:
   - Server sends response (200 OK)
   - HTML, CSS, JS files

8. **Rendering**:
   - Browser parses HTML, builds DOM
   - Loads resources (CSS, JS, images)
   - Renders page`,
        difficulty: 'Medium'
      },
      {
        id: 2,
        question: 'What is the difference between TCP and UDP?',
        answer: `**TCP (Transmission Control Protocol):**
- Connection-oriented
- Reliable delivery (acknowledgments)
- Ordered delivery
- Flow control & congestion control
- Higher overhead (20-byte header)
- Use: HTTP, FTP, SSH, SMTP

**UDP (User Datagram Protocol):**
- Connectionless
- Unreliable (best effort)
- No ordering guarantee
- No flow control
- Lower overhead (8-byte header)
- Use: DNS, DHCP, VoIP, gaming, streaming

**Comparison Table:**
| Feature | TCP | UDP |
|---------|-----|-----|
| Connection | Required | None |
| Reliability | Guaranteed | Best effort |
| Speed | Slower | Faster |
| Header | 20+ bytes | 8 bytes |
| Ordering | Yes | No |`,
        difficulty: 'Easy'
      },
      {
        id: 3,
        question: 'Explain subnetting with an example.',
        answer: `**Subnetting** divides a network into smaller subnetworks.

**Example: Subnet 192.168.1.0/24 into 4 subnets**

Original: 192.168.1.0/24
- 256 addresses (254 usable)
- Subnet mask: 255.255.255.0

Need 4 subnets → borrow 2 bits → /26
- 2² = 4 subnets
- Each subnet: 64 addresses (62 usable)

**Results:**
| Subnet | Network | Range | Broadcast |
|--------|---------|-------|-----------|
| 1 | 192.168.1.0/26 | .1-.62 | .63 |
| 2 | 192.168.1.64/26 | .65-.126 | .127 |
| 3 | 192.168.1.128/26 | .129-.190 | .191 |
| 4 | 192.168.1.192/26 | .193-.254 | .255 |

**Formula:**
- Subnets = 2^n (n = borrowed bits)
- Hosts = 2^h - 2 (h = host bits)`,
        difficulty: 'Medium'
      },
      {
        id: 4,
        question: 'What is ARP and how does it work?',
        answer: `**ARP (Address Resolution Protocol)** maps IP addresses to MAC addresses.

**ARP Process:**
1. Device needs MAC for destination IP
2. Checks ARP cache first
3. If not found, broadcasts ARP Request:
   "Who has 192.168.1.1? Tell 192.168.1.100"
4. Target responds with ARP Reply:
   "192.168.1.1 is at AA:BB:CC:DD:EE:FF"
5. Sender updates ARP cache

**ARP Cache Commands:**
- Windows: \`arp -a\`
- Linux: \`ip neigh\` or \`arp -n\`

**ARP Types:**
- ARP: IP → MAC
- RARP: MAC → IP (legacy)
- Proxy ARP: Router answers for remote hosts
- Gratuitous ARP: Announce own mapping

**Security:**
- ARP has no authentication
- Vulnerable to ARP spoofing
- Mitigation: Dynamic ARP Inspection (DAI)`,
        difficulty: 'Easy'
      },
      {
        id: 5,
        question: 'Explain NAT and its types.',
        answer: `**NAT (Network Address Translation)** translates private IPs to public IPs.

**Why NAT?**
- Conserve public IPv4 addresses
- Hide internal network structure
- Allow private IPs to access internet

**NAT Types:**

**1. Static NAT:**
- 1:1 mapping (private ↔ public)
- Used for servers needing fixed public IP

**2. Dynamic NAT:**
- Pool of public IPs
- First-come, first-served

**3. PAT (Port Address Translation):**
- Many:1 mapping using ports
- Most common (home routers)
- Also called NAT Overload

**Example PAT:**
| Inside Local | Inside Global | Outside |
|--------------|---------------|---------|
| 192.168.1.10:5001 | 203.0.113.5:10001 | 8.8.8.8:443 |
| 192.168.1.11:5002 | 203.0.113.5:10002 | 8.8.8.8:443 |`,
        difficulty: 'Medium'
      }
    ]
  }
]

const colorClasses: Record<string, { bg: string; border: string; text: string; badge: string }> = {
  blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400', badge: 'bg-blue-500' },
  cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-400', badge: 'bg-cyan-500' },
  green: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-400', badge: 'bg-green-500' },
  purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-400', badge: 'bg-purple-500' },
}

const difficultyColors = {
  Easy: 'bg-green-500/20 text-green-400',
  Medium: 'bg-yellow-500/20 text-yellow-400',
  Hard: 'bg-red-500/20 text-red-400',
}

export default function CNInterviewPage() {
  const [expandedQuestions, setExpandedQuestions] = useState<Record<string, boolean>>({})

  const toggleQuestion = (companyIndex: number, questionId: number) => {
    const key = `${companyIndex}-${questionId}`
    setExpandedQuestions(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

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
              <Network className="w-8 h-8 text-cyan-500" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Computer Network Interview Questions</h1>
              <p className="text-muted-foreground">Company-wise questions from Cisco, Zscaler, Juniper & more</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20 mt-4">
            <p className="text-gray-300 text-sm">
              Comprehensive collection of <strong className="text-white">networking interview questions</strong> asked at 
              top networking and security companies. Click on any question to reveal the answer.
            </p>
          </div>
        </div>

        {/* Company Sections */}
        <div className="space-y-8">
          {interviewData.map((section, companyIndex) => {
            const colors = colorClasses[section.color]
            return (
              <div key={section.company} className={`p-6 rounded-2xl ${colors.bg} border ${colors.border}`}>
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-12 h-12 rounded-xl ${colors.badge} flex items-center justify-center text-2xl`}>
                    {section.logo}
                  </div>
                  <div>
                    <h2 className={`text-xl font-bold ${colors.text}`}>{section.company}</h2>
                    <p className="text-sm text-gray-400">{section.questions.length} Questions</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {section.questions.map((q) => {
                    const key = `${companyIndex}-${q.id}`
                    const isExpanded = expandedQuestions[key]
                    return (
                      <div 
                        key={q.id}
                        className="rounded-xl bg-black/30 border border-white/5 overflow-hidden"
                      >
                        <button
                          onClick={() => toggleQuestion(companyIndex, q.id)}
                          className="w-full p-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                        >
                          <div className="flex items-center gap-3 flex-1">
                            <span className="text-gray-500 text-sm font-mono">Q{q.id}</span>
                            <span className="text-white text-sm">{q.question}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-0.5 rounded text-xs ${difficultyColors[q.difficulty]}`}>
                              {q.difficulty}
                            </span>
                            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                          </div>
                        </button>
                        
                        {isExpanded && (
                          <div className="px-4 pb-4 pt-2 border-t border-white/5">
                            <div className="prose prose-invert prose-sm max-w-none">
                              <pre className="whitespace-pre-wrap text-gray-300 text-sm font-sans bg-transparent p-0 m-0">
                                {q.answer}
                              </pre>
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>

        {/* Interview Tips */}
        <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
          <h2 className="text-xl font-semibold text-white mb-4">🎯 General Interview Tips</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
              <p className="text-gray-300 text-sm">Always explain concepts with <strong>real-world examples</strong></p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
              <p className="text-gray-300 text-sm">Draw <strong>diagrams</strong> when explaining complex topics (OSI, TCP handshake)</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
              <p className="text-gray-300 text-sm">Know <strong>CLI commands</strong> for common tools (ping, traceroute, netstat, tcpdump)</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
              <p className="text-gray-300 text-sm">Be ready to <strong>troubleshoot scenarios</strong> (why can&apos;t users access a website?)</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
              <p className="text-gray-300 text-sm">Understand <strong>trade-offs</strong> (TCP vs UDP, Hub vs Switch)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
