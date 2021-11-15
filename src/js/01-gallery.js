// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

// Описан в документации
import SimpleLightbox from "simplelightbox";
// Дополнительный импорт стилей
import "simplelightbox/dist/simple-lightbox.min.css";

console.log(galleryItems);
const galleryContainer =document.querySelector('.gallery')
const galleryItemMarkup = creategalleryItemMarkup(galleryItems)

galleryContainer.insertAdjacentHTML('beforeend', galleryItemMarkup);
//создание макета разметки галереи
function creategalleryItemMarkup(galleryItems) {
  return galleryItems
    .map(({ original, preview, description }) => {
      return ` <div class = "gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
    
      alt="${description}"
    />
  </a>
</div>`;
            
    }).join('');
 
}
// добавление свойств
const lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  captionsData: 'alt',
});

