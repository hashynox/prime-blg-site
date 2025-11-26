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
          <span>Промышленные и коммерческие комплексы под ключ</span>
        </h1>
        <p>
          Разрабатываем, строим и вводим в эксплуатацию современные площадки: от логистических парков и производств
          до гибких офисных центров. Управляем проектом на всех этапах и держим сроки, бюджет и качество под
          контролем.
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
