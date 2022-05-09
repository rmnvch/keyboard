export function createTextareaEl() {
    const wrapper = document.createElement('div');
    const textarea = document.createElement('textarea');
    const label = document.createElement('label');
    const disclamer = document.createElement('ul');
    const infoOS = document.createElement('li');
    const langChange = document.createElement('li');
    const langChangeVirtual = document.createElement('li');

    textarea.setAttribute('id', 'display');
    textarea.setAttribute('name', 'display');
    textarea.setAttribute('cols', '30');
    textarea.setAttribute('rows', '10');

    label.setAttribute('for', 'display');

    wrapper.classList.add('container');

    infoOS.textContent = 'Создана для Windows';
    langChange.textContent = 'Переключение языка - левый Shift + левый Alt';
    langChangeVirtual.textContent = 'Переключение виртуально - Alt';

    disclamer.append(infoOS);
    disclamer.append(langChange);
    disclamer.append(langChangeVirtual);
    label.append(disclamer);
    wrapper.append(label);
    wrapper.append(textarea);

    return {
        wrapper,
        textarea,
    }
}