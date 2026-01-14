import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { getImagesByQuery } from "./pixabay-api";
import { initRender } from "./render-functions";
import Pagination from "./pagination";
import type { PixabayResponse } from "./types/pixabay";

const form = document.querySelector<HTMLFormElement>("#search-form");
const input = document.querySelector<HTMLInputElement>('input[name="searchQuery"]');
const gallery = document.querySelector<HTMLElement>(".gallery");
const loader = document.querySelector<HTMLElement>(".loader");
const loadMoreBtn = document.querySelector<HTMLButtonElement>(".load-more");

if (!form || !input || !gallery || !loader || !loadMoreBtn) {
  throw new Error("Required DOM elements not found");
}

const render = initRender({ gallery, loader, loadMoreBtn });

const pagination = new Pagination();
let query: string = "";
let totalHits: number = 0;

async function fetchAndRender(): Promise<void> {
  try {
    render.showLoader();

    const page = pagination.getPage();
    const data: PixabayResponse = await getImagesByQuery(query, page);

    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      render.hideLoadMore();
      iziToast.error({ message: "Sorry, there are no images matching your search query. Please try again." });
      return;
    }

    render.createGallery(data.hits);

    const loaded = page * pagination.getPerPage();
    if (loaded >= totalHits) {
      render.hideLoadMore();
      iziToast.info({ message: "We're sorry, but you've reached the end of search results." });
    } else {
      render.showLoadMore();
    }
  } catch {
    iziToast.error({ message: "An error occurred while fetching images. Try again." });
  } finally {
    render.hideLoader();
  }
}

function onFormSubmit(event: SubmitEvent): void {
  event.preventDefault();

  const value = input.value.trim();
  if (!value) return;

  query = value;
  pagination.reset();

  render.clearGallery();
  render.hideLoadMore();

  void fetchAndRender();
}

function onLoadMoreClick(): void {
  pagination.next();
  void fetchAndRender();
}

form.addEventListener("submit", onFormSubmit);
loadMoreBtn.addEventListener("click", onLoadMoreClick);
