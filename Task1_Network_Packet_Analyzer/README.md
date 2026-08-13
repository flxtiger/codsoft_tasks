# 🛡️ Network Packet Analyzer

<div align="center">

![Python](https://img.shields.io/badge/Python-3.x-blue?style=for-the-badge\&logo=python)
![Scapy](https://img.shields.io/badge/Scapy-Network%20Analysis-green?style=for-the-badge)
![CyberSecurity](https://img.shields.io/badge/Cyber%20Security-CodSoft-red?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Completed-success?style=for-the-badge)

### 📡 Real-Time Network Traffic Monitoring & Analysis

**CodSoft Cyber Security Internship – Task 1**

Capture • Analyze • Monitor • Learn

</div>

---

## 📖 About The Project

The **Network Packet Analyzer** is a Python-based cyber security project designed to monitor and analyze network traffic in real time.

It captures live packets flowing through the network and extracts valuable information such as:

* Source IP Address
* Destination IP Address
* Protocol Type
* Packet Length
* Capture Timestamp

The project helps beginners understand how network communication works and how cyber security professionals inspect network traffic for monitoring, troubleshooting, and security analysis.

---

## ✨ Key Features

### 📡 Live Packet Sniffing

Capture network packets directly from the active network interface.

### 🌐 IP Address Analysis

Displays both Source and Destination IP addresses.

### 📦 Protocol Detection

Automatically identifies:

* TCP
* UDP
* ICMP
* Other IP-based protocols

### 📏 Packet Information

Shows detailed packet length and metadata.

### ⏰ Real-Time Timestamping

Records the exact capture time of every packet.

### 🎨 Colored Console Interface

Easy-to-read output using Colorama.

### 📊 Live Packet Statistics

Tracks packet counts while capturing.

### 📝 TXT Log Generation

Stores captured packets in a readable text format.

### 📄 CSV Export

Exports packet data for future analysis in Excel or other tools.

### 🛑 Safe Exit & Summary

Displays capture statistics before program termination.

---

# 🎯 Why This Project?

Network packet analysis is one of the most important skills in Cyber Security.

This project demonstrates:

✅ Network Monitoring

✅ Packet Inspection

✅ Traffic Analysis

✅ Logging & Reporting

✅ Python Automation

✅ Cyber Security Fundamentals

---

## 🛠️ Tech Stack

| Technology | Purpose                   |
| ---------- | ------------------------- |
| Python 3   | Core Programming          |
| Scapy      | Packet Capture & Analysis |
| Colorama   | Colored Terminal Output   |
| CSV Module | Data Export               |
| Datetime   | Timestamp Generation      |
| OS Module  | File Management           |

---

## 📂 Project Structure

```text
CODSOFT_TASK1/
│
├── main.py
├── README.md
├── requirements.txt
├── .gitignore
│
├── output/
│   ├── packets.txt
│   └── packets.csv
│
├── screenshots/
│   ├── main_menu.png
│   ├── packet_capture.png
│   └── packet_summary.png
│
└── venv/
```

---

# ⚙️ Installation & Setup

## 1️⃣ Clone Repository

```bash
git clone https://github.com/flxtiger/CODSOFT_TASK1.git
```

## 2️⃣ Move to Project Directory

```bash
cd CODSOFT_TASK1
```

## 3️⃣ Install Required Packages

```bash
pip install -r requirements.txt
```

## 4️⃣ Run The Program

```bash
python main.py
```

---

# 📸 Project Screenshots

## 🏠 Main Menu

![Main Menu](screenshots/main%20menu.png)

---

## 📡 Live Packet Capture

![Packet Capture](screenshots/packet%20capture.png)

---

## 📊 Packet Summary

![Packet Summary](screenshots/packet%20summar.png)

---

# 📄 Generated Output

After execution, packet details are automatically stored inside:

```text
output/
├── packets.txt
└── packets.csv
```

### Example TXT Output

```text
Time: 14:35:20
Source IP: 192.168.1.5
Destination IP: 8.8.8.8
Protocol: TCP
Length: 74 Bytes
```

### Example CSV Output

```csv
Timestamp,Source IP,Destination IP,Protocol,Length
14:35:20,192.168.1.5,8.8.8.8,TCP,74
```

---

# 📊 Sample Console Output

```text
==================================================
        NETWORK PACKET ANALYZER
==================================================

Packet #1
Source      : 192.168.1.5
Destination : 8.8.8.8
Protocol    : TCP
Length      : 74 Bytes
Time        : 14:35:20

--------------------------------------------------
```

---

# 🔮 Future Enhancements

* 🖥️ Graphical User Interface (Tkinter)
* 📈 Live Network Dashboard
* 📊 Real-Time Traffic Charts
* 🌍 IP Geolocation Tracking
* 📄 PDF Report Generation
* 🔍 Packet Search & Filtering
* 📂 JSON Export Support
* 📉 Network Traffic Visualization
* ⚠️ Suspicious Activity Detection
* 🤖 AI-Based Traffic Analysis

---

# 🎓 Learning Outcomes

Through this project, I gained practical experience in:

* Network Packet Inspection
* Packet Sniffing Techniques
* Cyber Security Fundamentals
* Python-Based Security Tools
* Data Logging & Reporting
* Network Protocol Analysis
* Real-Time Traffic Monitoring

---

# 👨‍💻 Developer

## Saurabh Prasad Gupta

**Computer Science & Engineering Student**

Passionate about:

* Cyber Security
* Network Analysis
* Python Development
* Ethical Hacking
* Software Development

---

# 📜 Internship Details

This project was developed as part of the **CodSoft Cyber Security Internship Program** to enhance practical skills in network monitoring and cyber security concepts.

---

# ⭐ Support

If you found this project useful:

🌟 Star the Repository

🍴 Fork the Project

📢 Share with Others

💻 Keep Learning Cyber Security

---

<div align="center">

## 🚀 "Understanding Network Traffic is the First Step Towards Cyber Security."

### Made with ❤️ by Saurabh Prasad Gupta

</div>
