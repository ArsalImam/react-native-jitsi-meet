const Configs = {

  // baseUrl: 'http://high.rep.digitrends.pk/api/',
  //  baseUrl: 'http://192.168.100.24:3001/api/',

  // 192.168.100.47
  //baseUrl: 'http://192.168.8.100:3001/api/',

 // baseUrl: 'http://192.168.100.47:3001/api/',
  // baseUrl: 'http://51.83.237.63:3001/api/',
  
  baseUrl: 'http://18.140.243.171:3001/api/',
  // baseUrl: 'https://api.evotelemedicine.live/api/',

//      baseUrl: 'http://192.168.100.106:3001/api/',
  //

  containers: {
    fileUploads: 'content',
    images:'images'
  },
};

const Roles = {
  doctor: 'MEDICAL_SPECIALIST',
  patient: 'ROLE_PATIENT',
  assistant: 'ROLE_ASSISTANT',
  admin: 'ADMIN',
};

const AppointmentStatus = {
  completed: 'Completed',
  scheduled: 'Scheduled',
  available: 'Waiting',
};

export { Configs, Roles, AppointmentStatus };
