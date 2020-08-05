import React, { useState, useCallback, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import Header from '../../components/Header';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Textarea from '../../components/Textarea';

import warningIcon from '../../assets/images/icons/warning.svg';

import api from '../../services/api';

import "./styles.css";

function TeacherForm() {
  const history = useHistory();

  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [bio, setBio] = useState('');

  const [subject, setSubject] = useState('');
  const [cost, setCost] = useState('');

  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 0, from: '', to: '' }
  ]);

  const addNewScheduleItem = useCallback(() => {
    setScheduleItems(oldState => [...oldState, { week_day: 0, from: '', to: '' }]);
  }, []);

  const setScheduleItemValue = useCallback((position: number, field: string, value: string) => {
    const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
      if (position === index) {
        return { ...scheduleItem, [field]: value };
      }

      return scheduleItem;
    });

    setScheduleItems(updatedScheduleItems);
  }, [scheduleItems]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    try {
      await api.post('/users', {
        name,
        avatar,
        whatsapp,
        bio,
        subject,
        cost: Number(cost),
        schedule: scheduleItems
      });

      alert('Cadastro realizado com sucesso!');
      history.push('/');
    } catch (err) {
      alert("Erro ao se cadastrar!");
    }
  }

  return (
    <div id="page-teacher-form" className="container">
      <Header
        title="Que incrível que você quer dar aulas."
        description="O primeiro passo, é preencher esse formulário de inscrição."
      />

      <main>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Seus dados</legend>
            <Input
              name="name"
              value={name}
              label="Nome completo"
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              name="avatar"
              value={avatar}
              label="Avatar"
              onChange={(e) => setAvatar(e.target.value)}
            />
            <Input
              name="whatsapp"
              value={whatsapp}
              label="Whatsapp"
              onChange={(e) => setWhatsapp(e.target.value)}
            />
            <Textarea
              name="bio"
              value={bio}
              label="Biografia"
              onChange={(e) => setBio(e.target.value)}
            />
          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>
            <Select
              name="subject"
              value={subject}
              label="Matéria"
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
            <Input
              name="cost"
              value={cost}
              label="Custo da sua hora por aula"
              onChange={(e) => setCost(e.target.value)}
            />
          </fieldset>

          <fieldset>
            <legend>
              Horários disponíveis
            <button type="button" onClick={addNewScheduleItem}>
                + Novo horário
            </button>
            </legend>
            {
              scheduleItems.map((scheduleItem, index) => (
                <div key={index} className="schedule-item">
                  <Select
                    label="Dia da semana"
                    name="week_day"
                    value={scheduleItem.week_day}
                    onChange={(e) => setScheduleItemValue(index, "week_day", e.target.value)}
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
                    name="from"
                    value={scheduleItem.from}
                    label="Das"
                    type="time"
                    onChange={(e) => setScheduleItemValue(index, "from", e.target.value)}
                  />
                  <Input
                    name="to"
                    value={scheduleItem.to}
                    label="Até"
                    type="time"
                    onChange={(e) => setScheduleItemValue(index, "to", e.target.value)}
                  />
                </div>
              ))
            }

          </fieldset>
          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante" />
            Importante! <br />
            Preencha todos os dados
          </p>
            <button type="submit">Salvar cadastro</button>
          </footer>
        </form>
      </main>
    </div>
  );
}

export default TeacherForm;