const images = [
  'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1505691938895-4f257902454a?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1505691938895-2c07d06b17fb?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1505691938895-4c7c0ebcf3d2?auto=format&fit=crop&w=900&q=80',
];

const Gallery = () => {
  return (
    <section id="gallery" className="section gallery">
      <div className="container">
        <div className="section__header">
          <p className="section__eyebrow">Фото</p>
          <h2>Галерея строительства и готовых домов</h2>
        </div>
        <div className="gallery__grid">
          {images.map((src, index) => (
            <figure key={src} className="gallery__item">
              <img src={src} alt={`Дом ${index + 1}`} loading="lazy" />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
