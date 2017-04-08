/**
 * Здест Будет происходить визулизация Login / Register
 * По сути Все что тут будет происходить это по очередная Визуализация
 * Блоков. При кликабельности Пунктов меню.
 * Возможно в будущем Добавлю еще функционал
 * 
 * Оффтоп Для себя.
 * ------------------------------------------------------------
 * Нет смысла Экспортировать Анонимную функцию. Модуль сам скроет.
 */



import elements from "./query.js"

let funcs = {},
    oldElement;




/**
 * Вспомогательная функция: для elements.header.nav
 * Скрывает и Показывает Активный Блок
 * 
 * @return undefined
 * @param string
 */
funcs.showBlock = (elName) => {
    let contentBlock = elements.section.content.querySelector("." + elName);
    contentBlock.classList.remove("hide");

    if (oldElement) {
        if (oldElement === contentBlock) return;
        oldElement.classList.add("hide");
    }
    oldElement = contentBlock;
};

/**
 * Здесь Идет лищь Нахождения Нужного Блока.
 * И его Визуализаций
 * 
 * @return undefined
 * @param object
 */
elements.header.nav.addEventListener("click", (e) => {
    e.preventDefault();
    let target = e.target;
    if (target.tagName !== "a".toUpperCase()) return;
    let elName = target.getAttribute("data-block");
    funcs.showBlock(elName);
});



/**
 * ShowE Error
 * Здесь Идет визуализация ошибок
 * 
 * Получаем Ошибки
 * Ищем нужный блок для Ошибок
 * Отображаем эти ошибки
 * 
 * @param object
 * 
 */
funcs.showError = (errors) => {
    let registerBlock,
        errorEl,
        errArr,
        outputErr;


    // Заменяем имя елемента на имя класса если он есть
    errArr = Object.keys(errors);
    errorEl = errArr.indexOf("retypePassword");

    if (errorEl !== -1) {
        errArr[errorEl] = "r-password";
    }
    


    registerBlock = elements.section.content.querySelector(".register");


    /**
     * Сперва Запись в елемент
     * Позже Выявления
     */
    for (let i = 0, len = errArr.length; i < len; i++) {
        outputErr = registerBlock
            .querySelector("#" + errArr[i])
            .parentElement
            .querySelector(".text-danger");

        if (errors[errArr[i]] !== undefined) {
            outputErr.innerHTML = errors[errArr[i]];
        }
        outputErr.classList.remove("hide");
    }
    // console.log(registerBlock);
}




export default {
    showError: funcs.showError,
}