const Hero = () => {
  const handleEstimateClick = () => {
    alert('Запрос расчета стоимости отправлен! Наш менеджер свяжется с вами.');
  };

  return (
    <section id="hero" className="hero">
      <div className="hero__overlay" />
      <div className="container hero__content">
        <h1>
          Прайм Инвест
          <span>Строим комфортные дома под ключ</span>
        </h1>
        <p>
          От проекта до дома вашей мечты — мы возьмем на себя все этапы строительства по фиксированной смете без
          каких-либо скрытых платежей.
        </p>
        <div className="hero__actions">
          <button className="button" onClick={handleEstimateClick}>
            Расчет стоимости строительства
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
