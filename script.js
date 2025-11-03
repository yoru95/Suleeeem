document.addEventListener('DOMContentLoaded', function() {
    // Анимация карточек
    const cards = document.querySelectorAll('.card');
    const cardButtons = document.querySelectorAll('.card-btn');
    
    cards.forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    cardButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            this.textContent = "Загрузка...";
            setTimeout(() => {
                this.textContent = "Готово!";
                setTimeout(() => {
                    this.textContent = this.textContent.includes("Узнать") ? "Узнать больше" : 
                                     this.textContent.includes("Исследовать") ? "Исследовать" : "Начать";
                }, 1000);
            }, 500);
        });
    });
    
    // Загадка
    const optionButtons = document.querySelectorAll('.option-btn');
    const modal = document.getElementById('congratsModal');
    const closeModal = document.querySelector('.close');
    const winnerNameSpan = document.getElementById('winnerName');
    
    // Здесь вы можете изменить имя на нужное
    const winnerName = "Сулим";
    
    optionButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const isCorrect = this.dataset.answer === 'correct';
            
            // Сбрасываем все кнопки
            optionButtons.forEach(b => {
                b.classList.remove('correct', 'wrong');
            });
            
            // Показываем правильный/неправильный ответ
            if (isCorrect) {
                this.classList.add('correct');
                
                // Показываем модальное окно через 1 секунду
                setTimeout(() => {
                    winnerNameSpan.textContent = winnerName;
                    modal.style.display = 'block';
                }, 1000);
            } else {
                this.classList.add('wrong');
                
                // Находим и подсвечиваем правильный ответ
                const correctBtn = document.querySelector('[data-answer="correct"]');
                setTimeout(() => {
                    correctBtn.classList.add('correct');
                }, 500);
            }
        });
    });
    
    // Закрытие модального окна
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Дополнительные эффекты при наведении
    const riddleOptions = document.querySelectorAll('.option-btn');
    riddleOptions.forEach(option => {
        option.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        option.addEventListener('mouseleave', function() {
            if (!this.classList.contains('correct') && !this.classList.contains('wrong')) {
                this.style.transform = 'scale(1)';
            }
        });
    });
});
