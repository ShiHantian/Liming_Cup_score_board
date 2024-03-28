// script.js
document.addEventListener('DOMContentLoaded', () => {
    const redTotalElement = document.getElementById('red-total');
    const blueTotalElement = document.getElementById('blue-total');
    const resetButton = document.getElementById('reset-btn');
    const inputs = document.querySelectorAll('input[type="number"]');

    function updateScores() {
        let redScore = 0, blueScore = 0;

        inputs.forEach(input => {
            const team = input.dataset.team;
            const value = parseInt(input.value) || 0;

            if (input.classList.contains('penalty')) {
                // 扣除犯规分
                if (team === 'red') redScore -= value;
                if (team === 'blue') blueScore -= value;
            } else {
                // 累加得分
                if (team === 'red') redScore += value;
                if (team === 'blue') blueScore += value;
            }
        });

        redTotalElement.textContent = `RED Total: ${redScore}`;
        blueTotalElement.textContent = `BLUE Total: ${blueScore}`;
    }

    // 当分数输入框的值发生变化时，更新总分
    inputs.forEach(input => {
        input.addEventListener('change', updateScores);
    });

    // 重置按钮功能
    resetButton.addEventListener('click', () => {
        inputs.forEach(input => {
            input.value = 0;
        });
        updateScores();
    });

    // 初始化分数显示
    updateScores();
});
