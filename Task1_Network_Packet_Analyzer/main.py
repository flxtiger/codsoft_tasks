import os
import csv 
from datetime import datetime
from colorama import Fore, Style, init
from scapy.all import sniff
from scapy.layers.inet import IP

# Initialize Colorama
init(autoreset=True)

# Create output folder
os.makedirs("output", exist_ok=True)

LOG_FILE = "output/packets.txt"
CSV_FILE = "output/packets.csv"

# Statistics
packet_number = 0
tcp_count = 0
udp_count = 0
icmp_count = 0
unknown_count = 0


def save_packet(data):
    with open(LOG_FILE, "a", encoding="utf-8") as file:
        file.write(data)


def get_protocol(protocol_number):
    protocol_map = {
        1: "ICMP",
        6: "TCP",
        17: "UDP"
    }
    return protocol_map.get(protocol_number, f"Unknown ({protocol_number})")


def get_protocol_color(protocol):
    if protocol == "TCP":
        return Fore.GREEN
    elif protocol == "UDP":
        return Fore.BLUE
    elif protocol == "ICMP":
        return Fore.RED
    else:
        return Fore.YELLOW


def packet_callback(packet):
    global packet_number
    global tcp_count
    global udp_count
    global icmp_count
    global unknown_count

    if packet.haslayer(IP):

        packet_number += 1

        ip = packet[IP]

        protocol = get_protocol(ip.proto)

        if protocol == "TCP":
            tcp_count += 1
        elif protocol == "UDP":
            udp_count += 1
        elif protocol == "ICMP":
            icmp_count += 1
        else:
            unknown_count += 1

        color = get_protocol_color(protocol)

        current_time = datetime.now().strftime("%d-%m-%Y %H:%M:%S")

        length = len(packet)

        print(Fore.CYAN + "=" * 70)
        print(Fore.MAGENTA + f"Packet Number : {packet_number}")
        print(Fore.WHITE + f"Time          : {current_time}")
        print(Fore.YELLOW + f"Source IP     : {ip.src}")
        print(Fore.YELLOW + f"Destination IP: {ip.dst}")
        print(color + f"Protocol      : {protocol}")
        print(Fore.GREEN + f"Packet Length : {length} Bytes")

        print(Fore.CYAN + "-" * 70)
        print(Fore.GREEN + f"Total Packets : {packet_number}")
        print(Fore.GREEN + f"TCP Packets   : {tcp_count}")
        print(Fore.BLUE + f"UDP Packets   : {udp_count}")
        print(Fore.RED + f"ICMP Packets  : {icmp_count}")
        print(Fore.YELLOW + f"Unknown       : {unknown_count}")
        print(Fore.CYAN + "=" * 70)

        packet_info = f"""
============================================================
Packet Number : {packet_number}
Time          : {current_time}
Source IP     : {ip.src}
Destination IP: {ip.dst}
Protocol      : {protocol}
Packet Length : {length} Bytes

Statistics
----------
Total Packets : {packet_number}
TCP Packets   : {tcp_count}
UDP Packets   : {udp_count}
ICMP Packets  : {icmp_count}
Unknown       : {unknown_count}
============================================================

"""

        save_packet(packet_info)


print(Fore.GREEN + "\n==============================================")
print(Fore.GREEN + "      NETWORK PACKET ANALYZER")
print(Fore.GREEN + "==============================================")

print(Fore.CYAN + "\nSelect Capture Mode\n")

print("1. Capture All Packets")
print("2. Capture Only TCP")
print("3. Capture Only UDP")
print("4. Capture Only ICMP")
print("5. Exit")

choice = input("\nEnter Your Choice : ")

print(Fore.YELLOW + "\nPress CTRL + C to Stop...\n")

try:

    if choice == "1":
        sniff(prn=packet_callback, store=False)

    elif choice == "2":
        sniff(filter="tcp", prn=packet_callback, store=False)

    elif choice == "3":
        sniff(filter="udp", prn=packet_callback, store=False)

    elif choice == "4":
        sniff(filter="icmp", prn=packet_callback, store=False)

    elif choice == "5":
        print(Fore.RED + "Program Closed.")

    else:
        print(Fore.RED + "Invalid Choice!")

except KeyboardInterrupt:
    print(Fore.RED + "\n\nPacket Capture Stopped Successfully.")