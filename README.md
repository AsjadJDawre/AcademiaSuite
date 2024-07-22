install two extensions 
1. SQLite Viewer v0.5.10 Florian Klampfer qwtel.com
2. SQLite v0.14.1 alexcvzz 

# AcademiaSuite

AcademiaSuite is an offline application designed to manage academic processes and convert DBF files to Excel. It features a user-friendly interface built with React and uses SQLite for local data storage. The application supports various functionalities, including managing subject information and displaying academic data.

## Features

- **Subject Management**: Create, edit, and manage subject details including year, pattern, semester, subject, branch, and course credits.
- **Data Conversion**: Convert DBF files to Excel format for easy data management.
- **Academic Information Display**: View and manage academic information such as marks, passing criteria, and course credits.
- **Offline Access**: Fully functional offline application with local SQLite database.

## Technologies Used

- **Frontend**:
  - **React**: A JavaScript library for building user interfaces.
  - **Create React App**: A tool to set up a React project with a good default configuration.
  - **CSS**: For styling the application.

- **Backend**:
  - **SQLite**: A lightweight, local database engine used for data storage.

- **Additional Tools**:
  - **Electron.js**: Framework for building cross-platform desktop applications with JavaScript, HTML, and CSS.
  - **Node.js**: JavaScript runtime used to manage project dependencies and run scripts.
  - **Git**: Version control system for tracking changes and collaborating with team members.

## Installation

1. **Clone the Repository**:

   
   git clone https://github.com/AsjadJDawre/AcademiaSuite.git
   cd AcademiaSuite/Frontend/academiasuite
2. **Install Dependencies:**
    npm install

3.**Run the Application:** Start the development server and open the application in your default web browser:

4. **Run as a Desktop Application:**

To start the application as a desktop application using Electron, use the following command:

npm run electron:serve