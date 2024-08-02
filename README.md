# Recipe ATS application with StackOne Integration

This application is a demonstration of how to integrate the StackOne unified API into a SaaS application for managing multiple ATS (Applicant Tracking System) providers. It serves as a guide for developers looking to streamline their application development by leveraging StackOne's capabilities to manage services like HRIS, ATS, LMS, IAM, CRM, and Marketing.

![STACKONE-png-v2](https://github.com/user-attachments/assets/ccc11adc-d463-49af-a549-b80257aa44b4)


## Application Overview

This web application showcases two primary user interfaces:

1.  **Candidate View**:

*   Candidates can browse and apply for jobs.
*   Submitted applications are stored in the selected ATS provider's system, such as Greenhouse.

2.  **HR View**:

*   HR professionals can view posted jobs and receive applications.
*   HRs have the flexibility to select any ATS provider to manage job postings and applications.
*   This interface allows HR to add multiple ATS providers using a unified StackOne API.
  
<img width="1512" alt="ats-stackone-app" src="https://github.com/user-attachments/assets/15e3359b-3dbb-4512-8f3c-071e95624c45">

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
### Lint
This project uses ESLint for static code analysis.

Lint the project:
```
npx eslint .
```
## StackOne API Documentation
For detailed information on the StackOne API endpoints used in this project, please refer to the official StackOne API documentation:

- [Connect your Front-End via the StackOne React Hub](https://docs.stackone.com/docs/embedding-the-stackone-hub)
- [Connect your Backend with StackOne](https://docs.stackone.com/docs/connect-your-backend-with-stackone-api)
- [Create Connect Session](https://docs.stackone.com/reference/stackone_create_connect_session)
- [List all Accounts Endpoint](https://docs.stackone.com/reference/stackone_list_linked_accounts)
- [List all Applications Endpoint](https://docs.stackone.com/reference/ats_list_applications)
- [List all Jobs Endpoint](https://docs.stackone.com/reference/ats_list_jobs)
- [List all Job Postings Endpoint](https://docs.stackone.com/reference/ats_list_job_postings)
- [Create an Application Endpoint](https://docs.stackone.com/reference/ats_create_application)

