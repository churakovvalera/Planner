window.onload = function() {
    let currentDate = new Date();
    let selectedHourBlock = null; // Переменная для хранения выбранного часового блока

    function formatDate(date) {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        return `${day}.${month}`;
    }

    function getDayAbbreviation(date) {
        const options = { weekday: 'short' };
        return date.toLocaleDateString('en-US', options);
    }

    function updateWeek() {
        const dayOfWeek = currentDate.getDay();
        const mondayOffset = (dayOfWeek === 0 ? -6 : 1 - dayOfWeek);
        const startOfWeek = new Date(currentDate);
        startOfWeek.setDate(currentDate.getDate() + mondayOffset);

        const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
        days.forEach((day, index) => {
            const dayDate = new Date(startOfWeek);
            dayDate.setDate(startOfWeek.getDate() + index);
            const formattedDate = formatDate(dayDate);
            const dayAbbr = getDayAbbreviation(dayDate);
            const cell = document.getElementById(day);

            let hourlyBlocks = '';
            for (let hour = 0; hour < 24; hour++) {
                hourlyBlocks += `
                    <div class="hour-block" data-hour="${hour}">
                        <span class="hour-label">${hour}:00</span>
                        <div class="plans" contenteditable="false"></div> <!-- Зона для заметки -->
                    </div>
                `;
            }

            cell.innerHTML = `
                <div class="date">${formattedDate}</div>
                <div class="day">${dayAbbr}</div>
                <div class="hourly-schedule">${hourlyBlocks}</div>
            `;
        });

        updateMonthYear();
    }

    function updateMonthYear() {
        const options = { month: 'long', year: 'numeric' };
        const monthYear = currentDate.toLocaleDateString('en-US', options);
        document.getElementById('monthYear').textContent = monthYear;
    }

    // Обработчики для кнопок переключения недели
    document.getElementById('prevWeek').addEventListener('click', function() {
        currentDate.setDate(currentDate.getDate() - 7);
        updateWeek();
    });

    document.getElementById('nextWeek').addEventListener('click', function() {
        currentDate.setDate(currentDate.getDate() + 7);
        updateWeek();
    });

    // Модальное окно для заметки
    const modal = document.getElementById('noteModal');
    const closeModal = document.querySelector('.close');
    const saveNoteButton = document.getElementById('saveNote');
    const noteText = document.getElementById('noteText');

    // Закрытие модального окна
    closeModal.onclick = function() {
        modal.style.display = "none";
        noteText.value = ""; // Очищаем текстовое поле при закрытии
    };

    // Открытие модального окна при нажатии на часовой блок
    document.addEventListener('click', function(event) {
        if (event.target.closest('.hour-block')) {
            selectedHourBlock = event.target.closest('.hour-block').querySelector('.plans');
            modal.style.display = "block"; // Показываем модальное окно
            noteText.value = selectedHourBlock.textContent; // Загружаем текст заметки
        }
    });

    // Сохранение заметки
    saveNoteButton.onclick = function() {
        if (selectedHourBlock) {
            selectedHourBlock.textContent = noteText.value; // Сохраняем текст заметки в блоке
        }
        modal.style.display = "none"; // Закрываем модальное окно
        noteText.value = ""; // Очищаем текстовое поле
    };

    // Инициализация недели
    updateWeek();
};
