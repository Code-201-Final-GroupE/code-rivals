'use strict';

const modal = document.getElementById('modal');
const openModal = document.getElementById('modalbutton');
const closeModal = document.getElementById('modal-button-close');

openModal.addEventListener('click', () => {
  modal.showModal();
});

closeModal.addEventListener('click', () => {
  modal.close();
});
