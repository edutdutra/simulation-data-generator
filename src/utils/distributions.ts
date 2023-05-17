function getUniformData(a: number, b: number) {
    return a + (b - a) * Math.random();
}

function getTriangulateData(a: number, b: number, c: number,) {
    const u = Math.random();
    const conditionValue = (c - a) / (b - a);

    if (u < conditionValue) {
        const sqrtValue = u * (c - a) * (b - a);

        return a + Math.sqrt(sqrtValue);
    } else {
        const sqrtValue = (1 - u) * (b - c) * (b - a);

        return b - Math.sqrt(sqrtValue);
    }
}

function getExponentialData(average: number) {
    return -average * Math.log(Math.random());
}

function getNormalData(average: number, variance: number) {
    const z = Math.sqrt(-2 * Math.log(Math.random())) * Math.sin(2 * Math.PI * Math.random())

    return average + (variance * z);
}


export {getUniformData, getTriangulateData, getExponentialData, getNormalData}