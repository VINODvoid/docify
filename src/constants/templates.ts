const Templates = [
  {
    id: 'blank',
    label: 'Blank Document',
    imageUrl: '/blank-document.svg',
    initialContent:``,
  },
  {
    id: 'letter',
    label: 'Letter',
    imageUrl: '/letter.svg',
    initialContent:`
    <h1>[Your Name]</h1>
    <p>[Your Address]</p>
    <p>[City, State, ZIP Code]</p>
    <p>[Email Address]</p>
    <p>[Phone Number]</p>
    <p>[Date]</p>
    <p>[Recipient's Name]</p>
    <p>[Recipient's Title]</p>
    <p>[Company Name]</p>
    <p>[Company Address]</p>
    <p>[City, State, ZIP Code]</p>

    <h2>Subject: [Subject of the Letter]</h2>

    <p>Dear [Recipient's Name],</p>

    <p>[Introduction: State the purpose of the letter.]</p>

    <p>[Body: Provide details, explanations, or information relevant to the purpose of the letter.]</p>

    <p>[Conclusion: Summarize the main points and state any desired outcomes or actions.]</p>

    <p>Sincerely,</p>
    <p>[Your Name]</p>
    `,
  },
  {
    id: 'resume',
    label: 'Resume',
    imageUrl: '/resume.svg',
    initialContent:`
    <h1>[Your Name]</h1>
    <p>[Your Address] | [City, State, ZIP Code] | [Email Address] | [Phone Number]</p>

    <h2>Objective</h2>
    <p>[A brief statement about your career goals and what you aim to achieve in your next position.]</p>

    <h2>Experience</h2>
    <h3>[Job Title] - [Company Name]</h3>
    <p>[Start Date] - [End Date]</p>
    <ul>
      <li>[Responsibility or achievement]</li>
      <li>[Responsibility or achievement]</li>
      <li>[Responsibility or achievement]</li>
    </ul>

    <h2>Education</h2>
    <h3>[Degree] - [Institution Name]</h3>
    <p>[Graduation Date]</p>
    <ul>
      <li>[Relevant coursework or honors]</li>
    </ul>

    <h2>Skills</h2>
    <ul>
      <li>[Skill 1]</li>
      <li>[Skill 2]</li>
      <li>[Skill 3]</li>
    </ul>

    <h2>Certifications</h2>
    <ul>
      <li>[Certification Name] - [Issuing Organization] - [Date]</li>
    </ul>
    `,
  },
  {
    id:"software-proposal",
    label:"Software Development Proposal",
    imageUrl:"/software-proposal.svg",
    initialContent:`
    <h1>Software Development Proposal</h1>
    <h2>Project Overview</h2>
    <p>Provide a brief description of the project, its goals, and objectives.</p>
    <h2>Scope of Work</h2>
    <ul>
      <li>Define the features and functionalities to be developed.</li>
      <li>Outline the deliverables and milestones.</li>
    </ul>
    <h2>Timeline</h2>
    <p>Provide an estimated timeline for the project, including key phases and deadlines.</p>
    <h2>Budget</h2>
    <p>Outline the estimated costs associated with the project, including development, testing, and deployment.</p>
    <h2>Team</h2>
    <p>Introduce the development team and their roles in the project.</p>
    <h2>Terms and Conditions</h2>
    <p>Specify any terms and conditions related to the project execution.</p>
    <h2>Acceptance</h2>
    <p>Provide a section for client acceptance and signatures.</p>
    `,
  },
  {
    id:"project-proposal",
    label:"Project Proposal",
    imageUrl:"/project-proposal.svg",
    initialContent:`
    <h1>Project Proposal</h1>
    <h2>Introduction</h2>
    <p>Provide an overview of the project and its significance.</p>
    <h2>Objectives</h2>
    <ul>
      <li>List the main objectives of the project.</li>
    </ul>
    <h2>Methodology</h2>
    <p>Describe the approach and methods to be used in the project.</p>
    <h2>Timeline</h2>
    <p>Outline the proposed timeline for project completion.</p>
    <h2>Budget</h2>
    <p>Provide an estimated budget for the project.</p>
    <h2>Conclusion</h2>
    <p>Summarize the key points and express enthusiasm for the project.</p>
    `,
  },

  {
    id:"business-letter",
    label:"Business Letter",
    imageUrl:"/business-letter.svg",
    initialContent:`
    <h1>Business Letter</h1>
    <p>[Your Name]</p>
    <p>[Your Address]</p>
    <p>[City, State, ZIP Code]</p>
    <p>[Email Address]</p>
    <p>[Phone Number]</p>
    <p>[Date]</p>
    <p>[Recipient's Name]</p>
    <p>[Recipient's Title]</p>
    <p>[Company Name]</p>
    <p>[Company Address]</p>
    <p>[City, State, ZIP Code]</p>

    <h2>Subject: [Subject of the Letter]</h2>

    <p>Dear [Recipient's Name],</p>

    <p>[Introduction: State the purpose of the letter.]</p>

    <p>[Body: Provide details, explanations, or information relevant to the purpose of the letter.]</p>

    <p>[Conclusion: Summarize the main points and state any desired outcomes or actions.]</p>

    <p>Sincerely,</p>
    <p>[Your Name]</p>
    `,
  },
  {
    id:"cover-letter",
    label:"Cover Letter",
    imageUrl:"/cover-letter.svg",
    initialContent:`
    <h1>Cover Letter</h1>
    <p>[Your Name]</p>
    <p>[Your Address]</p>
    <p>[City, State, ZIP Code]</p>
    <p>[Email Address]</p>
    <p>[Phone Number]</p>
    <p>[Date]</p>
    <p>[Recipient's Name]</p>
    <p>[Recipient's Title]</p>
    <p>[Company Name]</p>
    <p>[Company Address]</p>
    <p>[City, State, ZIP Code]</p>

    <h2>Subject: Application for [Job Title] Position</h2>

    <p>Dear [Recipient's Name],</p>

    <p>[Introduction: State the position you are applying for and how you learned about it.]</p>

    <p>[Body: Highlight your qualifications, experiences, and skills that make you a suitable candidate for the position.]</p>

    <p>[Conclusion: Express enthusiasm for the  position and request an interview or further discussion.]</p>

    <p>Sincerely,</p>
    <p>[Your Name]</p>
    `,
  },

];


export default Templates;
