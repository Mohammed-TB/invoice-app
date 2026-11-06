# InvoiceApp

A mobile invoice management application built with **React Native**, **Expo**, **TypeScript**, and **SQLite**.

InvoiceApp is designed to help users manage invoices and organize their business records through a simple and user-friendly mobile experience.

## Features

- Create and manage invoices.
- Store application data locally using SQLite.
- Organize invoice-related functionality using a feature-based architecture.
- Manage application settings.
- Support Android development and testing through Expo Go.

## Tech Stack

| Technology | Purpose |
|---|---|
| React Native | Mobile application development |
| Expo SDK 54 | Development platform |
| TypeScript | Type-safe development |
| Expo Router | File-based navigation |
| SQLite | Local database |
| Expo Go | Testing and previewing |

## Project Structure

```text
InvoiceApp/
├── assets/
├── src/
│   ├── app/
│   ├── database/
│   │   ├── db.ts
│   │   └── shop-db.ts
│   └── features/
│       ├── invoice/
│       └── settings/
├── app.json
├── eas.json
├── package.json
└── README.md
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Mohammed-TB/invoice-app.git
```

### 2. Navigate to the project directory

```bash
cd invoice-app
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npx expo start --clear
```

## Running on LDPlayer 9

This project can be tested using **LDPlayer 9** with Expo Go.

The following steps describe the tested setup on Windows.

### Requirements

- LDPlayer 9 installed and running.
- Android Debug Bridge (ADB).
- Expo Go compatible with Expo SDK 54.

### 1. Connect LDPlayer through ADB

```powershell
adb connect 127.0.0.1:5555
```

Verify the connection:

```powershell
adb -s 127.0.0.1:5555 shell getprop ro.product.model
```

### 2. Start Expo

```powershell
npx expo start --clear
```

### 3. Forward the Metro port

Open another PowerShell terminal and run:

```powershell
adb -s 127.0.0.1:5555 reverse tcp:8081 tcp:8081
```

### 4. Open the application

1. Open Expo Go inside LDPlayer.
2. Connect to the project using the Metro URL or scan the QR code.
3. Wait for the application to load.

**Important:** The tested LDPlayer ADB address is `127.0.0.1:5555`. The ADB port may differ depending on your emulator configuration.

For detailed instructions and troubleshooting, see:

[LDPlayer 9 Expo Guide](./LDPlayer9_Expo_Guide.txt)

## Development Notes

- The project uses Expo SDK 54.
- SQLite is used for local data storage.
- Expo Go must be compatible with the project's Expo SDK version.
- The application is developed and tested on Windows using LDPlayer 9.

## Future Improvements

- Improve invoice management workflows.
- Add additional reporting features.
- Enhance application settings.
- Improve the overall user experience.

## Author

**Mohammed TB**

GitHub: [@Mohammed-TB](https://github.com/Mohammed-TB)

---

*Built with React Native, Expo, TypeScript, and SQLite.*