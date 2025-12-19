# Task: Implement Custom Modals & Flows
- [/] **Publish to GitHub** <!-- id: 59 -->
    - [ ] Initialize Git repository <!-- id: 60 -->
    - [ ] Commit alignment and auth page changes <!-- id: 61 -->
    - [ ] Push to new remote repository <!-- id: 62 -->

- [x] **Update Auth Page Icon** <!-- id: 56 -->
    - [x] Replace Lock icon with `bars_head.png` <!-- id: 57 -->
    - [x] Apply `#a771fe` color styling <!-- id: 58 -->

- [x] **Refine Auth Text Consistency** <!-- id: 54 -->
    - [x] Remove `lowercase` to match parent `uppercase` styling <!-- id: 55 -->

- [x] **Refine Auth Page Text** <!-- id: 51 -->
    - [x] Move "and here is why" to new line <!-- id: 52 -->
    - [x] Make font thinner <!-- id: 53 -->

- [x] **Update Auth Page Details** <!-- id: 48 -->
    - [x] Add "Registration" button <!-- id: 49 -->
    - [x] Update warning text with mock link "and here is why" <!-- id: 50 -->

- [x] **Align Sidebar Logos** <!-- id: 46 -->
    - [x] Adjust CSS to align logos to the left <!-- id: 47 -->

- [x] **Cleanup & Updates** <!-- id: 42 -->
    - [x] Remove "Registration" button from FIDO2 <!-- id: 43 -->
    - [x] Remove "Ask AI" and "AI Analysis" buttons <!-- id: 44 -->
    - [x] Change "Check Updates" button color to `#a771fe` <!-- id: 45 -->

- [x] **Implement News Widget** <!-- id: 38 -->
    - [x] Create horizontal banner component <!-- id: 39 -->
    - [x] Implement auto-rotating content logic <!-- id: 40 -->
    - [x] Apply `#a771fe` styling and neon effects <!-- id: 41 -->

- [x] **Fix Marquee Animation** <!-- id: 34 -->
    - [x] Update CSS Keyframes for seamless loop (0% -> -50%) <!-- id: 35 -->
    - [x] Duplicate content structure for infinite scroll <!-- id: 36 -->
    - [x] Ensure instant visibility on load <!-- id: 37 -->

- [x] **Implement Auth Page** <!-- id: 29 -->
    - [x] Create Auth View (Login + Passkey) with `#a771fe` accents <!-- id: 30 -->
    - [x] Integrate `render_type_c.png` <!-- id: 31 -->
    - [x] Handle "Exit" to show Auth Page (Mock Login) <!-- id: 32 -->
    - [x] Add "No Password" warning <!-- id: 33 -->

- [x] **Adjust Marquee Settings** <!-- id: 26 -->
    - [x] Set rotation to -2 degrees <!-- id: 27 -->
    - [x] Reduce ribbon height by 30% (minimize padding) <!-- id: 28 -->

- [x] **Tilt Marquee** <!-- id: 24 -->
    - [x] Apply 3 degree rotation to footer ribbon <!-- id: 25 -->

- [x] **Change Font to Inter** <!-- id: 21 -->
    - [x] Import Inter from Google Fonts <!-- id: 22 -->
    - [x] Update Tailwind config to use Inter <!-- id: 23 -->

- [x] **Add Logos to Sidebar** <!-- id: 18 -->
    - [x] Add Tsarka Labs logo (Design by) <!-- id: 19 -->
    - [x] Add Astana Hub logo (Member of) <!-- id: 20 -->

- [x] **Infrastructure**
    - [x] Create `Modal` component (Cyber Dark style) <!-- id: 1 -->
    - [x] Create `Toast` component (Notifications) <!-- id: 2 -->
    - [x] Create `useToast` hook <!-- id: 3 -->

- [x] **Feature: Firmware Update** <!-- id: 4 -->
    - [x] Implement state machine for Update flow <!-- id: 5 -->
    - [x] Create content for "Check Update" modal <!-- id: 6 -->
    - [x] Create content for "Install Wizard" steps (Touch, Progress, Success) <!-- id: 7 -->

- [x] **Feature: PIN Management** <!-- id: 8 -->
    - [x] Implement validation logic (Toast on empty/mismatch) <!-- id: 9 -->
    - [x] Implement "Success" modal <!-- id: 10 -->
    - [x] Implement "Error" modal (Attempts left) <!-- id: 11 -->

- [x] **Feature: Factory Reset** <!-- id: 12 -->
    - [x] Implement "Warning" modal (Yes/No) <!-- id: 13 -->
    - [x] Implement "Re-plug & Touch" steps <!-- id: 14 -->
    - [x] Implement "Success" modal <!-- id: 15 -->

- [x] **Integration & Polishing**
    - [x] Integrate all flows into `App.tsx` <!-- id: 16 -->
    - [x] Verify animations and responsiveness <!-- id: 17 -->
