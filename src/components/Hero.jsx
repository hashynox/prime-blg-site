import { useEffect, useMemo, useState } from 'react';

const initialFormData = {
  area: '',
  packageType: '',
  fullName: '',
  phone: '',
  agreement: false,
};

const initialErrors = {
  area: '',
  packageType: '',
  fullName: '',
  phone: '',
  agreement: '',
};

const PACKAGE_RATES = {
  black: 60000,
  gray: 80000,
  white: 100000,
};

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState(initialErrors);
  const [statusMessage, setStatusMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const packageOptions = useMemo(
    () => [
      { value: 'black', label: 'Черный ключ', rate: PACKAGE_RATES.black },
      { value: 'gray', label: 'Серый ключ', rate: PACKAGE_RATES.gray },
      { value: 'white', label: 'Белый ключ', rate: PACKAGE_RATES.white },
    ],
    []
  );

  const resetForm = () => {
    setFormData(initialFormData);
    setErrors(initialErrors);
    setStatusMessage('');
  };

  const handleEstimateClick = () => {
    setIsModalOpen(true);
    resetForm();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
    setStatusMessage('');
  };

  const validate = () => {
    const validationErrors = { ...initialErrors };
    const areaValue = Number(formData.area);

    if (!formData.area || Number.isNaN(areaValue) || areaValue <= 0) {
      validationErrors.area = 'Укажите площадь дома в квадратных метрах';
    }

    if (!formData.packageType) {
      validationErrors.packageType = 'Выберите комплектацию';
    }

    if (!formData.fullName.trim()) {
      validationErrors.fullName = 'Укажите ваше имя и фамилию';
    }

    if (!formData.phone.trim() || formData.phone.replace(/\D/g, '').length < 10) {
      validationErrors.phone = 'Укажите ваш номер телефона для связи';
    }

    if (!formData.agreement) {
      validationErrors.agreement =
        'Необходимо согласие на обработку персональных данных и получение консультации';
    }

    const hasErrors = Object.values(validationErrors).some(Boolean);
    if (hasErrors) {
      setErrors(validationErrors);
      return false;
    }

    setErrors(initialErrors);
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatusMessage('');

    if (!validate()) return;

    const areaValue = Number(formData.area);
    const rate = PACKAGE_RATES[formData.packageType];
    const estimatedCost = Math.round(areaValue * rate);

    const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
    const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.error('Telegram credentials are not configured');
      setStatusMessage(
        'Не удалось отправить заявку. Пожалуйста, попробуйте позже или свяжитесь с нами по телефону.'
      );
      return;
    }

    const message = [
      'Новая заявка на расчет стоимости строительства:',
      `Имя и фамилия: ${formData.fullName.trim()}`,
      `Номер телефона: ${formData.phone.trim()}`,
      `Желаемая площадь: ${areaValue} м²`,
      `Комплектация: ${
        packageOptions.find((option) => option.value === formData.packageType)?.label || ''
      }`,
      `Ориентировочная стоимость: ${estimatedCost.toLocaleString('ru-RU')} ₽`,
    ].join('\n');

    try {
      setIsSubmitting(true);
      const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text: message }),
      });

      const data = await response.json();

      if (!data.ok) {
        throw new Error(data.description || 'Telegram API error');
      }

      setStatusMessage(
        `Ориентировочная стоимость строительства: ${estimatedCost.toLocaleString('ru-RU')} ₽. Мы свяжемся с вами в течение часа.`
      );
      setFormData(initialFormData);
      setErrors(initialErrors);
    } catch (error) {
      console.error('Failed to send Telegram message:', error);
      setStatusMessage(
        'Не удалось отправить заявку. Пожалуйста, попробуйте позже или свяжитесь с нами по телефону.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="hero" className="hero">
      <div className="hero__overlay" />
      <div className="container hero__content">
        <h1>
          Строим дома для жизни, в которых уверены сами
          <span>Промышленные и коммерческие комплексы под ключ</span>
        </h1>
        <p>
          Заберем на себя всю стройку: от эскиза на бумаге до вручения ключей. Работаем по честной смете — цена в
          договоре не изменится в процессе, даже если подорожают материалы.
        </p>
        <div className="hero__actions">
          <button className="button" onClick={handleEstimateClick}>
            Расчет стоимости строительства
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal" role="dialog" aria-modal="true" aria-labelledby="calculator-title">
          <div className="modal__overlay" onClick={closeModal} />
          <div className="modal__content">
            <button className="modal__close" onClick={closeModal} aria-label="Закрыть модальное окно">
              ×
            </button>

            <div className="modal__body">
              <h2 id="calculator-title">Онлайн-калькулятор стоимости строительства</h2>
              <p className="modal__description">
                Введите желаемую площадь дома и выберите комплектацию. Мы рассчитаем для вас приблизительную стоимость
                строительства. Укажите ваше имя и номер телефона, и мы свяжемся с вами в течение часа для более
                подробной консультации.
              </p>

              <form className="form" onSubmit={handleSubmit}>
                <label className="form__group">
                  <span className="form__label">Желаемая площадь дома, м²</span>
                  <input
                    type="number"
                    min="1"
                    value={formData.area}
                    onChange={(event) => handleFieldChange('area', event.target.value)}
                    className={errors.area ? 'form__input form__input--error' : 'form__input'}
                    placeholder="Например, 150"
                  />
                  {errors.area && <span className="form__error">{errors.area}</span>}
                </label>

                <div className="form__group">
                  <span className="form__label">Выберите комплектацию</span>
                  <div className="form__options">
                    {packageOptions.map((option) => (
                      <label key={option.value} className="form__option">
                        <input
                          type="radio"
                          name="package"
                          value={option.value}
                          checked={formData.packageType === option.value}
                          onChange={() => handleFieldChange('packageType', option.value)}
                        />
                        <span className="form__option-label">
                          {option.label}
                          <span className="form__option-hint">{option.rate.toLocaleString('ru-RU')} ₽/м²</span>
                        </span>
                      </label>
                    ))}
                  </div>
                  {errors.packageType && <span className="form__error">{errors.packageType}</span>}
                </div>

                <label className="form__group">
                  <span className="form__label">Имя и фамилия</span>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(event) => handleFieldChange('fullName', event.target.value)}
                    className={errors.fullName ? 'form__input form__input--error' : 'form__input'}
                    placeholder="Ваше имя"
                  />
                  {errors.fullName && <span className="form__error">{errors.fullName}</span>}
                </label>

                <label className="form__group">
                  <span className="form__label">Номер телефона</span>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(event) => handleFieldChange('phone', event.target.value)}
                    className={errors.phone ? 'form__input form__input--error' : 'form__input'}
                    placeholder="+7 (___) ___-__-__"
                  />
                  {errors.phone && <span className="form__error">{errors.phone}</span>}
                </label>

                <label className={errors.agreement ? 'form__checkbox form__checkbox--error' : 'form__checkbox'}>
                  <input
                    type="checkbox"
                    checked={formData.agreement}
                    onChange={(event) => handleFieldChange('agreement', event.target.checked)}
                  />
                  <span>Согласен(на) на обработку персональных данных и получение консультации по расчёту.</span>
                </label>
                {errors.agreement && <span className="form__error">{errors.agreement}</span>}

                {statusMessage && <div className="form__status">{statusMessage}</div>}

                <div className="form__actions">
                  <button className="button" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Отправляем...' : 'Рассчитать и отправить заявку'}
                  </button>
                  <button className="button button--outline" type="button" onClick={resetForm}>
                    Сбросить
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
