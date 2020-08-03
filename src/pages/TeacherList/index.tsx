import React from 'react';

import Header from '../../components/Header';
import TeacherItem from '../../components/TeacherItem';

import './styles.css';

function TeacherList() {
  return (
    <div id="page-teacher-list" className="container">
      <Header title="Estes são os proffys disponíveis.">
        <form action="" id="search-teachers">
          <div className="input-block">
            <label htmlFor="subject">Matéria</label>
            <input type="text" id="subject" />
          </div>
          <div className="input-block">
            <label htmlFor="week_day">Dia da semana</label>
            <input type="text" id="week_day" />
          </div>
          <div className="input-block">
            <label htmlFor="hour">Hora</label>
            <input type="text" id="hour" />
          </div>
        </form>
      </Header>
      <main>
        <TeacherItem />
      </main>
    </div>
  );
}

export default TeacherList;