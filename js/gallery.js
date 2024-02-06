const images = [
    {
      preview:
        "https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820__480.jpg",
      original:
        "https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820_1280.jpg",
      description: "Hokkaido Flower",
    },
    {
      preview:
        "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg",
      original:
        "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg",
      description: "Container Haulage Freight",
    },
    {
      preview:
        "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg",
      original:
        "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg",
      description: "Aerial Beach View",
    },
    {
      preview:
        "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg",
      original:
        "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg",
      description: "Flower Blooms",
    },
    {
      preview:
        "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg",
      original:
        "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg",
      description: "Alpine Mountains",
    },
    {
      preview:
        "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg",
      original:
        "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg",
      description: "Mountain Lake Sailing",
    },
    {
      preview:
        "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg",
      original:
        "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg",
      description: "Alpine Spring Meadows",
    },
    {
      preview:
        "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg",
      original:
        "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg",
      description: "Nature Landscape",
    },
    {
      preview:
        "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg",
      original:
        "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg",
      description: "Lighthouse Coast Sea",
    },
  ];
  //========================================================================//
  const galleryElement = document.querySelector(".gallery")
  galleryElement.addEventListener('click', onClickEvent);
  
  function onClickEvent(e) {
   e.preventDefault()   
  if(e.target.nodeName!== "IMG")  return;    
      const liElem = e.target.closest('li');//отримуємо доступ до <li>
      const id = liElem.dataset.description;//дістаємо опис необхідної картинки
  
      const image = images.find(el => el.description === id);//шуаємо цю картинку в масиві
      showPicture(image)//запускаємо функцію, що відкриває модальне вікно для знайденої картинки
      
  }
  //========================Створюємо розмітку============================//
  function itemTemplate(images) {
      return images.map(({preview,original,description})=> {
          return `<li class="gallery-item" data-description="${description}"> 
          <a class="gallery-link" href="${original} " download>
      <img
        class="gallery-image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
      />
    </a>
  </li>`;
  }).join('');
  }
  const markup = itemTemplate(images)
  
  galleryElement.innerHTML = markup;
  
  //================Створрюємо функцію, що відповідає за модалку=============//
  
  function showPicture(image) {
      const { preview, original, description } = image;
      const instance1 = basicLightbox.create(`
           <img src="${original}" width="800" height="600" alt= "${description}"
      /> `,
          {
              closable: true,
              className: '',
              onShow: (instance1) => {
                  //додаємо прослуховувача події клавіатури (onShow з бібліотеки)
                  document.addEventListener('keydown', onModalClose);
  
              },
          
              onClose: (instance1) => {
                  document.removeEventListener('keydown', onModalClose)
              }
          })
           //видаляємо прослуховувача події клавіатури (onClose з бібліотеки);
      
      
         
   instance1.show()  ;
      
  function onModalClose(e) {
      console.log(e.code);
      if (e.code === 'Escape') {
          instance1.close();
      }
      }  //функція, що викликається для закривання модального вікна клавішею Escape
  }