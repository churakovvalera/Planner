window.onload = function() {
    function formatDate(date) {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        return `${day}.${month}`;
    }

    function getDayAbbreviation(date) {
        const options = { weekday: 'short' };
        return date.toLocaleDateString('en-US', options);
    }

    const date = new Date();
    const dayOfWeek = date.getDay();
    const mondayOffset = (dayOfWeek === 0 ? -6 : 1 - dayOfWeek);
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() + mondayOffset);

    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    days.forEach((day, index) => {
        const dayDate = new Date(startOfWeek);
        dayDate.setDate(startOfWeek.getDate() + index);
        const formattedDate = formatDate(dayDate);
        const dayAbbr = getDayAbbreviation(dayDate);
        const cell = document.getElementById(day);

        cell.innerHTML = `
            <div class="date">${formattedDate}</div>
            <div class="day">${dayAbbr}</div>
        `;
    });

    // Обновляем месяц и год в заголовке
    function updateMonthYear(date) {
        const options = { month: 'long', year: 'numeric' };
        const monthYear = date.toLocaleDateString('en-US', options);
        document.getElementById('monthYear').textContent = monthYear;
    }

    updateMonthYear(date);
};
