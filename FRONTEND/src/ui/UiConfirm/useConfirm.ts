import {h, render, defineComponent, ref} from 'vue';

type ConfirmConfig = {
    title?: string;
    message?: string;
    confirmText?: string;
    cancelText?: string;
    type?: 'default' | 'warning' | 'danger' | 'info' | 'success';
    showCancel?: boolean;
};

export function useConfirm() {

    const showConfirm = (options: ConfirmConfig) => {
        return new Promise((resolve) => {
            const container = document.createElement('div');
            container.id = `confirm-${Date.now()}`;
            document.body.appendChild(container);

            const ConfirmDialog = defineComponent({
                setup() {
                    const isVisible = ref(false);
                    const isClosing = ref(false);

                    const config: ConfirmConfig = {
                        title: options.title || 'Подтверждение',
                        message: options.message || 'Вы уверены?',
                        confirmText: options.confirmText || 'Подтвердить',
                        cancelText: options.cancelText || 'Отмена',
                        type: options.type || 'warning',
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
                        this.isVisible ? 'bg-black bg-opacity-10' : 'bg-transparent',
                        this.isClosing ? 'opacity-0' : 'opacity-100'
                    ];

                    const modalClass = [
                        'flex flex-col gap-[20px] bg-white rounded-[12px] p-16 shadow-custom max-w-[500px] w-full transform transition-all duration-300 overflow-hidden',
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

                            // Заголовок
                            h('div',
                                [
                                    h('h3', {
                                        class: 'text-xl font-medium text-gray-900'
                                    }, this.config.title)
                                ]
                            ),

                            // Сообщение
                            h('div', {class: ''},
                                h('p', {
                                    class: 'text-gray-600'
                                }, this.config.message)
                            ),

                            // Кнопки
                            h('div', {class: 'px-6 pb-6 flex gap-12'}, [

                                this.config.showCancel && h('button', {
                                    class: 'flex-1 py-8 px-8 rounded-[12px] text-gray-7 bg-blue-3 text-white font-medium hover:bg-blue-4 active:bg-grey-1 transition-all duration-200',
                                    onClick: this.cancel
                                }, this.config.cancelText),

                                h('button', {
                                    class: [
                                        'flex-1 py-8 px-8 rounded-[12px] text-gray-7 bg-white shadow-custom font-medium hover:bg-grey-2 active:bg-grey-1 transition-all duration-200',
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
    const confirmDanger = (options) => showConfirm({...options, type: 'danger'});
    const confirmWarning = (options) => showConfirm({...options, type: 'warning'});
    const confirmInfo = (options) => showConfirm({...options, type: 'info'});

    return {
        showConfirm,
        confirmDanger,
        confirmWarning,
        confirmInfo
    };
}