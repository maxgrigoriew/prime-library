// confirm-enhanced.js
export function showConfirm(message, options = {}) {
    return new Promise((resolve) => {

        console.log('inner')
        const config = {
            title: options.title || 'Подтверждение',
            okText: options.okText || 'Да',
            cancelText: options.cancelText || 'Нет',
            type: options.type || 'default' // default, warning, danger
        };

        // Создаем контейнер
        const container = document.createElement('div');
        container.className = 'confirm-container';

        // HTML
        container.innerHTML = `
      <div class="confirm-overlay">
        <div class="confirm-box confirm-${config.type}">
          ${config.title ? `<h3 class="confirm-title">${config.title}</h3>` : ''}
          <p class="confirm-message">${message}</p>
          <div class="confirm-buttons">
            <button class="confirm-button confirm-cancel">${config.cancelText}</button>
            <button class="confirm-button confirm-ok">${config.okText}</button>
          </div>
        </div>
      </div>
    `;

        // Находим элементы
        const overlay = container.querySelector('.confirm-overlay');
        const box = container.querySelector('.confirm-box');
        const cancelBtn = container.querySelector('.confirm-cancel');
        const okBtn = container.querySelector('.confirm-ok');

        // Функция закрытия
        const close = (result) => {
            // Анимация исчезновения
            box.style.transform = 'scale(0.95)';
            box.style.opacity = '0';
            overlay.style.opacity = '0';
            document.body.removeChild(container);
            resolve(result);
            setTimeout(() => {
                document.body.removeChild(container);
                resolve(result); // Важно! Promise завершается
            }, 200);
        };

        // Обработчики
        cancelBtn.onclick = () => close(false);
        okBtn.onclick = () => close(true);
        overlay.onclick = (e) => {
            if (e.target === overlay) close(false);
        };

        // Закрытие по ESC
        const escHandler = (e) => {
            if (e.key === 'Escape') close(false);
        };
        document.addEventListener('keydown', escHandler);

        // Убираем обработчик после закрытия
        const cleanup = () => {
            document.removeEventListener('keydown', escHandler);
        };

        // Добавляем в DOM
        document.body.appendChild(container);

        // Анимация появления
        setTimeout(() => {
            box.style.transform = 'scale(1)';
            box.style.opacity = '1';
        }, 10);

        // Убираем обработчик при удалении
        container.addEventListener('remove', cleanup);
    });
}

// CSS (можно подключить отдельно)
const style = document.createElement('style');
style.textContent = `
  .confirm-container {
    position: fixed;
    z-index: 10000;
  }
  
  .confirm-overlay {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  
    transition: opacity 0.2s;
  }
  
  .confirm-box {
    background: white;
    border-radius: 12px;
    padding: 24px;
    max-width: 400px;
    width: 90%;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
    transform: scale(0.95);
    transition: all 0.2s;
  }
  
  .confirm-warning {
    border-top: 4px solid #f59e0b;
  }
  
  .confirm-danger {
    border-top: 4px solid #ef4444;
  }
  
  .confirm-title {
    margin: 0 0 12px 0;
    font-size: 1.25rem;
    font-weight: 600;
  }
  
  .confirm-message {
    margin: 0 0 24px 0;
    color: #4b5563;
    line-height: 1.5;
  }
  
  .confirm-buttons {
    display: flex;
    gap: 12px;
    justify-content: flex-end;
  }
  
  .confirm-button {
    padding: 10px 20px;
    border-radius: 8px;
    border: none;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 0.95rem;
    min-width: 80px;
  }
  
  .confirm-cancel {
    background-color: #f3f4f6;
    color: #374151;
  }
  
  .confirm-cancel:hover {
    background-color: #e5e7eb;
  }
  
  .confirm-ok {
    background-color: #3b82f6;
    color: white;
  }
  
  .confirm-ok:hover {
    background-color: #2563eb;
  }
  
  .confirm-danger .confirm-ok {
    background-color: #ef4444;
  }
  
  .confirm-danger .confirm-ok:hover {
    background-color: #dc2626;
  }
`;
document.head.appendChild(style);