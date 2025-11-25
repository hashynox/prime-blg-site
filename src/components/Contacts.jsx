import { useState } from 'react';

const Contacts = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form data:', formData);
    alert('Спасибо за ваше сообщение!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contacts" className="section contacts">
      <div className="container">
        <div className="section__header">
          <p className="section__eyebrow">Контакты</p>
          <h2>Свяжитесь с нами</h2>
        </div>
        <div className="contacts__grid">
          <div className="contacts__info">
            <p className="contacts__text">
              Ответим на ваши вопросы, подготовим индивидуальный расчет и расскажем о деталях строительного процесса.
            </p>
            <ul className="contacts__list">
              <li>
                <span className="contacts__label">Телефон</span>
                <a href="tel:+79000000000">+7 (900) 000-00-00</a>
              </li>
              <li>
                <span className="contacts__label">Email</span>
                <a href="mailto:info@prime-invest.ru">info@prime-invest.ru</a>
              </li>
              <li>
                <span className="contacts__label">Адрес</span>
                <span>г. Калининград, ул. Примерная, д. 1</span>
              </li>
            </ul>
          </div>
          <form className="contacts__form" onSubmit={handleSubmit}>
            <label>
              Имя
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Введите ваше имя"
              />
            </label>
            <label>
              Email
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="example@mail.ru"
              />
            </label>
            <label>
              Сообщение
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="4"
                placeholder="Опишите ваш запрос"
              />
            </label>
            <button type="submit" className="button button--outline">
              Отправить
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contacts;
