import throttle from 'lodash.throttle';
// import '../css/common.css';
// import '../css/feedback.css';

// const STORAGE_KEY = "feedback-form-state";

const refs = {
  form: document.querySelector('.feedback-form'),
  textarea: document.querySelector('.feedback-form  textarea'),
  input: document.querySelector('.feedback-form  input'),
};

const formData = {}; 

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

    // console.log("Send form")

    evt.currentTarget.reset();

  localStorage.removeItem("feedback-form-state");
   console.log(formData);
}


/*
 - Получаем значение поля
 - Сохраняем его в хранилище
 - Можно добавить throttle
 */
function onTextareaInput(evt) {
 formData[evt.target.name] = evt.target.value;

  //  console.log(formData);
 localStorage.setItem("feedback-form-state", JSON.stringify(formData))
  // const message = evt.target.value;
  //   console.log(message)   
  //   localStorage.setItem("feedback-form-state", message)
  
}

/*
 - Получаем значение из хранилища
 - Если там что-то было, обновляем DOM
 */
function populateTextarea() {

    const savedMessage = localStorage.getItem("feedback-form-state");
    
  
    if (savedMessage) {
      
      const parsedMessage = JSON.parse(savedMessage)
      // console.log(savedMessage);
      // console.log(parsedMessage);
       refs.input.value = parsedMessage.email,
       refs.textarea.value = parsedMessage.message;
      
    }

}