function DFT(vals){
    let tVals = [];
    const N = vals.length;
    for(let i = 0; i< N; i ++){
        let re = 0;
        let im = 0;
        for (let j = 0; j< N; j++){
            const theta = 2 * PI * i * j/N;
            re +=(vals[j] * cos(theta));
            im -=(vals[j] * sin(theta));
        }
        re  = re/N;
        im = im/N;
        amplitude = sqrt(re * re + im * im);
        phase = Math.atan2(im, re); // had a bug in here..

        tVals[i] = {
            re,
            im, 
            amplitude,
            phase
        };
    }

    return tVals;
}
