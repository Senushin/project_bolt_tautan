# Prompt for Bolt.new / AI Coding Assistant

Copy and paste the following prompt to recreate the TauTan Secure Key dashboard structure and design.

---

**Task:** Create a high-fidelity "Cyber-Security" dashboard for a hardware security key manager called "TauTan Secure Key v2".

**Tech Stack:** React, TypeScript, Tailwind CSS, Lucide React, Vite.

**Visual Style:**
*   **Theme:** "Cyberpunk Dark". Background color: `#050505` (Deep Black).
*   **Overlay Effects:** Add a subtle noise texture overlay `pointer-events-none` to the background.
*   **Primary Color:** Coral Orange `#EE5D43`.
*   **Accent Colors:** Neon Green (Status: OK), Red (Status: Danger).
*   **Components:** Glassmorphism cards (`bg-zinc-900/40`, `backdrop-blur`).
*   **Animations:** Smooth fade-ins for page transitions, pulse effects for active statuses.

**Layout & Navigation:**
1.  **Sidebar (Left):**
    *   Collapsible.
    *   Logo: Orange square with Shield icon + text "TAUTAN".
    *   Menu Items: Dashboard, PIN Management, FIDO2 Accounts, Device Info, Security Tips, Cyber News, Support.
    *   Bottom: Logout button.
2.  **Header (Top):**
    *   Center text: "СТАТУС TAUTAN SECURE KEY: ПОДКЛЮЧЕН" (Green text).
    *   Hamburger menu for mobile.
3.  **Footer (Bottom of content):**
    *   Full-width orange bar with scrolling marquee text: "PROTECTED BY TSARKA AI SECURITY SOLUTIONS" (white text, uppercase).

**Page Content Requirements:**

*   **Dashboard View:**
    *   **Hero Card:** Big card showing device status "Device Active" (Green dot). Buttons: "Check Updates" (Orange) and "AI Analysis" (Ghost).
    *   **Quick Stats (Right):** "FIDO2 Records: 14", "Trust Level: MAXIMUM".
    *   **Features Grid (Bottom):** 3 cards explaining features: Encryption (Lock), WebAuthn (Fingerprint), Phishing Protection (Shield).

*   **PIN Management View:**
    *   Two columns.
    *   Left: Change PIN form (Current PIN, New PIN inputs).
    *   Right: Factory Reset block (Red border, warning text "All FIDO2 keys will be deleted", Red button).

*   **FIDO2 Accounts View:**
    *   List of mock accounts: Google, GitHub, Microsoft Azure.
    *   Each row should have a "Delete" (X) button.
    *   "Registration" button at top right. When clicked, switch to a "Wizard" view showing an animation "Touch your security key".

*   **Device Info View:**
    *   **System Logs:** A terminal-like box showing fake boot logs (e.g., "Secure Boot initialized...").
    *   **Specs:** Model "TT-SEC-X PRO", Serial "EDS88000FKZ78" (Green).

*   **AI Side Panel:**
    *   A drawer sliding from the right (`z-50`).
    *   Contains a mock chat interface with "TauTan AI Expert".
    *   Show a loading spinner animation when "consulting".

**Key Behaviors:**
*   Use `lucide-react` for all icons.
*   The "AI Analysis" button on Dashboard should open the AI Side Panel.
*   Ensure the design looks premium and "security-focused".
