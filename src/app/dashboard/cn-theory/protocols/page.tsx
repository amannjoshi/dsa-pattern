'use client'

import Link from 'next/link'
import { ArrowLeft, FileText, CheckCircle2, BookOpen, Globe, Mail, Database, Lock, Server } from 'lucide-react'

const protocols = [
  {
    id: 1,
    name: 'HTTP/HTTPS',
    port: '80/443',
    layer: 'Application',
    category: 'Web',
    color: 'blue',
    icon: Globe,
    description: `HTTP (HyperText Transfer Protocol) is the foundation of web communication. HTTPS adds TLS/SSL encryption.

HTTP Methods:
- GET: Retrieve data
- POST: Submit data
- PUT: Update resource
- DELETE: Remove resource
- PATCH: Partial update

Status Codes:
- 2xx: Success (200 OK, 201 Created)
- 3xx: Redirect (301 Moved, 304 Not Modified)
- 4xx: Client Error (400 Bad Request, 404 Not Found)
- 5xx: Server Error (500 Internal, 503 Service Unavailable)`,
    code: `// HTTP Request
GET /api/users HTTP/1.1
Host: api.example.com
Authorization: Bearer token123
Accept: application/json

// HTTP Response
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 45
{"id": 1, "name": "John", "email": "john@example.com"}

// HTTPS TLS Handshake
Client → Server: ClientHello (supported ciphers)
Server → Client: ServerHello + Certificate
Client → Server: Key Exchange + ChangeCipherSpec
Server → Client: ChangeCipherSpec + Finished`
  },
  {
    id: 2,
    name: 'DNS',
    port: '53',
    layer: 'Application',
    category: 'Name Resolution',
    color: 'green',
    icon: Database,
    description: `DNS (Domain Name System) translates domain names to IP addresses.

DNS Record Types:
- A: IPv4 address
- AAAA: IPv6 address
- CNAME: Canonical name (alias)
- MX: Mail exchange server
- NS: Name server
- TXT: Text record (SPF, DKIM)
- SOA: Start of Authority

DNS Query Types:
- Recursive: Client asks resolver to find answer
- Iterative: Server refers to other servers`,
    code: `// DNS Resolution Process
1. Browser checks cache
2. OS checks hosts file & cache
3. Query recursive DNS resolver
4. Resolver queries root server (.com)
5. Resolver queries TLD server (example.com)
6. Resolver queries authoritative server
7. Answer returned to client

// DNS Query Example
$ nslookup google.com
Server:  8.8.8.8
Address: 8.8.8.8#53

Name:    google.com
Address: 142.250.190.14

// DNS Record Examples
example.com.     A      93.184.216.34
www.example.com. CNAME  example.com.
example.com.     MX     10 mail.example.com.
example.com.     TXT    "v=spf1 include:_spf.google.com ~all"`
  },
  {
    id: 3,
    name: 'DHCP',
    port: '67/68',
    layer: 'Application',
    category: 'Configuration',
    color: 'yellow',
    icon: Server,
    description: `DHCP (Dynamic Host Configuration Protocol) automatically assigns IP addresses and network configuration.

DHCP Process (DORA):
1. Discover: Client broadcasts to find DHCP server
2. Offer: Server offers IP configuration
3. Request: Client requests offered IP
4. Acknowledge: Server confirms assignment

DHCP Provides:
- IP Address
- Subnet Mask
- Default Gateway
- DNS Servers
- Lease Time`,
    code: `// DHCP DORA Process
┌────────┐                         ┌────────┐
│ Client │                         │ Server │
└───┬────┘                         └───┬────┘
    │─── DHCP Discover (broadcast) ───>│
    │                                   │
    │<──── DHCP Offer (IP offered) ────│
    │                                   │
    │──── DHCP Request (accept IP) ───>│
    │                                   │
    │<─── DHCP Acknowledge (confirmed) │
    │                                   │
    └─── IP Assigned: 192.168.1.100 ───┘

// DHCP Lease Information
IP Address: 192.168.1.100
Subnet Mask: 255.255.255.0
Default Gateway: 192.168.1.1
DNS Servers: 8.8.8.8, 8.8.4.4
Lease Time: 86400 seconds (24 hours)`
  },
  {
    id: 4,
    name: 'SMTP/POP3/IMAP',
    port: '25/110/143',
    layer: 'Application',
    category: 'Email',
    color: 'red',
    icon: Mail,
    description: `Email Protocols handle sending and receiving emails.

SMTP (Simple Mail Transfer Protocol):
- Port 25 (unencrypted), 587 (submission), 465 (SSL)
- Used for sending emails
- Push protocol

POP3 (Post Office Protocol v3):
- Port 110 (unencrypted), 995 (SSL)
- Downloads emails to local device
- Typically removes from server

IMAP (Internet Message Access Protocol):
- Port 143 (unencrypted), 993 (SSL)
- Keeps emails on server
- Syncs across devices`,
    code: `// Email Flow
┌────────┐    SMTP     ┌────────────┐    SMTP    ┌────────────┐
│ Sender │ ─────────> │ Sender MTA │ ────────> │ Receiver   │
│ (MUA)  │            │ (Mail      │           │ MTA        │
└────────┘            │ Server)    │           └─────┬──────┘
                      └────────────┘                 │
                                            POP3/IMAP│
┌────────┐                                          │
│Receiver│ <────────────────────────────────────────┘
│ (MUA)  │
└────────┘

// SMTP Commands
HELO mail.example.com
MAIL FROM:<sender@example.com>
RCPT TO:<receiver@example.com>
DATA
Subject: Test Email
Hello, World!
.
QUIT

// Protocol Comparison
┌──────────┬───────┬──────────────┬─────────────────┐
│ Protocol │ Port  │ Direction    │ Server Storage  │
├──────────┼───────┼──────────────┼─────────────────┤
│ SMTP     │ 25    │ Send         │ N/A             │
│ POP3     │ 110   │ Receive      │ Download/Delete │
│ IMAP     │ 143   │ Receive      │ Keep on Server  │
└──────────┴───────┴──────────────┴─────────────────┘`
  },
  {
    id: 5,
    name: 'FTP/SFTP',
    port: '21/22',
    layer: 'Application',
    category: 'File Transfer',
    color: 'purple',
    icon: FileText,
    description: `FTP (File Transfer Protocol) transfers files between client and server.

FTP Modes:
- Active Mode: Server connects back to client
- Passive Mode: Client initiates both connections

FTP Commands:
- USER, PASS: Authentication
- LIST: Directory listing
- GET/RETR: Download file
- PUT/STOR: Upload file
- QUIT: Close connection

SFTP (SSH File Transfer Protocol):
- Uses SSH (port 22) for encryption
- More secure than FTP`,
    code: `// FTP Connection Modes
Active Mode:                  Passive Mode:
Client:5000 ─> Server:21      Client:5000 ─> Server:21
Server:20   ─> Client:5001    Client:5001 ─> Server:2000+

// FTP Session Example
$ ftp ftp.example.com
Connected to ftp.example.com.
Name: anonymous
Password: user@email.com
ftp> ls
drwxr-xr-x 2 ftp ftp 4096 Jan 01 pub
ftp> cd pub
ftp> get file.txt
ftp> put upload.txt
ftp> quit

// SFTP vs FTP vs FTPS
┌──────────┬─────────┬─────────────────┬─────────────┐
│ Protocol │ Port    │ Encryption      │ Firewall    │
├──────────┼─────────┼─────────────────┼─────────────┤
│ FTP      │ 21      │ None            │ Problematic │
│ FTPS     │ 990     │ TLS/SSL         │ Problematic │
│ SFTP     │ 22      │ SSH             │ Easy (1 port)│
└──────────┴─────────┴─────────────────┴─────────────┘`
  },
  {
    id: 6,
    name: 'SSH/Telnet',
    port: '22/23',
    layer: 'Application',
    category: 'Remote Access',
    color: 'cyan',
    icon: Lock,
    description: `SSH (Secure Shell) provides encrypted remote access. Telnet is unencrypted (legacy).

SSH Features:
- Encrypted communication
- Public key authentication
- Port forwarding/tunneling
- SCP/SFTP file transfer

SSH Authentication:
- Password-based
- Key-based (recommended)
- Multi-factor

Telnet (legacy):
- Unencrypted (plaintext)
- Should not be used for sensitive systems`,
    code: `// SSH Key Authentication
1. Generate key pair
   $ ssh-keygen -t rsa -b 4096
   → Creates: ~/.ssh/id_rsa (private)
              ~/.ssh/id_rsa.pub (public)

2. Copy public key to server
   $ ssh-copy-id user@server

3. Connect
   $ ssh user@server

// SSH Port Forwarding
Local Forward:  ssh -L 8080:remote:80 user@server
Remote Forward: ssh -R 8080:localhost:80 user@server
Dynamic SOCKS:  ssh -D 1080 user@server

// SSH vs Telnet
┌─────────────┬───────────────┬───────────────┐
│ Feature     │ SSH           │ Telnet        │
├─────────────┼───────────────┼───────────────┤
│ Port        │ 22            │ 23            │
│ Encryption  │ Yes (AES)     │ No (plaintext)│
│ Auth        │ Password/Keys │ Password only │
│ Security    │ High          │ Very Low      │
│ Use Today   │ Yes           │ Avoid         │
└─────────────┴───────────────┴───────────────┘`
  },
  {
    id: 7,
    name: 'TCP/UDP',
    port: 'Various',
    layer: 'Transport',
    category: 'Transport',
    color: 'orange',
    icon: Server,
    description: `TCP (Transmission Control Protocol) provides reliable, ordered delivery. UDP (User Datagram Protocol) provides fast, connectionless delivery.

TCP Features:
- Connection-oriented (3-way handshake)
- Reliable delivery (acknowledgments)
- Flow control & congestion control
- In-order delivery

UDP Features:
- Connectionless
- No guarantee of delivery
- No ordering
- Faster, lower overhead`,
    code: `// TCP Header (20-60 bytes)
┌───────────────────┬───────────────────┐
│ Source Port (16)  │ Dest Port (16)    │
├───────────────────┴───────────────────┤
│ Sequence Number (32)                  │
├───────────────────────────────────────┤
│ Acknowledgment Number (32)            │
├────┬──────┬───────┬───────────────────┤
│Off │Reserv│ Flags │ Window Size (16)  │
├────┴──────┴───────┼───────────────────┤
│ Checksum (16)     │ Urgent Ptr (16)   │
├───────────────────┴───────────────────┤
│ Options (variable) + Padding          │
└───────────────────────────────────────┘

// UDP Header (8 bytes only!)
┌───────────────────┬───────────────────┐
│ Source Port (16)  │ Dest Port (16)    │
├───────────────────┼───────────────────┤
│ Length (16)       │ Checksum (16)     │
└───────────────────┴───────────────────┘

// When to use TCP vs UDP
TCP: HTTP, HTTPS, FTP, SSH, SMTP, Telnet
UDP: DNS, DHCP, SNMP, VoIP, Gaming, Streaming`
  },
  {
    id: 8,
    name: 'ICMP/ARP',
    port: 'N/A',
    layer: 'Network/Link',
    category: 'Utility',
    color: 'gray',
    icon: Server,
    description: `ICMP (Internet Control Message Protocol) is used for network diagnostics and error reporting.

ARP (Address Resolution Protocol) maps IP addresses to MAC addresses.

ICMP Uses:
- ping: Test reachability
- traceroute: Path discovery
- Error messages (unreachable, TTL exceeded)

ARP Process:
1. Check ARP cache
2. Broadcast ARP request
3. Receive ARP reply
4. Update cache`,
    code: `// ICMP - Ping
$ ping 8.8.8.8
PING 8.8.8.8: 64 bytes from 8.8.8.8: icmp_seq=1 ttl=117 time=14.2ms

// ICMP - Traceroute
$ traceroute google.com
 1  192.168.1.1      1.234 ms
 2  10.0.0.1         5.678 ms
 3  172.16.0.1       10.234 ms
 4  142.250.x.x      15.678 ms  ← google.com

// ICMP Message Types
Type 0:  Echo Reply (ping response)
Type 3:  Destination Unreachable
Type 8:  Echo Request (ping)
Type 11: Time Exceeded (traceroute)

// ARP Request/Reply
ARP Request (Broadcast):
  Who has 192.168.1.1? Tell 192.168.1.100

ARP Reply (Unicast):
  192.168.1.1 is at AA:BB:CC:DD:EE:FF

// ARP Table
$ arp -a
192.168.1.1     AA:BB:CC:DD:EE:FF  dynamic
192.168.1.254   11:22:33:44:55:66  dynamic`
  }
]

const protocolColors: Record<string, { bg: string; border: string; text: string; badge: string }> = {
  blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400', badge: 'bg-blue-500' },
  green: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-400', badge: 'bg-green-500' },
  yellow: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-400', badge: 'bg-yellow-500' },
  red: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-400', badge: 'bg-red-500' },
  purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-400', badge: 'bg-purple-500' },
  cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-400', badge: 'bg-cyan-500' },
  orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-400', badge: 'bg-orange-500' },
  gray: { bg: 'bg-gray-500/10', border: 'border-gray-500/30', text: 'text-gray-400', badge: 'bg-gray-500' },
}

export default function ProtocolsPage() {
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
            <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/20">
              <FileText className="w-8 h-8 text-purple-500" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Network Protocols</h1>
              <p className="text-muted-foreground">Essential protocols for network communication</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 mt-4">
            <p className="text-gray-300 text-sm">
              <strong className="text-white">Network protocols</strong> define rules for communication between devices.
              They operate at different layers of the OSI/TCP-IP model.
            </p>
          </div>
        </div>

        {/* Protocol Quick Reference */}
        <div className="mb-8 p-6 rounded-2xl bg-white/5 border border-white/10">
          <h2 className="text-lg font-semibold text-white mb-4">Common Port Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
            <div className="p-2 rounded bg-blue-500/10 text-center">
              <span className="text-blue-400 font-semibold">HTTP</span>
              <span className="text-gray-500 ml-1">:80</span>
            </div>
            <div className="p-2 rounded bg-green-500/10 text-center">
              <span className="text-green-400 font-semibold">HTTPS</span>
              <span className="text-gray-500 ml-1">:443</span>
            </div>
            <div className="p-2 rounded bg-yellow-500/10 text-center">
              <span className="text-yellow-400 font-semibold">DNS</span>
              <span className="text-gray-500 ml-1">:53</span>
            </div>
            <div className="p-2 rounded bg-red-500/10 text-center">
              <span className="text-red-400 font-semibold">SSH</span>
              <span className="text-gray-500 ml-1">:22</span>
            </div>
            <div className="p-2 rounded bg-purple-500/10 text-center">
              <span className="text-purple-400 font-semibold">FTP</span>
              <span className="text-gray-500 ml-1">:21</span>
            </div>
            <div className="p-2 rounded bg-cyan-500/10 text-center">
              <span className="text-cyan-400 font-semibold">SMTP</span>
              <span className="text-gray-500 ml-1">:25</span>
            </div>
            <div className="p-2 rounded bg-orange-500/10 text-center">
              <span className="text-orange-400 font-semibold">DHCP</span>
              <span className="text-gray-500 ml-1">:67/68</span>
            </div>
            <div className="p-2 rounded bg-gray-500/10 text-center">
              <span className="text-gray-400 font-semibold">Telnet</span>
              <span className="text-gray-500 ml-1">:23</span>
            </div>
          </div>
        </div>

        {/* Protocol Sections */}
        <div className="space-y-6">
          {protocols.map((protocol) => {
            const colors = protocolColors[protocol.color]
            const IconComponent = protocol.icon
            return (
              <div 
                key={protocol.id}
                className={`p-6 rounded-2xl ${colors.bg} border ${colors.border}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl ${colors.badge} flex items-center justify-center`}>
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className={`text-xl font-bold ${colors.text}`}>{protocol.name}</h2>
                      <p className="text-sm text-gray-400">{protocol.layer} Layer</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="px-3 py-1 rounded-full bg-black/30 text-xs text-gray-300">
                      Port: {protocol.port}
                    </span>
                  </div>
                </div>

                <div className="prose prose-invert max-w-none mb-4">
                  <p className="text-gray-300 text-sm whitespace-pre-line">{protocol.description}</p>
                </div>

                <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-400">Example / Commands</span>
                  </div>
                  <pre className="text-xs text-green-400 overflow-x-auto">
                    <code>{protocol.code}</code>
                  </pre>
                </div>
              </div>
            )
          })}
        </div>

        {/* Interview Tips */}
        <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
          <h2 className="text-xl font-semibold text-white mb-4">🎯 Interview Tips - Protocols</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
              <p className="text-gray-300 text-sm">Know <strong>common port numbers</strong>: HTTP(80), HTTPS(443), DNS(53), SSH(22), FTP(21)</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
              <p className="text-gray-300 text-sm">Understand <strong>DNS resolution process</strong> and record types (A, CNAME, MX, TXT)</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
              <p className="text-gray-300 text-sm">Know <strong>DHCP DORA</strong> process: Discover, Offer, Request, Acknowledge</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
              <p className="text-gray-300 text-sm">Explain <strong>HTTP methods</strong> and status codes (2xx, 3xx, 4xx, 5xx)</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
              <p className="text-gray-300 text-sm">Compare <strong>TCP vs UDP</strong> and their use cases</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
