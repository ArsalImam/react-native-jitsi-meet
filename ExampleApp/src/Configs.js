const Configs = {
  // Local Server
  // baseUrl: 'http://192.168.100.96:4001/api/',
  // Muber Url
  // baseUrl: 'http://122.248.255.5:3001/api/',
 
  baseUrl: 'http://18.140.180.234:3001/api/',
  mediaUrl: 'https://api.etibb.online/api/',
  baseUrlForee: 'https://api.etibb.online/api/',
  foreeUrl: `https://www.etibb.online/assets/html/foree.html`,

  containers: {
    fileUploads: 'content',
    images: 'etibb',
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

export {Configs, Roles, AppointmentStatus};