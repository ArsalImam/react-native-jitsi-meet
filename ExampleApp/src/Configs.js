const Configs = {

  // baseUrl: 'http://high.rep.digitrends.pk/api/',
  //  baseUrl: 'http://192.168.100.24:3001/api/',


  // baseUrl: 'http://192.168.8.100:3001/api/',

  // baseUrl: 'http://192.168.100.41:3001/api/',
  // baseUrl: 'http://18.140.239.105:3001/api/',

   baseUrl: 'http://18.141.195.188:3001/api/',
  // baseUrl: 'https://api.evotelemedicine.live/api/',

  //   baseUrl: 'http://192.168.0.107:3001/api/',

  //

  containers: {
    fileUploads: 'content',
    imageUpload :'images'
  },
};

const Roles = {
  doctor: 'MEDICAL_SPECIALIST',
  patient: 'ROLE_PATIENT',
  assistant: 'ROLE_ASSISTANT',
};

const AppointmentStatus = {
  completed: 'Completed',
  scheduled: 'Scheduled',
  available: 'Waiting',
};

export { Configs, Roles, AppointmentStatus };
