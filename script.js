// يمكن استخدام هذا الكود لإضافة بعض الميزات الديناميكية مثل عرض قائمة منسدلة للبحث أو إضافة المنتج إلى السلة

document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      alert("تم إضافة المنتج إلى السلة!");
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const leftArrow = document.querySelector(".carousel .left-arrow");
  const rightArrow = document.querySelector(".right-arrow");
  const giftCards = document.querySelectorAll(".gift-card");

  let currentIndex = 0;
  const cardsPerPage = 4; // عدد الصور الظاهرة في كل مرة

  function updateVisibleCards() {
    giftCards.forEach((card, index) => {
      // إظهار فقط الصور التي تقع ضمن المجموعة الحالية (مجموعة الأربعة)
      card.style.display =
        index >= currentIndex && index < currentIndex + cardsPerPage
          ? "block"
          : "none";
    });
  }

  leftArrow.addEventListener("click", function () {
    // التنقل إلى المجموعة السابقة، مع التأكد من عدم الخروج من الحد الأدنى (الصفر)
    currentIndex = Math.max(currentIndex - cardsPerPage, 0);
    updateVisibleCards();
  });

  rightArrow.addEventListener("click", function () {
    // التنقل إلى المجموعة التالية، مع التأكد من عدم الخروج من الحد الأقصى
    currentIndex = Math.min(
      currentIndex + cardsPerPage,
      giftCards.length - cardsPerPage
    );
    updateVisibleCards();
  });

  updateVisibleCards(); // إظهار أول مجموعة من الصور عند تحميل الصفحة
});

let currentImageIndex = 2;
const images = document.querySelectorAll(".image");

function updateImages() {
  images.forEach((img, index) => {
    img.classList.remove("active");
    img.style.opacity = "0.5";
    img.style.transform = "translateX(-50%) scale(0.8)";

    if (index === currentImageIndex) {
      img.classList.add("active");
      img.style.opacity = "1";
      img.style.transform = "translateX(0) scale(1)";
      img.style.zIndex = "2";
    } else if (
      index === currentImageIndex - 1 ||
      index === currentImageIndex + 1
    ) {
      img.style.transform = `translateX(${
        index < currentImageIndex ? "-40px" : "40px"
      }) scale(0.8)`;
      img.style.zIndex = "1";
    } else {
      img.style.transform = `translateX(${
        index < currentImageIndex ? "-80px" : "80px"
      }) scale(0.6)`;
      img.style.zIndex = "0";
    }
  });
}

function nextImage() {
  currentImageIndex = (currentImageIndex + 1) % images.length;
  updateImages();
}

function prevImage() {
  currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
  updateImages();
}

updateImages();

// album
let currentIndex = 2; // البداية من منتصف الصور

function scrollAlbum(direction) {
  const albumImages = document.querySelectorAll(".album-images img");
  const totalImages = albumImages.length;
  const maxIndex = totalImages - 1;

  // إزالة الفئة النشطة من الصورة الحالية
  albumImages[currentIndex].classList.remove("active");

  // تحديث المؤشر بناءً على الاتجاه
  currentIndex += direction;
  if (currentIndex < 0) currentIndex = maxIndex;
  if (currentIndex > maxIndex) currentIndex = 0;

  // إضافة الفئة النشطة للصورة الجديدة
  albumImages[currentIndex].classList.add("active");

  // حساب الموضع لجعل الصورة النشطة في المنتصف
  const imageWidth = albumImages[currentIndex].clientWidth + 20; // عرض الصورة بالإضافة إلى الهامش
  const offset = (totalImages * imageWidth) / 2 - window.innerWidth / 2; // تعديل التمركز

  document.querySelector(".album-images").style.transform = `translateX(${
    -currentIndex * imageWidth + offset
  }px)`;
}

// وضع الفئة النشطة للصورة المتوسطة عند بدء الصفحة
document.addEventListener("DOMContentLoaded", () => {
  const albumImages = document.querySelectorAll(".album-images img");
  albumImages[currentIndex].classList.add("active");

  // حساب الموضع لجعل الصورة النشطة (المتوسطة) في المنتصف عند بدء التحميل
  const imageWidth = albumImages[currentIndex].clientWidth + 20; // عرض الصورة بالإضافة إلى الهامش
  const offset = (albumImages.length * imageWidth) / 2 - window.innerWidth / 2;

  document.querySelector(".album-images").style.transform = `translateX(${
    -currentIndex * imageWidth + offset
  }px)`;
});
