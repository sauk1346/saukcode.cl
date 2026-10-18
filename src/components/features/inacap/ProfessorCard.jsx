import React from 'react';
import { User } from 'lucide-react';
import { SmartLink } from '@/components/ui/SmartLink';
import styles from './ProfessorCard.module.css';

const ProfessorCard = ({ professorData }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h2 className={styles.cardTitle}>
          <User size={20} />
          Profesor
        </h2>
      </div>
      
      <div className={styles.cardBody}>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>Nombre:</span>
          <span>{professorData.name}</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>Email:</span>
          <SmartLink href={`mailto:${professorData.email}`}>
            {professorData.email}
          </SmartLink>
        </div>
      </div>
    </div>
  );
};

export default ProfessorCard;