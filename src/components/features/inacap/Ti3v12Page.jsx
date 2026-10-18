import React from 'react';
import { FileText, Book } from 'lucide-react';
import ProfessorCard from './ProfessorCard';
import { SmartLink } from '../../ui/SmartLink';
import courseData from '@/data/inacap/ti3v12';
import styles from './Ti3v12.module.css';

const classPDFs = [
    { label: 'Clase 01', href: '/inacap/ti3v12/docs/clase01.pdf' },
    { label: 'Clase 02', href: '/inacap/ti3v12/docs/clase02.pdf' },
    { label: 'Clase 03', href: '/inacap/ti3v12/docs/clase03.pdf' },
    { label: 'Clase 04', href: '/inacap/ti3v12/docs/clase04.pdf' },
    { label: 'Clase 05', href: '/inacap/ti3v12/docs/clase05.pdf' },
    { label: 'Clase 06', href: '/inacap/ti3v12/docs/clase06.pdf' },
    { label: 'Clase 07', href: '/inacap/ti3v12/docs/clase07.pdf' },
    { label: 'Clase 08', href: '/inacap/ti3v12/docs/clase08.pdf' },
];

export default function Ti3v12Page() {
    return (
        <div className={styles.container}>
            <div className={`pixel-box ${styles.header}`}>
                <p className={styles.subheading}>{courseData.courseCode}</p>
                <h1 className={styles.title}>{courseData.courseTitle}</h1>
                <p className={styles.description}>{courseData.courseDescription}</p>
            </div>

            <div className={styles.content}>
                <ProfessorCard professorData={courseData.professorData} />

                <div className={`pixel-box ${styles.card}`}>
                    <div className={styles.cardHeader}>
                        <h2 className={styles.cardTitle}>
                            <FileText size={20} />
                            Material de Clases
                        </h2>
                    </div>
                    <div className={styles.cardBody}>
                        <div className={styles.pdfGrid}>
                            {classPDFs.map(({ label, href }) => (
                                <SmartLink key={label} href={href} className={styles.pdfLink}>
                                    {label}
                                </SmartLink>
                            ))}
                        </div>
                    </div>
                </div>

                <div className={`pixel-box ${styles.card}`}>
                    <div className={styles.cardHeader}>
                        <h2 className={styles.cardTitle}>
                            <Book size={20} />
                            Resumen
                        </h2>
                    </div>
                    <div className={styles.cardBody}>
                        <SmartLink href="/inacap/ti3v12/guia">
                            Guía Resumen SQL Server
                        </SmartLink>
                    </div>
                </div>
            </div>
        </div>
    );
}
