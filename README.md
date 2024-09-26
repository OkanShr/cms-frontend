# CMS Frontend (Xeramed Client Management System)

This is the frontend for the Xeramed Client Management System, a web-based application to manage clients, appointments, documents, and image comparisons for medical or cosmetic treatments. The frontend is built using React.js with Vite for fast builds, Redux for state management, and Tailwind CSS for styling.

## Table of Contents


## Features

- User Authentication: Login page redirects to the dashboard if the user has a valid token.
- Client Management: Add, edit, and view clients.
- Document Upload: Attach and view client documents using a document viewer.
- Image Gallery: Upload images, and compare before/after images with a slider.
- Appointment Management: Add past appointments and automatically generate appointment summary in a .docx format.
- Dashboard: Summarizes important information for easy access.

## Installation

Follow these steps to install and set up the project locally:

1. Clone the repository:

```bash
git clone https://github.com/yourusername/cms-frontend.git
cd cms-frontend
```

2. Install dependencies: Ensure you have Node.js installed. Then run:

```bash
npm install
```

3. Set up API_BASE_URL in src/api/constants.js: 
```env 
export const API_BASE_URL = "http://localhost:8080";
```

4. Run the application
```bash
npm run dev

```

The application will be running at http://localhost:3000/.


## Folder Structure

The main folders in the project are:

- src/: Contains the source code for the frontend.
    - components/: Reusable UI components.
    - pages/: Different pages (Login, Client Dashboard, etc.).
    - store/: Redux store configuration.
    - api/: Api endpoints
    - assets/: images or files used in application
    - App.jsx: Main application component with routing setup.


## Styling

The app uses Tailwind CSS for styling alongside Bootstrap components in some cases. Styles are written in a utility-first approach, and custom styles are added in src/App.css.

To modify styles:

- Update Tailwind CSS configurations in tailwind.config.js.
- Add custom styles in src/index.css.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
