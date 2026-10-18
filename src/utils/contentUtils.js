import fs from 'fs';
import path from 'path';

const contentDirectory = path.join(process.cwd(), 'src/content');

/**
 * Extrae todos los slugs de un objeto de datos de curso
 * Funciona con courseData de INACAP, bootcamp data, y elearning data
 */
export function extractSlugsFromCourseData(courseData) {
    const slugs = new Set();

    const extractFromArray = (array) => {
        array?.forEach(item => {
            // Para arrays de description con href
            item.description?.forEach?.(desc => {
                if (desc.href) {
                    const slug = desc.href.split('/').pop();
                    if (slug) slugs.add(slug);
                }
            });

            // Para description directa con href (evaluaciones)
            if (item.description?.href) {
                const slug = item.description.href.split('/').pop();
                if (slug) slugs.add(slug);
            }

            // Para quick guides
            item.quickGuide?.forEach?.(guide => {
                if (guide.href) {
                    const slug = guide.href.split('/').pop();
                    if (slug) slugs.add(slug);
                }
            });

            // Para classes dentro de modules (estructura CftTable)
            item.classes?.forEach?.(cls => {
                if (cls.link) {
                    const slug = cls.link.split('/').pop();
                    if (slug) slugs.add(slug);
                }
                if (cls.exercises?.link) {
                    const slug = cls.exercises.link.split('/').pop();
                    if (slug) slugs.add(slug);
                }
            });

            // Para secciones de elearning
            item.sections?.forEach?.(section => {
                if (section.link) {
                    const slug = section.link.split('/').pop();
                    if (slug) slugs.add(slug);
                }
            });
        });
    };

    // Extrae de diferentes estructuras de datos
    extractFromArray(courseData.classData);
    extractFromArray(courseData.lectureData);
    extractFromArray(courseData.evaluationsData);
    extractFromArray(courseData.modules); // Para CftTable
    extractFromArray(courseData.units); // Para algunas estructuras

    return Array.from(slugs).filter(Boolean);
}

/**
 * Obtiene todos los slugs disponibles para un curso específico
 * Basado en el filesystem (más confiable)
 */
export function getLessonSlugs(section, platform, courseId) {
    const courseDir = path.join(contentDirectory, section, platform || '', courseId);

    if (!fs.existsSync(courseDir)) {
        return [];
    }

    return fs
        .readdirSync(courseDir)
        .filter(file => file.endsWith('.mdx'))
        .map(file => file.replace(/\.mdx$/, ''));
}

/**
 * Obtiene todos los pares de parámetros para una sección
 * Para uso con generateStaticParams
 */
export function getAllLessonPaths(section, platforms = []) {
    const sectionDir = path.join(contentDirectory, section);

    if (!fs.existsSync(sectionDir)) {
        return [];
    }

    const paths = [];

    if (platforms.length === 0) {
        // Sin plataformas (como INACAP)
        const courses = fs.readdirSync(sectionDir);

        for (const courseId of courses) {
            const courseDir = path.join(sectionDir, courseId);
            if (!fs.statSync(courseDir).isDirectory()) continue;

            const slugs = getLessonSlugs(section, null, courseId);
            slugs.forEach(slug => {
                paths.push({ courseId, slug });
            });
        }
    } else {
        // Con plataformas (como bootcamp/elearning)
        for (const platform of platforms) {
            const platformDir = path.join(sectionDir, platform);
            if (!fs.existsSync(platformDir)) continue;

            const courses = fs.readdirSync(platformDir);

            for (const courseId of courses) {
                const courseDir = path.join(platformDir, courseId);
                if (!fs.statSync(courseDir).isDirectory()) continue;

                const slugs = getLessonSlugs(section, platform, courseId);
                slugs.forEach(slug => {
                    paths.push({ platform, courseId, slug });
                });
            }
        }
    }

    return paths;
}

/**
 * Valida si una lección existe
 */
export function lessonExists(section, platform, courseId, slug) {
    const lessonPath = path.join(
        contentDirectory,
        section,
        platform || '',
        courseId,
        `${slug}.mdx`
    );
    return fs.existsSync(lessonPath);
}

/**
 * Obtiene la ruta de importación para un MDX
 */
export function getMDXImportPath(section, platform, courseId, slug) {
    if (platform) {
        return `@/content/${section}/${platform}/${courseId}/${slug}.mdx`;
    }
    return `@/content/${section}/${courseId}/${slug}.mdx`;
}
