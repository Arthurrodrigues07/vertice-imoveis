
"use strict";

/* VÉRTICE IMÓVEIS
   Projeto demonstrativo
   JavaScript principal
*/

document.addEventListener("DOMContentLoaded", () => {

  // MENU RESPONSIVO

  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector("#main-nav");

  if (menuButton && navigation) {
    const closeMenu = () => {
      navigation.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Abrir menu");
      document.body.classList.remove("menu-open");
    };

    menuButton.addEventListener("click", () => {
      const isOpen = navigation.classList.toggle("open");

      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute(
        "aria-label",
        isOpen ? "Fechar menu" : "Abrir menu"
      );

      document.body.classList.toggle("menu-open", isOpen);
    });

    navigation.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", event => {
      if (event.key === "Escape") closeMenu();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 800) closeMenu();
    });
  }

  // GALERIA DE IMAGENS

  const galleryImages = [
    {
      src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85",
      alt: "Ambiente residencial contemporâneo",
      caption: "Arquitetura contemporânea"
    },
    {
      src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85",
      alt: "Sala de estar com decoração sofisticada",
      caption: "Sala de estar"
    },
    {
      src: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85",
      alt: "Ambiente residencial integrado",
      caption: "Espaços integrados"
    },
    {
      src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=85",
      alt: "Interior residencial sofisticado",
      caption: "Detalhes de interiores"
    },
    {
      src: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1600&q=85",
      alt: "Detalhes arquitetônicos contemporâneos",
      caption: "Design e arquitetura"
    }
  ];

  const mainImage = document.querySelector("#gallery-main-image");
  const galleryCurrent = document.querySelector("#gallery-current");
  const galleryTotal = document.querySelector("#gallery-total");
  const galleryCaption = document.querySelector("#gallery-caption");
  const previousButton = document.querySelector("#gallery-prev");
  const nextButton = document.querySelector("#gallery-next");
  const thumbnails = [...document.querySelectorAll(".gallery-thumb")];

  let currentImageIndex = 0;

  const updateGallery = index => {
    if (!mainImage) return;

    currentImageIndex =
      (index + galleryImages.length) % galleryImages.length;

    const image = galleryImages[currentImageIndex];

    mainImage.src = image.src;
    mainImage.alt = image.alt;

    if (galleryCurrent) {
      galleryCurrent.textContent = String(
        currentImageIndex + 1
      ).padStart(2, "0");
    }

    if (galleryTotal) {
      galleryTotal.textContent = String(
        galleryImages.length
      ).padStart(2, "0");
    }

    if (galleryCaption) {
      galleryCaption.textContent = image.caption;
    }

    thumbnails.forEach((thumbnail, index) => {
      const active = index === currentImageIndex;

      thumbnail.classList.toggle("active", active);
      thumbnail.setAttribute("aria-pressed", String(active));
    });
  };

  if (mainImage) {
    previousButton?.addEventListener("click", () => {
      updateGallery(currentImageIndex - 1);
    });

    nextButton?.addEventListener("click", () => {
      updateGallery(currentImageIndex + 1);
    });

    thumbnails.forEach(thumbnail => {
      thumbnail.addEventListener("click", () => {
        const index = Number(thumbnail.dataset.galleryIndex);

        if (Number.isInteger(index) &&
            index >= 0 &&
            index < galleryImages.length) {
          updateGallery(index);
        }
      });
    });

    updateGallery(0);
  }

  // PLANTA INTERATIVA

  const rooms = {
    living: {
      name: "Sala de estar",
      area: "48 m²",
      description:
        "Ambiente amplo e integrado, pensado para proporcionar conforto, iluminação natural e convivência.",
      image:
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=80",
      alt: "Sala de estar contemporânea"
    },

    kitchen: {
      name: "Cozinha",
      area: "24 m²",
      description:
        "Espaço funcional com conceito contemporâneo, integração com a área social e organização inteligente.",
      image:
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80",
      alt: "Ambiente contemporâneo de cozinha e convivência"
    },

    suite: {
      name: "Suíte master",
      area: "38 m²",
      description:
        "Ambiente privativo com proposta de conforto, tranquilidade e espaço para closet.",
      image:
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=80",
      alt: "Interior residencial sofisticado"
    },

    gourmet: {
      name: "Área gourmet",
      area: "32 m²",
      description:
        "Espaço idealizado para receber convidados e integrar os momentos de lazer à arquitetura residencial.",
      image:
        "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=80",
      alt: "Ambiente residencial de convivência"
    },

    pool: {
      name: "Piscina",
      area: "28 m²",
      description:
        "Área de lazer privativa, pensada para descanso e integração com os ambientes externos.",
      image:
        "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=900&q=80",
      alt: "Detalhes de arquitetura residencial"
    }
  };

  const roomButtons = document.querySelectorAll("[data-room]");
  const roomImage = document.querySelector("#room-image");
  const roomName = document.querySelector("#room-name");
  const roomDescription = document.querySelector("#room-description");
  const roomArea = document.querySelector("#room-area");

  const selectRoom = roomKey => {
    const room = rooms[roomKey];

    if (!room) return;

    if (roomImage) {
      roomImage.src = room.image;
      roomImage.alt = room.alt;
    }

    if (roomName) roomName.textContent = room.name;

    if (roomDescription) {
      roomDescription.textContent = room.description;
    }

    if (roomArea) roomArea.textContent = room.area;

    roomButtons.forEach(button => {
      const active = button.dataset.room === roomKey;

      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
  };

  roomButtons.forEach(button => {
    button.addEventListener("click", () => {
      selectRoom(button.dataset.room);
    });
  });

  if (roomButtons.length) selectRoom("living");

  // SIMULADOR FINANCEIRO
  // Sistema Price: parcelas constantes.
  // Taxa anual efetiva convertida para taxa mensal equivalente.

  const financeForm = document.querySelector("#finance-form");

  const propertyValueInput =
    document.querySelector("#property-value");

  const downPaymentInput =
    document.querySelector("#down-payment");

  const financeYearsInput =
    document.querySelector("#finance-years");

  const interestRateInput =
    document.querySelector("#interest-rate");

  const monthlyPaymentElement =
    document.querySelector("#monthly-payment");

  const financedAmountElement =
    document.querySelector("#financed-amount");

  const financeTermElement =
    document.querySelector("#finance-term");

  const financeRateElement =
    document.querySelector("#finance-rate");

  const formatCurrency = value => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      maximumFractionDigits: 2
    }).format(value);
  };

  const formatPercent = value => {
    return new Intl.NumberFormat("pt-BR", {
      maximumFractionDigits: 2
    }).format(value) + "%";
  };

  const calculateFinancing = () => {
    if (!financeForm) return;

    const propertyValue = Number(propertyValueInput?.value);
    const downPayment = Number(downPaymentInput?.value);
    const years = Number(financeYearsInput?.value);
    const annualRate = Number(interestRateInput?.value);

    const valid =
      Number.isFinite(propertyValue) &&
      Number.isFinite(downPayment) &&
      Number.isFinite(years) &&
      Number.isFinite(annualRate) &&
      propertyValue > 0 &&
      downPayment >= 0 &&
      downPayment <= propertyValue &&
      years > 0 &&
      annualRate >= 0 &&
      annualRate <= 100;

    if (!valid) {
      if (monthlyPaymentElement) {
        monthlyPaymentElement.textContent = "Confira os valores";
      }

      if (financedAmountElement) {
        financedAmountElement.textContent = "—";
      }

      return;
    }

    const financedAmount = propertyValue - downPayment;
    const months = Math.round(years * 12);
    const monthlyRate = Math.pow(1 + annualRate / 100, 1 / 12) - 1;

    let monthlyPayment = 0;

    if (monthlyRate === 0) {
      monthlyPayment = financedAmount / months;
    } else {
      const factor = Math.pow(1 + monthlyRate, -months);

      monthlyPayment =
        financedAmount * monthlyRate / (1 - factor);
    }

    if (monthlyPaymentElement) {
      monthlyPaymentElement.textContent =
        formatCurrency(monthlyPayment);
    }

    if (financedAmountElement) {
      financedAmountElement.textContent =
        formatCurrency(financedAmount);
    }

    if (financeTermElement) {
      financeTermElement.textContent = `${months} meses`;
    }

    if (financeRateElement) {
      financeRateElement.textContent =
        formatPercent(annualRate) + " ao ano";
    }
  };

  if (financeForm) {
    financeForm.addEventListener("submit", event => {
      event.preventDefault();
      calculateFinancing();
    });

    calculateFinancing();
  }

  // CONTATO DEMONSTRATIVO
  // Nenhuma mensagem é enviada.
  // O botão permanece desativado até configuração comercial.

  const contactForm = document.querySelector("#contact-form");

  contactForm?.addEventListener("submit", event => {
    event.preventDefault();
  });

  // ANO AUTOMÁTICO

  const yearElement = document.querySelector("#current-year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

});
