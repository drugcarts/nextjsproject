export function tableText(text, maxLength = 50) {
    return text?.length > maxLength ? text?.substring(0, maxLength) + "....." : text;
}

export function addTrackingNo(value) {
    const year = value.getFullYear().toString().slice(-2);
    const hours = value.getHours().toString().padStart(2, "0");
    const minutes = value.getMinutes().toString().padStart(2, "0");
    const seconds = value.getSeconds().toString().padStart(2, "0");

    return `M4${year}${hours}${minutes}${seconds}`;
}