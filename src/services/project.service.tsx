import { collection, getDocs } from "firebase/firestore";
import { db } from "../assets/scripts/firebase.ts";
import IProject from "../interfaces/project.interface.ts";
import { Observable } from "rxjs";

const PROJECT_COLLECTION_NAME = 'projects';

export default class ProjectService {
  private static _instance: ProjectService;
  public static get instance() {
    if (!this._instance) this._instance = new ProjectService();
    return this._instance; 
  }

  private constructor() {}
  
  public getProjects(): Observable<IProject[]> {
    return new Observable(subcriber => {
      const projectCollectionRef = collection(db, PROJECT_COLLECTION_NAME);

      getDocs(projectCollectionRef)
        .then(querySnapshot => {
          const projects = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as IProject));
          subcriber.next(projects);
          subcriber.complete();
        })
        .catch((error) => subcriber.error(error));
    });
  }

}