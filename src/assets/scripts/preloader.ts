import gsap, { Power3 } from "gsap";
import IThumbnailWork from "../../interfaces/thumbnail-work.interface";
import IWork from "../../interfaces/work.interface";
import FileService from "../../services/file.service";
import WorkService from "../../services/work.service";
import { CLASSES as GENERAL_CLASSES } from "./utils";
import "../../style.scss";

const LOADER_SECTION_ID = 'loader-section';

const CLASSES = {
  LOADBAR: 'loadbar'
}

const main = document.querySelector('main');
const loaderSection = document.getElementById(LOADER_SECTION_ID);
const loadbar = loaderSection?.querySelector(`.${CLASSES.LOADBAR}`);
const loadbarProgress = loadbar?.querySelector('p');
const workList: IThumbnailWork[] = [];
let preloadedWorkCount = 0;

WorkService.instance.getAllWork().subscribe({
  next: res => handleAllWork(res),
  error: error => console.error(error)
});

const handleAllWork = (list: IWork[]) => {
  list.forEach((work) => {
    workList.push(work);
    FileService.instance.getImage(`projects/${work.id}/${work.imagesRefs[0]}`).subscribe({
      next: (img => handleWorkThumbnailPreloaded(work, img)),
      error: () => handleWorkThumbnailPreloaded(work)
    })
  })
}

const handleWorkThumbnailPreloaded = (work: IThumbnailWork, img?: string) => {
  preloadedWorkCount++;
  work.thumbnail = img;

  updateLoadingProgress();
}

const updateLoadingProgress = () => {
  const progress = preloadedWorkCount / workList.length;
  const percent = Math.floor(progress * 100);

  gsap.killTweensOf(loaderSection, "--progress");
  gsap.to(loaderSection, {duration: .4, ease: Power3.easeInOut, "--progress": progress});
  loadbar?.setAttribute('aria-valuenow', `${percent}`);
  loadbar?.setAttribute('aria-valuetext', `${percent}%`);
  if (loadbarProgress) loadbarProgress.innerText = `${percent}%`;

  if (progress >= 1) {
    load();
  }
}

const load = () => {
  console.log ("LOAD");

  const script = getMainScript();
  document.querySelector('body')?.appendChild(script);

  const style = getStylesheet();
  document.querySelector('head')?.appendChild(style);

  gsap.timeline()
      .to(loaderSection, { duration: .8, ease: Power3.easeInOut, "--height": '10%', "--top": '-10%'})
      .call(handleLoaderHidden);
}

const handleLoaderHidden = () => {
  loaderSection?.remove();

  const alert = getLoadedAlert();
  if (alert) main?.appendChild(alert);
}

const getMainScript = () => {
  const script = document.createElement('script');
  script.setAttribute('src', 'src/main.tsx');
  script.setAttribute('type', 'module');
  return script;
}

const getStylesheet = () => {
  const link = document.createElement('link');
  link.setAttribute('href', 'src/style.scss');
  link.setAttribute('rel', 'stylesheet');
  return link;
}

const getLoadedAlert = () => {
  const alert: HTMLParagraphElement = document.createElement('p');
  alert.role = 'alert';
  alert.classList.add(GENERAL_CLASSES.ACCESSIBILITY_TEXT);
  alert.innerText = 'Website ready to be explored';

  return alert;
}