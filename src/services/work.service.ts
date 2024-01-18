import { collection, getDocs } from "firebase/firestore";
import { db } from "../assets/scripts/firebase.ts";
import { Observable } from "rxjs";
import IWork from "../interfaces/work.interface.ts";

const PROJECT_COLLECTION_NAME = 'projects';

export default class WorkService {
  private static _instance: WorkService;
  public static get instance() {
    if (!this._instance) this._instance = new WorkService();
    return this._instance; 
  }

  private constructor() {}
  
  public getAllWork(): Observable<IWork[]> {
    return new Observable(subcriber => {
      const projectCollectionRef = collection(db, PROJECT_COLLECTION_NAME);

      getDocs(projectCollectionRef)
        .then((querySnapshot) => {
          const workList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as IWork));
          subcriber.next(workList);
          subcriber.complete();
        })
        .catch((error) => subcriber.error(error));
    });
  }
}