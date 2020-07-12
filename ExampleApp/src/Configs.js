const Configs = {

  // baseUrl: 'http://high.rep.digitrends.pk/api/',
  //  baseUrl: 'http://192.168.100.24:3001/api/',


  // baseUrl: 'http://192.168.8.100:3001/api/',

  // baseUrl: 'http://192.168.100.41:3001/api/',
  // baseUrl: 'http://18.140.239.105:3001/api/',
  baseUrl: 'http://18.141.195.188/api/',
  // baseUrl: 'https://api.evotelemedicine.live/api/',

  //    baseUrl: 'http://192.168.0.106:3001/api/',
  //

  containers: {
    fileUploads: 'content',
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
// "Waiting",
//         "Unscheduled",
//         "Completed",
//         "Cancelled",
//         "Missed",
//         "In progress",
//         "Scheduled"

export {Configs, Roles, AppointmentStatus};
