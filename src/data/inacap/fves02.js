const courseData = {
  courseCode:"FVES02",
  courseTitle:"Inglés Habilitante",
  courseDescription:"Inglés Habilitante es una asignatura lectiva, del área formativa de formación para la empleabilidad dictada en modalidad presencial con componente online. Al finalizar este curso, el estudiante será capaz de comprender y usar expresiones comunes sobre temas cotidianos, comunicarse en situaciones rutinarias y describir aspectos básicos de su vida y entorno de acuerdo con el nivel A2 del Marco Común Europeo de Referencia para las Lenguas (MCER). En esta asignatura se aborda el clúster Trabajo Colaborativo y Comunicación Efectiva, con foco en el diálogo y el Ética y ciudadanía con foco en respeto a la diversidad.",
  professorData: {
    name:"Ignacio Fernando Salas Martínez",
    email:"ignacio.salas07@inacapmail.cl"
  },
  unitsData: [
    { 
      unit:'1',
      description:'Stories and Anecdotes'
    },
    { 
      unit:'2',
      description:'Goals, advice and changes'
    },
    { 
      unit:'3',
      description:'Future plans'
    },
  ],
  evaluationsData: [
    { 
      evaluationNumber:1,
      date:'Lun 31, Ago 2026',
      weighting:'20%', 
      description: {
        text:'Oral Presentation',
        href:''
      }
    },
    { 
      evaluationNumber:2,
      date:'Lun 28, Sep 2026',
      weighting:'30%', 
      description: {
        text:'Written test',
        href:''
      }
    },
    { 
      evaluationNumber:3,
      date:'Lun 05, Oct 2026',
      weighting:'35%', 
      description: {
      text:'Role play',
        href: ''
      }
    },
    { 
      evaluationNumber:4,
      date:'Lun 05, Oct 2026',
      weighting:'15%', 
      description:{
        text:'Online quizzes',
        href:''
      }
    },      
  ],
  classData: [
    { 
      week:'01', 
      class:'01', 
      date:'Lun 10, Ago 2026', 
      description:[
        {
          text:'First Class',
          href:'docs/first-class.pdf'
        },
        {
          text:'Past Simple',
          href:'https://www.youtube.com/watch?v=oIVmBfUfOHs'
        },
        {
          text:'Past Continuous',
          href:'https://www.youtube.com/watch?v=U9YK9XuPhrI'
        },
        {
          text:'Past Simple vs Past Continuous',
          href:'docs/ps-vs-pc.pdf'
        },
      ]
    },
    { 
      week:'01', 
      class:'02', 
      date:'Mar 11, Ago 2026', 
      description:[
        {
          text:'Assessment 01 - Instructions',
          href:'docs/assessment01.pdf'
        },
        {
          text:'Past Simple with/without to-be',
          href:'docs/pc-with-without-tobe.pdf'
        },
        {
          text:'Onion ring question: Past Simple',
          href:'docs/orq-past-simple.pdf'
        },
        {
          text: 'Onion ring question: Past Continuous',
          href:'docs/orq-past-continuous.pdf'
        },
      ]
    },
    { 
      week:'02', 
      class:'03', 
      date:'Lun 17, Ago 2026', 
      description:[
        {
          text:'Past Simple (Affirmative/Negative/Question)',
          href:'clase03'
        },
      ]
    },
    { 
      week:'02', 
      class:'04', 
      date:'Mar 18, Ago 2026', 
      description:[
        {
          text:'didn\'t attend',
          strikethrough:true
        },
      ]
    },
    { 
      week:'03', 
      class:'05', 
      date:'Lun 24, Ago 2026', 
      description:[
        {
          text:'Past Simple & Past Continuous Exercises',
          href:'clase05'
        },
      ]
    },
    { 
      week:'03', 
      class:'06', 
      date:'Mar 25, Ago 2026', 
      description:[
        {
          text:'Was/Were Questions',
          href:'clase06'
        }
      ]
    },
    { 
      week:'04', 
      class:'07', 
      date:'Lun 31, Ago 2026', 
      description: [
        {
          text:'Evaluation 01 (1)',
          href:''
        }
      ]
    },
    { 
      week:'04', 
      class:'08', 
      date:'Mar 01, Sep 2026', 
      description: [
        {
          text:'Evaluation 01 (2)',
          href:''
        }
      ]
    },
    { 
      week:'05', 
      class:'09', 
      date:'Lun 07, Sep 2026', 
      description:[
        {
          text:'There was/were',
          href:'clase09a'
        },
        {
          text:'How many/much',
          href:'clase09b'
        }
      ]
    },
    { 
      week:'05', 
      class:'10', 
      date:'Mar 08, Sep 2026', 
      description:[
        {
          text:'Extra points Evaluation 01',
          href:''
        },
        {
          text:'Audio Exercises',
          href:'clase10'
        },
      ]
    },
    { 
      week:'06', 
      class:'11', 
      date:'Lun 14, Sep 2026', 
      description:[
        {
          text:'Have to / can / should',
          href:'clase11a'
        },
        {
          text:'Exercises',
          href:'clase11b'
        }]
    },
    { 
      week:'06', 
      class:'12', 
      date:'Mar 15, Sep 2026', 
      description: [
        {
          text:'didn\'t attend',
          strikethrough:true
        },
      ]
    },
    { 
      week:'07', 
      class:'13', 
      date:'Lun 21, Sep 2026', 
      description: [
        {
          text:'Exercises',
          href:''
        },
      ]
    },
    { 
      week:'07', 
      class:'14', 
      date:'Mar 22, Sep 2026', 
      description: [
        {
          text:'Will / Going to', 
          href:''
        },
      ]
    },
    { 
      week:'08', 
      class:'15', 
      date:'Lun 28, Sep 2026', 
      description: [
        {
          text:'Evaluation 02',
          href:''
        },
      ]
    },
    { 
      week:'08', 
      class:'16', 
      date:'Mar 29, Sep 2026', 
      description: [
        {
          text:'Exercises',
          href:''
        },
      ]
    },
    { 
      week:'09', 
      class:'17', 
      date:'Lun 05, Oct 2026', 
      description: [
        {
          text:'Evaluation 03 (1)',
          href:''
        },
      ]
    },
    { 
      week:'09', 
      class:'18', 
      date:'Mar 06, Oct 2026', 
      description: [
        {
          text:'Evaluation 03 (2)',
          href:''
        },
      ]
    },
  ],
};

export default courseData;
