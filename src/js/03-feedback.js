import throttle from 'lodash.throttle';


// const STORAGE_KEY = "feedback-form-state";

const refs = {
  form: document.querySelector('.feedback-form'),
  textarea: document.querySelector('.feedback-form  textarea'),
  input: document.querySelector('.feedback-form  input'),
};

let formData = {};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onTextareaInput, 500));

populateTextarea();

/*
 - Останавливаем поведение по умолчанию
 - Убираем сообщение из хранилища
 - Очищаем форму
 */
function onFormSubmit(evt) {
    evt.preventDefault();
 
  console.log(formData);
  formData = {};
  evt.currentTarget.reset();

  localStorage.removeItem("feedback-form-state");
}

/*
 - Получаем значение поля
 - Сохраняем его в хранилище
 - Можно добавить throttle
 */
function onTextareaInput(evt) {
 formData[evt.target.name] = evt.target.value;


 localStorage.setItem("feedback-form-state", JSON.stringify(formData))
}

/*
 - Получаем значение из хранилища
 - Если там что-то было, обновляем DOM
 */
function populateTextarea() {

  const savedMessage = localStorage.getItem("feedback-form-state");

  if (savedMessage) {
    const parsedMessage = JSON.parse(savedMessage);

    formData = parsedMessage;

    refs.input.value = parsedMessage.email;
    refs.textarea.value = parsedMessage.message;

    if (parsedMessage.email === undefined ) {
      return (refs.input.value = '');
             
    }
    if (parsedMessage.message === undefined) {
      (refs.textarea.value = '');
    }
  }

}

