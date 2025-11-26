const images = [
  {
    src: '/images/project-logistics.svg',
    alt: 'Фасад логистического комплекса Прайм Инвест',
    caption: 'Логистический комплекс «Балтика»: складские блоки и офис управляющей компании',
  },
  {
    src: '/images/project-datacenter.svg',
    alt: 'Инженерные стойки центра обработки данных Прайм Инвест',
    caption: 'Центр обработки данных: резервирование по электроснабжению и климату',
  },
  {
    src: '/images/project-retail.svg',
    alt: 'Визуализация торгового и общественного блока Прайм Инвест',
    caption: 'МФК «Речной квартал»: торговые галереи, фуд-корт и офисы',
  },
  {
    src: '/images/project-plant.svg',
    alt: 'Вид производственного корпуса металлоконструкций Прайм Инвест',
    caption: 'Завод металлоконструкций: цеха сборки, покраски и склад сырья',
  },
  {
    src: '/images/project-office.svg',
    alt: 'Схема офисного центра с панорамными окнами',
    caption: 'Офисный центр «Морской»: гибкие офисы и переговорные на каждом этаже',
  },
  {
    src: '/images/project-warehouse.svg',
    alt: 'Общий вид складского парка Прайм Инвест',
    caption: 'Складской парк «Прибрежный»: модульные блоки под разные форматы хранения',
  },
];

const Gallery = () => {
  return (
    <section id="gallery" className="section gallery">
      <div className="container">
        <div className="section__header">
          <p className="section__eyebrow">Фото</p>
          <h2>Галерея объектов и этапов строительства</h2>
        </div>
        <div className="gallery__grid">
          {images.map((item) => (
            <figure key={item.src} className="gallery__item">
              <img src={item.src} alt={item.alt} loading="lazy" />
              <figcaption>{item.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
