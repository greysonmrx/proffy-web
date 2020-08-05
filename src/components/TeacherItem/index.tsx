import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import api from '../../services/api';

import './styles.css';

export interface Teacher {
  id: number;
  name: string;
  subject: string;
  avatar: string;
  bio: string;
  cost: number;
  whatsapp: string;
}

interface TeacherItemProps {
  data: Teacher;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ data }) => {
  const {
    id,
    name,
    subject,
    avatar,
    bio,
    cost,
    whatsapp
  } = data;

  async function handleCreateNewConnection() {
    try {
      await api.post('/connections', {
        user_id: id
      });
      window.location.assign(`https://wa.me/${whatsapp}`);
    } catch (err) {
      alert('Erro ao criar uma nova conexão!');
    }
  }

  return (
    <article className="teacher-item">
      <header>
        <img src={avatar} alt={name} />
        <div>
          <strong>{name}</strong>
          <span>{subject}</span>
        </div>
      </header>
      <p>{bio}</p>
      <footer>
        <p>Preço/hora<strong>R$ {cost}</strong></p>
        <button type="button" onClick={handleCreateNewConnection}>
          <img src={whatsappIcon} alt="WhatsApp" />
          Entrar em contato
        </button>
      </footer>
    </article>
  );
}

export default TeacherItem;