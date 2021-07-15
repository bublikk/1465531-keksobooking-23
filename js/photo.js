const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const avatarChooser = document.querySelector('#avatar');
const avatarPreview = document.querySelector('.ad-form-header__preview img');

const img = document.createElement('img');
const photoChooser = document.querySelector('#images');
const photoPreview = document.querySelector('.ad-form__photo').appendChild(img);

avatarChooser.addEventListener('change', () => {
  const file = avatarChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((extension) => fileName.endsWith(extension));

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      avatarPreview.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
});

photoChooser.addEventListener('change', () => {
  const file = photoChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((extension) => fileName.endsWith(extension));

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      photoPreview.classList.add('ad-form__photo');
      photoPreview.src = reader.result;
      photoPreview.alt = 'Фотография жилья';
    });

    reader.readAsDataURL(file);
  }
});
