const html = document.querySelector("html");
const checkbox = document.querySelector("input[name=theme]");
const inputColor = document.getElementById('inputColor');

const getStyle = (element, style) => {
    return window
        .getComputedStyle(element)
        .getPropertyValue(style)
}

const initialColor = {
    color1: getStyle(html, "--color1"),
    color2: getStyle(html, "--color2"),
    color3: getStyle(html, "--color3"),
    color4: getStyle(html, "--color4"),
    color5: getStyle(html, "--color5"),
    color6: getStyle(html, "--color6"),
    color7: getStyle(html, "--color7"),
    color8: getStyle(html, "--color8"),
    color9: getStyle(html, "--color9"),
}

const lightMode = {
    color1: "#f3f3f3",
    color2: "#FF4040",
    color3: "#bcbcbc",
    color4: "#f3f3f3",
    color5: "#222222",
    color6: "#e1e1e1",
    color7: "#cfcfcf",
    color8: "#222222",
    color9: "#979797",
    color10: "#757575"
}

const transformKey = (key) => {
    return "--" + key
}

const changeColors = (colors) => {
    Object.keys(colors).map(key => {
        html.style.setProperty(transformKey(key), colors[key])
    })
}

const setSaveMode = (mode, check) => {
    localStorage.setItem('mode', JSON.stringify(mode))
    localStorage.setItem('modeCheck', check)
}

const setColorDestaque = (color) => {
    localStorage.setItem('colorDestaque', color);
}

const getMode = () => {
    const mode = JSON.parse(localStorage.getItem('mode')) ?? [];
    const statusCheck = JSON.parse(localStorage.getItem('modeCheck')) ?? false;
    return {
        mode,
        statusCheck
    };
}
const getColorDestaque = () => localStorage.getItem('colorDestaque') ?? "#FF4040"

checkbox.addEventListener("change", ({ target }) => {
    const check = target.checked;
    if (check) {
        changeColors(lightMode);
        setSaveMode(lightMode, check);
        atualizarCores();
    } else {
        changeColors(initialColor);
        setSaveMode(initialColor, check);
        atualizarCores();
    }
})


const atualizarCores = () => {
    const colorDestaque = getColorDestaque();
    html.style.setProperty("--color2", colorDestaque);  
    inputColor.value = colorDestaque 
}

document.addEventListener('DOMContentLoaded', () => {
    const modeFunctions = getMode();    
    const mode = modeFunctions.mode;
    const statusCheck = modeFunctions.statusCheck;
    checkbox.checked = statusCheck;
    changeColors(mode);
    atualizarCores();
});

const changeColorDestaque = () => {
    const color = inputColor.value;
    html.style.setProperty("--color2", color)
    setColorDestaque(color);
}

inputColor.addEventListener('input', changeColorDestaque);