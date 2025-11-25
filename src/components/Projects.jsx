const projects = [
  {
    title: 'Дом 120 м² в современном стиле',
    description: 'Компактный дом с панорамными окнами, идеально подходящий для жизни за городом.',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Коттедж 180 м² с террасой',
    description: 'Просторное решение для семьи с зоной барбекю и большим патио.',
    image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Дом 140 м² с плоской кровлей',
    description: 'Минималистичная архитектура, энергоэффективные материалы и умные системы.',
    image: 'https://images.unsplash.com/photo-1484156818044-c040038b0710?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Шале 200 м² в лесу',
    description: 'Деревянный каркас, панорамное остекление и теплые натуральные фактуры.',
    image: 'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Городской дом 110 м²',
    description: 'Современный фасад, удобная планировка и высокий класс энергоэффективности.',
    image: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Дом 160 м² с гаражом',
    description: 'Оптимальная планировка с отдельной мастерской и просторной кухней-гостиной.',
    image: 'https://images.unsplash.com/photo-1502672023488-70e25813eb80?auto=format&fit=crop&w=900&q=80',
  },
];

const Projects = () => {
  return (
    <section id="projects" className="section projects">
      <div className="container">
        <div className="section__header">
          <p className="section__eyebrow">Каталог</p>
          <h2>Портфолио проектов</h2>
        </div>
        <div className="projects__grid">
          {projects.map((project) => (
            <article key={project.title} className="project-card">
              <img src={project.image} alt={project.title} loading="lazy" />
              <div className="project-card__body">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
