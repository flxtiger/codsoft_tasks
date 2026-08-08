# 🛡️ Network Packet Analyzer

A Python-based **Network Packet Analyzer** developed as part of the **CodSoft Cyber Security Internship**. This project captures live network packets, extracts important information such as Source IP, Destination IP, Protocol, Packet Length, and displays them in a well-formatted console. It also stores the captured packet details in TXT and CSV files for future analysis.

---

## 🚀 Features

- 📡 Capture live network packets
- 🌐 Display Source IP Address
- 🌐 Display Destination IP Address
- 📦 Detect Protocol (TCP / UDP / ICMP)
- 📏 Display Packet Length
- ⏰ Show Packet Capture Time
- 🎨 Colored Console Output
- 📊 Live Packet Statistics
- 📝 Save logs in `packets.txt`
- 📄 Export packet details to `packets.csv`
- 📋 Menu-based packet capture
- 🛑 Graceful exit with packet summary

---

## 🛠️ Technologies Used

- Python 3
- Scapy
- Colorama
- CSV Module
- OS Module
- Datetime Module

---

## 📂 Project Structure

```text
CODSOFT_TASK1/
│
├── main.py
├── README.md
├── requirements.txt
├── .gitignore
├── output/
│   ├── packets.txt
│   └── packets.csv
├── screenshots/
└── venv/
```

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone <repository-link>
```

### 2. Open the project folder

```bash
cd CODSOFT_TASK1\
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Run the project

```bash
python main.py
```

## 📸 Screenshots

### Main Menu

![Main Menu](screenshots/main%20menu.png)

### Packet Capture

![Packet Capture](screenshots/packet%20capture.png)

### Packet Summary

![Packet Summary](screenshots/packet%20summar.png)


## 📄 Output Files

After running the program, the following files will be created automatically:

```text
output/
├── packets.txt
└── packets.csv
```

---

## 🔮 Future Improvements

- GUI Version using Tkinter
- Live Dashboard
- Graphical Statistics
- JSON Export
- HTML Report
- Packet Search
- Network Traffic Graphs

---

## 👨‍💻 Author

**Saurabh Prasad Gupta**

Computer Science & Engineering Student

CodSoft Cyber Security Internship

---

## 📜 License

This project is created for educational and internship purposes.  


