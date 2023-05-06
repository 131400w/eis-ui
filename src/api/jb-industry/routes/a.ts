export default {
  routes: [
    {
      method: 'POST',
      path: '/jbIndustry/addJBWork',
      handler: 'jb-industry.addJBWork',
    },
    {
      method: 'GET',
      path: '/jbIndustry/findJBWorkTree',
      handler: 'jb-industry.findJBWorkTree',
    },
  ],
};