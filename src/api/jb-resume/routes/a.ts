export default {
  routes: [
    {
      method: 'GET',
      path: '/jbResume/findResumePerson',
      handler: 'jb-resume.findResumePerson',
    },
    {
      method: 'POST',
      path: '/jbResume/addResumeOne',
      handler: 'jb-resume.addResumeOne',
    }
  ],
};