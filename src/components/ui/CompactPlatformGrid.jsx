import React from 'react';
import Image from 'next/image';
import styles from './CompactPlatformGrid.module.css';

export const CompactPlatformGrid = ({ 
  platforms, 
  platformsData, 
  selectedPlatform, 
  onPlatformClick,
  imageField = "image"  // Cambié de "logo" a "image"
}) => {
  return (
    <div className={styles.gridContainer}>
      <div className={styles.platformGrid}>
        {platforms.map((platformKey) => {
          const platform = platformsData[platformKey];
          const isSelected = selectedPlatform === platformKey;
          const image = platform[imageField] || platform.image || platform.logo;
          
          return (
            <div
              key={platformKey}
              className={`${styles.platformCard} ${isSelected ? styles.selectedCard : ''}`}
              onClick={() => onPlatformClick(platformKey)}
              title={platform.name} // Tooltip nativo
            >
              <div className={styles.cardContent}>
                <div className={styles.imageContainer}>
                  <Image
                    src={image}
                    alt={platform.name}
                    width={55}  // Cambié de 70 a 55
                    height={55} // Cambié de 70 a 55
                    className={styles.platformImage}
                  />
                </div>
                
                {/* Indicador de selección */}
                {isSelected && (
                  <div className={styles.selectionIndicator}>
                    <div className={styles.checkmark}>✓</div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};