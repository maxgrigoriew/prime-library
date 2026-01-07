import { h, render, defineComponent, ref } from 'vue';

// SVG иконки
const ICONS = {
    warning: `
    <svg class="w-12 h-12 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
    </svg>
  `,
    danger: `
    <svg class="w-12 h-12 text-red-500" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
    </svg>
  `,
    info: `
    <svg class="w-12 h-12 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
    </svg>
  `
};

export function useConfirm() {

    const showConfirm = (options = {}) => {
        return new Promise((resolve) => {
            const container = document.createElement('div');
            container.id = `confirm-${Date.now()}`;
            document.body.appendChild(container);

            const ConfirmDialog = defineComponent({
                setup() {
                    const isVisible = ref(false);
                    const isClosing = ref(false);

                    const config = {
                        title: options.title || 'Подтверждение',
                        message: options.message || 'Вы уверены?',
                        confirmText: options.confirmText || 'Подтвердить',
                        cancelText: options.cancelText || 'Отмена',
                        type: options.type || 'warning',
                        icon: options.icon || ICONS[options.type || 'warning'],
                        showCancel: options.showCancel !== false
                    };

                    // Показываем с анимацией
                    setTimeout(() => {
                        isVisible.value = true;
                    }, 10);

                    const confirm = () => {
                        close(() => resolve(true));
                    };

                    const cancel = () => {
                        close(() => resolve(false));
                    };

                    const close = (callback) => {
                        isClosing.value = true;
                        setTimeout(() => {
                            render(null, container);
                            container.remove();
                            callback();
                        }, 300);
                    };

                    const handleKeydown = (e) => {
                        if (e.key === 'Escape') cancel();
                        if (e.key === 'Enter') confirm();
                    };

                    document.addEventListener('keydown', handleKeydown);

                    return {
                        isVisible,
                        isClosing,
                        config,
                        confirm,
                        cancel
                    };
                },

                render() {
                    const overlayClass = [
                        'fixed inset-0 z-[9999] flex items-center justify-center p-4 transition-all duration-300',
                        this.isVisible ? 'bg-black bg-opacity-50' : 'bg-transparent',
                        this.isClosing ? 'opacity-0' : 'opacity-100'
                    ];

                    const modalClass = [
                        'bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-300 overflow-hidden',
                        this.isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
                    ];

                    return h('div', {
                        class: overlayClass,
                        onClick: this.cancel
                    }, [
                        h('div', {
                            class: modalClass,
                            onClick: (e) => e.stopPropagation()
                        }, [
                            // Иконка
                            h('div', {
                                class: 'flex justify-center mt-8',
                                innerHTML: this.config.icon
                            }),

                            // Заголовок
                            h('div', { class: 'px-6 pt-4 text-center' },
                                h('h3', {
                                    class: 'text-xl font-bold text-gray-900'
                                }, this.config.title)
                            ),

                            // Сообщение
                            h('div', { class: 'px-6 py-4 text-center' },
                                h('p', {
                                    class: 'text-gray-600 text-base leading-relaxed'
                                }, this.config.message)
                            ),

                            // Кнопки
                            h('div', { class: 'px-6 pb-6 flex gap-3' }, [
                                this.config.showCancel && h('button', {
                                    class: 'flex-1 py-3 px-4 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 active:bg-gray-100 transition-all duration-200',
                                    onClick: this.cancel
                                }, this.config.cancelText),

                                h('button', {
                                    class: [
                                        'flex-1 py-3 px-4 rounded-xl font-medium text-white transition-all duration-200',
                                        this.config.type === 'danger' ? 'bg-red-500 hover:bg-red-600 active:bg-red-700' :
                                            this.config.type === 'warning' ? 'bg-amber-500 hover:bg-amber-600 active:bg-amber-700' :
                                                'bg-blue-500 hover:bg-blue-600 active:bg-blue-700'
                                    ].join(' '),
                                    onClick: this.confirm
                                }, this.config.confirmText)
                            ])
                        ])
                    ]);
                }
            });

            const app = h(ConfirmDialog);
            render(app, container);
        });
    };

    // Удобные методы-алиасы
    const confirmDanger = (options) => showConfirm({ ...options, type: 'danger' });
    const confirmWarning = (options) => showConfirm({ ...options, type: 'warning' });
    const confirmInfo = (options) => showConfirm({ ...options, type: 'info' });

    return {
        showConfirm,
        confirmDanger,
        confirmWarning,
        confirmInfo
    };
}