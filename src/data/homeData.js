export const homeData = {
  programacion: {
    id: "programacion",
    title: "Programación",
    description: "Apuntes y recursos de aprendizaje",
    cardsData: {
      inacap: {
        name: "Ing. Informática",
        description: "Semestres",
        image: "/logos/inacap_logo.png",
        link: "/inacap"
      },
      ejercicios: {
        name: "Ejercicios",
        description: "Ej. Programación",
        image: "/logos/codeTraining.png",
        link: "/ejercicios"
      },
    }
  }
};

// Array con todas las secciones en orden
export const sectionsOrder = [
  homeData.programacion
];