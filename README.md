# Recipe SaaS Application with StackOne Integration

This application is a demonstration of how to integrate the StackOne unified API into a SaaS application for managing multiple ATS (Applicant Tracking System) providers. It serves as a guide for developers looking to streamline their application development by leveraging StackOne's capabilities to manage services like HRIS, ATS, LMS, IAM, CRM, and Marketing.

![STACKONE README](https://github.com/user-attachments/assets/fff5f9f0-95c1-453e-a690-cc96bfdaa758)


## Application Overview

This web application showcases two primary user interfaces:

1.  **Candidate View**:

*   Candidates can browse and apply for jobs.
*   Submitted applications are stored in the selected ATS provider's system, such as Greenhouse.

2.  **HR View**:

*   HR professionals can view posted jobs and receive applications.
*   HRs have the flexibility to select any ATS provider to manage job postings and applications.
*   This interface allows HR to add multiple ATS providers using a unified StackOne API. 

## Tech Stack

*   **Frontend**: React, Tailwind CSS
*   **Language**: typescript
*   **Backend**: Node.js, Express
*   **API Integration**: StackOne API

## Getting Started

### Prerequisites

Ensure you have the following prerequisites:

*   Node.js installed
*   Any IDE provider like VS Code
*   Understanding of Typescript

### Installation

Follow these steps to set up and run the application locally:

1.  **Clone the Repository**:
```
git clone https://github.com/<your-username>/<repo-name>.git
```
2.  **Backend Setup**:

*  Navigate to the backend directory and create a `.env` file, and add the following variables:
```
PORT=3001
STACKONE_API_KEY="<your-stackone-api-key>"
```
*   Install dependencies for the backend:
```
npm install
```
3.  **Frontend Setup**:

*   Navigate to the frontend directory and create a `.env` file, and add the following variable:

```
API_END_POINT=<your-frontend-end-point>
```
*   Install dependencies:
```
npm install
```
4.  **Run the Application**:
*   Navigate to the root directory of the application:
```
npm start
```
*   The application should now be running on `http://localhost:<your-frontend-end-point>`
