const Configs = {
   // baseUrl: 'http://high.rep.digitrends.pk/api/',
    baseUrl: 'http://192.168.1.103:3001/api/',
        // baseUrl: 'http://192.168.100.22:3001/api/',
        // baseUrl: 'https://api.evotelemedicine.live/api/',

     //    baseUrl: 'http://18.140.239.105:3001/api/',


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
