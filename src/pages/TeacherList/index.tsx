import React, { useEffect, useState } from 'react';

import Header from '../../components/Header';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';

import api from '../../services/api';

import './styles.css';

function TeacherList() {
  const [subject, setSubject] = useState('Química');
  const [weekDay, setWeekDay] = useState('0');
  const [time, setTime] = useState('00:00');

  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    async function getTeachers() {
      const response = await api.get('/classes', {
        params: {
          week_day: weekDay,
          subject,
          time
        }
      });

      setTeachers(response.data);
    }

    getTeachers();
  }, [subject, time, weekDay]);

  return (
    <div id="page-teacher-list" className="container">
      <Header title="Estes são os proffys disponíveis.">
        <form action="" id="search-teachers">
          <Select
            label="Matéria"
            name="subject"
            onChange={(e) => setSubject(e.target.value)}
            options={[
              { value: 'Artes', label: 'Artes' },
              { value: 'Matemática', label: 'Matemática' },
              { value: 'Física', label: 'Física' },
              { value: 'Biologia', label: 'Biologia' },
              { value: 'Química', label: 'Química' },
              { value: 'Sociologia', label: 'Sociologia' },
              { value: 'Geografia', label: 'Geografia' },
              { value: 'Introdução a programação', label: 'Introdução a programação' },
              { value: 'POO', label: 'POO' },
              { value: 'Engenharia de software', label: 'Engenharia de software' },
              { value: 'Banco de dados', label: 'Banco de dados' },
            ]}
          />
          <Select
            label="Dia da semana"
            name="week_day"
            onChange={(e) => setWeekDay(e.target.value)}
            options={[
              { value: '0', label: 'Domingo' },
              { value: '1', label: 'Segunda-feira' },
              { value: '2', label: 'Terça-feira' },
              { value: '3', label: 'Quarta-feira' },
              { value: '4', label: 'Quinta-feira' },
              { value: '5', label: 'Sexta-feira' },
              { value: '6', label: 'Sábado' },
            ]}
          />
          <Input
            type="time"
            label="Hora"
            name="time"
            onChange={(e) => setTime(e.target.value)}
          />
        </form>
      </Header>
      <main>
        {
          teachers.map((teacher: Teacher) => (
            <TeacherItem key={teacher.id} data={teacher} />
          ))
        }
      </main>
    </div>
  );
}

export default TeacherList;