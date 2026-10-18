import { subsections } from '@/data/ejercicios/subsections';
import { problems as leetcodeProblems } from '@/data/ejercicios/leetcode/problems';
import { categories as leetcodeCategories } from '@/data/ejercicios/leetcode/categories';
import { problems as javaProblems } from '@/data/ejercicios/java/problems';
import { categories as javaCategories } from '@/data/ejercicios/java/categories';

// Mapa subseccion -> { problems, categories }. Cada subsección nueva
// (python, java...) solo necesita agregar su entrada aquí y su metadata
// en src/data/ejercicios/subsections.js.
const subsectionDataMap = {
    leetcode: {
        problems: leetcodeProblems,
        categories: leetcodeCategories,
    },
    java: {
        problems: javaProblems,
        categories: javaCategories,
    },
};

/**
 * Arma los datos completos (metadata + problems + categories) de todas
 * las subsecciones, para el grid de índice de /ejercicios.
 */
export function getSubsectionsData() {
    const result = {};
    for (const key of Object.keys(subsections)) {
        if (!subsectionDataMap[key]) continue;
        result[key] = {
            ...subsections[key],
            ...subsectionDataMap[key],
        };
    }
    return result;
}

/**
 * Datos de un ejercicio específico dentro de una subsección.
 */
export function getExerciseData(subseccion, slug) {
    const data = subsectionDataMap[subseccion];
    if (!data) return null;
    return data.problems[slug.toUpperCase()];
}

/**
 * Todos los pares {subseccion, slug} para generateStaticParams.
 */
export function getAllExercisePaths() {
    const paths = [];
    for (const [subseccion, data] of Object.entries(subsectionDataMap)) {
        for (const slug of Object.keys(data.problems)) {
            paths.push({ subseccion, slug: slug.toLowerCase() });
        }
    }
    return paths;
}
