function levenshteinDistance(a, b) {
    const matrix = [];

    for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }

    for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }

    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (a[j - 1] === b[i - 1]) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j - 1] + 1
                );
            }
        }
    }

    return matrix[b.length][a.length];
}

function findClosestGame(data, criteria) {
    let closestGame = null;
    let minDistance = Infinity;

    data.forEach(game => {
        const distance = levenshteinDistance(criteria.toLowerCase(), game.slug.toLowerCase());
        if (distance < minDistance) {
            minDistance = distance;
            closestGame = game;
        }
    });

    return closestGame;
}

export default findClosestGame;
