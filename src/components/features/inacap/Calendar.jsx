'use client';

import React, { useState, useEffect } from 'react';
import styles from './Calendar.module.css';

const Calendar = ({ eventos = [] }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedDayEvents, setSelectedDayEvents] = useState([]);

  // Efecto para detectar dispositivos móviles
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // Cambié de 480 a 1024
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Obtener días del mes actual
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    let firstDayOfMonth = new Date(year, month, 1).getDay();
    firstDayOfMonth = firstDayOfMonth === 0 ? 7 : firstDayOfMonth;
    firstDayOfMonth -= 1;
    
    const days = [];
    
    // Días del mes anterior
    const prevMonthDays = new Date(year, month, 0).getDate();
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, prevMonthDays - i),
        isCurrentMonth: false
      });
    }
    
    // Días del mes actual
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true
      });
    }
    
    // Días del mes siguiente
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false
      });
    }
    
    return days;
  };

  const days = getDaysInMonth(currentDate);
  
  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  
  const dayNames = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    setSelectedDay(null);
    setSelectedDayEvents([]);
    setShowModal(false);
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    setSelectedDay(null);
    setSelectedDayEvents([]);
    setShowModal(false);
  };

  const formatDateKey = (date) => {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  };

  const getEventosDelDia = (day) => {
    if (!day) return [];
    
    const dateKey = formatDateKey(day.date);
    return eventos.filter(evento => evento.fecha === dateKey);
  };

  const selectDay = (day) => {
    // Si es el mismo día, deseleccionar
    if (selectedDay && 
        selectedDay.date.getTime() === day.date.getTime()) {
      setSelectedDay(null);
      setSelectedDayEvents([]);
      setShowModal(false);
      return;
    }

    setSelectedDay({...day});
    const eventsForDay = getEventosDelDia(day);
    setSelectedDayEvents(eventsForDay);
    
    if (isMobile) {
      setShowModal(true);
    }
  };

  const hasEvents = (day) => {
    return getEventosDelDia(day).length > 0;
  };

  const isToday = (date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  const isSelectedDay = (day) => {
    return selectedDay && 
           selectedDay.date.getTime() === day.date.getTime();
  };
  
  const formatDetailDate = (date) => {
    const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    return `${dayNames[date.getDay()]}, ${date.getDate()} de ${monthNames[date.getMonth()]}`;
  };
  
  // FUNCIÓN MODIFICADA: Ahora también deselecciona el día
  const closeModal = () => {
    setShowModal(false);
    // CLAVE: También deseleccionar el día al cerrar el modal
    setSelectedDay(null);
    setSelectedDayEvents([]);
  };

  const closeDetails = () => {
    setSelectedDay(null);
    setSelectedDayEvents([]);
  };

  const renderDayDetails = () => {
    if (!selectedDay) {
      return (
        <div className={styles.dayDetails}>
          <div className={styles.noEvents}>
            Selecciona un día para ver sus eventos
          </div>
        </div>
      );
    }
    
    return (
      <div className={styles.dayDetails}>
        <h3 className={styles.dayDetailsTitle}>
          {formatDetailDate(selectedDay.date)}
          <button 
            className={styles.closeDetailsButton}
            onClick={closeDetails}
            aria-label="Cerrar detalles"
          >
            ×
          </button>
        </h3>
        
        {selectedDayEvents.length > 0 ? (
          <div className={styles.eventsList}>
            {selectedDayEvents.map(evento => (
              <div key={evento.id} className={styles.eventItem}>
                <div className={styles.eventItemHeader}>
                  {evento.hora && <span className={styles.eventItemTime}>{evento.hora}</span>}
                  <span className={styles.eventItemTitle}>{evento.titulo}</span>
                </div>
                {evento.description && (
                  <div className={styles.eventItemDescription}>
                    {evento.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.noEvents}>No hay eventos para este día</div>
        )}
      </div>
    );
  };

  return (
    <div className={`${styles.calendarioContainer} ${showModal ? styles.detailsModalActive : ''}`}>
      <div className={styles.calendario}>
        {/* Cabecera del calendario */}
        <div className={styles.calendarioHeader}>
          <button 
            onClick={prevMonth}
            className={styles.calendarioNavButton}
            aria-label="Mes anterior"
          >
            ‹
          </button>
          <h2 className={styles.calendarioTitle}>
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <button 
            onClick={nextMonth}
            className={styles.calendarioNavButton}
            aria-label="Mes siguiente"
          >
            ›
          </button>
        </div>
        
        {/* Días de la semana */}
        <div className={styles.calendarioDaysOfWeek}>
          {dayNames.map(day => (
            <div key={day} className={styles.calendarioDayOfWeek}>
              {day}
            </div>
          ))}
        </div>
        
        {/* Días del mes */}
        <div className={styles.calendarioDaysGrid}>
          {days.map((day, index) => {
            const dayEvents = getEventosDelDia(day);
            const hasDay = hasEvents(day);
            const isSelected = isSelectedDay(day);
            
            return (
              <div 
                key={index} 
                className={`${styles.calendarioDay} 
                  ${day.isCurrentMonth ? styles.currentMonth : styles.otherMonth} 
                  ${isToday(day.date) ? styles.today : ''}
                  ${isSelected ? styles.selected : ''}`}
                onClick={() => selectDay(day)}
              >
                <div className={`${styles.calendarioDayHeader} ${isToday(day.date) ? styles.todayHeader : ''}`}>
                  <span>{day.date.getDate()}</span>
                  {hasDay && (
                    <span className={styles.eventIndicator}></span>
                  )}
                </div>
                <div className={styles.calendarioEvents}>
                  {dayEvents.slice(0, 2).map(evento => (
                    <div key={evento.id} className={styles.calendarioEvent}>
                      {evento.hora && <span className={styles.eventTime}>{evento.hora}: </span>}
                      {evento.titulo}
                    </div>
                  ))}
                  
                  {dayEvents.length > 2 && (
                    <div className={styles.calendarioEvent}>
                      +{dayEvents.length - 2} más
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Panel de detalles - SIEMPRE VISIBLE en desktop */}
      {!isMobile && renderDayDetails()}
      
      {/* Modal para dispositivos móviles */}
      {showModal && selectedDay && (
        <div className={styles.detailsModal} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button 
              className={styles.modalCloseButton}
              onClick={closeModal}
              aria-label="Cerrar detalles"
            >
              ×
            </button>
            <div className={styles.dayDetails}>
              <h3 className={styles.dayDetailsTitle}>
                {formatDetailDate(selectedDay.date)}
              </h3>
              
              {selectedDayEvents.length > 0 ? (
                <div className={styles.eventsList}>
                  {selectedDayEvents.map(evento => (
                    <div key={evento.id} className={styles.eventItem}>
                      <div className={styles.eventItemHeader}>
                        {evento.hora && <span className={styles.eventItemTime}>{evento.hora}</span>}
                        <span className={styles.eventItemTitle}>{evento.titulo}</span>
                      </div>
                      {evento.description && (
                        <div className={styles.eventItemDescription}>
                          {evento.description}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.noEvents}>No hay eventos para este día</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;