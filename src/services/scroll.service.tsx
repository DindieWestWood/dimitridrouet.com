import Lenis from "@studio-freight/lenis";

export default class ScrollService {
  private static _instance: ScrollService;
  public static get instance() {
    if (!this._instance) this._instance = new ScrollService();
    return this._instance; 
  } 

  private _lenis: Lenis;
  
  private constructor() {
    this._lenis = new Lenis();
    requestAnimationFrame(this._raf);
  }

  private _raf = (time: any) => {
    this._lenis.raf(time)
    requestAnimationFrame(this._raf);
  }

  public scrollTo(selector: string) {
    this._lenis.scrollTo(selector);
    
  } 
}