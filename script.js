const beeModel = document.getElementById('bee-model');
const sections =  Array.from(document.querySelectorAll('section'));


const shiftPosition = [0, -20, 0, 25];
const cameraOrbits = [[90, 90], [-45, 90], [-185, 0], [45, 90]];



const sectionsOffsets = sections.map(section => section.offsetTop);
const lastSectionIndex = sectionsOffsets.length - 1;


const interpolate = (start, end, progress) => start  + (end - start) * progress;



const getScrollProgess = scrollY => {
    for (let i = 0; i < lastSectionIndex; i++) {
        if (scrollY >= sectionsOffsets[i] && scrollY < sectionsOffsets[i + 1]) {
            return i + (scrollY - sectionsOffsets[i]) / (sectionsOffsets[i + 1] - sectionsOffsets[i]);
        }
    }
    
    return lastSectionIndex;
};

window.addEventListener('scroll', () => {
    const scrollProgress = getScrollProgess(window.scrollY);
    const sectionIndex = Math.floor(scrollProgress);
    const sectionProgress = scrollProgress - sectionIndex;

    const currentShift = interpolate (
        shiftPosition[sectionIndex],
        shiftPosition[sectionIndex + 1] ?? shiftPosition[sectionIndex],
        sectionProgress
    );

    const currentOrbit = cameraOrbits[sectionIndex].map((val, i) =>
        interpolate(val, cameraOrbits[sectionIndex + 1]?.[i] ?? val, sectionProgress))

    beeModel.style.transform = `translateX(${currentShift}%)`;
    beeModel.setAttribute('camera-orbit', `${currentOrbit[0]}deg ${currentOrbit[1]}deg`);
});