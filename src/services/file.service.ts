import { Observable } from "rxjs";
import { storage } from "../assets/scripts/firebase";
import { getDownloadURL, ref } from "firebase/storage";

export default class FileService {
  private static _instance: FileService;
  public static get instance() {
    if (!this._instance) this._instance = new FileService();
    return this._instance; 
  }

  private constructor() {}

  getImage(path: string) : Observable<string>{
    return new Observable((subscriber) => {
      const fileRef = ref(storage, path);

      console.log(storage, path);

      getDownloadURL(fileRef)
        .then((url) => {
          const img = new Image();
          img.src = url;

          img.onload = () => {
            subscriber.next(url);
            subscriber.complete();
          }

          img.onerror = () => subscriber.error("Error loading image");
        })
        .catch((error) => subscriber.error(error));
    });
  }
}