import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import type { PixabayImage } from "./types/pixabay";

export type RenderElements = {
  gallery: HTMLElement; // если знаешь точнее — HTMLUListElement/HTMLDivElement
  loader: HTMLElement;
  loadMoreBtn: HTMLButtonElement;
};

export type RenderAPI = {
  createGallery(images: PixabayImage[]): void;
  clearGallery(): void;
  showLoader(): void;
  hideLoader(): void;
  showLoadMore(): void;
  hideLoadMore(): void;
};

export function initRender(elements: RenderElements): RenderAPI {
  const { gallery, loader, loadMoreBtn } = elements;

  const lightbox = new SimpleLightbox(".gallery a", {
    captions: true,
    captionsData: "alt",
    captionDelay: 250,
  });

  function createGallery(images: PixabayImage[]): void {
    // ⚠️ оставь твою существующую разметку, просто тип уже PixabayImage[]
    const markup = images
      .map(
        (img) => `
        <a class="gallery__link" href="${img.largeImageURL}">
          <div class="photo-card">
            <img src="${img.webformatURL}" alt="${img.tags}" loading="lazy" />
            <div class="info">
              <p class="info-item"><b>Likes</b> ${img.likes}</p>
              <p class="info-item"><b>Views</b> ${img.views}</p>
              <p class="info-item"><b>Comments</b> ${img.comments}</p>
              <p class="info-item"><b>Downloads</b> ${img.downloads}</p>
            </div>
          </div>
        </a>`
      )
      .join("");

    gallery.insertAdjacentHTML("beforeend", markup);
    lightbox.refresh();
  }

  function clearGallery(): void {
    gallery.innerHTML = "";
  }

  function showLoader(): void {
    loader.classList.remove("is-hidden");
  }

  function hideLoader(): void {
    loader.classList.add("is-hidden");
  }

  function showLoadMore(): void {
    loadMoreBtn.classList.remove("is-hidden");
    loadMoreBtn.disabled = false;
  }

  function hideLoadMore(): void {
    loadMoreBtn.classList.add("is-hidden");
  }

  return {
    createGallery,
    clearGallery,
    showLoader,
    hideLoader,
    showLoadMore,
    hideLoadMore,
  };
}