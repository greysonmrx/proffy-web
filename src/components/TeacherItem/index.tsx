import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';

function TeacherItem() {
  return (<article className="teacher-item">
    <header>
      <img src="https://avatars1.githubusercontent.com/u/43364141?s=460&u=433742cc704ded8dae06d82aaf3327cdebd05419&v=4" alt="Greyson Filho" />
      <div>
        <strong>Greyson Filho</strong>
        <span>Programador</span>
      </div>
    </header>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    <br /><br />
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mattis ante in sapien interdum, condimentum egestas justo posuere. Nullam cursus dignissim massa eu convallis. Suspendisse venenatis varius fringilla.
  </p>
    <footer>
      <p>
        Preço/hora
      <strong>R$ 80,00</strong>
      </p>
      <button type="button">
        <img src={whatsappIcon} alt="WhatsApp" />
      Entrar em contato
    </button>
    </footer>
  </article>);
}

export default TeacherItem;