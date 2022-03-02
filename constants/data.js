const userData = {
  githubUsername: 'adrianvillanueva997',
  name: 'Adrián Villanueva Martínez',
  designation: 'Software Engineer',
  avatarUrl: '/avatar.png',
  email: 'adrian.villanueva.martinez@outlook.com',
  phone: '',
  address: 'Currently in Amsterdam, from Spain.',

  about: {
    title:
      "I'm a software engineer who loves building products and tinkering with new technologies!",
    description: [
      `Hello there! I have always been interested in science and technology since I was a child. I fullfiled my dream to become a Software Engineer after finishing my degree in 2021. Currently I am located in Amsterdam, Netherlands.
      I was born and lived and studied in Spain. 
      I consider myself a curious person, I like to research and try new tools, right now I am very interested in learning more about DevOps and developing more software making use of Go and Rust. I am very excited for the future and eager to 
      learn and get more experience!`,
    ],
    currentProject: 'Xccelerated, part of Xebia',
    currentProjectUrl: 'https://xccelerated.io',
  },

  experience: [
    {
      title: 'Data Engineer',
      company: 'Xccelerated, part of Xebia - NL',
      year: 'Feb 2022',
      companyLink: 'https://xccelerated.io',
      desc: '',
    },
    {
      title: 'Data Engineer',
      company: 'Dashmote - NL',
      year: 'Sept 2021 - Feb 2022',
      companyLink: 'https://dashmote.com',
      desc: 'At dashmote I created IaC scripts on terraform to deploy different services on AWS. Designed and deployed a full datalake on Athena. Redesigned the whole CI/CD strategy at the company\n. Maintaining old legacy Airflow components on Python. Deploying, optimising and developing production ready docker images.      ',
    },
    {
      title: 'IT Support',
      company: 'Indra - ES',
      year: 'Jun-Sept 2021',
      companyLink: 'https://indracompany.com/',
      desc: 'At Indra I developed an internal tool to manage multiple VPS through SSH in Java as well as taking care of the infrastructure, provisioning and reliability',
    },
    {
      title: 'Intern Software Developer',
      company: 'EY - ES',
      year: '2019-2020',
      companyLink: 'https://ey.com',
      desc: 'At EY I developed internal client ETL tools to manage multiple data pipelines into a single reliable source. Built and prototyped a Machine Learning tool to predict treasury movements. Built another ETL tool to scrape information from a third party API to complement data from internal treasury sources and later on display this information in fancy dashboards. Developed and deployed different internal web tools and developed SQL dashboards on Sage X3',
    },
  ],
  resumeUrl: 'https://www.linkedin.com/in/adrian-villanueva-martinez/',
  socialLinks: {
    blog: 'https://blog.adrianvillanueva.com',
    twitter: 'https://twitter.com/adrianvm_97',
    linkedin: 'https://www.linkedin.com/in/adrian-villanueva-martinez/',
    github: 'https://github.com/adrianvillanueva997',
  },
};

export default userData;
