const Configs = {
   // baseUrl: 'http://high.rep.digitrends.pk/api/',
    baseUrl: 'http://192.168.8.100:3001/api/',
        // baseUrl: 'http://192.168.100.22:3001/api/',
        // baseUrl: 'https://api.evotelemedicine.live/api/',

     //    baseUrl: 'http://192.168.0.106:3001/api/',


    containers: {
        fileUploads: 'content',
    }
};

const Roles = {
  doctor: "MEDICAL_SPECIALIST",
  patient: "ROLE_PATIENT",
  assistant: "ROLE_ASSISTANT",
}

export {Configs, Roles};
